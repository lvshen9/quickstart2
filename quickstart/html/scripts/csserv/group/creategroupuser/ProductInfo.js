function initProductInfo() {
	var effectNow = $('#EFFECT_NOW').attr('checked');
	if(effectNow == true){
		selectedElements.isEffectNow = effectNow
	}
	
	// 初始化资源信息
	initGroupSerialNumber();
}

function changePayFeeMode() {
	
}


function changePlanMode() {
	var planModeCode = $("#acct_PLAN_MODE_CODE");
	
	if(planModeCode.val() == "0") {		

		$("#COMPIX_ACCOUNT").val("0");

	}else if(planModeCode.val() == "1"){

		if (!confirm("请注意：\n【完全统付】付费模式是集团单位为单位成员缴纳所有通信费用的付费模式。单位成员共用一个账户，账户内金额由所有成员共同使用。请业务受理人员在办理【完全统付】付费模式前与客户解释和确认关于账户金额的使用规则，避免业务风险。")){
			$("#acct_PLAN_MODE_CODE").val('');
        }else{
			$("#COMPIX_ACCOUNT").val("0");
        }

	}else if(planModeCode.val() == "2"){

		if (!confirm("请注意：\n【限定金额】是集团单位只为单位成员缴纳固定金额通信费用的付费模式。")){
			$("#acct_PLAN_MODE_CODE").val("");
        }else{
			$("#COMPIX_ACCOUNT").val("1");
        }

	}else if(planModeCode.val() == "3"){

		if (!confirm("请注意：\n【限定账目项】是集团单位只为单位成员缴纳指定账目项通信费用的付费模式。")){
			$("#acct_PLAN_MODE_CODE").val("");
        }else{
			$("#COMPIX_ACCOUNT").val("1");
        }

	}else if(planModeCode.val() == "4"){

		if (!confirm("请注意：\n【既限金额，又限账目项】是集团单位只为单位成员缴纳指定账目项中固定金额通信费用的付费模式。")){
			$("#acct_PLAN_MODE_CODE").val("");
        }else{
			$("#COMPIX_ACCOUNT").val("1");
        }
	}
}
 
/**
 * 下一步 校验
 * 
 * @return {Boolean}
 */
function productInfoNextCheck()
{
	if(!selectedElements.checkForcePackage())
		return false;
	var tempElements = selectedElements.selectedEls;
	if(!tempElements) return false;
	for (var i=0;i<tempElements.length ;i++ )
	   {
	  	 if(tempElements.get(i,"MODIFY_TAG")=='0'&&tempElements.get(i,"ATTR_PARAM_TYPE")=='9'&&tempElements.get(i,"ATTR_PARAM").get(0,"PARAM_VERIFY_SUCC")=='false')
		 {
			alert(tempElements.get(i,"ELEMENT_NAME")+",缺少服务参数，请补全相关服务参数信息！"); 
			return false ; 
	      }
			    
	   } 
	
    if(!$.validate.verifyAll('productInfoPart')) return false;
	if(!checkAcctInfo()){return false;}
	if(!isPostInfo()){return false;} 
	if(!isCheckedSerialNumber()){return false;}
	if(typeof(validateParamPage)=="function"){
		if (!validateParamPage('CrtUs')) return false
	}
	
    
	//规则验证
	$.beginPageLoading('业务验证中....');
	var paramrule  ='&SERIAL_NUMBER='+$("#SERIAL_NUMBER").val()+'&CUST_ID='+$("#CUST_ID").val()+'&PRODUCT_ID='+$("#PRODUCT_ID").val()+'&ALL_SELECTED_ELEMENTS='+tempElements+'&EPARCHY_CODE='+$("#GRP_USER_EPARCHYCODE").val();
	//power100
	var power100Info= $('#POWER100_PRODUCT_INFO').val();
	var power100Listsize=0;
	if(power100Info.length>0){
		paramrule  =paramrule +'&POWER100_PRODUCT_INFO='+power100Info;
	} 
	pageFlowRuleCheck('com.ailk.csview.group.rule.CreateGroupUserRule','checkProductInfoRule',paramrule);
	
	return false;
	
	
} 

//业务规则验证成功后，需要把选择的产品元素保存到缓存中
function pageFlowCheckAfterAction(){

	var submitData = selectedElements.getSubmitData();
	if(!submitData)
		return false;
    $('#SELECTED_ELEMENTS').val(submitData);
	//将页面中的元素数据保存到缓存中
	var selectparam  = '&SELECTED_ELEMENTS='+submitData+'&ID='+$("#CUST_ID").val()+'&PRODUCT_ID='+$("#PRODUCT_ID").val()+'&TRADE_TYPE_CODE='+$("#TRADE_TYPE_CODE").val();
	var grppackagelist  =  $("#SELECTED_GRPPACKAGE_LIST").val();
	if(typeof(grppackagelist) != 'undefined'){
		selectparam = selectparam +'&SELECTED_GRPPACKAGE_LIST='+grppackagelist;
	}
	Wade.httphandler.submit('','com.ailk.csview.group.common.util.GroupCacheUtilHttpHandler','saveSelectElementsCache',selectparam,'','',{async:false});
   
	return true;

}

/**
 * 设置ADCMAS弹出的服务参数页面URL值
 * 
 */
(function(){$.extend(SelectedElements.prototype,{
	buildPopupAttrParam: function(data){
	        var custId=$("#CUST_ID").val();
	        var groupId=$("#GROUP_ID").val();
	        var eparchyCode=$("#GRP_USER_EPARCHYCODE").val();
	        var param="&CUST_ID="+custId+"&GROUP_ID="+groupId+"&GRP_USER_EPARCHYCODE="+eparchyCode;
	        return param;
	       }
	});
})();
   