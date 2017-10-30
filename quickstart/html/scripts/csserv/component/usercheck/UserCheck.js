(function($){
	$.extend({userCheck:{
		clazz: "com.ailk.csview.common.component.usercheck.UserCheckHandler",
		userMap:null,
		
		init:function(fieldName){
			var snObj = $("#"+fieldName);
			var handlerObj = $("#POP_"+fieldName);
			//设置号码输入框校验属性
			if(handlerObj.attr("authType")=="00"){
				//如果是手机服务号码则设置数据限制类型，如果是其他，比如宽度，则取消
				snObj.attr("datatype", "mbphone");
			}
			snObj.attr("nullable", "no");
			if(!snObj.attr("desc") || snObj.attr("desc")==""){
				if(handlerObj.attr("desc") == ""){
					snObj.attr("desc", "用户号码");
				}else{
					snObj.attr("desc", handlerObj.attr("desc"));	
				}
			}
			//回车事件
			snObj.bind("keydown", function(e){
				$.userCheck.events.onUserCheckInput(e, fieldName);
			}); 
			/**失去焦点事件
			snObj.bind("blur", function(e){
				$.userCheck.checkUser(fieldName);
			}); */
		},
		
		/**
		* 认证用户
		* 外部调用接口，启动服务号码校验
		*/
		checkUser:function(fieldName){
			//查询按钮事件
			if($.userCheck.checkSnValid(fieldName)){
				$.userCheck.queryUser(fieldName);
			} 
		},
		
		//校验手机号码是否正确
		checkSnValid:function(fieldName){
			var snObj=$("#"+fieldName);
			snObj.val($.trim(snObj.val()));
			if(!$.validate.verifyField(snObj[0])){
				return false;
			}
			return true;
		},
		
		//认证校验之前动作,确认用户是否存在
		queryUser:function(fieldName){
			var handlerObj = $("#POP_"+fieldName);
			var param = "&SERIAL_NUMBER="+$("#"+fieldName).val();
			param += "&IS_LOCAL="+handlerObj.attr("isLocal");
			param += "&AUTH_TYPE="+handlerObj.attr("authType");
			param += "&EPARCHY_CODE="+handlerObj.attr("tradeEparchyCode");
			$.beginPageLoading("核对号码。。。");
			$.httphandler.submit(null, $.userCheck.clazz, "queryUser", param, 
				function(data){
					$.endPageLoading();
					$.userCheck.callBackQryUser(data, fieldName);
					
				},function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","核对号码报错！",null, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示", "核对号码超时");
			});	

		},
		//查询业务类型数据及其他认证需要的数据，判断是否弹出校验认证框
		callBackQryUser:function(data, fieldName){ 
			var authSn = $("#"+fieldName);
			var handlerObj = $("#POP_"+fieldName);
			if(data && data.get("RESULT_CODE") == "1"){
				MessageBox.alert("告警提示", "查询不到"+authSn.attr("desc")+"["+authSn.val()+"]的用户资料！");
				return;
			}else if(data && data.get("RESULT_CODE") == "2"){
				MessageBox.alert("告警提示", authSn.attr("desc")+"["+authSn.val()+"]为异地号码！");
				return ;
			}
			var userInfo = data.get("USER_INFO");
			var isAuth = handlerObj.attr("isAuth");
			//如果只进行用户查询，则回调用户自定义事件后返回
			if(!isAuth || isAuth=="false"){
				$.userCheck.fireAction(fieldName, userInfo);
				return ;
			}
			//在需要鉴权时候，保存好用户资料，便于后面回调需要
			if(!$.userCheck.userMap) {
				$.userCheck.userMap = $.DataMap();
			}
			$.userCheck.userMap.put(fieldName, userInfo);
			
			var noUserPasswd="false", checkTag="11000";
			if (userInfo && userInfo.get("USER_PASSWD")==""){
				alert("该号码用户尚未设置密码,请使用客户证件方式进行身份校验!");
				//设置用户密码为空
				noUserPasswd=true;
			}
			if(handlerObj.attr("checkTag")){
				checkTag = handlerObj.attr("checkTag");
			}
			handlerObj.attr("authUser", userInfo.get("USER_ID"));
			handlerObj.attr("noUserPasswd", noUserPasswd);
			
			var param = "&HANDLER=POP_"+fieldName;
			param += "&SERIAL_NUMBER="+authSn.val();
			param += "&IDENTITY_CHECK_TAG="+checkTag;
			param += "&NO_USER_PASSWD="+noUserPasswd;
			param += "&DISABLED_AUTH=false";
			
			handlerObj.attr("authParams", param);
			//弹出密码认证窗口
			$.userCheck.popAuthCheck(fieldName);
		},
		//弹出认证窗口
		popAuthCheck:function(fieldName){
			var param = $("#POP_"+fieldName).attr("authParams");
			$.popupPage("components.auth.AuthCheck", "init", param, "身份校验", "500", "135", "POP_"+fieldName);	
		},
		//身份校验
		onUserCheck:function(fieldName){
			var handlerObj = $("#POP_"+fieldName);
			var param = "";	
			//鉴权认证公共入参
			param += "&SERIAL_NUMBER="+$("#"+fieldName).val();
			param += "&NO_USER_PASSWD="+handlerObj.attr("noUserPasswd");
			param += "&USER_ID="+handlerObj.attr("authUser");

			/**
			 * 鉴权认证密码框返回入参
			 * [CHECK_MODE,PSPT_TYPE_CODE,USER_PASSWD,PSPT_ID,SIM_NO,VIP_ID,OWNER_PSPT_ID,IVR_PASS_SUCC,DISABLED_AUTH]
			 */
			param += handlerObj.val();
			$.beginPageLoading("认证校验。。。");
			$.httphandler.submit(null, $.userCheck.clazz, "checkUser", param, 
				function(data){
					$.endPageLoading();
					$.userCheck.afterUserCheck(data, fieldName);
				},function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","认证校验报错！",null, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","认证校验超时！");
			});
		},
		afterUserCheck:function(data, fieldName){
			if (data.get("RESULT_CODE") !="0"){
				MessageBox.alert("告警提示", data.get("RESULT_INFO"), function(){
					if (data.get("IS_CLOSE") != "1"){
						$.userCheck.popAuthCheck(fieldName);
					}
				});
			}else{
				$.userCheck.fireAction(fieldName);
			}
		},

		//加载业务校验后事件
		fireAction:function(fieldName, userInfo){
			//回调业务数据加载服务
			var action=$("#POP_"+fieldName).attr("tradeAction"); 
			if(action && action != ""){
				if(!userInfo && $.userCheck.userMap){
					userInfo = $.userCheck.userMap.get(fieldName);
				}
				try{
					(new Function("var data = arguments[0];"+ action + ";"))(userInfo);
				}catch(e){
					MessageBox.error("错误提示","加载业务校验后信息错误，请检查后重试！");
					return;
				}
			}
			//清理认证框数据，避免提交到后台覆盖业务数据
			$("#POP_"+fieldName).val("");
		},
		events:{
			//号码框事件
			onUserCheckInput:function(e, fieldName){
				if(e.keyCode==13 || e.keyCode==108){
					//回车事件
					if($.userCheck.checkSnValid(fieldName)){
						$.userCheck.queryUser(fieldName);
					}
					return false;
				}
				return true;
			}
		}
	}});
})(Wade);