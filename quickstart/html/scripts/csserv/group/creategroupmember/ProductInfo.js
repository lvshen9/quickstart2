
function initProductInfo() {
	var effectNow = $("#EFFECT_NOW").attr("checked");
	if (effectNow == true) {
		selectedElements.isEffectNow = effectNow;
	}
}

/**提示*/
function productInfoNextCheck() {
		//校验必选包
	if (!selectedElements.checkForcePackage()) {
		return false;
	}
	
	var tempElements = selectedElements.selectedEls;
	if (!tempElements) {
		return false;
	}
	for (var i = 0; i < tempElements.length; i++) {
		if (tempElements.get(i, "MODIFY_TAG") == "0" && tempElements.get(i, "ATTR_PARAM_TYPE") == "9" && tempElements.get(i, "ATTR_PARAM").get(0, "PARAM_VERIFY_SUCC") == "false") {
			alert(tempElements.get(i, "ELEMENT_NAME") + ",\u7f3a\u5c11\u670d\u52a1\u53c2\u6570\uff0c\u8bf7\u8865\u5168\u76f8\u5173\u670d\u52a1\u53c2\u6570\u4fe1\u606f\uff01");
			return false;
		}
	}
	if (typeof (validateParamPage) == "function") {
		if (!validateParamPage("CrtMb")) {
			return false;
		}
	}
	
	if(!$.validate.verifyAll("productInfoPart")){
		return false;
	}
	$.beginPageLoading('业务验证中....');
	var checkParam = "&SERIAL_NUMBER=" + $("#MEB_SERIAL_NUMBER").val() + "&PRODUCT_ID=" + $("#PRODUCT_ID").val() + "&USER_ID_B=" + $("#MEB_USER_ID").val()+ "&USER_ID=" + $("#GRP_USER_ID").val() + "&BRAND_CODE_B=" + $("#MEB_BRAND_CODE").val() + "&EPARCHY_CODE_B=" + $("#MEB_EPARCHY_CODE").val() + "&ALL_SELECTED_ELEMENTS=" + tempElements;
	pageFlowRuleCheck("com.ailk.csview.group.rule.CreateGroupMemberRule", "checkProductInfoRule", checkParam);
	
	return false;
}

function pageFlowCheckAfterAction(){
	var submitData = selectedElements.getSubmitData();
	if (!submitData) {
		return false;
	}
	$("#SELECTED_ELEMENTS").val(submitData);
	
	var selectparam = "&SELECTED_ELEMENTS=" + submitData + "&ID=" + $("#MEB_USER_ID").val() + "&PRODUCT_ID=" + $("#PRODUCT_ID").val() + "&TRADE_TYPE_CODE=" + $("#TRADE_TYPE_CODE").val();
	Wade.httphandler.submit("", "com.ailk.csview.group.common.util.GroupCacheUtilHttpHandler", "saveSelectElementsCache", selectparam, "", "", {async:false});
	return true;
}
/**
 * 点击左侧包之后,执行的自定义方法
 */
function pkgListAfterSelectAction(pkg) {
	var selfParam = "&GRP_USER_ID=" + $("#GRP_USER_ID").val() + "&PRODUCT_ID=" + $("#PRODUCT_ID").val();
	var eparchyCode = $("#MEB_EPARCHY_CODE").val();
	pkgElementList.renderComponent(pkg, eparchyCode, selfParam);
}

/**
 * 设置ADCMAS弹出的服务参数页面URL值
 * 
 */
(function(){$.extend(SelectedElements.prototype,{
	buildPopupAttrParam: function(data){
	        var eparchyCode=$("#MEB_EPARCHY_CODE").val();
	        var param="&MEB_EPARCHY_CODE="+eparchyCode;
	        return param;
	       }
	});
})();

