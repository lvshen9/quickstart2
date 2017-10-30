(function($){
	$.extend({
	//提交模块	
	cssubmit:{
		componentId : "SubmitPart" ,			//组件ID
		repeatFlag: false,						//防止重复提交
		dynamicParams : null,					//动态设置参数
		dynamicParamData :$.DataMap(),
		callBackEvent:null,						//提交回调事件
		customizeBtns:null,						//自定义按钮
		tradeData: null,						//业务执行返回结果
		commData:null,							//公用参数
		//----------购物车
		clickButton:null,
		//----------购物车
		
		//绑定业务提交事件
		init:function(){
			$.cssubmit.dynamicParams = "";
			//----------购物车
			$.cssubmit.clickButton = "submit";
			$("#CSSUBMIT_BUTTON").bind("click", "submit", $.cssubmit.bindFucntion);
			$("#ADD_SHOPPING_CART").bind("click", "addShoppingCart", $.cssubmit.bindFucntion);
			$("#CSRESET_BUTTON").bind("click", $.cssubmit.resetTrade);
			//是否禁用提交按钮
			var disabled = $("#CSSUBMIT_BUTTON").attr("disabledBtn") == "true"? true : false;
			$.cssubmit.disabledSubmitBtn(disabled,"submitButton");
			disabled = $("#ADD_SHOPPING_CART").attr("disabledBtn") == "true"? true : false;
			$.cssubmit.disabledSubmitBtn(disabled,"shoppingCartButton");
			//----------购物车
		},
		
		//----------购物车
		bindFucntion:function(buttonType){
			var beforeAction = $("#CSSUBMIT_BUTTON").attr("beforeAction");
			//beforeAction动作如果涉及到后台服务调用，必须是同步方法,否则手动启动业务提交
			$.cssubmit.clickButton = buttonType;
			if(beforeAction && beforeAction != ""){
				var validFlag =  (new Function("return " + beforeAction + ";"))();
				//如果返回false，停止业务提交
				if(typeof(validFlag) == "undefined" || !validFlag){
					return false;
				}
			}
			$.cssubmit.submitTrade();
		},
		//----------购物车
				
		//设置单个参数
		setParam : function(key, value){
			($.cssubmit.dynamicParamData).put(key, value);
		},
		
		//设置参数,每次设置，都会覆盖之前参数
		addParam : function(paramStr){
			$.cssubmit.dynamicParams = paramStr;
		},
		//清除所有动态参数
		clearParam:function(){
			$.cssubmit.dynamicParams = null;
			$.cssubmit.dynamicParamData.clear();
		},
		//重置业务
		resetTrade : function(){
			var resetAction=$("#CSRESET_BUTTON").attr("resetAction"); 
			if(!resetAction || resetAction.length == 0){
				var href = window.location.href;
				if(href){
					if(href.lastIndexOf("#nogo") == href.length-5){
						href = href.substring(0, href.length-5);
					}
					window.location.href = href;
				}
			}else{
				(new Function(resetAction + ";"))();
			}
			
		},
		
		/**
		* 集团业务页面流提交
		*/
		flowSubmit : function(){
			var flowSubmitData = window.getFlow().getSubmitData();
			$.cssubmit.addParam(flowSubmitData);
			$.cssubmit.bindCallBackEvent($.cssubmit.callBack.grpCallBack);
			$("#CSSUBMIT_BUTTON").trigger("click");
		},

		//业务提交规则校验
		submitTrade : function(){
			if($.auth && $.auth.getAuthData()){
				var user=$.auth.getAuthData().get("USER_INFO");
				var authSubmitBtn=$("#AUTH_SUBMIT_BTN");
				if(authSubmitBtn.length>0){
					var authType=authSubmitBtn.attr("authType");
					if(authType!="04"){//宽带业务不校验
						if(user && user.get("SERIAL_NUMBER")){
							if(user.get("SERIAL_NUMBER") != $.trim($("#AUTH_SERIAL_NUMBER").val())){
								MessageBox.alert("告警提示", "认证校验的服务号码与当前输入的服务号码不一致，请确认");
								return ;
							}
						}
					}
				}else{
					if(user && user.get("SERIAL_NUMBER")){
						if(user.get("SERIAL_NUMBER") != $.trim($("#AUTH_SERIAL_NUMBER").val())){
							MessageBox.alert("告警提示", "认证校验的服务号码与当前输入的服务号码不一致，请确认");
							return ;
						}
					}
				}
			}			
			
			var cancelRule = $("#CSSUBMIT_BUTTON").attr("cancelRule");
			var isGrp = $("#CSSUBMIT_BUTTON").attr("isGrp");
			if(!cancelRule || cancelRule=="") 	cancelRule = "false";
			if(!isGrp || isGrp=="") 	isGrp = "false";
			
			//调用业务规则校验
			if($.tradeCheck && cancelRule == "false" && isGrp=="false"){
				$.tradeCheck.checkTrade(1 , $.cssubmit.checkFee);
			}else{
				//如果没有导入业务规则校验，默认为不需要执行
				$.cssubmit.checkFee();
			}
		},
		//核对费用
		checkFee:function(){
			//----------购物车
			var buttonType = $.cssubmit.clickButton.data;
			if($.feeMgr&&buttonType!="addShoppingCart"){
				//返回true则自动提交业务
				if($.feeMgr.checkFee($.cssubmit.registerTrade, $.cssubmit.cancelAction)){
					$.cssubmit.registerTrade(1);
				}
			}else if($.feeMgr&&buttonType=="addShoppingCart"){
				$.cssubmit.registerTrade(0);
			}//--------购物车
			else{
				$.cssubmit.registerTrade(1);
			}
		},
		//业务登记
		registerTrade : function(noFeeFlag){
			var submitFalg = true;
			var area = $("#CSSUBMIT_BUTTON").attr("area");
			var callBean = $("#CSSUBMIT_BUTTON").attr("callBean");
			var listener = $("#CSSUBMIT_BUTTON").attr("listener");
			var params = $("#CSSUBMIT_BUTTON").attr("params");
			var refreshPart = $("#CSSUBMIT_BUTTON").attr("refreshPart");
			
			//禁用提交按钮
			$.cssubmit.disabledSubmitBtn(true);
						
			if(!area || area=="") 			area = "AuthPart";
			if(!callBean || callBean=="") 	submitFalg = false;
			if(!listener || listener=="") 	listener = "onTradeSubmit";
			if(!refreshPart) 	refreshPart = null;
			if(!params) 		params = "";
			
			//----------购物车
			var submitType = $.cssubmit.clickButton.data;
			$.cssubmit.setParam("SUBMIT_TYPE",submitType);
			//------------购物车
			
			//加载动态字符串参数
			if($.cssubmit.dynamicParams && ($.cssubmit.dynamicParams).length>0){
				params += $.cssubmit.dynamicParams;
			}
			//加载动态键值对参数
			if($.cssubmit.dynamicParamData && ($.cssubmit.dynamicParamData).length>0){
				($.cssubmit.dynamicParamData).eachKey(function(key,index,totalcount){
					params += "&"+key+"="+($.cssubmit.dynamicParamData).get(key);
				});
			}
			
			//拼接费用台账数据
			if(!noFeeFlag && $.feeMgr){
				var feeList = $.feeMgr.getFeeList();
				var payModes = $.feeMgr.getPayModeList();
				//-----------购物车
				if((!feeList || !feeList.length)&&submitType=="submit"){
					alert("系统费用数据丢失，禁止提交，请截图联系管理员解决！");
					return ;
				}
				//-----------购物车
				params += "&X_TRADE_FEESUB="+feeList.toString();
				params += "&X_TRADE_PAYMONEY="+payModes.toString();
				if(payModes && payModes.length>0){
					payModes.each(function(item, idx, totalCount){
						if(item.get("PAY_MONEY_CODE")=="P"){
							params += "&TRADE_POS_ID="+$.feeMgr.getTradePosId().toString();
							return false;
						}
					});
				}
			}
			//设置认证方式.如果无认证组件设置CHECK_MODE=Z，如果免认证则CHECK_MODE=F,需要更新台账表PROCESS_TAG_SET第20位
			var checkMode="Z";
			var checkDesc="无";
			if($.auth && $.auth.getAuthData()){
				var authData = $.auth.getAuthData();
				if(authData && authData.containsKey("CHECK_MODE")){
					checkMode= authData.get("CHECK_MODE");
					checkDesc= authData.get("CHECK_DESC")
				}else{
					checkMode="F";
					checkDesc="免认证";
				}
				params += "&CHECK_MODE="+checkMode;
				//增加客服参数传值
				if($("#AUTH_SUBMIT_BTN").attr("opCode")!=""){
					params += "&OP_CODE="+$("#AUTH_SUBMIT_BTN").attr("opCode");
				}
			}
			if(top.document.getElementById("staffId") && top.$){
				params += "&NGBOSS_STAFF_ID="+top.$("#staffId").val();
			}
			if(!$.cssubmit.commData) $.cssubmit.commData=$.DataMap();
			$.cssubmit.commData.put("CHECK_MODE", checkMode);
			$.cssubmit.commData.put("CHECK_MODE_NAME", checkDesc);		//送给打印使用
			
			if($.cssubmit.repeatFlag){
				MessageBox.alert("告警提示", "业务已经在受理中，请不要重复提交业务！");
				return ;
			}
			//防止重复提交
			$.cssubmit.repeatFlag = true;
			
			//------购物车
			if(submitType=="submit"){
				   $.beginPageLoading("业务受理中。。。");
				}else if(submitType=="addShoppingCart"){
				   $.beginPageLoading("加入购物车过程中。。。");
				}
			//--------购物车
			
			$.beginPageLoading("业务受理中。。。");
			if(!submitFalg){
				//普通方式提交
				$.ajax.submit(area, listener, params,refreshPart,
					$.cssubmit.callBack.successFunc,
						$.cssubmit.callBack.errorFunc,
							$.cssubmit.callBack.timeoutFunc);				
			}else{
				//特殊方式提交
				hhSubmit(area, callBean, listener, params,
					$.cssubmit.callBack.successFunc,
						$.cssubmit.callBack.errorFunc,
							$.cssubmit.callBack.timeoutFunc);				
			}
		},
		//设定提交成功回调事件
		bindCallBackEvent:function(func){
			$.cssubmit.callBackEvent = func;
		},

		//打印调用事件
		printTrade:function(isAuth){
			var data = $.DataMap();
			//如果有自定义打印事件，则执行，否则执行默认打印
			if($.printMgr && $.printMgr.printEvent){
				if($.cssubmit.tradeData instanceof $.DatasetList){
					($.cssubmit.tradeData.get(0)).put("IS_AUTH", !isAuth?false:true);
				}else if($.cssubmit.tradeData instanceof $.DataMap){
					$.cssubmit.tradeData.put("IS_AUTH", !isAuth?false:true);
				}
				$.printMgr.printEvent($.cssubmit.tradeData);
				return ;
			}
			//默认执行方法
			if($.cssubmit.tradeData && $.printMgr){
				if($.cssubmit.tradeData instanceof $.DatasetList){
					data = $.cssubmit.tradeData.get(0);
				}else if($.cssubmit.tradeData instanceof $.DataMap){
					data = $.cssubmit.tradeData;
				}
				//如果有公用参数，则加入打印个性化参数中，后续打印需要
				if($.cssubmit.commData){
					$.printMgr.addPrintParam($.cssubmit.commData);
				}
				data.put("IS_AUTH", !isAuth?false:true);
				$.printMgr.printTrade(data);
				$.cssubmit.commData = null;
			}
		},
		//无纸化按钮配置
		confElecAcceptBill:function(){
			$.cssubmit.bindCustomizeBtn({
	 			"name":"电子受理单",
	 			"icon":"",
	 			"fn":function(inData){
	 				var tradeData = null;
	 				if(inData instanceof $.DatasetList){
						tradeData = inData.get(0);
					}else if(inData instanceof $.DataMap){
						tradeData = inData;
					}
		 			var eparchyCode = tradeData.get("DB_SOURCE");
		 			if(!tradeData.containsKey("DB_SOURCE")){
						eparchyCode = tradeData.get("EPARCHY_CODE");
					}
	 				var param = "&ACTION=MAKE_PRT_DATA";
	 				param += "&NOT_FEE=true";				//不生成费用数据
	 				param += "&ORDER_ID=" + tradeData.get("ORDER_ID");
	 				param += "&EPARCHY_CODE=" + eparchyCode;
	 				if($.auth){
	 					param += "&CHECK_MODE=" + $.auth.cacheData["AUTH_DATA"].get("CHECK_MODE");
	 				}

					$.beginPageLoading("加载电子受理单初始化数据。。。");
					ajaxSubmit(null, null, param, $.cssubmit.componentId, 
						function(data){
							$.endPageLoading();
							if(!data.get("FLAG")){
								MessageBox.error("错误提示","生成电子受理单初始化数据错误！");
								return;
							}
							openNav("业务受理单", "epaper.trade.EpaperProxy", "initial", param);
							//$.cssubmit.closeMessage(true, true);
						},
						function(code, info, detail){
							$.endPageLoading();
							MessageBox.error("错误提示","核对电子受理单初始化数据报错！", null, null, info, detail);
						},function(){
							$.endPageLoading();
							MessageBox.alert("告警提示","核对电子受理单初始化数据超时！");
					});	
		 		}
		 	});
		},
		//回调方法
		callBack:{
			//提交成功回调
			successFunc:function(data){
				$.endPageLoading();
				$.cssubmit.tradeData = data;		//保存业务受理返回结果
								
				$.cssubmit.clearParam();
				$.cssubmit.repeatFlag = false;
				
				//如果是集团提交，直接按照给定的方式去回调，不需要走后面逻辑
				if($("#CSSUBMIT_BUTTON").attr("isGrp")=="true"){
					$.cssubmit.callBack.grpCallBack(data);
					return;
				}
				//如果有设置回调事件，则执行自定义事件，转为人工控制
				if($.cssubmit.callBackEvent){
					$.cssubmit.callBackEvent(data);
					return ;
				}
				
				var isPrint = false;			//是否打印业务受理单		
				var isTicketPrint = false;		//是否打印票据
				var isPrivPrint = true;			//权限打印标识(根据打印权限控制或者接入方式判断)
				
				//如果没有回调事件，继续按照默认进行业务受理信息展示
				var title = "业务受理成功";
				//---------购物车
				if($.cssubmit.clickButton.data=="addShoppingCart"){
					   title = "成功加入购物车";
					   $.cssubmit.showMessage("success", title, content, false);
					   return;
					}
				//---------购物车
				var content = "点【确定】继续业务受理。";
				var tradeData;
				if(data instanceof $.DatasetList){
					tradeData = data.get(0);
				}else if(data instanceof $.DataMap){
					tradeData = data;
				}	
				if(tradeData && tradeData.containsKey("ORDER_ID")){
					content = "客户订单标识：" + tradeData.get("ORDER_ID") + "<br/>点【确定】继续业务受理。";
				}
				
				//如果是其他接入方式，或者免打印权限则不显示打印按钮。否则走后面逻辑
				if($("#CSSUBMIT_BUTTON").attr("isPrint") == "false"){
					isPrivPrint=false;
				}
				//判断是否需要打印发票
				if($.feeMgr){
					if($.feeMgr.getFeeList().length>0) isTicketPrint=true;
				}
				
				var tradeTypeCode;
				if($.auth){
					tradeTypeCode= $("#TRADE_TYPE_CODE").val();
				}else if( tradeData && tradeData.containsKey("ORDER_TYPE_CODE") ){
					tradeTypeCode = tradeData.get("ORDER_TYPE_CODE");
				}else if( tradeData && tradeData.containsKey("TRADE_TYPE_CODE") ){
					tradeTypeCode = tradeData.get("TRADE_TYPE_CODE");
				}
				/**
				 * 如果没有找到业务类型，则判断是否有打印权限以及是否有票据打印
				 * 只有在有打印权限以及需要打印票据时候才显示打印按钮，同时不再处理电子受理单无纸化打印
				 */
				if(!tradeTypeCode){
					$.cssubmit.showMessage("success", title, content, isPrivPrint && isTicketPrint);
					return;
				}
				
				var param = "&ACTION=IS_PRINT";
				param += "&TRADE_TYPE_CODE="+tradeTypeCode;
				ajaxSubmit(null, null, param, $.cssubmit.componentId, 
					function(prtdata){
						$.endPageLoading();
						if(prtdata && prtdata.containsKey("PRT_TAG")){
							isPrint = (prtdata.get("PRT_TAG")== "1")?true:false;
						}
						//有打印权限且需要业务受理单打印则启动电子受理单无纸化打印
						if(isPrivPrint && isPrint){
							$.cssubmit.confElecAcceptBill();
						}
						//有打印权限，且仅需要打印业务受理单或者仅需要票据打印才会启用打印
						$.cssubmit.showMessage("success", title, content, isPrivPrint && (isPrint || isTicketPrint));
					},
					function(code, info, detail){
						$.endPageLoading();
						MessageBox.error("错误提示","核对是否打印报错！", null, null, info, detail);
					},function(){
						$.endPageLoading();
						MessageBox.alert("告警提示","核对是否打印超时！");
				});	
			},
			errorFunc:function(code, info, detail){
				$.endPageLoading();
				MessageBox.error("错误提示","业务受理失败！", $.cssubmit.cancelAction, null, info, detail);	
			},
			timeoutFunc:function(){
				$.endPageLoading();
				MessageBox.alert("告警提示", "业务提交超时！", $.cssubmit.cancelAction);
				return false;
			},
			// 集团业务回调函数
			grpCallBack : function(data){
				var isPrint = false;// 打印标识
					
				//如果没有回调事件，继续按照默认进行业务受理信息展示
				var content = "点【确定】继续业务受理。";
				
				if(data && data != null && data.length > 0) {
					orderId = data.get(0).get("ORDER_ID") + "";
					content = "业务订单号：" + orderId + "<br/>" + "点【确定】继续业务受理。";
					
					if(data.get(0) && data.get(0).containsKey("PRINT_INFO")){
						isPrint = true;
					}
				}
				$.cssubmit.showMessage("success", "业务受理成功", content, isPrint);
				if(isPrint){
					$.printMgr.bindPrintEvent($.printMgr.grpPrintTrade);
				}
			}
		},
		//取消动作,解除提交禁用或配置参数
		cancelAction:function(){
			$.cssubmit.clearParam();
			$.cssubmit.disabledSubmitBtn(false);
			$.cssubmit.repeatFlag = false;
			
			// 页面流按钮
			if($("#bnext").length){
				$("#bnext").removeAttr("disabled");
			}
		},
		
		//禁用提交按钮
		//--------购物车
		disabledSubmitBtn:function(flag,buttonType){
		    if(buttonType){
			    var button = $("#CSSUBMIT_BUTTON");
			    if(buttonType=="shoppingCartButton"){
			       button = $("#ADD_SHOPPING_CART");
			    }
				$.cssubmit.disabledButton(flag,button);
			}else{
			    $.cssubmit.disabledButton(flag,$("#CSSUBMIT_BUTTON"));
			    if($("#ADD_SHOPPING_CART")){
			       $.cssubmit.disabledButton(flag,$("#ADD_SHOPPING_CART"));
			    }
			}
		},
		disabledButton:function(flag,button){
		   if(!button.length){
	          return;
		   }
		   if(flag == true){
			  button.attr("disabled", true).addClass("e_dis");
		   }else{
			  button.attr("disabled", false).removeClass("e_dis");
		   }
		},
		//------购物车
		//取消打印
		disabledPrint:function(flag){
			if(!$("#CSSUBMIT_BUTTON").length){
				return ;
			}
			if(flag == true){
				$("#CSSUBMIT_BUTTON").attr("isPrint", "false");
			}else{
				$("#CSSUBMIT_BUTTON").attr("isPrint", "true");
			}
		},
		
		//业务弹出框按钮事件
		closeMessage : function(succFlag, elecFlag) {
			if($("#SUBMIT_MSG_PANEL").length){
				$("#SUBMIT_MSG_PANEL").remove();
			}
			
			if(!succFlag){
				$.cssubmit.cancelAction();
				return;
			}	
			//清除费用数据
			if($.feeMgr){
				$.feeMgr.clearFee();
			}
			
			var affirmAction = $("#CSSUBMIT_BUTTON").attr("affirmAction");
			//如果有确认动作，则执行确认事件，否则刷新
			if(!elecFlag && affirmAction && affirmAction != ""){
				(new Function("return " + affirmAction + ";"))();
			}else{
				var href = window.location.href;
				if(href){
					if(href.lastIndexOf("#nogo") == href.length-5){
						href = href.substring(0, href.length-5);
					}
					var url = href.substring(0, href.indexOf("?"));
					var reqParam = href.substr(href.indexOf("?")+1);
					
					var paramObj = $.params.load(reqParam);
					paramObj.remove("SERIAL_NUMBER");
					paramObj.remove("DISABLED_AUTH");
					paramObj.remove("AUTO_AUTH");
					var param = paramObj.toString();
					window.location.href = url+"?"+param;
				}					
			}
		},

		/**提示信息
		showTmpMessage : function(result, title, content, isPrint) {
			if (!result) {
				result = "error";
			}
			if(!isPrint){
				isPrint = false;
			}
			content = content.replace(/\n/ig, "<br/>");
			if(result == "success"){
				var buttons = null;
				if(isPrint) buttons = {"ext0": "打印,print"};
				MessageBox.success("成功提示", title, function(btn){
					//点击确定按钮
					if(btn == "ok"){
						$.cssubmit.closeMessage(true);
					}else if(btn == "ext0"){
					//点击打印按钮
						$.cssubmit.printTrade();
						return false;
					}
				},buttons, content);
			}else{
				MessageBox.error("错误提示", title, function(btn){
					$.cssubmit.closeMessage();
				} ,null, content);
			}
		},*/
		/**
		* 自定义业务受理成功窗口按钮
		* 参数要求Json对象或数组 {} or []
		* {"name":"打印", "icon":"print", "fn": func}
		*  name		按钮名字
		*  icon		按钮icon,参考ECL中icon，如e_ico-print 只需传入print
		*  fn		按钮点击按钮触发事件，该函数有一个入参，即为业务受理成功后返回对象
		*  如果有多个按钮，以上面为原子结构，组织成数组传入
		*/
		bindCustomizeBtn:function(customizeBtns){
			var btns = [];
			if(customizeBtns instanceof Array){
				btns = customizeBtns;
			}else{
				btns.push(customizeBtns);
			}
			if(!$.cssubmit.customizeBtns){
				$.cssubmit.customizeBtns = [];
			}
			$.cssubmit.customizeBtns = $.cssubmit.customizeBtns.concat(btns);
		},
		//自定义按钮执行方法
		customizeBtnEvent:function(idx){
			var btnObj = $.cssubmit.customizeBtns[idx];
			if(btnObj["fn"]){
				btnObj["fn"]($.cssubmit.tradeData);
			}
		},
		
		//提示信息
		showMessage : function(result, title, content, isPrint) {
			if (!result) {
				result = "error";
			}
			if(!isPrint){
				isPrint = false;
			}
			var judgeTrade = ("error" == result);
			var msgPanel = $("#SUBMIT_MSG_PANEL");
			if (!msgPanel.length) {
				var msgArr = [];
				msgArr.push('<div id="SUBMIT_MSG_PANEL" class="c_popup">	');
				msgArr.push('<div class="c_popupWrapper">	');
				msgArr.push('<div class="c_popupHeight"></div>	');
				msgArr.push('<div class="c_popupBox">	');
				msgArr.push('<div class="c_popupTitle">	');
				msgArr.push('<div class="text">'	+ (judgeTrade ? "错误提示" : "成功提示")	+ 	'</div>	');
				msgArr.push('</div>	');
				msgArr.push('<div class="c_popupContent"><div class="c_popupContentWrapper">	');
				msgArr.push('<div class="c_msg c_msg-popup'+ (judgeTrade? "": " c_msg-success")+ '">	');
				msgArr.push('	<div id="SUBMIT_MSG_TITLE" class="title"></div>	');
				msgArr.push('	<div id="SUBMIT_MSG_CONTENT" class="content"></div>	');
				msgArr.push('</div>	');
				msgArr.push('<div id="SUBMIT_MSG_BTN" class="c_submit">	');
				//------购物车
				if($.cssubmit.clickButton.data=="addShoppingCart"){
					   msgArr.push('<button class="'+	(judgeTrade ? "e_button-page-cancel" : "e_button-page-ok")	+'" onclick="javascript:$.cssubmit.closeMessage('+(judgeTrade ? "" : "true")+');">	');
					   msgArr.push('<i class="e_ico-pre"></i><span>'	+(judgeTrade? "关闭" : "继续办理业务")+	'</span></button>	 ');
					   msgArr.push('<button  onclick=\"javascript:$.cssubmit.goShopping();\" class=\"e_button-page\"><i class=\"e_ico-aft\"></i><span>去结算</span></button>');
					}else{
					   msgArr.push('<button class="'+	(judgeTrade ? "e_button-page-cancel" : "e_button-page-ok")	+'" onclick="javascript:$.cssubmit.closeMessage('+(judgeTrade ? "" : "true")+');">	');
					   msgArr.push('<i></i><span>'	+(judgeTrade? "关闭" : "确定")+	'</span></button>	 ');
					}
				//------购物车
				if(!judgeTrade && isPrint){
					msgArr.push('<button  onclick=\"javascript:$.cssubmit.auth.checkAuth();\" class=\"e_button-page\"><i class=\"e_ico-print\"></i><span>打印</span></button>');
				}
				if($.cssubmit.customizeBtns){
					var name,icon;
					var btns = $.cssubmit.customizeBtns;
					for(var i=0; i<btns.length; i++){
						if(!btns[i]["name"]) continue;
						name = btns[i]["name"];
						icon = btns[i]["icon"]=""?"":"e_ico-"+btns[i]["icon"];
						msgArr.push('<button  onclick=\"javascript:$.cssubmit.customizeBtnEvent('+i+');\" class=\"e_button-page\"><i class=\"'+icon+'\"></i><span>'+name+'</span></button>');						
					}
				}
				msgArr.push('</div>	');
				msgArr.push('</div></div>	');
				msgArr.push('<div class="c_popupBottom"><div></div></div>	');
				msgArr.push('<div class="c_popupShadow"></div>	');
				msgArr.push('</div>	');
				msgArr.push('</div>	');
				msgArr.push('<iframe class="c_popupFrame"></iframe>	');
				msgArr.push('<div class="c_popupCover"></div>	');
				msgArr.push('</div>	');
				
				$(document.body).append(msgArr.join(""));
				msgPanel = $("#SUBMIT_MSG_PANEL");
				msgArr=null;
			}
			if (msgPanel.length) {
				var t = $("#SUBMIT_MSG_TITLE");
				if (t.length) {
					t.html((title ? title : ""));
				}
				var e = $("#SUBMIT_MSG_CONTENT");
				if (e.length) {
					e.html((content ? ("" + content).replace(/\n/ig, "<br />") : ""));
				}
				msgPanel.css("display", "");
			}
			msgPanel = null;
		},
		//------购物车
		goShopping : function(){
			var param = "&AUTO_AUTH=true&DISABLED_AUTH=true&SERIAL_NUMBER=";
			  if($.auth && $.auth.getAuthData()){
				 var user=$.auth.getAuthData().get("USER_INFO");
				 if(user && user.get("SERIAL_NUMBER")){
				    param += user.get("SERIAL_NUMBER");
				    param += "&ROUTE_EPARCHY_CODE="+user.get("EPARCHY_CODE");
				    param += "&USER_ID="+user.get("USER_ID");
				 }
			  }
			  openNav("购物车", "shopping.ShoppingCart","", param);
			},
		//-----购物车
		auth:{
			//查询业务类型数据及其他认证需要的数据，判断是否弹出校验认证框
			checkAuth:function(){ 
				//如果有权限，在不需要验证
				var isNoAuthPrt = $("#POP_AUTH_BEFORE_PRINT").attr("isNoAuthPrt");
				if(isNoAuthPrt == "true" || !$.auth  || ($.auth && (!$.auth.getAuthData() || !$.auth.getAuthData().containsKey("USER_INFO")) )){
					$.cssubmit.printTrade(true);
					return;
				}		

				//设置认证方式.如果无认证组件设置CHECK_MODE=Z，如果免认证则CHECK_MODE=F,需要更新台账表PROCESS_TAG_SET第20位
				var checkMode="Z";
				var serialNumber="";
				var authData = $.auth.getAuthData();
				if(authData && authData.containsKey("CHECK_MODE")){
					checkMode= authData.get("CHECK_MODE");
				}else{
					checkMode="F";
				}
				serialNumber = authData.get("USER_INFO").get("SERIAL_NUMBER");
				
				//如果是免认证，且无费用信息，则不需要认证
				if(checkMode != "F" || ($.feeMgr && $.feeMgr.getFeeList().length<1)){
					$.cssubmit.printTrade(true);
					return ;
				}
				
				var param = "&HANDLER=POP_AUTH_BEFORE_PRINT";
				param += "&SERIAL_NUMBER="+serialNumber;
				param += "&IDENTITY_CHECK_TAG=1000001";
				param += "&DISABLED_AUTH=false";
				param += "&PRINT_AUTH=true";
				
				$("#POP_AUTH_BEFORE_PRINT").attr("authParams", param);
				//弹出密码认证窗口
				$.cssubmit.auth.popAuthCheck(param);
			},
			//弹出认证窗口
			popAuthCheck:function(param){
				var authParams = param;
				if(!param) {
					authParams = $("#POP_AUTH_BEFORE_PRINT").attr("authParams");
				}
				$.popupPage("components.auth.AuthCheck", "init", authParams, "身份校验", "500", "135", "POP_AUTH_BEFORE_PRINT");	
			},
			//身份校验
			onUserCheck:function(){
				var handlerObj = $("#POP_AUTH_BEFORE_PRINT");
				var noUserPasswd="false", checkTag="1000001";
				var userInfo = $.auth.getAuthData().get("USER_INFO");
				if (userInfo && userInfo.get("USER_PASSWD")==""){
					noUserPasswd="true";
				}
				var param = "";	
				//鉴权认证公共入参
				var authData = $.auth.getAuthData();
				param += "&SERIAL_NUMBER="+authData.get("USER_INFO").get("SERIAL_NUMBER");
				param += "&USER_ID="+authData.get("USER_INFO").get("USER_ID");
				param += "&NO_USER_PASSWD="+noUserPasswd;

				/**
				 * 鉴权认证密码框返回入参
				 * [CHECK_MODE,PSPT_TYPE_CODE,USER_PASSWD,PSPT_ID,SIM_NO,VIP_ID,OWNER_PSPT_ID,IVR_PASS_SUCC,DISABLED_AUTH]
				 */
				param += handlerObj.val();
				$.beginPageLoading("认证校验。。。");
				$.httphandler.submit(null, "com.ailk.csview.common.component.usercheck.UserCheckHandler", "checkUser", param, 
					function(data){
						$.endPageLoading();
						$.cssubmit.auth.afterUserCheck(data);
					},function(code, info, detail){
						$.endPageLoading();
						MessageBox.error("错误提示","认证校验报错！",null, null, info, detail);
					},function(){
						$.endPageLoading();
						MessageBox.alert("告警提示","认证校验超时！");
				});
			},
			afterUserCheck:function(data){
				if (data.get("RESULT_CODE") !="0"){
					MessageBox.confirm("确认提示", data.get("RESULT_INFO")+"<br/>是否打印模糊化发票？", function(btn){
						if(btn == "ok"){
							$.cssubmit.printTrade(false);
							return;
						}else{
							if (data.get("IS_CLOSE") != "1"){
								$.cssubmit.auth.popAuthCheck();
							}
						}
					});
				}else{
					$.cssubmit.printTrade(true);
				}
			}		
		}		
	}});
	
	//执行初始化方法，将事件绑定到提交按钮上
	$($.cssubmit.init);
	window.flowSubmit = $.cssubmit.flowSubmit;
})(Wade);