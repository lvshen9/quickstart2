function login(){
	if($.validate.verifyAll("login_div")){
		$.beginLoading("正在登录...");
		var password = $("#PASSWORD").val();
		if(password)$("#PASSWORD").val($.md5($.md5_3($.fnEncrypt(password,"00linkage"))));
		$.ajax.submit("login_div","login",null,null,login_callback,login_error);
	}
}


function login_callback(data){
	var sessionIdFromUrl = "true" == data.get('SESSION_ID_FROM_URL');
	var sessionId = data.get('SESSIONID');
	
	$.endLoading();
	$.redirect.toPage("Main",null,sessionIdFromUrl? "SESSIONID=" + sessionId : '');
}


function login_error(error_code,error_info){
	$.endLoading();
	if (error_code == "NOSAFE") {
		var login_info = $("#login_info");
		if (login_info && login_info.length) {
			error_info += "<a href='" + $("#login_info a[class=safe]").attr('href') + "' target='_blank' >下载安装</a>";
			$.showErrorMessage("权限拒绝",error_info);
		} else {
			$.showErrorMessage("权限拒绝",error_info);
		}
	} else {
		$.showErrorMessage("登录失败",error_info);
	}
}

$(function(){
	$("#login_div input[name]").bind("focus",function(){
		this.parentNode.className += " me_input-focus";
		$(this).select();
	});
	
	$("#login_div input[name]").bind("blur",function(){
		this.parentNode.className="me_input";
	});
	
	$("#login_div input[name]").bind("keydown",function(e){
		if(e.which==13){
			login();
			return false;
		}
	});
	$("#login_btn").bind("click",login);
});