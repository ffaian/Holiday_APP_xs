sap.ui.define(
		[ "sap/ui/core/mvc/Controller", "sap/ui/model/json/JSONModel"], function(Controller,JSONModel) {
	"use strict";

	return Controller.extend(
			"sapui5.controltables.commons.controller.FileUploadLogDialog", {

				onInit: function() {		
					
					
			    },
				
				OnShowLog : function(oLogData) {	
					

					// validation of the header
		            // JSON dummy data
		            var oDataVal = {
		            		"FileLogErrors" : 
		            			[
		            				{
		            					ERROR   : new String(),
		            					LINE  : new String(),
		            					LOG  : new String(),
		            				}
		            			]
		            };
		            
		            this.oModelVal = new JSONModel(oDataVal);
		            this.oModelVal.getData().FileLogErrors.pop();
		            this.oModelVal.getData().FileLogErrors = oLogData;		
		            this.oModelVal.refresh(true);
					
					
					// create value help dialog
					if (!this._errorlogDialog) {
						this._errorlogDialog = sap.ui.xmlfragment(
						"sapui5.libraryApp.commons.FileUploadLogDialog",
						oApp.getCurrentPage().getController().oFileUploadLogDialogController);
						
						
					}

					// getting sap.m.table from fragment by the ID						
					var oTable = sap.ui.getCore().byId("Uploadtable");						
					oTable.setModel(this.oModelVal);	
					
					oTable.bindAggregation("items", {
						path : "/FileLogErrors",
						template : new sap.m.ColumnListItem({
							cells: [ new sap.m.Text({
								text: "{ERROR}"
							}), new sap.m.Text({
								text: "{LINE}"
							}), new sap.m.Text({
								text: "{LOG}"
							})]
						})
					});					
					
					// open value help dialog filtered by the input value
					this._errorlogDialog.open();

				},
				
				OnClose : function(event) {
					
					// open value help dialog filtered by the input value
					this._errorlogDialog.close();				
					
				},
				

			});
	
});
