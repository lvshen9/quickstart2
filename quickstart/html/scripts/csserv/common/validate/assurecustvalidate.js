(function($){
	$.extend({
	
	assurecustValidate : {
		psptTypeCodeKey : "AGENT_PSPT_TYPE_CODE", // 页面中定义的经办人证件类型ID
		psptIdKey : "AGENT_PSPT_ID", // 页面中定义的经办人证件号码ID
		psptAddressKey : "AGENT_ADDRESS", // 页面中定义的经办人证件号码ID
		custNameKey : "AGENT_NAME", // 页面中定义的经办人名称ID
		contactPhoneKey : "ASSURE_PHONE", // 页面中定义的联系电话ID
		
		// 工具校验方法
		isBlank : function(key)
		{
			if(!key || key == null || $.trim(key).length == 0) return true;
		},
		
		isNotBlank : function(key)
		{
			if(key && key != null && $.trim(key).length > 0) return true;
		},
		
		isChinese : function(val)
		{
			var model = /^[\u4E00-\u9FA5]+$/;
			if(model.exec(val)) return true;
			return false;
		},
		
		isNumber : function(val)
		{
			var model = /^[0-9]+$/;
    		if(model.exec(val)) return true;
    		return false;
		},
		
		countChinese : function(val)
		{
			var varLen = val.length;
			
			var chineseCount = 0;
			
			for(var i = 0, row = varLen; i < row; i++)
			{
				if($.assurecustValidate.isChinese(val.substr(i, 1)))
				{
					chineseCount++;
				}
			}
			
			return chineseCount;
		},
		
		isContainSpecial : function(val)
		{
			var model= /^[A-Za-z0-9\u4E00-\u9FA5]+$/;
			if(!model.exec(val)) return true;
			return false;
		},
		
		isContainPartSpecial : function(val) //包含.。
		{
			var model= /^[A-Za-z0-9\u4E00-\u9FA5\•\.]+$/;
			if(!model.exec(val)) return true;
			return false;
		},
		
		isNotContainNumber : function(val)
		{
			var model= /[\d]+/;
			if(!model.exec(val)) return true;
			return false;
		},	
		
		// 判断是否身份证份证号码
		isIdCard : function(idCard)
		{
			// 身份证位数校验
			if(idCard.length != 18) return "身份证号码必须为18位!";
			
			//if(idCard.length == 15 && !$.assurecustValidate.isNumber(idCard)) return "15位身份证号码必须全为数字";
			
			if(idCard.length == 18 && !$.assurecustValidate.isNumber(idCard.substr(0,17))) return "18位身份证号码前17位必须全为数字";
			
			// 身份证出生年月日校验
			var year =  idCard.substring(6,10);  
    		var month = idCard.substring(10,12);  
    		var day = idCard.substring(12,14);  
    		var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
    		
    		if(birthday.getFullYear() != parseFloat(year) || birthday.getMonth() != parseFloat(month) - 1 || birthday.getDate() != parseFloat(day))
			{
				return "身份证号码出生年月日有误, 您输入的为[" + year + month + day + "],请输入有效的身份证号码!";
			}
			
			// 18位身份证末位校验
			if(idCard.length == 18)
			{
				var x = 0;
		    	var y = "";
		    	var c = idCard.substring(17,18).toUpperCase();  
		  		for(i = 18; i >= 2; i--)
		  		{
		  			x = x + (Math.pow(2, (i-1)) % 11) * parseInt(idCard.charAt(19 - i - 1));
		    		x %= 11;
		  		}
		    	
		    	y = 12 - x;
		  		if (x == 0) y = "1";
		  		if (x == 1) y = "0";
		  		if (x == 2) y = "X";
				
		  		if(c != y) return "18位身份证号码不合法,请输入有效的身份证号码!";
			}
			
			return true;
		},
		
		
		// 校验经办人证件类型
		validatePsptTypeCode : function(psptTypeCodeKey)
		{
			if($.assurecustValidate.isNotBlank(psptTypeCodeKey))
			{
				$.assurecustValidate.psptTypeCodeKey = psptTypeCodeKey;
			}
			
			// 获取经办人证件类型
			var psptTypeCode = $("#" + $.assurecustValidate.psptTypeCodeKey).val();
			
			return true;
		},
		
		// 校验经办人名称
		validateCustName : function(psptTypeCodeKey, custNameKey)
		{
			// 校验经办人证件类型
			if(!$.assurecustValidate.validatePsptTypeCode(psptTypeCodeKey)) return false;
			
			// 获取经办人证件类型
			var psptTypeCode = $("#" + $.assurecustValidate.psptTypeCodeKey).val();
			
			if($.assurecustValidate.isNotBlank(custNameKey))
			{
				$.assurecustValidate.custNameKey = custNameKey;
			}
			
			// 获取经办人名称
			var custName = $("#" + $.assurecustValidate.custNameKey).val();
			custName = $.trim(custName);
			if(custName != '' && $.assurecustValidate.isContainPartSpecial(custName))
			{
				alert($("#" + $.assurecustValidate.custNameKey).attr("desc")+"不能含有特殊字符!");
				$("#" + $.assurecustValidate.custNameKey).val("");
				return false;
			}
			
			if(custName != '' && $.assurecustValidate.isNumber(custName))
			{
				alert($("#" + $.assurecustValidate.custNameKey).attr("desc")+"不能全部是数字!");
				$("#" + $.assurecustValidate.custNameKey).val("");
				return false;
			}
			
			// 身份证、户口簿、军官证、警官证、港澳居民来往内地通信证、台湾居民来往大陆通信证：经办人名称须大于等于两个汉字
			if(/^[0,1,2]*$/.exec(psptTypeCode))
			{
				if(custName.length < 4 && $.assurecustValidate.countChinese(custName) < 2)
				{
					alert($("#" + $.assurecustValidate.custNameKey).attr("desc")+"大于或等于两个汉字或大于等于四个字符!");
					$("#" + $.assurecustValidate.custNameKey).val("");
					return false;
				}
			}
			var names=['代办','代理','全球通','动感地带','套餐','大灵通','乡镇通','无权户','无档户'];
			for(var i=0;i<names.length;i++){
				if(custName.indexOf(names[i])!=-1){
					alert("名字不能包含代办,代理,全球通,动感地带,套餐,大灵通,乡镇通,无权户,无档户");
					$("#" + $.assurecustValidate.custNameKey).val("");
					return false;
				}
			}
			/*
			// 护照：经办人名称须大于三个字符, 不能全为阿拉伯数字
			else if(/^[A]*$/.exec(psptTypeCode))
			{
				if(custName.length < 3 || $.assurecustValidate.isNumber(custName))
				{
					alert($("#" + $.assurecustValidate.custNameKey).attr("desc")+"须大于三个字符,不能全为阿拉伯数字!");
					$("#" + $.assurecustValidate.custNameKey).val("");
					return false;
				}
			}*/
			
			return true;
		},
		
		// 校验经办人证件号码
		validatePsptId : function(psptTypeCodeKey, psptIdKey)
		{
			// 校验经办人证件类型
			if(!$.assurecustValidate.validatePsptTypeCode(psptTypeCodeKey)) return false;
			
			// 获取经办人证件类型
			var psptTypeCode = $("#" + $.assurecustValidate.psptTypeCodeKey).val();
			
			// 初始化
			if($.assurecustValidate.isNotBlank(psptIdKey))
			{
				$.assurecustValidate.psptIdKey = psptIdKey;
			}
			
			// 获取经办人证件号码
			var psptId = $("#" + $.assurecustValidate.psptIdKey).val();
			
			if($.assurecustValidate.isNotContainNumber(psptId))
			{
				alert("证件号码必须含有数字!");
				$("#" + $.assurecustValidate.psptIdKey).val("");
				return false;
			}
			
			if(/^[0,1,2]*$/.exec(psptTypeCode))// 身份证号码须为15位或18位, 户口簿必须填写身份证号码
			{
				var psptDesc = $.assurecustValidate.isIdCard(psptId);
				
				if(true != psptDesc)
				{
					alert(psptDesc);
					$("#" + $.assurecustValidate.psptIdKey).val("");
					return false;
				}
			}
			/*
			else if(/^[A,C,G]*$/.exec(psptTypeCode))// 军官证、警官证、护照：经办人证件号码须大于等于6位字符
			{
				if(!$.verifylib.checkMinLength(psptId, 6))
				{
					alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"须大于或等于6位字符!");
					$("#" + $.assurecustValidate.psptIdKey).val("");
					return false;
				}
			}
			else if(/^[H]*$/.exec(psptTypeCode))// 
			{
				if($.verifylib.checkLength(psptId, 8))
				{
					if(!$.assurecustValidate.isNumber(psptId))
					{
						alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"为8位时, 必须全为数字!");
						$("#" + $.assurecustValidate.psptIdKey).val("");
						return false;
					}
				}
				else if($.verifylib.checkLength(psptId, 9))
				{
					if(!/^[H,M]*$/.exec(psptId.substr(0,1)) || !$.assurecustValidate.isNumber(psptId.substr(1)))
					{
						alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"输入有误!");
						$("#" + $.assurecustValidate.psptIdKey).val("");
						return false;
					}
				}
				else if($.verifylib.checkLength(psptId, 11))
				{
					if(/^[H,M]*$/.exec(psptId.substr(0,1)) || !$.assurecustValidate.isNumber(psptId.substr(1)))
					{
						alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"输入有误!");
						$("#" + $.assurecustValidate.psptIdKey).val("");
						return false;
					}
				}
				else
				{
					alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"经办人证件号码输入有误!");
					$("#" + $.assurecustValidate.psptIdKey).val("");
					return false;
				}
			}*/
			else if(/^[E]*$/.exec(psptTypeCode))//单位营业执照
			{
				if(!$.verifylib.checkLength(psptId, 15))
				{
					alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"须等于15位字符!");
					$("#" + $.assurecustValidate.psptIdKey).val("");
					return false;
				}
			}
			else if(/^[K]*$/.exec(psptTypeCode))//组织机构代码证
			{
				if(!$.verifylib.checkLength(psptId, 10))
				{
					alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"须等于10位字符!");
					$("#" + $.assurecustValidate.psptIdKey).val("");
					return false;
				}
				if(psptId.substr(psptId.length-2,1)!="-"){
					alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"倒数第二位为'-'!");
					$("#" + $.assurecustValidate.psptIdKey).val("");
					return false;
				}
			}
			else if(/^[R]*$/.exec(psptTypeCode))//事业单位法人证书
			{
				if(!$.verifylib.checkLength(psptId, 12))
				{
					alert($("#" + $.assurecustValidate.psptIdKey).attr("desc")+"须等于12位字符!");
					$("#" + $.assurecustValidate.psptIdKey).val("");
					return false;
				}
			}
			
			return true;
		},
		
		// 校验联系人电话
		validateContactPhone : function(contactPhoneKey)
		{
			if($.assurecustValidate.isNotBlank(contactPhoneKey))
			{
				$.assurecustValidate.contactPhoneKey = contactPhoneKey;
			}
			
			// 联系人电话
			var contactPhone = $("#" + $.assurecustValidate.contactPhoneKey).val();
			if(contactPhone.trim().length < 6 || !$.assurecustValidate.isNumber(contactPhone))
			{
				alert($("#" + $.assurecustValidate.contactPhoneKey).attr("desc")+"为大于6位的数字!");
				$("#" + $.assurecustValidate.contactPhoneKey).val("");
				return false;
			}
			
			return true;
		},
		
		// 校验经办人证件地址
		validatePsptAddress : function(psptTypeCodeKey, psptAddressKey)
		{
			// 校验经办人证件类型
			if(!$.assurecustValidate.validatePsptTypeCode(psptTypeCodeKey)) return false;
			
			// 获取经办人证件类型
			var psptTypeCode = $("#" + $.assurecustValidate.psptTypeCodeKey).val();
			
			// 初始化
			if($.assurecustValidate.isNotBlank(psptAddressKey))
			{
				$.assurecustValidate.psptAddressKey = psptAddressKey;
			}
			
			// 获取经办人证件地址
			var psptAddress = $("#" + $.assurecustValidate.psptAddressKey).val();
			psptAddress = $.trim(psptAddress);
			
			
			if(psptAddress != '' && $.assurecustValidate.isContainSpecial(psptAddress))
			{
				alert($("#" + $.assurecustValidate.psptAddressKey).attr("desc")+"不能含有特殊字符!");
				$("#" + $.assurecustValidate.psptAddressKey).val("");
				return false;
			}
			
			if(psptAddress != '' && $.assurecustValidate.isNumber(psptAddress))
			{
				alert($("#" + $.assurecustValidate.psptAddressKey).attr("desc")+"不能全部是数字!");
				$("#" + $.assurecustValidate.psptAddressKey).val("");
				return false;
			}
			
			//身份证、户口簿：须大于等于8个汉字
			/*
			if(/^[0,1,2,C,G,H,J]*$/.exec(psptTypeCode))
			{
				if($.assurecustValidate.countChinese(psptAddress) < 8)
				{
					alert($("#" + $.assurecustValidate.psptAddressKey).attr("desc")+"须大于或等于8个汉字!");
					$("#" + $.assurecustValidate.psptAddressKey).val("");
					return false;
				}
			}
			else if(/^[A]*$/.exec(psptTypeCode))
			{
				if($.assurecustValidate.countChinese(psptAddress) < 2)
				{
					alert($("#" + $.assurecustValidate.psptAddressKey).attr("desc")+"须大于或等于2个汉字!");
					$("#" + $.assurecustValidate.psptAddressKey).val("");
					return false;
				}
			}*/
			if(/^[0,1,2]*$/.exec(psptTypeCode))
			{
				if($.assurecustValidate.countChinese(psptAddress) < 4)
				{
					alert($("#" + $.assurecustValidate.psptAddressKey).attr("desc")+"大于或等于四个汉字!");
					$("#" + $.assurecustValidate.psptAddressKey).val("");
					return false;
				}
			}	
			
			return true;
		}
	}
	
	});
})(Wade);