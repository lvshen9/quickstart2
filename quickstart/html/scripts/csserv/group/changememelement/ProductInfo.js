
function initProductInfo() {
	
}

//下一步验证事件
function productInfoNextCheck()
{
	
	var flag = $("#SKIP_FORCE_PACKAGE_FOR_PRODUCT").val();
	if(flag!="1"){
		//bixuanbao check
		if(!selectedElements.checkForcePackage())
			return false;
	}
	
	var tempElements = selectedElements.selectedEls;
    if(!tempElements)
   		return false;
    for (var i=0;i<tempElements.length ;i++ )
    {
     if(tempElements.get(i,"MODIFY_TAG")=='0'&&tempElements.get(i,"ATTR_PARAM_TYPE")=='9'&&tempElements.get(i,"ATTR_PARAM").get(0,"PARAM_VERIFY_SUCC")=='false')
	 {
		alert(tempElements.get(i,"ELEMENT_NAME")+",缺少服务参数，请补全相关服务参数信息！"); 
		return false ; 
      }
		    
    }
    
    if(!$.validate.verifyAll('productInfoPart')) return false; 
    
    if(typeof(validateParamPage)=="function"){
		if (!validateParamPage('ChgMb')) return false
	}
    $.beginPageLoading('业务验证中....');
    var checkParam = '&SERIAL_NUMBER='+$('#MEB_SERIAL_NUMBER').val()+'&PRODUCT_ID='+$('#PRODUCT_ID').val()+'&USER_ID_B='+$('#MEB_USER_ID').val()+'&USER_ID='+$('#GRP_USER_ID').val() +'&EPARCHY_CODE_B='+$("#MEB_EPARCHY_CODE").val()+'&ALL_SELECTED_ELEMENTS='+ tempElements+'&SKIP_FORCE_PACKAGE_FOR_PRODUCT='+flag ;
	pageFlowRuleCheck('com.ailk.csview.group.rule.ChangeMemElementRule','checkProductInfoRule',checkParam);
	
	return false;
} 

//下一步验证成功后执行的方法
function pageFlowCheckAfterAction(){
	var submitDatas = selectedElements.getSubmitData();
	if(!submitDatas)
		return false
	$('#SELECTED_ELEMENTS').val(submitDatas);
	return true;
}

//点包列表后展示包下元素时增加查询参数
function pkgListAfterSelectAction(package){
	var selfParam = "&GRP_USER_ID=" + $('#GRP_USER_ID').val() + "&PRODUCT_ID=" + $('#PRODUCT_ID').val();
	var eparchyCode = $('#MEB_EPARCHY_CODE').val();
	pkgElementList.renderComponent(package,eparchyCode,selfParam);
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


