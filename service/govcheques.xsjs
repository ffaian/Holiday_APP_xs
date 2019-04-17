var select_all_GOVCHEQUE = ("select CHEQUE_TYPE_ID, CHEQUE_TYPE_TXT from ZCONTROL_TABLES.ZRT_GOV_CHEQUE_ID "
		+
		// "you can use single \' or double \"quote" +
		"WHERE LANGU = \'EN\' ORDER BY CHEQUE_TYPE_ID");

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
	var dataGOVCHEQUEList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_all_GOVCHEQUE);
		resultSet = statement.executeQuery();
		var dataGOVCHEQUE;		
		while (resultSet.next()) {
			dataGOVCHEQUE = {};
			dataGOVCHEQUE.CHEQUE_TYPE_ID = resultSet.getString(1);
			dataGOVCHEQUE.CHEQUE_TYPE_TXT = resultSet.getString(2);
			dataGOVCHEQUEList.push(dataGOVCHEQUE);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		GovCheques : dataGOVCHEQUEList
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

/*
 * Test: http://serin.sobeys.com:8000/ZRT_CONTROL_TABLES/Model/GOVCHEQUE.xsjs
 */