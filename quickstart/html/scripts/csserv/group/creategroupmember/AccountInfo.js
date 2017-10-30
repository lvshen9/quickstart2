/* $Id  */

function initAccountInfo() {

	var planTypeCode = $("#pay_PLAN_TYPE_CODE").val();
	var planModeCode = $("#pay_PLAN_MODE_CODE").val();
	
	// 付费模式代码: 1-完全统付; 2-限定金额; 3-限定账目项; 4-同时限定金额及账目项
	if (planTypeCode == "T"){
		$("#pay_FEE_TYPE").val("1");
		$("#pay_LIMIT").val("0");
		$("#pay_FEE_TYPE").attr("disabled", true);
		$("#IS_CHECK_ALL").attr("disabled", true);
		$("#IS_CHECK_ALL").attr("checked", true);
		feeTypeChg();
	} else if (planTypeCode == "C"  && planModeCode == "2"){
        $("#IS_CHECK_ALL").attr("checked", true);
		$('#IS_CHECK_ALL').attr("disabled", true);
		feeTypeChg();
	} else if (planTypeCode == "C"  && planModeCode == "3"){
		$("#pay_FEE_TYPE").val("1");
		$("#pay_LIMIT").val("0");
		$("#pay_FEE_TYPE").attr("disabled", true);
		feeTypeChg();
		$("#pay_FEE_TYPE").attr("disabled", true);
	} else if (planTypeCode == "C"  && planModeCode == "4"){
		feeTypeChg();
	}
}

function feeTypeChg()
{
	var payFeeType = $("#pay_FEE_TYPE").val();
	
	if(payFeeType == "1")
	{
		$("#pay_LIMIT_TYPE").attr("disabled", true);
		$("#pay_LIMIT").attr("disabled", true);
		$("#pay_COMPLEMENT_TAG").attr("disabled", true);
	}
	else if(payFeeType == "2")
	{
		$("#pay_LIMIT_TYPE").attr("disabled", false);
		$("#pay_LIMIT").attr("disabled", false);
		$("#pay_COMPLEMENT_TAG").attr("disabled", false);
	}
}

//校验高级付费
function validateAccount(){
	var itemcodes="";
	var itemcodelist = $("#itemcodepart input:checked");
	itemcodelist.each(function(){
	
		var itemcode = $(this).val();
		if(itemcodes==''){
			itemcodes = itemcode;
		}else{
			itemcodes = itemcodes+'|'+itemcode;
		}
		
	});
	$('#itemCodes').val(itemcodes);
	var ischeckall = $('#IS_CHECK_ALL').attr('checked');
	var itemcodes = $('#itemCodes').val();
	
	if(itemcodes=='' && !ischeckall){
		alert('请选择付费账目编码或者勾选全部账目！');
		return false;
	}
	
	if(itemcodes!='' && ischeckall){
		alert('付费账目编码和全部账目不能同时选择！');
		return false;
	}
	
	var paySN       =  $("#pay_SERIAL_NUMBER").val();
	//alert(paySN);
	var payModeName =  $("#pay_PLAN_MODE_NAME").val();
	//alert(payTypeName);
	var payAcctID   =  $("#pay_GRP_ACCT_ID").val();
	//alert(payAcctID);
	
	if (!(confirm("您所选择的【"+paySN+"】的号码是否要以【"+payModeName+"】的付费模式\r加入到【"+payAcctID+"】的统付账号下？"))){
		return false;
	}
	else{
	    if(!$.validate.verifyAll('accountinfopart')) return false;
		var selectparam  = '&SELECTED_ELEMENTS='+$("#SELECTED_ELEMENTS").val()+'&ID='+$("#MEB_USER_ID").val()+'&PRODUCT_ID='+$("#PRODUCT_ID").val()+'&TRADE_TYPE_CODE='+$("#TRADE_TYPE_CODE").val();
		Wade.httphandler.submit('','com.ailk.csview.group.common.util.GroupCacheUtilHttpHandler','saveSelectElementsCache',selectparam,'','');
	
		return true;
	}

	return false;
}