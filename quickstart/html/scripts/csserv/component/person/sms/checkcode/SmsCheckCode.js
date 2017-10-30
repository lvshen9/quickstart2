var wait=30;//等待时间变量
var wattime=30;//等待时间定值

if(typeof(SmsCheckCode)=="undefined"){
	window["SmsCheckCode"]=function(){		
	};
	var smsCheckCode = new SmsCheckCode();
}


$(document).ready(function(){
	smsCheckCode.showSmsCheckCode();
});



(function(){
	$.extend(SmsCheckCode.prototype,{				
				
		sendCheckCode: function(){
			var sendChkCd = $("#sendChkCd");
			if (wait == 0) {
		       sendChkCd.attr("disabled",false);
		       sendChkCd.html('<span class="e_bLinkConfig">发送验证码</span>');		       
		       wait = wattime;		       		       
		    }else {
		       if(wattime==wait){
		       	  	var param = '';
		       	  	if(typeof($.auth.getAuthData())=='undefined'){
		       	  	    //alert($('#NoSmsPri').val());
		       	  		alert("请先输入服务号码点击查询!");
		       	  		return ;
		       	  	}
		       	  	var serialNumber=$.auth.getAuthData().get("USER_INFO").get("SERIAL_NUMBER");
		       	  	if(serialNumber==""){
		       	  		alert("请先输入服务号码点击查询!");
		       	  		return ;
		       	  	}else if(serialNumber.length != 11){
		       	  	    alert("服务号码输入有误!");
	       	  		    return ;
		       	  	}
					param += '&SERIAL_NUMBER='+serialNumber+ "&SPEC_TAG=sendSmsCheckCode";
					param += '&TRADE_TYPE_CODE='+$("#tradeTypeCode").val();
					$.beginPageLoading();
					$("#sendChkCd").unbind("click");	
					ajaxSubmit(null,null,param,$('#SmsVerify_Compoment_Id').val(), function(data){
						var sendFlag = data.get(0).get("RESULT_CODE");
						if(sendFlag=='0'){							
							alert("发送验证码成功！");
							$("#CHECK_CODE").val("");
							$("#smsVerifyFlag").val("0");
							 $("#sendChkCd").unbind("click");							 
						      sendChkCd.attr("disabled", true);
						      sendChkCd.html('<span class="e_bLinkConfig">'+wait+'秒后可重新获取验证码</span>');
						      wait--;
						      setTimeout(function () {
						    	  smsCheckCode.sendCheckCode();
						      },
						      1000);
						}else{
							alert("发送验证码失败！");
						}
						$.endPageLoading();
					},
					function(error_code,error_info){
						$.endPageLoading();
						alert(error_info);
					});
		       }else{
		       	  $("#sendChkCd").unbind("click");
			      sendChkCd.attr("disabled", true);
			      sendChkCd.html('<span class="e_bLinkConfig">'+wait+'秒后可重新获取验证码</span>');
			      wait--;
			      setTimeout(function () {
			    	  smsCheckCode.sendCheckCode();
			      },
			      1000);
		       }
		   }
		},
		
		checkSmsCheckCode: function(){
			
			if(typeof($.auth.getAuthData())=='undefined'){
		  		alert("请先发送验证码!");
		  		return ;
		  	}
			
		  	var serialNumber=$.auth.getAuthData().get("USER_INFO").get("SERIAL_NUMBER");
		  	if(serialNumber==""){
		  		alert("请先发送验证码!");
		  		return ;
		  	}
		  	
		  	var verifyCode=$("#CHECK_CODE").val();
		  	if($.trim(verifyCode)==""){
		  		alert("请输入验证码!");
		  		return ;
		  	}
		  
		  	var smsVerifyFlag=$("#smsVerifyFlag");
		  	if(smsVerifyFlag.val()==serialNumber){
		  		alert("已校验成功，如需重新校验请重新发送校验码!");
		  		return ;
		  	}
		  	
					  	
			var param = '';
			param += '&SERIAL_NUMBER='+serialNumber+"&SPEC_TAG=checkSmsCheckCode";
			param += '&TRADE_TYPE_CODE='+$("#tradeTypeCode").val();
			param += '&VERIFY_CODE='+$.trim(verifyCode);
			$.beginPageLoading();
			ajaxSubmit(null,null,param,$('#SmsVerify_Compoment_Id').val(), function(data){
				var resultCode = data.get(0).get("RESULT_CODE");
				var resultInfo = data.get(0).get("RESULT_INFO");
				if(resultCode!='0'){
					alert(resultInfo);
					smsVerifyFlag.val("0");
				}else{
					alert("验证成功!");
					smsVerifyFlag.val(serialNumber);
				}
				$.endPageLoading();
			},
			function(error_code,error_info){
				$.endPageLoading();
				alert(error_info);
			});
		},
		
		showSmsCheckCode: function(){
			var param = '';
			param += '&TRADE_TYPE_CODE='+$("#tradeTypeCode").val()+ "&SPEC_TAG=showSmsCheckCode";
			$.beginPageLoading();
			ajaxSubmit(null,null,param,$('#SmsVerify_Compoment_Id').val(), function(data){
				var noSmsPri = data.get("No_Sms_Pri");
				//alert(noSmsPri);
				$("#NoSmsPri").val(noSmsPri);
				if(noSmsPri=="true"){//有特权
					$("SmsVerifyPart").css("display", "none");
					$("#CHECK_CODE_LI").css("display", "none");
					$("#SEND_CHKCODE_LI").css("display", "none");
				}
				$.endPageLoading();
			},
			function(error_code,error_info){
				$.endPageLoading();
				alert(error_info);
			});
		}
		
	});
}
)();



