Ext.define('WebMappVenezia.view.map.HomeMap', {
    extend: 'Ext.Panel',
    xtype: 'homemapview',
	id: 'leafletmap2',
	resizable: false,
	flex: 1,
	controller: 'homemap',
	listeners: {
		order: 'after',
		painted: 'afterRender',
		resize: 'onResize'
	},
});
