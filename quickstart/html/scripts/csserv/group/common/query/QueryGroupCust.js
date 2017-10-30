function selectGroupErrorAfterAction() 
{
	$("#cond_CUST_NAME").val("");
	$("#cond_GROUP_ID").val("");
	$("#cond_CUST_ID").val("");
}

//集团资料查询成功后调用的方法
function selectGroupAfterAction(data) 
{
//	var custName = data.get('CUST_NAME');
	var groupId = data.get('GROUP_ID');
	var custId = data.get('CUST_ID');
   //填充集团客户信息
	var param='&cond_GROUP_ID='+groupId+"&cond_CUST_ID="+custId;
	
	Wade.httphandler.submit('','com.ailk.csview.group.common.query.QueryGroupCust','checkGroupInfo',param,		
		function(data){
    		$.endPageLoading();
    		$('#cond_GROUP_ID').val(groupId);
			$('#cond_GROUP_CUST_ID').val(custId);
		},
		function(error_code,error_info,derror){
		
			$.endPageLoading();
			$('#cond_GROUP_ID').val("");
			$('#cond_GROUP_CUST_ID').val("");
			$('#GROUP_ID_NAME').val("");
			
			showDetailErrorInfo(error_code,error_info,derror);
	    });
}