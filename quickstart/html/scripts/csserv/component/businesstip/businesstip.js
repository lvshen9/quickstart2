//ajax 解析java中返回的错误信息
function showErrorInfo(error_code,error_info){
	
	var err_desc = '服务调用异常：';
	if(error_code != null && error_code != ''){
		error_info =error_code+':'+error_info;
		if(error_info.length > 400){
		
			error_info ='<div class="c_scroll" style="height:320px">'+ error_info+'</div>';
		}
	}
		
	$.showWarnMessage(err_desc,error_info);
}

//ajax 解析java中返回的错误信息
function showDetailErrorInfo(error_code,error_info,errorDetail){
	var err_desc = '服务调用异常';
	if(error_code != null && error_code != ''){
		error_info ='错误编码:'+error_code+ '<br />' +'错误信息:'+error_info;
		
	}
	MessageBox.error(err_desc, err_desc, null, null, error_info, errorDetail);
	return false;
	
}
