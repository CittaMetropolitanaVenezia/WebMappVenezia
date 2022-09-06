Ext.define('WebMappVenezia.view.main.LocalizationTool', {
    extend: 'Ext.Panel',
    xtype: 'localizationTool',
	controller: 'localizationtool',
	flex: 1,
	layout:'vbox',
	items:[{
		xtype: 'fieldset',
		reference: 'locFieldset',
		flex: 1,
		items:[{
		xtype: 'selectfield',
		//flex: 1,
		name: 'area_combo',
		reference: 'area_combo',
		autoSelect: false,
		forceSelection: true,
		defaultPhonePickerConfig: {
			//modal: false,
			doneButton: {
				iconCls: 'x-fa fa-check-circle',
				text: ''
			},
			cancelButton: {
				iconCls: 'x-fa fa-times-circle',
				text: ''
			}
		},

		labelName: 'area',
		listeners:{
			painted: function(fieldDom,eOpts){
				var field = fieldDom;
				field.setLabel(Ext.decode(localStorage.getItem('formFields'))[field.labelName]);
				
				var oldOptions = [{
					//text: 'Amici della Bici',
					value: 'amicibici',
					engvalue: 'bikefriends',
					textname: 'bikeArea'
				},{
					//text: 'Mobilità',
					value: 'mobilita',
					engvalue: 'mobility',
					textname: 'mobilityArea'
				},{
					//text: 'Salute e Ambiente',
					value: 'salute',
					engvalue: 'health',
					textname: 'healthArea'
				},{
					value: 'sicurezza',
					engvalue: 'security',
					textname: 'securityArea'
				},{
					//text: 'Società Civile',
					value: 'societa',
					engvalue: 'life',
					textname: 'societyArea'
				},{
					//text: 'Turismo',
					value: 'turismo',
					engvalue: 'tourism',
					textname: 'tourismArea'
				}];
				
				var options = [];
				
				Ext.Array.each(oldOptions,function(comboOption){
					options.push({
						text: Ext.decode(localStorage.getItem('formFields'))[comboOption.textname],
						value: comboOption.value,
						textname: comboOption.textname,
						engvalue: comboOption.engvalue
					});
				});
				field.setOptions(options);
			},
			change: 'onAreaChange'
		}
	},{
			xtype: 'searchfield',
			//flex: 1,
			labelAlign: 'right',
			name: 'searched_place',
			reference: 'searched_place',
			listeners:{
				change: 'clearViewOnSearchfieldReset',
				focus: 'clearViewOnSearchfieldFocus'
			}
		},{
			xtype: 'button',
			reference: 'locButton',
			//flex: 1,
			handler: 'startPOISearch'
		},{
		   xtype: 'dataview',
		   title: 'Risultati',
		   id: 'locdataview',
		   deferEmptyText: false,
		   scrollable: 'y',
		   flex: 1,
		   reference: 'localizationDataview',
		   cls: 'dataview-basic-address',
		   itemTpl: '<div class="address">{descr_2}</div>',
		   emptyText: '<p>Nessun punto di interesse</p>',
		   store: {
				fields: ['descr_2', 'latLng']
		   },
		   listeners:{
			   childtap: 'onPoiSelected',			   
			   painted: function(dvEl){
				   var lang = localStorage.getItem('defLang');
				   if(lang == 'it'){
					   dvEl.setEmptyText('<p>Nessun punto di interesse</p>');
				   }else{
					   dvEl.setEmptyText('<p>No points of interest searched</p>');
				   }
			   },
		   }
		}]		
	}/*,
	{
		xtype: 'localizationmapview',
		flex: 1
	}*/],
	listeners: {
		painted: 'loadTitles'
	}
});
