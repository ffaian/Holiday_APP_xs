var select_all_sites = ( "select STORE, POS_DEPT, POS_TXT, BANNER, BANNER_TXT " +
// "you can use single \' or double \"quote" +
"from _SYS_BIC.\"ZRT_CONTROL_TABLES.SAP_HANA_Development/CV_POS_MD\"" +
  " ORDER BY STORE, POS_DEPT, BANNER");

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
		while (resultSet.next()) {
			datasites = {};
			datasites.STORE = resultSet.getString(1);			
			datasites.POS_DEPT = resultSet.getString(2);
			datasites.POS_TXT = resultSet.getString(3);
			datasites.BANNER = resultSet.getString(4);
			datasites.BANNER_TXT = resultSet.getText(5);
			
			datasitesList.push(datasites);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Pos_depts : datasitesList
	});
	return str;
}
function doGet() {
	try {
		$.response.contentType = "application/json; charset=UTF-8";
		$.response.setBody(getData());
	} catch (err) {
		$.response.contentType = "text/plain";
		$.response
				.setBody("Error while executing query: [" + err.message + "]");
		$.response.returnCode = 200;
	}
}
doGet();
