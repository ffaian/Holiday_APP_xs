var call_db_procedure = ("call " +
// "you can use single \' or double \"quote" +
"ZCONTROL_TABLES.\"ZRT_CONTROL_TABLES.SAP_HANA_Development::create_POS_Departs\"");		

var conn = $.db.getConnection();  
var pstmt = conn.prepareStatement(call_db_procedure);

pstmt.execute();  
conn.commit();  
$.response.contentType = 'text/plain';
    $.response.setBody('Data Updated');
    $.response.status = 200;  
    
