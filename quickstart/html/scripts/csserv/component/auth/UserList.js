/**
 * 设置用户信息
 */
var setUserInfo = function() {
	var userObj = $("input:checked");
	
	if(userObj && userObj.length != 1) {
		alert("请选择一个用户！");
		return ;
	}
	
	$.setReturnValue({"SELECTED_AUTH_USER":userObj.val()}, true);
};

$(document).ready(function(){
	$("#cancelBtn").bind("click", function(){
		$.closePopupPage(true,null,null,null,null,true);
	});
	
	$("#submitBtn").bind("click", setUserInfo);
	
	$("#userList tr").bind("click", function(e){
		$("input[type='radio']").attr("checked", false);
		$(this).find("input[type='radio']").attr("checked", true);
	});
});
