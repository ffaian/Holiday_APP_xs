var select_all_GROUP = ("select GROUP_ID, GROUP_TXT from ZCONTROL_TABLES.ZRT_GROUP_ID "
		+
		// "you can use single \' or double \"quote" +
		"WHERE LANGU = \'EN\' ORDER BY GROUP_ID");

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
	var dataGROUPList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_all_GROUP);
		resultSet = statement.executeQuery();
		var dataGROUP;		
		while (resultSet.next()) {
			dataGROUP = {};
			dataGROUP.GROUP_ID = resultSet.getString(1);
			dataGROUP.GROUP_TXT = resultSet.getString(2);
			dataGROUPList.push(dataGROUP);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Group : dataGROUPList
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

