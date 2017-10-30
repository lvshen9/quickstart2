function getGrpInfoBySn()
{	  
	
  var group = $('#cond_GROUP_SERIAL_NUMBER').val();
	if (group == ""){
		$.showWarnMessage('请输入正确的集团服务号码！','集团服务号码信息不能为空');
		return false;
	}else{
		//$.ajax.setup({async:false});	
		$.beginPageLoading();
		var refreshPart = $("#SN_REFRESH_PART").val();
    	if(refreshPart==null || refreshPart=='' )
    	refreshPart = 'GroupInfoPart,GroupUserPart,CompProductInfoPart';	
		$.ajax.submit(this,'getGroupBySN','&cond_GROUP_SERIAL_NUMBER='+group,refreshPart,
		function(data){
    		$.endPageLoading();
    		var afterAction = $("#SN_AFTER_ACTION").val();
		    if (afterAction != '') {
		        eval(""+afterAction);
		    }else{
		    	var resultcode = data.get('X_RESULTCODE','0');
	    		if(resultcode!='0'){
		    	
	    			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
	    		}
    		}
		},
		function(error_code,error_info,derror){
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
	 // $.ajax.setup({async:true});
	}
}
