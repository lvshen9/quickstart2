(function($){
	$.extend({
	
	custValidate : {
		psptTypeCodeKey : "PSPT_TYPE_CODE", // 页面中定义的证件类型ID
		psptIdKey : "PSPT_ID", // 页面中定义的证件号码ID
		psptAddressKey : "PSPT_ADDRESS", // 页面中定义的证件号码ID
		custNameKey : "CUST_NAME", // 页面中定义的客户名称ID
		contactNameKey : "CONTACT_NAME", // 页面中定义的联系人名称ID
		contactPhoneKey : "CONTACT_PHONE", // 页面中定义的联系电话ID
		
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
		
		countChinese : function(val)
		{
			var varLen = val.length;
			
			var chineseCount = 0;
			
			for(var i = 0, row = varLen; i < row; i++)
			{
				if($.custValidate.isChinese(val.substr(i, 1)))
				{
					chineseCount++;
				}
			}
			
			return chineseCount;
		},
		
		// 判断是否身份证份证号码
		isIdCard : function(idCard)
		{
			// 身份证位数校验
			if( idCard.length != 18) return "身份证号码必须为18位!";
			
			//if(idCard.length == 15 && !$.custValidate.isNumber(idCard)) return "15位身份证号码必须全为数字";
			
			if(idCard.length == 18 && !$.custValidate.isNumber(idCard.substr(0,17))) return "18位身份证号码前17位必须全为数字";
			
			// 身份证出生年月日校验
			var year =  idCard.substring(6,10);  
    		var month = idCard.substring(10,12);  
    		var day = idCard.substring(12,14);  
    		var birthday = new Date(year, parseFloat(month) - 1, parseFloat(day));
    		
    		if(birthday.getFullYear() != parseFloat(year) || birthday.getMonth() != parseFloat(month) - 1 || birthday.getDate() != parseFloat(day))
			{
				return "身份证号码出生年月日有误, 您输入的为[" + year + month + day + "],请输入有效的身份证号码!";
			}
			
			var yearInt=parseInt(year);
			var monthInt=parseInt(month);
			var dayInt=parseInt(day);
			if((yearInt<1900)||(yearInt>2012)){
				return "身份证号码出生年份有误,须在1900至2012之间";
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
		
		// 校验联系人名称
		validateContactName : function(contactNameKey, custNameKey)
	 	{
	 		if($.custValidate.isNotBlank(contactNameKey))
			{
				$.custValidate.contactNameKey = contactNameKey;
			}
			
			if($.custValidate.isNotBlank(custNameKey))
			{
				$.custValidate.custNameKey = custNameKey;
			}
			
			// 客户名称
			var custName = $("#" + $.custValidate.custNameKey).val();
			custName = $.trim(custName);
			if($.custValidate.isBlank(custName))
			{
				if($.custValidate.isBlank(custName))
				{
					alert("客户名称不能为空!");
					return false;
				}
			}
			
			// 联系人名称
			var contactName = $("#" + $.custValidate.contactNameKey).val();
			if($.custValidate.isBlank(contactName))
			{
				if($.custValidate.isBlank(contactName))
				{
					alert("联系人名称不能为空!");
					$("#" + $.custValidate.contactNameKey).val("");
					return false;
				}
			}
			
			if(contactName !='' && $.custValidate.isContainPartSpecial(contactName))
			{
				alert("联系人名称不能含有特殊字符！");
				$("#" + $.custValidate.contactNameKey).val("");
				return false;
			}
			
			if(contactName !='' &&  $.custValidate.isNumber(contactName))
			{
				alert("联系人名称不能全部是数字！");
				$("#" + $.custValidate.contactNameKey).val("");
				return false;
			}
			
			
			if(contactName != custName)
			{
				alert("联系人名称必须与客户名称相同!");
				$("#" + $.custValidate.contactNameKey).val("");
				return false;
			}
			
			return true;
	 	},
		
		// 校验联系人电话
		validateContactPhone : function(contactPhoneKey)
		{
			if($.custValidate.isNotBlank(contactPhoneKey))
			{
				$.custValidate.contactPhoneKey = contactPhoneKey;
			}
			
			// 联系人电话
			var contactPhone = $("#" + $.custValidate.contactPhoneKey).val();
			
			if($.custValidate.isBlank(contactPhone))
			{
				alert("联系人电话不能为空!");
				$("#" + $.custValidate.contactPhoneKey).val("");
				return false;
			}
			
			if(contactPhone.trim().length < 6 || !$.custValidate.isNumber(contactPhone))
			{
				alert("联系人电话只能为大于6位的数字!");
				$("#" + $.custValidate.contactPhoneKey).val("");
				return false;
			}
			
			return true;
		},
		
		// 校验证件类型
		validatePsptTypeCode : function(psptTypeCodeKey)
		{
			if($.custValidate.isNotBlank(psptTypeCodeKey))
			{
				$.custValidate.psptTypeCodeKey = psptTypeCodeKey;
			}
			
			// 获取证件类型
			var psptTypeCode = $("#" + $.custValidate.psptTypeCodeKey).val();
			if($.custValidate.isBlank(psptTypeCode))
			{
				alert("证件类型不能为空!");
				$("#" + $.custValidate.psptTypeCodeKey).focus();
				return false;
			}
			
			return true;
		},
		
		// 校验客户名称
		validateCustName : function(psptTypeCodeKey, custNameKey)
		{
			// 校验证件类型
			if(!$.custValidate.validatePsptTypeCode(psptTypeCodeKey)) return false;
			
			// 获取证件类型
			var psptTypeCode = $("#" + $.custValidate.psptTypeCodeKey).val();
			
			if($.custValidate.isNotBlank(custNameKey))
			{
				$.custValidate.custNameKey = custNameKey;
			}
			
			// 获取客户名称
			var custName = $("#" + $.custValidate.custNameKey).val();
			custName = $.trim(custName);
			if($.custValidate.isBlank(custName))
			{
				alert("客户名称不能为空!");
				return false;
			}
			
			if(custName !='' && $.custValidate.isContainPartSpecial(custName))
			{
				alert("客户名称不能含有特殊字符！");
				$("#" + $.custValidate.custNameKey).val("");
				return false;
			}
			
			if(custName !='' && $.custValidate.isNumber(custName))
			{
				alert("客户名称不能全部是数字！");
				$("#" + $.custValidate.custNameKey).val("");
				return false;
			}
			
			
			// 户口簿、军官证、警官证、港澳居民来往内地通信证、台湾居民来往大陆通信证：客户名称须大于等于两个汉字
			/*
			if(/^[C,G,H]*$/.exec(psptTypeCode))
			{
				if(custName.length < 2 || $.custValidate.countChinese(custName) < 2)
				{
					alert("客户名称必须大于或等于两个汉字!");
					$("#" + $.custValidate.custNameKey).val("");
					return false;
				}
			}*/
			
			//身份证、临时身份证、外地身份证
			if(/^[0,1,2]*$/.exec(psptTypeCode))
			{
				if(custName.length < 4 && $.custValidate.countChinese(custName) < 2)
				{
					alert("客户名称必须大于或等于两个汉字或大于等于四个字符!");
					$("#" + $.custValidate.custNameKey).val("");
					return false;
				}
			}
			
			var names=['代办','代理','全球通','动感地带','套餐','大灵通','乡镇通','无权户','无档户'];
			for(var i=0;i<names.length;i++){
				if(custName.indexOf(names[i])!=-1){
					alert("名字不能包含代办,代理,全球通,动感地带,套餐,大灵通,乡镇通,无权户,无档户");
					$("#" + $.custValidate.custNameKey).val("");
					return false;
				}
			}
			
			// 护照：客户名称须大于三个字符, 不能全为阿拉伯数字
			/*
			else if(/^[A]*$/.exec(psptTypeCode))
			{
				if(custName.length < 3 || $.custValidate.isNumber(custName))
				{
					alert("客户名称须大于三个字符,不能全为阿拉伯数字!");
					$("#" + $.custValidate.custNameKey).val("");
					return false;
				}
			}*/
			
			return true;
		},
		
		// 校验证件号码
		validatePsptId : function(psptTypeCodeKey, psptIdKey)
		{
			// 校验证件类型
			if(!$.custValidate.validatePsptTypeCode(psptTypeCodeKey)) return false;
			
			// 获取证件类型
			var psptTypeCode = $("#" + $.custValidate.psptTypeCodeKey).val();
			
			// 初始化
			if($.custValidate.isNotBlank(psptIdKey))
			{
				$.custValidate.psptIdKey = psptIdKey;
			}
			
			// 获取证件号码
			var psptId = $("#" + $.custValidate.psptIdKey).val();
			
			if($.custValidate.isBlank(psptId))
			{
				alert("证件号码不能为空!");
				return false;
			}
			
			if($.custValidate.isNotContainNumber(psptId))
			{
				alert("证件号码必须含有数字!");
				$("#" + $.custValidate.psptIdKey).val("");
				return false;
			}
			
			if(/^[0,1,2]*$/.exec(psptTypeCode))// 身份证号码须为15位或18位, 户口簿必须填写身份证号码,去掉J,对户口薄不做身份证校验
			{
				var psptDesc = $.custValidate.isIdCard(psptId);
				
				if(true != psptDesc)
				{
					alert(psptDesc);
					$("#" + $.custValidate.psptIdKey).val("");
					return false;
				}
			}/*
			else if(/^[A,C,G]*$/.exec(psptTypeCode))// 军官证、警官证、护照：证件号码须大于等于6位字符
			{
				if(!$.verifylib.checkMinLength(psptId, 6))
				{
					alert("证件号码须大于或等于6位字符!");
					$("#" + $.custValidate.psptIdKey).val("");
					return false;
				}
			}
			else if(/^[H]*$/.exec(psptTypeCode))// 
			{
				if($.verifylib.checkLength(psptId, 8))
				{
					if(!$.custValidate.isNumber(psptId))
					{
						alert("证件号码为8位时, 必须全为数字!");
						$("#" + $.custValidate.psptIdKey).val("");
						return false;
					}
				}
				else if($.verifylib.checkLength(psptId, 9))
				{
					if(!/^[H,M]*$/.exec(psptId.substr(0,1)) || !$.custValidate.isNumber(psptId.substr(1)))
					{
						alert("证件号码输入有误!");
						$("#" + $.custValidate.psptIdKey).val("");
						return false;
					}
				}
				else if($.verifylib.checkLength(psptId, 11))
				{
					if(!/^[H,M]*$/.exec(psptId.substr(0,1)) || !$.custValidate.isNumber(psptId.substr(1)))
					{
						alert("证件号码输入有误!");
						$("#" + $.custValidate.psptIdKey).val("");
						return false;
					}
				}
				else
				{
					alert("证件号码输入有误!");
					$("#" + $.custValidate.psptIdKey).val("");
					return false;
				}
			}*/
			else if(/^[E]*$/.exec(psptTypeCode))//单位营业执照
			{
				if(!$.verifylib.checkLength(psptId, 15))
				{
					alert("证件号码须等于15位字符!");
					$("#" + $.custValidate.psptIdKey).val("");
					return false;
				}
			}
			else if(/^[K]*$/.exec(psptTypeCode))//组织机构代码证
			{
				if(!$.verifylib.checkLength(psptId, 10))
				{
					alert("证件号码须等于10位字符!");
					$("#" + $.custValidate.psptIdKey).val("");
					return false;
				}
				if(psptId.substr(psptId.length-2,1)!="-"){
					alert("证件号码倒数第二位为'-'");
					$("#" + $.custValidate.psptIdKey).val("");
					return false;
				}
			}
			else if(/^[R]*$/.exec(psptTypeCode))//事业单位法人证书
			{
				if(!$.verifylib.checkLength(psptId, 12))
				{
					alert("证件号码须等于12位字符!");
					$("#" + $.custValidate.psptIdKey).val("");
					return false;
				}
			}
			
			return true;
		},
		
		// 校验证件地址
		validatePsptAddress : function(psptTypeCodeKey, psptAddressKey)
		{
			// 校验证件类型
			if(!$.custValidate.validatePsptTypeCode(psptTypeCodeKey)) return false;
			
			// 获取证件类型
			var psptTypeCode = $("#" + $.custValidate.psptTypeCodeKey).val();
			
			// 初始化
			if($.custValidate.isNotBlank(psptAddressKey))
			{
				$.custValidate.psptAddressKey = psptAddressKey;
			}
			
			// 获取证件地址
			var psptAddress = $("#" + $.custValidate.psptAddressKey).val();
			psptAddress = $.trim(psptAddress);
			
			if($.custValidate.isBlank(psptAddress))
			{
				alert("证件地址不能为空!");
				$("#" + $.custValidate.psptAddressKey).val("");
				return false;
			}
			
			if(psptAddress !='' && $.custValidate.isContainSpecial(psptAddress))
			{
				alert("证件地址不能含有特殊字符！");
				$("#" + $.custValidate.psptAddressKey).val("");
				return false;
			}
			
			if(psptAddress !='' && $.custValidate.isNumber(psptAddress))
			{
				alert("证件地址不能全部是数字！");
				$("#" + $.custValidate.psptAddressKey).val("");
				return false;
			}
			
			//身份证、户口簿：须大于等于8个汉字
			/*
			if(/^[0,1,2,C,G,H,J]*$/.exec(psptTypeCode))
			{
				if($.custValidate.countChinese(psptAddress) < 8)
				{
					alert("证件地址须大于或等于8个汉字!");
					$("#" + $.custValidate.psptAddressKey).val("");
					return false;
				}
			}
			else if(/^[A]*$/.exec(psptTypeCode))
			{
				if($.custValidate.countChinese(psptAddress) < 2)
				{
					alert("证件地址须大于或等于2个汉字!");
					$("#" + $.custValidate.psptAddressKey).val("");
					return false;
				}
			}
			
			var psptAddressCh = $.custValidate.countChinese(psptAddress);//中文字符
			var psptAddressEn = psptAddress.length - psptAddressCh;//英文or其他
			var psptAddressCount = (psptAddressCh * 2) + psptAddressEn;
			if(psptAddressCount > 80){
				alert("证件地址最大80个字符,一个中文算2个字符!");
				$("#" + $.custValidate.psptAddressKey).val("");
				return false;
			}*/
			if(/^[0,1,2]*$/.exec(psptTypeCode))
			{
				if($.custValidate.countChinese(psptAddress) < 4)
				{
					alert("证件地址必须大于或等于四个汉字!");
					$("#" + $.custValidate.psptAddressKey).val("");
					return false;
				}
			}	
			
			
			return true;
		}
	}
	
	});
})(Wade);