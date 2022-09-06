
Ext.define('WebMappVenezia.view.map.TrafficLimitationMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.trafficlimitation',
    config:{
        map: null,
		baseMap: null,
		limitationLayer: null,
		confiniComunali: null,
		bounds: [[44.742832,10.730896],[46.010316,14.436035]]
    },
	listen: {
		global: {
			updateDayOnMap: 'updateDayOnMap',
			setMapBounds: 'setMapBounds'
		}
	},
	setMapBounds: function(bounds){
		var me = this;
		me.setBounds(bounds);
	},
    afterRender: function(t, eOpts){
        var leafletRef = window.L;
        if (leafletRef == null){
            this.update('No leaflet library loaded');
        } else {
			var me = this;	
			if(me.getMap()){
				me.getMap().remove();
				me.setMap(null);
			}
			
			
			
			var ESRI = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
				//attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
				attribution: '<a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank"> World topografic Map Esri</a>',
				minZoom: 1,
				maxZoom: 19
			});
			var ORTOFOTO = L.tileLayer.wms('https://celegis.cittametropolitana.ve.it:443/geoserver/ows?', {
				layers: 'geonode:sf_4B_15cm_CTR5000_WGS84',
				attribution: 'Città Metropolitana di Venezia 2014',
				maxZoom: 22,
				tileSize: 256
			});
			
			var baseMaps = {'ESRI': ESRI, 'Ortofoto': ORTOFOTO};
			
			var overlayMaps = [];
			
			
			
				var map = L.map('leafletmap5',{
					zoomControl: false,
					layers: [ESRI]
				});
				L.control.layers(baseMaps, overlayMaps,{position : 'bottomleft'}).addTo(map);
				
				L.control.zoom({
				position: 'bottomright'
				}).addTo(map);
				
				L.control.locate({
					position: 'bottomright',
					flyTo: true,
					keepCurrentZoomLevel: false,
					returnToPrevBounds: true,
					icon: "fa fa-location-arrow",
					strings: {
						title: "Mia localizzazione",
						popup: "Ti trovi all interno di un raggio di {distance} {unit} da questo punto",
						outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
					},
				  locateOptions: {
					maxZoom: 16,
					watch: true,
					enableHighAccuracy: true,
					maximumAge: 15000,
					timeout: 30000
				  }					
				}).addTo(map);
				
				map.setMinZoom(9);
				map.fitBounds(me.getBounds());
				map.setMaxBounds([
				[44.742832,10.730896],[46.010316,14.436035]
				]);
				me.setMap(map);
			
				Ext.data.JsonP.request({
					
				   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getArpavLevels.php',
				   success: function(response){				
					    localStorage.setItem('arpavLevels',Ext.encode(response.data));
				   },
				   
				   failure: function(response){
				   }
				   
				}); 	
				
				var limitationLayer = new L.SingleTileWMSLayer('https://webgis.cittametropolitana.ve.it/cgi-bin/mapserv?map=/var/www/html/appvenezia/grafostrade.map',{
						layers: 'aree_limitate,grafo_stradale',
						format: 'image/png',
						transparent: true
				});
				me.setLimitationLayer(limitationLayer);
				me.getMap().addLayer(limitationLayer);
				me.getMap().on('click',function(e){
					var coords = L.GeoJSON.latLngToCoords(e.latlng);
					var coordsString = coords.join();
					Ext.data.JsonP.request({
					   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getClickedArea.php',
					   params: {
						   coords: coordsString
					   },
					   success: function(response){
						   var arpavLvls = Ext.decode(localStorage.getItem('arpavLevels'));
						   var clickedArea = response.data;
						   Ext.Array.each(arpavLvls,function(level){
							   if(level.codistat == clickedArea){
								   Ext.fireEvent('openLimitationPopup',level);
							   }
						   });
					   },
					   failure: function(response){
							Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					   }
					}); 
				});
				
				me.checkForGiornataEcologica('today');
						
				Ext.fireEvent('limitationAreasLoaded',me.getMap(),me.getLimitationLayer());
				
				map.on('zoomend',function(e){
					console.log('ZOOMEND',me.getMap().getZoom());
					
					Ext.Array.each(LayerStorage.getZoomLayers(),function(zoomLayer){
						
						if(me.getMap().getZoom() >= zoomLayer.minZoom){
							Ext.fireEvent('activateZoomLayerLimit',zoomLayer);
						}else{
							Ext.fireEvent('removeZoomLayerLimit',zoomLayer);
						}
						
					});
				});
				
				
						
						
        }
    },
	updateDayOnMap: function(day){
		
		var me = this;
		
		var layers = me.getLimitationLayer().wmsParams.layers;
		if(day == 'today'){
			var finalLayers = layers.replace('aree_limitate_domani','aree_limitate');
		}else{
			var finalLayers = layers.replace('aree_limitate','aree_limitate_domani');
		}
		me.getLimitationLayer().setParams({layers: finalLayers});
		
		me.checkForGiornataEcologica(day);
		
	},
	
	checkForGiornataEcologica: function(day){
		var me = this;
		
		var ecolayers = [];
		
		
		
		Ext.data.JsonP.request({
					
		   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getGiornateEcologiche.php',
		   params: {
			   day: day
		   },
		   success: function(response){			
		   
				console.log('res ECOLOGICA',response);
				
				var ecoLayObj = response.layers;
				localStorage.setItem('ecoLayers',Ext.encode(ecoLayObj));
				if(ecoLayObj.length > 0){
					
					Ext.Array.each(ecoLayObj,function(layObj){
						
						ecolayers.push(layObj.codistat+'_eco');
						
					});
					
					var existingLayers = me.getLimitationLayer().wmsParams.layers;
					
					
					var existingLayersArray = existingLayers.split(',');
					
					var newLayersArray = [];
					console.log('existingLayers',existingLayers);
					console.log('existingLayersArray',existingLayersArray);
					Ext.Array.each(existingLayersArray,function(lay){
						if(!lay.includes('_eco')){
							newLayersArray.push(lay);
						}
					});
					
					var newLayers = newLayersArray.join(',')+','+ecolayers.join(',');
					
					me.getLimitationLayer().setParams({layers: newLayers});
				}
		   },
		   
		   failure: function(response){
		   }
		   
		});
		
		
	},
	
    onResize: function(w, h, oW, oH){
		var map = this.getMap();
		if (map){
			map.invalidateSize();
		}
	}
});
