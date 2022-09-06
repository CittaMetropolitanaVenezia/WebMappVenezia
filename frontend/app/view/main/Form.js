Ext.define('WebMappVenezia.view.main.Form', {
    extend: 'Ext.form.Panel',
    xtype: 'submissionview',
	controller: 'report',
	enableSubmissionForm: false,
	scrollable: 'y',
	//fieldSeparators: true,
	defaults: {
		margin: '5 0 5 0',
		labelAlign: 'left',
		//flex: 1,
		anchor: '100%',
	},
	flex: 1,
	items:[{	
		xtype: 'emailfield',
		//flex: 1,
		name: 'submission_email',
		clearable: true,
		//required: true,
		//label: Ext.decode(localStorage.getItem('formFields')).email,
		labelName: 'email',
		listeners:{
			painted: function(fieldDom,eOpts){
				var field = fieldDom;
				field.setLabel(Ext.decode(localStorage.getItem('formFields'))[field.labelName]);
			}
		}
	},{
		xtype: 'selectfield',
		//flex: 1,
		name: 'area_combo',
		reference: 'area_combo',
		autoSelect: false,
		displayField: 'text',
		valueField: 'value',
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
		//label: Ext.decode(localStorage.getItem('formFields')).area,
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
				},{
					value: 'traffico',
					engvalue: 'traffic',
					textname: 'trafficArea'
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
				console.log('OPTIONS',options);
				field.setOptions(options);
			},
			change: 'loadSubarea'
		}
	},{
		xtype: 'selectfield',
		autoSelect: false,
		name: 'subarea_combo',
		reference: 'subarea_combo',
		//label: Ext.decode(localStorage.getItem('formFields')).subarea,
		options:[],
		//flex: 1,
		labelName: 'subarea',
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
		listeners:{
			painted: function(fieldDom,eOpts){
				var field = fieldDom;
				field.setLabel(Ext.decode(localStorage.getItem('formFields'))[field.labelName]);
			}
		}
	},{
		xtype: 'textareafield',

		//label: Ext.decode(localStorage.getItem('formFields')).report,
		name: 'submission_desc',
		clearable: true,
		//flex: 1,
		labelName: 'report',
		listeners:{
			painted: function(fieldDom,eOpts){
				var field = fieldDom;
				field.setLabel(Ext.decode(localStorage.getItem('formFields'))[field.labelName]);
			}
		}
	},{
		xtype: 'fieldset',
		layout: 'hbox',
		style: 'border-bottom: 1px solid grey',
		items:[
			{
				xtype: 'button',
				iconCls: 'x-fa fa-image',
				reference: 'imageGalleryBtn',
				width: '50%',
				//flex: 1,
				handler: 'cordovaGalleryImageUpload'	
			},
			{
				xtype: 'button',
				iconCls: 'x-fa fa-camera',
				//flex: 1,
				reference: 'imageBtn',	
				width: '50%',
				handler: 'cordovaImageUpload'	
			}
		]
	},{
		xtype: 'fieldset',
		//title: Ext.decode(localStorage.getItem('formFields')).positionFieldset,
		reference: 'positionFieldset',
		layout: 'hbox',
		border: true,
		style: 'border-bottom: 1px solid grey',
		instructions: 'Premere il segnalino per inserire la posizione',
		//flex: 1,
		defaults: {
			labelAlign: 'left',
			readOnly: true,
			xtype: 'textfield'
		},
		items: [{
			xtype:'button',
			padding: '10 0 10 0',
			iconCls: 'x-fa fa-map-marker fa-xs',
			handler: 'openMapPanel',
			flex: 1
		},{
			name: 'report_x',
			labelAlign: 'top',
			reference: 'reportx',
			label: 'Lat',
			flex: 2
		},{
			name: 'report_y',
			labelAlign: 'top',
			reference:'reporty',
			label: 'Lon',
			flex: 2
		}],
		labelName: 'positionFieldset',
		listeners:{
			painted: function(fieldDom,eOpts){
				var field = fieldDom;
				field.setTitle(Ext.decode(localStorage.getItem('formFields'))[field.labelName]);
			}
		}
	},{
		xtype: 'button',
		reference: 'submitBtn',
		docked: 'bottom',
		handler: 'submitReport',
		//flex: 1,
		listeners:{
			painted: function(btnDom,eOpts){
				var btn = btnDom;
				btn.setText(Ext.decode(localStorage.getItem('formFields')).submitBtn);
			}
		}
	}]
});
