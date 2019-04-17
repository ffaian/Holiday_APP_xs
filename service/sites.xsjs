var select_all_sites = ( "select PLANT, TXTMD, REGION, ZZREGION " +
// "you can use single \' or double \"quote" +
//"from SAPBIW.\"/BI0/TPLANT\"" +
//  " ORDER BY PLANT");
"from _SYS_BIC.\"ZRT_CONTROL_TABLES.SAP_HANA_Development/CV_PLANT_MD\"" +
" ORDER BY PLANT");

function close(closables) {
	var closable;
	var i;
	for (i = 0; i < closables.length; i++) {
		closable = closables[i];
		if (closable) {
			closable.close();
		}
	}
}
function getData() {
	var datasitesList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;	
	try {
		statement = connection.prepareStatement(select_all_sites);
		resultSet = statement.executeQuery();
		var datasites;
		// add ALL sites option
		datasites = {};
		datasites.PLANT = "9999";
		datasites.TXTMD = "All Sites";
		datasitesList.push(datasites);
		while (resultSet.next()) {
			datasites = {};
			datasites.PLANT = resultSet.getString(1);
			datasites.TXTMD = resultSet.getString(2);
			datasites.REGION = resultSet.getString(3);
			datasites.SOBEYS_REGION = resultSet.getString(4);
			datasitesList.push(datasites);

		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Sites : datasitesList
	});
	return str;
}
function doGet() {
	try {
		$.response.contentType = "application/json";
		$.response.setBody(getData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();
