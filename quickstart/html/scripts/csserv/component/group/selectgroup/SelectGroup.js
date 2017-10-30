//HTTPHANDLER查询集团资料信息
function getGroupBaseInfoHttpHandler(params){
		$.beginPageLoading();
		var clazz=$("#SELECTGROUP_CLAZZ_NAME").val();
		if(clazz == null || clazz =='')
			clazz = 'com.ailk.csview.common.component.group.selectgroup.SelectGroupHttpHandler';
		
		var method = $("#SELECTGROUP_METHOD_NAME").val();
		if(method == null || method =='')
			method ="getGroupBaseInfo";	
  		Wade.httphandler.submit('',clazz,method,params,
    	function(data){
    		var resultcode = data.get('X_RESULTCODE','0');
	    	if(resultcode!='0'){
	    	
    			var aftererrorAction = $("#SELECTGROUP_AFTER_ERROR_ACTION").val();
			    if (aftererrorAction != '') {
			        eval(""+aftererrorAction);
			    }
    			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
    			
	    	}else{
	    	
		    	var afterAction = $("#SELECTGROUP_AFTER_ACTION").val();
			    if (afterAction != '') {
			        eval(""+afterAction);
			    }
	    	
	    	}
	    	$.endPageLoading();
    	},
		function(error_code,error_info,derror){
		
			var aftererrorAction = $("#SELECTGROUP_AFTER_ERROR_ACTION").val();
		    if (aftererrorAction != '') {
		        eval(""+aftererrorAction);
		    }
		    
			showDetailErrorInfo(error_code,error_info,derror);
			$.endPageLoading();
			
	    });
	    	
}

//LISTER查询集团资料
function getGroupBaseInfoLister(params){
		$.beginPageLoading();
		var refreshPart = $("#SELECTGROUP_REFRESH_PART").val();
		
		var method = $("#SELECTGROUP_LISTENER_NAME").val();
		if(method == null || method =='')
			method ="getGroupBaseInfo";	
			
		$.ajax.submit('', method, params, refreshPart, 		
    	function(data){
    		var resultcode = data.get('X_RESULTCODE','0');
	    	if(resultcode!='0'){
	    	
    			var aftererrorAction = $("#SELECTGROUP_AFTER_ERROR_ACTION").val();
			    if (aftererrorAction != '') {
			        eval(""+aftererrorAction);
			    }
    			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
    			
	    	}else{
	    	
		    	var afterAction = $("#SELECTGROUP_AFTER_ACTION").val();
			    if (afterAction != '') {
			        eval(""+afterAction);
			    }
	    	
	    	}
	    	$.endPageLoading();
    	},
		function(error_code,error_info,derror){
		
			var aftererrorAction = $("#SELECTGROUP_AFTER_ERROR_ACTION").val();
		    if (aftererrorAction != '') {
		        eval(""+aftererrorAction);
		    }
		    
			showDetailErrorInfo(error_code,error_info,derror);
			$.endPageLoading();
			
	    });
	    	
}

function getGroupBaseInfo(params){

	var method = $("#SELECTGROUP_LISTENER_NAME").val();
	if(method == null || method ==''){
		getGroupBaseInfoHttpHandler(params);
	}else{
		getGroupBaseInfoLister(params);
	}
	
}
//通过集团编码查询集团客户资料
function getGroupInfoByGrpId(){

	var group = $("#POP_cond_GROUP_ID").val();
	if (group == ""){
		$.showWarnMessage('请输入正确的集团编码！','集团编码信息不能为空');
		return false;
	}else{
	
	    var params = '&cond_GROUP_ID='+group;
        getGroupBaseInfo(params);
	
	}
}

//通过集团客户标识查询集团客户资料
function getGroupInfoByCustId(){

	
	var group = $("#POP_cond_GRPCUST_ID").val();
	$("#POP_cond_GRPCUST_ID").val('');	
	if (group == ""){
		alert ('请输入正确的集团编码！');
		return false;
	}else{
       	var params = '&cond_CUST_ID='+group;
        getGroupBaseInfo(params);
    }

}
//search组件选中下拉数据回车后触发的方法
function groupSearchOptionEnterAction(c,b){

	var cust_id = $("#Ul_Search_GROUP_ID_NAME li[class=focus]").attr("CUST_ID");
	var group_id  = $("#Ul_Search_GROUP_ID_NAME li[class=focus]").attr("GROUP_ID");
	$.Search.get('GROUP_ID_NAME').setSearchReturnValue();
	b.preventDefault();
	b.stopPropagation();
	$('#POP_cond_GROUP_ID').val(group_id);
	var params = '&cond_CUST_ID='+cust_id;
    getGroupBaseInfo(params); 	
}
//search组件选中下拉数据鼠标点击后触发的方法
function groupSearchOptionKeyAction(c){

	var cust_id = $("#Ul_Search_GROUP_ID_NAME li[class=focus]").attr("CUST_ID");
	var group_id  = $("#Ul_Search_GROUP_ID_NAME li[class=focus]").attr("GROUP_ID");
	$.Search.get('GROUP_ID_NAME').setSearchReturnValue(c); 
	$('#POP_cond_GROUP_ID').val(group_id);  
	var params = '&cond_CUST_ID='+cust_id;
    getGroupBaseInfo(params);
    
}

//search组件直接在文本框中回车后触发的方法
function groupSearchEnterAction(data){
	var groupidname = $.trim($('#GROUP_ID_NAME').val());
	var groupId = groupidname.split('|')[0];
    $('#POP_cond_GROUP_ID').val(groupId);
	getGroupInfoByGrpId();
}