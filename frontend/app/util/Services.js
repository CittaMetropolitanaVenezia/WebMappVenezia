Ext.define('WebMappVenezia.util.Services', {
    singleton: true,
    alternateClassName: ["Services"],
	//alias: 'widget.WebmapServices',
	loadStartLanguage: function(){
	apiUrl: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/',
	resourcesUrl: 'https://webgis.cittametropolitana.ve.it/webmapp/resources/',
	},
	__T: function(code){
		var tokens = code.split('|');
		var group = tokens[0];
		var textCode = tokens[1];
		return Ext.decode(localStorage.getItem('group')).textCode;
	},
	
	openWebpage: function(url){
		console.log('entro',url);
		
		window.open(url, '_blank', 'location=yes,zoom=no,toolbar=yes,fullscreen=yes,hidden=no');
	}
});
