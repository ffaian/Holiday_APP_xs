sap.ui.define([
    "sap/ui/model/SimpleType"
    ], function (SimpleType) { 
	"use strict";
	return {

    /**
     * Data Type for phone numbers.
     *
     * @public
     */
		PhoneNumber : SimpleType.extend("sap.test.phoneNumber", {
			formatValue: function(oValue) {
				return "Phone number:" + oValue;
			},
			parseValue: function(oValue) {
//				return oValue;
				return (oApp.getCurrentPage().getController().types.mySite.prototype.formatValue(oValue));				
			},
			validateValue: function(oValue) {
				if (!/\+*\D*[0-9]*\-([2-9]\d{2})(\D*)([2-9]\d{2})(\D*)(\d{4})\D/.test(oValue)) {
					throw new sap.ui.model.ValidateException("phone number must follow the pattern +1 234-567-890!");
				}
			}
		}),
    
		myDate : SimpleType.extend("control.tables.myDate", {    	   
			formatValue: function(oValue) {
//        	   var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "MMM-dd-YYYY"});
//        	   var oDateRow = oDateFormat.format(new Date(oValue));
//        	   return oDateFormat.format(new Date(oValue));
        	   return oValue;
			},
			parseValue: function(oValue) {
//         	   	var oDateFormat = sap.ui.core.format.DateFormat.getInstance({pattern: "yyyy-MM-dd"});
//         	   	return oDateFormat.format(new Date(oValue));
            	return oValue;
            },
            validateValue: function(oValue) {
            	var sPattern = /(\d{4})-(\d{2})-(\d{2})/;
            	var sValid = oValue.match(sPattern);
            	
            	if (sValid === null) {            		
            		throw new sap.ui.model.ValidateException("enter a valid date");
            	}            	

            }
		}),    
		
		myDate_to : SimpleType.extend("control.tables.myDate_to", {    	   
			formatValue: function(oValue) {
        	   return oValue;
			},
			parseValue: function(oValue) {
            	return oValue;
            },
            validateValue: function(oValue) {
            	var sPattern = /(\d{4})-(\d{2})-(\d{2})/;
            	var sValid = oValue.match(sPattern);
            	
            	if (sValid === null) {            		
            		throw new sap.ui.model.ValidateException("enter a valid date");
            	}  else {
            		// check if to date is valid
            		var sDate_From = sap.ui.getCore().byId("myDateFrom").getValue();
            		if (sValid < sDate_From) {
            			throw new sap.ui.model.ValidateException("Date To invalid");
            		}
            	}          	

            }
		}),    		
		
		        
		mySite : SimpleType.extend("control.tables.mySite", {
			formatValue: function(oValue) {
				var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
					minIntegerDigits: 4,
				});
				var oNewNumber = oValue;
				if (typeof(oValue) !== 'undefined') {
					if	(oValue.length !== 0) {
						oNewNumber = oNumberFormat.format(oValue);
					} 
				}
				return oNewNumber;
			},
			
			parseValue: function(oValue) {
//				return oValue;
				return (oApp.getCurrentPage().getController().types.mySite.prototype.formatValue(oValue));				
			},
			
			validateValue: function(oValue) {
				if (isNaN(oValue)) {
					throw new sap.ui.model.ValidateException("not a valid Site #");            		   
				} else {
					var oData = oModel_sites.getData();
//					var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
//						minIntegerDigits: 4,
//					});
//					var oNewNumber = oNumberFormat.format(oValue);
					var oNewNumber = oValue;					
					var ositeInput = sap.ui.getCore().byId("siteInput");
					ositeInput.setValue(oNewNumber);
					var result = jQuery.grep(oData.Sites, function(e) {
						return e.PLANT === oNewNumber;
					});
					if (result && result.length !== 1) {
						throw new sap.ui.model.ValidateException("Site does not exist");
					} else {
						// verify if region is valid
						var oProvinceComboBox = sap.ui.getCore().byId("myProvinceCombo");
						if ( typeof(oProvinceComboBox) !== 'undefined' && oValue !== '9999') {
							var sRegion = oProvinceComboBox.getSelectedKey();
							if (sRegion !== '99') {
								if (result[0].REGION !== sRegion) {
//									throw new sap.ui.model.ValidateException("for the Site the province must be " + result[0].REGION);
									throw new sap.ui.model.ValidateException("Site not valid for the province");									
								}
							}
						}  else { // -------Sobeys Region validation start----------------
							var oSobeysRegion = sap.ui.getCore().byId("RegionSelect");
							if ( typeof(oSobeysRegion) !== 'undefined') {
								var sSobeysRegion = oSobeysRegion.getSelectedKey(); 
								if (result[0].SOBEYS_REGION !== sSobeysRegion) {
									throw new sap.ui.model.ValidateException("for the Site " + result[0].PLANT + " the Region must be " + result[0].SOBEYS_REGION);
								}
							}
						} // -------------Sobeys Region validation end------------ 
						}
					}						
				}
			}
		), 
          
		mySwich : SimpleType.extend("control.tables.mySwich", {
			formatValue: function(oValue) {
				if (oValue==="X") {
					return true;
				}
				else {
					return false;
				}
			},
               
			parseValue: function(oValue) {
				if (oValue) {
					return "X";
				}
				else {
					return "";
				}
			},
               
			validateValue: function(oValue) {
				// nothing :) No validation is needed
			}
		}),

		myPOS_Depart : SimpleType.extend("control.tables.myPOS_Depart", {
			formatValue: function(oValue) {
				var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
					minIntegerDigits: 3,
				});
				var oNewNumber = oValue;
				if (typeof(oValue) !== 'undefined') {
					if	(oValue.length !== 0) {
						oNewNumber = oNumberFormat.format(oValue);
					} 
				}
				return oNewNumber;
			},
			
			parseValue: function(oValue) {
				return (oApp.getCurrentPage().getController().types.myPOS_Depart.prototype.formatValue(oValue));				
			},
			
			validateValue: function(oValue) {
				if (isNaN(oValue)) {
					throw new sap.ui.model.ValidateException("not a valid POS Department #");            		   
				} else {
					var oData = oModel_sites_pos_md.getData();
					// get the site entered
					var vSiteValue = sap.ui.getCore().byId("siteInput").getValue();
					
					// check if POS Department is valid
					var vNewNumber = oValue;					
					var result = jQuery.grep(oData.Pos_depts, function(e) {
						return (e.STORE === vSiteValue && e.POS_DEPT === vNewNumber ) ;
					});
					if (result && result.length !== 1) {
						throw new sap.ui.model.ValidateException("POS Department is not valid");
					} 					
				}
			}
		}),
		
		myBanner : SimpleType.extend("control.tables.myBanner", {
			formatValue: function(oValue) {
				var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
					minIntegerDigits: 3,
				});
				var oNewNumber = oValue;
				if (typeof(oValue) !== 'undefined') {
					if	(oValue.length !== 0) {
						oNewNumber = oNumberFormat.format(oValue);
					} 
				}
				return oNewNumber;
			},
			
			parseValue: function(oValue) {
				return (oApp.getCurrentPage().getController().types.myBanner.prototype.formatValue(oValue));				
			},
			
			validateValue: function(oValue) {
				if (isNaN(oValue)) {
					throw new sap.ui.model.ValidateException("not a valid Banner #");            		   
				} else {
					var oData = oModel_sites_pos_md.getData();
					// get the site entered
					var vSiteValue = sap.ui.getCore().byId("siteInput").getValue();
					
					// get POS Department  entered
					var vPosValue = sap.ui.getCore().byId("POSInput").getValue();					
					
					// check if POS Department is valid
					var vNewNumber = oValue;					
					var result = jQuery.grep(oData.Pos_depts, function(e) {
						return (e.STORE === vSiteValue && e.POS_DEPT === vPosValue && e.BANNER === vNewNumber) ;
					});
					if (result && result.length !== 1) {
						throw new sap.ui.model.ValidateException("Banner is not valid");
					} 					
				}
			}
		}),		
	

		PhysicalLocation : SimpleType.extend("control.tables.PhysicalLocation", {
			formatValue: function(oValue) {
				var oNumberFormat = sap.ui.core.format.NumberFormat.getIntegerInstance({
					minIntegerDigits: 1,
				});
				var oNewNumber = oValue;
				if (typeof(oValue) !== 'undefined') {
					if	(oValue.length !== 0) {
						oNewNumber = oNumberFormat.format(oValue);
					} 
				}
				return oNewNumber;
			},
			
			parseValue: function(oValue) {
				return (oApp.getCurrentPage().getController().types.PhysicalLocation.prototype.formatValue(oValue));				
			},
			
			validateValue: function(oValue) {
				if (isNaN(oValue)) {
					throw new sap.ui.model.ValidateException("not a valid Physical Location #");            		   
				} else {
					var oModel_PhysicalLocation = new sap.ui.model.json.JSONModel();
					oModel_PhysicalLocation.loadData("../service/physical_location.xsjs", "GET", false);
					var oData = oModel_PhysicalLocation.getData();
					var oNewNumber = oValue;
					var oPhysicalLocationInput = sap.ui.getCore().byId("PhysicalLocationInput");
					oPhysicalLocationInput.setValue(oNewNumber);
					var result = jQuery.grep(oData.Physical_Location, function(e) {
						return e.PHYSLOCNO === oNewNumber;
					}); 
					if (result && result.length !== 1) {
						throw new sap.ui.model.ValidateException("Physical Location does not exist");
					}   else { // -------Site validation start----------------
							var ositeInput = sap.ui.getCore().byId("siteInput");
							if (typeof(ositeInput) !== 'undefined') {
								var sSiteInput = ositeInput.getValue();
								var result = jQuery.grep(oData.Physical_Location, function(e) {
									return (e.PHYSLOCNO === oNewNumber && e.SITE === sSiteInput);
									});
								if (result && result.length !== 1) {
									throw new sap.ui.model.ValidateException("Site " + sSiteInput + " is not a valid site for Physical Location " + e.PHYSLOCNO);
								} 
							}
						}  // -------------Site validation end------------
					}
				}							
			}), 
	};
});