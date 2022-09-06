Ext.define('WebMappVenezia.view.map.TrafficLimitationMap', {
    extend: 'Ext.Panel',
    xtype: 'trafficmapview',
	id: 'leafletmap5',
	resizable: false,
	flex: 1,
	controller: 'trafficlimitation',
	listeners: {
		order: 'after',
		painted: 'afterRender',
		resize: 'onResize'
	},
});
