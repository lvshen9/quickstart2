/* $Id  */
function initAccountInfo() {
	var planModeCode = $('#pay_PLAN_MODE_CODE');
	if(planModeCode.val() == "2") {		
		$("#IS_CHECK_ALL").attr("checked",true);
		$('#IS_CHECK_ALL').attr("disabled",true);
	}else if(planModeCode.val() == "3"){
		$('#pay_FEE_TYPE').attr("disabled",true);
	}else if(planModeCode.val() == "4"){
	}
}


function showFeeMessage() 
{
	var payfee_type = $("#pam_PAY_FEE_MODE_CODE").val();
	var feemsgpart = $("#FeeMSGPart");
	if (payfee_type == "1") {
		feemsgpart.css("display", "none");
	} 
	else {
		feemsgpart.css("display", "");
	}
}


function feeTypeChg()
{
	var pay_FEE_TYPE=$('#pay_FEE_TYPE');
	$('#pay_LIMIT').val('0');
	if(pay_FEE_TYPE.val()=="1")
	{
		$('#pay_LIMIT_TYPE').attr("disabled",true);
		$('#pay_LIMIT').attr("disabled",true);
		$('#pay_COMPLEMENT_TAG').attr("disabled",true);
	}
	else if(pay_FEE_TYPE.val()=="2")
	{
		$('#pay_LIMIT_TYPE').attr("disabled",false);
		$('#pay_LIMIT').attr("disabled",false);
		$('#pay_COMPLEMENT_TAG').attr("disabled",false);
		
	}
}



function changelimit(){
	alert("changelimit");
	var limittype = $("#pay_LIMIT_TYPE").val();
	if(limittype==0){
		$("#pay_LIMIT").attr("disabled",true);
		$("#pay_LIMIT").val("");
		$("#IS_COMPLEMENT").attr("checked",false);
		$("#IS_COMPLEMENT").attr("disabled",true);
	}else{
		$("#pay_LIMIT").attr("disabled",false);
		$("#IS_COMPLEMENT").attr("disabled",false);
	}
}

function checkFalse(index){
	alert("checkFalse");
	if(index==0){
		$("#pay_LIMIT").val("");
		$("#pay_LIMIT").attr("disabled",true);
		$("#pay_LIMIT_TYPE").val(0);
		$("#pay_LIMIT_TYPE").attr("disabled",true);
		$("#IS_COMPLEMENT").checked=false;
		$("#IS_COMPLEMENT").attr("disabled",true);
	}else{
		$("#pay_LIMIT_TYPE").val(0);
		$("#pay_LIMIT_TYPE").attr("disabled",false);
	}
}

