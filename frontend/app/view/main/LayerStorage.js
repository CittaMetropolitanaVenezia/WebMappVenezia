/**
 * This class is the main view for the application. It is specified in app.js as the
 * "mainView" property. That setting causes an instance of this class to be created and
 * added to the Viewport container.
 *
 * TODO - Replace the content of this view to suit the needs of your application.
 */
Ext.define('WebMappVenezia.view.main.LayerStorage', {
    singleton: true,
	alternateClassName: ['LayerStorage'],
	tourismLayers: [],
	societyLayers: [],
	securityLayers: [],
	healthLayers: [],
	mobilityLayers: [],
	bikeLayers: [],
	trafficLayers: [],
	zoomLayers: [],
	
	
	
	getZoomLayers: function(){
		var me = this;
		return me.zoomLayers;
	},
	
	addZoomLayer: function(layer){
		var me = this;
		
		var exists = false;
		
		Ext.Array.each(me.zoomLayers,function(zoomLay){
			
			if(zoomLay.table == layer.table){
				exists = true;
			}
		});	
		
		if(!exists){
			
			me.zoomLayers.push(layer);
			
		}
		
	},
	
	removeZoomLayer: function(table){
		var me = this;
		var elementToDelete = null;
		Ext.Array.each(me.zoomLayers,function(zoomLay){
			
			if(zoomLay.table == table){
				elementToDelete = zoomLay;
				
			}
		});	
		Ext.Array.remove(me.zoomLayers,elementToDelete);
	},
	
	
	
	
	addLayer: function(table,topic){
		var me = this;
		switch(topic){
			case 'tourism':
				if(!me.tourismLayers.includes(table)){
					me.tourismLayers.push(table);
				}			
				break;
			case 'life':
				if(!me.societyLayers.includes(table)){
					me.societyLayers.push(table);
				}
				break;
			case 'security':
				if(!me.securityLayers.includes(table)){
					me.securityLayers.push(table);
				}
				break;
			case 'health':
				if(!me.healthLayers.includes(table)){
					me.healthLayers.push(table);
				}
				break;
			case 'mobility':
				if(!me.mobilityLayers.includes(table)){
					me.mobilityLayers.push(table);
				}
				break;
			case 'bikefriends':
				if(!me.bikeLayers.includes(table)){
					me.bikeLayers.push(table);
				}
				break;
			case 'traffic':
				if(!me.trafficLayers.includes(table)){
					me.trafficLayers.push(table);
				}
				break;
		}
	},
	removeLayer: function(table,topic){
		var me = this;
		switch(topic){
			case 'tourism':
			Ext.Array.remove(me.tourismLayers,table);
				break;
			case 'life':
			Ext.Array.remove(me.societyLayers,table);
				break;
			case 'security':
			Ext.Array.remove(me.securityLayers,table);
				break;
			case 'health':
			Ext.Array.remove(me.healthLayers,table);
				break;
			case 'mobility':
			Ext.Array.remove(me.mobilityLayers,table);
				break;
			case 'bikefriends':
			Ext.Array.remove(me.bikeLayers,table);
				break;
			case 'traffic':
			Ext.Array.remove(me.trafficLayers,table);
				break;
		}
	},
	getLayers: function(topic){
		var me = this;
		switch(topic){
			case 'tourism':
			return me.tourismLayers;
				break;
			case 'life':
			return me.societyLayers;
				break;
			case 'security':
			return me.securityLayers;
				break;
			case 'health':
			return me.healthLayers;
				break;
			case 'mobility':
			return me.mobilityLayers;
				break;
			case 'bikefriends':
			return me.bikeLayers;
				break;
			case 'traffic':
			return me.trafficLayers;
				break;
		}
	}
	
});
