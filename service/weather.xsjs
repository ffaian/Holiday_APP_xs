var select_all_weather = ("select WEATHER_ID, WEATHER_TXT from ZCONTROL_TABLES.ZRT_WEATHER_ID "
		+
		// "you can use single \' or double \"quote" +
		"WHERE LANGU = \'EN\' ORDER BY WEATHER_ID");

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
	var dataweatherList = [];
	var connection = $.db.getConnection();
	var statement = null;
	var resultSet = null;
	try {
		statement = connection.prepareStatement(select_all_weather);
		resultSet = statement.executeQuery();
		var dataweather;		
		while (resultSet.next()) {
			dataweather = {};
			dataweather.WEATHER_ID = resultSet.getString(1);
			dataweather.WEATHER_TXT = resultSet.getString(2);
			dataweatherList.push(dataweather);
		}
	} finally {
		close([ resultSet, statement, connection ]);
	}

	var str = JSON.stringify({
		Weather : dataweatherList
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
 * Test: http://serin.sobeys.com:8000/ZRT_CONTROL_TABLES/Model/weather.xsjs
 */