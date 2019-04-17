var select_all_Division = ("select DIVISION_ID, DIVISION_TXT from ZCONTROL_TABLES.ZRT_DIVISION_ID "
		+
		// "you can use single \' or double \"quote" +
		"WHERE LANGU = \'EN\' ORDER BY DIVISION_ID");

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
	var dataDivisionList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_all_Division);
		resultSet = statement.executeQuery();
		var dataDivision;		
		while (resultSet.next()) {
			dataDivision = {};
			dataDivision.DIVISION_ID = resultSet.getString(1);
			dataDivision.DIVISION_TXT = resultSet.getString(2);
			dataDivisionList.push(dataDivision);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Division : dataDivisionList
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

