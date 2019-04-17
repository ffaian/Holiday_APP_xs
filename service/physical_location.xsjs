var select_all_Physical_Location = ("select DISTINCT PHYSLOCNO, PLANT " +
// "you can use single \' or double \"quote" +
"from _SYS_BIC.\"ZRT_CONTROL_TABLES.SAP_HANA_Development/CVD_PHYSICAL_LOCATION\"" +
" ORDER BY PHYSLOCNO");		

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
	var dataList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;	
	try {
		statement = connection.prepareStatement(select_all_Physical_Location);
		resultSet = statement.executeQuery();
		var dataRow;
		while (resultSet.next()) {
			dataRow = {};
			dataRow.PHYSLOCNO = resultSet.getString(1);
			dataRow.SITE = resultSet.getString(2);
			dataList.push(dataRow);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Physical_Location : dataList
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