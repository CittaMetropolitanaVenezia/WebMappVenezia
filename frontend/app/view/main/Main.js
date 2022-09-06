/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('WebMappVenezia.view.main.Main', {
    extend: 'Ext.tab.Panel',
    xtype: 'app-main',
	
	id: 'mainTabPanel',
    requires: [
        'Ext.MessageBox',

        'WebMappVenezia.view.main.MainController',
        'WebMappVenezia.view.main.MainModel',
		'WebMappVenezia.view.main.Home',
		'WebMappVenezia.view.main.Form',
		'WebMappVenezia.view.map.Map'
		
    ],	
	layout: {
		type: 'card',
		animation: false
	},
    controller: 'main',
	fullscreen: true,
	tabBar:{
		//height: 60,
		defaults:{
			//height: 58
		}
		   
	},

    tabBarPosition: 'bottom',

    items: [
        {
			//title: Ext.decode(localStorage.getItem('titles')).homeTabTitle,
			reference: 'homeTab',
            iconCls: 'x-fa fa-home',
            layout: 'vbox',

            items: [{
				xtype: 'titlebar',
				height: 75,
				//title: Ext.decode(localStorage.getItem('titles')).homeTitle,
				titleAlign: 'center',
				items:[{
							xtype: 'img',
							src: 'resources/images/cmve_logo.png',
							align:'left',
							height: 50,
							width: 120,
							listeners:{
								painted: function(img){
									if(screen.width < 340){
										img.setSrc('resources/images/cmve_logo_small.png');
										img.setWidth(50);
									}
								}
							}
						},{
							xtype: 'img',
							src: 'resources/images/webmapp.png',
							align:'right',
							height: 50,
							width: 50
				}]
			},{
                xtype: 'homeview',
				height: '100%'
            }],
			listeners: {
				initialize: function(panel,eOpts){
					var me = this;
					if(localStorage.getItem('titles') != null){
						panel.config.title = (Ext.decode(localStorage.getItem('titles')).homeTabTitle);
						panel.down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).homeTitle);
					}
					
				}
			}
        },{
            //title: Ext.decode(localStorage.getItem('titles')).submissionTitle,
            iconCls: 'x-fa fa-edit',
			reference: 'submissionTab',
			
			layout: 'vbox',
            items: [{
				xtype: 'titlebar',
				height: 75,
				//title: Ext.decode(localStorage.getItem('titles')).submissionTitle,
				titleAlign: 'center',
				items:[{
							xtype: 'img',
							src: 'resources/images/cmve_logo.png',
							align:'left',
							height: 50,
							width: 120,
							listeners:{
								painted: function(img){
									if(screen.width < 340){
										img.setSrc('resources/images/cmve_logo_small.png');
										img.setWidth(50);
									}
								}
							}
						},{
							xtype: 'img',
							src: 'resources/images/webmapp.png',
							align:'right',
							height: 50,
							width: 50
				}]
			},{
                xtype: 'submissionview'
            }],
			listeners: {
				initialize: function(panel,eOpts){		
					var me = this;
					if(localStorage.getItem('titles') != null){					
						panel.config.title =(Ext.decode(localStorage.getItem('titles')).submissionTitle);
						panel.down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).submissionTitle);
					}
				}
			}
        },{
            //title: Ext.decode(localStorage.getItem('titles')).aboutTitle,
            iconCls: 'x-fa fa-info-circle',
			iconAlign: 'top',
			reference: 'aboutTab',
			items:[{
				xtype: 'titlebar',
				height: 75,
				//title: Ext.decode(localStorage.getItem('titles')).aboutTitle,
				titleAlign: 'center',
				items:[{
							xtype: 'img',
							src: 'resources/images/cmve_logo.png',
							align:'left',
							height: 50,
							width: 120,
							listeners:{
								painted: function(img){
									if(screen.width < 340){
										img.setSrc('resources/images/cmve_logo_small.png');
										img.setWidth(50);
									}
								}
							}
						},{
					xtype: 'img',
					align: 'right',
					src: 'resources/images/webmapp.png',
					height: 50,
					width: 50
				}]
			},{
				xtype: 'textfield',
				value: '2.6.5',
				readOnly: true,
				label: 'Versione',
				labelAlign: 'left',
				flex: 1
				
			}],
			listeners: {
				initialize: function(panel,eOpts){
					var me = this;
					if(localStorage.getItem('titles') != null){					
						panel.config.title =(Ext.decode(localStorage.getItem('titles')).aboutTitle);
						panel.down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).aboutTitle);
						panel.setHtml(Ext.decode(localStorage.getItem('about')).text);
					}
				}
			}
          //  html: Ext.decode(localStorage.getItem('about')).text,
        },{
            //title: Ext.decode(localStorage.getItem('titles')).settingsTitle,
            iconCls: 'x-fa fa-cog',
			reference: 'settingsTab',
			items:[{
				xtype: 'titlebar',
				//title: Ext.decode(localStorage.getItem('titles')).settingsTitle,
				titleAlign: 'center',
				height: 75,
				items:[{
							xtype: 'img',
							src: 'resources/images/cmve_logo.png',
							align:'left',
							height: 50,
							width: 120,
							listeners:{
								painted: function(img){
									if(screen.width < 340){
										img.setSrc('resources/images/cmve_logo_small.png');
										img.setWidth(50);
									}
								}
							}
						},{
					xtype: 'img',
					align: 'right',
					src: 'resources/images/webmapp.png',
					height: 50,
					width: 50
				}],
			},{
				xtype: 'formpanel',
				defaults: {
					anchor: '100%'
				},
				items:[{
					xtype: 'fieldset',
					//title: Ext.decode(localStorage.getItem('settings')).fieldsetTitle,
					reference: 'settingsFieldset',
					items:[{
						xtype: 'selectfield',
						//label: Ext.decode(localStorage.getItem('settings')).lang,
						reference: 'languageField',
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
						labelAlign: 'left',
						listeners:{
							change: 'onLanguageChange'
						}
					},{
						xtype: 'togglefield',
						reference: 'notificationField',
						labelWidth: '85%',
						labelAlign: 'left',
						listeners:{
							change: 'onNotificationChange'
						}
					}]
				}]
			}],
			listeners: {
				initialize: function(panel,eOpts){		
					var me = this;
					if(localStorage.getItem('titles') != null){					
						panel.config.title =(Ext.decode(localStorage.getItem('titles')).settingsTitle);
						panel.down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).settingsTitle);
						panel.down('fieldset').setTitle(Ext.decode(localStorage.getItem('settings')).fieldsetTitle);
						panel.down('fieldset').down('togglefield').setLabel(Ext.decode(localStorage.getItem('settings')).notification);
						
						var notifyValue = false;
						if(localStorage.getItem('notifications') == 1){
							notifyValue = true;
						}
						panel.down('fieldset').down('togglefield').setValue(notifyValue);

						panel.down('fieldset').down('selectfield').setLabel(Ext.decode(localStorage.getItem('settings')).lang);
						panel.down('fieldset').down('selectfield').suspendEvents();
						var options = [];
						
						var oldOptions = [{
							//text: 'Italiano',
							value: 'it',
							textname: 'italian'
						},{
							//text: 'Inglese',
							value: 'eng',
							textname: 'english'
						}];
						
						
						Ext.Array.each(oldOptions,function(comboOption){
							options.push({
								text: Ext.decode(localStorage.getItem('settings'))[comboOption.textname],
								value: comboOption.value,
								textname: comboOption.textname
							})
						});
						panel.down('fieldset').down('selectfield').setOptions(options);


					    panel.down('fieldset').down('selectfield').setValue(localStorage.getItem('defLang'));
						panel.down('fieldset').down('selectfield').resumeEvents();
					}
				}
			}
        },{
			//title: Ext.decode(localStorage.getItem('titles')).veniceAccessTitle,
			iconCls: 'x-fa fa-sign-in',
			reference: 'veAccessTab',
			hidden: true,
			items:[{
				xtype: 'titlebar',
				height: 75,
				//title: Ext.decode(localStorage.getItem('titles')).veniceAccessTitle,
				titleAlign: 'center',
				items:[{
							xtype: 'img',
							src: 'resources/images/cmve_logo.png',
							align:'left',
							height: 50,
							width: 120,
							listeners:{
								painted: function(img){
									if(screen.width < 340){
										img.setSrc('resources/images/cmve_logo_small.png');
										img.setWidth(50);
									}
								}
							}
						},{
					xtype: 'img',
					align: 'right',
					src: 'resources/images/webmapp.png',
					height: 50,
					width: 50
				}]
			}],
			listeners: {
				initialize: function(panel,eOpts){
					var me = this;
					if(localStorage.getItem('titles') != null){					
						panel.config.title =(Ext.decode(localStorage.getItem('titles')).veniceAccessTitle);
						panel.down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).veniceAccessTitle);
						panel.setHtml(Ext.decode(localStorage.getItem('veaccess')).text);
					}
				}
			}
		//	html: Ext.decode(localStorage.getItem('veaccess')).text,
			
		},{
			reference: 'mapTitle',
			iconCls: 'x-fa fa-map',
			hidden: true,
			layout: 'vbox',
			items:[
			{
				xtype: 'titlebar',
				height: 75,
				id: 'mapTabTitle',
				titleAlign: 'Text',
				items:[
				{
					iconCls: 'x-fa fa-list',
					reference: 'legendBtn',
					align: 'left',
					id: 'legendBtn',
			
					handler: 'showLegendPanel',
					style:{
					//	borderRadius: '5px',
					//	border: '1px solid black'
					},
					listeners:{
						painted: function(btn){
							//var btn = btnEl;
							
							setTimeout(function(){
								btn.setStyle({
									background: '#CCF0FF',
									borderRadius: '5px',
							//		border: '1px solid green'
								});
								//btn.setIconCls('x-fa fa-list greenIcon');
								setTimeout(function(){
									btn.setStyle({
										 border: 'none',
										 background: '#2196F3'
									});
									//btn.setIconCls('x-fa fa-list');
									setTimeout(function(){
										btn.setStyle({
											background: '#CCF0FF',
											borderRadius: '5px',
										//	border: '1px solid green'
										});
										//btn.setIconCls('x-fa fa-list greenIcon');
										setTimeout(function(){
											btn.setStyle({
												 border: 'none',
												 background: '#2196F3'
											});
											//btn.setIconCls('x-fa fa-list ');
											setTimeout(function(){
												btn.setStyle({
													background: '#CCF0FF',
													borderRadius: '5px',
												//	border: '1px solid green'
												});
												//btn.setIconCls('x-fa fa-list greenIcon');
												setTimeout(function(){
													btn.setStyle({
														 border: 'none',
														 background: '#2196F3'
													});
													//btn.setIconCls('x-fa fa-list');
												},1000);
											},1000);
										},1000);
									},1000);
								},1000);
							},1000);
							
							
					
						}
					},
				},{
					iconCls: 'x-fa fa-question',
					reference: 'spotlightBtn',
					align: 'left',
					id: 'spotlightBtn',
					handler: 'startSpotlight'
				},{
					iconCls: 'x-fa fa-map-signs',
					reference: 'routeBtn',
					align:'right',
					id: 'routeBtn',
					handler: 'calculateRoute',
					hidden: true
				},{
					iconCls: 'x-fa fa-search',
					reference: 'searchBtn',
					
					align: 'right',
					id: 'searchBtn',
					handler: 'getAddressPosition'
				}], 
			},
			{
				xtype: 'mapview',
				reference: 'mapTab',		
			}]
		},{
			//title: Ext.decode(localStorage.getItem('titles')).objectSearchTabTitle,
			reference: 'objectTab',
			iconCls: 'object-localization-white-icon',
			layout: 'vbox',
			items:[{
				xtype: 'titlebar',
				height: 75,
				//title: Ext.decode(localStorage.getItem('titles')).objectSearchTitle,
				titleAlign: 'center',
				items:[{
							xtype: 'img',
							src: 'resources/images/cmve_logo.png',
							align:'left',
							height: 50,
							width: 120,
							listeners:{
								painted: function(img){
									if(screen.width < 340){
										img.setSrc('resources/images/cmve_logo_small.png');
										img.setWidth(50);
									}
								}
							}
						},{
					xtype: 'img',
					align: 'right',
					src: 'resources/images/webmapp.png',
					height: 50,
					width: 50
				}]
			},{
				xtype: 'localizationTool'
			}],
			listeners: {
				initialize: function(panel,eOpts){
					var me = this;
					if(localStorage.getItem('titles') != null){					
						panel.config.title =(Ext.decode(localStorage.getItem('titles')).objectSearchTabTitle);
						panel.down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).objectSearchTitle);
					}
				}
			}

		},
		{
			reference: 'trafficMapTab',
			hidden: true,
			title: ' ',
			layout: 'vbox',
			items:[{
				xtype: 'titlebar',
				height: 75,
				title: 'Limitazioni Traffico',
				id: 'trafficTabTitle',
				titleAlign: 'center',
				listeners:{
					painted: function(titlebar){
						titlebar.setTitle(Ext.decode(localStorage.getItem('roadLimitation')).trafficTitlebar);
					}
				},
				items:[{
					xtype: 'button',
					align: 'left',
					iconCls: 'x-fa fa-list',
					id: 'limitationLegendBtn',
					handler: 'openLimitationLegendPanel',
					listeners:{
						painted: function(btn){
							
							setTimeout(function(){
								btn.setStyle({
									background: '#CCF0FF',
									borderRadius: '5px',
							//		border: '1px solid green'
								});
								//btn.setIconCls('x-fa fa-list greenIcon');
								setTimeout(function(){
									btn.setStyle({
										 border: 'none',
										 background: '#2196F3'
									});
									//btn.setIconCls('x-fa fa-list');
									setTimeout(function(){
										btn.setStyle({
											background: '#CCF0FF',
											borderRadius: '5px',
										//	border: '1px solid green'
										});
										//btn.setIconCls('x-fa fa-list greenIcon');
										setTimeout(function(){
											btn.setStyle({
												 border: 'none',
												 background: '#2196F3'
											});
											//btn.setIconCls('x-fa fa-list ');
											setTimeout(function(){
												btn.setStyle({
													background: '#CCF0FF',
													borderRadius: '5px',
												//	border: '1px solid green'
												});
												//btn.setIconCls('x-fa fa-list greenIcon');
												setTimeout(function(){
													btn.setStyle({
														 border: 'none',
														 background: '#2196F3'
													});
													//btn.setIconCls('x-fa fa-list');
												},1000);
											},1000);
										},1000);
									},1000);
								},1000);
							},1000);
							
							
					
						}
					},
				},{
					xtype: 'button',
					align: 'right',
					iconCls: 'x-fa fa-road',
					reference: 'trafficLimitationBtn',
					id: 'trafficLimitationBtn',
					handler: 'openLimitationPanel',
				},{
					xtype: 'button',
					align: 'left',
					iconCls: 'x-fa fa-question',
					id: 'trafficHelpBtn',
					handler: 'startLimitationSpotlight'
				}]
			},{
				xtype: 'trafficmapview',
				flex: 1
			}],
		},
		{
			reference: 'sanitaryPanel',
			hidden: true,
			
			title: ' ',
			layout: 'vbox',
			items:[{
				xtype: 'titlebar',
				height: 75,
				iconCls: 'x-fa fa-info-circle',
				id: 'sanitaryTabTitle',		
				titleAlign: 'center',
				title: '',
				items:[
					
					{
							xtype: 'img',
							src: 'resources/images/cmve_logo.png',
							align:'left',
							height: 50,
							width: 120,
							listeners:{
								painted: function(img){
									if(screen.width < 340){
										img.setSrc('resources/images/cmve_logo_small.png');
										img.setWidth(50);
									}
								}
							}
					},
					{
						xtype: 'img',
						align: 'right',
						src: 'resources/images/webmapp.png',
						height: 50,
						width: 50
					}
				],
				listeners:{
					painted: function(titlebar){
						//titlebar.down('button').setText(Ext.decode(localStorage.getItem('titles')).sanitaryPanel);
						titlebar.setTitle(Ext.decode(localStorage.getItem('titles')).sanitaryPanel);
					}
				}
			},
			{
				xtype: 'panel',
				margin: '5 5 5 5',
				scrollable: 'y',
				listeners:{
					painted: function(panelDom){
					   var me = this;
					   var panel = panelDom;
					   console.log('PAINTED',Ext.decode(localStorage.getItem('sanitaryInfo')).html);
					   panel.setHtml(Ext.decode(localStorage.getItem('sanitaryInfo')).html);
				   }
				}
			}],		
		}
    ],
	listeners: {
		activeitemchange: 'onMainTabChange'
	}
});
