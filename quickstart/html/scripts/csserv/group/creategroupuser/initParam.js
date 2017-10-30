//xunyl 创建  此文件专门用于集团BBOSS产品的属性初始化校验

/******************************************统一接口*************************************/
/**
 * @description 集团BBOSS产品的属性变更统一接口
 * @author xunyl
 * @date 2014-06-25
 */
 function initParamUnit(){
	//1- 获取所有产品参数对象
	var attrParams = $('[id =PRODUCT_PARAM_CODE]');
	
	//2- 遍历产品参数对象，执行初参数始化方法
	attrParams.each(function() {
		// 获取输入框对象
		var paramCode = $.attr(this, "value");
		var inputObj = $("#input_" + paramCode);
		// 获取调用的js方法名
		var methodName = inputObj.attr('initMethodName');
		// 判断方法名是否存在，如果不存在则直接返回
		if (methodName != null && methodName != "undefined"){
			//获取商产品信息
			var productGoodInfos =new Wade.DataMap($("#productGoodInfos").val());
			//调用相应的js方法，将属性编号，参数既有值和变更后的值传入js方法中
			return window[methodName](productGoodInfos);
		}
	});
	return true;
 }

/****************************************400商品*************************************/
/**
 * @description 400商品初始化校验
 * @author xunyl
 * @date 2014-06-25
 */
 function business400_init(productGoodInfos){
    //1- 400号码一致性校验
    check400Num(productGoodInfos);
 }

/**
 * @description 400商品中除400语音产品外其它产品的400号码必须与400语音产品中的400号保持一致
 * @author xunyl
 * @date 2014-06-25
 */
 function check400Num(productGoodInfos){
	//1- 获取当前的产品编号(全网产品编号)，如果为400语音产品，直接退出
	var productParamInfoList = new Wade.DatasetList($("#OLD_PRODUCT_PARAMS").val());
 	var allNetProductId = productParamInfoList.get(0,"PRODUCT_ID");
	if(allNetProductId == "411501"){
		return false;
	}
	
	//2- 获取当前产品的操作类型，如果非产品订购或者预订购，直接推出
	var productOpType = $("#productOperType").val();
	if(productOpType != "1" && productOpType != "10"){
		return false;
	}
	
	//3- 获取400语音产品对应的省内产品编号
	var proProductId = "";
	$.ajax.submit(
				'','getProProductId','&ALLNET_PRODUCT_ID=411501', '', 
				function(data){proProductId = data.map.result;}, 
				function(error_code, error_info){}, 
				{async : false}
	);
	
	//4- 获取商品操作类型，根据商品操作类型通过不同途径获取400号码
	var number = "";
	var operType = $.getSrcWindow().$("#operType").val();
	if(operType=="1"){
		number = get400NumForGrpOpen(productGoodInfos,proProductId);
	}else if(operType=="7"){
		number = get400NumForGrpChg(productGoodInfos,proProductId);
	}
		
	//5- 如果400语音产品未订购，提示用户先订购400语音产品，再订购该产品
	if(number == ""){
		alert("400语音产品还未订购，请先订购400语音产品，否则该页面将无法提交！");
		return false;
	}
	
	//6- 根据产品编号，给对应的400号码赋初始值
	if("411502" == allNetProductId){
		$("#input_4115027011").val(number);
		changeValue($('#input_4115027011')[0]);
	}else if("411503" == allNetProductId){
		$("#input_4115037011").val(number);
		changeValue($('#input_4115037011')[0]);
	}else if("411504" == allNetProductId){
		$("#input_4115047011").val(number);
		changeValue($('#input_4115047011')[0]);
	}else if("411506" == allNetProductId){
		$("#input_4115067011").val(number);
		changeValue($('#input_4115047011')[0]);
	}else if("411508" == allNetProductId){
		$("#input_4115087011").val(number);
		changeValue($('#input_4115087011')[0]);
	}else if("411509" == allNetProductId){
		$("#input_4115097011").val(number);
		changeValue($('#input_4115097011')[0]);
	}else if("411510" == allNetProductId){
		$("#input_4115107011").val(number);
		changeValue($('#input_4115107011')[0]);
	}	
	return true;
}

/**
 * @description 获取当前产品的产品编号(BBOSS侧产品编号)
 * @author xunyl
 * @date 2014-06-26
 */
 function getMerchpProductId(){
 	//1- 获取初始化产品参数对象
 	var productParamInfoList = $("#OLD_PRODUCT_PARAMS").val();
 	
 	//2- 获取参数对应的产品编号
 	var productParamInfo = productParamInfoList.get(0);
 	var merchpProductId =  productParamInfo.get("PRODUCT_ID");
 	
 	//3- 返回产品编号
 	return merchpProductId;
 }
 
 /**
  * @description 商品变更阶段获取400语音产品中400号码的值
  * @author xunyl
  * @date 2014-06-27
  */
  function get400NumForGrpChg(productGoodInfos,proProductId){
  	//1- 定义400号码
  	var number = "";
  	  	
  	//2- 获取商品对象中的产品信息列表
  	var productInfoList = new Wade.DatasetList(productGoodInfos.get("PRODUCT_INFO_LIST").toString());
  	if(productInfoList.length == 0){
  		return number;
  	}
  	
  	//3- 遍历产品信息列表，获取400语音产品对应的用户编号
  	var userId = "";
  	for(var i = 0;i < productInfoList.length; i++){
  		var productInfo = productInfoList.get(i);
  		var productId = productInfo.get("PRODUCT_ID");
  		if(productId == proProductId){
  			userId = productInfo.get("USER_ID");
  			break;
  		}
  	}
  	
  	//4- 根据400语音用户编号获取400号码
  	$.ajax.submit(
				'','get400NumByUserIdAttrCode','&USER_ID='+userId+'&ATTR_CODE=4115017001', '', 
				function(data){number = data.map.result;}, 
				function(error_code, error_info){}, 
				{async : false}
	);
  	
  	//5- 返回400号码
  	return number;
  }
 
  /**
  * @description 商品新增阶段获取400语音产品中400号码的值
  * @author xunyl
  * @date 2014-06-27
  */
  function get400NumForGrpOpen(productGoodInfos,proProductId){
  	//1- 定义400号码
  	var number = "";
  	
  	//2- 获取商产品对象中的产品参数对象
	var productParamMap = new Wade.DataMap();
	if (productGoodInfos.get("PRODUCT_PARAM") != null) {
		productParamMap = productGoodInfos.get("PRODUCT_PARAM");
	}
	
	//3- 获取400语音产品对应的产品参数	
	var productParamInfo = productParamMap.get(proProductId+"_1");
	if(productParamInfo == null || productParamInfo=="undefined"){
		return number;
	}
	
	//4- 从400语音产品对应的产品参数中遍历找出400号码值	
	productParamInfo.eachKey(
		function(key, index, totalCount){
			var paramInfo = productParamInfo.get(key);
			var paramCode = paramInfo.get("ATTR_CODE");
			if(paramCode == "4115017001"){
				number = paramInfo.get("ATTR_VALUE");
			}
		}
	);
	
	//5- 返回400号码
	return number;
  }