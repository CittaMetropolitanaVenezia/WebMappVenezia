
Ext.define('WebMappVenezia.view.main.HomeController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.home',
	listen:{
		global: {
			langChange: 'onLangChange'
		}
	},

	activateMap: function(btn,e){
		//cambio il titolo	
		btn.up('tabpanel').down('mapview').up().down('titlebar').setTitle(btn.getText());
		
		//Attivo la Tab della mappa
		
		btn.up('tabpanel').setActiveItem(5);
		
		//Lego il topic selezionato al bottone della legenda per tenerne traccia
		
		btn.up('tabpanel').down('mapview').up().down('button').topic = btn.topic;
		btn.up('tabpanel').down('mapview').up().down('button').engtopic = btn.engtopic;
		
		Ext.fireEvent('mapstarted',btn.topic,btn.engtopic);
	},
	
	
	activateLimitationMap: function(btn,e){
		var me = this;
		btn.up('tabpanel').setActiveItem(7);
	},
	
	
	showSanitaryPanel: function(btn){
		var me = this;
		btn.up('tabpanel').setActiveItem(8);
	},
	
	
	showVeniceAccess: function(btn){
		var me = this;
		btn.up('tabpanel').setActiveItem(4);
	},
	
	onLangChange: function(lang){
		var me = this;
		//HOME 
		me.lookup('tourismBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).tourismBtn);
		me.lookup('societyBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).societyBtn);
		me.lookup('securityBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).securityBtn);
		me.lookup('healthBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).healthBtn);
		me.lookup('mobilityBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).mobilityBtn);
		me.lookup('bikeBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).bikeBtn);
		me.lookup('viabilityBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).viabilityBtn);
		me.lookup('sanitaryBtn').setText(Ext.decode(localStorage.getItem('homeButtons')).sanitaryBtn);
		//me.lookup('bikeBtn').up('tabpanel').down('titlebar').setTitle(Ext.decode(localStorage.getItem('titles')).homeTitle);
	}
  
});
