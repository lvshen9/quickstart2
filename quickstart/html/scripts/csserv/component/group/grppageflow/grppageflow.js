function flowSubmit() {

	$.beginPageLoading("业务受理中...");
	var clazz = $('#PAGEFLOW_HTTPHANDLER_CLAZZ').val();
	
	var submitData = window.getFlow().getSubmitData();
	
	// 添加费用信息
	if($.feeMgr){
		submitData = submitData + "&X_TRADE_FEESUB=" + $.feeMgr.getFeeList() + "&X_TRADE_PAYMONEY=" + $.feeMgr.getPayModeList();
	}
	
	if(clazz && clazz != null && clazz != ''){
	
		Wade.httphandler.submit("", clazz, "submit", submitData, function(data){ 
		    $.endPageLoading();
			successgrppageflow(data);
			
		},function(error_code,error_info,derror){
			showDetailErrorInfo(error_code,error_info,derror);
			$("#bnext").removeAttr("disabled");
			$.endPageLoading();
		});
	}else{
		$.ajax.submit("", "submit", submitData, null, function(data){
			$.endPageLoading();
			successgrppageflow(data);
			
		},function(error_code,error_info,derror){
			showDetailErrorInfo(error_code,error_info,derror);
			$("#bnext").removeAttr("disabled");
			$.endPageLoading();
		});
	
	}
}


function successgrppageflow(data) {

	var orderId = "";
	
	var isPrint = false;// 是否打印
	
	var printList = null;// 打印信息
	
	var content = "点【确定】继续业务受理。"
	if(data && data != null) {
		orderId = data.get(0).get("ORDER_ID")+"";
		content = "业务订单号：" + orderId + '<br/>' + "点【确定】继续业务受理。";
		
		printList = data.get(0).get("PRINT_INFO");
		
		if(printList != null && printList != "" && printList != "[]"){
			isPrint = true;
		}
	}
	
	MessageBox.success("业务受理", "业务受理成功!", function(btn){
		if (btn == "ok") {
			window.getFlow().cleanup();
			window.location.reload(true);
		} else if (btn == "ext0") {
			$.printMgr.setPrintData(printList);
			$.printMgr.printReceipt();
		}
	}, isPrint ? {"ext0":"打印,print"} : null,content);

	// 提交完成后清空费用信息
	if($.feeMgr){
		$.feeMgr.clearFeeList();
	}
}

function failgrppageflow(i,e) {
	alert(e);
}

