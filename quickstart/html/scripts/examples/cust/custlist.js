function queryCusts() {
	$.beginPageLoading("开始查询");
	ajaxSubmit('QueryCond','queryCusts',null,'QueryPart');
	$.endPageLoading();
}

function editCust() {
	ajaxSubmit('EditPart','editCust',null,null,function(d){
		if (d.get(0)) {
			$.showSucMessage("操作成功");
		} else {
			$.showErrorMessage("操作失败", i);
		}
	},function(e,i){
		$.showErrorMessage("操作失败", i);
	});
}

