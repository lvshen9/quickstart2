function changeQueryType() {
	   
	   var choose=$('#QueryType').val();
       if (choose=="0") //按集团编码
       {
          $("#labGroupId").html("集团客户编码：");
          $("#labGroupId").attr("class","e_required");
          $("#bGroupId").css("display","");
          $("#bPstType").css("display","none");
          $("#bPstNum").css("display","none");
       }
       else if (choose=="1") //按集团名称
       {
          $("#labGroupId").html("集团客户名称：");
          $("#labGroupId").attr("class","");
          $("#bGroupId").css("display","");
          $("#bPstType").css("display","none");
          $("#bPstNum").css("display","none");
       }
       else if (choose=="2") //按证件类型
       {
          $("#bGroupId").css("display","none");
          $("#bPstType").css("display","");
          $("#bPstNum").css("display","");
       }
       else if (choose=="3") //按集团服务号码
       {
          $("#labGroupId").html("集团服务号码：");
          $("#labGroupId").attr("class","e_required");
          $("#bGroupId").css("display","");
          $("#bPstType").css("display","none");
          $("#bPstNum").css("display","none");
       }
}

function queryCustInfos() {
	var choose=$('#QueryType').val();
	if (choose=="0"){
		var grpid = $('#cond_groupId').val();
		if(grpid==""){
			alert('集团客户编码不能为空！');
			return false;
		}
	}else if(choose=="2"){
		 	var pspttype = $('#cond_pstType').val();
			var psptnum = $('#cond_pstNum').val();
			if(pspttype==''){
					alert('证件类型不能为空！');
					return false;
			}
			if(psptnum==''){
					alert('证件号码不能为空！');
					return false;
			}
	}else if (choose=="3"){
		var grpid = $('#cond_groupId').val();
		if(grpid==""){
			alert('集团服务号码不能为空！');
			return false;
		}
	}
	
	$.beginPageLoading();
	$.ajax.submit('QueryCondPart,ActiveNav', 'queryGroupCusts', '', 'GroupCustPart', function(data){
		$.endPageLoading();
	},
	function(error_code,error_info,derror){
		$.endPageLoading();
		showDetailErrorInfo(error_code,error_info,derror);
    });
}