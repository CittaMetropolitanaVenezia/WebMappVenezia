Ext.define('WebMappVenezia.view.map.LocalizationMap', {
    extend: 'Ext.Panel',
    xtype: 'localizationmapview',
	id: 'leafletmap4',
	resizable: false,
	flex: 1,
	controller: 'localizationmap',
	listeners: {
		order: 'after',
		painted: 'afterRender',
		resize: 'onResize'
	},
});
