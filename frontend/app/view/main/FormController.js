
Ext.define('WebMappVenezia.view.main.FormController', {
    extend: 'Ext.app.ViewController',
    alias: 'controller.report',
	listen:{
		global: {
			langChange: 'onLangChange',
			loadSubmissionForm: 'loadSubmissionForm',
			positionClicked: 'positionClicked',
			setarea: 'setarea'
		}
	},
	config: {
		mapPanel: null,
		imageURI: null,
		fileObj: null
	},
	init: function(){
		var me = this; 
		me.setMapPanel(Ext.create('Ext.Panel',{
			floated: true,
			closable: false,
			closeAction: 'hide',
			height: '100%',
			width: '100%',
			tools:[{
			    iconCls: 'x-fa fa-times blackIcon',
			    handler:function(panel){
				    panel.close();
			    }
		    }],
			layout: 'fit',
			
			items:[{
				xtype: 'formmapview',
				flex: 1
			}]
		}));
	},
	positionClicked: function(latlng){
		var me = this;
		setTimeout(function(){
			me.lookup('reportx').setValue(latlng.lat.toFixed(4));
			me.lookup('reporty').setValue(latlng.lng.toFixed(4));
			me.getMapPanel().close();
		},1000);
		
	},
	loadSubmissionForm: function(){
		var me = this;
		//var map = Ext.getCmp('leafletmap').getController().getMap(); 
		me.lookup('area_combo').suspendEvents();
		me.getView().reset();
		me.lookup('area_combo').resumeEvents();
	},
	loadSubarea: function(selectfield,newValue,oldValue,eOpts){
		var me = this;
		
		
		me.lookup('subarea_combo').reset();
		me.lookup('subarea_combo').getStore().removeAll();
		
		var newValue = selectfield.getSelection();
		if(newValue){
			Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/getSubareas.php',
			   params: {
				   topic: localStorage.getItem('defLang') == 'it' ? newValue.get('value') : newValue.get('engvalue')
			   },
			   success: function(response){
				   var storeData = [];
				   Ext.Array.each(response.data,function(option){
					   storeData.push({
						   text: option,
						   value: option
					   });
				   });
				   
				   me.lookup('subarea_combo').getStore().loadData(storeData);
			   },
			   failure: function(response){
				//   Ext.Msg.alert('Errore','Errore del Server');
				alert(Ext.decode(localStorage.getItem('titles')).connectionErrorText);
			   }
			});
		}
		
	},
	openMapPanel: function(){
		var me = this;
		console.log(' ENTRO QUI');
		me.getMapPanel().show();
		//Ext.Msg.alert('Attenzione','Premere sulla mappa il luogo della segnalazione');
		alert(Ext.decode(localStorage.getItem('formFields')).reportInsertPositionMsg);
	},
	onLangChange: function(lang){
		var me = this;
		Ext.Object.each(me.getView().getFields(),function(field,fieldConf){
			fieldConf.setLabel(Ext.decode(localStorage.getItem('formFields'))[fieldConf.labelName]);
		});
		me.lookup('submitBtn').setText(Ext.decode(localStorage.getItem('formFields')).submitBtn);
		me.lookup('positionFieldset').setTitle(Ext.decode(localStorage.getItem('formFields')).positionFieldset);
		//me.lookup('currentx').setLabel('Lat');
		me.lookup('reportx').setLabel('Lat');
		me.lookup('reporty').setLabel('Lon');
	//	me.lookup('currenty').setLabel('Lon');
		var options = [];
		Ext.Array.each(me.lookup('area_combo').getOptions(),function(comboOption){
			options.push({
				text: Ext.decode(localStorage.getItem('formFields'))[comboOption.textname],
				value: comboOption.value,
				textname: comboOption.textname,
				engvalue: comboOption.engvalue
			});
		});
		me.lookup('area_combo').setOptions(options);
	},
	cordovaImageUpload: function(btn){
		var img_uri = '';
		var me = this;
		if(navigator.camera){
			navigator.camera.cleanup();
			navigator.camera.getPicture(function(imageData){
				me.setImageURI(imageData);
				me.lookup('imageBtn').setBadgeText('1');
				me.lookup('imageGalleryBtn').setBadgeText(null);
			},function(error){
				me.setImageURI(null);
				me.lookup('imageBtn').setBadgeText(null);
			},{
				sourceType: Camera.PictureSourceType.CAMERA
			});
		}	
	},
	cordovaGalleryImageUpload: function(btn){
		var img_uri = '';
		var me = this;
		if(navigator.camera){
			navigator.camera.cleanup();
			navigator.camera.getPicture(function(imageData){
				me.setImageURI(imageData);
				me.lookup('imageGalleryBtn').setBadgeText('1');
				me.lookup('imageBtn').setBadgeText(null);
			},function(error){
				me.setImageURI(null);
				me.lookup('imageGalleryBtn').setBadgeText(null);
			},{
				sourceType: Camera.PictureSourceType.PHOTOLIBRARY
			});
		}	
	},
	submitReport: function(btn){
		var me = this;
		var reportForm = me.getView();
		var values = reportForm.getValues();
		var valid = true;
		Ext.Object.each(values,function(key,value,field){
			if(key != 'current_x' && key != 'current_y'){
				if(value == null || value == ""){
					 valid = false;
				}
			}		
		});
		if(!valid){
			alert(Ext.decode(localStorage.getItem('formFields')).reportMissingFieldsMsg);
			 return;
		}	
		if(me.getImageURI()){
			window.resolveLocalFileSystemURL(me.getImageURI(),function(fileEntry){
			fileEntry.file(function(file){
				var reader = new FileReader();
				reader.onloadend = function(){
					var blob = new Blob([reader.result],{type: file.type});
					blob.lastModifiedData = new Date();
					blob.name = file.name;
					var xhr = new XMLHttpRequest();
					var fd = new FormData();
					fd.append("serverTimeDiff", 0);
					xhr.open("POST", 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/submitReport.php', true);
					fd.append('values', Ext.encode(values));
					fd.append('file', blob ,blob.name);
					//xhr.setRequestHeader("Content-Type","multipart/form-data");
					xhr.setRequestHeader("serverTimeDiff", 0);
					xhr.onreadystatechange = function () {
						if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 201)) {
							//handle the answer, in order to detect any server side error
							if (Ext.decode(xhr.responseText).success) {
								Ext.Msg.alert('Attenzione','Segnalazione inviata correttamente!');
								me.lookup('area_combo').suspendEvents();
								me.getView().reset();
								me.lookup('area_combo').resumeEvents();
								me.lookup('imageBtn').setBadgeText(null);
								me.lookup('imageGalleryBtn').setBadgeText(null);
							} else {
								Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
							}
						} else if (xhr.readyState == 4 && xhr.status == 404) {
							Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
						}
					};
					// Initiate a multipart/form-data upload
					xhr.send(fd);
				}
				reader.readAsArrayBuffer(file);	
			});
			me.setImageURI(null);
			me.lookup('imageBtn').setBadgeText(null);
			navigator.camera.cleanup();
		});
		}else{
			Ext.data.JsonP.request({
			   url: 'https://webgis.cittametropolitana.ve.it/appvenezia/phpapp/submitReportNoAttach.php',
			   params: {
				   values: Ext.encode(values)
			   },
			   success: function(response){				
					if(response.data){
						Ext.Msg.alert('Attezione','Segnalazione inviata correttamente!');
					}else{
						Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);
					}
					me.lookup('area_combo').suspendEvents();
					me.getView().reset();
					me.lookup('area_combo').resumeEvents();
					me.lookup('imageBtn').setBadgeText(null);
					me.lookup('imageGalleryBtn').setBadgeText(null);
			   },
			   failure: function(response){
					Ext.Msg.alert(Ext.decode(localStorage.getItem('titles')).connectionErrorTitle,Ext.decode(localStorage.getItem('titles')).connectionErrorText);;
			   }
			}); 
		}
	},
	setarea: function(area){
		var me = this;
		if(area){
			me.lookup('area_combo').setValue(area);
		}else{
			me.lookup('area_combo').suspendEvents();
			me.lookup('area_combo').setValue(null);
			me.lookup('area_combo').resumeEvents();
		}
	},
  
});
