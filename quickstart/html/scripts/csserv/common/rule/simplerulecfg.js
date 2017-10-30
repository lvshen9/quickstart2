function changeRuleTwigCode() {
	var ruleTwigCode = $("#RULE_TWIG_CODE").val();

	if(ruleTwigCode == "1") {
		$("#SCRIPT_PATH").val("com.ailk.personserv.service.rule.loadcheckdata.LoadCheckData" + $("#TRADE_TYPE_CODE").val());
		$("#SCRIPT_METHOD").val("run");
		$("#SCRIPT_PATH").attr("disabled", true);
	}
	else{
		$("#SCRIPT_PATH").val("com.ailk.personserv.service.rule.");
		$("#SCRIPT_METHOD").val("run");
		$("#SCRIPT_PATH").attr("disabled", false);
	}
}

function submitSimpleRuleCfg() {
	$.ajax.submit('EditPart', 'onTradeSubmit', null, 'EditPart', function(){

	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
}
