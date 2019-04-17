var select_all_Region = ("select ZZREGION, TXTSH " +
// "you can use single \' or double \"quote" +
"from _SYS_BIC.\"ZRT_CONTROL_TABLES.SAP_HANA_Development/CV_BW_REGION_MD\"" +
" ORDER BY ZZREGION");		

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
	var dataRegionList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_all_Region);
		resultSet = statement.executeQuery();
		var dataRegion;		
		while (resultSet.next()) {
			dataRegion = {};
			dataRegion.ZZREGION = resultSet.getString(1);
			dataRegion.REGION_TXT = resultSet.getText(2);
			dataRegionList.push(dataRegion);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		zzRegion : dataRegionList
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

