(function($){
	$.extend({authCheck:{
		frequency : 60,  	//验证码发送平率，单位秒
		timer : null,		//验证码倒数计数器句柄
		//初始化方法
		init:function(){
			
			$("#authCheckForm").bind("keypress", function(e){
				if(e.keyCode==13 || e.keyCode==108){ 
					$("#auth_ok_btn").trigger("click"); 
					return false;
			    } 
				return true;
			}); 
			// 证件类型下拉框获取到焦点，敲击回车、能自动通过证件识别仪读取二代身份证信息
			$("#cond_PSPT_TYPE_CODE").bind("keypress", "2", function(e){
				if(e.data=="2"){
					if(e.keyCode==13 || e.keyCode==108){ 
						$("#PsptScanBtn").trigger("click"); 
						return false;
					}
					return true;
				}	
			});
			
			
			$("#sendVerifyCodeBtn").bind("click", $.authCheck.checkVerifyCode);
			
			// 双屏控件标识
			$("#cond_USER_PASSWD").bind("click", $.authCheck.onPasswdInputClick);
		},
		//设置返回值给父页面并关闭认证框
		setReturnDialogValue : function(){	
			var authParam = "";
			authParam += "&CHECK_MODE="+$("#cond_CHECK_MODE").val();
			authParam += "&PSPT_TYPE_CODE="+$("#cond_PSPT_TYPE_CODE").val();
			authParam += "&PSPT_ID="+$("#cond_PSPT_ID").val();
			authParam += "&USER_PASSWD="+$("#cond_USER_PASSWD").val();
			authParam += "&SIM_NO="+$("#cond_SIM_NO").val();
			authParam += "&VIP_ID="+$("#cond_VIP_ID").val();
			authParam += "&OWNER_PSPT_ID="+$("#cond_OWNER_PSPT_ID").val();
			authParam += "&IVR_PASS_SUCC=false";
			authParam += "&DISABLED_AUTH="+$("#DISABLED_AUTH").val();
			authParam += "&VERIFY_CODE="+$("#cond_VERIFY_CODE").val();
			
			var handler = $("#HANDLER").val();
			var returnObj = $.parseJSON("{\""+handler+"\": \""+authParam+"\"}");
			$.setReturnValue(returnObj, true);
		},
		//点击确定校验认证数据
		submitAuthCheck : function(){
			var checkmode = $("#cond_CHECK_MODE").val();
			if(checkmode == ""){
				alert("请选择验证方式!");
				checkmode.focus();
				return ;
			}
			if (checkmode=="0"){//客户证件
				var psptType = $("#cond_PSPT_TYPE_CODE").val();
				var psptEl = $("#cond_PSPT_ID");
				
				if (psptType ==""){
					alert("请选择证件类型!");
					$("#cond_PSPT_TYPE_CODE").focus();
					return;
				}
				
				if(psptType=="0"){
					if (!$.validate.verifyField(psptEl[0])){
						psptEl.focus();
						return;
					}
				}else if($.trim(psptEl.val()) == ""){
					alert("证件号码不能为空！");
					psptEl.focus();
					return;
				}psptEl = null;
				
			}else if(checkmode=="1"){//服务密码
				var cUserPassWD = $("#cond_USER_PASSWD");
				if(!$.validate.verifyField(cUserPassWD[0])){
					cUserPassWD.focus();
					return;
				}
				cUserPassWD=null;
			}else if(checkmode=="4"){//证件号码+服务密码
				var psptType = $("#cond_PSPT_TYPE_CODE").val();
				var psptEl = $("#cond_PSPT_ID");
				
				if (psptType ==""){
					alert("请选择证件类型!");
					$("#cond_PSPT_TYPE_CODE").focus();
					return;
				}
				
				if(psptType=="0"){
					if (!$.validate.verifyField(psptEl[0])){
						psptEl.focus();
						return;
					}
				}else if($.trim(psptEl.val()) == ""){
					alert("证件号码不能为空！");
					psptEl.focus();
					return;
				}
				psptEl = null;
				
				var cUserPassWD = $("#cond_USER_PASSWD");
				if(!$.validate.verifyField(cUserPassWD[0])){
					cUserPassWD.focus();
					return;
				}
				cUserPassWD=null;
			}else if(checkmode=="6"){
				var verifyCode = $("#cond_VERIFY_CODE").val();
				if (verifyCode ==""){
					alert("请输入短信验证码!");
					$("#cond_VERIFY_CODE").focus();
					return;
				}
			}
			$.authCheck.setReturnDialogValue();
		},
		//渲染认证框控件并调整认证框大小
		setAuthCheckArea : function(){
			var checkMode = $("#cond_CHECK_MODE").val();
			if(checkMode == "") {
				$("#cond_CHECK_MODE").focus();
				return;
			}
			if (checkMode=='0'){
				//客户证件+证件类型
				$("li[name='checkMode0']").css("display", "");
				$("#checkMode1,#checkMode2,#checkMode6,li[name='checkMode7']").css("display", "none");
				$("#PsptScanPart").css("display", "");
			}else if (checkMode=='1'){
				//服务密码
				$("li[name='checkMode0'],#checkMode2,#checkMode6,li[name='checkMode7']").css("display", "none");
				$("#checkMode1").css("display", "");
				$("#PsptScanPart").css("display", "none");
			}else if (checkMode=='2'){
				//服务密码  SIM卡号
				$("li[name='checkMode0'],#checkMode6,li[name='checkMode7']").css("display", "none");
				$("#checkMode1,#checkMode2").css("display", "");
				$("#PsptScanPart").css("display", "none");
			}else if (checkMode=='3'){
				//服务号码  证件
				$("li[name='checkMode0']").css("display", "");
				$("#checkMode1,#checkMode2,#checkMode6,li[name='checkMode7']").css("display", "none");
				$("#PsptScanPart").css("display", "none");
			}else if (checkMode=='4'){
				//服务密码  证件号码
				$("li[name='checkMode0'],#checkMode1").css("display", "");
				$("#checkMode2,#checkMode6,li[name='checkMode7']").css("display", "none");
				$("#PsptScanPart").css("display", "");
			}else if (checkMode=='5'){
				//VIP卡号
				$("li[name='checkMode0'],#checkMode1,#checkMode2,li[name='checkMode7']").css("display", "none");
				$("#checkMode6").css("display", "");
				$("#PsptScanPart").css("display", "none");
			}else if (checkMode=='6'){
				//短信验证码
				$("li[name='checkMode0'],#checkMode1,#checkMode2,#checkMode6").css("display", "none");
				$("li[name='checkMode7']").css("display", "");
				$("#PsptScanPart").css("display", "none");
			}
			//重新设置弹出框大小
			$.resizeHeight();
			
			$.authCheck.focusInput(checkMode);
		},
		//聚焦控件
		focusInput:function(checkMode){
			var flag = parseInt(checkMode);
			switch(flag){
				case 0:		//客户证件+证件类型
					$("#cond_PSPT_TYPE_CODE").focus();			
					break;
				case 1:		//服务密码
					$("#cond_USER_PASSWD").focus();
					break;
				case 2:		//服务密码  SIM卡号
					$("#cond_SIM_NO").focus();
					break;
				case 3:		//服务号码  证件
					$("#cond_PSPT_TYPE_CODE").focus();
					break;
				case 4:		//服务密码  证件号码
					$("#cond_PSPT_TYPE_CODE").focus();
					break;
				case 5:		//VIP卡号
					$("#cond_VIP_ID").focus();
					break;
				default:
					$("#cond_USER_PASSWD").focus();
			}
		},
		checkVerifyCode:function(){
			var disabledFlag = $(this).attr("disabled");
			if(disabledFlag || $.authCheck.timer) return;
			//发送校验码
			$.beginPageLoading("发送短信验证码。。。");
			$.ajax.submit(null, "sendVerifyCode", "&SERIAL_NUMBER="+$("#cond_SERIAL_NUMBER").val(), null,
			function(data){
				$.endPageLoading();
				if(data && data.get("RESULT_CODE") == 0){
					if($.authCheck.frequency<60) $.authCheck.frequency = 60;
					$.authCheck.sendVerifyCode();
				}
			},function(code, info, detail){
				$.endPageLoading();
				alert("发送短信验证码错误！\n"+info);
			},function(){
				$.endPageLoading();
				alert("发送短信验证码超时!");
			});
							
		},
		onPasswdInputClick:function(){
			var pwd = $("#cond_USER_PASSWD").val();
			if(pwd != "") return;
			//检查下双屏控件,是否要使用双屏控件, 校验它那边是否可以用
			try{
			   popupsKeyBoardReq("PassWord", "99007");
			}catch(e){
				//alert(e);
			}
		},
		sendVerifyCode:function(){
			var flag = false, btnTxt="重新发送";
			if($.authCheck.frequency>0){
				$.authCheck.timer = window.setTimeout($.authCheck.sendVerifyCode,1000);
				flag = true;
				btnTxt += "("+$.authCheck.frequency+")";
				$.authCheck.frequency--;
			} else {
				window.clearTimeout($.authCheck.timer);
				$.authCheck.frequency = 60;
				$.authCheck.timer = null;
			}
			$("#sendVerifyCodeBtn").find("span").html(btnTxt);
			if(flag){
				$("#sendVerifyCodeBtn").attr("disabled", flag).addClass("e_dis");
			}else{
				$("#sendVerifyCodeBtn").attr("disabled", flag).removeClass("e_dis");
			}
		},
		//点击取消关闭认证框
		cancelAuthCheck : function(){ 
			$.closePopupPage(true,null,null,null,null,true);
		}
	}});
	$($.authCheck.init);
})(Wade);

$.setDefaultFocus = function(){
	//如果没有选中值，默认选中第一个认证方式
	var checkMode = $("#cond_CHECK_MODE").val();
	if(checkMode == ""){
		$("#cond_CHECK_MODE option[index=1]").attr("selected", true); 
		//$("#cond_CHECK_MODE").find("option[index=1]").attr("selected", true);
	}
	$.authCheck.setAuthCheckArea();
	return true;
};


