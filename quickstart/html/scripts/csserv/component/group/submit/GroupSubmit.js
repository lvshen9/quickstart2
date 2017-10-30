(function(){
	window["GroupSubmit"] = {};
	
	GroupSubmit.submit = function(){
		var beforeAction = $("#BEFORE_ACTION").val();
		var afterAction = $("#AFTER_ACTION").val();
		
		var submitArea = $("#SUBMIT_AREA").val();
		var refreshArea = $("#REFRESH_AREA").val();
		var submitParam = $("#SUBMIT_PARAM").val();
		
		var listener = "onSubmitBaseTrade";
		
		// 提交前的方法
		if(beforeAction != null && beforeAction != ""){
			if(!eval(beforeAction)) return false;
		}
		
		var submitValue = "";
		
		if(submitParam && submitParam != null && submitParam != ""){
			var arrayParam = submitParam.split(",");
			
			for(var i = 0; i < arrayParam.length; i++){
      			submitValue += "&" + arrayParam[i] + "=" + $("#" + arrayParam[i]).val();
    		}
		}
		
		// 添加费用信息
		if($.feeMgr){
			submitValue = submitValue + "&X_TRADE_FEESUB=" + $.feeMgr.getFeeList() + "&X_TRADE_PAYMONEY=" + $.feeMgr.getPayModeList();
		}
		
		$.beginPageLoading("业务提交中.........");
		
		$.ajax.submit(submitArea, listener, submitValue, refreshArea, GroupSubmit.succSubmit, GroupSubmit.errorSubmit);
		
	}
	
	GroupSubmit.succSubmit = function(data){
		$.endPageLoading();
		
		$("#groupSubmit").attr("disabled", true);
		$("#groupSubmit").addClass("e_dis");
		
		var content = "点【确定】继续业务受理";
		
		var isPrint = false;
		
		if(data && data != null){
			var orderId = data.get(0).get("ORDER_ID") + "";
			
			content = "业务订单号：" + orderId + '<br/>' + content;
			
			printList = data.get(0).get("PRINT_INFO");
		
			if(printList != null && printList != "" && printList != "[]"){
				isPrint = true;
			}
		}
		
		MessageBox.success("业务受理成功", content, 
			function(btn){
				if (btn == "ok") {
					window.location.reload(true);
				}else if (btn == "ext0") {
					$.printMgr.setPrintData(printList);
					$.printMgr.printReceipt();
				}
			}, isPrint ? {"ext0":"打印,print"} : null);
		
		// 清空费用信息
		if($.feeMgr){
			$.feeMgr.clearFeeList();
		}
	}
	
	GroupSubmit.errorSubmit = function(error_code, error_info, error_detail){
		$.endPageLoading();
		showDetailErrorInfo(error_code, error_info, error_detail);
	}
	
}
)();