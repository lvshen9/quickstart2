function checkCust(cust){
	$("#OPER_TYPE").val(cust[0].checked?"1":"0");
	return true;
}

$(function(){

	$("#bback").bind("click",function(){
		return true;
	});
	
	$("#bnext").bind("click",function(){
		if(getCheckedBoxNum("custId")<=0){
			if(confirm("由于未选择客户,点[确定]可以新增客户,确定要新增吗?")){
				return true;
			}
			return false;
		}else{
			return true;
		}
	});

	$("#custName").bind("focus",function(e){			
		var el=e.target;
		var pos=$(el).offset();
		var height=$(el).height();		

		$("#c_cal").css("left",pos.left + "px");
		$("#c_cal").css("top",(pos.top - height)+ "px");
		
	});
});