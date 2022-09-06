Ext.define('WebMappVenezia.view.main.LocalizationToolController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.localizationtool',
	listen:{
		global: {
			langChange: 'onLangChange',
			setarea: 'setarea'
		}
	},
	config: {
		delayedPoiCall: null
	},
	init: function(){
		var me = this;
	   me.setDelayedPoiCall(new Ext.util.DelayedTask(function(){
		   var searchfield = me.lookup('searched_place');
		   var area = me.lookup('area_combo').getValue();
		   var area_id = null;
		   switch(area){
			   case 'turismo':
			   case 'tourism':
					area_id = 1;
					break;
				case 'societa':
				case 'society':
					area_id = 2;
					break;
				case 'sicurezza':
				case 'security':
					area_id = 3;
					break;
				case 'salute':
				case 'health':
					area_id = 4;
					break;
				case 'mobilita':
				case 'mobility':
					area_id = 5;
					break;
				case 'amicibici':
				case 'bikefriends':
					area_id = 6;
					break;
		   }
		   searchfield.setLabel(' ');
		   searchfield.setLabelCls('x-fa fa-spinner fa-fw fa-spin animated-spinning-icon blueIcon');
		   Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getPoi.php',
			   params: {
				   poi: searchfield.getValue(),
				   area_id: area_id 
			   },
			   success: function(response){				
					searchfield.setLabel(null);
					//if(response.data.length > 0){
						if(response.data.length > 0){
							me.lookup('localizationDataview').getStore().loadData(response.data); 
						}else{
							Ext.Msg.alert('Attenzione','Nessun risultato');
						}				
			   },
			   failure: function(response){
					searchfield.setLabel(null);
			}});
	   }));
	},
		
	setarea: function(area){
		var me = this;
		if(area){
			me.lookup('area_combo').setValue(area);
		}else{
			me.lookup('area_combo').setValue(null);
		}
	},
	onLangChange: function(lang){
		var me = this;
		var lang = localStorage.getItem('defLang');
		me.lookup('locFieldset').setTitle(Ext.decode(localStorage.getItem('objLocalization')).localizationFieldTitle);
		me.lookup('locButton').setText(Ext.decode(localStorage.getItem('objLocalization')).localizationFieldButton);
		 if(lang == 'it'){
			me.lookup('localizationDataview').setEmptyText('<p>Nessun punto di interesse</p>');
		}else{
			me.lookup('localizationDataview').setEmptyText('<p>No points of interest searched</p>');
		}
		
		
	},
	loadTitles: function(){
		var me = this;
		me.lookup('locFieldset').setTitle(Ext.decode(localStorage.getItem('objLocalization')).localizationFieldTitle);
		me.lookup('locButton').setText(Ext.decode(localStorage.getItem('objLocalization')).localizationFieldButton);
	},
	onAreaChange: function(){
		var me = this;
		me.lookup('searched_place').setValue(null);
	},
	startPOISearch: function(btn,e,eOpts){
		var me = this;
		if(me.lookup('area_combo').getValue()){
			if(me.lookup('searched_place').getValue().length >= 2){
				me.getDelayedPoiCall().delay(0);
			}else{
				Ext.Msg.alert('Attenzione','Digitare almeno 2 caratteri!');
			}
		}else{
			Ext.Msg.alert('Attenzione','Nessuna area inserita');
		}
			
	},
	onPoiSelected: function(dataview,loc,eOpts){
		var me = this;
		

	   
		var record = loc.record;
		var feat = record.data;

	//	dataview.getStore().removeAll();

		Ext.fireEvent('openPoiTab',feat);
	},
	clearViewOnSearchfieldReset: function(searchfield,e,eOpts){
		var me = this;
		if(searchfield.getValue().length == 0){
			me.getDelayedPoiCall().cancel();
			me.lookup('localizationDataview').getStore().removeAll();
		}
		
	},
	clearViewOnSearchfieldFocus: function(searchfield,e,eOpts){
		var me = this;
		me.getDelayedPoiCall().cancel();
		me.lookup('localizationDataview').getStore().removeAll();
	},
	
});
