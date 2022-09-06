Ext.define('WebMappVenezia.view.map.Map', {
    extend: 'Ext.Panel',
    xtype: 'mapview',
	id: 'leafletmap',
	resizable: false,
	flex: 1,
	controller: 'map',
	listeners: {
		order: 'after',
		painted: 'afterRender',
		resize: 'onResize'
	},
});
