sap.ui.jsview("sapui5.controltables.holidays.view.Master", {

	getControllerName : function() {

		return "sapui5.controltables.holidays.controller.Master";
	},

	createContent : function(oController) {

		// searching combobox
		var oSearch = [ {
			"KEY" : "1",
			"TXT" : "Date"
		}, {
			"KEY" : "2",
			"TXT" : "Province #"
		}, {
			"KEY" : "3",
			"TXT" : "Holiday #"
		},

		];
		var oModelSearch = new sap.ui.model.json.JSONModel();
		oModelSearch.setData(oSearch);

		oSearchCombo = new sap.m.Select("mySearchCombo", {
			change : oController.onListPress,
		});
		oSearchCombo.setModel(oModelSearch); // lookup_tables
		oSearchCombo.bindAggregation("items", {
			path : "/",
			template : new sap.ui.core.ListItem({
				key : "{KEY}",
				text : "{TXT}",
			}),
		});

		var aColumns = [ new sap.m.Column({
			header : new sap.m.Text({
				text : "Date"
			})
		}), new sap.m.Column({
			header : new sap.m.Text({
				text : "Province"
			})
		}), new sap.m.Column({
			header : new sap.m.Text({
				text : "Holiday"
			})
		}), ];

		// Columns
		var oTemplate = new sap.m.ColumnListItem({
			press : [ oController.onListPress, oController ],
			cells : [ new sap.m.ObjectIdentifier({
				text : {
					path : "DATE",
					// formatter : oController.formatter.formatODataDate,
					type : 'sap.ui.model.odata.type.DateTime',
					constraints : {
						displayFormat : 'Date'
					}
				}
			}), new sap.m.ObjectIdentifier({
				text : {
					path : "PROVINCE",
					formatter : oController.formatter.formatProvince,
				}
			}), new sap.m.ObjectIdentifier({
				text : {
					path : "HOLIDAY_ID",
					formatter : oController.formatter.formatHoliday,
				}
			}), ]
		});

		// Table Toolbar
		var oToolBar = new sap.m.Toolbar({
			content : [
					new sap.m.Button({
						text : "Create",
						icon : "sap-icon://add",
						type : sap.m.ButtonType.Transparent,
						press : function() {
							oController.openCreateDialog(oController);
						},
					}),
					new sap.m.Button({
						type : sap.m.ButtonType.Transparent,
						text : "Edit",
						icon : "sap-icon://edit",
						press : function() {
							// it give the complete
							// context data assigned
							// to row
							var oContexts = sap.ui.getCore().byId("mytable")
									.getSelectedContexts();
							if (oContexts.length === 0) {
								sap.m.MessageToast.show("Please select a row")
							} else {
								var oSelectItem = oTable.getSelectedItem();
								var oIndex = oTable.indexOfItem(oSelectItem);
								oController.openUpdateDialog(oController,
										oIndex);
							}

						},
					}),
					new sap.m.Button({
						type : sap.m.ButtonType.Transparent,
						text : "Delete",
						icon : "sap-icon://delete",
						press : function() {
							var oContexts = sap.ui.getCore().byId("mytable")
									.getSelectedContexts();
							if (oContexts.length === 0) {
								sap.m.MessageToast.show("Please select a row")
							} else {
								var oSelectItem = oTable.getSelectedItem();
								var oIndex = oTable.indexOfItem(oSelectItem);
								oController.openDeleteDialog(oIndex);
							}

						},
					}), new sap.m.ToolbarSpacer(), new sap.m.Label({
						text : "Searching by:"
					}), oSearchCombo, new sap.m.Label({
						text : "",
					}), new sap.m.SearchField({
						placeholder : "Search",
						width : "300px",
						showRefreshButton : true,
						tooltip : "Search for a Date",
						liveChange : oController.onLiveSearch,
						search : oController.onSearch,
					}), ]
		});

		var oTable = new sap.m.Table("mytable", {
			width : "auto",
			columns : aColumns,
			headerToolbar : oToolBar,
		});
		oTable.setMode(sap.m.ListMode.SingleSelectMaster);
		oTable.bindItems("/Holidays", oTemplate);
		var aSticky = [ "ColumnHeaders", "HeaderToolbar" ];
		oTable.setSticky(aSticky);

		var oPageMaster = new sap.m.Page("mainPage", {
			// title : "Weather Impact - this is the JS view",
			content : [ oTable ]
		});

		var oBar = new sap.m.Bar({
			contentLeft : [ new sap.m.Image({
				src : "/sap/hana/ide/common/images/favicon.ico",
				height : "45px"
			}) ],
			contentMiddle : [ new sap.m.Label({
				text : "CRUD: Holidays Calendar (POC using OData Services)",
				textAlign : "Left",
				design : "Bold"
			}) ],
			contentRight : [ new sap.m.Label("myUserLabel", {
				design : "Bold"
			}), new sap.m.Button({
				type : sap.m.ButtonType.Transparent,
				icon : "sap-icon://log",
				tooltip : "Logout",
				press : function() {
					oController.mySystemInfo.Systemlogout();
				},
			}), ]
		});

		oPageMaster.setCustomHeader(oBar);
		return oPageMaster;

	}
});
