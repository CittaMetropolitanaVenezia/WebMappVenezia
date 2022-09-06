
Ext.define('WebMappVenezia.view.map.FormMapController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.formmap',
    config:{
        map: null,
		baseMap: null,
		confiniComunali: null,
		confiniComunaliSearch: [],
		submissionMarker: null
    },
    afterRender: function(t, eOpts){
        var leafletRef = window.L;
        if (leafletRef == null){
            this.update('No leaflet library loaded');
        } else {
			var me = this;	
			if(!me.getMap()){
				var map = L.map('leafletmap3',{
					zoomControl: false
				});
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
				[45.22974381814851,12.101875465397018],
				[45.67660878475521,12.712793454354998]
				]);
				//map.locate({setView: true, maxZoom: 16});
				me.setMap(map);
				var ESRI = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
					//attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
					attribution: '<a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank"> World topografic Map Esri</a>',
					minZoom: 1,
					maxZoom: 18
				}).addTo(map);
				map.on('click',function(e){
					var latlng = e.latlng;
					if(me.getSubmissionMarker()){
						map.removeLayer(me.getSubmissionMarker());
					}
					var marker = L.marker([latlng.lat,latlng.lng]).addTo(map);
					me.setSubmissionMarker(marker);
					Ext.fireEvent('positionClicked',latlng);
					
					
				});
				/*var ORTOFOTO = L.tileLayer.wms('https://celegis.cittametropolitana.ve.it:443/geoserver/ows?', {
					layers: 'geonode:sf_4B_15cm_CTR5000_WGS84',
					attribution: 'Città Metropolitana di Venezia 2014',
					maxZoom: 22,
					tileSize: 256
				}).addTo(map);*/

				me.setBaseMap(ESRI);
				var confiniComunaliDisable = L.geoJson(null, {
				  style: function (feature) {
					return {
					  color: "#ff0000",
					  fill: false,
					  opacity: 0.4,
					  weight: 1,
					  clickable: false
					};
				  },
				  onEachFeature: function (feature, layer) {
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
							
				var geoObj = Ext.decode(sessionStorage.getItem('confini_comunali'));
			
				confiniComunaliDisable.addData(geoObj);
				me.getMap().addLayer(confiniComunaliDisable);

			}
						
        }
    },
    onResize: function(w, h, oW, oH){
		var map = this.getMap();
		if (map){
			map.invalidateSize();
		}
	}
});
