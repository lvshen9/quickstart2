function getInterfaceById(theid) {
	
	$.beginPageLoading("数据查询中..");
	$.ajax.submit('QueryCondPart', 'getInterfaceInfos', '', 'QueryCondPart,InterfaceResultPart', function(data){
		$.endPageLoading();
	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
    
}

function getSceneById(theid) {
	if(!$.validate.verifyAll("QueryCondPart")) {
		return false;
	}
	
	$.beginPageLoading("数据查询中..");
	$.ajax.submit('QueryCondPart', 'getSceneInfoById', '', 'QueryCondPart', function(data){
		$.endPageLoading();
	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
}

function invokeInterface() {
	if(!$.validate.verifyAll("QueryCondPart,PageInfoCondPart")) {
		return false;
	}
	
	var ischecked =  $("#cond_ISCHECKED").attr("checked");
	if(ischecked) {
		var count = $("#cond_PAGE_COUNT").val();
		var size = $("#cond_PAGE_SIZE").val();
		var current = $("#cond_PAGE_CURRENT").val();
		/**
		if(count == "" || size == "" || current == "") {
			alert('当前为分页查询，分页信息不能为空!');
			return false;
		}
		*/
		if(!$.verifylib.checkPInteger(count) || !$.verifylib.checkPInteger(size) || !$.verifylib.checkPInteger(current)) {
			alert('分页信息必须为正整数!');
			return false;
		}
	}
		
	$.beginPageLoading("接口调用中..");
	$.ajax.submit('IntfCheckedCondPart,QueryCondPart,PageCheckedCondPart,PageInfoCondPart', 'invokeInterface', '', 'InterfaceResultPart', function(data){
		$.endPageLoading();
	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
}

function invokeIBossInterface() {
	if(!$.validate.verifyAll("QueryCondPart")) {
		return false;
	}
	
	$.beginPageLoading("接口调用中..");
	$.ajax.submit('QueryCondPart', 'invokeIBossInterface', '', 'InterfaceResultPart', function(data){
		$.endPageLoading();
	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
}


function getInterfaceBySubsys(theid) {
	$.beginPageLoading("数据查询中..");
	$.ajax.submit('QueryCondPart', 'getInterfaceBySubsys', '', 'QueryCondPart,InterfaceResultPart', function(data){
		$.endPageLoading();
	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
}

function clickPagination() {
 	var ischecked =  $("#cond_ISCHECKED").attr("checked");
 	//alert(ischecked);
 	if(!ischecked) {
 		//alert('1111111');
 		$("#DIV_PAGE_INFO").attr("style", "display:none");
 	}else {
 		$("#DIV_PAGE_INFO").attr("style", "display:block");
 		
 		var count = $("#cond_PAGE_COUNT").val();
		var size = $("#cond_PAGE_SIZE").val();
		var current = $("#cond_PAGE_CURRENT").val();
		
		if(count == "") {
 			$("#cond_PAGE_COUNT").val("0");
 		}
 		if(size == "") {
			$("#cond_PAGE_SIZE").val("10");
		}
		if(current == "") {
			$("#cond_PAGE_CURRENT").val("1");
		}
 	}
}


function clickIntf(elementId) {
	if(elementId == "cond_HTTP") {
		$("#cond_IBOSS_LD").attr("checked", false);
		$("#cond_IBOSS_FQ").attr("checked", false);
	}else if(elementId == "cond_IBOSS_LD") {
		$("#cond_HTTP").attr("checked", false);
		$("#cond_IBOSS_FQ").attr("checked", false);
	}else if(elementId == "cond_IBOSS_FQ") {
		$("#cond_HTTP").attr("checked", false);
		$("#cond_IBOSS_LD").attr("checked", false);
	}
}