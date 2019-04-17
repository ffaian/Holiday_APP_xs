//sap.ui.define([ "sap/ui/core/UIComponent", "sap/ui/model/json/JSONModel" ],  " replacing JSON Model by OData Model
sap.ui.define([ "sap/ui/core/UIComponent", "sap/ui/model/odata/ODataModel" ],
// function(UIComponent, JSONModel) {
function(UIComponent, ODataModel) {
	"use strict";

	return UIComponent.extend("sapui5.controltables.holidays.Component", {

		metadata : {
			"rootView" : "sapui5.controltables.holidays.view.App",
			"config" : {
				// "serviceUrl" : "webapp/service/jsondata.xsjs"
				"serviceUrl" : "webapp/service/Holiday.xsodata"
			}
		},

		createContent : function() {

			// call the base component's createContent function
			var oRootView = UIComponent.prototype.createContent.apply(this,
					arguments);

			// var oModel = new JSONModel(
			var oModel = new ODataModel(
					this.getMetadata().getConfig().serviceUrl);
			this.setModel(oModel);

			// important to set the model on the component
			// and not on the sapui5 core!!!!
			this.setModel(oModel);

			oApp = oRootView.byId("app");
			return oRootView;
		}
	});
});