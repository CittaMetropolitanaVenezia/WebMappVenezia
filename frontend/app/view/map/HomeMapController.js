
Ext.define('WebMappVenezia.view.map.HomeMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.homemap',
    config:{
        map: null,
		baseMap: null,
		confiniComunali: null,
		confiniComunaliSearch: []
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
				var map = L.map('leafletmap2',{
					zoomControl: false
				});
				/*L.control.zoom({
					position: 'bottomright'
				}).addTo(map);*/
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
				
				map.fitBounds([
				[44.830552,10.415039],
				[46.096091,14.120178]
				]);
				map.setMaxBounds([
				[44.830552,10.415039],
				[46.096091,14.120178]
				]);
				//map.locate({setView: true, maxZoom: 16});
				me.setMap(map);
				/*var ESRI = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
					//attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
					attribution: '<a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank"> World topografic Map Esri</a>',
					minZoom: 1,
					maxZoom: 18
				}).addTo(map);*/
				var cartoLightEsri = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", {
				  maxZoom: 19,
				  tileSize: 256,
				 // attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
				}).addTo(map);
				/*var ORTOFOTO = L.tileLayer.wms('https://celegis.cittametropolitana.ve.it:443/geoserver/ows?', {
					layers: 'geonode:sf_4B_15cm_CTR5000_WGS84',
					//attribution: 'Città Metropolitana di Venezia 2014',
					maxZoom: 22,
					tileSize: 256
				}).addTo(map);*/

				me.setBaseMap(cartoLightEsri);
				/***************************************** CONFINI COMUNALI *******************************/		
				var confiniComunali = L.geoJson(null, {
				  style: function (feature) {
					return {
					  color: "#ff0000",
					  fill: false,
					  opacity: 0.9,
					  weight: 1,
					  clickable: false
					};
				  }
				});
				
				
				var geoObj = Ext.decode(sessionStorage.getItem('confini_comunali'));
			
				confiniComunali.addData(geoObj);
				
				
				/*Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getGeoJson.php',
				   params: {
					   schema: 'public',
					   table: 'comuni',
					   cache: '/var/www/html/appvenezia/phpapp/cache/comuni.json'
				   },
				   success: function(response){				
					   confiniComunali.addData(response.data);
					   
				   },
				   failure: function(response){
					   Ext.Msg.alert('Errore','Errore del Server');
				   }
				}); */
				map.addLayer(confiniComunali);
				/***************************************** COMUNI NON ADERENTI *******************************/
				/*var confiniComunaliDisabled = L.geoJson(null, {
				  style: function (feature) {
					return {
					  color: "#ff0000",
					  fill: true,
					  opacity: 1,
					  fillOpacity: 0.8,
					  fillColor: 'red',
					  weight: 1,
					  clickable: false
					};
				  }
				});
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getGeoJson.php',
				   params: {
					   schema: 'public',
					   table: 'comuni',
					 //  filter:'adesione!false'
				   },
				   success: function(response){				
					   confiniComunaliDisabled.addData(response.data);
					   
				   },
				   failure: function(response){
					   Ext.Msg.alert('Errore','Errore del Server');
				   }
				}); 
				map.addLayer(confiniComunaliDisabled);*/
				/***************************************** NOMI COMUNI *******************************/
				var nomiComuni = L.geoJson(null, {
				  style: function (feature) {
					return {
					  color: "#ff0000",
					  fill: false,
					  opacity: 0.9,
					  weight: 1,
					  clickable: false
					};
				  },
				  pointToLayer: function(feature,latlng){
					 return L.marker(latlng, {
					  icon: L.divIcon({
							className: 'label',
							html: '<font size="2" color="white" face="arial">'+feature.properties.nome_comune+'</font>',
							iconSize: [100, 40]
						}), 
					  //title: confLayer.label,
					  riseOnHover: true
					}); 
				  }
				});
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getGeoJson.php',
				   params: {
					   schema: 'qu_cmve',
					   table: 'v_cor_comuni_centroide',
					   cache: '/var/www/html/appvenezia/phpapp/cache/v_cor_comuni_centroide.json'
				   },
				   success: function(response){				
					   nomiComuni.addData(response.data);
					  // map.addLayer(nomiComuni);
				   },
				   failure: function(response){
					   Ext.Msg.alert('Errore','Errore del Server');
				   }
				});
			map.on('zoomend',function(evt){
					if(me.getMap().getZoom() > 10){
						map.addLayer(nomiComuni);
					}else{
						map.removeLayer(nomiComuni);
					}
			});
			map.setMinZoom(8);
			/**************************************************************************************************************/
			
						
        }
    },
    onResize: function(w, h, oW, oH){
		var map = this.getMap();
		if (map){
			map.invalidateSize();
		}
	}
});
