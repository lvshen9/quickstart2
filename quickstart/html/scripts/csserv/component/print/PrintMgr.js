(function($){
	$.extend({printMgr:{
		printData:$.DatasetList(),
		printIndex: null,		//打印索引
		params: $.DataMap(),	//[PRT_TYPE,ONE_NOTE,ORDER_ID]
		printEvent: null,	 	//打印事件
		printParam: $.DataMap(),	//打印个性化参数
		
		//设定打印事件
		bindPrintEvent:function(func){
			$.printMgr.printEvent = func;
		},
		//设置特殊自定义打印参数
		addPrintParam:function(paramData){
			if(!paramData || !paramData.length){
				return;
			}
			paramData.eachKey(function(key, idx, total){
				$.printMgr.printParam.put(key, paramData.get(key));
			});
		},
		setPrintParam:function(key, value){
			if(!key || !value) return ;
			$.printMgr.printParam.put(key, value);
		},
		
		/**
		 * 获取打印数据,主要是在业务登记完成之后调用
		 * data[ORDER_ID, EPARCHY_CODE, GRP_PRINT, CHECK_MODE, CHECK_DESC, TRADE_TYPE_CODE]
		 * GRP_PRINT为集团标记个人这边没有，
		 * CHECK_MODE 认证校验方式，CHECK_DESC认证校验方式描述
		 * TRADE_ID 该键值自定义的打印，可能会传入，后续在一单清，票据查询，更新打印标记时候，会做特殊处理
		 */
		printTrade : function(tradeData){
			//如果存在打印数据，则直接打印，否则重新加载打印数据
			var infos = $.printMgr.getPrintData();
			if(infos && infos.length){
				$.printMgr.resetPrintFlag();	//重置打印标记
				$.printMgr.printReceipt();		//启动缓存打印数据
				return;
			}
			
			if(!tradeData && tradeData.length) return;
			//登记成功以后，可能返回的地州编码键值是DB_SOURCE，这里做一下特殊处理
			if(tradeData.containsKey("DB_SOURCE")){
				tradeData.put("EPARCHY_CODE", tradeData.get("DB_SOURCE"));
				tradeData.removeKey("DB_SOURCE");
			}
			
			// 集团打印标志
			var grpPrint = "0";
			
			if(tradeData.containsKey("GRP_PRINT")){
				grpPrint = tradeData.get("GRP_PRINT");
			}
			
			//拼接打印查询入参
			var param = "&ACTION=PRINT";
			tradeData.eachKey(function(key,index,totalcount){
				param += "&"+key+"="+tradeData.get(key);
			});
			
			if($.printMgr.printParam && $.printMgr.printParam.length){
				param += "&PRINT_PARAMS="+encodeURIComponent($.printMgr.printParam.toString());
			}
			if(top.document.getElementById("staffId") && top.$){
				param += "&NGBOSS_STAFF_ID="+top.$("#staffId").val();
			}
			if($("#TRADE_TYPE_CODE").val())
			{
				param += "&TRADE_TYPE_CODE="+$("#TRADE_TYPE_CODE").val();
			}
			
			$.beginPageLoading("加载打印数据。。。");
			ajaxSubmit(null, null, param, $.cssubmit.componentId, 
				function(data){
					$.endPageLoading();
					
					//设置打印数据
					var printDatas = null;
					if(grpPrint == "1"){
						printDatas = tradeData.get("PRINT_INFO");
					}else{
						printDatas = data.get("PRINT_DATA");
					}
					$.printMgr.setPrintData(printDatas);

					//公共参数数据
					$.printMgr.params.put("ORDER_ID", tradeData.get("ORDER_ID"));
					$.printMgr.params.put("PRT_TYPE", data.get("PRT_TYPE"));
					$.printMgr.params.put("ONE_NOTE", data.get("ONE_NOTE"));
					$.printMgr.params.put("EPARCHY_CODE", tradeData.get("EPARCHY_CODE"));
					$.printMgr.params.put("GRP_PRINT", grpPrint);
					
					//启动打印
					$.printMgr.printReceipt();
				},
				function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","加载打印数据错误！", null, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","加载打印数据超时！");
			});	
		},
		
		// 集团打印
		grpPrintTrade:function(dataset){
			var data = $.DataMap();
			if(dataset && dataset.length){
				data = dataset.get(0);
			}
			data.put("GRP_PRINT", "1");
			$.printMgr.printTrade(data);
		},
		
		//设置保存打印数据
		setPrintData : function(infos){
			$.printMgr.printData = infos;
		},
		//获取打印数据
		getPrintData : function(){
			return $.printMgr.printData;
		},
		//打印免填单
		printReceipt: function(){
			var infos = $.printMgr.getPrintData();
			if(!infos || infos.length == 0){
				MessageBox.alert("告警提示", "系统检索不到打印数据！");
				return;
			}
			infos.each(function(info, idx, total){
				$.printMgr.printIndex = idx;		//记录当前打印类型
				
				//当前已经确认打印或问询取消则打印下一条
				if(info.containsKey("PRT_FLAG") && info.get("PRT_FLAG") == "1"){
					return true;
				}
				$.printMgr.setPrintInfoFlag($.printMgr.printIndex);		//设置打印标识
				
				var printType = info.get("TYPE");
				var printName = info.get("NAME");
				if(printType.indexOf("01") >= 0 || printType.indexOf("02") >= 0){
					//单联票据打印
					var printId = info.containsKey("PRINT_ID")?info.get("PRINT_ID"):"";
					var tradeId = info.containsKey("TRADE_ID")?info.get("TRADE_ID"):$.printMgr.params.get("TRADE_ID");
					var eparchyCode = info.containsKey("EPARCHY_CODE")?info.get("EPARCHY_CODE"):$.printMgr.params.get("EPARCHY_CODE");
					if($.printMgr.params.containsKey("PRT_TYPE") && $.printMgr.params.get("PRT_TYPE") == "1") {
						//获取员工单联票据						
						$.staffNote.getPrintTicketInfo(printId, tradeId, info.get("TYPE"), 
									printName,eparchyCode,info.get("USER_EPARCHY_CODE"));
										
					}else{
						$.printMgr.printWithTip(info);
					}
				}else{
					if($.printMgr.params.containsKey("ONE_NOTE") 
							&& $.printMgr.params.get("ONE_NOTE") == "1"
								&& $.printMgr.params.get("GRP_PRINT") == "0" ) {
						//一单清打印
						$.printMgr.showOneNotePrint("是否立即打印"+printName+"？");
					}else{
						$.printMgr.printWithTip(info, 1);
					}
				}
				return false;
			});
		},
		getPrintInfoByIndex : function(idx){
			if(idx<0) return;
			var infos = $.printMgr.getPrintData();
			return infos.get(idx);
		},
		
		//更新打印标识
		setPrintInfoFlag : function(idx){
			if(idx<0) return;
			var infos = $.printMgr.getPrintData();
			var info = infos.get(idx);
			info.put("PRT_FLAG", "1");
		},
		//重置打印标识
		resetPrintFlag:function(){
			var printDatas = $.printMgr.getPrintData();
			if(!printDatas || !printDatas.length){
				return;
			}
			printDatas.each(function(item){
				item.put("PRT_FLAG", "0");
			});
		},
		//正常问询打印
		printWithTip : function(printInfo, prtTag){
			if(printInfo){
				var markTip = "";
				if("G0001"==printInfo.get("TYPE")){
					 markTip = " \n打印后不能打印增值税专票。";
				}
				MessageBox.confirm("确认提示", "是否要打印"+printInfo.get("NAME")+"?"+markTip, 
					function(btn){
						if(btn == "ok"){
							var printDoc = printInfo.get("PRINT_DATA");
							printDoc.put("TAX_NO", "");
							$.printMgr.startupPrint(printDoc);
							if(prtTag){
								$.printMgr.updataPrintTag();
							}
						}
						$.printMgr.printReceipt();
				});
			}
		},
		
		//单联票据打印逻辑
		printTicket:function(flag, taxNo){
			//如果取消则继续打印后面的免填单
			if(flag != 0) {
				var printInfo = $.printMgr.getPrintInfoByIndex($.printMgr.printIndex);
				var printDoc = printInfo.get("PRINT_DATA");
				if(flag> 0) {
					//单联票据拼接
					printDoc.put("TAX_NO", taxNo);
				}else{
					printDoc.put("TAX_NO", "");
				}
				$.printMgr.startupPrint(printDoc);
				printDoc = null;
				printInfo = null;
			}
			$.printMgr.printReceipt();
		},

		//受理单业务打印
		printNote:function(flag){
			$.printMgr.hideOneNotePrint();
			//如果取消则继续打印后面的免填单
			if(flag != 0) {
				var printInfo = $.printMgr.getPrintInfoByIndex($.printMgr.printIndex);
				$.printMgr.startupPrint(printInfo.get("PRINT_DATA"));
				printInfo = null;
				$.printMgr.updataPrintTag();
			}
			$.printMgr.printReceipt();
		},
		//关闭一单清打印问询
		hideOneNotePrint:function(){
			var panel = $("#OneNote_MSG_PANEL");
			if(panel && panel.length){
				panel.remove();
			}
		},
		//更新打印标记
		updataPrintTag:function() {
			var params = "&ACTION=UPD_PRINT_TAG&PRT_TAG=1";
			//融合业务涉及多笔打印合并，更新打印标记根据订单编号批量处理
			if($.printMgr.params.containsKey("ORDER_ID")){
				params += "&ORDER_ID="+$.printMgr.params.get("ORDER_ID");
			}else if($.printMgr.params.containsKey("TRADE_ID")){
				params += "&TRADE_ID="+$.printMgr.params.get("TRADE_ID");							
			}
			params += "&EPARCHY_CODE="+$.printMgr.params.get("EPARCHY_CODE");
			ajaxSubmit(null, null, params, $.cssubmit.componentId, 
				function(data){
					if(data && data.get("PRT_TAG_RESULT")) 
						MessageBox.success("信息提示","打印完毕!");
				},
				function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","更新打印标记报错！",null, null, info, detail);
			});
		},
		//弹出一单清打印查询界面
		popupOneNotePrint:function(){
			$.printMgr.hideOneNotePrint();
			var params = "&ORDER_ID="+$.printMgr.params.get("ORDER_ID");
			params += "&POP_TAG=true";
			params += "&EPARCHY_CODE="+$.printMgr.params.get("EPARCHY_CODE");
			if($.auth || $("#AUTH_SERIAL_NUMBER").length){
				params += "&SERIAL_NUMBER="+$("#AUTH_SERIAL_NUMBER").val();
			}
			//先判断是否有需要补打的业务
			$.popupPage('components.print.OneNotePrint', 'onInitTrade',params, '一单清打印', '800', '500');
		},
		
		//展示一单清提示问询窗口
		showOneNotePrint : function(title) {
			
			var msgPanel = $("#OneNote_MSG_PANEL");
			if (!msgPanel.length) {
				var msgArr = [];
				msgArr.push('<div id="OneNote_MSG_PANEL" class="c_popup">	');
				msgArr.push('<div class="c_popupWrapper">	');
				msgArr.push('<div class="c_popupHeight"></div>	');
				msgArr.push('<div class="c_popupBox">	');
				msgArr.push('<div class="c_popupTitle">	');
				msgArr.push('<div class="text">打印提示</div>	');
				msgArr.push('</div>	');
				msgArr.push('<div class="c_popupContent"><div class="c_popupContentWrapper">	');
				msgArr.push('<div class="c_msg c_msg-popup">	');
				msgArr.push('<div class="title">'+title+'</div>	');
				msgArr.push('<div class="c_submit">	');
				msgArr.push('<button id="ONE_OPRT" class="e_button-form" onclick="javascript:$.printMgr.printNote(1);"><i class="e_ico-print"></i><span>打印</span></button>	');
				msgArr.push('<button id="ONE_NPRT" class="e_button-form" onclick="javascript:$.printMgr.popupOneNotePrint();"><i class="e_ico-print"></i><span>一单清打印</span></button>	');
				msgArr.push('<button id="ONE_CPRT" class="e_button-form" onclick="javascript:$.printMgr.printNote(0);"><i class="e_ico-cancel"></i><span>取消</span></button>	');
				msgArr.push('</div>	');
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
				msgPanel = $("#OneNote_MSG_PANEL");
				msgArr=null;
			}
			msgPanel.css("display", "");
			msgPanel = null;
		},
		
		//启动打印
		startupPrint : function(data){
			if(!data) return;
			//第一次进来时候，TEMP_PATH只是一个相对地址，需要加上前缀，组成全路径
			if((data.get("TEMP_PATH")).indexOf("http")== -1){
				//获取文档打印url地址
				var href = window.location.href;
				var idx = href.lastIndexOf("/?");
				if(idx == -1){
					href = href.substring(0, href.indexOf("?"));
					idx = href.lastIndexOf("/");
				}
				href = href.substring(0, idx);
				data.put("TEMP_PATH", href+"/"+data.get("TEMP_PATH"));
			}
			var prtDatas = $.DatasetList();
			prtDatas.add(data);
			var ocx = null;
			try{
		   		ocx = new ActiveXObject("Wade3Printer.Printer");
				if(ocx){
					ocx.DoPrint(prtDatas.toString());
				}else{
					MessageBox.alert("告警提示", "打印控件不存在！");
				}
		    }catch(e){
		    	MessageBox.alert("告警提示","打印控件未安装或版本已升级，请到首页下载安装最新的打印控件.");
		    }
		}
	},
	//员工票据
	staffNote:{
		repeatFlag: false,
		ticketParam: null,	//票据参数
		
		//获取单联票据
		getPrintTicketInfo:function(printId, tradeId, printType, name,eparchyCode,userEparchy){
			if(!$.staffNote.ticketParam) $.staffNote.ticketParam = $.DataMap();
			$.staffNote.ticketParam.clear();
			$.staffNote.ticketParam.put("PRINT_ID", printId);
			$.staffNote.ticketParam.put("TRADE_ID", tradeId);
			$.staffNote.ticketParam.put("EPARCHY_CODE", eparchyCode);
			
			var param = "&ACTION=GET_TICKET";
			param += "&PRINT_TYPE="+printType;
			param += "&EPARCHY_CODE="+eparchyCode;
			if(userEparchy){
				param += "&USER_EPARCHY_CODE="+userEparchy;
				$.staffNote.ticketParam.put("USER_EPARCHY_CODE", userEparchy);
			}
			$.beginPageLoading("加载员工票据。。。");
			ajaxSubmit(null, null, param, $.cssubmit.componentId, 
				function(data){
					$.endPageLoading();
					$.staffNote.ticketParam.put("TEMPLET_TYPE", data.get("TEMPLET_TYPE"));		//票据类型[01,02]
					$.staffNote.createStaffNote(data, name);
				},
				function(code, info, detail){
					$.endPageLoading();
					//MessageBox.alert("告警提示","获取员工票据数据错误！", null, null, info, detail);
					//未分配获取员工票据数据错误
					var m = $.DataMap("{\"PRIV\":\"true\",\"TAX_NO\":\"\",\"TICKET_ID\":\"\"}");
					$.staffNote.createStaffNote(m, name);
					
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","获取员工票据数据超时！");
			});	
		},
		//创建单联票据窗口
		createStaffNote:function(info,name){
			var cssStyle = "none";
			if(info.get("PRIV") == "true") cssStyle="";
			var msgPanel = $("#StaffNote_MSG_PANEL");
			if (!msgPanel.length) {
				var msgArr = [];
				msgArr.push('<div id="StaffNote_MSG_PANEL" class="c_popup">	');
				msgArr.push('<div class="c_popupWrapper">	');
				msgArr.push('<div class="c_popupHeight"></div>	');
				msgArr.push('<div class="c_popupBox">	');
				msgArr.push('<div class="c_popupTitle">	');
				msgArr.push('<div class="text">单联票据打印</div>	');
				msgArr.push('</div>	');
				msgArr.push('<div class="c_popupContent"><div class="c_popupContentWrapper">	');
				msgArr.push('<div class="c_msg c_msg-popup">	');
				
				msgArr.push('	<div class="c_msg c_msg-confirm">	');
				msgArr.push('		<div class="title"><span>是否打印'+name+'？</span></div>	');
				msgArr.push('	</div>	');
				msgArr.push('	<div class="c_form c_form-col-2">	');
				msgArr.push('		<ul class="ul">	');
				msgArr.push('			<li class="li">	');
				msgArr.push('				<span class="label">发票代码：</span>	');
				msgArr.push('				<span class="e_input"><span><input type="text" id="STAFF_TAX_NO" value="'+info.get("TAX_NO")+'" /></span></span>	');
				msgArr.push('			</li>	');
				msgArr.push('			<li class="li">	');
				msgArr.push('				<span class="label">发票号码：</span>	');
				msgArr.push('				<span class="e_input"><span><input type="text" id="STAFF_TICKET_ID" value="'+info.get("TICKET_ID")+'" /></span></span>	');
				msgArr.push('			</li>	');
				msgArr.push('		</ul>	');
				msgArr.push('	</div>	');
				msgArr.push('	<div class="c_submit">	');
				msgArr.push('		<button type="button" onclick="$.staffNote.submitPrint(-1)" style="dispaly:'+cssStyle+'" id="O_PRT" class="e_button-page"><i class="e_ico-print"></i><span>原票据打印</span></button>	');
				msgArr.push('		<button type="button" onclick="$.staffNote.submitPrint(1)" id="N_PRT" class="e_button-page"><i class="e_ico-print"></i><span>单联票据打印</span></button>	');
				msgArr.push('		<button type="button" onclick="$.staffNote.submitPrint(0)" id="C_PRT"  class="e_button-page-cancel"><i class="e_ico-cancel"></i><span>取消</span></button>	');
				msgArr.push('	</div>	');
				
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
				msgPanel = $("#StaffNote_MSG_PANEL");
				msgArr=null;
			}
			msgPanel.css("display", "");
			msgPanel = null;
			
		},
		//提交单联票据打印
		submitPrint:function(flag) {
			if(flag < 1){
				$("#StaffNote_MSG_PANEL").remove();
				$.printMgr.printTicket(flag);
				return;
			}
			if(!$.staffNote.chkTicket(flag)) return;
			if($.staffNote.repeatFlag) return;		//防止重复提交
			$.staffNote.repeatFlag = true;
			var ticket = $("#STAFF_TICKET_ID").val();
			var parameter = "&ACTION=TICKET_LOG";
			parameter += "&TAX_NO=" + $("#STAFF_TAX_NO").val();
			parameter += "&NOTE_NO=" + ticket;
			var ticketData = $.staffNote.ticketParam;
			if(ticketData && ticketData.length){
				ticketData.eachKey(function(key, idex, total){
					parameter += "&"+key+"="+ticketData.get(key);
				});
			}
			$.beginPageLoading("记录单联票据日志。。。");
			ajaxSubmit(null, null, parameter, $.cssubmit.componentId,
				function(data){
					$.endPageLoading();
					$.staffNote.repeatFlag = false;
					if(!data || data.get("RESULT_CODE")!="0"){
						MessageBox.error("错误提示","记录单联票据日志错误！");
						return;
					}
					$("#StaffNote_MSG_PANEL").remove();
					$.printMgr.printTicket(flag, ticket);
				},
				function(code, info, detail){
					$.endPageLoading();
					$.staffNote.repeatFlag = false;
					MessageBox.error("错误提示","记录单联票据日志错误！", null, null, info, detail);
				},function(){
					$.endPageLoading();
					$.staffNote.repeatFlag = false;
					MessageBox.alert("告警提示","记录单联票据日志超时！");
			});
		},
		//校验输入票据
		chkTicket:function(flag) {
			if(flag<=0) return true;
			var tax = $("#STAFF_TAX_NO");
			if(tax && tax.val() == "") {
				alert("发票代码不能为空！");
				tax.focus();
				return false;
			}
			var ticket = $("#STAFF_TICKET_ID");
			if(ticket && ticket.val() == "") {
				alert("发票号码不能为空！");
				ticket.focus();
				return false;
			}
			return true;
		}
	}});

})(Wade);