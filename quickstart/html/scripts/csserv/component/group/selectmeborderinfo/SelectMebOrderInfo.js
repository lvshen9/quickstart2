function queryMemberInfoListener(listenerName) {
	var snvalue = $('#cond_SERIAL_NUMBER').val();
	if (snvalue == ""){
		$.showWarnMessage('请输入服务号码！','服务号码内容不能为空，请输入11位的手机号码！');
		return false;
	}else{
		$.beginPageLoading();		
		var refreshpart = $('#SELECTMEMBERINFO_REFRESH_PART').val();
		$.ajax.submit('',listenerName,'&cond_SERIAL_NUMBER='+snvalue+'&RELATION_CODE='+$("#mebRelationTypePart input:checked").val(),refreshpart,
		function(data){
    		  
    		var resultcode = data.get('X_RESULTCODE','0');
    		if(resultcode!='0'){
	    		$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
    		}
    		var succesMethod = $('#SELECTMEMBERINFO_SUCCESS_JSMETHOD').val();
    		if(succesMethod != ''){
    			eval(succesMethod); 
    		} 
    		$.endPageLoading();
		},
		function(error_code,error_info,detailError){
			var errorJsMethod = $('#SELECTMEMBERINFO_ERROR_JSMETHOD').val();
			if(errorJsMethod != ''){
				eval(errorJsMethod);
			}
		
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,detailError);
	    });
	}

}


function queryMemberInfoHttpHandler() {
	var snvalue = $('#cond_SERIAL_NUMBER').val();
	if (snvalue == ""){
		$.showWarnMessage('请输入服务号码！','服务号码内容不能为空，请输入11位的手机号码！');
		return false;
	}else{
		$.beginPageLoading();
		Wade.httphandler.submit('','com.ailk.csview.common.component.group.selectmeborderinfo.SelectMebOrderInfoHttpHandler','queryMemberInfo','&cond_SERIAL_NUMBER='+snvalue+'&RELATION_CODE='+$("#mebRelationTypePart input:checked").val(),
		function(data){
    		 
    		var resultcode = data.get('X_RESULTCODE','0');
    		if(resultcode!='0'){
	    		$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
    		}
    		var succesMethod = $('#SELECTMEMBERINFO_SUCCESS_JSMETHOD').val();
    		if(succesMethod != ''){
    			eval(succesMethod); 
    		}
    		
    		$.endPageLoading();
    	
		},
		function(error_code,error_info,detailError){
			var errorJsMethod = $('#SELECTMEMBERINFO_ERROR_JSMETHOD').val();
			if(errorJsMethod != ''){
				eval(errorJsMethod);
			}
		
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,detailError);
	    });
	}

}

function queryMemberInfo() {
	var listenerName = $("#SELECTMEMBERINFO_LISTENER_NAME").val();
	if(listenerName == null || listenerName ==''){
		queryMemberInfoHttpHandler();
	}else{
		queryMemberInfoListener(listenerName);
	}


}