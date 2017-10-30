(function($){
	$.extend({"oneNotePrint":{
		checkPrintTrade:function(){
			if($("#SELALL").attr("checked")){
				$("input[name=PRINT_TRADEID]").attr("checked", true);
			}else{
				$("input[name=PRINT_TRADEID]").attr("checked", false);
			}
		},
		
		queryPrintTrade:function() {
			var sn=$("#SERIAL_NUMBER");
			sn.val($.trim(sn.val()));
			if(!$.validate.verifyField(sn[0])){
				return false;
			}
			$.beginPageLoading("查询一单清业务。。。");
			$.ajax.submit("UserPart", "queryPrintTrades", "", "UserPart,PrintListPart", 
				function(data){
					$.endPageLoading();
					if($("#POP_TAG").val()=="true"){
						$.resizeHeight();    //调整窗口大小
					}
				},
				function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","查询一单清业务错误！",null, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","查询一单清业务超时！");
			});
		},
		
		getPrintInfo:function() {
			var my = this;
			var trades = $("input[name='PRINT_TRADEID']:checked");
			if(!trades || trades.length == 0){
				MessageBox.alert("告警提示", "请选择要打印的一单清业务信息！");
				return false;
			}
			if(trades.length>5){
				MessageBox.alert("告警提示", "一单清合并打印一次最多只能选择5条业务信息！");
				return false;
			}
			var tradeArray = [];
			trades.each(function(){
				tradeArray.push($(this).val());		
			});
			var tradeIds = tradeArray.join(",");
			$("#TRADEIDS").val(tradeIds);
			var param = "&PRINT_TRADES="+ tradeIds;
			
			$.beginPageLoading("加载一单清打印数据。。。");
			$.ajax.submit("UserPart", "getOneNotePrintData", param, "", function(data){
				$.endPageLoading();
				if(data && data.containsKey("PRINT_DATA")){
					$.printMgr.startupPrint(data.get("PRINT_DATA"));
					//更新打印标记
					my.updataPrintTag();
				}else{
					MessageBox.alert("告警提示","获取不到打印数据！");
				}
			},
			function(code, info, detail){
				$.endPageLoading();
				MessageBox.error("错误提示","加载一单清打印数据错误！",null, null, info, detail);
			},function(){
				$.endPageLoading();
				MessageBox.alert("告警提示","加载一单清打印数据超时！");
			});
		},
		//更新打印标记
		updataPrintTag:function() {
			//一单清打印标记RPT_TAG=2
			var params = "RPT_TAG=2&&TRADE_ID="+$("#TRADEIDS").val();
			$.ajax.submit("UserPart", "updataPrintTag", params, null, 
				function(data){
					if(data && data.get("PRT_TAG_RESULT")){
						MessageBox.success("信息提示","打印完毕!");
					}
					var tradeList = $("input[name='PRINT_TRADEID']:checked");
					tradeList.each(function(){
						var data = $.DataMap();
						var tradeSet = $(this).parent().siblings();
						$(tradeSet[4]).text("已打印");
						$(tradeSet[11]).text("2");
					});
				},
				function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","更新打印标记报错！",null, null, info, detail);
			});
		},
		closeOneNote:function(){
			//判断是否从打印弹出窗口链接过来
			var popTag  = $("#POP_TAG").val();
			if(popTag=="true"){
				//关闭一单清窗口
				$.setReturnValue(null, true);
			}
		}
	}});	
})(Wade);

$(document).ready(function(){
	//如果是弹出的一单清打印窗口，切服务号码不为空，自动去加载一单清打印业务
	var popTag  = $("#POP_TAG").val();
	if($("#SERIAL_NUMBER").val()!= "" && popTag=="true"){
		$.oneNotePrint.queryPrintTrade();
	}
});
