
/**提示*/
function productInfoNextCheck() {
	
	//页面元素验证
	var result = $.validate.verifyAll("productInfoPart")
	if(!result){
		return false;
	}
	
	var flag = $("#SKIP_FORCE_PACKAGE_FOR_PRODUCT").val();
	if(flag!="1"){
		//产品必选包验证，验证必选包是否订购了
		if (!selectedElements.checkForcePackage()) {
			return false;
		}
	}
	
	//邮寄信息验证
	if (!isPostInfo()) {
		return false;
	}
	
	if(typeof(validateParamPage)=="function"){
		if (!validateParamPage('ChgUs')) return false
	}
	var tempElements = selectedElements.selectedEls;
	
	//ADC,MAS验证参数是否填写
	for (var i = 0; i < tempElements.length; i++) {
		if (tempElements.get(i, "MODIFY_TAG") == "0" && tempElements.get(i, "ATTR_PARAM_TYPE") == "9" && tempElements.get(i, "ATTR_PARAM").get(0, "PARAM_VERIFY_SUCC") == "false") {
			alert(tempElements.get(i, "ELEMENT_NAME") + ",\u7f3a\u5c11\u670d\u52a1\u53c2\u6570\uff0c\u8bf7\u8865\u5168\u76f8\u5173\u670d\u52a1\u53c2\u6570\u4fe1\u606f\uff01");
			return false;
		}
	}
	
	//业务验证
	$.beginPageLoading('业务验证中....');
	var power100Info = $("#POWER100_PRODUCT_INFO").val();
	var power100Listsize = 0;
	var paramrule = "&USER_ID=" + $("#USER_ID").val() + "&PRODUCT_ID=" + $("#PRODUCT_ID").val() + "&ALL_SELECTED_ELEMENTS=" + tempElements +'&EPARCHY_CODE='+$('#GRP_USER_EPARCHYCODE').val()+'&SKIP_FORCE_PACKAGE_FOR_PRODUCT='+flag;
	if (power100Info.length > 0) {
		paramrule  =paramrule +'&POWER100_PRODUCT_INFO='+power100Info;
	}
	pageFlowRuleCheck("com.ailk.csview.group.rule.ChangeUserElementRule", "checkProductInfoRule", paramrule);
	return false;
	
}

//业务规则验证成功后，需要把选择的产品元素保存到缓存中
function pageFlowCheckAfterAction(){
	//将页面选择的产品元素信息存储到内存中，因为页面流传递数据时数据量大会出现数据丢失
	var submitData = selectedElements.getSubmitData();
	if (!submitData) {
		return false;
	}
	$("#SELECTED_ELEMENTS").val(submitData);
	
	var selectparam = "&SELECTED_ELEMENTS=" + submitData+ "&ID=" + $("#USER_ID").val() + "&PRODUCT_ID=" + $("#PRODUCT_ID").val() + "&TRADE_TYPE_CODE=" + $("#TRADE_TYPE_CODE").val();
	var grppackagelist = $("#SELECTED_GRPPACKAGE_LIST").val();
	if (typeof (grppackagelist) != "undefined") {
		selectparam = selectparam + "&SELECTED_GRPPACKAGE_LIST=" + grppackagelist;
	}
	Wade.httphandler.submit("", "com.ailk.csview.group.common.util.GroupCacheUtilHttpHandler", "saveSelectElementsCache", selectparam, null, null, {async:false});
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

