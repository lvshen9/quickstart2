function runJlcu() {
	$.beginPageLoading("开始执行");
	ajaxSubmit('RunCond','runJlcu',null,'ResultPart');
	$.endPageLoading();
}