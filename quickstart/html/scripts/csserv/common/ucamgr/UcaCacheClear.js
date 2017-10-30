function queryUcaInfo()
{
	if(!$.validate.verifyField($("#cond_SERIAL_NUMBER")))
	{
		return false;
	}	 
	
	$.beginPageLoading();
	$.ajax.submit("queryForm","clear", "", "refreshtable", function(data){
		
		$.endPageLoading(); 
	},
	function(error_code,error_info,derror){
		$.endPageLoading();
		showDetailErrorInfo(error_code,error_info,derror);
    });
	
}
			
		