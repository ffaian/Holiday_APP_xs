sap.ui.define(
		[ "sap/ui/core/mvc/Controller", 
			"sap/ui/model/Filter"], function(Controller, Filter) {
	"use strict";

	return Controller.extend(
			"sapui5.controltables.commons.controller.SiteDialog", {

				onInit: function() {
					
					
			    },
				
				OnHandleValueHelp : function(oEvent) {
					var sInputValue = oEvent.getSource().getValue();					
					this.inputId = oEvent.getSource().getId();
					
					// create value help dialog
					if (!this._valueHelpDialog) {
						this._valueHelpDialog = sap.ui.xmlfragment(
						"sapui5.libraryApp.commons.SiteDialog",
						oApp.getCurrentPage().getController().oSiteDialogController);

						this.addDependent(this._valueHelpDialog);
					}

					// create a filter for the binding
					this._valueHelpDialog.getBinding("items").filter(
							[ new Filter("PLANT",
									sap.ui.model.FilterOperator.Contains,
									sInputValue) ]);

					// open value help dialog filtered by the input value
					this._valueHelpDialog.open(sInputValue);

				},

				suggestionItemSelected: function (evt) {
					var oItem = evt.getParameter('selectedItem'),					
//						oText = this.byId('selectedKey'),
						oText = sap.ui.getCore().byId("siteInput"),
						sKey = oItem ? oItem.getKey() : '';

					oText.setValue(sKey);
				},				

				OnHandleValueHelpSearch : function(evt) {
					var sValue = evt.getParameter("value");
					var oFilter = new Filter("PLANT",
							sap.ui.model.FilterOperator.Contains, sValue);
					evt.getSource().getBinding("items").filter([ oFilter ]);
				},

				OnHandleValueHelpClose : function(evt) {
					var oSelectedItem = evt.getParameter("selectedItem");
					if (oSelectedItem) {
						var siteInput = sap.ui.getCore().byId("siteInput"),
						// oText = this.byId('selectedKey'),
						sTitle = oSelectedItem.getTitle();

						// siteInput.setSelectedKey(sDescription);
						siteInput.setValue(sTitle);
						// oText.setText(sDescription);
					}
					evt.getSource().getBinding("items").filter([]);
				},

				OnHandleLiveValueHelpSearch : function(evt) {
					if (evt.getParameters().refreshButtonPressed) {
					} else {	
						var tpmla = evt.getParameter("value");
						var filters = new Array();
						var oFilter = new sap.ui.model.Filter("PLANT",
								sap.ui.model.FilterOperator.Contains,tpmla);						
						evt.getSource().getBinding("items").filter([ oFilter ]);
					}					

				},
				
				

			});

});
