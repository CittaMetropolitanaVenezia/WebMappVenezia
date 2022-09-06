
Ext.define('WebMappVenezia.view.map.MapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.map',
    config:{
        map: null,
		baseMap: null,
		confiniComunali: null,
		confiniComunaliSearch: [],
		bounds: [[44.742832,10.730896],[46.010316,14.436035]]

    },
	listen:{
		global: {
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
			
			
			
			
			
			
			var map = L.map('leafletmap',{
				zoomControl: false,
				layers: [ESRI]
			});
			
			L.control.layers(baseMaps, overlayMaps,{position : 'bottomleft'}).addTo(map);
			
			L.control.zoom({
				position: 'bottomright'
			}).addTo(map);

			L.control.locate({
			  position: "bottomright",
			  drawCircle: true,
			  follow: true,
			  setView: 'untilPan',
			  keepCurrentZoomLevel: true,
			  markerStyle: {
				weight: 1,
				opacity: 1,
				fillOpacity: 1
			  },
			  circleStyle: {
				weight: 0.2,
				clickable: true,
				fillOpacity: 0.1
			  },
			  icon: "fa fa-location-arrow",
			  showCompass: true,
			  drawMarker: true,
			  metric: true,
			  strings: {
				title: "Mia localizzazione",
				popup: "Ti trovi all interno di un raggio di {distance} {unit} da questo punto",
				outsideMapBoundsMsg: "You seem located outside the boundaries of the map"
			  },
			  locateOptions: {
				maxZoom: 20,
				watch: true,
				enableHighAccuracy: true,
				maximumAge: 10000,
				timeout: 10000
			  }
			}).addTo(map);

			map.setMinZoom(9);
			map.fitBounds(me.getBounds());
			map.setMaxBounds([
			[44.830552,10.415039],
			[46.096091,14.120178]
			]);
			
			//map.locate({setView: true, maxZoom: 16});
			me.setMap(map);

			
			
			//ESRI.addTo(map);
			var confiniComunaliDisable = L.geoJson(null, {
			  style: function (feature) {
				return {
				  color: "#ff0000",
				  fill: false,
				  opacity: 0.4,
				//  fillColor: 'black',
				  weight: 1,
				  clickable: false
				};
			  },
			  onEachFeature: function (feature, layer) {
				/*confiniComunaliSearch.push({
				  name: layer.feature.properties.nome_comune,
				  adesione: layer.feature.properties.adesione,
				  source: "confiniComunali",
				  id: L.stamp(layer),
				  bounds: layer.getBounds()
				});*/
			   layer.on ({ click: function (e) {
						var content = "<table> <tr align='center'><td>Comune di " + layer.feature.properties.nome_comune + "</td></tr><tr align='center'><td>(in attesa dei dati)</td></tr>";
									 
							content += "</table>";
							 var popup = new L.Popup({
							autoPan: true,
							keepInView: false,
							closeButton: false,
							offset: new L.point(0, -5)}).setContent(content);
						
				layer.bindPopup(popup);}});
			  }
			});

			me.setBaseMap(ESRI);
			
			
			map.on('zoomend',function(e){
				console.log('ZOOMEND',me.getMap().getZoom());
				
				Ext.Array.each(LayerStorage.getZoomLayers(),function(zoomLayer){
					
					if(me.getMap().getZoom() >= zoomLayer.minZoom){
						Ext.fireEvent('activateZoomLayer',zoomLayer);
					}else{
						Ext.fireEvent('removeZoomLayer',zoomLayer);
					}
					
				});
			});


			
        }
    },
    onResize: function(w, h, oW, oH){
		var map = this.getMap();
		if (map){
			map.invalidateSize();
		}
	}
});
