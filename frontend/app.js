/*
 * This file is generated and updated by Sencha Cmd. You can edit this file as
 * needed for your application, but these edits will have to be merged by
 * Sencha Cmd when upgrading.
 */
Ext.application({
    name: 'WebMappVenezia',

    extend: 'WebMappVenezia.Application',

    requires: [
        'WebMappVenezia.view.main.Main',
		'WebMappVenezia.view.main.LayerStorage'
    ],
	viewport:{
		layout: 'card'
	},
	config: {
		
	},
    // The name of the initial view to create. With the classic toolkit this class
    // will gain a "viewport" plugin if it does not extend Ext.Viewport. With the
    // modern toolkit, the main view will be added to the Viewport.
    //
   // mainView: 'WebMappVenezia.view.main.Main',
	launch :function(){
		var me = this;
		var defaultLang = localStorage.getItem('defLang');
			var notifications = localStorage.getItem('notifications');
			if(!notifications){
				localStorage.setItem('notifications',0);
			}
			if(!defaultLang){
				localStorage.setItem('defLang','it');
			}
			var lang = defaultLang != null ? defaultLang : 'it';
			Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/getConfiguration.php',
			   params: {
				   lang: lang 
			   },
			   success: function(response){		
					data = response.langData;
					
					sessionStorage.setItem('legendData',response.legends);
					
					sessionStorage.setItem('confini_comunali',response.comuni);
					
					localStorage.setItem('about',Ext.encode(data.about));
					localStorage.setItem('formFields',Ext.encode(data.formFields));
					localStorage.setItem('objLocalization',Ext.encode(data.objLocalization));
					localStorage.setItem('homeButtons',Ext.encode(data.homeButtons));
					localStorage.setItem('settings',Ext.encode(data.settings));
					localStorage.setItem('titles',Ext.encode(data.titles));
					localStorage.setItem('veaccess',Ext.encode(data.veaccess));
					localStorage.setItem('bikefriends',Ext.encode(data.bikefriends));
					localStorage.setItem('map',Ext.encode(data.map));
					localStorage.setItem('tooltips',Ext.encode(data.tooltips));
					localStorage.setItem('roadLimitation',Ext.encode(data.roadLimitation));
					localStorage.setItem('sanitaryInfo',Ext.encode(data.sanitaryInfo));
					localStorage.setItem('loaded',true);
					
					
					if(window.cordova){
						
						document.addEventListener('deviceready', function onDeviceReady() {
							
							cordova.plugins.diagnostic.requestLocationAuthorization(function(status){

							}, function(error){
								console.error(error);
							});	
							
							window.screen.orientation.lock('portrait');
							
							window.open = cordova.InAppBrowser.open;
							
							if(Ext.isApple){
								
						//		StatusBar.hide();
								
							}
							
							
							var push = PushNotification.init({
							  "android": {
								"senderID": "XXXXXXXX"
							  },
							  "browser": {},
							  "ios": {
								"sound": true,
								"vibration": true,
								"badge": true
							  },
							  "windows": {}
							});
							push.on('registration', function(data) {
							  
							 var deviceObj = {};
							  
							  deviceObj.device_key = data.registrationId;
							  deviceObj.language = localStorage.getItem('defLang');
							  deviceObj.platform = device.platform.toLowerCase();
							  
							  if(localStorage.getItem('notifications') && localStorage.getItem('notifications') == '1'){
								  
								  deviceObj.enabled = 1;
								  
							  }else{
								  
								  deviceObj.enabled = 0;
							  }
							  
							  localStorage.setItem('deviceObj',Ext.encode(deviceObj));
							  
							  Ext.data.JsonP.request({
								   url: 'https://webgis.cittametropolitana.ve.it/webmapp/phpapp/registerDevice.php',
								   params: deviceObj,
								   success: function(response){	
									   if(sessionStorage.getItem('notify') != 1){
										   sessionStorage.setItem('notify',1);
										  push.on('notification', function(data) {
											  console.log('notification event');
											  navigator.notification.alert(
												data.message,         // message
												null,                 // callback
												data.title,           // title
												'Ok'                  // buttonName
											  );
										  });
									   }
									   
										
								   },
								   failure: function(response){	
								   
								   },
							  });
							  
							  
							});

							Ext.Viewport.add({
								xtype: 'app-main'
							});	
							Ext.fireEvent('activateBackButton');
							
						}, false);
								
					}else{
						
						Ext.Viewport.add({
							xtype: 'app-main'
						});	
					}
								
			   },
			   failure: function(response){
				   Ext.Msg.alert('Attenzione','Controllare la propria connessione e riaprire l\'app');
				   //location.reload();
			   }
			}); 
	},
    //-------------------------------------------------------------------------
    // Most customizations should be made to WebMappVenezia.Application. If you need to
    // customize this file, doing so below this section reduces the likelihood
    // of merge conflicts when upgrading to new versions of Sencha Cmd.
    //-------------------------------------------------------------------------
});
