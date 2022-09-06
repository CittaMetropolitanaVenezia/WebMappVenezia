Ext.define('WebMappVenezia.view.map.FormMap', {
    extend: 'Ext.Panel',
    xtype: 'formmapview',
	id: 'leafletmap3',
	resizable: false,
	flex: 1,
	controller: 'formmap',
	listeners: {
		order: 'after',
		painted: 'afterRender',
		resize: 'onResize'
	},
});
