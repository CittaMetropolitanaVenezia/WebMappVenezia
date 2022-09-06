Ext.define('WebMappVenezia.view.main.Home', {
    extend: 'Ext.Panel',
    xtype: 'homeview',
    layout: {
		type: 'vbox',
		//align: 'stretchmax'
	},
	controller: 'home',
	flex: 1,
	items:[{
		xtype: 'homemapview',
		height: '35%',
		margin: '15 15 15 15',
		flex:1,
	},{
		xtype: 'panel',
		height: '65%',
		width: '100%',
		//flex:1,
		layout: {
			type: 'vbox',
			align: 'stretchmax',
		},
		items: [{
			xtype:'panel',
			padding: '0 15 5 15',
			flex:2,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults:{
				xtype: 'button',
				border: true,
				cls: 'homebutton',		
				flex: 1,
				iconAlign: 'top',
				textAlign: 'center',
			},
			items:[
			{
				//iconCls: 'x-fa fa-image greyIcon',	
				iconCls: 'tourism-icon', 
				id: 'tourismBtn',
				//text: Ext.decode(localStorage.getItem('homeButtons')).tourismBtn,
				reference: 'tourismBtn',
				//icon: 'resources/images/tourism.png',
				topic: 'turismo',
				engtopic: 'tourism',
				handler: 'activateMap',
				style:{
					border: '1px solid grey',
					borderBottomWidth: '0px',
					borderRightWidth: '0px',
					borderLeftWidth:'0px'
				}
			},{
				//iconCls: 'x-fa fa-users greyIcon',
				iconCls: 'society-icon',
				//text: Ext.decode(localStorage.getItem('homeButtons')).societyBtn,
				reference: 'societyBtn',
				id: 'societyBtn',
				topic: 'societa',
				engtopic: 'life',
				style: {
					border: '1px solid grey',
					borderBottomWidth: '0px',
					borderRightWidth:'0px'	
				},
				handler: 'activateMap'
			}],
			listeners:{
				painted: function(panel,eOpts){
					var me = this;
					
					Ext.Array.each(panel.items.items,function(btn){
						btn.setText(Ext.decode(localStorage.getItem('homeButtons'))[btn.getReference()])
					});
					
				}
			}
			
		},{
			xtype:'panel',
			padding: '0 15 5 15',
			flex:2,

			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults:{
				xtype: 'button',
				cls: 'homebutton',					
				border: true,			
				flex: 1,
				iconAlign: 'top',
				textAlign: 'center',
			},
			items:[
			{
				//iconCls: 'x-fa fa-lock greyIcon',
				//text: Ext.decode(localStorage.getItem('homeButtons')).securityBtn,
				iconCls: 'security-icon',
				topic: 'sicurezza',
				reference: 'securityBtn',
				id: 'securityBtn',
				engtopic: 'security',
				handler: 'activateMap',
				style:{
					border: '1px solid grey',
					borderBottomWidth: '0px',
					borderRightWidth: '0px',
					borderLeftWidth:'0px'
				}
			},{
				//iconCls: 'x-fa fa-globe greyIcon',
				iconCls: 'health-icon',
				//text: Ext.decode(localStorage.getItem('homeButtons')).healthBtn,
				reference: 'healthBtn',
				id: 'healthBtn',
				topic: 'salute',
				engtopic: 'health',
				style: {
					border: '1px solid grey',
					borderBottomWidth: '0px',
					borderRightWidth:'0px'
				},
				handler: 'activateMap'
			}],
			listeners:{
				painted: function(panel,eOpts){
					var me = this;
					//var panel = panelDom.component;
					Ext.Array.each(panel.items.items,function(btn){
						btn.setText(Ext.decode(localStorage.getItem('homeButtons'))[btn.getReference()])
					});
					
				}
			}
			
		},{
			xtype:'panel',
			padding: '0 15 5 15',
			flex:2,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults:{
				cls: 'homebutton',
				xtype: 'button',
				border: true,
				flex: 1,
				iconAlign: 'top',
				textAlign: 'center',
			},
			items:[
			{
				//iconCls: 'x-fa fa-bus greyIcon',
				iconCls: 'mobility-icon',
				//text: Ext.decode(localStorage.getItem('homeButtons')).mobilityBtn,
				reference: 'mobilityBtn',
				id: 'mobilityBtn',
				topic: 'mobilita',
				engtopic: 'mobility',
				handler: 'activateMap',
				style:{
					border: '1px solid grey',
					borderBottomWidth: '0px',
					borderRightWidth: '0px',
					borderLeftWidth:'0px'
				}
			},{
				//iconCls: 'x-fa fa-bicycle greyIcon',
				iconCls: 'bicycle-icon',
				//text: Ext.decode(localStorage.getItem('homeButtons')).bikeBtn,
				reference: 'bikeBtn',
				id: 'bikeBtn',
				topic: 'amicibici',
				engtopic: 'bikefriends',
				style: {
					border: '1px solid grey',
					borderBottomWidth: '0px',
					borderRightWidth:'0px'
				},
				handler: 'activateMap'
			}],
			listeners:{
				painted: function(panel,eOpts){
					var me = this;
					//var panel = panelDom.component;
					Ext.Array.each(panel.items.items,function(btn){
						btn.setText(Ext.decode(localStorage.getItem('homeButtons'))[btn.getReference()])
					});
					
				}
			}
			
		},{
			xtype:'panel',
			padding: '0 15 5 15',
			flex:2,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			items:[
			{
				iconCls: 'traffic-icon',
				//text: Ext.decode(localStorage.getItem('homeButtons')).viabilityBtn,
				reference: 'viabilityBtn',
				id: 'viabilityBtn',
				cls: 'homebutton',
				xtype: 'button',
				topic: 'viabilita',
				engtopic: 'viability',
				handler: 'activateLimitationMap',
				border: true,
				flex: 1,
				iconAlign: 'top',
				style:{
					border: '1px solid grey',		
					borderRightWidth: '0px',
					borderLeftWidth:'0px',
				}
			}],
			listeners:{
				painted: function(panel,eOpts){
					var me = this;
					//var panel = panelDom.component;
					Ext.Array.each(panel.items.items,function(btn){
						btn.setText(Ext.decode(localStorage.getItem('homeButtons'))[btn.getReference()])
					});
					
				}
			}
			
		},
		{
			xtype:'panel',
			padding: '0 15 5 15',
			flex:1,
			layout: {
				type: 'hbox',
				align: 'stretch'
			},
			defaults:{
				cls: 'homebutton',
				xtype: 'button',
				border: true,
				flex: 1,
				iconAlign: 'left',
				textAlign: 'left',
			},
			items:
			[
				{
					xtype: 'button',
					reference: 'sanitaryBtn',
					id: 'sanitaryBtn',
					//width:'50%',
					//padding: '0 5 0 0',
					iconCls: 'x-fa fa-info-circle',
					//iconAlign: 'top',
					style:{
						border: '1px solid grey',		
						//borderRightWidth: '0px',
						borderTopWidth: '0px',
						borderLeftWidth:'0px',
						
					},
					handler: 'showSanitaryPanel',
					listeners:{
						painted: function(btn,eOpts){
							var me = this;
							//var btn = btnDom.component;
							btn.setText(Ext.decode(localStorage.getItem('homeButtons'))[btn.getReference()]);

							
						}
					} 
				},
				{
					xtype: 'button',
					reference: 'veniceAccessBtn',
					//padding: '10 5 10 5',
					padding: '0 0 0 10',
					//width:'50%',
					iconCls: 'x-fa fa-info-circle',
					//iconAlign: 'top',
					style:{
						border: '1px solid grey',		
						borderRightWidth: '0px',
						borderTopWidth: '0px',
						borderLeftWidth:'0px',
						
					},
					handler: 'showVeniceAccess',
					listeners:{
						painted: function(btn,eOpts){
							var me = this;
							//var btn = btnDom.component;
							btn.setText(Ext.decode(localStorage.getItem('titles'))['veniceAccessTitle']);

							
						}
					}
				}
			]
		},	
		]
	}]
});
