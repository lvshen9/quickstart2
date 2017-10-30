//查询订单信息
function queryTradeInfo()
{
   if(checkQueryTradeInfo()) {
	   if(!verifyAll('QueryPart'))
	   {
		   return false;
	   }
	  	$.beginPageLoading("数据查询中..");
	     $.ajax.submit('QueryCondPart', 'queryTradeInfo', null, 'TradeTablePart',function(data){
			$.endPageLoading();
		},
		function(error_code,error_info){
			$.endPageLoading();
			alert(error_info);
			window.location.href = window.location.href; 
	    });
	}
 }

 function checkQueryTradeInfo()
 {
 	var result = true;
 	
 	if(($("#cond_ORDER_ID").val() == "" || $("#cond_ORDER_ID").val() == null) && ($("#cond_TRADE_ID").val() == "" || $("#cond_TRADE_ID").val() == null)&& ($("#cond_SERIAL_NUMBER").val() == "" || $("#cond_SERIAL_NUMBER").val() == null) ) {
		alert('服务号码/主订单标识/子订单标识不能同时为空!');
		$("#cond_SERIAL_NUMBER").focus();
		return false;
	}	
	return result;
 }
 

function queryError() {
	//获取选择行的数据
	var rowData = $.table.get("tradeTable").getRowData();
	
	var tradeId = rowData.get("TRADE_ID");
	var routeId = rowData.get("ROUTE_ID");
	var inputData =new Wade.DataMap();
	inputData.put("TRADE_ID",tradeId);
	inputData.put("ROUTE_ID",routeId);
	
	//var tradestate = rowData.get("SUBSCRIBE_STATE").substr(1,1);
	
	//if((tradestate == "M") || (tradestate == "6")) {
		var param = "&TRADE_TABLE=" + inputData;
		$.beginPageLoading("数据查询中..");
	 	$.ajax.submit('TradeTablePart', 'qryErrorMsg', param, 'errorMsgPart', function(data){
			$.endPageLoading();
		},
		function(error_code,error_info){
			$.endPageLoading();
			alert(error_info);
	    });
//	}else {
//		alert('此工单状态暂不支持查询!');
//	}
}


function tradPf() {
	//获取选择行的数据
	var rowData = $.table.get("tradeTable").getRowData();
	
	var orderstate = rowData.get("ORDER_STATE");
	var tradestate = rowData.get("SUBSCRIBE_STATE");
	var orderId = rowData.get("ORDER_ID");
	var tradeId = rowData.get("TRADE_ID");

	if((orderstate == "3") || (tradestate == "6") || (tradestate == "M")) {
		var param = "&TRADE_TABLE=" + rowData;
		$.beginPageLoading("工单状态修改中..");
	 	$.ajax.submit('TradeTablePart', 'tradePfAgain', param, 'errorMsgPart', function(data){
			$.endPageLoading();
			alert('工单状态修改成功,等待AEE完工![ORDER_ID=' + orderId + ',TRADE_ID=' + tradeId + ']');
		},
		function(error_code,error_info){
			$.endPageLoading();
			alert(error_info);
	    });
	}else {
		alert('sorry,此状态工单暂不支持重跑!!');
	}
}

function queryTradeStateInfo()
{
	if(checkQueryTradeStateInfo()) {
		   if(!verifyAll('QueryPart'))
		   {
			   return false;
		   }
		  	$.beginPageLoading("数据查询中..");
		     $.ajax.submit('QueryCondPart', 'queryTradeState', null, 'TradeStateResultPart',function(data){
				$.endPageLoading();
			},
			function(error_code,error_info){
				$.endPageLoading();
				alert(error_info);
				window.location.href = window.location.href; 
		    });
		}
}

function checkQueryTradeStateInfo()
{
	var result = true;
	
	if(($("#cond_TRADE_ID").val() == "" || $("#cond_TRADE_ID").val() == null) ) {
		alert('子订单标识不能为空!');
		$("#cond_ORDER_ID").focus();
		return false;
	}	
	return result;
}
