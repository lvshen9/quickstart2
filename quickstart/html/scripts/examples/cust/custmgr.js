function queryCusts() {
	$.beginPageLoading("开始查询");
	ajaxSubmit('QueryCond','queryCusts',null,'QueryPart');
	$.endPageLoading();
}

function checkCustName() {
	var rs1 = ajaxCheck('QueryCond','checkCustName',null,null,null);
	alert("checkCustName:"+rs1.rscode()+"|"+rs1.rsinfo());
	
	var rs2 = ajaxCheck('QueryCond','checkCustId',null,'code','info');
	alert("checkCustId:"+rs2.rscode()+"|"+rs2.rsinfo());
}

function queryCust(vipId, custId) {
	ajaxSubmit('examples.cust.CustMgr','queryCust','&VIP_ID='+vipId+'&CUST_ID='+custId,'EditPart',null,function(d){
		$.showErrorMessage("查询不到数据");
	});
}

//提交类可以使用Wade.httphandler.submit以提高效率,避免页面对象Render
function editCust() {
	$.beginPageLoading("数据提交中...");
	if (verifyAll('createarea')) {
		//Wade.httphandler.submit(提交区域,类名,方法名,扩展参数,回调方法,错误方法)
		Wade.httphandler.submit('EditPart','com.ailk.quickstart.view.examples.cust.CustMgrHandler','editCust','&a=b',function(d){
			if (d.get(0)) {
				$.showSucMessage("操作成功");
			} else {
				$.showErrorMessage("操作失败");
			}
		},function(e,i){
			$.showErrorMessage("操作失败");
		});
	}
	$.endPageLoading();
}

//同步导入
function importData() {
	$.beginPageLoading("开始导入...");
	ajaxSubmit('ImpExpPort','importDataByFile',null,'ImpExpPort',function(d){
		var sucCount = d.get("SUC_COUNT");
		var errCount = d.get("ERR_COUNT");
		var url = d.get("ERR_URL");
		
		var msg = "";
		if (errCount != "0") {
			msg = "成功导入["+sucCount+"]条,失败["+errCount+"]条,失败数据<a href='"+url+"' target='_blank'>下载</a>";
		} else {
			msg = "导入成功";
		}
		
		MessageBox.success("文件导入",msg,function(btn) {
			if (btn == "ext0") {
				window.open(url);
			}
		},{"ext0":"下载,download"});
		$.endPageLoading();
	},function(e,i){
		$.showErrorMessage("导入失败");
		$.endPageLoading();
	});
}

//同步导出
function exportData() {
	$.beginPageLoading("开始导出...");
	ajaxSubmit('QueryCond','exportDataToFile',null,null,function(d){
		if (d && d.get("url")) {
			window.open(d.get("url"));
		}
		$.endPageLoading();
	},function(e,i){
		$.showErrorMessage("导出失败");
		$.endPageLoading();
	});
}

function checkTableRow(chk) {
	if (chk.attr("checked") == true) {
		chk.attr("rowIndex", $.table.get("CustTable").getTable().attr("selected"));
	}
}

function tableRowClick() {
	var rowData = $.table.get("CustTable").getRowData();
	alert("当前选中先的CUST_ID=" + rowData.get("CUST_ID"));
	
	var td = $.table.get("CustTable").getSelected("CUST_ID");
	$("#custids",td[0]).attr("checked",true);
}

function tableRowDBClick() {
	var td = $.table.get("CustTable").getSelected("CUST_NAME");
	queryCust($("a:first",td[0]).attr('vipId'), $("a:first",td[0]).attr('custId'));
}
function tableAddRow(e) {$.table.get("CustTable").addRow(e);};
function tableDeleteRow(e) {$.table.get("CustTable").deleteRow();};
function tableCleanRow(e) {$.table.get("CustTable").cleanRow(e);};
function tableCleanRows(e) {$.table.get("CustTable").cleanRows(e);};
function addTableRow() {
	var custEdit = $.ajax.buildJsonData("EditPart");
	if (!$.table.get("CustTable").isPrimary("CUST_ID,VIP_ID", custEdit)) {
		custEdit["CUST_NAME"]='<a href="javascript:void(0)" vipId="'+custEdit["VIP_ID"]+'" custId="'+custEdit["CUST_ID"]+'" onclick=queryCust($(this).attr("vipId"),$(this).attr("custId"));>'+custEdit["CUST_NAME"]+'</a>';
		custEdit["CHK_CUST_ID"]='<input type="checkbox" id="custids" name="custids" value="' + custEdit["CUST_ID"] + '"/>';
		custEdit["VIP_TYPE_CODE_DESC"]=$("#VIP_TYPE_CODE").find("option:selected").text();
		
		//如果添加行但不想更新状态则传四个参数,示例如:$.table.get("CustTable").addRow(custEdit, null, null, false);
		$.table.get("CustTable").addRow(custEdit);
	} else {
		alert("添加失败");
	}
}
function updateTableRow() {
	var custEdit = $.ajax.buildJsonData("EditPart");
	$.table.get("CustTable").updateRow(custEdit, null);
}
function deleteTableRow() {
	var tab = $.table.get("CustTable");
	tab.deleteRow(tab.getTable().attr("selected"));
}
function deleteTableRows() {
	var tab = $.table.get("CustTable");
	
	$("input:checked", tab.getTable()[0]).each(function(idx, item){
		var row = $(item).parent().parent();
		if (item.checked)
			tab.deleteRow(row);
	});
}
function getTableData() {
	var data = $.table.get("CustTable").getTableData(null, true);
	alert("获取全表数据:"+data);
	
	var data1 = $.table.get("CustTable").getTableData("CUST_ID", false);
	alert("仅获取修改的数据:"+data1);
}
//id:domid
function importBeforeAction(domid) {
	alert("点击[开始导入]按钮时执行的JS方法importBeforeAction");
	return true;
}
//oper: 终止：terminate
function importAction(oper, domid) {
	if (oper == "stop") {
		alert("点击[终止]按钮时执行的JS方法importAction");
	}
	return true;
}
//id:domid
function exportBeforeAction(domid) {
	alert("点击[导出]按钮时执行的JS方法exportBeforeAction,在这里可以用JS动态设置传到后台的参数");
	$.Export.get(domid).setParams("&a=a&b=b");
	return true;
}
//oper: 取消：cancel；终止：terminate；状态修改中的 确定：loading；导出完成后的确定：ok；导出失败时的确定：fail；
function exportAction(oper, domid) {
	if (oper == "cancel") {
		alert("点击[取消]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "terminate") {
		alert("点击[终止]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "loading") {
		alert("点击[加载]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "ok") {
		alert("成功时点击[确定]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "fail") {
		alert("失败时点击[确定]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} 
	return true;
}

function afterPopupAction() {
	alert("Popup的afterPopupAction调用");
}