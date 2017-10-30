function getMemInfo()
{
	
	var mebsn = $('#cond_SERIAL_NUMBER').val();
	if (mebsn == ""){
		$.showWarnMessage('请输入正确的服务号码！','服务号码信息不能为空');
		return false;
	}else{
		$.beginPageLoading();
		
  		Wade.httphandler.submit('','com.ailk.csview.common.component.group.selectmemberinfo.SelectMemberInfoHttpHandler','queryMemberInfo','&cond_SERIAL_NUMBER='+mebsn,
    	function(data){
    		var resultcode = data.get('X_RESULTCODE','0');
	    	if(resultcode!='0'){
	    	
    			var aftererrorAction = $("#SN_MEB_AFTER_ERROR_ACTION").val();
			    if (aftererrorAction != '') {
			        eval(""+aftererrorAction);
			    }
    			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
    			
	    	}else{
	    	
		    	var afterAction = $("#SN_MEB_AFTER_ACTION").val();
			    if (afterAction != '') {
			        eval(""+afterAction);
			    }
	    	
	    	}
	    	$.endPageLoading();
    	},
		function(error_code,error_info,derror){
		
			var aftererrorAction = $("#SN_MEB_AFTER_ERROR_ACTION").val();
		    if (aftererrorAction != '') {
		        eval(""+aftererrorAction);
		    }
		    $.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
			
			
	    });
	}
	
}
