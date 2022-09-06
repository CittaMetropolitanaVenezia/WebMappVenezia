Ext.define('WebMappVenezia.store.Legend', {
    extend: 'Ext.data.TreeStore',
    alias: 'store.legend',
	autoLoad: false,
	autoSort: false,
	autoSync: false,
	clearOnLoad: true,
	remoteSort: true,
    proxy: {
        type: 'jsonp',
		api:{
			read: 'http://192.168.184.129/phpapp/getLayerList.php'
		},
        reader: {
            type: 'json',
            rootProperty: 'data'
        }
    }
});
