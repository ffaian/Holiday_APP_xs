var select_pos_departments = ( "select DISTINCT POS_DEPT " +
// "you can use single \' or double \"quote" +
"from _SYS_BIC.\"ZRT_CONTROL_TABLES.SAP_HANA_Development/CV_POS_MD\"" +
  "WHERE length(trim(POS_DEPT)) > 0 ORDER BY POS_DEPT");

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
		statement = connection.prepareStatement(select_pos_departments);
		resultSet = statement.executeQuery();
		var dataRow;
		while (resultSet.next()) {
			dataRow = {};
			dataRow.POS_DEPT = resultSet.getString(1);
			dataList.push(dataRow);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Pos_Departments : dataList
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
