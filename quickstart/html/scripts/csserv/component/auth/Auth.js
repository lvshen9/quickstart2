(function($){
	$.extend({auth:{
		componentId:"AuthPart",
		cacheData:{},			//存放校验号码，USER_ID,三户资料
		init:function(){
			$.auth.bindEvents();
			
			var snObj = $("#AUTH_SERIAL_NUMBER");
			snObj.focus();
			//保证光标位于服务号码之后
			if(snObj.val()!= "") snObj.val($.trim(snObj.val()));
			/**
			* 如果是客服或设置为自动认证
			* 则在打开页面时候，自动发起认证校验
			* 前提条件是必须传入服务号码
			*/
			var inModeCode = $("#AUTH_SUBMIT_BTN").attr("inModeCode");
			var autoAuth = $("#AUTH_SUBMIT_BTN").attr("autoAuth");
			var disabledInput = $("#AUTH_SUBMIT_BTN").attr("disabledInput");
			if(inModeCode && inModeCode == "1"){
				$("#AUTH_SERIAL_NUMBER").attr("disabled",true);
				//autoAuth有可能为空，在客服接入时候也需要启用自动认证
				if(autoAuth!="false") {
					$.auth.autoAuth();
					return;
				}	
			}	
			if(disabledInput && disabledInput=="true"){
				$("#AUTH_SERIAL_NUMBER").attr("disabled",true);
			}
			//正常情况下，autoAuth=="true"才启用自动认证
			if(autoAuth && autoAuth=="true"){
				$.auth.autoAuth();
				return;
			}
			
			//双屏使用
			initDoulScrActiveXPage("NoOpenDualControl");
		},
		
		//绑定事件
		bindEvents:function(){
			//号码输入框
			$("#AUTH_SERIAL_NUMBER").bind("keydown",$.auth.events.onSerialNumberInputKeyDown);
			
			$("#AUTH_SERIAL_NUMBER").bind("click",$.auth.events.onSerialNumberInputClick);
			
			//查询按钮
			$("#AUTH_SUBMIT_BTN").bind("click",$.auth.events.onBtnSubmitClick); 
		},
		
		//判断是否不需要认证手机号码或者已经通过验证的手机号码
		cancelAuth:function(sn){
			if(top["ESCAPE_AUTH_SN"]){
				if(top["ESCAPE_AUTH_SN"]==sn
					|| $("#AUTH_SUBMIT_BTN").attr("authType")== "0"){
					return true;
				}else{
					top["ESCAPE_AUTH_SN"]=null;
				}
			}
			return $.auth.cacheData["AUTH_VALID_SN"]==sn;
		},
		
		//校验手机号码是否正确
		authSnValid:function(){
			var snObj=$("#AUTH_SERIAL_NUMBER");
			snObj.val($.trim(snObj.val()));
			//如果认证类型不是个人服务号码，则取消手机号码格式校验
			if($("#AUTH_SUBMIT_BTN").attr("authType")!= "0"){
				snObj.removeAttr("datatype");
			}
			if(!$.validate.verifyField(snObj[0])){
				return false;
			}
			return true;
		},
		//刷新页面
		reflushPage:function(){
			var href = window.location.href;
			if(href){
				if(href.lastIndexOf("#nogo") == href.length-5){
					href = href.substring(0, href.length-5);
				}
				var url = href.substring(0, href.indexOf("?"));
				var reqParam = href.substr(href.indexOf("?")+1);
				
				var paramObj = $.params.load(reqParam);
				paramObj.remove("DISABLED_AUTH");
				paramObj.remove("SERIAL_NUMBER");
				paramObj.remove("AUTO_AUTH");
				var param = paramObj.toString();
				if(param.indexOf("SERIAL_NUMBER") == -1 && $("#AUTH_SERIAL_NUMBER").length){
					param += "&SERIAL_NUMBER="+$("#AUTH_SERIAL_NUMBER").val();
				}
				var inModeCode = $("#AUTH_SUBMIT_BTN").attr("inModeCode");
				if(inModeCode && inModeCode == "1"){
					param += "&AUTO_AUTH=false";
				}
				window.location.href = url+"?"+param;
			}
		},
		//外部调用接口，启动AUTH认证
		autoAuth:function(){
			var autoAuthSn = $("#AUTH_SERIAL_NUMBER").val();
			//如果没有输入号码，则取消自动认证
			if(autoAuthSn == "") return;

			$.auth.authStart();
		},
		//设置免除认证号码
		escapeAuth:function(serialNumber){
			top["ESCAPE_AUTH_SN"]= serialNumber;
		},
		//启动认证
		authStart:function(){
			if(!$.auth.authSnValid()){
				return ;
			}
			//如果手机号码不同，则需要清理之前可能存在的费用数据
			var sn = $("#AUTH_SERIAL_NUMBER").val();
			if($.feeMgr && $.auth.cacheData["AUTH_VALID_SN"] != sn){
				if(!$.feeMgr.clearFeeList())return;
			}
			//禁用输入框
			$("#AUTH_SERIAL_NUMBER").attr("disabled", true);
			if ($("#AUTH_SUBMIT_BTN").attr("moreUser") == "true"){
				$.auth.checkMoreUser();
			}else{
				if($.auth.cancelAuth(sn)){
					$.auth.loadTradeData();
					return false;
				}
				$.auth.beforeAuthCheck();
			}
		},
		
		//核对多用户
		checkMoreUser:function(){
			//ACTION 入参在组件内部区分调用逻辑
			var param = "&ACTION=AUTH_MOREUSER";
			param += "&SERIAL_NUMBER="+$("#AUTH_SERIAL_NUMBER").val();
			
			$.beginPageLoading("查询用户。。。");
			//通过刷新组件，在组件内部判断多用户
			ajaxSubmit(null, null, param, $.auth.componentId, 
				function(data){ 
			  		$.endPageLoading();	
			  		if(data && data.get("RESULT_CODE")==0){
			  			//多用户选择
			  			$("#AUTH_SERIAL_NUMBER").attr("disabled", false);
			  			$.popupPage("components.auth.UserList", "queryUserList", 
			  							"&cond_SERIAL_NUMBER=" +$("#AUTH_SERIAL_NUMBER").val(), "用户选择", "640", "250", "SELECTED_AUTH_USER");
			  			
			  		}else{
			  			MessageBox.alert("告警提示","不存在该号码的用户，请重新输入！",$.auth.reflushPage);
			  		}
				},function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","查询用户报错！",$.auth.reflushPage, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","查询用户超时!");
			});
		},
		
		//选择多用户后点击事件
		afterSelectMoreUser:function(){
			$("#AUTH_SERIAL_NUMBER").attr("disabled", true);
			var selectedUserId = $("#SELECTED_AUTH_USER").val();
			if (selectedUserId != ""){
				$.auth.beforeAuthCheck(selectedUserId);
			}else{
				$.auth.beforeAuthCheck();
			}
			
		},
		
		//认证校验之前动作,确认用户是否存在
		beforeAuthCheck:function(userId){

			var param = "&ACTION=AUTH_BEFORE";
			var authSn = $("#AUTH_SERIAL_NUMBER").val();
			
			param += "&SERIAL_NUMBER="+authSn;
			param += "&TRADE_TYPE_CODE="+$("#TRADE_TYPE_CODE").val();
			param += "&NET_TYPE_CODE=00";
			param += "&USER_CAN_BE_NULL="+$("#AUTH_SUBMIT_BTN").attr("userCanBeNull");
			param += "&DISABLED_AUTH="+$("#AUTH_SUBMIT_BTN").attr("disabledAuth");
			param += "&AUTH_TYPE="+$("#AUTH_SUBMIT_BTN").attr("authType");
			if (userId){
				param += "&USER_ID=" + userId;
			}

			$.beginPageLoading("查询用户。。。");
			//通过刷新组件，在组件内部做校验前准备
			ajaxSubmit(null, null, param, $.auth.componentId, $.auth.callBackBeforeAuthCheck,
				function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","查询用户报错！",$.auth.reflushPage, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示", "查询用户超时");
			});	

		},
		//查询业务类型数据及其他认证需要的数据，判断是否弹出校验认证框
		callBackBeforeAuthCheck:function(data){ 
			$.endPageLoading();	
			if($.auth.cacheData["AUTH_CURRENT_SN"] 
				&& $.auth.cacheData["AUTH_CURRENT_SN"]!=$("#AUTH_SERIAL_NUMBER").val()){
				$("#AUTH_SUBMIT_BTN").attr("authCount", "0");		//如果鉴权号码跟输入号码不同，则重置认证错误次数
			}
			var userInfo = data.get("USER_INFO");
			if(userInfo){
				$.auth.cacheData["AUTH_USER_ID"] = userInfo.get("USER_ID");	//记录好认证USER_ID
				$.auth.cacheData["AUTH_CURRENT_SN"] = userInfo.get("SERIAL_NUMBER");
			}
			
			//如果不需要认证，直接去加载三户信息
			if(data.get("AUTH_STATE") == "1"){
				$.auth.loadTradeData();
				return;
			}
			//记录认证方式
			$("#AUTH_SUBMIT_BTN").attr("checkTag", data.get("AUTH_IDENTITY_CHECK_TAG"));
			if (userInfo && userInfo.get("USER_PASSWD")==""){
				//设置用户密码为空
				$("#AUTH_SUBMIT_BTN").attr("noUserPasswd", "true");
				
				MessageBox.alert("告警提示","该用户尚未设置密码,请使用客户证件方式进行身份校验！", $.auth.popAuthCheck);
			}else{
				$.auth.popAuthCheck();
			}
		},
		//弹出认证窗口
		popAuthCheck:function(){
			var param = "&HANDLER=POP_AUTH_PARAMS";
			param += "&SERIAL_NUMBER="+$("#AUTH_SERIAL_NUMBER").val();
			param += "&TRADE_TYPE_CODE="+$("#TRADE_TYPE_CODE").val();
			param += "&IDENTITY_CHECK_TAG="+$("#AUTH_SUBMIT_BTN").attr("checkTag");
			param += "&DISABLED_AUTH="+$("#AUTH_SUBMIT_BTN").attr("disabledAuth");
			param += "&NO_USER_PASSWD="+$("#AUTH_SUBMIT_BTN").attr("noUserPasswd");
			
			//弹出密码认证窗口
			$.popupPage("components.auth.AuthCheck", "init", param, "身份校验", "500", "135", "POP_AUTH_PARAMS");	
			//解除输入框禁用，否则点击取消时候，没法输入
			$("#AUTH_SERIAL_NUMBER").attr("disabled", false);	
		},
		
		onAuthCheck:function(){
			var handlerObj = $("#POP_AUTH_PARAMS");
			//继续禁用
			$("#AUTH_SERIAL_NUMBER").attr("disabled", true);
			var param = "";	
			//鉴权认证公共入参
			param += "&ACTION=AUTH_CHECK";
			param += "&SERIAL_NUMBER="+$("#AUTH_SERIAL_NUMBER").val();
			param += "&TRADE_TYPE_CODE="+$("#TRADE_TYPE_CODE").val();
			param += "&NO_USER_PASSWD="+$("#AUTH_SUBMIT_BTN").attr("noUserPasswd");
			param += "&DISABLED_AUTH="+$("#AUTH_SUBMIT_BTN").attr("disabledAuth");
			param += "&AUTH_TYPE="+$("#AUTH_SUBMIT_BTN").attr("authType");
			if ($.auth.cacheData["AUTH_USER_ID"]){
				param += "&USER_ID="+$.auth.cacheData["AUTH_USER_ID"];		//用户USER_ID
			}

			/**
			 * 鉴权认证密码框返回入参
			 * [CHECK_MODE,PSPT_TYPE_CODE,USER_PASSWD,PSPT_ID,SIM_NO,VIP_ID,OWNER_PSPT_ID,IVR_PASS_SUCC,DISABLED_AUTH]
			 */
			param += handlerObj.val();
			
			//更改不需要认证标识
			var authParams = $.params.load($("#POP_AUTH_PARAMS").val());
			if(authParams.get("DISABLED_AUTH")){
				$("#AUTH_SUBMIT_BTN").attr("disabledAuth", authParams.get("DISABLED_AUTH"));
			}
			
			$.beginPageLoading("认证校验。。。");
			ajaxSubmit(null, null, param, $.auth.componentId, $.auth.afterAuthCheck,	
				function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","认证校验报错！",$.auth.reflushPage, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","认证校验超时！");
			});
		},
		afterAuthCheck:function(data){
			$.endPageLoading();
			var authCount = parseInt($("#AUTH_SUBMIT_BTN").attr("authCount"));
			authCount++;
			if (data.get("RESULT_CODE") !="0"){
				$("#AUTH_SUBMIT_BTN").attr("authCount", authCount);
				MessageBox.alert("告警提示", data.get("RESULT_INFO"), function(){
					if (data.get("IS_CLOSE") != "1" && authCount<5){
						$.auth.popAuthCheck();
					}else{
						//如果校验错误锁定以后，刷新页面
						$.auth.reflushPage();
					}	
				});
				return;
			}
			//如果校验成功，则清空认证次数
			$("#AUTH_SUBMIT_BTN").attr("authCount", "0");		
			if(!$.auth.cacheData["AUTH_DATA"]) $.auth.cacheData["AUTH_DATA"]=$.DataMap();
			//如果通过认证，则记录认证校验数据
			if(data.containsKey("CHECK_MODE")){
				$.auth.cacheData["AUTH_DATA"].put("CHECK_MODE", data.get("CHECK_MODE"));
				$.auth.cacheData["AUTH_DATA"].put("CHECK_DESC", data.get("CHECK_MODE_DESC"));
			}
			$.auth.loadTradeData();				
		},
		//加载三户资料
		loadTradeData:function(){
			var param = "&ACTION=AUTH_DATA";
			param += "&SERIAL_NUMBER="+$("#AUTH_SERIAL_NUMBER").val();
			param += "&TRADE_TYPE_CODE="+$("#TRADE_TYPE_CODE").val();
			param += "&USER_CAN_BE_NULL="+$("#AUTH_SUBMIT_BTN").attr("userCanBeNull");
			param += "&AUTH_TYPE="+$("#AUTH_SUBMIT_BTN").attr("authType");
			
			if ($.auth.cacheData["AUTH_USER_ID"]){
				param += "&USER_ID=" + $.auth.cacheData["AUTH_USER_ID"];
			}
			
			$.beginPageLoading("加载数据。。。");
			ajaxSubmit(null, null, param, $.auth.componentId, 
				function(ucaData){
					$.endPageLoading();
					//保存好用户信息
					if(!$.auth.cacheData["AUTH_DATA"]) $.auth.cacheData["AUTH_DATA"]=$.DataMap();
					ucaData.eachKey(function(key,index,totalcount){
						$.auth.cacheData["AUTH_DATA"].put(key, ucaData.get(key));
					});
											
					//记录认证的号码
					$.auth.cacheData["AUTH_VALID_SN"] = $("#AUTH_SERIAL_NUMBER").val();
					//规则校验
					$.auth.ruleAction(ucaData);					
					
				},
				function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","加载数据报错！",$.auth.reflushPage, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","加载数据超时！");
			});
			
		},
		//启动业务规则校验
		ruleAction:function(obj){
			if(typeof(obj) == "undefined"){
				obj = $.auth.cacheData["AUTH_DATA"];
			}
			
			//判断是否有业务规则校验前自定义规则事件处理		
			var beforeAction=$("#AUTH_SUBMIT_BTN").attr("beforeAction"); 
			if(beforeAction && beforeAction != ""){
				(new Function("var data = arguments[0];"+ beforeAction + ";"))(obj);
			}

			//调用业务规则校验
			if($.tradeCheck && typeof($.tradeCheck.checkTrade)){
				$.tradeCheck.checkTrade(0 , $.auth.checkUnionTrade);
			}else{
				$.auth.checkUnionTrade(obj);
			}
		},
		
		//核对业务综合受理
		checkUnionTrade:function(obj){
			$.auth.fireAction(obj);
			
//			var tradeTypeCode = $("#TRADE_TYPE_CODE").val();
//			var preSale = $("#AUTH_SUBMIT_BTN").attr("preSale");
//			if(preSale!="true" || (tradeTypeCode != "110" && tradeTypeCode != "240" && tradeTypeCode != "141" && tradeTypeCode != "142" && tradeTypeCode != "3700")){
//				$.auth.fireAction(obj);
//				return;
//			}
//			
//			var params = "&SERIAL_NUMBER="+$("#AUTH_SERIAL_NUMBER").val();
//			$.beginPageLoading("核对精准营销用户。。。");
//			ajaxPost("person.changeproduct.UnionTrade","querySaleActive", params,null,
//				function(data){
//					$.endPageLoading();
//					if(data && data.get("SALE_ACTIVE_USER")=="1"){
//						MessageBox.confirm("确认提示", "精准营销目标客户，请进入[业务综合受理]界面进行精准营销推荐！", 
//							function(btn){//ok/cancel
//							    params = params + "&USER_ID=" + $.auth.cacheData["AUTH_USER_ID"] + "&EVENT_CHOICE=" + btn;
//							    ajaxPost("person.changeproduct.UnionTrade","saveRecommEvent",params,null,null,null);
//								if(btn == "ok"){
//									params += "&DISABLED_AUTH=true&AUTO_AUTH=true";
//									openNav("业务综合受理", "person.changeproduct.UnionTrade", "pageInit", params);
//								}
//						});	
//					}
//					$.auth.fireAction(obj);
//				},
//				function(code, info, detail){
//					$.endPageLoading();
//					MessageBox.error("错误提示","核对精准营销用户报错！",$.auth.reflushPage, null, info, detail);
//				}
//			);
		},
		
		//加载业务受理准备数据
		fireAction:function(obj){
			var disabledInput = $("#AUTH_SUBMIT_BTN").attr("disabledInput");
			//更新认证和提交组件相关数据和控件的状态
			var inModeCode = $("#AUTH_SUBMIT_BTN").attr("inModeCode");
			if(inModeCode != "1" && (disabledInput && disabledInput=="false")){
				$("#AUTH_SERIAL_NUMBER").attr("disabled", false);
			}
			
			if(typeof(obj) == "undefined"){
				obj = $.auth.cacheData["AUTH_DATA"];
			}
			
			//刷新三户展示区域
			if($("#UCAViewPart") && $("#UCAViewPart").length){
				$.ajax.submit(null, "setUCAViewInfos", "&UCAInfoParam="+obj, "UCAViewPart");
			}
			
			//回调业务数据加载服务
			var action=$("#AUTH_SUBMIT_BTN").attr("tradeAction"); 
			if(action && action != ""){
				try{
					(new Function("var data = arguments[0];"+ action + ";"))(obj);
				}catch(e){
					MessageBox.error("错误提示","加载业务受理信息错误，请检查后重试！",$.auth.reflushPage);
					return;
				}
			}
			
			//加载费用
			if($.feeMgr){
				var userId="",productId="-1",sn = $("#AUTH_SERIAL_NUMBER").val(),eparchyCode=null,vipClassId=null;
				if(obj && obj.get("USER_INFO")){
					userId = obj.get("USER_INFO").get("USER_ID");
					sn = obj.get("USER_INFO").get("SERIAL_NUMBER");
					productId = obj.get("USER_INFO").get("PRODUCT_ID");				
					eparchyCode = obj.get("USER_INFO").get("EPARCHY_CODE");				
				}
				if(obj && obj.get("VIP_INFO")){
					vipClassId = obj.get("VIP_INFO").get("VIP_CLASS_ID");				
				}
				$.feeMgr.loadTradeFee($("#TRADE_TYPE_CODE").val(),productId,eparchyCode, vipClassId);
				
				//设置POS机信息
				$.feeMgr.setPosParam($("#TRADE_TYPE_CODE").val(), sn, eparchyCode, userId);
				
				//设置Score机信息
				$.feeMgr.setScoreParam($("#TRADE_TYPE_CODE").val(), sn, eparchyCode, userId);
			}
			
			//小栏框信息
			if(top.triggerPushInfos && typeof(top.triggerPushInfos)=="function") {
				var hintInfo = $.DataMap(obj.get("USER_INFO").toString());
				hintInfo.put("TRADE_TYPE_CODE", $("#TRADE_TYPE_CODE").val());
				hintInfo.put("BIRTHDAY", obj.get("CUST_INFO").get("BIRTHDAY"));
				if(obj && obj.get("VIP_INFO")){
					hintInfo.put("VIP_USECUST_NAME", obj.get("VIP_INFO").get("USECUST_NAME"));
					hintInfo.put("VIP_CARD_NO", obj.get("VIP_INFO").get("VIP_CARD_NO"));
					hintInfo.put("VIP_TYPE_CODE", obj.get("VIP_INFO").get("VIP_TYPE_CODE"));
					hintInfo.put("VIP_CLASS_ID", obj.get("VIP_INFO").get("VIP_CLASS_ID"));
					hintInfo.put("CUST_MANAGER_ID", obj.get("VIP_INFO").get("CUST_MANAGER_ID"));
					hintInfo.put("RSRV_STR9", "");
					hintInfo.put("RSRV_STR10", "");
				}

				top.triggerPushInfos("&HINT_INFO=" + hintInfo.toString(),"baseinfo");
			}
			
			//发展员工初始化
			if($.developStaff && typeof($.developStaff.init)){
				$.developStaff.init();
			}
			
			//启用提交按钮
			if($.cssubmit){
				$.cssubmit.disabledSubmitBtn(false);
				$.cssubmit.setParam("EXEC_ACTION", obj.get("EXEC_ACTION"));	//记录台账EXEC_ACTION字段查询时间
			}
			//清空认证框设置的参数值
			$("#POP_AUTH_PARAMS").val("");
			//设置业务受理地州
			if(obj && obj.get("USER_INFO")){
				$("#TRADE_EPARCHY_NAME").text(obj.get("USER_INFO").get("EPARCHY_NAME"));
			}	
		},
		//获取三户信息等
		getAuthData: function(){
			return $.auth.cacheData["AUTH_DATA"];
		},
		disabledAuthInput:function(flag){
			$("#AUTH_SERIAL_NUMBER").attr("disabled", flag);
		},
		events:{
			//号码框事件
			onSerialNumberInputKeyDown:function(e){
				if(e.keyCode==13 || e.keyCode==108){
					//回车事件
					$.auth.authStart();
					return false;
				}
				return true;
			},
			
			onSerialNumberInputClick:function(){
				//每次使用双屏控件前清空手机号码, 号码不为空则不使用
				var sn = $("#AUTH_SERIAL_NUMBER").val();
				if(sn != "") return;
				//检查下双屏控件,是否要使用双屏控件, 校验它那边是否可以用
				try{
				   popupsKeyBoardReq("SERIAL_NUMBER", "99006");
				}catch(e){
					//alert(e);
				}
			},
			
			//点击查询按钮事件
			onBtnSubmitClick:function(){
				//查询按钮事件
				$.auth.authStart();
			}
		}
	}});
	
	//页面初始化
	$($.auth.init);
})(Wade);