sap.ui.define(
		[ "sap/ui/core/mvc/Controller", 
			"sap/ui/model/Filter"], function(Controller, Filter ) {
	"use strict";

	return Controller.extend(
			"sapui5.controltables.commons.controller.BannerDialog", {

				onInit: function() {
					
					
			    },
				
				OnHandleValueHelp : function(oEvent) {
					var sInputValue = oEvent.getSource().getValue();					
					this.inputId = oEvent.getSource().getId();
					
					// Site as filter
					var siteInput = sap.ui.getCore().byId("siteInput");
					var sSitefilter = siteInput.getValue();
					
					// POS Depart
					var sPOS_Deptfilter = sap.ui.getCore().byId("POSInput").getValue();
					
//					// validate site input
					var oSITE_POS_Texts = oApp.getCurrentPage().getController().onSITE_POS_Text(sSitefilter,sPOS_Deptfilter);
					
					if ((oSITE_POS_Texts.SITE_TXT.length === 0)||(oSITE_POS_Texts.POS_TXT.length === 0)) {
						sap.m.MessageToast.show("Enter a valid Site/Banner # first...");
					} else {					
						// create value help dialog
						if (!this._valueHelpDialog) {
							this._valueHelpDialog = sap.ui.xmlfragment(
									"sapui5.libraryApp.commons.BannerDialog",								
									oApp.getCurrentPage().getController().oBannerDialogController);

							this.addDependent(this._valueHelpDialog);
						}

						// create a filter for the binding
						this._valueHelpDialog.getBinding("items").filter(
								[ new Filter("STORE",
										sap.ui.model.FilterOperator.EQ,
										sSitefilter),
										new Filter("POS_DEPT",
												sap.ui.model.FilterOperator.EQ,
												sPOS_Deptfilter),
										new Filter("BANNER",
												sap.ui.model.FilterOperator.Contains,
												sInputValue) ]);

						// open value help dialog filtered by the input value
						this._valueHelpDialog.open(sInputValue);					

					}
				},

				suggestionItemSelected: function (evt) {
					var oItem = evt.getParameter('selectedItem'),					
//						oText = this.byId('selectedKey'),
						oText = sap.ui.getCore().byId("siteInput"),
						sKey = oItem ? oItem.getKey() : '';

					oText.setValue(sKey);
				},				

				OnHandleValueHelpSearch : function(evt) {
					// Site as filter
					var ssiteFilter = sap.ui.getCore().byId("siteInput").getValue();
					var sPOSFilter = sap.ui.getCore().byId("POSInput").getValue();

					var sValue = evt.getParameter("value");
					var oFilter = [	new sap.ui.model.Filter("STORE",
							    sap.ui.model.FilterOperator.EQ,
							    ssiteFilter),
							    new sap.ui.model.Filter("POS_DEPT",
									    sap.ui.model.FilterOperator.EQ,
									    sPOSFilter),							    
							    new sap.ui.model.Filter("BANNER",
										sap.ui.model.FilterOperator.Contains,sValue) ];					
					evt.getSource().getBinding("items").filter(oFilter);
				},

				OnHandleValueHelpClose : function(evt) {
					var oSelectedItem = evt.getParameter("selectedItem");
					if (oSelectedItem) {
						var bannerInput = sap.ui.getCore().byId("BannerInput"),
						// oText = this.byId('selectedKey'),
						sTitle = oSelectedItem.getTitle();

						// siteInput.setSelectedKey(sDescription);
						bannerInput.setValue(sTitle);
					}
					evt.getSource().getBinding("items").filter([]);
				},

				OnHandleLiveValueHelpSearch : function(evt) {
					if (evt.getParameters().refreshButtonPressed) {
					} else {	
						// Site as filter
						var ssiteFilter = sap.ui.getCore().byId("siteInput").getValue();
						// POS Department
						var sPOSFilter = sap.ui.getCore().byId("POSInput").getValue();

						// POS_Depart
						var tpmla = evt.getParameter("value");
						var oFilter = [	new sap.ui.model.Filter("STORE",
								    sap.ui.model.FilterOperator.EQ,
								    ssiteFilter),
								    new sap.ui.model.Filter("POS_DEPT",
										    sap.ui.model.FilterOperator.EQ,
										    sPOSFilter),
								    new sap.ui.model.Filter("BANNER",
											sap.ui.model.FilterOperator.Contains,tpmla) ];

						evt.getSource().getBinding("items").filter(oFilter);						
						
					}					

				},
				
			});

});
