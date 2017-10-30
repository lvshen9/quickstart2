//xunyl 创建  此文件专门用于集团BBOSS产品的属性变更时校验

/******************************************统一接口*************************************/
/*
 *集团BBOSS产品的属性变更统一接口
 */
function onValueChangeUnit(e){
	//获取调用的js方法名
	var methodName =$(e).attr("changeMethodName");
	//判断方法名是否存在，如果不存在则直接返回
	if(methodName==null || methodName == "undefined"){
		return true;
	}
	//获取当前变更的属性编号
	var paramCode = $(e).attr("paraCode");
	//获取产品的既有值
	var oldValue =$('#OLDVALUE_'+paramCode).val();
	var poProductPlus =$(e).attr("pOProductPlus");
	//获取当前属性的属性值
	var attrValue = e.value;
	//参数值为空的时候，不进行校验
	if((attrValue==null || attrValue=="") && isNotInTheseCodes(paramCode)){
		return true;
	}
	//调用相应的js方法，将属性编号，参数既有值和变更后的值传入js方法中
	return window[methodName](e,paramCode,oldValue,attrValue);
}

/* 
集团BBOSS产品的管理节点属性变更统一接口
 */
 function onBbossManageValueChangeUnit(e){
 		//获取调用的js方法名
	var methodName =$(e).attr("changeMethodName");
	//判断方法名是否存在，如果不存在则直接返回
	if(methodName==null || methodName == "undefined"){
		return true;
	}
	//获取当前变更的属性编号
	var paramCode = $(e).attr("paraCode");
	//获取当前属性的属性值
	var attrValue = e.value;
	//参数值为空的时候，不进行校验
	if((attrValue==null || attrValue=="") && isNotInTheseCodes(paramCode)){
		return true;
	}
	//调用相应的js方法，将属性编号，参数既有值和变更后的值传入js方法中
	return window[methodName](e,paramCode,attrValue);
 
 }

/* *****************************物联网专网专号物联通商品********************************** */
function thingsOfweb_onValueChange(e, attrCode, oldValue, newValue) {

	// 短信级别下拉联动
	if ("300074002" == attrCode) {
		selectChange(e, attrCode, '300074014', newValue);
	}
	// // 子产品名称 联动下拉
	if ("300074014" == attrCode) {
		// 联动
		selectChange(e, attrCode, '300074015', newValue);
		selectChange(e, attrCode, '300074018', newValue);

	}
	// 子产品类别和产品包类别 联动下拉
	if ("300074014" == attrCode) {
		selectChange(e, attrCode, '300074018', newValue);
	}

	if ("300074015" == attrCode) {
		if ("I00010400001" == newValue) {
			$('#input_300074019').val('1');
		} else {
			$('#input_300074019').val('2');
		}
	}

	if ("300074038" == attrCode) {
		// 校验签名长度是否符合规范，客户签名4-8个汉字，或4-8个英文字母
		if (newValue.length > 8) {
			$.showErrorMessage("中文签名8个汉字");
			$(e).select();
			return false;
		}
		return true;
	}
	if ("300074039" == attrCode) {
		var filter = /^[a-zA-Z]{1,16}$/;
		if (!filter.test(newValue)) {
			$.showErrorMessage($(e).attr('desc') + "格式不正确，必须以英文字母且长度不超过16位");
			$(e).select();
			return false;
		}
		return true;
	}

	// 手机号码
	if ("300074013" == attrCode) {
		var isMod = g_IsMobileNumber(newValue);
		if (isMod == false) {
			$.showErrorMessage("手机号码的格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
		return true;
	}
	if ("300074052" == attrCode) {
		if (g_IsDigit(newValue) == false) {
			$.showErrorMessage("对应省开卡数量，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		return true;
	}

}

function thingsOfwebGPRS_onValueChange(e, attrCode, oldValue, newValue) {

	// 是否专用APN 联动下拉
	if ("300084024" == attrCode) {
		selectChange(e, attrCode, '300084014', newValue);
	}

	// 子产品名称 联动下拉
	if ("300084014" == attrCode) {
		selectChange(e, attrCode, '300084015', newValue);

	}
	// 子产品类别和产品包类别 联动下拉
	if ("300084015" == attrCode) {
		selectChange(e, attrCode, '300084018', newValue);
	}

	if ("300081008" == attrCode) {
		// 校验签名长度是否符合规范，客户签名4-8个汉字，或4-8个英文字母
		if (newValue.length > 8) {
			$.showErrorMessage("中文签名8个汉字");
			$(e).select();
			return false;
		}
		return true;
	}
	if ("300084039" == attrCode) {
		var filter = /^[a-zA-Z]{1,16}$/;
		if (!filter.test(newValue)) {
			$.showErrorMessage($(e).attr('desc') + "格式不正确，必须以英文字母且长度不超过16位");
			$(e).select();
			return false;
		}
		return true;
	}

	// 手机号码
	if ("300084007" == attrCode) {
		var isMod = g_IsMobileNumber(newValue);
		if (isMod == false) {
			$.showErrorMessage("手机号码的格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
		return true;
	}

	if ("300084052" == attrCode) {
		if (g_IsDigit(newValue) == false) {
			$.showErrorMessage("对应省开卡数量，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		return true;
	}
}

/* *****************************物联网专网专号机器卡商品********************************** */
function machineCardOfweb_onValueChange(e, attrCode, oldValue, newValue) {

	// 短信级别下拉联动
	if ("300054002" == attrCode) {
		selectChange(e, attrCode, '300054014', newValue);
	}
	// // 子产品名称 联动下拉
	if ("300054014" == attrCode) {
		// 联动
		selectChange(e, attrCode, '300054015', newValue);
		selectChange(e, attrCode, '300054018', newValue);

	}
	// 子产品类别和产品包类别 联动下拉
	if ("300054014" == attrCode) {
		selectChange(e, attrCode, '300054018', newValue);
	}

	if ("300054015" == attrCode) {
		if ("I00010300001" == newValue) {
			$('#input_300054019').val('1');
		} else {
			$('#input_300054019').val('2');
		}
	}

	if ("300054038" == attrCode) {
		// 校验签名长度是否符合规范，客户签名4-8个汉字，或4-8个英文字母
		if (newValue.length > 8) {
			$.showErrorMessage("中文签名8个汉字");
			$(e).select();
			return false;
		}
		return true;
	}
	if ("300054039" == attrCode) {
		var filter = /^[a-zA-Z]{1,16}$/;
		if (!filter.test(newValue)) {
			$.showErrorMessage($(e).attr('desc') + "格式不正确，必须以英文字母且长度不超过16位");
			$(e).select();
			return false;
		}
		return true;
	}

	// 手机号码
	if ("300054013" == attrCode) {
		var isMod = g_IsMobileNumber(newValue);
		if (isMod == false) {
			$.showErrorMessage("手机号码的格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
		return true;
	}
	if ("300054052" == attrCode) {
		if (g_IsDigit(newValue) == false) {
			$.showErrorMessage("对应省开卡数量，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		return true;
	}

}

function machineCardGPRS_onValueChange(e, attrCode, oldValue, newValue) {

	// 是否专用APN 联动下拉
	if ("300064024" == attrCode) {
		selectChange(e, attrCode, '300064014', newValue);
	}

	// 子产品名称 联动下拉
	if ("300064014" == attrCode) {
		selectChange(e, attrCode, '300064015', newValue);

		Wade.httphandler.submit('',
				'com.ailk.csview.group.verifyClass.frontDataVerify',
				'getPbssBizProdInstId', '', function(d) {
					var subs_id = d.map.result;
					$('#input_300064016').val(subs_id);

				});

		Wade.httphandler.submit('',
				'com.ailk.csview.group.verifyClass.frontDataVerify',
				'geneSubsId', '', function(d) {
					var subs_id = d.map.result;
					$('#input_300064023').val(subs_id);

				});

	}
	// 子产品类别和产品包类别 联动下拉
	if ("300064015" == attrCode) {
		selectChange(e, attrCode, '300064018', newValue);
	}
	// 获取产品订购关系 主办省保证唯一，并且保证与本省的一点出卡物联网专网专号业务订购关系ID不重复
	if ("300064016" == attrCode) {
		Wade.httphandler.submit('',
				'com.ailk.csview.group.verifyClass.frontDataVerify',
				'getPbssBizProdInstId', '', function(d) {
					var subs_id = d.map.result;
					$('#input_300064016').val(subs_id);

				});
	}
	// 用户标识 系统自动生成流水号
	if ("300064023" == attrCode) {

		Wade.httphandler.submit('',
				'com.ailk.csview.group.verifyClass.frontDataVerify',
				'geneSubsId', '', function(d) {
					var subs_id = d.map.result;
					$('#input_300064023').val(subs_id);

				});
	}

	if ("300061008" == attrCode) {
		// 校验签名长度是否符合规范，客户签名4-8个汉字，或4-8个英文字母
		if (newValue.length > 8) {
			$.showErrorMessage("中文签名8个汉字");
			$(e).select();
			return false;
		}
		return true;
	}
	if ("300064039" == attrCode) {
		var filter = /^[a-zA-Z]{1,16}$/;
		if (!filter.test(newValue)) {
			$.showErrorMessage($(e).attr('desc') + "格式不正确，必须以英文字母且长度不超过16位");
			$(e).select();
			return false;
		}
		return true;
	}

	// 手机号码
	if ("300064007" == attrCode) {
		var isMod = g_IsMobileNumber(newValue);
		if (isMod == false) {
			$.showErrorMessage("手机号码的格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
		return true;
	}

	if ("300064052" == attrCode) {
		if (g_IsDigit(newValue) == false) {
			$.showErrorMessage("对应省开卡数量，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		return true;
	}
}



/* *****************************管理节点属性校验********************************** */
   function bbossmanage_onValueChange(e,attrCode,newValue){
   			if("10002"==attrCode.substring(4)){
   				var isMod = g_IsMobileNumber(newValue);		
		       if(isMod==false){
					$.showErrorMessage("手机号码的格式不正确，请输入正确的手机号码");
					$(e).select();					
					return false;
			}
				return true;
   			}
   }
/* **********************************流量统付业务属性校验************************************************ */
function flowOnePay_onValuechange(e, attrCode, oldValue, newValue) {

	if ("999044003" == attrCode || "999044005" == attrCode) {
		var isMod = g_IsMobileNumber(newValue);
		if (isMod == false) {
			$.showErrorMessage("手机号码的格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
		return true;
	}

	// 联系人电话
	if ("999054005" == attrCode || "999054003" == attrCode) {
		if (!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue)) {
			$.showErrorMessage($(e).attr('desc') + "格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false;
		}
	}

	// 数字
	if ("999054011" == attrCode || "999054012" == attrCode) {
		if (g_IsDigit(newValue) == false) {
			$.showErrorMessage($(e).attr('desc') + "格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
	}
	// 长度
	if ("999054016" == attrCode) {
		if (newValue.length > 8) {
			$.showErrorMessage("长度最多为中文8个汉字");
			$(e).select();
			return false;
		}
		return true;
	}

	// 月流量规模(GB)
	if ("999044013" == attrCode) {
		if (g_IsDigit(newValue) == false) {
			$.showErrorMessage($(e).attr('desc') + "格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
	}

	// 客户产品简称
	if ("999044014" == attrCode) {
		if (newValue.length > 8 || newValue.length < 2) {
			$.showErrorMessage($(e).attr('desc') + "格式正确,应为2~8个汉字或者字母");
			$(e).select();
			return false;
		}
		return true;
	}

	return true;
}

/***************************************网信业务********************************************/

/*
 *全网网信商品--属性变更校验
 */
function netInfo_onValueChange(e,attrCode,oldValue,newValue){
	if("229017401"==attrCode){
		//校验签名长度是否符合规范，客户签名4-8个汉字，或4-8个英文字母
		if(newValue.length<4 || newValue.length>8){
	 		$.showErrorMessage("客户签名4-8个汉字，或4-8个英文字母");
	 		$(e).select();	
	 		return false;
 		}
 		return true;
 	}
	
	//集团客户联系人邮箱
	if("229017412" == attrCode){
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage("管理员邮箱格式不正确");				
			$(e).select();					
			return false;
		 }
		 return true;
	}
	
	//套餐折扣
	if("229017404"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1>100 || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage("套餐折扣的不正,折扣应为0-100的整数");
			$(e).select();					
			return false;
		}
		return true;
	}
	
	//集团客户长服务代码随客户使用号码类型的变更而变更
	if ("229017405"==attrCode){
		if(newValue=="01"){
			$('#input_229012009').val('106501621');			
		}else if(newValue=="02"){
			$('#input_229012009').val('1065016');
		}
		changeValue($('#input_229012009')[0]);
		$('#input_229012009').focus();	
		return true;
	}
	
	//集团客户网址标识
	//a) 以英文字母开头，不分大小写
	//b) 2-16位
	if("229017407"==attrCode){
		if(newValue.length<2 || newValue.length>16){
			$.showErrorMessage("集团客户网站标识的长度必须是2-16位");
			$(e).select();					
			return false;
		} 
		var filter =/^[a-zA-Z]{1}$/;
		if (!filter.test(newValue.toString().substring(0,1))){
			$.showErrorMessage("集团客户网站标识必须以英文字母开头");
			$(e).select();					
			return false;
		}
		return true;
	}
	
	//集团客户计费生效策略与集团客户首月测试网信数量 联动
	if("229017408"==attrCode){
		if(newValue == "02"){
			//集团客户首月测试网信数量默认为500，可变动
			$('#input_229017409').val('01');
			$('#input_229017409').attr("disabled",false);
		}else if(newValue == "01"){
			//集团客户首月测试网信数量默认为0，不可变动
			$('#input_229017409').val('00');
			$('#input_229017409').attr("disabled",true);			
		}
		changeValue($('#input_229017409')[0]);
		return true;
	}
	
	//手机号码
	if("229017413"==attrCode){
		var isMod = g_IsMobileNumber(newValue);		
		if(isMod==false){
			$.showErrorMessage("手机号码的格式不正确，请输入正确的手机号码");
			$(e).select();					
			return false;
		}
		return true;
	}
	
	//集团客户长服务代码
	if ("229012009"==attrCode) {
		//检查长服务代码是否为数字
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage("集团客户长服务代码不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		//获取集团客户使用号码类型
		var longServType = $('#input_229017405').val();
		if(longServType == "01"){//统一号码
			//检查前缀是否正确
			if(newValue.indexOf("106501621")!=0){
				$.showErrorMessage("集团客户长服务代码不正确，需要以106501621开头");
				$(e).select();
				return false;
			}
			//检查序列号位数是否正确			
			if(newValue.toString().substring(9).length<4 || newValue.toString().substring(9).length>8){
				$.showErrorMessage("集团客户长服务代码不正确，106501621后面请接4-8位序列号");
				$(e).select();
				return false;
			}
		}else{//扩展号码
			if(newValue.indexOf("1065016")!=0){
				$.showErrorMessage("集团客户长服务代码不正确，需要以1065016开头");
				$(e).select();
				return false;
			}
			if(newValue.toString().substring(6).length > 2){
			    if(newValue.toString().substring(7,9) == '01'){
			       	$.showErrorMessage("集团客户长服务代码不正确，号码类型为扩展号码时，1065016+21的形式不能用");
					$(e).select();
					return false;
			    }
			}
			if(newValue.toString().substring(6).length<2 || newValue.toString().substring(6).length>7){
				$.showErrorMessage("集团客户长服务代码不正确，1065016后面请接1-6位序列号");
				$(e).select();
				return false;
			}		
		}	
		return true;	
	}
	
	return true;
}

/*****************************************跨省专线************************************************/
function specialLine_onValueChange(e,attrCode,oldValue,newValue){
	//A端对应省公司
	if("1112053311"==attrCode){
		//如果省份是请选择的情况下，则城市对应的组件设置成不可编辑的状态，否则可编辑
		if(newValue=='' || newValue==null){
			$('#input_1112053305').attr('value','');
			changeValue($('#input_1112053305')[0]);
			$('#input_1112053305').attr('disabled',true);
			return true;
		}else{
			$('#input_1112053305').attr('disabled',false);
		}
	
		//根据选择的省公司获取该省公司对应的城市
		Wade.httphandler.submit('','com.ailk.csview.group.verifyClass.frontDataVerify','chooseCitys',
			'&PROVINCE_ATTR_CODE='+attrCode+'&PROVINCE_ATTR_VALUE='+newValue+'&CITY_ATTR_CODE=1112053305',
			function(d){
				//拼option对象
				var innerObj ="<OPTION title=--请选择-- selected value=''>--请选择--</OPTION>";				
				var citys = d.map.result;
				for(var i=0;i<citys.length;i++){
					innerObj=innerObj+"<OPTION title="+citys.get(i,'OPTION_NAME')+" value="+citys.get(i,'OPTION_VALUE')+">"+
						citys.get(i,'OPTION_NAME')+"</OPTION>";
				}
				
				//新option对象替换老对象
				$('#input_1112053305')[0].innerHTML="";
				$('#input_1112053305').html(innerObj);
			},function(e,i)
			{
				$.showErrorMessage("操作失败");
				$(e).select();
				return false;
			}
		);
	}
	
	//Z端对应省公司
	if("1112053320"==attrCode){
		//如果省份是请选择的情况下，则城市对应的组件设置成不可编辑的状态，否则可编辑
		if(newValue=='' || newValue==null){
			$('#input_1112053306').attr('value','');
			changeValue($('#input_1112053306')[0]);
			$('#input_1112053306').attr('disabled',true);
			return true;
		}else{
			$('#input_1112053306').attr('disabled',false);
		}
	
		//根据选择的省公司获取该省公司对应的城市
		Wade.httphandler.submit('','com.ailk.csview.group.verifyClass.frontDataVerify','chooseCitys',
			'&PROVINCE_ATTR_CODE='+attrCode+'&PROVINCE_ATTR_VALUE='+newValue+'&CITY_ATTR_CODE=1112053306',
			function(d){
				//拼option对象
				var innerObj ="<OPTION title=--请选择-- selected value=''>--请选择--</OPTION>";				
				var citys = d.map.result;
				for(var i=0;i<citys.length;i++){
					innerObj=innerObj+"<OPTION title="+citys.get(i,'OPTION_NAME')+" value="+citys.get(i,'OPTION_VALUE')+">"+
						citys.get(i,'OPTION_NAME')+"</OPTION>";
				}
				
				//新option对象替换老对象
				$('#input_1112053306')[0].innerHTML="";
				$('#input_1112053306').html(innerObj);
			},function(e,i)
			{
				$.showErrorMessage("操作失败");
				$(e).select();
				return false;
			}
		);
	}
}

/***************************************跨省互联网********************************************/
function specialInternet_onValueChange(e,attrCode,oldValue,newValue){
	//带宽(请填写单位:M或G)
	if ("1112083307"==attrCode){
		var zz = /^[1-9]\d*(\.\d+)?(M|G)$|^0(\.\d+)?(M|G)$/;
		if(!zz.test(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"的格式不正确，请输入数字加单位!");
			$(e).select();					
			return false;
		}
	
	}
	
	//处理意见
	if ("1112083483" == attrCode)
	{
		if ("0" == newValue)
		{		
			//未处理原因
			$("#input_1112083475").attr("nullable", "yes");
		}
		
		if ("1" == newValue)
		{		
			//未处理原因
			$("#input_1112083475").attr("nullable", "no");
		}
	}
	
	//联系人电话
	if ("1112083313" == attrCode || "1112083406" == attrCode)
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false; 
		}
	}
	
	//客户机房所在城市 1112083311  1112083305 
	if ("1112083311" == attrCode)
	{
		 selectChange(e,attrCode,'1112083305',newValue);
	}
	
	//客户机房所在城市
	if("1112083311"==attrCode){
		//如果省份是请选择的情况下，则城市对应的组件设置成不可编辑的状态，否则可编辑
		if(newValue=='' || newValue==null){
			$('#input_1112083305').attr('value','');
			changeValue($('#input_1112083305')[0]);
			$('#input_1112083305').attr('disabled',true);
			return true;
		}else{
			$('#input_1112083305').attr('disabled',false);
		}
	
		//根据选择的省公司获取该省公司对应的城市
		Wade.httphandler.submit('','com.ailk.csview.group.verifyClass.frontDataVerify','chooseCitys',
			'&PROVINCE_ATTR_CODE='+attrCode+'&PROVINCE_ATTR_VALUE='+newValue+'&CITY_ATTR_CODE=1112083305',
			function(d){
				//拼option对象
				var innerObj ="<OPTION title=--请选择-- selected value=''>--请选择--</OPTION>";				
				var citys = d.map.result;
				for(var i=0;i<citys.length;i++){
					innerObj=innerObj+"<OPTION title="+citys.get(i,'OPTION_NAME')+" value="+citys.get(i,'OPTION_VALUE')+">"+
						citys.get(i,'OPTION_NAME')+"</OPTION>";
				}
				
				//新option对象替换老对象
				$('#input_1112083305')[0].innerHTML="";
				$('#input_1112083305').html(innerObj);
			},function(e,i)
			{
				$.showErrorMessage("操作失败");
				$(e).select();
				return false;
			}
		);
	}
}
/***************************************车务通业务********************************************/

/*
 *全网车务通商品--属性变更校验
 */
function soCarThings_onValueChange(e,attrCode,oldValue,newValue){
    //管理员手机号码
	if("1109016601"==attrCode){
		var isMod = g_IsMobileNumber(newValue);		
		if(isMod==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();					
			return false;
		}
		return true;
	}
}


/*
 *本地车务通商品--属性变更校验
 */
function localCarThings_onValueChange(e,attrCode,oldValue,newValue){
    //管理员手机号码
	if("1109037703"==attrCode){
		var isMod = g_IsMobileNumber(newValue);		
		if(isMod==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();					
			return false;
		}
		return true;
	}
}

/*
 *全网POC商品--属性变更校验
 */
function netPOC_onValueChange(e,attrCode,oldValue,newValue){
	//手机号码
	if("1103027714"==attrCode){
		var isMod = g_IsMobileNumber(newValue);		
		if(isMod==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
		return true;
	}
}

/***************************************本地POC********************************************/

/*
 *本地POC商品--属性变更校验
 */
function localPOC_onValueChange(e,attrCode,oldValue,newValue){

	//手机号码
	if("1103017714"==attrCode){
		var isMod = g_IsMobileNumber(newValue);		
		if(isMod==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
		return true;
	}

	//管理员邮箱
	if("1103017715" == attrCode){
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage($(e).attr('desc')+"格式不正确");				
			$(e).select();					
			return false;
		 }
		 return true;
	}
	
	//备注
	if("1103011036" == attrCode){
		//正则表达式验证邮箱格式
		if (newValue.length > 50){	
			$.showErrorMessage($(e).attr('desc')+"长度不能超过50");				
			$(e).select();					
			return false;
		 }
		 return true;
	}

}

/*
 *农信通商品--属性变更校验
 */
function nongXingTong_onValueChange(e,attrCode,oldValue,newValue){
    //日期格式
	if("1102221035"==attrCode || "331011035"==attrCode || "331031035"==attrCode || "331041035"==attrCode || "331051035"==attrCode){
	  var zz = /^([0-1][0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;
		if (!zz.test(newValue) && newValue!="") {
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();	
			return false;
		}
	}
	if("1102221034"==attrCode || "331011034"==attrCode || "331031034"==attrCode || "331041034"==attrCode || "331051034"==attrCode){
	  var zz = /^([0-1][0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;
		if (!zz.test(newValue) && newValue!="") {
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();	
			return false;
		}
	}
	if("331030002"==attrCode){
	  var zz = /^([0-1][0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;
		if (!zz.test(newValue) && newValue!="") {
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();	
			return false;
		}
	}
	if("1102222009"==attrCode)
	{
	   //EC客户长服务
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}

		if(newValue.indexOf("12582999939")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以12582999939开头");
			$(e).select();
			return false;
		}
		//EC客户长服务	
		
		if(newValue.toString().substring(11).length!=6){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，12582999939+集团物理编码后六位");
			$(e).select();
			return false;
		}
	}
	//EC企业码
	if("1102221028"==attrCode || "331011028"==attrCode || "331031028"==attrCode || "331041028"==attrCode || "331051028"==attrCode)
	{
	   //检查长服务代码是否为数字
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}

		//检查序列号位数是否正确			
		if(newValue.toString().length!=6){
			$.showErrorMessage($(e).attr('desc')+"为6位数字");
			$(e).select();
			return false;
		}
	}
	
	//每日下发的最大条数
	if("1102221032"==attrCode || "331011032"==attrCode || "331031032"==attrCode || "331031032"==attrCode )
	{
	   if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
		}
        
        if(newValue.substring(0,1)=="0" && newValue.length>1)
        {
           $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
        }
        if(newValue.length>9)
        {
            $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
        }
	}	
	
	//每月下发的最大条数
	if("1102221033"==attrCode || "331011033"==attrCode || "331031033"==attrCode || "331041033"==attrCode || "331051033"==attrCode)
	{
       if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
		}
        
        if(newValue.substring(0,1)=="0" && newValue.length>1)
        {
           $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
        }
        if(newValue.length>9)
        {
            $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
        }
	}
	
	//集团客户短信接收手机号
	if("1102220003"==attrCode || "331030003" == attrCode || "331010003" == attrCode || "331050003" == attrCode || "331040003" == attrCode)
	{
       var isMod = g_IsMobileNumber(newValue);		
		if(isMod==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();					
			return false;
		}
		return true;
	}
	//EC客户长服务
	if("331012009"==attrCode || "331032019"==attrCode || "331042009"==attrCode || "331052009"==attrCode )
	{
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		if(newValue.indexOf("125829999")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以125829999开头");
			$(e).select();
			return false;
		}
		if(newValue.toString().length<16){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于16位");
			$(e).select();
			return false;
		}
	}
	//EC短信基本接入号
	if("331011009"==attrCode || "331031009"==attrCode || "331041009"==attrCode || "331051009"==attrCode || "331031019"==attrCode)
	{
	    
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}

		if(newValue.indexOf("125829999")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以125829999开头");
			$(e).select();
			return false;
		}
		if(newValue.toString().length<16){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于16位");
			$(e).select();
			return false;
		}
	}
	//EC短信基本接入号
	if("1102221009"==attrCode || "1102222009"==attrCode)
	{
	   
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}

		if(newValue.indexOf("12582999939")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以12582999939开头");
			$(e).select();
			return false;
		}
		if(newValue.toString().length<17){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于17位");
			$(e).select();
			return false;
		}
	}
}

/***************************************本地POC********************************************/

/*
 *财信通商品--属性变更校验
 */
function financInfo_onValueChange(e,attrCode,oldValue,newValue){
	//时间格式：hhmmss
	if("228151034"==attrCode || "228151035"==attrCode || "228161034"==attrCode || "228011034"==attrCode
		|| "228031035"==attrCode || "228011035"==attrCode || "228161035"==attrCode || "228181035"==attrCode
		|| "228141034"==attrCode || "228141035"==attrCode || "228171034"==attrCode || "228171035"==attrCode
		|| "228181034"==attrCode || "228121034"==attrCode || "228111035"==attrCode || "228111034"==attrCode
		|| "228121035"==attrCode || "228041034"==attrCode || "228131035"==attrCode || "228131034"==attrCode
		|| "228101035"==attrCode || "228081034"==attrCode || "228051035"==attrCode || "228051034"==attrCode
		|| "228081035"==attrCode || "228101034"==attrCode || "228091035"==attrCode || "228091034"==attrCode
		|| "228041035"==attrCode || "228021035"==attrCode || "228031034"==attrCode || "228021034"==attrCode
		|| "228191034"==attrCode || "228191035"==attrCode){
		if(!g_IsTime(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();
			return false;
		}
	}
	//每日、月下发的最大条数
	if("228021032" == attrCode || "228021033" == attrCode ||"228031032" == attrCode ||"228031033" == attrCode 
		||"228011033" == attrCode ||"228011032" == attrCode ||"228151032" == attrCode ||"228151033" == attrCode 
		||"228161032" == attrCode ||"228161033" == attrCode ||"228171032" == attrCode ||"228171033" == attrCode
		||"228181032" == attrCode ||"228181033" == attrCode ||"228041032" == attrCode ||"228041033" == attrCode
		||"228191032" == attrCode ||"228191033" == attrCode ||"228051032" == attrCode ||"228051033" == attrCode
		||"228081032" == attrCode ||"228081033" == attrCode ||"228091032" == attrCode ||"228091033" == attrCode
		||"228101032" == attrCode ||"228101033" == attrCode ||"228111032" == attrCode ||"228111033" == attrCode
		||"228121032" == attrCode ||"228121033" == attrCode ||"228131032" == attrCode ||"228131033" == attrCode
		||"228141032" == attrCode ||"228141033" == attrCode)
	{
		if(newValue.length > 9){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于9位");
			$(e).select();
			return false;
		}
		if(!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
	}
	
	//EC企业码
	if("228021028" == attrCode || "228031028" == attrCode || "228011028" == attrCode || "228151028" == attrCode ||
		"228161028" == attrCode || "228171028" == attrCode || "228181028" == attrCode || "228041028" == attrCode ||
		"228191028" == attrCode || "228051028" == attrCode || "228081028" == attrCode || "228091028" == attrCode ||
		"228101028" == attrCode || "228111028" == attrCode || "228121028" == attrCode || "228131028" == attrCode ||
		"228141028" == attrCode)
	{
		if(newValue.length > 6){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于6位");
			$(e).select();
			return false;
		}
		if(!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
	}
	
	//EC短信基本接入号
	if ("228021009" == attrCode || "228031009" == attrCode || "228011009" == attrCode || "228151009" == attrCode ||
		"228161009" == attrCode || "228171009" == attrCode || "228181009" == attrCode || "228041009" == attrCode ||
		"228191009" == attrCode || "228051009" == attrCode || "228081009" == attrCode || "228091009" == attrCode ||
		"228101009" == attrCode || "228111009" == attrCode || "228121009" == attrCode || "228131009" == attrCode ||
		"228141009" == attrCode)
	{
		if(newValue.indexOf("1065089")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以1065089开头");
			$(e).select();
			return false;
		}
		if(newValue.length < 14){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于14位");
			$(e).select();
			return false;
		}
	}
	
	//EC长服务代码
	if ("228012009" == attrCode || "228022009" == attrCode || "228032009" == attrCode || "228042009" == attrCode ||
		"228052009" == attrCode || "228082009" == attrCode || "228092009" == attrCode || "228102009" == attrCode ||
		"228112009" == attrCode || "228122009" == attrCode || "228132009" == attrCode || "228142019" == attrCode ||
		"228152019" == attrCode || "228162019" == attrCode || "228172019" == attrCode || "228182019" == attrCode ||
		"228192019" == attrCode)
	{
		if(newValue.indexOf("1065089")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以1065089开头");
			$(e).select();
			return false;
		}
		if(newValue.length < 14){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于14位");
			$(e).select();
			return false;
		}
	}
	
	//彩信的短信上行点播码
	if ("228171025" == attrCode || "228141025" == attrCode || "228181025" == attrCode || "228151025" == attrCode ||
		"228161025" == attrCode || "228191025" == attrCode)
	{
		
		if(newValue.indexOf("1065089")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以1065089开头。EC短信基本接入号＋01，即1065022XYABCDE01");
			$(e).select();
			return false;
		}
		
		if(newValue.length < 16){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于16位");
			$(e).select();
			return false;
		}
	}
	// 手机号码
	if ("228150003" == attrCode || "228140003" == attrCode || "228180003" == attrCode || "228170003" == attrCode || "228160003" == attrCode ||
		"228190003" == attrCode || "228090003" == attrCode || "228100003" == attrCode || "228050003" == attrCode || "228080003" == attrCode || 
		"228130003" == attrCode || "228040003" == attrCode || "228110003" == attrCode || "228120003" == attrCode || "228020003" ==attrCode)
	{
		if(!g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号！");
			$(e).select();
			return false; 
		}
	}
}

/*
 *本地MAS（商品）--属性变更校验
 */
function localMas_onValueChange(e,attrCode,oldValue,newValue){

	//IP地址
	if("1101050003"==attrCode || "1101050100" == attrCode || "1101050104" == attrCode){
        var zz = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		if(!zz.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要000.000.000.000格式");
			$(e).select();
			return false;
		}
		var laststr = newValue.split(".");
		if(parseInt(laststr[0])>255 || parseInt(laststr[1])>255 || parseInt(laststr[2])>255 || parseInt(laststr[3])>255)
		{
		    $.showErrorMessage($(e).attr('desc')+"格式不正确，必须是1-255之间");
			$(e).select();
			return false;
		}
    }

	//联系人邮件
	if("1101050007" == attrCode){
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请填写正确的邮箱地址");				
			$(e).select();					
			return false;
		 }
		 return true;
	}
	
	//联系人电话 
	if ("1101050006" == attrCode)
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false; 
		}
	}
	
	//合同附件
	if ("1101059900" == attrCode)
	{
		if (null == newValue || '' == newValue)
		{
			$.showErrorMessage($(e).attr('desc')+"不能为空！");
			$(e).select();
			return false; 
		}
	}
}

/*
 *集团彩信直联(商品)--属性变更校验
 */
 function groupMMS_onValueChange(e,attrCode,oldValue,newValue){
    //EC/SI上行URL
	if("1106014222"==attrCode){
		if($.format.lowercase(newValue).indexOf("http://")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以http://开头");
			$(e).select();
			return false;
		}
		return true;
	}
	
	// EC/SI主机IP地址
	if("1106014208"==attrCode){
	    var zz = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		if(!zz.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要000.000.000.000格式");
			$(e).select();
			return false;
		}
		var laststr = newValue.split(".");
		if(parseInt(laststr[0])>255 || parseInt(laststr[1])>255 || parseInt(laststr[2])>255 || parseInt(laststr[3])>255)
		{
		    $.showErrorMessage($(e).attr('desc')+"格式不正确，必须是1-255之间");
			$(e).select();
			return false;
		}
		return true;
	}
   // 集客部联系电话
   if("1106014221"==attrCode || "1106014219"==attrCode || "1106014216"==attrCode || "1106014232"==attrCode){
      if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确!请输入手机号码格式或电话号码格式");
			$(e).select();
			return false; 
      }
   }
   
   // 短信基本接入号
   if("1106011009"==attrCode){
      if(!g_IsDigit(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确！必须是数字!");
			$(e).select();
			return false; 
      }
   }
   
   //合同附件
	if ("1104019900" == attrCode)
	{
		if (null == newValue || '' == newValue)
		{
			$.showErrorMessage($(e).attr('desc')+"不能为空！");
			$(e).select();
			return false; 
		}
	}
	
}

/*
 *集团短信直联(商品)--属性变更校验
 */
function groupSMS_onValueChange(e,attrCode,oldValue,newValue){

 
	
	// EC/SI主机IP地址
	if("1105014208"==attrCode){
	    var zz = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		if(!zz.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确！需要000.000.000.000格式");
			$(e).select();
			return false;
		}
		var laststr = newValue.split(".");
		if(parseInt(laststr[0])>255 || parseInt(laststr[1])>255 || parseInt(laststr[2])>255 || parseInt(laststr[3])>255)
		{
		    $.showErrorMessage($(e).attr('desc')+"格式不正确！必须是1-255之间");
			$(e).select();
			return false;
		}
		if(newValue=='127.0.0.1')
		{
		   $.showErrorMessage($(e).attr('desc')+"格式不正确！不能是127.0.0.1");
			$(e).select();
			return false;
		}
		return true;
	}
   // 集客部联系电话
   if("1105014221"==attrCode || "1105014219"==attrCode || "1105014216"==attrCode || "1105014232"==attrCode){
      if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确!请输入手机号码格式或电话号码格式");
			$(e).select();
			return false; 
      }
   }
   
   // 短信基本接入号
   if("1105011009"==attrCode){
      if(!g_IsDigit(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确！必须是数字!");
			$(e).select();
			return false; 
      }
   }
   
   // 企业代码
   if("1105012202"==attrCode){
      //检查 企业代码是否为数字
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}

		//检查 企业代码位数是否正确			
		if(newValue.toString().length!=6){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，为6位数字");
			$(e).select();
			return false;
		}
    }
}

/*
 *PushEmail（商品）--属性变更校验
 */
 function pushEmail_onValueChange(e,attrCode,oldValue,newValue){
    if("1101010007"==attrCode || "1112045005"==attrCode){
        var zz = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		if(!zz.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要000.000.000.000格式");
			$(e).select();
			return false;
		}
		var laststr = newValue.split(".");
		if(parseInt(laststr[0])>255 || parseInt(laststr[1])>255 || parseInt(laststr[2])>255 || parseInt(laststr[3])>255)
		{
		    $.showErrorMessage($(e).attr('desc')+"格式不正确，必须是1-255之间");
			$(e).select();
			return false;
		}
    }
   if("1101018008"==attrCode || "1101018007"==attrCode || "1101018002"==attrCode || "1101018006"==attrCode
      || "1112019008"==attrCode || "1112019007"==attrCode || "1112019002"==attrCode || "1112019006"==attrCode )
   {
       if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
        
        if(newValue.substring(0,1)=="0" && newValue.length>1)
        {
           $.showErrorMessage($(e).attr('desc')+"格式不正确，不能以0开头");
			$(e).select();
			return false;
        }
   }
 }
 

/*
*跨省VPMN（商品）--属性变更校验
*/
function groupVPMN_onValueChange(e,attrCode,oldValue,newValue){

	//合同附件
	if ("1111019900" == attrCode)
	{
		if (null == newValue || '' == newValue)
		{
			$.showErrorMessage($(e).attr('desc')+"不能为空！");
			$(e).select();
			return false; 
		}
	}

}

/*
*跨省集团wlan（商品）--属性变更校验
*/
function groupWlan_onValueChange(e,attrCode,oldValue,newValue){

	//处理意见
if ("301013483" == attrCode)
{
	if ("0" == newValue)
	{		
		//未处理原因
		$("#input_301013475").attr("nullable", "yes");
	}
	
	if ("1" == newValue)
	{		
		//未处理原因
		$("#input_301013475").attr("nullable", "no");
	}
}

   //A端对应省公司
if("301013311"==attrCode){
	selectChange(e,attrCode,'301013305',newValue);
}

//账号数量
if("301014327"==attrCode )
  {
      if(g_IsDigit(newValue)==false){
		$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
		$(e).select();
		return false;
	}
       
       if(newValue.substring(0,1)=="0" && newValue.length>1)
       {
          $.showErrorMessage($(e).attr('desc')+"格式不正确，不能以0开头");
		$(e).select();
		return false;
       }
  }
  //联系电话
  if("301013313"==attrCode || "301013406"==attrCode)
  {
     if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
     {
           $.showErrorMessage($(e).attr('desc')+"格式不正确!请输入手机号码格式或电话号码格式");
		$(e).select();
		return false; 
     }
  }
  //带宽
  if("301013307"==attrCode )
  {
       var zz = /^[1-9]\d*(\.\d+)?(M|G)$|^0(\.\d+)?(M|G)$/;
     if(!zz.test(newValue))
     {
           $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入数字加单位!");
		$(e).select();
		return false; 
     }
  }
}
 
 
  /*
 *企业一卡通（商品）--属性变更校验
 */
function businessCard_onValueChange(e,attrCode,oldValue,newValue){
	
		//每日/月下发的最大条数
	if("247011032"==attrCode || "247011033"==attrCode || "247021032"==attrCode || "247021033"==attrCode )
	{
	   if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
		}
        
        if(newValue.substring(0,1)=="0" && newValue.length>1)
        {
           $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
        }
        if(newValue.length>9)
        {
            $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
        }
	}
	
	 //时间格式
	if("247011034"==attrCode || "247011035"==attrCode || "247021034"==attrCode || "247021035"==attrCode || "331051035"==attrCode){
	  var zz = /^([0-1][0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;
		if (!zz.test(newValue) && newValue!="") {
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();	
			return false;
		}
	}
	
	 //EC客户长服务和基本接入号
	if("247011009"==attrCode || "247012009"==attrCode || "247021009"==attrCode || "247022019"==attrCode || "247021019"==attrCode)
	{
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}

		if(newValue.indexOf("106572000")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以106572000开头");
			$(e).select();
			return false;
		}	
		if(newValue.toString().length<=16){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度必须大于16位");
			$(e).select();
			return false;
		}
	}	
	// 英文签名
	if("247020050"==attrCode || "247010050"==attrCode)
	{
	   var filter =/^[a-zA-Z]{1,16}$/;
		if (!filter.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须以英文字母且长度不超过16位");
			$(e).select();					
			return false;
		}
	 }
	 //中文签名
	if("247021031"==attrCode || "247011031"==attrCode)
	{
	   var filter =/^[a-zA-Z0-9\u4E00-\uFA29]{1,8}$/;
		if (!filter.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确,必须为中文，字母或者数字，但不能超过8位");
			$(e).select();					
			return false;
		}
	 }
	// 手机号码
	if("247030023"==attrCode || "248030023"== attrCode || "249030023"== attrCode)
	{
		if(!g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号！");
			$(e).select();
			return false; 
		}
	}
}

/*
 * 移动会议电话（商品）--属性变更校验
 */
function conferencePhone_onValueChange(e,attrCode,oldValue,newValue){

	
	if("9105019105010002"==attrCode || "9105010002"==attrCode)
    {
        if(!g_IsMobileNumber(newValue))
    	{
            $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码！");
			$(e).select();
			return false; 
    	}
    }
    
    if("9105019105010001"==attrCode || "9105010001"==attrCode)
    {
        if(!g_ismail(newValue))
    	{
            $.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的邮箱！");
			$(e).select();
			return false; 
    	}
    }
}

/*
 *呼叫中心直联--属性变更校验
 */
function callCenterJoint_onValueChange(e,attrCode,oldValue,newValue){
	//每日、月下发的最大条数
	if("1113025005"==attrCode || "1113025004"==attrCode || "1113026003"==attrCode){
		if(newValue.length > 9){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于9位");
			$(e).select();
			return false;
		}
		if(!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
	}
	//联系人电话 
	if ("1113026010" == attrCode)
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false; 
		}
	}
	
	//合同附件
	if ("1113019900" == attrCode)
	{
		if (null == newValue || '' == newValue)
		{
			$.showErrorMessage($(e).attr('desc')+"不能为空！");
			$(e).select();
			return false; 
		}
	}
}

/*
 *400国际业务--属性变更校验
 */
function bnsIter400_onValueChange(e,attrCode,oldValue,newValue){
	//每日、月下发的最大条数
	if("4115071033"==attrCode || "4115071032"==attrCode){
		if(newValue.length > 9){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于9位");
			$(e).select();
			return false;
		}
		if(!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
	}
	//EC长服务代码
	if("4115072009"==attrCode){
		if(newValue.indexOf("10657")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以10657开头+400语音的400号码");
			$(e).select();
			return false;
		}
	}
	//EC短信基本接入号
	if("4115071009"==attrCode){
		if(newValue.indexOf("10657")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以10657开头+400语音的400号码");
			$(e).select();
			return false;
		}
	}
	//集团客户短信接收手机号
	if("4115070003"==attrCode){
		if(!g_IsMobileNumber){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
	}
	//中文短信/彩信正文签名
	if("4115071031"==attrCode){
		if (newValue.toString().length>8){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于8位");
			$(e).select();					
			return false;
		}
	}
	//EC企业码
	if("4115071028"==attrCode){
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		if(newValue.toString().length>6){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于6位");
			$(e).select();
			return false;
		}
	}
	
	//不允许下发开始时间（HHMMSS） 不允许下发结束时间（HHMMSS）
	if("4115071034"==attrCode || "4115071035"==attrCode){
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		//时间格式：hhmmss
		if(!g_IsTime(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();
			return false;
		}
	}
}

/*
 *400业务--属性变更校验
 */
function business400_onValueChange(e,attrCode,oldValue,newValue){

    // 阻截省下拉联动
	if("4115027012" == attrCode){
		selectChange(e,attrCode,'4115027016',newValue);
	}
	//时间格式：hhmmss
	if("4115061035"==attrCode || "4115091034"==attrCode || "4115061034"==attrCode || "4115091035"==attrCode){
		if(!g_IsTime(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();
			return false;
		}
	}
	// 400预占流水号
	if("4115017007"==attrCode){
	    if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		
		if(newValue.length !=6)
		{
		     $.showErrorMessage($(e).attr('desc')+"格式不正确，长度为6位");
			$(e).select();
			return false;
		}
	}
	
	// 400号码
	if("4115017001"==attrCode || "4115027011"==attrCode || "4115037011"==attrCode || "4115047011"==attrCode || "4115097011"==attrCode){
	    if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		if(newValue.indexOf("4001")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以4001开头");
			$(e).select();
			return false;
		}
		if(newValue.length !=10)
		{
		     $.showErrorMessage($(e).attr('desc')+"格式不正确，长度为10位");
			$(e).select();
			return false;
		}
		
		if("4115097011"==attrCode)
		{
		    $('#input_4115091009').val('10657'+newValue);
			$('#input_4115091009').attr("disabled",true);
			$('#input_4115092009').val('10657'+newValue);
			$('#input_4115092009').attr("disabled",true);
			changeValue($('#input_4115091009')[0]);
			changeValue($('#input_4115092009')[0]);
		}
	}
	
	
	//EC短信基本接入号
	if("4115061009"==attrCode || "4115091009"==attrCode){
	   
	     if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		if(newValue.indexOf("106574001")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以106574001开头");
			$(e).select();
			return false;
		}
		if(newValue.length<15)
		{
		     $.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于15位");
			$(e).select();
			return false;
		}
	}
	//EC长服务代码
	if("4115062009"==attrCode || "4115092009"==attrCode){  
	     if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		if(newValue.indexOf("106574001")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以106574001开头");
			$(e).select();
			return false;
		}
		if(newValue.length<15)
		{
		     $.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能小于15位");
			$(e).select();
			return false;
		}
	}
	//EC企业码
	if("4115061028"==attrCode || "4115091028"==attrCode){
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		if(newValue.toString().length>6){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于6位");
			$(e).select();
			return false;
		}
	}
	//中文短信/彩信正文签名
	if("4115061031"==attrCode || "4115091031"==attrCode){
		if (newValue.toString().length>8){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于8位");
			$(e).select();					
			return false;
		}
	}
	//每日、月下发的最大条数
	if("4115061033"==attrCode || "4115061032"==attrCode ||"4115091032"==attrCode || "4115091033"==attrCode){
		if(newValue.length > 9){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于9位");
			$(e).select();
			return false;
		}
		if(!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
	}
	//邮箱 
	if("4115017008"==attrCode){
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的邮箱格式");				
			$(e).select();					
			return false;
		}
	}
	//0－400平台网站不可以上传白名单,1-可以上传白名单 || 0－主叫号码按发话位置1－主叫号码按归属位置
	if("4115017031"==attrCode || "4115017030"==attrCode){
		if("0" != newValue && "1" != newValue){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入0或者1");				
			$(e).select();					
			return false;
		}
	}
	//400语音密码接入
	if("4115037013"==attrCode){
		if(newValue.length > 4){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，长度不能大于4位");
			$(e).select();
			return false;
		}
		if(!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
	}
	//目的地号码数量
	if("4115017032"==attrCode){
		if(!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须为数字");
			$(e).select();
			return false;
		}
		if(parseInt(newValue)< 1){
			$.showErrorMessage($(e).attr('desc')+"、不能小于1");
			$(e).select();
			return false;
		}
		 var operType = $("#productOperType").val();
		 if(operType=='9')
		 {
		    var user_id =  $("#GRP_USER_ID").val();// 返回用户的属性
             
             // 校验目的地
             Wade.httphandler.submit('','com.ailk.csview.group.verifyClass.frontDataVerify','qryOldValue',
			'&USER_ID='+user_id+'&ATTR_CODE=4115017032',
			function(d){
					var param = d.map.result;
					//目的地号码个数
					var attr_value = param.get(0,'ATTR_VALUE');
					var attr_Code = param.get(0,'ATTR_CODE');
					if(parseInt(newValue)<parseInt(attr_value))
					{
					  $.showSucMessage("目的地号码由多到少时,请先在平台删除号码");
					}    
				
			},function(e,i)
			{
				$.showErrorMessage("操作失败");
				result=false;
			},
			{async:false});
		 }
	}
    
}

/*
 *集团客户一点支付--属性变更校验
 */
function GroupCustLine_onValueChange(e,attrCode,oldValue,newValue){
	//管理员邮箱
	if("999033712"==attrCode)
	{
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage($(e).attr('desc')+"格式不正确！");				
			$(e).select();					
			return false;
		 }
		 return true;
	}
	
	//联动下拉框
	 // 阻截省下拉联动
	if("999033720" == attrCode){
		selectChange(e,attrCode,'999033721',newValue);
	}
	
	//联系人电话
	if("999033725"==attrCode || "999033723"==attrCode || "999033711"==attrCode)
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false;
		}
	}
	
	  //代付比例
	if("999031008"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1>100 || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage($(e).attr('desc')+"不正确,应为0-100的整数");
			$(e).select();					
			return false;
		}
		return true;
	}
	
	 //代付金额
	if("999031007"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage($(e).attr('desc')+"不正确,应大于0");
			$(e).select();					
			return false;
		}
		return true;
	}
	
	//是否统一资费
	if("999033703"==attrCode){
		if("1"==newValue){
			$('#PARAM_NAME_999033704').addClass('e_required');
			$('#input_999033704').attr('nullable', 'no');
		}
		else if("0"==newValue){
			$('#PARAM_NAME_999033704').removeClass('e_required');
			$('#input_999033704').attr('nullable', 'yes');
		}
	}
}


/*
 *个人帐单代付--属性变更校验
 */
function PersonBillPay_onValueChange(e,attrCode,oldValue,newValue){
      //代付比例
	if("999021008"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1>100 || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage($(e).attr('desc')+"不正确,应为0-100的整数");
			$(e).select();					
			return false;
		}
		return true;
	}
	
	 //代付金额
	if("999021007"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage($(e).attr('desc')+"不正确,应大于0");
			$(e).select();					
			return false;
		}
		return true;
	}
}

/*
 *跨省行业应用卡--属性变更校验
 */
function specialApp_onValueChange(e,attrCode,oldValue,newValue){
	//配合省联系人手机号
	if("9116014552"==attrCode)
	{
		if(!g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
	}
}

/*
 *跨国数据专线--属性变更校验
 */
function gloabSpecialLine_onValueChange(e,attrCode,oldValue,newValue){

	//联系人电话
	if("1112073322"==attrCode || "1112073313"==attrCode || "1112073407"==attrCode || "1112073444"==attrCode || "1112073411"==attrCode ||
		"1112063407"==attrCode ||"1112063411"==attrCode ||"1112063322"==attrCode ||"1112063313"==attrCode ||"1112063444"==attrCode )
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false;
		}
	}

}

/*
 *本地企业飞信--属性变更校验
 */
function locGroupFetion_onValueChange(e,attrCode,oldValue,newValue){
	//管理员邮箱
	if("910601006"==attrCode || "9106011019"==attrCode) 
	{
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage($(e).attr('desc')+"格式不正确！");				
			$(e).select();					
			return false;
		 }
		 return true;
	}
	//集团客户联系人手机号码
	if("910601007"==attrCode)
	{
		if(!g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
	}
	// 注册号码
	if("9106011017"==attrCode)
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入手机号码或固定电话");
			$(e).select();
			return false;
		}
	}
    //代付比例
	if("9106011025"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1>100 || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage($(e).attr('desc')+"不正确,应为0-100的整数");
			$(e).select();					
			return false;
		}
		return true;
	}
	if("9106011024"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage($(e).attr('desc')+"不正确,应大于等于0");
			$(e).select();					
			return false;
		}
		return true;
	}

}

/*
 *IMS多媒体彩铃--属性变更校验
 */
function customRingingIMS_onValueChange(e,attrCode,oldValue,newValue){

	//管理员手机号码
	if("9104010002"==attrCode)
	{
		if(!g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的手机号码");
			$(e).select();
			return false;
		}
	}
	//管理员邮箱
	if("9104010001"==attrCode || "9104011011"==attrCode)
	{
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage($(e).attr('desc')+"格式不正确！");				
			$(e).select();					
			return false;
		 }
		 return true;
	}
}

/*
 *本地M2M（商品）--属性变更校验
 */
function localM2M_onValueChange(e,attrCode,oldValue,newValue){

	if ("1101070004" == attrCode || "1101070002" == attrCode)
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false; 
		}
	}
	//合同附件
	if ("1101070011" == attrCode)
	{
		if (null == newValue || '' == newValue)
		{
			$.showErrorMessage($(e).attr('desc')+"不能为空！");
			$(e).select();
			return false; 
		}
	}

}

/*
chenyi
 *专线业务--属性变更校验
 */
function LineBusiness_onValueChange(e,attrCode,oldValue,newValue){

	if ("1112053407" == attrCode || "1112053313" == attrCode || "1112053322" == attrCode || "1112053411" == attrCode)
	{
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确！请输入手机号格式或电话号码格式");
			$(e).select();
			return false; 
		}
	}
  //A 端省公司 1112053311  1112053305 
	if ("1112053311" == attrCode)
	{
		 selectChange(e,attrCode,'1112053305',newValue);
	}
	//Z端省公司 1112053306
	if ("1112053320" == attrCode  )
	{
		 selectChange(e,attrCode,'1112053306',newValue);
	}
	
	 //A,Z端支付比例
	if("1112054311"==attrCode||"1112054312"==attrCode||"1112054314"==attrCode||"1112054315"==attrCode){
		if(g_IsDigit(newValue)==false || newValue*1>100 || newValue*1<0){
			//套餐折扣不正确
			$.showErrorMessage($(e).attr('desc')+"不正确,应为0-100的整数,且所有一次性费用（A端，Z端）的比例和为100");
			$(e).select();					
			return false;
		}
		return true;
	}

//带宽(请填写单位:M或G)
	if ("1112053307"==attrCode){
		var zz = /^[1-9]\d*(\.\d+)?(M|G)$|^0(\.\d+)?(M|G)$/;
		if(!zz.test(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"的格式不正确，请输入数字加单位!");
			$(e).select();					
			return false;
		}
	}
}

/*
 *中央ADC业务（商品）--属性变更校验
 */
function centerADC_onValueChange(e,attrCode,oldValue,newValue){
	//时间格式
	if("1102231035"==attrCode || "1102231034"==attrCode || "1102241035"==attrCode || "1102241034"==attrCode || "1102201035"==attrCode||
		"1102161035"==attrCode || "1102171034"==attrCode || "1102161034"==attrCode || "1102011034"==attrCode || "1102011035"==attrCode||
		"1102171035"==attrCode || "1102191035"==attrCode || "1102201034"==attrCode || "1102191034"==attrCode || "1102181034"==attrCode||
		"1102181035"==attrCode){
	  var zz = /^([0-1][0-9]|2[0-3])([0-5][0-9])([0-5][0-9])$/;
		if (!zz.test(newValue) && newValue!="") {
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的时间格式(HHMMSS)");
			$(e).select();	
			return false;
		}
	}
	
	//EC彩信基本接入号
	if ("1102241019" == attrCode)
	{
		
		if(newValue.indexOf("1065022")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以1065022开头");
			$(e).select();
			return false;
		}
		if(newValue.length!=14 )
		{
		    $.showErrorMessage($(e).attr('desc')+"格式不正确，需要以1065022开头。即1065022XYABCDE");
			$(e).select();
			return false;
		}
		
		 //集团客户首月测试网信数量默认为0，不可变动
	      $('#input_1102241025').val(newValue+'01');
		  $('#input_1102241025').attr("disabled",true);
		
	}
	
	//彩信的短信上行点播码
	if ("1102241025" == attrCode)
	{
		
		if(newValue.indexOf("1065022")!=0){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要以1065022开头");
			$(e).select();
			return false;
		}
		if(newValue.length!=16 || newValue.substring(14,16)!='01')
		{
		    $.showErrorMessage($(e).attr('desc')+"格式不正确，需要以1065022开头。EC短信基本接入号＋01，即1065022XYABCDE01");
			$(e).select();
			return false;
		}
		
	}
	
	//每月下发的最大条数 每日下发的最大条数
	if("1102241033"==attrCode || "1102241032"==attrCode)
	{
       if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请输入正确的下发条数");
			$(e).select();
			return false;
		}
	}
	// 手机号码
	if ("1102240003"==attrCode || "1102170003"==attrCode || "1102160003"==attrCode || "1102020003"==attrCode || "1102180003"==attrCode
		|| "1102230003"==attrCode || "1102200003"==attrCode || "1102190003"==attrCode)
    {
      if(!g_IsMobileNumber(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确！");
			$(e).select();
			return false; 
      }
   }
}

/*
 *主办省全网MAS彩信（商品）--属性变更校验
 */
function hostNetMasMMS_onValueChange(e,attrCode,oldValue,newValue){

	 // 联系电话
	if("199024216"==attrCode || "199024221"==attrCode || "199014232"==attrCode){
	
		if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
		{
			$.showErrorMessage($(e).attr('desc')+"格式不正确!请输入手机号码格式或电话号码格式");
			$(e).select();
			return false; 
		}
		
	}

	// 企业代码
	if("199020004"==attrCode){
	    //检查 企业代码是否为数字
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}
		
		//检查 企业代码位数是否正确			
		if(newValue.toString().length!=6){
			$.showErrorMessage($(e).attr('desc')+"格式不正确！为6位数字");
			$(e).select();
			return false;
		}
	}
	
	//彩信基本接入号
	if("199021019"==attrCode)
	{
		if (!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确,必须为数字");
			$(e).select();					
			return false;
		}
	}
	
	//主IP地址(浮动IP请填写“127.0.0.1”)
	if("199024417"==attrCode){
		var zz = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		if(!zz.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"不正确，需要000.000.000.000格式");
			$(e).select();
			return false;
		}
		var laststr = newValue.split(".");
		if(parseInt(laststr[0])>255 || parseInt(laststr[1])>255 || parseInt(laststr[2])>255 || parseInt(laststr[3])>255)
		{
		    $.showErrorMessage($(e).attr('desc')+"不正确，必须是1-255之间");
			$(e).select();
			return false;
		}
	}
}

/*
 *主办省全网MAS短信（商品）--属性变更校验
 */
function hostNetMas_onValueChange(e,attrCode,oldValue,newValue){
   // 企业代码
   if("199010004"==attrCode){
      //检查 企业代码是否为数字
		if(g_IsDigit(newValue)==false){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，请确保所有字符都为有效数字");
			$(e).select();
			return false;
		}

		//检查 企业代码位数是否正确			
		if(newValue.toString().length!=6){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，为6位数字");
			$(e).select();
			return false;
		}
    }
    
    // 英文签名
	if("199010013"==attrCode)
	{
	   var filter =/^[a-zA-Z]{1,8}$/;
		if (!filter.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，必须以英文字母且长度不超过8位");
			$(e).select();					
			return false;
		}
	 }
	 //中文签名
	if("199010012"==attrCode)
	{
	   var filter =/^[a-zA-Z0-9\u4E00-\uFA29]{1,8}$/;
		if (!filter.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确,必须为中文，字母或者数字，但不能超过8位");
			$(e).select();					
			return false;
		}
	 }
	 
	//短信基本接入号
	if("199011009"==attrCode)
	{
	  
		if (!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确,必须为数字");
			$(e).select();					
			return false;
		}
	 }
	 
	//数字
	if("199014202"==attrCode || "199014203"==attrCode || "199014211"==attrCode)
	{
	  
		if (!g_IsDigit(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确,必须为数字");
			$(e).select();					
			return false;
		}
		if(newValue.substring(0,1)=="0" && newValue.length>1)
        {
           $.showErrorMessage($(e).attr('desc')+"格式不正确，不能以0开头");
			$(e).select();
			return false;
        }
	 }
	 // 联系电话
	 // 集客部联系电话
   if("199014216"==attrCode || "199014219"==attrCode || "199014221"==attrCode||"1101020031"==attrCode||"1101020027"==attrCode){
      if(!g_IsTelephoneNumber(newValue) && !g_IsMobileNumber(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确!请输入手机号码格式或电话号码格式");
			$(e).select();
			return false; 
      }
   }
   //IP地址
  if("199014418"==attrCode){
        var zz = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
		if(!zz.test(newValue)){
			$.showErrorMessage($(e).attr('desc')+"格式不正确，需要000.000.000.000格式");
			$(e).select();
			return false;
		}
		var laststr = newValue.split(".");
		if(parseInt(laststr[0])>255 || parseInt(laststr[1])>255 || parseInt(laststr[2])>255 || parseInt(laststr[3])>255)
		{
		    $.showErrorMessage($(e).attr('desc')+"格式不正确，必须是1-255之间");
			$(e).select();
			return false;
		}
		if(newValue=='127.0.0.1')
		{
		   $.showErrorMessage($(e).attr('desc')+"格式不正确，不能是127.0.0.1");
			$(e).select();
			return false;
		}
    }
    
    if("199014417"==attrCode){
        if($('#input_199014416').val()=='浮动IP')
        {
           if(newValue !='127.0.0.1')
		  {
			   $.showErrorMessage($(e).attr('desc')+"格式不正确，请填127.0.0.1");
				$(e).select();
				return false;
			}
        }
        else
        {
        
	        var zz = /^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/;
			if(!zz.test(newValue)){
				$.showErrorMessage($(e).attr('desc')+"格式不正确，需要000.000.000.000格式");
				$(e).select();
				return false;
			}
			var laststr = newValue.split(".");
			if(parseInt(laststr[0])>255 || parseInt(laststr[1])>255 || parseInt(laststr[2])>255 || parseInt(laststr[3])>255)
			{
			    $.showErrorMessage($(e).attr('desc')+"格式不正确，必须是1-255之间");
				$(e).select();
				return false;
			}
			if(newValue=='127.0.0.1')
			{
			   $.showErrorMessage($(e).attr('desc')+"格式不正确，不能是127.0.0.1");
				$(e).select();
				return false;
			}
	   }
    }
}
 
/*
 *公众服务云业务--属性变更校验
 */
function pubCloudSvc_onValueChange(e,attrCode,oldValue,newValue){

 
	 // 集客部联系电话
   if("1116011005"==attrCode || "1116011004"==attrCode){
      if(!g_IsTelephoneNumber(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确！");
			$(e).select();
			return false; 
      }
   }
   
    // 手机号码
   if("1116011002"==attrCode){
      if(!g_IsMobileNumber(newValue))
      {
            $.showErrorMessage($(e).attr('desc')+"格式不正确！");
			$(e).select();
			return false; 
      }
   }
   
   // 邮件
   if("1116011003" == attrCode || "1116011006" == attrCode || "1116011013" == attrCode){
		//正则表达式验证邮箱格式
		var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
		if (!filter.test(newValue)){	
			$.showErrorMessage($(e).attr('desc')+"格式不正确！");				
			$(e).select();					
			return false;
		 }
		 return true;
	}

}
 
/*****************************************基础校验方法*********************************************/
//校验是否为数字类型
function g_IsDigit(s){
	 if(s==null){
	 	return false;
	 }
	 if(s==''){
	 	return true;
	 }
	 s=''+s;
	 if(s.substring(0,1)=='-' && s.length>1){
	 	s=s.substring(1,s.length);
	 }
	 var patrn=/^[0-9]*$/;
	 if (!patrn.exec(s)){
	 	return false;
	 }
	 return true
}

//校验是否为手机号码
function g_IsMobileNumber(s)
{
	if(s==null || s==''){
		return true;
	}
	if( s.length!=11 || ( s.substring(0,2)!='13' && s.substring(0,2)!='15' && 
		s.substring(0,3)!='147' && s.substring(0,3)!='186' && s.substring(0,3)!='189' && 
		s.substring(0,3)!='188' && s.substring(0,3)!='187' && s.substring(0,3)!='182' && s.substring(0,3)!='183' && s.substring(0,3)!='180')){
		return false;
	}
	if(!g_IsDigit(s)){
		return false;
	}
	return true
}

//校验是否为时间格式：hhmmss
function g_IsTime(s)
{
	var zz = /^(0[0-9]|1[0-9]|2[0-3]){1}(0[0-9]|1[0-9]|2[0-9]|3[0-9]|4[0-9]|5[0-9]){2}$/;
	if(!zz.exec(s)){
		return false;
	}
	return true
}

//校验电话号码  
//兼容格式：区号（3-4）-电话号码(7到8位)
function g_IsTelephoneNumber(s)
{
   var zz =/^(0\d{2,3}-)?(\d{7,8})$/;
   if(!zz.exec(s))
   {
        return false;
   }
   return true;
}

//一般情况下，当属性值为空时不进行校验，但某些情况比较特殊，即使为空也需要校验
function isNotInTheseCodes(attrCode)
{
	if(attrCode=="1112053311" || attrCode=="1112053320" || attrCode=="301013311" || attrCode=="4115027012" || attrCode =="999033720"){
		return false;
	}
	return true;
}

// 邮箱格式
function g_ismail(s)
{
      //正则表达式验证邮箱格式
	var filter  = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;	
	if (!filter.test(s)){	
						
		return false;
	 }
	 return true;
}

// 下拉联动公用方法

 function selectChange(e,attrCode,cityCode,newValue){
     //如果省份是请选择的情况下，则城市对应的组件设置成不可编辑的状态，否则可编辑
		if(newValue=='' || newValue==null){
			$('#input_'+cityCode).attr('value','');
			changeValue($('#input_'+cityCode)[0]);
			$('#input_'+cityCode).attr('disabled',true);
			return true;
		}else{
			$('#input_'+cityCode).attr('disabled',false);
		}
	
		//根据选择的省公司获取该省公司对应的城市
		Wade.httphandler.submit('','com.ailk.csview.group.verifyClass.frontDataVerify','chooseCitys',
			'&PROVINCE_ATTR_CODE='+attrCode+'&PROVINCE_ATTR_VALUE='+newValue+'&CITY_ATTR_CODE='+cityCode,
			function(d){
				var rowData = $.table.get("productParamTable").getRowData("FLAG");
				var _index = rowData.get("FLAG") - 1;
				var city = $("select[id='input_"+cityCode+"']");
				//拼option对象
				var innerObj ="<OPTION title=--请选择-- selected value=''>--请选择--</OPTION>";				
				var citys = d.map.result;
				for(var i=0;i<citys.length;i++){
					innerObj=innerObj+"<OPTION title="+citys.get(i,'OPTION_NAME')+" value="+citys.get(i,'OPTION_VALUE')+">"+
						citys.get(i,'OPTION_NAME')+"</OPTION>";
				}
				
				//新option对象替换老对象
				if (-1 != _index)
				{
					$(city[_index]).html(innerObj)
					changeValue(city[_index])
				}
				else
				{
					$('#input_'+cityCode).attr('value','');
				    changeValue($('#input_'+cityCode)[0]);
					$('#input_'+cityCode)[0].innerHTML="";
					$('#input_'+cityCode).html(innerObj);
				}
			},function(e,i)
			{
				$.showErrorMessage("操作失败");
				$(e).select();
				return false;
			}
		);
   
 }
