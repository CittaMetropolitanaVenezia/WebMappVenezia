/**
 * This class is the controller for the main view for the application. It is specified as
 * the "controller" of the Main view class.
 *
 * TODO - Replace this content of this view to suite the needs of your application.
 */
Ext.define('WebMappVenezia.view.main.MainController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.main',
	listen: {
		global: {
			clearMap: 'clearMap', 
			mapstarted: 'setCurrentTopic',
			openPoiTab: 'openPoiTab',
			limitationAreasLoaded: 'limitationAreasLoaded',
			clearLimitationMap: 'clearLimitationMap',
			loadTrafficMap: 'loadTrafficMap',
			openLimitationPopup: 'openLimitationPopup',
			getarea: 'getarea',
			activateBackButton: 'activateBackButton',
			activateZoomLayer: 'activateZoomLayer',
			removeZoomLayer: 'removeZoomLayer',
			activateZoomLayerLimit: 'activateZoomLayerLimit',
			removeZoomLayerLimit: 'removeZoomLayerLimit'
		}
	},
	
	config:{
		spotlight: null,
		limitationSpotlight: null,
		topic: null,
		engTopic: null,
		legendPanel: null,
		positionMarker: null,
		clusterGroups: [],
		wmsLayers: [],
		geoJsons: [],
		addressToolbar: null,
		addressDataview: null,
		routeAddressDataview: null,
		routeManeuversDataview: null,
		routePanel: null,
		startPoint: null,
		endPoint: null,
		middlePoints: [],
		startMarker: null,
		endMarker: null,
		middleMarkers: [],
		maneuverMarker: null,
		routePolyline: null,
		routePolylineBorder: null,
		greenIcon: null,
		redIcon: null,
		yellowIcon: null,
		orangeIcon: null,
		delayedAddressCall: null,
		activeRootNode: null,
		poiSearchMarker: null,
		limitationPanel: null,
		limitMap: null,
		limitationLayer: null,
		limitationLegend: null,
		limitationMarker: null,
		delayedLimitAddress: null,
		limitAddressDataview: null,
		limitRecord: null,
		limitationLegendPanel: null,
		oldTabItem: null,
		newTabItem: null,
		confiniComunaliValue: true,
		confiniComunaliTrafficoValue: true,
		baseMapValue: 'esri',
		baseMapTrafficoValue: 'esri'
	},
	init: function(){
		var me = this;
		me.setGreenIcon(new L.Icon({
		  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
		  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		  iconSize: [25, 41],
		  iconAnchor: [12, 41],
		  popupAnchor: [1, -34],
		  shadowSize: [41, 41]
		}));
		me.setRedIcon(new L.Icon({
		  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
		  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		  iconSize: [25, 41],
		  iconAnchor: [12, 41],
		  popupAnchor: [1, -34],
		  shadowSize: [41, 41]
		}));
		me.setYellowIcon(new L.Icon({
		  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-yellow.png',
		  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		  iconSize: [25, 41],
		  iconAnchor: [12, 41],
		  popupAnchor: [1, -34],
		  shadowSize: [41, 41]
		}));
		me.setOrangeIcon(new L.Icon({
		  iconUrl: 'https://cdn.rawgit.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-orange.png',
		  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
		  iconSize: [25, 41],
		  iconAnchor: [12, 41],
		  popupAnchor: [1, -34],
		  shadowSize: [41, 41]
		}));
		
		
		//toolbar ricerca indirizzi
		me.setAddressToolbar(Ext.create('Ext.Toolbar',{
		   floated: true,
		   draggable: false,
		   id: 'addressToolbar',
		   showAnimation: {
			   type: 'fadeIn'
		   },
		   hideAnimation: {
			   type: 'fadeOut'
		   },
		   width: '100%',
		   layout: 'hbox',
		   items:[{
			   xtype: 'textfield',
			   labelAlign: 'right',
			   label: ' ',
			   align: 'left',
			   flex: 1,
			   padding: '5 5 5 5',
			   placeholder: Ext.decode(localStorage.getItem('map')).addressSearchplaceholder,
			   /*listeners:{
				   change: function(textfield,e,eOpts){
					   if(textfield.getValue().length == 0){
						   me.getAddressDataview().getStore().removeAll();
						   me.getAddressDataview().hide();
						   return;
					   }
						  me.getDelayedAddressCall().delay(1500); 
					   
				   }
			   }*/
		   },{
			   xtype: 'button',
			   iconCls: 'x-fa fa-search',
			   handler: function(btn){
				   me.getAddressDataview().getStore().removeAll();
				   me.getAddressDataview().hide();
				   me.getDelayedAddressCall().delay(0); 
			   }
		   }]
	   }));
		//dataview toolbar ricerca indirizzi
	   me.setAddressDataview(Ext.create('Ext.dataview.DataView', {
		   floated: true,
		   scrollable: 'y',
		   height: '150px',
		   id: 'addressDataview',
		   showAnimation: {
			   type: 'fadeIn'
		   },
		   hideAnimation: {
			   type: 'fadeOut'
		   },
		   cls: 'dataview-basic-address',
		   itemTpl: '<div class="address">{address}</div>',
		   width: '100%',
		   draggable: false,
		   emptyText: '<div class="x-grid-empty">Nessun indirizzo trovato</div>',
		   listeners: {
			   select: 'onItemAddressSelected',
			   scope: me
		   },
		   store: {
				fields: ['address', 'latLng'],
		   }})
	   );
	  //dataview calcolatore route
	  me.setRouteAddressDataview(Ext.create('Ext.dataview.DataView', {
		   floated: true,
		   scrollable: 'y',
		   height: '150px',
		   id: 'routeAddressDataview',
		   showAnimation: {
			   type: 'fadeIn'
		   },
		   hideAnimation: {
			   type: 'fadeOut'
		   },
		   cls: 'dataview-basic-address',
		   itemTpl: '<div class="address">{address}</div>',
		   width: '100%',
		   draggable: false,
		   emptyText: '<div class="x-grid-empty">Nessun indirizzo trovato</div>',
		   listeners: {
			   select: 'onRouteAddressSelected',
			   scope: me
		   },
		   store: {
				fields: ['address', 'latLng'],
	 }}));
	 me.setRouteManeuversDataview(Ext.create('Ext.dataview.DataView', {
		   floated: true,
		   scrollable: 'y',
		   height: '60%',
		   id: 'routeManeuversDataview',
		   showAnimation: {
			   type: 'fadeIn'
		   },
		   hideAnimation: {
			   type: 'fadeOut'
		   },
		   cls: 'dataview-basic-route',
		   itemTpl: '<div style="padding:5px 5px 5px 5px">{instruction}</div>',
		   width: '100%',
		   draggable: false,
		   emptyText: '<div class="x-grid-empty">Nessun direzione trovata</div>',
		   store: Ext.create('Ext.data.Store'),
		   listeners:{
			   select: 'onRouteManeuverSelected',
			   scope: me
		   }
	}));	   
	  //pannello calcola percorso
	  me.setRoutePanel(Ext.create('Ext.Panel',{
				floated: true,
			    //closable: true,
				tools:[{
					  iconCls: 'x-fa fa-undo blackIcon',
					  handler: 'resetRoute',
					  scope: me 
				   },{
					   iconCls: 'x-fa fa-times blackIcon',
					   itemId: 'closeBtn',
					   handler:function(panel){
						   if(me.getSpotlight()){
							   return;
						   }
						   panel.close();
					   }
				}],
				referenceHolder: true,
				title: Ext.decode(localStorage.getItem('titles')).routePanelTitle,
			    showAnimation: {
				   type: 'slideIn',
				   direction: 'down'
			   },
			   hideAnimation: {
				   type: 'slideOut',
				   direction: 'up'
			   },
			    id: 'routePanel',
			    header:{
				   style:{
					   backgroundColor: '#98fb98'
				   }
			    },
			    closeAction: 'hide',
			    //height: '40%',
			    width: '100%',
			    draggable: false,
				items:[{
						xtype: 'formpanel',
						flex: 1,
						scrollable: 'y',
						items:[{
							xtype: 'fieldset',
							layout: 'hbox',
							title: Ext.decode(localStorage.getItem('bikefriends')).startText,
							items:[{
								xtype: 'textfield',
								flex: 1,
								name: 'start_point',
								itemId: 'start_point',
								reference: 'start_point',
								//label: ' ',
								labelAlign: 'right',
							},{
								xtype :'button',
								iconCls: 'x-fa fa-search',
								handler: function(btn){
									
									var textfield = btn.up('panel').down('#start_point');
									
									if(!textfield.getValue() || textfield.getValue().length < 3){
										
										   var map = Ext.getCmp('leafletmap').getController().getMap(); 
										   me.getRouteAddressDataview().getStore().removeAll();
										   me.getRouteAddressDataview().hide();
										   me.getRouteManeuversDataview().getStore().removeAll();
										   me.getRouteManeuversDataview().hide();
										   me.getRoutePanel().setHtml(null);
										   if(me.getStartMarker()){
											   map.removeLayer(me.getStartMarker());
										   }
										   if(me.getRoutePolyline()){
											   map.removeLayer(me.getRoutePolyline());
											   map.removeLayer(me.getRoutePolylineBorder());
										   }
										   if(me.getRoutePanel().lookup('maneuverBtn').getPressed()){
											   me.getRoutePanel().lookup('maneuverBtn').toggle();
										   }
										   if(me.getStartPoint()){
											   me.setStartPoint(null);
										   }
										   
									   }else{
									   
										 //  textfield.setLabel(' ');
										//   textfield.setLabelCls('x-fa fa-spinner fa-fw fa-spin animated-spinning-icon blueIcon');
										   me.getRouteAddressDataview().getStore().removeAll();	   
										   
										   Ext.data.JsonP.request({
											   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddress.php',
											   params: {
												   address: textfield.getValue()
											   },
											   success: function(response){		
														
													  if(response.data.length > 0){
														  
														   me.getRouteAddressDataview().showBy(textfield);
														   me.getRouteAddressDataview().getStore().loadData(response.data);
														   me.getRouteAddressDataview().startPoint = true;
														   me.getRouteAddressDataview().endPoint = false;
														   me.getRouteAddressDataview().waypoint = false;
														   me.getRouteAddressDataview().waypointId = null;					   
														   me.getRouteAddressDataview().setZIndex(99999);
													  }else{
														  Ext.Msg.alert('Attenzione', Ext.decode(localStorage.getItem('map')).searchNoResults);
													  }
											   
													   
													   textfield.setLabelCls(null);
													   textfield.setLabel(null);
											   },
											   failure: function(response){
													//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
													alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText+ '.Failure: getAddress');
													//Ext.Msg.alert('Errore','Errore del Server');
													textfield.setLabelCls(null);
													textfield.setLabel(null);
											   }
											});  
									   }
								}
							}]
						},{
								xtype: 'fieldset',
								title: Ext.decode(localStorage.getItem('bikefriends')).endText,
								layout: 'hbox',
								items:[{
									xtype: 'textfield',
									name: 'end_point',
									flex: 1,
									reference: 'end_point',
									itemId: 'end_point',
									//label: ' ',
									labelAlign: 'right',
								},{
									xtype :'button',
									iconCls: 'x-fa fa-search',
									handler: function(btn){
										var textfield = btn.up('panel').down('#end_point');
										
										if(!textfield.getValue() || textfield.getValue().length < 3){
											
										   var map = Ext.getCmp('leafletmap').getController().getMap(); 
										   me.getRouteAddressDataview().getStore().removeAll();
										   me.getRouteAddressDataview().hide();
										   me.getRouteManeuversDataview().getStore().removeAll();
										   me.getRouteManeuversDataview().hide();
										   me.getRoutePanel().setHtml(null);
										   if(me.getEndMarker()){
												map.removeLayer(me.getEndMarker());
										   }			
										   if(me.getRoutePolyline()){
											   map.removeLayer(me.getRoutePolyline());
											   map.removeLayer(me.getRoutePolylineBorder());
										   }
										   if(me.getRoutePanel().lookup('maneuverBtn').getPressed()){
											   me.getRoutePanel().lookup('maneuverBtn').toggle();
										   }
										   if(me.getEndPoint()){
											   me.setEndPoint(null);
										   }
									   }else{
										  textfield.setLabel(' ');
									//	  textfield.setLabelCls('x-fa fa-spinner fa-fw fa-spin animated-spinning-icon blueIcon');
										  me.getRouteAddressDataview().getStore().removeAll();		 
										  
										  Ext.data.JsonP.request({
											   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddress.php',
											   params: {
												   address: textfield.getValue()
											   },
											   success: function(response){
													   if(response.data.length > 0){
														   me.getRouteAddressDataview().showBy(textfield);
														   me.getRouteAddressDataview().getStore().loadData(response.data);
														   me.getRouteAddressDataview().startPoint = false;
														   me.getRouteAddressDataview().endPoint = true;
														   me.getRouteAddressDataview().waypoint = false;
														   me.getRouteAddressDataview().waypointId = null;
														   me.getRouteAddressDataview().setZIndex(99999);
													   }else{
														   Ext.Msg.alert('Attenzione', Ext.decode(localStorage.getItem('map')).searchNoResults);
													   }
													   
				
													   
													   textfield.setLabelCls(null);
													   textfield.setLabel(null);
											   },
											   failure: function(response){
													//Ext.Msg.alert('Errore','Errore del Server');
													//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
													alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddress');
													textfield.setLabelCls(null);
													textfield.setLabel(null);
											   }
										 }); 
									   }
									}
								}]
							},{
								xtype: 'toolbar',
								docked: 'bottom',
								shadow: false,
								height: '60px',
								items:[{
									xtype: 'button',
									iconCls: 'x-fa fa-plus',
									reference: 'addBtn',
									handler: 'addRouteWaypoint',
									docked: 'left',
									scope: me
								},{
									xtype: 'button',
									iconCls: 'x-fa fa-arrows-v',
									reference: 'swapBtn',
									handler: 'reverseDirections',
									docked: 'right',
									scope: me
								},{
									xtype: 'button',
									reference: 'maneuverBtn',
									iconCls: 'x-fa fa-compass',
									enableToggle: true,
									handler: 'showDirections',
									//docked: 'left',
									centered: true,
									scope: me
								}]
							}]
				}],
				listeners:{
					beforehide: function(){
						me.getRouteManeuversDataview().setHidden(true);
						me.getRouteAddressDataview().setHidden(true);
						Ext.getCmp('mapTabTitle').show();
						Ext.getCmp('mainTabPanel').getTabBar().show();
					},
					painted: function(el){
						
						el.getHeader().setHeight(70);
						setTimeout(function(){
							Ext.getCmp('mapTabTitle').hide();
							Ext.getCmp('mainTabPanel').getTabBar().hide();
						},200);
						
					}
	  }})); 
	   
		   me.setDelayedAddressCall(new Ext.util.DelayedTask(function(){
			   
			//	me.getAddressToolbar().down('textfield').setLabelCls('x-fa fa-spinner fa-fw fa-spin animated-spinning-icon blueIcon');
				me.getAddressDataview().getStore().removeAll();
				me.getAddressDataview().hide();
			    Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddress.php',
				   params: {
					   address:  me.getAddressToolbar().down('textfield').getValue()
				   },
				   success: function(response){
						   if(response.data.length == 0){
							   me.getAddressToolbar().down('textfield').setLabelCls(null);
							   // me.getAddressToolbar().down('textfield').setValue(null);
							  // Ext.Msg.alert('Attenzione','Nessun risultato');
								alert(Ext.decode(localStorage.getItem('map')).searchNoResults);
							   return;
						   }			   
						   me.getAddressDataview().getStore().loadData(response.data);
						   me.getAddressDataview().showBy(me.getAddressToolbar());
						   me.getAddressToolbar().down('textfield').setLabelCls(null);
						   
							if(me.getSpotlight()){
							 var tooltipPanel = Ext.create('Ext.Panel',{
										   html: Ext.decode(localStorage.getItem('tooltips')).searchLocationSelection,
										   // html: 'Seleziona una delle località per venire posizionato su di essa',
										   modal: true,
										   
										   width: '90%',
										   height: '150px',
										   anchor: true,
										   items:[{
											   xtype: 'toolbar',
											   docked: 'bottom',
											   height: '30px',
											   items:[
											   '->',{
												   xtype: 'button',
												   docked: 'right',
												   iconCls: 'x-fa fa-check',
													handler: function(btn){ 
													   btn.up('panel').setModal(false);
													   btn.up('panel').destroy();
												   }
											   }]
										   }],
										   listeners: {
											   destroy: function(){
												   
												   //console.log(' DESTROY');
												   
												   if(me.getTopic()=='amicibici'){
													   
													 //  me.getAddressDataview().setSelected(1);
													   me.onItemAddressSelected(me.getAddressDataview(),me.getAddressDataview().getStore().getData().items[0],{});
													   me.getAddressToolbar().setModal(false);
													   me.getAddressDataview().setModal(false);
													  // me.getAddressToolbar().down('textfield').enable();
													   Ext.getCmp('routeBtn').show();
													   Ext.getCmp('searchBtn').setIconCls('x-fa fa-search blueIcon');
													   me.getAddressToolbar().down('textfield').setReadOnly(false);													   
													   me.bikeFriendSpotlight();
												   }else{
													//   //console.log('DATA',me.getAddressDataview().getStore().getData());
													   me.onItemAddressSelected(me.getAddressDataview(),me.getAddressDataview().getStore().getData().items[0],{});
													   //me.getAddressDataview().setSelected(1);
													   me.setSpotlight(false);
													   me.getAddressToolbar().setModal(false);
													   me.getAddressDataview().setModal(false);
													   //me.getAddressToolbar().down('textfield').enable();
													   Ext.getCmp('legendBtn').show();
													   Ext.getCmp('spotlightBtn').show(); 	
													   Ext.getCmp('searchBtn').enable();
													   Ext.getCmp('legendBtn').enable();
													   Ext.getCmp('spotlightBtn').enable();
													   me.getAddressToolbar().down('textfield').setReadOnly(false);	
													   localStorage.setItem('loadSpotlight','false');
												   }									  	 										  							  
											   }
										   }
									 });
									 tooltipPanel.showBy(me.getAddressDataview());
									 tooltipPanel.setZIndex(9999);
						   }else{
							   me.getAddressDataview().setZIndex(9999);
						   }
				   },
				   failure: function(response){
						//Ext.Msg.alert('Errore','Errore del SErver');
						//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddress');
						me.getAddressToolbar().down('textfield').setLabelCls(null);
				   }
				}); 
		   }));
		   me.setLimitationPanel(Ext.create('Ext.Panel',{
				floated: true,
				scrollable: 'y',
				tools:[{
					   iconCls: 'x-fa fa-times blackIcon',
					   itemId: 'closeBtn',
					   handler:function(panel){
						   if(me.getSpotlight()){
							   return;
						   }
						   panel.close();
					   }
				}],
				referenceHolder: true,
				//title: 'Dettagli viaggio',
			    showAnimation: {
				   type: 'slideIn',
				   direction: 'down'
			   },
			   hideAnimation: {
				   type: 'slideOut',
				   direction: 'up'
			   },
			    id: 'limitationPanel',
			    header:{
				   style:{
					   backgroundColor: '#98fb98'
				   }
			    },
			    closeAction: 'hide',
			    height: '100%',
			    width: '100%',
				defaults:{
					margin: '10 10 10 10'
				},
			    draggable: false,
				items:[{
					xtype: 'fieldset',
					title: 'Dove vuoi andare?',
					id: 'locationFieldset',
					layout: 'hbox',
					reference:'locationFieldset',
					//referenceHolder: true,
					items:[{
						xtype: 'textfield',
						flex: 1,
						labelAlign: 'right',
						reference: 'limitedLocationField',
						placeholder: 'Inserisci luogo..',
						listeners:{
							//change: 'onLimitatedLocationSearch',
							focus: 'onTrafficLocationFocus',
							scope: me
						}
					},{
						xtype: 'button',
						iconCls: 'x-fa fa-search',
						handler: 'onLimitatedLocationSearch',
						scope: me
					}]
				},{
					xtype: 'fieldset',
					title: 'Giorno e Data',
					layout: 'vbox',
					reference: 'dayTimeFieldset',
					//referenceHolder: true,
					instructions: 'Inserisci la fascia oraria e seleziona la giornata',
					items:[{
						xtype:'selectfield',
						required: true,
						placeholder: 'Seleziona il giorno..',
						reference: 'dayToggleField',
						defaultPhonePickerConfig: {
							//modal: false,
							doneButton: {
								iconCls: 'x-fa fa-check-circle',
								text: ''
							},
							cancelButton: {
								iconCls: 'x-fa fa-times-circle',
								text: ''
							}
						},
						options: [{text: 'Oggi', value: 'today'},{text: 'Domani', value: 'tomorrow'}],
						name: 'trip_day',
						listeners:{
							painted: function(selectfield){
								console.log('ENTRO QUA');
								if(localStorage.getItem('defLang') == "it"){
									selectfield.setOptions([{text: 'Oggi', value: 'today'},{text: 'Domani', value: 'tomorrow'}]);
								}else{
									selectfield.setOptions([{text: 'Today', value: 'today'},{text: 'Tomorrow', value: 'tomorrow'}]);
								}
							}
						}
					},{
						xtype: 'selectfield',
						required: true,
						reference: 'timeToggleField',
						placeholder: 'Seleziona la fascia oraria..',
						defaultPhonePickerConfig: {
							//modal: false,
							doneButton: {
								iconCls: 'x-fa fa-check-circle',
								text: ''
							},
							cancelButton: {
								iconCls: 'x-fa fa-times-circle',
								text: ''
							}
						},
						reference: 'timeZoneField',
						name: 'trip_hours',
						options:[{
							text: '00:00 - 08:30',
							value:'00:00 - 08:30'
						},{
							text: '08:30 - 12:30',
							value:'08:30 - 12:30'
						},{
							text: '12:30 - 18:30',
							value:'12:30 - 18:30'
						},{
							text: '18:30 - 00:00',
							value:'18:30 - 00:00'
						}]
					}]
				},{
					xtype: 'panel',
					referenceHolder: true,
					reference: 'generalVehicleInfoPanel',
					items:[{
						xtype: 'fieldset',
						items:[{
							xtype:'selectfield',
							required: true,
							//placeholder: 'Veicolo...',
							autoSelect: false,
							reference: 'vehicleField',
							defaultPhonePickerConfig: {
							//	modal: false,
								doneButton: {
									iconCls: 'x-fa fa-check-circle',
									text: ''
								},
								cancelButton: {
									iconCls: 'x-fa fa-times-circle',
									text: ''
								}
							},
							name: 'trip_vehicle',						
							listeners:{
								change:function(selectfield,newValue){
									if(newValue){
										//console.log('newValue',newValue);
										Ext.data.JsonP.request({
										   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getVehicleFuelType.php',
										   params: {
											   vehicle: newValue,
											   lang: localStorage.getItem('defLang')
										   },
										   success: function(response){	
												var options = [];
												Ext.Array.each(response.data,function(item){
													options.push({
														text: item.alimentazione,
														value: item.alimentazione
													})
												});
												selectfield.up('panel').lookup('vehicleFuelField').setOptions(options);
												if(newValue != localStorage.getItem('vehicle')){
													
													localStorage.setItem('vehicle',newValue);
													localStorage.removeItem('vehicleFuel');
													localStorage.removeItem('vehicleClass');
													selectfield.up('panel').lookup('vehicleFuelField').setValue(null);
													//selectfield.up('panel').lookup('vehicleClassField').setValue(null); 
												}else{
													selectfield.up('panel').lookup('vehicleFuelField').setValue(localStorage.getItem('vehicleFuel'))
												}

										   },
										   failure: function(response){
										   }
										}); 
									}else{
										localStorage.removeItem('vehicle');
									}		
								}
							}
						},{
							xtype:'selectfield',
							required: true,
							autoSelect: false,
							placeholder: 'Alimentazione...',
							reference: 'vehicleFuelField',
							defaultPhonePickerConfig: {
								//modal: false,
								doneButton: {
									iconCls: 'x-fa fa-check-circle',
									text: ''
								},
								cancelButton: {
									iconCls: 'x-fa fa-times-circle',
									text: ''
								}
							},
							name: 'trip_vehicleFuel',
							listeners: {
								change:function(selectfield,newValue){
									if(newValue){
										Ext.data.JsonP.request({
										   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getVehicleClasses.php',
										   params: {
											   vehicle: selectfield.up('panel').lookup('vehicleField').getValue(),
											   vehicleFuelType: newValue,
											   lang: localStorage.getItem('defLang')
										   },
										   success: function(response){	
												var options = [];
												Ext.Array.each(response.data,function(item){
													options.push({
														text: item.classe,
														value: item.classe
													})
												});
												selectfield.up('panel').lookup('vehicleClassField').setOptions(options); 
												if(newValue != localStorage.getItem('vehicleFuel')){
													localStorage.setItem('vehicleFuel',newValue);		
													localStorage.removeItem('vehicleClass');
													selectfield.up('panel').lookup('vehicleClassField').setValue(null); 
												}else{
													selectfield.up('panel').lookup('vehicleClassField').setValue(localStorage.getItem('vehicleClass'));
												}
										   },
										   failure: function(response){
										   }
										}); 
									}else{
										localStorage.removeItem('vehicleFuel');
									}
											
								}
							}
						},{
							xtype:'selectfield',
							required: true,
							autoSelect: false,
							//store: Ext.create('Ext.data.Store',{autoLoad: false,remoteFilter: false,remoteSort: false}),
							placeholder: 'Classe...',
							reference: 'vehicleClassField',
							defaultPhonePickerConfig: {
							//	modal: false,
								doneButton: {
									iconCls: 'x-fa fa-check-circle',
									text: ''
								},
								cancelButton: {
									iconCls: 'x-fa fa-times-circle',
									text: ''
								}
							},
							name: 'trip_vehicleClass',
							listeners: {
								change:function(selectfield,newValue){
									if(newValue){
										localStorage.setItem('vehicleClass',newValue);
									}else{
										localStorage.removeItem('vehicleClass');
									}							
								}
							}
						}]
					}]
				},{
					xtype: 'button',
					text: 'Aggiorna percorribilità',
					id: 'updateRoadsBtn',
					reference:'updateRoadsBtn',
					iconCls: 'x-fa fa-road',
					handler: 'drawLimitedRoads',
					scope: me
				}],
				listeners:{
					beforeshow: function(panelCmp){
						//traduzioni
						panelCmp.getHeader().setHeight(70);
						panelCmp.setTitle(Ext.decode(localStorage.getItem('roadLimitation')).panelTitle);
						panelCmp.lookup('locationFieldset').setTitle(Ext.decode(localStorage.getItem('roadLimitation')).locationTitle);
						panelCmp.lookup('limitedLocationField').setPlaceholder(Ext.decode(localStorage.getItem('roadLimitation')).locationplaceholder);
						panelCmp.lookup('dayTimeFieldset').setTitle(Ext.decode(localStorage.getItem('roadLimitation')).dayTimeTitle);
						panelCmp.lookup('dayTimeFieldset').setInstructions(Ext.decode(localStorage.getItem('roadLimitation')).dayTimeInstructions);

						panelCmp.lookup('generalVehicleInfoPanel').down('fieldset').setTitle(Ext.decode(localStorage.getItem('roadLimitation')).vehicleLabel);
						panelCmp.lookup('generalVehicleInfoPanel').down('fieldset').setInstructions(Ext.decode(localStorage.getItem('roadLimitation')).newVehicleInstructions);
						
						panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').setPlaceholder(Ext.decode(localStorage.getItem('roadLimitation')).vehicleplaceholder);
						panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleFuelField').setPlaceholder(Ext.decode(localStorage.getItem('roadLimitation')).fuelplaceholder);
						panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleClassField').setPlaceholder(Ext.decode(localStorage.getItem('roadLimitation')).classplaceholder);
						//panelCmp.lookup('vehicleChangeBtn').setText(Ext.decode(localStorage.getItem('roadLimitation')).changeVehicleBtn);
						panelCmp.lookup('updateRoadsBtn').setText(Ext.decode(localStorage.getItem('roadLimitation')).updateRoadsBtn);
						var r = new Date();
						var d = Ext.Date.format(r,'D');
						var h = r.getHours();
						var m = r.getMinutes();
						//se lunedì,mercoledì o venerdì prima delle 12 disabilito il tasto domani(cambiano alle 22 le limitazioni)
						if((d == 'Mon' || d == 'Wed' || d == 'Fri') && h < 12){
							me.getLimitationPanel().lookup('dayToggleField').setDisabled(true);
						}else{
							me.getLimitationPanel().lookup('dayToggleField').setDisabled(false);
						}
						//setto la fascia oraria corrente
						if(h <= 8 && m < 30){
							me.getLimitationPanel().lookup('timeZoneField').setValue('00:00 - 08:30');
						}else if((h == 18 && m >= 30) || (h > 18 && h<=23)){
							me.getLimitationPanel().lookup('timeZoneField').setValue('18:30 - 00:00');
						}else if((h == 12 && m >= 30) || (h > 12 && h<=18)){
							me.getLimitationPanel().lookup('timeZoneField').setValue('12:30 - 18:30');
						}else if( (h == 8 && m >= 30) || (h > 8 && h<=12)){
							me.getLimitationPanel().lookup('timeZoneField').setValue('08:30 - 12:30');
						}	
						Ext.data.JsonP.request({
						   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getVehicles.php',
						   params: {
							   lang: localStorage.getItem('defLang')
						   },
						   success: function(response){	
								var options = [];			
								Ext.Array.each(response.data,function(item){
									options.push({
										text: item.veicolo,
										value: item.veicolo
									})
								});
								panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').setOptions(options);
								if(localStorage.getItem('vehicle') != null && localStorage.getItem('vehicleFuel') != null && localStorage.getItem('vehicleClass') != null){
									//panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').suspendEvents();
									panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').setValue(localStorage.getItem('vehicle'));
									//panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').resumeEvents();
								}else{
									panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').suspendEvents();
									panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').setValue(null);
									panelCmp.lookup('generalVehicleInfoPanel').lookup('vehicleField').resumeEvents();
									localStorage.removeItem('vehicle');
									localStorage.removeItem('vehicleFuel');
									localStorage.removeItem('vehicleClass');
								}
						   },
						   failure: function(response){
						   }
						}); 			
					},
					hide: function(panel){
						me.getDelayedLimitAddress().cancel();
						me.getLimitAddressDataview().getStore().removeAll();
						me.getLimitAddressDataview().hide();
					}
				}
			}
		));
		
		
		var limCls = 'limitationLegendPanel';
		
		if( Ext.isApple ){
			limCls = 'limitationLegendPanel-ios';
		}
		
		me.setLimitationLegend(Ext.create('Ext.Panel',{
			width: '100%',
		    closable: false,
		    cls: limCls,
		    header: false,
			floated: true,
			html: "<div class='my-legend' style='display:block'>"+
					"<div class='legend-title' style='margin-top:10px;'>"+Ext.decode(localStorage.getItem('roadLimitation')).legendTitle+"</div>"+
					"<div class='legend-scale'>"+
					  "<ul class='legend-labels'>"+    
					    "<li><span style='border-color:green;background:#66FF66;'></span>0</li>"+
						"<li><span style='border-color:orange;background:#ffa500;'></span>1</li>"+
						"<li><span style='border-color:red;background:#EA484E;'></span>2</li>"+
					  "</ul>"+
					"</div>"+
					"</div>"+
					"<div class='my-legend2' style='display:block'>"+
					"<div class='legend-scale'>"+
					  "<ul class='legend-labels'>"+
						"<li><span style='border-color:red;height:2px;margin-top:18px;margin-left:10px'></span>"+Ext.decode(localStorage.getItem('roadLimitation')).roadText+"<img style=' margin-top: 8px;margin-left: 15px;margin-right:5px;' src='https://webgis.cittametropolitana.ve.it/webmapp/resources/images/reticolato.png' width='30px'>"+Ext.decode(localStorage.getItem('roadLimitation')).ecoText+ "</li>"+
					  "</ul>"+
					"</div>" + 
					"</div>"   
		}));
		   
		me.setDelayedLimitAddress(new Ext.util.DelayedTask(function(){
		   var searchfield = me.getLimitationPanel().lookup('limitedLocationField');
		   searchfield.setLabel(' ');
		//   searchfield.setLabelCls('x-fa fa-spinner fa-fw fa-spin animated-spinning-icon blueIcon');
		   me.getLimitAddressDataview().getStore().removeAll();
		   me.getLimitAddressDataview().hide();
		   Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddress.php',
			   params: {
				   address: searchfield.getValue()
			   },
			   success: function(response){				
					searchfield.setLabel(null);
						if(response.data.length == 0){
							me.getLimitAddressDataview().hide();
							//Ext.Msg.alert('Attenzione','Nessun risultato');
							alert(Ext.decode(localStorage.getItem('map')).searchNoResults);
							//me.getLimitationPanel().lookup('limitedLocationField').setValue(null);
							return;
						}
						if(searchfield.getValue().length > 3){
							me.getLimitAddressDataview().getStore().loadData(response.data);
							me.getLimitAddressDataview().showBy(me.getLimitationPanel().lookup('limitedLocationField'));
							me.getLimitAddressDataview().setZIndex(99999999);
						}else{
							me.getLimitAddressDataview().hide();
						}
						
					
			   },
			   failure: function(response){
					searchfield.setLabel(null);
					me.getLimitAddressDataview().hide();
			}});
	   }));
	   
	   
	   
	   
	   me.setLimitAddressDataview(Ext.create('Ext.dataview.DataView', {
		   floated: true,
		   scrollable: 'y',
		   height: '200px',
		   id: 'limitAddressDataview',
		   showAnimation: {
			   type: 'fadeIn'
		   },
		   hideAnimation: {
			   type: 'fadeOut'
		   },
		   cls: 'dataview-basic-address',
		   itemTpl: '<div class="address">{address}</div>',
		   width: '100%',
		   draggable: false,
		   emptyText: '<p>Nessun indirizzo trovato</p>',
		   deferEmptyText: true,
		  listeners: {
				  show: function(dataview){
					   if(me.getLimitationPanel().isHidden()){
						   dataview.getStore().removeAll();
						   dataview.hide();
					   }
				   },
			   select: 'onLimitAddressSelected',
			   scope: me
		   },
		   store: {
				fields: ['address', 'latLng'],
		   }})
	   );
	   if(localStorage.getItem('limitationSpotlight') != null){
		   if(localStorage.getItem('limitationSpotlight') == 'false'){
			   me.setLimitationSpotlight(false);
		   }else if(localStorage.getItem('limitationSpotlight')){
				me.setLimitationSpotlight(true);				   
			}else{
				 me.setLimitationSpotlight(false);
			}
		  	   
	   }else{
		   me.setLimitationSpotlight(true);
		   localStorage.setItem('limitationSpotlight',true);
	   }
	   
	   
	   
	   
	   me.setLegendPanel(Ext.create('Ext.Panel',{
		   floated: true,
	
		   header: false, 
		   referenceHolder: true,
		   showAnimation: {
			   type: 'slideIn',
			   direction: 'right'
		   },
		   hideAnimation: {
			   type: 'slideOut',
			   direction: 'left'
		   },
		   //legendBtn: btn,
		   id: 'legendPanel',
		   header:{
			   style:{
				   backgroundColor: '#98fb98'
			   }
		   },
		   closeAction: 'hide',
		   closable: true,
		   height: '100%',
		   width: '90%',
		   hideOnMaskTap: true,
		   modal: true,
		   draggable: false,
		   layout: 'vbox',
		   items:[{
			   xtype: 'tree',
			   flex: 4,
			   id: 'treelegend',
			   hideHeaders: true,
			   striped: true,
			   itemCls: 'noSpacing', 
			   rowLines: false,
			   columns: [{
					xtype: 'treecolumn',
					text: 'Nome',
					dataIndex: 'text',
					flex: 1,
					cell: {
						encodeHtml: false
					},
					renderer: function (value, record) {
												
						var layerText = '<p style="font-weight:bold;">'+value+'</p>';
						
						if(record.data.leaf){	
							if (record.data.icon!="") {
								 layerText = '<img src="'+record.data.icon+'" height="22px" width="22px" style="margin-right:5px;">'+value;
							}
						}
										
						return layerText;

					 }
					 
			   }],
			   store: Ext.create('Ext.data.TreeStore',{
				   rootVisible: true
			   }),
			   listeners:{
				   checkchange: 'onLayerCheck',
				   nodecollapse: 'onLegendGroupCollapse',
				   nodeexpand: 'onLegendGroupCollapse',
				   scope: me
			   }
		   } ],
		   listeners:{
			   beforeshow: function(el){
					el.getHeader().setHeight(70);
					el.setTitle(Ext.decode(localStorage.getItem('titles')).legendPanelTitle);
				},
		   }
		}));		  
	},
	
		
	removeZoomLayer: function(zoomLayer){
		var me = this;
		me.removeLayer(zoomLayer,false);
	},
	
	activateZoomLayer: function(zoomLayer){
		var me = this;
		me.activateLayer(zoomLayer,false);
	},
	
	
	
	
	removeZoomLayerLimit: function(zoomLayer){
		var me = this;
		me.removeLayer(zoomLayer,true);
	},
	
	activateZoomLayerLimit: function(zoomLayer){
		var me = this;
		me.activateLayer(zoomLayer,true);
	},
	
	
	
	
	activateBackButton: function(){
		var me = this;
		//document.addEventListener('backbutton',me.onBackButton,false);
	    document.addEventListener('backbutton',function(evt){
		    me.onBackButton(me);
	    },false);
		
	},
	
	
	//funzione di gestione della legenda
	legendManager: function(tree,topic){
		var me = this;
		var limitMap = true;	
		
		if(topic == null){
			
			topic = me.getEngTopic();
			limitMap = false;
					
		}
		
		
		
		Ext.Array.each(tree.getStore().getData().items,function(treeRecord){
			
			Ext.Array.each(LayerStorage.getLayers(topic),function(layerToActivate){
				
				if(treeRecord.get('leaf')){
					
					if(treeRecord.get('table') == layerToActivate){
						treeRecord.set('checked',true);
						me.activateLayer(treeRecord.data,limitMap); 
					}
					
				}else if(!treeRecord.get('expanded')){
					
					Ext.Array.each(treeRecord.childNodes,function(hiddenChild){
						
						if(hiddenChild.get('table') == layerToActivate){
							
							hiddenChild.set('checked',true);
							
							me.activateLayer(hiddenChild.data,limitMap); 
							
						}
						
					});
				}
				
			});
			
		});
		
		
		//ciclo gli item dell'albero per colorare le i layer accesi
		Ext.Array.each(tree.items.items,function(item,index){		

			if(item.getRecord() && item.getRecord().get('leaf')){
				var treeLayer = item.getRecord();
				
				Ext.Array.each(LayerStorage.getLayers(topic),function(layerToActivate){;
					
					
					if(treeLayer.get('table') == layerToActivate){
						//console.log('ENTRO NELL\'ACTIVATE');
						item.setCls('noSpacing activeLayer');
					}
				});
				
			}else if(item.getRecord() && item.getRecord().childNodes){
				var groupCheck = true;
				
				Ext.Array.each(item.getRecord().childNodes,function(child){
					if(!child.get('checked')){
						groupCheck = false;
					}
				});

				item.getRecord().set('checked',groupCheck);
				
			}
				   			
	    });
	        
	},
	
	
	onMainTabChange: function(panel,newItem,oldItem,eOpts){
		var me = this;
		me.setOldTabItem(oldItem);
		me.setNewTabItem(newItem);
		if(Ext.getCmp('legendPanel') != undefined){
			Ext.getCmp('legendPanel').close();
			Ext.getCmp('legendPanel').down('tree').setRootNode([]);
		}
		if(Ext.getCmp('layerPanel') != undefined){
			Ext.getCmp('layerPanel').close();
		}
		if(oldItem.config.reference == 'mapTitle'){
			Ext.getCmp('routeBtn').hide();
			Ext.fireEvent('clearMap');
		}
		if(newItem.getReference() == 'submissionTab'){
			Ext.fireEvent('loadSubmissionForm');
		}
		if(newItem.config.reference == 'trafficMapTab'){
			Ext.fireEvent('loadTrafficMap');
		}
		if(oldItem.config.reference == 'trafficMapTab'){
			Ext.fireEvent('clearLimitationMap');
			
		}
		if(oldItem.config.reference == 'objectTab'){
			Ext.fireEvent('hideLocalizationDataview');
		}
		
		if(newItem.config.reference == 'objectTab' || newItem.config.reference == 'submissionTab'){
			if(oldItem.config.reference == "mapTitle"){
				Ext.fireEvent('getarea');
			}else{
				Ext.fireEvent('setarea',false);
			}
			
		}
	},
	onBackButton: function(me){
		var activeTab = Ext.getCmp('mainTabPanel').getActiveItem();
		
		if(activeTab.config.reference == 'homeTab'){
			
			 Ext.Msg.show({
			   title: Ext.decode(localStorage.getItem('settings')).exitTitle,
			   message: Ext.decode(localStorage.getItem('settings')).exitMsg,
			   buttons:  [{text: Ext.decode(localStorage.getItem('settings')).exitConfirm,itemId: 'yes'},{text:Ext.decode(localStorage.getItem('settings')).exitDeny, itemId: 'no'}],
			   fn: function(btnId,value,opt){
					if(btnId == 'yes'){
						navigator.app.exitApp();
					}
				} 
		   });	
		   
		}else if(activeTab.config.reference == 'mapTitle'){
			
			if(Ext.getCmp('layerPanel') != undefined){
				Ext.getCmp('layerPanel').close();
			}else if(!me.getLegendPanel().isHidden()){
				me.getLegendPanel().hide();
			}else if(!me.getAddressToolbar().isHidden()){
				me.getDelayedAddressCall().cancel();
				me.getAddressToolbar().hide();
				me.getAddressDataview().hide();		
			}else if(!me.getRoutePanel().isHidden()){
				me.getRoutePanel().hide();
				me.getRouteAddressDataview().hide();
				me.getRouteManeuversDataview().hide();
			}else if(me.getSpotlight()){
				//me.stopSpotlight();
			}else{
				Ext.getCmp('mainTabPanel').setActiveItem(0);
			}	
			
		}else if(activeTab.config.reference == 'trafficMapTab'){
			console.log('entro');
			if(Ext.getCmp('layerPanel') != undefined){
				
				Ext.getCmp('layerPanel').close();
				
			}else if(Ext.getCmp('limitationPopup') != undefined){
				
				Ext.getCmp('limitationPopup').close();
				Ext.getCmp('trafficTabTitle').show();
				Ext.getCmp('mainTabPanel').getTabBar().show();
				
			}else if(!me.getLimitationPanel().isHidden()){
				
				me.getDelayedLimitAddress().cancel();
				me.getLimitAddressDataview().hide();
				me.getLimitationPanel().hide();	
				
			}else if(me.getLimitationLegendPanel() && !me.getLimitationLegendPanel().isHidden()){
				
				me.getLimitationLegendPanel().hide();
				
			}else if(me.getLimitationSpotlight()){
				
			}else{
				Ext.getCmp('mainTabPanel').setActiveItem(0);
			}
			
			
			
		}else if(activeTab.config.reference == 'sanitaryPanel'){
			
			Ext.getCmp('mainTabPanel').setActiveItem(0);
			
		}else if(activeTab.config.reference != 'homeTab' && activeTab.config.reference != 'mapTitle'  && activeTab.config.reference != 'trafficMapTab'){
			Ext.getCmp('mainTabPanel').setActiveItem(me.getOldTabItem());
			if(me.getNewTabItem().getReference() == 'mapTitle'){
					me.setCurrentTopic(me.getTopic(),me.getEngTopic());
			}
		}
		
	},
	goBackFromSettings: function(){
		var me = this;
		Ext.getCmp('mainTabPanel').setActiveItem(me.getOldTabItem());
		if(me.getNewTabItem().getReference() == 'mapTitle'){
				me.setCurrentTopic(me.getTopic(),me.getEngTopic());
		}
		
	},
	
	
	
	
	openLimitationLegendPanel: function(btn){
		  var me = this;
		  if(me.getLimitationLegendPanel()){
			  me.getLimitationLegendPanel().destroy();
		  }
		  
		  me.setLimitationLegendPanel(Ext.create('Ext.Panel',{
			   closable: true,
			   header: false,
			   floated: true,
			   modal: true,
			   referenceHolder: true,
			   //title: Ext.decode(localStorage.getItem('titles')).legendPanelTitle,
			    showAnimation: {
				   type: 'slideIn',
				   direction: 'right'
			   },
			   hideAnimation: {
				   type: 'slideOut',
				   direction: 'left'
			   },
			   hideOnMaskTap: true,
			   //legendBtn: btn,
			   id: 'limitationLegendPanel',
			   header:{
				   style:{
					   backgroundColor: '#98fb98'
				   }
			   },
			   closeAction: 'hide',
			   height: '100%',
			   width: '90%',
			   draggable: false,
			   layout: 'vbox',
			   items:[
			   {
				   xtype: 'tree',
				   flex: 4,
				   id: 'limitationtreelegend',
				   hideHeaders: true,
				   itemHeight: 45,
				   striped: true,
				   itemCls: 'noSpacing', 
				   rowLines: false,
				   columns: [{
						xtype: 'treecolumn',
						text: 'Nome',
						dataIndex: 'text',
						flex: 1,
						cell: {
							encodeHtml: false
						},
						renderer: function (value, record) {
												
							var layerText = '<div style="font-weight:bold;">'+value+'</div>';
							
							if(record.data.leaf){	
								if (record.data.icon!="") {
									 layerText = '<div style="line-height:0px"> <img src="'+record.data.icon+'" height="15px" width="15px" style="margin-right:5px;">'+value+'</div>';
								}
							}
											
							return layerText;

						 }
						 
				   }],
				   store: Ext.create('Ext.data.TreeStore',{
					   rootVisible: true
				   }),
				   listeners:{
					   checkchange: 'onLayerCheckLimit',
					   nodecollapse: 'onLegendGroupCollapseLimit',
					   nodeexpand: 'onLegendGroupCollapseLimit',
					   scope: me
				   }
			   }],
			   listeners:{
				   beforeshow: function(el){
						el.getHeader().setHeight(70);
						el.setTitle(Ext.decode(localStorage.getItem('titles')).legendPanelTitle);
					}
			   }
			}));
				
			var tree = me.getLimitationLegendPanel().down('tree');
					
			var topic = 'traffic';
			if(localStorage.getItem('defLang') == 'it'){
				topic = 'traffico';
			}			
			
			if(sessionStorage.getItem('legendData')){
				
			   var legends = Ext.decode(sessionStorage.getItem('legendData'));
			   tree.setRootNode(legends[topic]);
			   tree.getStore().setRootVisible(false);
			   
			   setTimeout(function(){
				   
					me.legendManager(tree,'traffic');
					
			   },200);	
			   
			}else{
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getLayerList.php',
				   params: {
					   topic: topic
				   },
				   success: function(response){
					   tree.setRootNode(response.data);
					   tree.setMasked(false);
					   tree.getStore().setRootVisible(false);
					   setTimeout(function(){
						   me.legendManager(tree,'traffic');
					   },200);
					   
				   },
				   failure: function(response){
					   //Ext.Msg.alert('Errore','Errore del Server');
					   //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getLayerList');
					   tree.setMasked(false);
				   }
				}); 
			}
					
			me.getLimitationLegendPanel().show();
	 },
	onLimitatedLocationSearch: function(btn){
		var me = this;
		var searchfield = btn.up('fieldset').down('textfield');
		if(searchfield.getValue() && searchfield.getValue().length <3){	
			me.getLimitAddressDataview().getStore().removeAll();
			me.getLimitAddressDataview().hide();
		}else{
			me.getDelayedLimitAddress().delay(0);
		}	
	},
	onLimitAddressSelected: function(dataview,record,eOpts){
		var me = this;
		me.getLimitationPanel().lookup('limitedLocationField').suspendEvents();
		me.getLimitationPanel().lookup('limitedLocationField').setValue(record.get('address'));
		me.getLimitationPanel().lookup('limitedLocationField').resumeEvents();
		me.getLimitAddressDataview().hide(); 
		me.setLimitRecord(record);
	},
	
	
	loadTrafficMap: function(btn){
		var me = this;
		setTimeout(function(){
			//me.getLimitationLegend().showBy(Ext.getCmp('trafficTabTitle'),"tl-bl");
			me.getLimitationLegend().show();
			if(me.getConfiniComunaliTrafficoValue()){
				me.switchConfiniComunaliLimit(null,true,null,null);
			}
			
			
			var skiptree = false;
			
			if(me.getLimitationLegendPanel()){
				
				var tree = me.getLimitationLegendPanel().down('tree');
				
			}else{
				skiptree = true;
			}				
						
			var topic = 'traffic';
			if(localStorage.getItem('defLang') == 'it'){
				topic = 'traffico';
			}			
			if(sessionStorage.getItem('legendData') && !skiptree){
			   var legends = Ext.decode(sessionStorage.getItem('legendData'));
			   tree.setRootNode(legends[topic]);
			   tree.getStore().setRootVisible(false);
			   setTimeout(function(){
					me.legendManager(tree,'traffic');
			   },200);		
			}else if(!skiptree){
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getLayerList.php',
				   params: {
					   topic: topic
				   },
				   success: function(response){
					   tree.setRootNode(response.data);
					   tree.setMasked(false);
					   tree.getStore().setRootVisible(false);
					   setTimeout(function(){
						   me.legendManager(tree,'traffic');
					   },200);
					   
				   },
				   failure: function(response){
					   //Ext.Msg.alert('Errore','Errore del Server');
					   //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getLayerList');
					   tree.setMasked(false);
				   }
				}); 
			}
			
			if(me.getLimitationSpotlight()){
				me.startLimitationSpotlight();
			}
			if(localStorage.getItem('vehicle') && localStorage.getItem('vehicleClass') && localStorage.getItem('vehicleFuel')){
				var r = new Date();
				var d = Ext.Date.format(r,'D');
				var h = r.getHours();
				var m = r.getMinutes();
				//se martedi o giovedi prima delle 12 disabilito il tasto domani(cambiano alle 22 le limitazioni)
				if((d == 'Thu' || d == 'Mon') && h < 12){
					me.getLimitationPanel().lookup('dayToggleField').setDisabled(true);
				}else{
					me.getLimitationPanel().lookup('dayToggleField').setDisabled(false);
				}
				//setto la fascia oraria corrente
				if(h <= 8 && m < 30){
					me.getLimitationPanel().lookup('timeZoneField').setValue('00:00 - 08:30');
				}else if((h == 18 && m >= 30) || (h > 18 && h<=23)){
					me.getLimitationPanel().lookup('timeZoneField').setValue('18:30 - 00:00');
				}else if((h == 12 && m >= 30) || (h > 12 && h<=18)){
					me.getLimitationPanel().lookup('timeZoneField').setValue('12:30 - 18:30');
				}else if( (h == 8 && m >= 30) || (h > 8 && h<=12)){
					me.getLimitationPanel().lookup('timeZoneField').setValue('08:30 - 12:30');
				}
				me.getLimitationPanel().lookup('dayToggleField').setValue('today');
				
				var btn = Ext.getCmp('updateRoadsBtn');
				me.drawLimitedRoads(btn);
			}else{
				localStorage.removeItem('vehicle');
				localStorage.removeItem('vehicleFuel');
				localStorage.removeItem('vehicleClass');
			}
		},200);	
		
	},
	clearLimitationMap: function(){
		var me = this;
		var map = me.getLimitMap();
		Ext.Array.each(me.getClusterGroups(),function(item){
				map.removeLayer(item.layer);			
		});	
		Ext.Array.each(me.getWmsLayers(),function(item){
				map.removeLayer(item.layer);
		});	
		Ext.Array.each(me.getGeoJsons(),function(item){
				map.removeLayer(item.layer);
		});
		me.setClusterGroups([]);
		me.setWmsLayers([]);
		me.setGeoJsons([]);
		var day = me.getLimitationPanel().lookup('dayToggleField').getValue();
	    var layers = 'aree_limitate,grafo_stradale';
	    if(day == 'tomorrow'){
		   layers = layers.replace('aree_limitate','aree_limitate_domani');
	    }
		me.getLimitationLayer().setParams({layers: layers});
		me.getLimitationLegend().hide();
		Ext.fireEvent('setMapBounds',map.getBounds());
		//Ext.fireEvent('setLimitMapBounds',map.getBounds());
		/*me.getLimitMap().fitBounds([
				[45.22974381814851,12.101875465397018],
				[45.67660878475521,12.712793454354998]
		]);*/
		/*me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleField').setValue(null);
		me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleFuelField').setValue(null);
		me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleFuelField').setOptions(null);
		me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleClassField').setOptions(null);
		me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleClassField').setValue(null);*/
		if(me.getLimitationMarker()){
			me.getLimitMap().removeLayer(me.getLimitationMarker());
		}
	},
	limitationAreasLoaded: function(limitMap,limitLayer){
		var me = this;
		//console.log('SETTO LA MAPPA LIMIT');
		me.setLimitMap(limitMap);
		//me.getLimitMap().addLayer(me.getTrafficLimitationRoads());
		me.setLimitationLayer(limitLayer);		
	},
	openLimitationPanel: function(btn,e){
		var me = this;
		me.getLimitationPanel().show();
	},
	openLimitationPopup: function(limitation){
		var me = this;
		var day =  me.getLimitationPanel().lookup('dayToggleField').getValue();
		var areaLimitLevel = limitation.livallerta;
		if(day == 'tomorrow'){
			areaLimitLevel = limitation.livallerta_domani;
		}
		var bgColor = null;
	    switch(areaLimitLevel){
			case '0':
				bgColor = '#7FFF00';
				break;
			case '1':
				bgColor = '#ffa500';
				break;
			case '2':
				bgColor = '#FF0000';
				break;
			default:
				bgColor = 'blueviolet';
	   }
	   //RECUPERO LE DEROGHE O I MESSAGGI RIGUARDANTI IL LIVELLO ALLERTA
	   Ext.data.JsonP.request({
		   
		   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getDeroghe.php',
		   
		   params: {
			   codistat: limitation.codistat,
			   level: areaLimitLevel
		   },
		   
		   success: function(response){
			   
			   var panelHtml = '';
			   
			   var src = '';
			   
			   var height = 0;
			   
			   
			   var ecoHtml = '';
			   
			   var ecoLayers = Ext.decode(localStorage.getItem('ecoLayers'));
			   
			   Ext.Array.each(ecoLayers,function(ecoLayer){
				   if(ecoLayer.codistat == limitation.codistat){
					   ecoHtml = ecoLayer.testo;
				   }
			   });
			   
			   Ext.getCmp('trafficTabTitle').hide();
			   
			   Ext.getCmp('mainTabPanel').getTabBar().hide();
			   
			   panelHtml = response.data;

			   if(areaLimitLevel < 3){
				   src = 'https://webgis.cittametropolitana.ve.it/webmapp/resources/images/cartelli/'+limitation.codistat+'_'+areaLimitLevel+'.jpg';
				   height = '300px';
			   }
			   
			   Ext.create('Ext.Panel',{
			   tools:[{
				   iconCls: 'x-fa fa-times blackIcon',
				   handler:function(panel){
					   Ext.getCmp('trafficTabTitle').show();
					   Ext.getCmp('mainTabPanel').getTabBar().show();
					   panel.close();
				   }
			   }],
			   header: {
				   style: {
					   backgroundColor: bgColor
				   }
			   },
			   floated: true,
			   cls: 'transparentPanel',
			   height: '100%',
			   id: 'limitationPopup',
			   scrollable: 'y',
			   width: '100%',
			   title: limitation.nome_comune,
			   items:[{
				   xtype: 'panel',
				   html: ecoHtml
			   },{
				   xtype: 'img',
				   height: height,
				   src: src
			   },{
				   xtype: 'panel',
				   html: '<div style="margin:10px 10px 10px 10px">'+panelHtml+'</div>',
			   }],
			}).show();
		   },
		   failure: function(response){
			  //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
			   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getDeroghe');
		   }
		}); 
	},
	drawLimitedRoads: function(btn,e){
		var me = this;
		var limPanel = me.getLimitationPanel(); 
		var limVehiclePanel = limPanel.lookup('generalVehicleInfoPanel');
		Ext.fireEvent('updateDayOnMap',limPanel.lookup('dayToggleField').getValue());
		
		
		if(limPanel.lookup('dayToggleField').getValue() && limPanel.lookup('timeZoneField').getValue()){
			me.getLimitMap().spin(true);
			if(limVehiclePanel.lookup('vehicleField').getValue() && limVehiclePanel.lookup('vehicleFuelField').getValue() && limVehiclePanel.lookup('vehicleClassField').getValue()){
				btn.up('panel').hide();
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getRoadLimitations.php',
				   params: {
					   day: limPanel.lookup('dayToggleField').getValue(),
					   lang: localStorage.getItem('defLang'),
					   timezone: limPanel.lookup('timeZoneField').getValue(),
					   vehicle: limVehiclePanel.lookup('vehicleField').getValue(),
					   vehicleFuel: limVehiclePanel.lookup('vehicleFuelField').getValue(),
					   vehicleClass: limVehiclePanel.lookup('vehicleClassField').getValue()
				   },
				   success: function(response){
					   var newLayers = [];
					   var isLimited = false;
					   if(response.data == false || response.data.length == 0){
						 // Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						  alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getRoadLimitations');
						  me.getLimitMap().spin(false);
						  return;
					   }
					   Ext.Array.each(response.data,function(limitArea){
						   if(limitArea.limitazione == "t"){
							   isLimited = true;
							   newLayers.push(limitArea.codistat+'_'+limitArea.limitazione);
						   }	   
					   });
					   if(isLimited){
						   var activeLayers = me.getLimitationLayer().wmsParams.layers.split(',');
						   var finalLayers = activeLayers.concat(newLayers);
						   var layerString = finalLayers.join(',');
						   me.getLimitationLayer().setParams({layers: layerString});
						   alert(Ext.decode(localStorage.getItem('roadLimitation')).limitMsg); 
					   }else{
						    alert(Ext.decode(localStorage.getItem('roadLimitation')).noLimitMsg);
						    me.getLimitationLayer().setParams({layers: 'aree_limitate,grafo_stradale'});
					   }
					   
					    if(me.getLimitationPanel().lookup('limitedLocationField').getValue()){
							  var record = me.getLimitRecord();
							  if(record){
								   var coords = Ext.decode(record.get('latLng'));
								   var centerCoords = new L.LatLng(coords.Latitude, coords.Longitude);
								   if(me.getLimitationMarker()){
									   me.getLimitMap().removeLayer(me.getLimitationMarker());
									   me.setLimitationMarker(null);
								   }
								   var limitMarker = new L.Marker(centerCoords).addTo(me.getLimitMap());
								   me.setLimitationMarker(limitMarker);
								   me.getLimitMap().setView(centerCoords,19);
								   /*if(isLimited){
									   setTimeout(function(){
										   me.getLimitMap().fireEvent('click',{latlng:centerCoords});
									   },2000);
								   }*/
								   me.getLimitationPanel().lookup('limitedLocationField').suspendEvents();
								   me.getLimitationPanel().lookup('limitedLocationField').setValue(null);
								   me.getLimitationPanel().lookup('limitedLocationField').resumeEvents();
							  }
					   }else{
						   if(me.getLimitationMarker()){
							   me.getLimitMap().removeLayer(me.getLimitationMarker());
							   me.setLimitationMarker(null);
						   }
					   }
					   
					   
					   
					   
					   
					   
					   me.getLimitMap().spin(false);
				   },
				   failure: function(response){
					   // Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getRoadLimitation');
						me.getLimitMap().spin(false);
				   }
				});
			}else if(localStorage.getItem('vehicle') && localStorage.getItem('vehicleFuel') && localStorage.getItem('vehicleClass')){
				btn.up('panel').hide();
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getRoadLimitations.php',
				   params: {
					   day: limPanel.lookup('dayToggleField').getValue(),
					   lang: localStorage.getItem('defLang'),
					   timezone: limPanel.lookup('timeZoneField').getValue(),
					   vehicle: localStorage.getItem('vehicle'),
					   vehicleFuel: localStorage.getItem('vehicleFuel'),
					   vehicleClass: localStorage.getItem('vehicleClass')
				   },
				   success: function(response){
					   var newLayers = [];
					   var isLimited = false;
					   Ext.Array.each(response.data,function(limitArea){
						   if(limitArea.limitazione == "t"){
							   isLimited = true;
							   newLayers.push(limitArea.codistat+'_'+limitArea.limitazione);
						   }	   
					   });
					   if(isLimited){
						   var activeLayers = me.getLimitationLayer().wmsParams.layers.split(',');
						   var finalLayers = activeLayers.concat(newLayers);
						   var layerString = finalLayers.join(',');
						   me.getLimitationLayer().setParams({layers: layerString});
						   alert(Ext.decode(localStorage.getItem('roadLimitation')).limitMsg); 
					   }else{
						    alert(Ext.decode(localStorage.getItem('roadLimitation')).noLimitMsg);
						    me.getLimitationLayer().setParams({layers: 'aree_limitate,grafo_stradale'});
					   }
					   me.getLimitMap().spin(false);
				   },
				   failure: function(response){
					    me.getLimitMap().spin(false);
					//	Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					 alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getRoadLimitation localStorage');
				   }
				}); 
			}else{
				//Ext.Msg.alert('Attenzione','Inserire le informazioni del veicolo!');
				 alert(Ext.decode(localStorage.getItem('roadLimitation')).noVehicleWarning);
				me.getLimitMap().spin(false);
			}
		}else{
		//	Ext.Msg.alert('Attenzione','Selezionare il giorno e l\'ora!');
			me.getLimitMap().spin(false);
		}
	},
	setCurrentTopic: function(topic,engtopic,detail,detailObj){
		var me = this;
		me.setTopic(topic);
		me.setEngTopic(engtopic);
		
		setTimeout(function(){
			var map = Ext.getCmp('leafletmap').getController().getMap();
		
			if(me.getConfiniComunaliValue()){
				me.switchConfiniComunali(null,true,null,null);
			}
			if(topic == 'amicibici' || topic == 'turismo'){
			//if(topic == 'amicibici'){
				me.lookup('routeBtn').show();
				map.on('contextmenu',me.onBikeFriendsMapClick,me);
			}
					
		},200);
			
		me.setActiveRootNode(null);
		

		
		if(sessionStorage.getItem('legendData') &&  me.getLegendPanel()){
		  
		   var legends = Ext.decode(sessionStorage.getItem('legendData'));
		   
		   var activeTopic =  localStorage.getItem('defLang') == 'it' ? me.getTopic() : me.getEngTopic();
		
		   me.setActiveRootNode(legends[activeTopic]);
		   
		   me.getLegendPanel().down('tree').setRootNode(legends[activeTopic]);
		   me.getLegendPanel().down('tree').getStore().setRootVisible(false);
		   me.getLegendPanel().down('tree').refresh();
		   
		   //console.log('CARICO LA LEGENDA DAL SESSION STORAGE',legends[activeTopic]);
		   
		   setTimeout(function(){
			   if(detail){
				   var tree = me.getLegendPanel().down('tree');
				   var category =  detailObj.category;
				   var catIndex =  detailObj.catIndex;
				   var groupIndex =  detailObj.groupIndex;
				   var coords =  detailObj.coords;
				   me.activateLayer(category); 
				   //console.log("me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex]",
					//me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex];
				   //console.log(" me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex]",
					// me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex];
								 
				   me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex].children[catIndex].checked = true;
				   me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex].checked = true;	
				   var map = Ext.getCmp('leafletmap').getController().getMap(); 
				   map.setView(L.latLng(coords[1],coords[0]),18);
				   setTimeout(function(){
					   var marker = L.circleMarker(L.GeoJSON.coordsToLatLng(coords),{radius: 20}).addTo(map);
					   me.setPoiSearchMarker(marker);
				   },2000);
			   }
			     
				me.legendManager(me.getLegendPanel().down('tree'),null);				
		   },200);
			
		}else if(me.getLegendPanel()){
			//console.log('CARICO LA LEGENDA DA ZERO');
			Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getLayerList.php',
			   params: {
				   topic: localStorage.getItem('defLang') == 'it' ? me.getTopic() : me.getEngTopic()
			   },
			   success: function(response){
				   me.setActiveRootNode(response.data);
				   me.getLegendPanel().down('tree').setRootNode(response.data);
				   me.getLegendPanel().down('tree').getStore().setRootVisible(false);
				   setTimeout(function(){
					   if(detail){
						   var tree = me.getLegendPanel().down('tree');
						   var category =  detailObj.category;
						   var catIndex =  detailObj.catIndex;
						   var groupIndex =  detailObj.groupIndex;
						   var coords =  detailObj.coords;
						   me.activateLayer(category); 
						   me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex].children[catIndex].checked = true;
						   me.getLegendPanel().down('tree').getRootNode().get('children')[groupIndex].checked = true;	
						   var map = Ext.getCmp('leafletmap').getController().getMap(); 
						   map.setView(L.latLng(coords[1],coords[0]),18);
						   setTimeout(function(){
							   var marker = L.circleMarker(L.GeoJSON.coordsToLatLng(coords),{radius: 20}).addTo(map);
							   me.setPoiSearchMarker(marker);
						   },2000);
					   }
						me.legendManager(me.getLegendPanel().down('tree'),null);
				   },200);
				   
				   
			   },
			   failure: function(response){
				  // Ext.Msg.alert('Errore','Errore di connessione al Server');
				  //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
				   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getLayerList');
				   me.setActiveRootNode(null);
				   //tree.setMasked(false);
			   }
			});   
		}else{
			//console.log('passo qua');
		}
		
					
		setTimeout(function(){			
			if(localStorage.getItem('loadSpotlight') != 'false'){
			   me.startSpotlight();
			   me.setSpotlight(true);
		   }else{
			   me.setSpotlight(false);
		   }
		},500);
	},
	resetRoute: function(){
		var me = this;
		var map = Ext.getCmp('leafletmap').getController().getMap();
		if(me.getStartMarker()){
			map.removeLayer(me.getStartMarker());
		}
		if(me.getEndMarker()){
			map.removeLayer(me.getEndMarker());
		}
		if(me.getRoutePolyline()){
			map.removeLayer(me.getRoutePolyline());	
			map.removeLayer(me.getRoutePolylineBorder());	
		}
		if(me.getManeuverMarker()){
		   map.removeLayer(me.getManeuverMarker());
		}
		me.getRoutePanel().setHtml(null);
		me.setStartMarker(null);
		me.setEndMarker(null);
		me.setStartPoint(null);
		me.setEndPoint(null);
		me.getRoutePanel().down('formpanel').reset();
		me.getRouteManeuversDataview().getStore().removeAll();
		me.getRouteManeuversDataview().hide();
	},
	reverseDirections: function(btn){
		var me = this;
		if(!me.getStartPoint() || !me.getEndPoint()){
			return;
		}
		var values = me.getRoutePanel().down('formpanel').getValues();
		var start_pointValue = values.start_point;
		var end_pointValue = values.end_point;
		var map = Ext.getCmp('leafletmap').getController().getMap();  
		me.getRoutePanel().down('formpanel').getFields('start_point').suspendEvents();
		me.getRoutePanel().down('formpanel').getFields('end_point').suspendEvents();
		me.getRoutePanel().down('formpanel').setValues({
			start_point: end_pointValue,
			end_point: start_pointValue
		});
		me.getRoutePanel().down('formpanel').getFields('start_point').resumeEvents();
		me.getRoutePanel().down('formpanel').getFields('end_point').resumeEvents();
		var tmpStartPoint = me.getStartPoint();
		me.setStartPoint(me.getEndPoint());
		me.setEndPoint(tmpStartPoint);
		me.buildBikeRoute();
		if(me.getStartMarker()){
			map.removeLayer(me.getStartMarker());
		}
		if(me.getEndMarker()){
			map.removeLayer(me.getEndMarker());
		}
		var startMarker = L.marker([me.getStartPoint().Latitude,me.getStartPoint().Longitude],{icon: me.getGreenIcon()}).addTo(map);
		me.setStartMarker(startMarker);
		var endMarker = L.marker([me.getEndPoint().Latitude,me.getEndPoint().Longitude],{icon: me.getRedIcon()}).addTo(map);
		me.setEndMarker(endMarker);		
	},
	addRouteWaypoint: function(btn){
		var me = this;
		var id = Ext.id();
		var position = me.getMiddlePoints().length+1;
		me.getMiddlePoints().push({
			id: id, point: null
		});
		me.getRoutePanel().down('formpanel').insert(position,Ext.create('Ext.field.Text',{
			id: id,
			labelAlign: 'right',
			placeholder: Ext.decode(localStorage.getItem('map')).waypointPlaceholder+' '+position,
			clearable: true,
			triggers:[{
				cls: 'x-fa fa-trash',
				handler:function(textfield){
					var map = Ext.getCmp('leafletmap').getController().getMap();  
					me.setMiddlePoints(me.getMiddlePoints().filter(function(value,index,arr){
						return value.id != textfield.id
					}));
					me.setMiddleMarkers(me.getMiddleMarkers().filter(function(value,index,arr){
						if(textfield.id == value.id){
							map.removeLayer(value.marker);
						}
						return value.id != textfield.id
					}));
					me.buildBikeRoute();
					textfield.destroy();
				}
			}],
			listeners:{
			   change: function(textfield,e,eOpts){
				   if(textfield.getValue().length < 3){
					   var map = Ext.getCmp('leafletmap').getController().getMap(); 
					   Ext.Array.each(me.getMiddlePoints(),function(middlePoint){

						   if(middlePoint.id == textfield.id){
							   middlePoint.point = null;
						   }
					   });
						me.setMiddleMarkers(me.getMiddleMarkers().filter(function(value,index,arr){
							if(textfield.id == value.id){
								map.removeLayer(value.marker);
							}
							return value.id != textfield.id
						}));
					   me.getRouteAddressDataview().getStore().removeAll();
					   me.getRouteAddressDataview().hide();
					   me.buildBikeRoute();
				   }else{
					   textfield.setLabel(' ');
					 //  textfield.setLabelCls('x-fa fa-spinner fa-fw fa-spin animated-spinning-icon blueIcon');
					   Ext.data.JsonP.request({
						   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddress.php',
						   params: {
							   address: textfield.getValue()
						   },
						   success: function(response){
								   if(textfield.getValue().length >3){
									   me.getRouteAddressDataview().getStore().removeAll();
									   me.getRouteAddressDataview().waypoint = true;
									   me.getRouteAddressDataview().startPoint = false;
									   me.getRouteAddressDataview().endPoint = false;
									   me.getRouteAddressDataview().waypointId = id;
									   me.getRouteAddressDataview().getStore().loadData(response.data);
									   me.getRouteAddressDataview().showBy(textfield);
								   }	
								   textfield.setLabelCls(null);
								   textfield.setLabel(null);
						   },
						   failure: function(response){
								//Ext.Msg.alert('Errore','Errore del Server');
								//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
								 alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddress');
								textfield.setLabelCls(null);
								textfield.setLabel(null);
						   }
						});  
				   }		   
			   }
		   }			
		}));
	},
	showDirections: function(btn){
		var me = this;
		
		if(me.getRouteManeuversDataview().getHidden()){
			
			if(me.getRouteManeuversDataview().getStore().getData().length == 0){
				//Ext.Msg.alert('Attenzione','Nessun percorso selezionato');
				 alert(Ext.decode(localStorage.getItem('bikefriends')).noWaypointsWarning);
				btn.toggle();
				return;
			}
			console.log('left',me.getRoutePanel().getLeft());
			console.log('bottom',me.getRoutePanel().getBottom());
			me.getRouteManeuversDataview().showBy(me.getRoutePanel(),'bl');
			me.getRouteManeuversDataview().setHidden(false);
		}else{
			me.getRouteManeuversDataview().setHidden(true);
		}
		
	},
	//al cambio tab pulisco la mappa;
	clearMap: function(){
		var me = this;
		var map = Ext.getCmp('leafletmap').getController().getMap();   
		Ext.Array.each(me.getClusterGroups(),function(item){
				map.removeLayer(item.layer);
				
		});	
		Ext.Array.each(me.getWmsLayers(),function(item){
				map.removeLayer(item.layer);
		});	
		Ext.Array.each(me.getGeoJsons(),function(item){
				map.removeLayer(item.layer);
		});
		me.setClusterGroups([]);
		me.setWmsLayers([]);
		me.setGeoJsons([]);
		me.getAddressToolbar().hide();
		me.getAddressToolbar().down('textfield').reset();	
		me.getAddressDataview().hide();
		me.getRoutePanel().down('formpanel').reset();
		me.getRoutePanel().hide();
		me.getRouteAddressDataview().hide();
		if(me.getStartMarker()){
			map.removeLayer(me.getStartMarker());
		}
		if(me.getEndMarker()){
			map.removeLayer(me.getEndMarker());
		}
		if(me.getRoutePolyline()){
			map.removeLayer(me.getRoutePolyline());	
			map.removeLayer(me.getRoutePolylineBorder());	
		}
		if(me.getManeuverMarker()){
		   map.removeLayer(me.getManeuverMarker());
	    }
		if(me.getPositionMarker()){
			map.removeLayer(me.getPositionMarker());
		}
		if(me.getMiddleMarkers()){
			Ext.Array.each(me.getMiddleMarkers(),function(midMarker){
				map.removeLayer(midMarker.marker);
			});
		}
		if(me.getPoiSearchMarker()){
			map.removeLayer(me.getPoiSearchMarker());
			me.setPoiSearchMarker(null);
		}
		me.getRoutePanel().setHtml(null);	
		map.closePopup();
		Ext.fireEvent('setMapBounds',map.getBounds());
		map.off('contextmenu',me.onBikeFriendsMapClick,me);
	},
	
	
	setupBikeFriends: function(){
		var me = this;
		me.lookup('routeBtn').show();
		setTimeout(function(){
			var map = Ext.getCmp('leafletmap').getController().getMap();
			map.on('contextmenu',me.onBikeFriendsMapClick,me);
		},1000);	
	},
	onBikeFriendsMapClick: function(e,boh){
		var me = this;
		var map = Ext.getCmp('leafletmap').getController().getMap();
		function createButton(label, container) {
			var btn = L.DomUtil.create('button', '', container);
			btn.setAttribute('type', 'button');
			btn.innerHTML = label;
			return btn;
		}
		var container = L.DomUtil.create('div'),
        startBtn = createButton(Ext.decode(localStorage.getItem('map')).popupStartBtn, container),
        destBtn = createButton(Ext.decode(localStorage.getItem('map')).popupEndBtn, container);
		L.DomEvent.on(startBtn, 'click', function() {
			Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddressFromPoint.php',
				   params: {
					   language: localStorage.getItem('defLang'),
					   lat: e.latlng.lat,
					   lng: e.latlng.lng
				   },
				   success: function(responseObj){
					   //console.log(responseObj);
					   var response = responseObj.data.Response;
					   var newLocation = response.View[0].Result[0].Location;
					   var coords = newLocation.DisplayPosition;
					   me.getRoutePanel().lookup('start_point').suspendEvents();
					   me.getRoutePanel().lookup('start_point').setValue(newLocation.Address.Label);
					   me.getRoutePanel().lookup('start_point').resumeEvents();
					   me.setStartPoint({Latitude: coords.Latitude, Longitude: coords.Longitude});			   
					   if(me.getStartMarker()){
						   map.removeLayer(me.getStartMarker());
					   }
					   var startMarker = L.marker([coords.Latitude,coords.Longitude],{icon: me.getGreenIcon(),draggable: true}).addTo(map);
						startMarker.on('dragend',function(evt){
							var newLatLon = evt.target._latlng;
							Ext.data.JsonP.request({
							   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddressFromPoint.php',
							   params: {
								   language: localStorage.getItem('defLang'),
								   lat: newLatLon.lat,
								   lng: newLatLon.lng,
								   loc: newLatLon
							   },
							   success: function(responseObj){
								   var response = responseObj.data.Response;
								   var newLocation = response.View[0].Result[0].Location;
								   me.getRoutePanel().lookup('start_point').suspendEvents();
								   me.getRoutePanel().lookup('start_point').setValue(newLocation.Address.Label);
								   me.getRoutePanel().lookup('start_point').resumeEvents();
								   var coords = newLocation.DisplayPosition;
								   var newMarkerLatLng = new L.LatLng(coords.Latitude,coords.Longitude);
								  //map.removeLayer(me.getStartMarker());
								   me.getStartMarker().setLatLng(newMarkerLatLng);
								   me.setStartPoint({Latitude: coords.Latitude,Longitude: coords.Longitude});
								 //map.addLayer(me.getStartMarker());
								   me.buildBikeRoute();
							   },
							   failure: function(responseObj){
									//Ext.Msg.alert('Errore','Errore del Server');
									//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
									alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddressFromPoint');
									me.getRoutePanel().lookup('start_point').reset();
							   }
							}); 
						});
					   me.setStartMarker(startMarker);
					   me.buildBikeRoute();
				   },
				   failure: function(responseObj){
						//Ext.Msg.alert('Errore','Errore del Server');
						//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddressFromPoint');
				   }
				}); 
			//control1.spliceWaypoints(0, 1, e.latlng);
			map.closePopup();
		});
		L.DomEvent.on(destBtn, 'click', function() {
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddressFromPoint.php',
				   params: {
					   language: localStorage.getItem('defLang'),
					   lat: e.latlng.lat,
					   lng: e.latlng.lng
				   },
				   success: function(responseObj){
					   var response = responseObj.data.Response;
					   var newLocation = response.View[0].Result[0].Location;
					   var coords = newLocation.DisplayPosition;
					   me.getRoutePanel().lookup('end_point').suspendEvents();
					   me.getRoutePanel().lookup('end_point').setValue(newLocation.Address.Label);
					   me.getRoutePanel().lookup('end_point').resumeEvents();
					   me.setEndPoint({Latitude: coords.Latitude, Longitude: coords.Longitude});			   
					   if(me.getEndMarker()){
						   map.removeLayer(me.getEndMarker());
					   }
					   var endMarker = L.marker([coords.Latitude,coords.Longitude],{icon: me.getRedIcon(),draggable: true}).addTo(map);
						endMarker.on('dragend',function(evt){
							var newLatLon = evt.target._latlng;
							Ext.data.JsonP.request({
							   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddressFromPoint.php',
							   params: {
								   language: localStorage.getItem('defLang'),
								   lat: newLatLon.lat,
								   lng: newLatLon.lng,
								   loc: newLatLon
							   },
							   success: function(responseObj){
								   var response = responseObj.data.Response;
								   var newLocation = response.View[0].Result[0].Location;
								   me.getRoutePanel().lookup('end_point').suspendEvents();
								   me.getRoutePanel().lookup('end_point').setValue(newLocation.Address.Label);
								   me.getRoutePanel().lookup('end_point').resumeEvents();
								   var coords = newLocation.DisplayPosition;
								   var newMarkerLatLng = new L.LatLng(coords.Latitude,coords.Longitude);
								  //map.removeLayer(me.getStartMarker());
								   me.getEndMarker().setLatLng(newMarkerLatLng);
								   me.setEndPoint({Latitude: coords.Latitude,Longitude: coords.Longitude});
								 //map.addLayer(me.getStartMarker());
								   me.buildBikeRoute();
							   },
							   failure: function(responseObj){
									//Ext.Msg.alert('Errore','Errore del Server');
									//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
									alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddressFromPoint');
									me.getRoutePanel().lookup('end_point').reset();
							   }
							}); 
						});
					   me.setEndMarker(endMarker);
					   me.buildBikeRoute();
				   },
				   failure: function(responseObj){
						//Ext.Msg.alert('Errore','Errore del Server');
						//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddressFromPoint');
				   }
				}); 
		map.closePopup();
		});  
		L.popup()
        .setContent(container)
        .setLatLng(e.latlng)
        .openOn(map);
	},
	calculateRoute: function(){
		var me = this;
		me.getRoutePanel().show();
		me.getAddressToolbar().hide();
		me.getAddressDataview().hide();
		
	},
   showLegendPanel: function(btn,e){
	   var me = this;
	  // btn.setHidden(true);
	  if(me.getLegendPanel()){
		    me.getLegendPanel().destroy();
	  }
	
	  me.setLegendPanel(Ext.create('Ext.Panel',{
		   floated: true,
		
		   referenceHolder: true,
		   showAnimation: {
			   type: 'slideIn',
			   direction: 'right'
		   },
		   hideAnimation: {
			   type: 'slideOut',
			   direction: 'left'
		   },
		   //legendBtn: btn,
		   id: 'legendPanel',
		   header:{
			   style:{
				   backgroundColor: '#98fb98'
			   }
		   },
		   closeAction: 'hide',
		    closable: true,
		   height: '100%',
		   width: '90%',
		   hideOnMaskTap: true,
		   modal: true,
		   draggable: false,
		   layout: 'vbox',
		   items:[{
			   xtype: 'tree',
			   flex: 1,
			   id: 'treelegend',
			   hideHeaders: true,
			   columnLines: true,
			   striped: true,
			   itemCls: 'noSpacing', 
			   //rowLines: false,
			   columns: [{
					xtype: 'treecolumn',
					text: 'Nome',	
					dataIndex: 'text',
					flex: 1,
					cell: {
						encodeHtml: false
					},
					renderer: function (value, record) {
												
						var layerText = '<div style="font-weight:bold;">'+value+'</div>';
						
						if(record.data.leaf){	
							if (record.data.icon!="") {
								 layerText = '<div style="line-height:0px"> <img src="'+record.data.icon+'" height="15px" width="15px" style="margin-right:5px;">'+value+'</div>';
							}
						}
										
						return layerText;

					 }
					 
			   }],
			   store: Ext.create('Ext.data.TreeStore',{
				   rootVisible: true
			   }),
			   listeners:{
				   checkchange: 'onLayerCheck',
				   nodecollapse: 'onLegendGroupCollapse',
				   nodeexpand: 'onLegendGroupCollapse',
				   scope: me
			   }
		   } ],
		   listeners:{
			   beforeshow: function(el){
					el.getHeader().setHeight(70);
					el.setTitle(Ext.decode(localStorage.getItem('titles')).legendPanelTitle);
				},
		   }
		}));

		if(sessionStorage.getItem('legendData')){
		   var legends = Ext.decode(sessionStorage.getItem('legendData'));
		 
		   var activeTopic =  localStorage.getItem('defLang') == 'it' ? me.getTopic() : me.getEngTopic();
		   me.setActiveRootNode(legends[activeTopic]);
			//console.log('legends[activeTopic]',legends[activeTopic]);
		   me.getLegendPanel().down('tree').setRootNode(legends[activeTopic]);
		   me.getLegendPanel().down('tree').getStore().setRootVisible(false);
		   me.getLegendPanel().down('tree').refresh();
		   setTimeout(function(){
				me.legendManager(me.getLegendPanel().down('tree'),null);
		   },200);
			
		}else{
			Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getLayerList.php',
			   params: {
				   topic: localStorage.getItem('defLang') == 'it' ? me.getTopic() : me.getEngTopic()
			   },
			   success: function(response){
				   me.setActiveRootNode(response.data);
				   //console.log('data',response.data);
				   me.getLegendPanel().down('tree').setRootNode(response.data);
				   me.getLegendPanel().down('tree').getStore().setRootVisible(false);
				   setTimeout(function(){
						me.legendManager(me.getLegendPanel().down('tree'),null);
				   },200);
				   		   
			   },
			   failure: function(response){

				   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getLayerList');
				   me.setActiveRootNode(null);
			   }
			});   
		}
	  
	  
	   me.getLegendPanel().show();
   },
   
   onLayerCheck: function(cell,checked,record){
	   
	   var me = this;
	   var grid = cell.ownerCmp.grid;
	   
	   
	   //se ho premuto su un figlio
	   
	   if(record.get('leaf')){
		   
		   var parentNode = record.parentNode;
		   
		   //lo disattivo
		   
		   if(!checked){
			   
			   grid.getItem(record).setCls('noSpacing');
			   
		   }else{
			   
			   //attivo e coloro il layer, attivo il gruppo
			   grid.getItem(record).setCls('noSpacing activeLayer');
			   
		   }
		   
		   var groupCheck = true;
		   //console.log('parentNode',parentNode);
		   Ext.Array.each(parentNode.get('children'),function(child){

			   if(!child.checked){
				   groupCheck = false;
			   }
		   });
		   
		   parentNode.set('checked',groupCheck);
		   
		   me.layerCheckChange(record,checked,false);
		   
	   }else{
		   //se ho premuto su un padre
		   Ext.Array.each(record.childNodes,function(child){
			   
			   child.set('checked',checked);
			   if(grid.getItem(child)){
				   if(checked){
					   grid.getItem(child).setCls('noSpacing activeLayer');
				   }else{
					   grid.getItem(child).setCls('noSpacing');
				   }
			   }
			   
			   me.layerCheckChange(child,checked,false);
		   });
	   }
   },
   
   
   onLayerCheckLimit: function(cell,checked,record){
	   
	   var me = this;
	   var grid = cell.ownerCmp.grid;
	   
	   
	   //se ho premuto su un figlio
	   
	   if(record.get('leaf')){
		   
		   var parentNode = record.parentNode;
		   
		   //lo disattivo
		   
		   if(!checked){
			   
			   grid.getItem(record).setCls('noSpacing');
			   
		   }else{
			   
			   //attivo e coloro il layer, attivo il gruppo
			   grid.getItem(record).setCls('noSpacing activeLayer');
			   
		   }
		   
		   var groupCheck = true;
		   //console.log('parentNode',parentNode);
		   Ext.Array.each(parentNode.get('children'),function(child){

			   if(!child.checked){
				   groupCheck = false;
			   }
		   });
		   
		   parentNode.set('checked',groupCheck);
		   
		   me.layerCheckChange(record,checked,true);
		   
	   }else{
		   //se ho premuto su un padre
		   Ext.Array.each(record.childNodes,function(child){
			   
			   child.set('checked',checked);
			   if(grid.getItem(child)){
				   if(checked){
					   grid.getItem(child).setCls('noSpacing activeLayer');
				   }else{
					   grid.getItem(child).setCls('noSpacing');
				   }
			   }
			   
			   me.layerCheckChange(child,checked,true);
		   });
	   }
   },
   
	//attivo\disattivo la toolbar di ricerca indirizzi
	getAddressPosition: function(btn){
	   var me = this;
	   var toolbar = me.getAddressToolbar();
	   var dataview = me.getAddressDataview();
	   if(toolbar.isHidden()){
		   toolbar.showBy(btn.up('titlebar'));
	   }else{
		   toolbar.hide();
		   toolbar.down('textfield').reset();
		   dataview.hide();
		   dataview.getStore().removeAll();
	   }
   },
   //alla selezione di un'indicazione, disegno un nuovo marker segnalandone la posizione
   onRouteManeuverSelected: function(dataview,record,eOpts){
	   var me = this;
	   var map = Ext.getCmp('leafletmap').getController().getMap();
	   if(me.getManeuverMarker()){
		   map.removeLayer(me.getManeuverMarker());
	   } 
	   var position = record.get('position');
	   var maneuverMarker = L.marker([position.latitude,position.longitude],{icon: me.getYellowIcon()}).addTo(map);
	   me.setManeuverMarker(maneuverMarker);
	   map.panTo(new L.LatLng(position.latitude,position.longitude));
	   me.getRouteManeuversDataview().hide();
	   me.getRoutePanel().lookup('maneuverBtn').toggle();
   },
	//selezione indirizzo dataview routing
	onRouteAddressSelected: function(dataview,record,eOpts){
		var me = this;
		
		var map = Ext.getCmp('leafletmap').getController().getMap();
		
		dataview.getStore().removeAll();
		
		dataview.hide();
		
		var startPointTextfield = me.getRoutePanel().lookup('start_point');
		
		var endPointTextfield = me.getRoutePanel().lookup('end_point');
		
		var address = record.get('address');
		
		var latLon = Ext.decode(record.get('latLng'));
		
		if(me.getRouteAddressDataview().startPoint){
			if(me.getStartMarker()){
				map.removeLayer(me.getStartMarker());
			}
			startPointTextfield.suspendEvents();
			startPointTextfield.setValue(address);
			startPointTextfield.resumeEvents();
			me.setStartPoint(latLon);
			//var latLon = Ext.decode(latLon);
			coords = [latLon.Latitude,latLon.Longitude];
			var startMarker = L.marker(coords,{icon: me.getGreenIcon(),draggable: true}).addTo(map);
			startMarker.on('dragend',function(evt){
				var map = Ext.getCmp('leafletmap').getController().getMap();
				var newLatLon = evt.target._latlng;
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddressFromPoint.php',
				   params: {
					   language: localStorage.getItem('defLang'),
					   lat: newLatLon.lat,
					   lng: newLatLon.lng,
					   loc: newLatLon
				   },
				   
				   success: function(responseObj){
					   var response = responseObj.data.Response;
					   var newLocation = response.View[0].Result[0].Location;
					   startPointTextfield.suspendEvents();
					   startPointTextfield.setValue(newLocation.Address.Label);
					   startPointTextfield.resumeEvents();
					   var coords = newLocation.DisplayPosition;
					   var newMarkerLatLng = new L.LatLng(coords.Latitude,coords.Longitude);
					  //map.removeLayer(me.getStartMarker());
					   me.getStartMarker().setLatLng(newMarkerLatLng);
					   me.setStartPoint({Latitude: coords.Latitude,Longitude: coords.Longitude});
					 //map.addLayer(me.getStartMarker());
					   me.buildBikeRoute();
				   },
				   failure: function(responseObj){
						//Ext.Msg.alert('Errore','Errore del Server');
						//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddressFromPoint');
						startPointTextfield.reset();
				   }
				}); 
			});
			me.setStartMarker(startMarker);
		}else if(me.getRouteAddressDataview().endPoint){
			if(me.getEndMarker()){
				map.removeLayer(me.getEndMarker());
			}
			endPointTextfield.suspendEvents();
			endPointTextfield.setValue(address);
			endPointTextfield.resumeEvents();
			me.setEndPoint(latLon);
			//var latLon = Ext.decode(latLon);
			coords = [latLon.Latitude,latLon.Longitude];
			var endMarker = L.marker(coords,{icon: me.getRedIcon(),draggable: true}).addTo(map);
			
			endMarker.on('dragend',function(evt){
				var map = Ext.getCmp('leafletmap').getController().getMap();
				var newLatLon = evt.target._latlng;
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddressFromPoint.php',
				   params: {
					   language: localStorage.getItem('defLang'),
					   lat: newLatLon.lat,
					   lng: newLatLon.lng,
					   loc: newLatLon
				   },
				   success: function(responseObj){
					   var response = responseObj.data.Response;
					   var newLocation = response.View[0].Result[0].Location;
					   endPointTextfield.suspendEvents();
					   endPointTextfield.setValue(newLocation.Address.Label);
					   endPointTextfield.resumeEvents();
					   var coords = newLocation.DisplayPosition;
					   var newMarkerLatLng = new L.LatLng(coords.Latitude,coords.Longitude);
					   //map.removeLayer(me.getStartMarker());
					   me.getEndMarker().setLatLng(newMarkerLatLng);
					   me.setEndPoint({Latitude: coords.Latitude,Longitude: coords.Longitude});
					   //map.addLayer(me.getEndMarker());
					   me.buildBikeRoute();
				   },
				   failure: function(responseObj){
						//Ext.Msg.alert('Errore','Errore del Server');
						//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getAddressFromPoint');
						endPointTextfield.reset();
				   }
				}); 
			});
			me.setEndMarker(endMarker);
		}else if(me.getRouteAddressDataview().waypoint){
			var waypointId = me.getRouteAddressDataview().waypointId;
			Ext.Array.each(me.getRoutePanel().down('formpanel').items.items,function(item){
				if( item.id == waypointId ){
					item.suspendEvents();
					item.setValue(address);
					item.resumeEvents();
					Ext.Array.each(me.getMiddlePoints(),function(middlePoint){
						 if(middlePoint.id == waypointId){
							 middlePoint.point=(latLon);
						 }
					});
				}
			});
			var coords = [latLon.Latitude,latLon.Longitude];
			var waypointMarker = L.marker(coords,{icon: me.getOrangeIcon(),draggable: true}).addTo(map);
			waypointMarker.on('dragend',function(evt){
				var map = Ext.getCmp('leafletmap').getController().getMap();
				var newLatLon = evt.target._latlng;
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getAddressFromPoint.php',
				   params: {
					   language: localStorage.getItem('defLang'),
					   lat: newLatLon.lat,
					   lng: newLatLon.lng
				   },
				   success: function(responseObj){
					   var response = responseObj.data.Response;
					   var newLocation = response.View[0].Result[0].Location;
					   var coords = newLocation.DisplayPosition;
					   Ext.Array.each(me.getRoutePanel().down('formpanel').items.items,function(item){
							if( item.id == waypointId ){							
								item.suspendEvents();
								item.setValue(newLocation.Address.Label);
								item.resumeEvents();
								Ext.Array.each(me.getMiddlePoints(),function(middlePoint){
									 if(middlePoint.id == waypointId){
										 middlePoint.point=({Latitude: coords.Latitude, Longitude: coords.Longitude});
									 }
								});
							}
					   });
					   
					   var newMarkerLatLng = new L.LatLng(coords.Latitude,coords.Longitude);
					   Ext.Array.each(me.getMiddleMarkers(),function(middleMarker){
						   if(middleMarker.id == waypointId){
							   middleMarker.marker.setLatLng(newMarkerLatLng);
						   }
					   });
					   Ext.Array.each(me.getMiddlePoints(),function(midPoint){
						   if(midPoint.id == waypointId){
							   midPoint.point={Latitude: coords.Latitude,Longitude: coords.Longitude};
						   }
					   });
					   me.buildBikeRoute();
				   },
				   failure: function(responseObj){
						//Ext.Msg.alert('Errore','Errore del Server');
						//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText+ '.Failure: getAddressFromPoint');
						Ext.Array.each(me.getRoutePanel().down('formpanel').items.items,function(item){
							if( item.id == waypointId ){							
								item.suspendEvents();
								item.reset();
								item.resumeEvents();
							}
					   });
				   }
				}); 
			});
			me.getMiddleMarkers().push({id: waypointId,marker: waypointMarker});	
		}
		if(startPointTextfield.getValue() && endPointTextfield.getValue()){
			me.buildBikeRoute();
		}
	},
	buildBikeRoute: function(){
		var me = this;
		var map = Ext.getCmp('leafletmap').getController().getMap();
		if(!me.getStartPoint() || !me.getEndPoint()){
			return;
		}
		var waypoints = '';
		var lastWaypoint = 1;
		if(me.getMiddlePoints().length > 0){
			var count = 0;
			Ext.Array.each(me.getMiddlePoints(),function(middlePoint){
				if(middlePoint.point != null){
					waypoints+='&waypoint'+(count+1)+'=geo!'+middlePoint.point.Latitude+','+middlePoint.point.Longitude;
					lastWaypoint=count+2;
					count++;
				}
				
			});
		}
		var geo1 = 'geo!'+me.getStartPoint().Latitude+','+me.getStartPoint().Longitude;
		var geo2 = 'geo!'+me.getEndPoint().Latitude+','+me.getEndPoint().Longitude;
		Ext.data.JsonP.request({
		   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getRoute.php',
		   params: {
			   language: localStorage.getItem('defLang'),
			   waypoint0: geo1,
			   waypoint1: geo2,
			   waypoints: waypoints,
			   lastwpoint: lastWaypoint
		   },
		   success: function(responseObj){
				if(me.getRoutePolyline()){
					map.removeLayer(me.getRoutePolyline());
					map.removeLayer(me.getRoutePolylineBorder());
				}
				var response = responseObj.data.response;
				var route = response.route;
				var summary = route[0].summary;
				var shape = route[0].shape;
				var maneuvers = route[0].leg[0].maneuver;
				var leafletRoute = [];
				me.getRoutePanel().setHtml(summary.text);
				me.getRouteManeuversDataview().getStore().loadData(maneuvers);
				Ext.Array.each(shape,function(routeCoord){
					
					var position = routeCoord.split(',');
					leafletRoute.push([position[0],position[1]]);
				});
				var stroke = {
					color: "grey",
					weight: 7,
					opacity: 1
				};
				var borderPolyline = L.polyline(leafletRoute,stroke).addTo(map);
				var polyline = L.polyline(leafletRoute,{color: 'lime',opacity: 1.0}).addTo(map);		
				me.setRoutePolyline(polyline);
				me.setRoutePolylineBorder(borderPolyline);
				//map.fitBounds(polyline.getBounds(),{animate: true,padding:[0,50]});
				me.fitBoundsCustom(polyline.getBounds(),-1000);
				//me.getRouteManeuversDataview().showBy(me.getRoutePanel());
		   },
		   failure: function(responseObj){
				//Ext.Msg.alert('Attenzione','Errore del Server');
				//Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
				alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getRoute');
		   }
		}); 
	},
	fitBoundsCustom: function(latLngBounds, offsetY) { // offsetY in pixels
	  var zoom, southeast, southeastOffset, newBounds;
	  var map = Ext.getCmp('leafletmap').getController().getMap();
	  if (offsetY) {
		zoom = map.getBoundsZoom(latLngBounds);
		southeast = map.project(latLngBounds.getSouthEast(), zoom);
		southeastOffset = new L.Point(southeast.x, southeast.y + offsetY);
		newBounds = latLngBounds.extend(map.unproject(southeastOffset, zoom));
	  }

	  map.fitBounds(newBounds || latLngBounds);
	},
	//selezione indirizzo dataview ricerca
	onItemAddressSelected: function(dataview,record,eOpts){
		var me = this;
		var map = Ext.getCmp('leafletmap').getController().getMap();
		dataview.getStore().removeAll();
		dataview.hide();
		me.getAddressToolbar().hide();
		me.getAddressToolbar().down('textfield').reset();
		coords = Ext.JSON.decode(record.get('latLng'));
		var centerCoords = new L.LatLng(coords.Latitude, coords.Longitude);
		if(me.getPositionMarker()){
			map.removeLayer(me.getPositionMarker());
			me.setPositionMarker(null);
		}
		var positionMarker = L.marker(centerCoords).addTo(map);
		me.setPositionMarker(positionMarker);
		map.setView(centerCoords,14);
	},
   //Cambio la base map in base alla scelta dei radiofield
   changeBaseMap: function(basemap){
	   var me = this;
	   var map = Ext.getCmp('leafletmap').getController().getMap();
	   var activeBaseMap = Ext.getCmp('leafletmap').getController().getBaseMap();
	   if(activeBaseMap){
		   map.removeLayer(activeBaseMap);
	   }
	   
	   if(basemap.getValue() == 'esri'){
		   Ext.getCmp('leafletmap').getController().setBaseMap(L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
				//attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
				attribution: '<a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank"> World topografic Map Esri</a>',
				minZoom: 1,
				maxZoom: 18
			}));
	   }else if (basemap.getValue() == 'ortofoto') {
		   Ext.getCmp('leafletmap').getController().setBaseMap(L.tileLayer.wms('https://celegis.cittametropolitana.ve.it:443/geoserver/ows?', {
				layers: 'geonode:sf_4B_15cm_CTR5000_WGS84',
				attribution: 'Città Metropolitana di Venezia 2014',
				maxZoom: 22,
				tileSize: 256
			}));
	   }
	   me.setBaseMapValue(basemap.getValue());
	   Ext.getCmp('leafletmap').getController().getBaseMap().addTo(map);
	   
   },
   changeBaseMapLimit: function(basemap){
	   //var map = Ext.getCmp('leafletmap').getController().getMap();
	   var me = this;
	   var map = me.getLimitMap();
	   var activeBaseMap = Ext.getCmp('leafletmap5').getController().getBaseMap();
	   map.removeLayer(activeBaseMap);
	   if(basemap.getValue() == 'esri'){
		   Ext.getCmp('leafletmap5').getController().setBaseMap(L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer/tile/{z}/{y}/{x}", {
				//attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ, TomTom, Intermap, iPC, USGS, FAO, NPS, NRCAN, GeoBase, Kadaster NL, Ordnance Survey, Esri Japan, METI, Esri China (Hong Kong), and the GIS User Community',
				attribution: '<a href="https://services.arcgisonline.com/ArcGIS/rest/services/World_Topo_Map/MapServer" target="_blank"> World topografic Map Esri</a>',
				minZoom: 1,
				maxZoom: 18
			}));
	   }else if (basemap.getValue() == 'ortofoto') {
		   Ext.getCmp('leafletmap5').getController().setBaseMap(L.tileLayer.wms('https://celegis.cittametropolitana.ve.it:443/geoserver/ows?', {
				layers: 'geonode:sf_4B_15cm_CTR5000_WGS84',
				attribution: 'Città Metropolitana di Venezia 2014',
				maxZoom: 22,
				tileSize: 256
			}));
	   }
	    me.setBaseMapTrafficoValue(basemap.getValue());
	   Ext.getCmp('leafletmap5').getController().getBaseMap().addTo(map);
	   
   },

   //se checko il layer lo attivo sennò il contrario
   layerCheckChange: function(baseRecord,checked,limit){
	   var me = this,
	    record = baseRecord.data;	
		if(checked){
			me.activateLayer(record,limit);
		}else{
			me.removeLayer(record,limit,true);					
		}
			

			   
   },
   //spengo(rimuovo) i layer
   removeLayer: function(record,limit,removeFromZoom = false){
	   var me = this;

	   if(limit){
		   
		   var map = me.getLimitMap();
		   
		   LayerStorage.removeLayer(record.table,'traffic');
		   
	   }else{
		   var map = Ext.getCmp('leafletmap').getController().getMap();

		   LayerStorage.removeLayer(record.table,me.getEngTopic());
	   }
	   
	   //console.log('removeFromZoom',removeFromZoom);
	   
	   if(removeFromZoom && record.minZoom){
		   
			LayerStorage.removeZoomLayer(record.table);
			
	   }
	   
	   
	   if(record.tipo == 'point'){ 
			Ext.Array.each(me.getClusterGroups(),function(item){
				if(item.id == record.table){

					map.removeLayer(item.layer);
				}
			});	
		}else if(record.tipo == 'wms'){
			Ext.Array.each(me.getWmsLayers(),function(item){
				if(item.id == record.table){
					map.removeLayer(item.layer);
				}
			});	
		}else{
			Ext.Array.each(me.getGeoJsons(),function(item){
				if(item.id == record.table){
					map.removeLayer(item.layer);
				}
			});	
		}
		
		 if(record.childLayers){
		   var childLayers = Ext.decode(record.childLayers);
		   Ext.Array.each(childLayers,function(childLayer){
			   me.removeLayer(childLayer,limit,removeFromZoom);
		   });
	   }
			
			
   },
  
   activateLayer: function(record,limit){
	   var me = this;
		
	   if(limit){
		   //console.log('MAP',me.getLimitMap());
		   var map = me.getLimitMap();
		   LayerStorage.addLayer(record.table,'traffic');
	   }else{
		   var map = Ext.getCmp('leafletmap').getController().getMap();
		   LayerStorage.addLayer(record.table,me.getEngTopic());
	   }
	   
	   if(!Ext.isApple){
		   map.spin(true);
	   }
	   
	   
	   
	   
	   
	   if(record.minZoom){
		   
			LayerStorage.addZoomLayer(record);
			
			if(map.getZoom() < record.minZoom){
				map.spin(false);
				return;
			}
	   }
	   
	      
	   if(record.noCluster){
		   var markerClusters = L.markerClusterGroup({showCoverageOnHover: false,
			zoomToBoundsOnClick: true,
			spiderfyDistanceMultiplier: 5,
			maxClusterRadius: 0,
			spiderLegPolylineOptions: {
				color: '#ffc40c'
			}
		});
	   }else{
		  var markerClusters = L.markerClusterGroup({showCoverageOnHover: false,
			zoomToBoundsOnClick: true,
			spiderfyDistanceMultiplier: 5,
			maxClusterRadius: 25,
			spiderLegPolylineOptions: {
				color: '#ffc40c'
			}
		}); 
	   }
	   	
		if (record.tipo == 'wms') {
			console.info(record.layer);
			var wmslayer = L.tileLayer.wms(record.url, {
				layers: record.layer,
				format: 'image/png',
				transparent: true
			});
				map.addLayer(wmslayer);
			
		}
		else if (record.tipo == 'point') {
			var layerToAddLayer = L.geoJson(null);	
			var pp = L.geoJson(null, {
			pointToLayer: function (feature, latlng) { 
				var icona = record.icon;  	
				if (String(record.text).localeCompare("Sagre paesane") == 0 || String(record.text).localeCompare("Country fairs") == 0){
					var oggettoCampi = record.tooltipfields.split("|");
					for (var i=0; i<oggettoCampi.length; i++) {
						var valoreoggettocampi = oggettoCampi[i].split("$");
						//alert(String(valoreoggettocampi[1]));
						//alert(String(valoreoggettocampi[1]).localeCompare("Tipologia"));
						if (String(valoreoggettocampi[1]).localeCompare("Nei prossimi giorni") == 0 || String(valoreoggettocampi[1]).localeCompare("In Next days") == 0) {
							//alert(feature.properties[valoreoggettocampi[0]]);
							   if (String(feature.properties[valoreoggettocampi[0]]).localeCompare("True") == 0) {
								icona = "sagre32x32arancio.png";
								}
							//content += "<tr><th>" + valoreoggettocampi[1] + "</th><td>" + feature.properties[valoreoggettocampi[0]] + "</td></tr>";
						}
						if (String(valoreoggettocampi[1]).localeCompare("In corso") == 0 || String(valoreoggettocampi[1]).localeCompare("In progress") == 0) {
							   if (String(feature.properties[valoreoggettocampi[0]]).localeCompare("True") == 0) {
								icona = "sagre-flip32x32.gif";
								//alert(feature.properties[valoreoggettocampi[0]]);
								}
							//content += "<tr><th>" + valoreoggettocampi[1] + "</th><td>" + feature.properties[valoreoggettocampi[0]] + "</td></tr>";
						}
						//var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
					}
					 
					//groupedOverlays[confLayer.group][indexToG] = pp;
					};
				
				if (String(record.text).localeCompare("Utilità") == 0 || String(record.text).localeCompare("Utility") == 0)
				  {  
				  //	alert("Entro");
					var oggettoCampi = record.tooltipfields.split("|");
					for (var i=0; i<oggettoCampi.length; i++) {
						var valoreoggettocampi = oggettoCampi[i].split("$");
						//alert(String(valoreoggettocampi[1]));
						//alert(String(valoreoggettocampi[1]).localeCompare("Tipologia"));
						if (String(valoreoggettocampi[1]).localeCompare("Tipologia") == 0|| String(valoreoggettocampi[1]).localeCompare("Tipology") == 0) {
							//alert(feature.properties[valoreoggettocampi[0]]);
							icona=String(feature.properties[valoreoggettocampi[0]])+'.png'
							//content += "<tr><th>" + valoreoggettocampi[1] + "</th><td>" + feature.properties[valoreoggettocampi[0]] + "</td></tr>";
						}
						//var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
					}
					
				  }; 
				if (String(record.text).localeCompare("Comuni") == 0 || String(record.text).localeCompare("Municipality") == 0 || String(record.text).localeCompare("Nomi comuni") == 0 || String(record.text).localeCompare("Municipality names") == 0)
				{
					return L.marker(latlng, {
					  icon: L.divIcon({
							className: 'label',
							html: '<font size="2" color="red" face="arial">'+feature.properties.nome_comune+'</font>',
							iconSize: [100, 40],
							iconAnchor: [0,0]
						}), 
					  title: record.text,
					  riseOnHover: true,
					});
				}
				else{
					var iconUrl = icona;
					var tokens = icona.split('/');
					if(tokens.length == 1){
						iconUrl = 'resources/layerimages/'+icona;
					}
					return L.marker(latlng, {
					  icon: L.icon({
						//iconUrl: "assets/img/simboli/" + icona, //"assets/img/museum.png",
						iconUrl: iconUrl,
						//iconUrl: icona,
						//iconUrl: "assets/img/museum.png",
						iconSize: [24, 28],
						//iconAnchor: [12, 28],
						//popupAnchor: [0, -25]
					  }),
					  title: record.text,
					  riseOnHover: true
					});
				} 
									
			  },
			  onEachFeature: function (feature, layer) {
				if (feature.properties) {
						
				  //var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
				  var content = "<div style=\"background-color:white\"><table class='table table-striped table-bordered table-condensed'>";
					//estraggo i campi
					var tokenFields = record.tooltipfields.split("|");
					
					for (var i=0; i<tokenFields.length; i++) {
						var valuefieldToken = tokenFields[i].split("$");
						if (feature.properties[valuefieldToken[0]]) {
							var valore = feature.properties[valuefieldToken[0]];
							
							if (String(record.text).localeCompare("Sagre paesane") == 0 || String(record.text).localeCompare("Country fairs") == 0) {
							if (String(valuefieldToken[1]).localeCompare("Nei prossimi giorni") == 0 || String(valuefieldToken[1]).localeCompare("In Next days") == 0) 
							 if (String(feature.properties[valuefieldToken[0]]).localeCompare("True") == 0) 
							 // alert("Ciao Si");
							  valore = "Si";	  
							  else 
							  //alert("Ciao NO");
							  valore = "No";
							if (String(valuefieldToken[1]).localeCompare("In corso") == 0  || String(valuefieldToken[1]).localeCompare("In progress") == 0) 
							 if (String(feature.properties[valuefieldToken[0]]).localeCompare("True") == 0) 
							 // alert("Ciao Si");
							  valore = "Si";	  
							  else 
							  //alert("Ciao NO");
							  valore = "No";
							} 
							content += "<tr><th><b>" + valuefieldToken[1] + "</b></th>&nbsp;&nbsp;&nbsp;<td>" + valore + "</td></tr>";
						}
						//var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Name</th><td>" + feature.properties.NAME + "</td></tr>" + "<tr><th>Phone</th><td>" + feature.properties.TEL + "</td></tr>" + "<tr><th>Address</th><td>" + feature.properties.ADRESS1 + "</td></tr>" + "<tr><th>Website</th><td><a class='url-break' href='" + feature.properties.URL + "' target='_blank'>" + feature.properties.URL + "</a></td></tr>" + "<table>";
					}
					content += "</table>";
					
				  layer.on({
					click: function (e) {
					   Ext.create('Ext.Panel',{
						   floated: true,
						   title: record.text,
						   header: {
							   style:{
								   backgroundColor: '#98fb98'
							   }
						   },
						   tools:[{
							   iconCls: 'x-fa fa-times blackIcon',
							   handler:function(panel){
								   panel.close();
							   }
						   }],
						   height: '100%',
						   width: '100%',
						   cls: 'transparentPanel',
						   id: 'layerPanel',
						   html: '<div style="margin:10px 10px 10px 10px">'+content+'</div>',
						   scrollable: 'y',					   
						   //modal:  true,
							listeners: {
								painted: function(){
									Ext.getCmp('mapTabTitle').hide();
									Ext.getCmp('mainTabPanel').getTabBar().hide();
								},
								destroy: function(){
									Ext.getCmp('mapTabTitle').show();
									Ext.getCmp('mainTabPanel').getTabBar().show();
								}
							}
					   }).show();
					  //highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
					}
				  });
				  //$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
				}
			  }
			});
			if(record.geoJson){
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getGeoJson.php',
				   params: {
					   table: record.table,
					   schema: record.schema,
					   cache: record.geoJson
					   
				   },
				   success: function(response){				
					   pp.addData(response.data);
					   markerClusters.addLayer(pp);
					   map.spin(false);
				   },
				   failure: function(response){
					  // Ext.Msg.alert('Errore','Errore del Server');
					  //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					  alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText+ '.Failure: getGeoJSON; layer: '+record.text);
					  map.spin(false);
				   }
			   });
			}else{
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getGeoJson.php',
				   params: {
					   table: record.table,
					   schema: record.schema,
					   
				   },
				   success: function(response){				
					   pp.addData(response.data);
					   markerClusters.addLayer(pp);
					   map.spin(false);
				   },
				   failure: function(response){
					  // Ext.Msg.alert('Errore','Errore del Server');
					  //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					  alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText+ '.Failure: getGeoJSON; layer: '+record.text);
					  map.spin(false);
				   }
			   });
			}
			
			map.addLayer(markerClusters);
			me.getClusterGroups().push({id: record.table, layer: markerClusters});
			//map.addLayer(pp);

		}
		else { //poligono o linea
			
			var ll = L.geoJson(null, {
			  style: function(feature) {
				  if (feature.properties.cmve == 'Tratto fuori territorio metropolitano'){
						return {
							dashArray: '4,8',
							weight: record.weight,
							color: record.color,
							opacity: 0.5,
							fillColor: record.fillColor,
							fillOpacity: record.fillOpacity,
							clickable: true
						}
				  }else{
					  return {
							weight: record.weight,
							color: record.color,
							opacity: record.opacity,
							fillColor: record.fillColor,
							fillOpacity: record.fillOpacity 
						}
				  } 
			  },
			  onEachFeature: function (feature, layer) {
				if (feature.properties) {
					var content = "<table class='table table-striped table-bordered table-condensed'>";
					//estraggo i campi
					var tokenFields = record.tooltipfields.split("|");
					
					for (var i=0; i<tokenFields.length; i++) {
						var valuefieldToken = tokenFields[i].split("$");
						
						if (feature.properties[valuefieldToken[0]]) {
							content += "<tr><th><b>" + valuefieldToken[1] + "</b></th>&nbsp;&nbsp;&nbsp;<td>" + feature.properties[valuefieldToken[0]] + "</td></tr>";
						}
						
					}
					content += "</table>";
				  
				  layer.on({
					click: function (e) {
					   Ext.create('Ext.Panel',{
						   floated: true,
						   title: record.text,
						   header: {
							   style:{
								   backgroundColor: '#98fb98'
							   }
						   },
						   tools:[{
							   iconCls: 'x-fa fa-times blackIcon',
							   handler:function(panel){
								   panel.close();
							   }
						   }],
						   height: '100%',
						   width: '100%',
						   cls: 'transparentPanel',
						   id: 'layerPanel',
						   //closeAction: 'hide',
						   html: '<div style="margin:10px 10px 10px 10px">'+content+'</div>',
						   scrollable: 'y',					   
							listeners: {
								painted: function(){
									Ext.getCmp('legendBtn').hide();
									Ext.getCmp('mapTabTitle').hide();
									Ext.getCmp('mainTabPanel').getTabBar().hide();					
								},
								destroy: function(){
									Ext.getCmp('legendBtn').show();
									Ext.getCmp('mapTabTitle').show();
									Ext.getCmp('mainTabPanel').getTabBar().show();
								}
							}
					   }).show();
					  //highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
					}
				  });
				  //$("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="assets/img/museum.png"></td><td class="feature-name">' + layer.feature.properties.NAME + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
				}
			  }
			});
			map.addLayer(ll);
			me.getGeoJsons().push({id: record.table, layer: ll});
			
			if(record.geoJson){
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getGeoJson.php',
				   params: {
					   table: record.table,
					   schema: record.schema,
					   cache: record.getJson
					   
				   },
				   success: function(response){				
					   ll.addData(response.data);
					   
					   
					   if(record.childLayers){
						   var childLayers = Ext.decode(record.childLayers);
						   Ext.Array.each(childLayers,function(childLayer){
							   me.activateLayer(childLayer,limit);
						   });
					   }
					   
					   
					   map.spin(false);
				   },
				   failure: function(response){
					  // Ext.Msg.alert('Errore','Errore del Server');
					  //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					  alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText+ '.Failure: getGeoJSON; layer: '+record.text);
					  map.spin(false);
				   }
			   });
			}else{
				Ext.data.JsonP.request({
				   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getGeoJson.php',
				   params: {
					   table: record.table,
					   schema: record.schema,		   
				   },
				   success: function(response){		
					   ll.addData(response.data);
					   
					   if(record.childLayers){
						   var childLayers = Ext.decode(record.childLayers);
						   Ext.Array.each(childLayers,function(childLayer){
							   me.activateLayer(childLayer,limit);
						   });
					   }
					   
					   map.spin(false);
					   
				   },
				   failure: function(response){
					   //Ext.Msg.alert('Errore','Errore del Server');
					   //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getGeoJSON; layer: '+record.text);
					   map.spin(false);
				   }
			   });		
			}
		}
   },
   switchConfiniComunali: function(cbox,newVal,oldVal,eOpts){
	   var me = this;
	   
	   var map = Ext.getCmp('leafletmap').getController().getMap();
	   
	   var confiniComunaliSearch = [];
	
	   if(newVal){
		   if(!Ext.isApple){
			   map.spin(true);
		   }
		   var confiniComunali = L.geoJson(null, {
			  style: function (feature) {
				return {
				  color: "#ff0000",
				  fill: false,
				  opacity: 0.9,
				  weight: 1,
				  clickable: false
				};
			  },
			  onEachFeature: function (feature, layer) {
				confiniComunaliSearch.push({
				  name: layer.feature.properties.nome_comune,
				  adesione: layer.feature.properties.adesione,
				  source: "confiniComunali",
				  id: L.stamp(layer),
				  bounds: layer.getBounds()
				});
			  }
			});
			Ext.getCmp('leafletmap').getController().setConfiniComunali(confiniComunali);
			map.addLayer(confiniComunali);
					
			var geoObj = Ext.decode(sessionStorage.getItem('confini_comunali'));
			
			//console.log('geoobj',geoObj);
			confiniComunali.addData(geoObj);
			map.spin(false);		
	   }else{
		   map.removeLayer(Ext.getCmp('leafletmap').getController().getConfiniComunali());
	   }
	   
	   me.setConfiniComunaliValue(newVal);
	   
   },
   switchConfiniComunaliLimit: function(cbox,newVal,oldVal,eOpts){
	   //var map = Ext.getCmp('leafletmap').getController().getMap();
	   var me = this;
	   var map = me.getLimitMap();
	   var confiniComunaliSearch = [];
	   if(newVal){	    
		   var confiniComunali = L.geoJson(null, {
			  style: function (feature) {
				return {
				   color: "blueviolet",
					fill: false,
					opacity: 0.6,	
					weight: 1,
					clickable: false
				};
			  },
			  onEachFeature: function (feature, layer) {
				confiniComunaliSearch.push({
				  name: layer.feature.properties.nome_comune,
				  adesione: layer.feature.properties.adesione,
				  source: "confiniComunali",
				  id: L.stamp(layer),
				  bounds: layer.getBounds()
				});
			  }
			});
			
			
			var geoObj = Ext.decode(sessionStorage.getItem('confini_comunali'));
			
			confiniComunali.addData(geoObj);
			map.spin(false);
			
			Ext.getCmp('leafletmap5').getController().setConfiniComunali(confiniComunali);
			map.addLayer(confiniComunali);
	   }else{
		   map.removeLayer(Ext.getCmp('leafletmap5').getController().getConfiniComunali());
	   }
	   
	   me.setConfiniComunaliTrafficoValue(newVal);
   },
   onLanguageChange: function(combo,newValue){
	   var me = this;
	   
	   localStorage.setItem('defLang',newValue);
	   
	   var deviceObj = Ext.decode(localStorage.getItem('deviceObj'));
	   if(deviceObj){
		   
		   deviceObj.language = newValue;
		   
		   localStorage.setItem('deviceObj',Ext.encode(deviceObj));
		   
		   Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/registerDevice.php',
			   params: deviceObj,
			   success: function(response){								   
				   push.on('notification', function(data) {
					  //console.log('notification event');
					  navigator.notification.alert(
						data.message,         // message
						null,                 // callback
						data.title,           // title
						'Ok'                  // buttonName
					  );
					});																   
			   },
			   failure: function(response){							   
			   },
		  });
	   }
	   
	   
	   
	   Ext.data.JsonP.request({
							   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/formatLanguage.php',
							   params: {
								   lang: newValue
							   },
							   success: function(response){				
									data = response.data;
									localStorage.removeItem('vehicle');
									localStorage.removeItem('vehicleClass');
									localStorage.removeItem('vehicleFuel');
									
									
									me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleField').reset();
									me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleFuelField').reset();
									me.getLimitationPanel().lookup('generalVehicleInfoPanel').lookup('vehicleClassField').reset();
									
									localStorage.setItem('about',Ext.encode(data.about));
									localStorage.setItem('formFields',Ext.encode(data.formFields));
									localStorage.setItem('homeButtons',Ext.encode(data.homeButtons));
									localStorage.setItem('settings',Ext.encode(data.settings));
									localStorage.setItem('titles',Ext.encode(data.titles));
									localStorage.setItem('objLocalization',Ext.encode(data.objLocalization));
									localStorage.setItem('veaccess',Ext.encode(data.veaccess));
									localStorage.setItem('bikefriends',Ext.encode(data.bikefriends));
									localStorage.setItem('map',Ext.encode(data.map));
									localStorage.setItem('tooltips',Ext.encode(data.tooltips));
									localStorage.setItem('roadLimitation',Ext.encode(data.roadLimitation));
									localStorage.setItem('sanitaryInfo',Ext.encode(data.sanitaryInfo));
									//setto i titoli delle tab e corrispettive titlebar
									me.lookup('homeTab').tab.setTitle(Ext.decode(localStorage.getItem('titles')).homeTabTitle);
									me.lookup('homeTab').down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).homeTitle);
									
									me.lookup('submissionTab').tab.setTitle(Ext.decode(localStorage.getItem('titles')).submissionTitle);
									me.lookup('submissionTab').down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).submissionTitle);
									me.lookup('aboutTab').tab.setTitle(Ext.decode(localStorage.getItem('titles')).aboutTitle);
									me.lookup('aboutTab').down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).aboutTitle);
									me.lookup('aboutTab').setHtml(Ext.decode(localStorage.getItem('about')).text);
									me.lookup('settingsTab').tab.setTitle(Ext.decode(localStorage.getItem('titles')).settingsTitle);
									me.lookup('settingsTab').down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).settingsTitle);									
									me.lookup('objectTab').tab.setTitle(Ext.decode(localStorage.getItem('titles')).objectSearchTabTitle);
									me.lookup('objectTab').down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).objectSearchTitle);
									//me.lookup('backFromSettingsBtn').setText(Ext.decode(localStorage.getItem('settings')).backToPrevTabBtn);
									//setto le label delle impostazioni
									me.lookup('languageField').setLabel(Ext.decode(localStorage.getItem('settings')).lang);
									
									var options = [];
									//console.log('OLD OPTIONS',me.lookup('languageField').getOptions());
									Ext.Array.each(me.lookup('languageField').getOptions().data.items,function(comboOption){
										options.push({
											text: Ext.decode(localStorage.getItem('settings'))[comboOption.get('textname')],
											value: comboOption.get('value'),
											textname: comboOption.get('textname')
										})
									});
									//console.log('options',options);
									me.lookup('languageField').suspendEvents();
									me.lookup('languageField').setOptions(options);
									me.lookup('languageField').setValue(localStorage.getItem('defLang'));
									me.lookup('languageField').resumeEvents();
									
									me.lookup('notificationField').setLabel(Ext.decode(localStorage.getItem('settings')).notification);
									me.lookup('settingsFieldset').setTitle(Ext.decode(localStorage.getItem('settings')).fieldsetTitle);
									me.lookup('veAccessTab').config.title =(Ext.decode(localStorage.getItem('titles')).veniceAccessTitle);
									me.lookup('veAccessTab').down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).veniceAccessTitle);
									me.lookup('veAccessTab').setHtml(Ext.decode(localStorage.getItem('veaccess')).text);
									me.getRoutePanel().setTitle(Ext.decode(localStorage.getItem('titles')).routePanelTitle);
									me.getRoutePanel().lookup('start_point').setPlaceholder(Ext.decode(localStorage.getItem('bikefriends')).startText);
									me.getRoutePanel().lookup('end_point').setPlaceholder(Ext.decode(localStorage.getItem('bikefriends')).endText);
									//me.lookup('roadLimitFieldset').setTitle(Ext.decode(localStorage.getItem('settings')).limitationSection);
									//me.lookup('deleteVehicleBtn').setText(Ext.decode(localStorage.getItem('settings')).deleteCarBtn);
									me.getAddressToolbar().down('textfield').setPlaceholder(Ext.decode(localStorage.getItem('map')).addressSearchplaceholder);
									me.getLimitationLegend().setHtml( "<div class='my-legend' style='display:block'>"+
										"<div class='legend-title'>"+Ext.decode(localStorage.getItem('roadLimitation')).legendTitle+"</div>"+
										"<div class='legend-scale'>"+
										  "<ul class='legend-labels'>"+    
											"<li><span style='border-color:green;background:#66FF66;'></span>0</li>"+
											"<li><span style='border-color:orange;background:#ffa500;'></span>1</li>"+
											"<li><span style='border-color:red;background:#EA484E;'></span>2</li>"+
										  "</ul>"+
										"</div>"+
										"</div>"+
										"<div class='my-legend2' style='display:block'>"+
										"<div class='legend-scale'>"+
										  "<ul class='legend-labels'>"+
											"<li><span style='border-color:red;height:2px;margin-top:18px;margin-left:10px'></span>"+Ext.decode(localStorage.getItem('roadLimitation')).roadText+"<img style=' margin-top: 8px;margin-left: 15px;margin-right:5px;' src='https://webgis.cittametropolitana.ve.it/webmapp/resources/images/reticolato.png' width='30px'>"+Ext.decode(localStorage.getItem('roadLimitation')).ecoText+ "</li>"+
										  "</ul>"+
										"</div>" + 
										"</div>"   );
										
									Ext.fireEvent('langChange',newValue);
									
							   },
							   failure: function(response){
								 alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: formatLanguage(vocabolari)');
								 //  Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
							   }
							}); 
	   
   },
   onNotificationChange: function(slider,newValue){
	   if(newValue){
		   localStorage.setItem('notifications',1);
	   }else{
		   localStorage.setItem('notifications',0);
	   }
	   //console.log('newValue',newValue);
	   
	   var deviceObj = Ext.decode(localStorage.getItem('deviceObj'));
	   
	   if(deviceObj){
		   if(newValue){
			   deviceObj.enabled = 1;
		   }else{
			   deviceObj.enabled = 0;
		   }
		   localStorage.setItem('deviceObj',Ext.encode(deviceObj));
		   Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/registerDevice.php',
			   params: deviceObj,
			   success: function(response){								   
				   push.on('notification', function(data) {
					  //console.log('notification event');
					  navigator.notification.alert(
						data.message,         // message
						null,                 // callback
						data.title,           // title
						'Ok'                  // buttonName
					  );
					});																   
			   },
			   failure: function(response){							   
			   },
		  });
	   }
	   
	   
	   
   },
   startSpotlight: function(){
	   var me = this;
	   me.setSpotlight(true);
	  
	   Ext.create('Ext.Panel',{
		   html: Ext.decode(localStorage.getItem('tooltips')).geolocationBtn,
		   modal: true,
		   width: '90%',
		   keep: false,
		//   height: '150px',
		   margin: '0 0 0 0px',
		   anchor: true,
		   items:[{
			   xtype: 'toolbar',
			   docked: 'bottom',
			   height: '30px',
			   items:[
			   '->',{
				   xtype: 'button',
				   docked: 'left',
				   iconCls: 'x-fa fa-arrow-right',
				   handler: function(btn){
					   btn.up('panel').keep = true;
					   btn.up('panel').close();
				   }
			   },{
				   xtype: 'button',
				   docked: 'right',
				   iconCls: 'x-fa fa-times',
				   handler: 'stopSpotlight',
				   scope: me
			   }]
		   }],
		   listeners: {
			   destroy: function(lala){
				   me.startMapSpotlight();
			   }
		   }
	     }).showBy(document.getElementsByClassName('leaflet-bar-part leaflet-bar-part-single')[1]);
   },
   
   startMapSpotlight: function(){
	   var me = this;
	   Ext.getCmp('searchBtn').hide();
	   Ext.getCmp('spotlightBtn').hide();
	   Ext.getCmp('legendBtn').hide();
	   Ext.getCmp('routeBtn').hide();
	   //Ext.getCmp('legendBtn').disable();
	   Ext.getCmp('spotlightBtn').disable();
	   Ext.getCmp('searchBtn').disable();
	   Ext.getCmp('routeBtn').disable();
	   Ext.getCmp('legendBtn').show();
	   //Ext.getCmp('legendBtn').disable();
	   
	  
	   Ext.create('Ext.Panel',{
		   html: Ext.decode(localStorage.getItem('tooltips')).legendBtn,
		   modal: true,
		   width: '90%',
		   keep: false,
		//   height: '150px',
		   margin: '0 0 0 0px',
		   anchor: true,
		   items:[{
			   xtype: 'toolbar',
			   docked: 'bottom',
			   height: '30px',
			   items:[
			   '->',{
				   xtype: 'button',
				   docked: 'left',
				   iconCls: 'x-fa fa-arrow-right',
				   handler: function(btn){
					   btn.up('panel').keep = true;
					   btn.up('panel').close();
				   }
			   },{
				   xtype: 'button',
				   docked: 'right',
				   iconCls: 'x-fa fa-times',
				   handler: 'stopSpotlight',
				   scope: me
			   }]
		   }],
		   listeners: {
			   destroy: function(lala){
				   me.spotlightStepTwo();
			   }
		   }
	   }).showBy(Ext.getCmp('legendBtn'));
   },
   
   
   spotlightStepTwo: function(){
	   var me = this;
	   Ext.getCmp('legendBtn').hide();
	   Ext.getCmp('searchBtn').show();
	
	   Ext.create('Ext.Panel',{
		   html: Ext.decode(localStorage.getItem('tooltips')).searchLocationBtn,
		   modal: true,
		   width: '90%',
		  // height: '150px',
		   margin: '0 0 0 -10px',
		   header: null,
		   anchor: true,
		   items:[{
			   xtype: 'toolbar',
			   docked: 'bottom',
			   height: '30px',
			   items:['->',{
				   xtype:'button',
				   docked: 'left',
				   iconCls: 'x-fa fa-arrow-left',
				   handler: function(btn){
					   btn.up('panel').next = false;
					   btn.up('panel').close();
				   }
			   },{
				   xtype: 'button',
				   docked: 'left',
				   iconCls: 'x-fa fa-arrow-right',
				   handler: function(btn){
					   btn.up('panel').next = true;
					   btn.up('panel').close();
				   }
			   },{
				   xtype: 'button',
				   docked: 'right',
				   iconCls: 'x-fa fa-times',
				   handler: 'stopSpotlight',
				   scope: me
			   }]
		   }],
		   listeners: {
			   destroy: function(panel){
				   if(panel.next){
					   me.getAddressToolbar().showBy(Ext.getCmp('searchBtn').up('titlebar'));
					   me.getAddressToolbar().setModal(true);
					   me.getAddressToolbar().down('textfield').setReadOnly(true);
					   setTimeout(function(){
						   me.getAddressToolbar().down('textfield').setValue('V');
						   setTimeout(function(){
							   me.getAddressToolbar().down('textfield').setValue('Ve');
							   setTimeout(function(){
								   me.getAddressToolbar().down('textfield').setValue('Ven');
								   setTimeout(function(){
									   me.getAddressToolbar().down('textfield').setValue('Vene');
									   setTimeout(function(){
										   me.getAddressToolbar().down('textfield').setValue('Venez');
										   setTimeout(function(){
											   me.getAddressToolbar().down('textfield').setValue('Venezi');
											   setTimeout(function(){
												   me.getAddressToolbar().down('textfield').setValue('Venezia');
												   me.getDelayedAddressCall().delay(0); 
												   },300);
											   },300);
									   },300);
								   },300);
							   },300);
						   },300);
					   },300);		   
					   
				   }else{
					   me.startSpotlight();
				   }
				   
			   }
		   }
	   }).showBy(Ext.getCmp('searchBtn'));
   },
   stopSpotlight: function(btn){
	   var me = this;
	   me.setSpotlight(false);
	   localStorage.setItem('loadSpotlight','false');
	   btn.up('panel').suspendEvents();
	   btn.up('panel').destroy();
	   if(me.getPositionMarker()){
		    var map = Ext.getCmp('leafletmap').getController().getMap();
			map.removeLayer(me.getPositionMarker());
	   }
	   Ext.getCmp('searchBtn').show();
	   Ext.getCmp('spotlightBtn').show();
	   Ext.getCmp('legendBtn').show();
	   if(me.getTopic()=='amicibici' || me.getTopic() == 'turismo'){
		   Ext.getCmp('routeBtn').show();
		   Ext.getCmp('routeBtn').enable();
		   Ext.getCmp('searchBtn').setIconCls('x-fa fa-search');
	   }
	   Ext.getCmp('legendBtn').enable();
	   
	   Ext.getCmp('spotlightBtn').enable();
	   Ext.getCmp('searchBtn').enable();
	   //me.getRoutePanel().down('#closeBtn').handler = function(panel){panel.close()};
	   
	   
   },
   bikeFriendSpotlight: function(){
	   var me = this;
	   setTimeout(function(){
		   Ext.create('Ext.Panel',{
			   //html: 'Premere questo pulsante per accedere al navigatore',
			   html: Ext.decode(localStorage.getItem('tooltips')).routeBtn,
			   modal: true,
			   width: '90%',
			   height: '150px',
			   margin: '0 0 0 -10px',
			   anchor: true,
			   items:[{
				   xtype: 'toolbar',
				   docked: 'bottom',
				   height: '30px',
				   items:['->',{
					   xtype:'button',
					   docked: 'left',
					   iconCls: 'x-fa fa-arrow-left',
					   handler: function(btn){
						   btn.up('panel').next = false;
						   btn.up('panel').close();
					   }
				   },{
					   xtype: 'button',
					   docked: 'left',
					   iconCls: 'x-fa fa-arrow-right',
					   handler: function(btn){
						   btn.up('panel').next = true;
						   btn.up('panel').close();
					   }
				   },{
					   xtype: 'button',
					   docked: 'right',
					   iconCls: 'x-fa fa-times',
					   handler: 'stopSpotlight',
					   scope: me
				   }]
			   }],
			   listeners: {
				   destroy: function(panel){
					   if(panel.next){
						   me.getRoutePanel().show();
						   //me.getRoutePanel().down('#closeBtn').handler = function(){};
						   //me.getRoutePanel().disable();
						   me.bikeFriendSpotlightStepTwo();
					   }else{
						   Ext.getCmp('searchBtn').setIconCls('x-fa fa-search');
						   Ext.getCmp('routeBtn').hide();
						   me.spotlightStepTwo();
					   }
					   
				   }
			   }
		  }).showBy(Ext.getCmp('routeBtn'));
	   },500);	   
   },
   bikeFriendSpotlightStepTwo: function(){
	   var me = this;
	   me.getRoutePanel().setModal(true);
	   setTimeout(function(){   
		   var tooltipPanel = Ext.create('Ext.Panel',{
							   html: Ext.decode(localStorage.getItem('tooltips')).routePanelOne,
							   //html: 'Inserire un punto di partenza e una destinazione per trovare il percorso piu\' veloce da percorrere in bicicletta.<br>',
							   scrollable: 'y',
							   width: '90%',
							   height: '150px',
							   //margin: '0 0 0 -10px',
							   anchor: true,
							   //anchorPosition: 'bottom',
							   items:[{
								   xtype: 'toolbar',
								   docked: 'bottom',
								   height: '30px',
								   items:['->',{
									   xtype:'button',
									   docked: 'left',
									   iconCls: 'x-fa fa-arrow-left',
									   handler: function(btn){
										   btn.up('panel').next = false;
										   btn.up('panel').close();
									   }
								   },{
									   xtype: 'button',
									   docked: 'left',
									   iconCls: 'x-fa fa-arrow-right',
									   handler: function(btn){
										   btn.up('panel').next = true;
										   btn.up('panel').close();
									   }
								   },{
									   xtype: 'button',
									   docked: 'right',
									   iconCls: 'x-fa fa-times',
									   handler: 'stopSpotlight',
									   scope: me
								   }]
							   }],
							   listeners: {
								   destroy: function(panel){
									   if(panel.next){
										  me.bikeFriendSpotlightStepThree();
									   }else{
										   me.getRoutePanel().hide();
										   me.bikeFriendSpotlight();						   
									   }
									   
								   }
							   }
						  });
		tooltipPanel.showBy(me.getRoutePanel());
		tooltipPanel.setZIndex(9999);
	   },400);	
   },
   bikeFriendSpotlightStepThree: function(){
	   var me = this;
	   var tooltipPanel = Ext.create('Ext.Panel',{
			   //html: 'Tramite il pulsante "+" e\' possibile aggiungere fino a due punti intermediari.<br>'+
				//	  'Il pulsante al centro permette di visualizzare le indicazioni riguardanti il percorso.<br>'+
				//	  'Il pulsante a destra permette di invertire partenza e destinazione.',
				html: Ext.decode(localStorage.getItem('tooltips')).routePanelTwo,	  
			  // modal: true,
			   scrollable: 'y',
			   width: '90%',
			   height: '150px',
			   //margin: '0 0 0 -10px',
			   anchor: true,
			   //anchorPosition: 'bottom',
			   items:[{
				   xtype: 'toolbar',
				   docked: 'bottom',
				   height: '30px',
				   items:['->',{
					   xtype:'button',
					   docked: 'left',
					   iconCls: 'x-fa fa-arrow-left',
					   handler: function(btn){
						   btn.up('panel').next = false;
						   btn.up('panel').close();
					   }
				   },{
					   xtype: 'button',
					   docked: 'left',
					   iconCls: 'x-fa fa-arrow-right',
					   handler: function(btn){
						   btn.up('panel').next = true;
						   btn.up('panel').close();
					   }
				   },{
					   xtype: 'button',
					   docked: 'right',
					   iconCls: 'x-fa fa-times',
					   handler: 'stopSpotlight',
					   scope: me
				   }]
			   }],
			   listeners: {
				   destroy: function(panel){
					   if(panel.next){
						  me.bikeFriendSpotlightFinal();
					   }else{
						   me.bikeFriendSpotlightStepTwo();					   
					   }
					   
				   }
			   }
		  });
		  tooltipPanel.showBy(me.getRoutePanel());
		  tooltipPanel.setZIndex(9999);
   },
   bikeFriendSpotlightFinal: function(){
	   var me = this;
	   var tooltipPanel = Ext.create('Ext.Panel',{
			   html: Ext.decode(localStorage.getItem('tooltips')).routePanelFinal,	
			   scrollable: 'y',
			   width: '90%',
			   height: '150px',
			   //margin: '0 0 0 -10px',
			   anchor: true,
			   //anchorPosition: 'bottom',
			   items:[{
				   xtype: 'toolbar',
				   docked: 'bottom',
				   height: '30px',
				   items:['->',{
					   xtype:'button',
					   docked: 'left',
					   iconCls: 'x-fa fa-arrow-left',
					   handler: function(btn){
						   btn.up('panel').before = true;
						   btn.up('panel').close();
					   }
				   },/*{
					   xtype: 'button',
					   docked: 'left',
					   iconCls: 'x-fa fa-arrow-right',
					   handler: function(btn){
						   btn.up('panel').next = true;
						   btn.up('panel').close();
					   }
				   },*/{
					   xtype: 'button',
					   docked: 'right',
					   iconCls: 'x-fa fa-check',
					   //text: 'Fine',
					   handler: function(btn){
						   btn.up('panel').before = false;
						   btn.up('panel').close();
					   },
					   scope: me
				   }]
			   }],
			   listeners: {
				   destroy: function(panel){
					   if(panel.before){
						  me.bikeFriendSpotlightStepThree();	
					   }else{
						   me.setSpotlight(false);
						   me.getRoutePanel().setModal(false);
						   me.getRoutePanel().hide();
						   //me.getRoutePanel().down('#closeBtn').handler = function(panel){panel.close()};
						   Ext.getCmp('legendBtn').show();
						   Ext.getCmp('spotlightBtn').show(); 
						   Ext.getCmp('searchBtn').show();
						   Ext.getCmp('searchBtn').enable();
						   Ext.getCmp('legendBtn').enable();
						   Ext.getCmp('spotlightBtn').enable();
						   Ext.getCmp('routeBtn').enable();
						   Ext.getCmp('searchBtn').setIconCls('x-fa fa-search');
						   localStorage.setItem('loadSpotlight','false');
						   var map = Ext.getCmp('leafletmap').getController().getMap();
						   map.removeLayer(me.getPositionMarker());
					   }
					   
				   }
			   }
		  });
		  tooltipPanel.showBy(me.getRoutePanel());
		  tooltipPanel.setZIndex(9999);
   },
   openPoiTab: function(poi){
	   var me = this;
	   var poiWithCoords = wellknown.parse(poi.wkt);
	    var area_id = poi.id_area;
		var btn = null;
		
		switch(area_id){
			case '1':
				btn = 'tourismBtn';
				break;
			case '2':
				btn = 'societyBtn';
				break;
			case '3':
				btn = 'securityBtn';
				break;
			case '4':
				btn = 'healthBtn';
				break;
			case '5':
				btn = 'mobilityBtn';
				break;
			case '6':
				btn = 'bikeBtn';
				break;
		}
		
		if(btn){
			var btnCmp = Ext.getCmp(btn);
			  
			btnCmp.up('tabpanel').down('mapview').up().down('titlebar').setTitle(btnCmp.getText());
								
		    //Attivo la Tab della mappa
		    btnCmp.up('tabpanel').setActiveItem(5);
		    // return;
		    //Lego il topic selezionato al bottone della legenda per tenerne traccia
		    btnCmp.up('tabpanel').down('mapview').up().down('button').topic = btnCmp.topic;
		    btnCmp.up('tabpanel').down('mapview').up().down('button').engtopic = btnCmp.engtopic;
			
			Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getLayerList.php',
			   params: {
				   topic: localStorage.getItem('defLang') == 'it' ? btnCmp.topic : btnCmp.engtopic
			   },
			   success: function(response){
				   
				   me.setActiveRootNode(response.data);
				  
				   Ext.Array.each(response.data.children,function(categoryGroup,groupIndex){
					   Ext.Array.each(categoryGroup.children,function(category,catIndex){
						   if(category.table == poi.layer_name){
							   
							  
							   var detailObj = {
								   category: category,
								   groupIndex: groupIndex,
								   catIndex: catIndex,
								   coords: poiWithCoords.coordinates
							   };
							   
				
							   me.setCurrentTopic(btnCmp.topic,btnCmp.engtopic,true,detailObj);	
						
						   }
					   });
				   });
			   },
			   failure: function(response){
				  //Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
				  alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText + '.Failure: getLayerList');
				   me.setActiveRootNode(null);
			   }
			}); 
		}
   },
   
 switchToMapPanel: function(btnCmp){
	 btnCmp.up('tabpanel').down('mapview').up().down('titlebar').setTitle(btnCmp.getText());
	
    //Attivo la Tab della mappa
    btnCmp.up('tabpanel').setActiveItem(5);
    // return;
    //Lego il topic selezionato al bottone della legenda per tenerne traccia
    btnCmp.up('tabpanel').down('mapview').up().down('button').topic = btnCmp.topic;
    btnCmp.up('tabpanel').down('mapview').up().down('button').engtopic = btnCmp.engtopic;
 },
   
   
   onLegendGroupCollapse: function(node,record,eOpts){
	   var me = this;
	   var grid = me.getLegendPanel().down('tree');
	   var gridRows = grid.getItems().items[0].getItems();
	   Ext.Array.each(gridRows.items,function(gridRow){
		   gridRow.setCls(null);
	   });

	   Ext.Array.each(grid.getStore().getData().items,function(rec){
		   
		   
		   if(rec.get('leaf') && grid.getItem(rec)){
			   
				 if(rec.get('checked')){
			   
					   grid.getItem(rec).setCls('noSpacing activeLayer');
					   
				   }else{
					   
					   grid.getItem(rec).setCls('noSpacing');
				   }  
			}else if(grid.getItem(rec)){
				grid.getItem(rec).setCls('noSpacing');
			}
		   
		   
	   });
	  
	   
   },
   
   onLegendGroupCollapseLimit: function(node,record,eOpts){
	   var me = this;
	   var grid = me.getLimitationLegendPanel().down('tree');
	   var gridRows = grid.getItems().items[0].getItems();
	   Ext.Array.each(gridRows.items,function(gridRow){
		   gridRow.setCls(null);
	   });

	   Ext.Array.each(grid.getStore().getData().items,function(rec){
		   
		   
		   if(rec.get('leaf') && grid.getItem(rec)){
			   
				 if(rec.get('checked')){
			   
					   grid.getItem(rec).setCls('noSpacing activeLayer');
					   
				   }else{
					   
					   grid.getItem(rec).setCls('noSpacing');
				   }  
			}else if(grid.getItem(rec)){
				grid.getItem(rec).setCls('noSpacing');
			}
		   
		   
	   });
	   
   },
   startLimitationSpotlight: function(){
	   var me = this;
	   me.setLimitationSpotlight(true);
	   Ext.getCmp('trafficHelpBtn').hide();
	   Ext.getCmp('trafficLimitationBtn').hide();
	  // Ext.getCmp('limitationLegendBtn')
	   Ext.create('Ext.Panel',{
		 //  html: 'Premere questo pulsante per accedere al pannello di controllo della mappa',
		   html: Ext.decode(localStorage.getItem('tooltips')).legendBtn,
		   modal: true,
		   width: '90%',
		   keep: false,
		//   height: '150px',
		   margin: '0 15px 0 0',
		   anchor: true,
		   items:[{
			   xtype: 'toolbar',
			   docked: 'bottom',
			   height: '30px',
			   items:[
			   '->',{
				   xtype: 'button',
				   docked: 'left',
				   iconCls: 'x-fa fa-arrow-right',
				   handler: function(btn){
					   btn.up('panel').keep = true;
					   btn.up('panel').close();
					   me.LimitationSpotlightStepTwo();
				   }
			   },{
				   xtype: 'button',
				   docked: 'right',
				   iconCls: 'x-fa fa-times',
				   handler: function(btn){
					   me.stopLimitationSpotlight();
					   btn.up('panel').close();
				   }
			   }]
		   }]
	   }).showBy(Ext.getCmp('limitationLegendBtn'));
   },
   LimitationSpotlightStepTwo: function(){
	   var me = this;
	   Ext.getCmp('trafficHelpBtn').hide();
	   Ext.getCmp('trafficLimitationBtn').show();
	   Ext.getCmp('trafficLimitationBtn').disable();
	   Ext.getCmp('limitationLegendBtn').hide();
	   Ext.create('Ext.Panel',{
		 //  html: 'Premere questo pulsante per accedere al pannello di controllo della mappa',
		   html: Ext.decode(localStorage.getItem('tooltips')).limitationPanelBtn,
		   modal: true,
		   width: '90%',
		   keep: false,
		  // height: '150px',
		   margin: '0 15px 0 0',
		   anchor: true,
		   items:[{
			   xtype: 'toolbar',
			   docked: 'bottom',
			   height: '30px',
			   items:[
			   '->',{
				   xtype: 'button',
				   docked: 'left',
				   iconCls: 'x-fa fa-arrow-right',
				   handler: function(btn){
					   btn.up('panel').keep = true;
					   btn.up('panel').close();
					   me.LimitationSpotlightStepThree();
				   }
			   },{
				   xtype: 'button',
				   docked: 'right',
				   iconCls: 'x-fa fa-times',
				   handler: function(btn){
					   me.stopLimitationSpotlight();
					   btn.up('panel').close();
				   }
			   }]
		   }]
	   }).showBy(Ext.getCmp('trafficLimitationBtn'));
   },
   LimitationSpotlightStepThree: function(){
	   var me = this;
	   me.getLimitationPanel().show();
	   //console.log('ENTRO QUA');
		setTimeout(function(){ 
		   Ext.create('Ext.Panel',{
		   //html: 'Una volta compilati i dati, premere il pulsante "Aggiorna Percorribilità" per aggiornare la viabilità delle strade. Quelle non percorribili saranno segnalate in rosso.',
		   html: Ext.decode(localStorage.getItem('tooltips')).limitationPanel,
		   modal: true,
		   width: '90%',
		  // height: '150px',
		   margin: '0 10px 0 0',
		   items:[{
			   xtype: 'toolbar',
			   docked: 'bottom',
			   height: '30px',
			   items:[
			   {
				   xtype: 'button',
				   docked: 'right',
				   iconCls: 'x-fa fa-times',
				   handler: function(btn){
					   btn.up('panel').close();
					   me.stopLimitationSpotlight();			   
				   }
			   }]
		   }]
		   }).showBy(me.getLimitationPanel().getHeader()); 
		},500);
   },
   stopLimitationSpotlight: function(btn){
	   var me = this;
	   me.setLimitationSpotlight(false);
	   localStorage.setItem('limitationSpotlight',false);
	   Ext.getCmp('trafficHelpBtn').show();
	   Ext.getCmp('trafficLimitationBtn').show();
	   Ext.getCmp('limitationLegendBtn').show();
	   Ext.getCmp('trafficHelpBtn').enable();
	   Ext.getCmp('trafficLimitationBtn').enable();
	   Ext.getCmp('limitationLegendBtn').enable();

   },
   onTrafficLocationFocus: function(field){
	   var me = this;
	   me.getDelayedLimitAddress().cancel();
	   me.getLimitAddressDataview().getStore().removeAll();
	   me.getLimitAddressDataview().hide();
   },
   getarea: function(){
	   var me = this;
	   Ext.fireEvent('setarea',me.getTopic());
   },
   
   
   onSanitaryPanelLoad: function(panelDom){
	   var me = this;
	   var panel = panelDom;
	   panel.mask('...');
	   Ext.data.JsonP.request({
		   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getSanitaryInfo.php',
		   params: {
			   lang: localStorage.getItem('defLang') 
		   },
		   success: function(response){
			   panel.unmask();
			   panel.setHtml(response.data);
			   	   
		   },
		   failure: function(response){
			   panel.unmask();
			   alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText);

		   }
		});
   },
   
   showPharmacies: function(btn){
	    var me = this;
	   var btnCmp = Ext.getCmp('mainTabPanel').down('homeview').lookup('healthBtn');

	   btnCmp.up('tabpanel').down('mapview').up().down('titlebar').setTitle(btnCmp.getText());
	   //Attivo la Tab della mappa
	   btnCmp.up('tabpanel').setActiveItem(5);
	   //Lego il topic selezionato al bottone della legenda per tenerne traccia
	   btnCmp.up('tabpanel').down('mapview').up().down('button').topic = 'salute';
	   btnCmp.up('tabpanel').down('mapview').up().down('button').engtopic = 'health';
	   me.setCurrentTopic('salute','health',false);	      
	   me.showLegendPanel();
   }
      
});
