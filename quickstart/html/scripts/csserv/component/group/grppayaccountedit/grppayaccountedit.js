
function changeSameAcctTag() {
		var sameAcct = $("#acct_SAME_ACCT");
		var divAcct = $("#AcctInfoPart");
		var payModeCode = $("#acct_PAY_MODE_CODE");
		var superbandCode = $("#acct_SUPER_BANK_CODE");
		var bankCode = $("#acct_BANK_CODE");
		var bandAcctNo = $("#acct_BANK_ACCT_NO");
		var bandContNo = $("#acct_CONTRACT_ID");
		var pay_name = $("#acct_PAY_NAME");
		var acct_RSRV_STR8 = $("#acct_RSRV_STR8");
		var acct_RSRV_STR9 = $("#acct_RSRV_STR9");				
		var queryPart = $("#queryPart");
		var OtherAcctPart = $("#OtherAcctPart");		
		if(sameAcct.val() == '1')
		{
			
			superbandCode.attr("disabled",true);
			bankCode.attr("disabled",true);
			bandAcctNo.attr("disabled",true);
			bandContNo.attr("disabled",true);
			acct_RSRV_STR8.attr("disabled",true);
			acct_RSRV_STR9.attr("disabled",true);			
			$("#acct_SUPER_BANK_CODE").val("");
			$("#acct_BANK_CODE").val("");
			$("#acct_CONTRACT_ID").val("");
			$("#acct_BANK_ACCT_NO").val("");
			superbandCode.attr("nullable", "yes");
			bankCode.attr("nullable", "yes");
			bandAcctNo.attr("nullable", "yes");		
			queryPart.css("display","");	
			OtherAcctPart.css("display","");
			payModeCode.attr("disabled", true);
			pay_name.attr("disabled", true);
			pay_name.val("");
		}
		else
		{
			queryPart.css("display","none");
			OtherAcctPart.css("display","none");
			payModeCode.attr("nullable", "no");
			pay_name.attr("nullable", "no");
			pay_name.val(pay_name.attr('defalt_value'));
			$('#acct_PAY_NAME_ISCHANGED').val('false');
			payModeCode.attr("disabled", false);
			pay_name.attr("disabled", false);
			acct_RSRV_STR8.attr("disabled", false);
			acct_RSRV_STR9.attr("disabled", false);		
		}
}


/**检查帐户类别是不是选择托收，如果是则激活上级银行、银行名称、银行帐号组件*/
function checkPaymode(mode) {
	var payModeCode = $("#acct_PAY_MODE_CODE");
	var superbandCode = $("#acct_SUPER_BANK_CODE");
	var bankCode = $("#acct_BANK_CODE");
	var bandAcctNo = $("#acct_BANK_ACCT_NO");
	var bandContNo = $("#acct_CONTRACT_ID");
	if(payModeCode.val() == "0") {
		superbandCode.attr("disabled", true);	
		bankCode.attr("disabled", true);	
		bandAcctNo.attr("disabled", true);	
		bandContNo.attr("disabled", true);		
		$("#acct_SUPER_BANK_CODE").val("");
		$("#acct_BANK_CODE").val("");
		$("#acct_CONTRACT_ID").val("");
		$("#acct_BANK_ACCT_NO").val("");
		superbandCode.attr("nullable", "yes");
		bankCode.attr("nullable", "yes");
		bandAcctNo.attr("nullable", "yes");
	}else if(payModeCode.val() == ""){
		superbandCode.attr("disabled", true);	
		bankCode.attr("disabled", true);	
		bandAcctNo.attr("disabled", true);	
		bandContNo.attr("disabled", true);	
		superbandCode.attr("nullable", "yes");
		bankCode.attr("nullable", "yes");
		bandAcctNo.attr("nullable", "yes");
	}else{
		superbandCode.attr("disabled", false);	
		bankCode.attr("disabled", false);	
		bandAcctNo.attr("disabled", false);	
		bandContNo.attr("disabled", false);	;
		superbandCode.attr("nullable", "no");
		bankCode.attr("nullable", "no");
		bandAcctNo.attr("nullable", "no");
     }
}


/** 根据上级银行获取银行名称列表*/
function ajaxGetBankCode() {
	var superBankCode = $('#acct_SUPER_BANK_CODE');	
	if (superBankCode != null && superBankCode.val() != "") {
		
		$.beginPageLoading();
		var compid = $('#GRPPAYACCOUNTEDIT_COMPONENT_ID').val();
		$.ajax.submit(null,null,'&SUPER_BANK_CODE='+superBankCode.val()+'&LISTENER=queryBank',compid+'.bankFld',function(data){
			$.endPageLoading();
			var resultcode = data.get('X_RESULTCODE','0');
	   		if(resultcode!='0'){
	    	
	   			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
	   		}else{
	   		after();
	   		}
		},
		function(error_code,error_info,derror){
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
		
	}
}
	
function after(){
	var bankCode = $('#acct_BANK_CODE');
	bankCode.attr('nullable', 'no');
	bankCode.attr("disabled",false);
}

/**
 * 合户 按服务号码查询
*/
function  refeshAcctBySn(){

	var serialNumber = $('#acct_GRP_SERIAL_NUMBER').val();
	if(serialNumber == '' || serialNumber == null){
		alert('服务号码不能为空\uFF01');
		return false;
	}
	if (/^[1][13458][0-9](\d{8})$/.test(serialNumber)) {
		$.beginPageLoading();
		var compid = $('#GRPPAYACCOUNTEDIT_COMPONENT_ID').val();
		$.ajax.submit(null,null,'&GRP_SERIAL_NUMBER='+serialNumber+'&LISTENER=getAcctByPsnSn',compid+'.OtherAcctPart',function(data){
			$.endPageLoading();
			var resultcode = data.get('X_RESULTCODE','0');
	   		if(resultcode!='0'){
	    	
	   			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
	   		}
		},
		function(error_code,error_info,derror){
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
		
	}
	else
	{
		$.beginPageLoading();
		var compid = $('#GRPPAYACCOUNTEDIT_COMPONENT_ID').val();
		$.ajax.submit(null,null,'&GRP_SERIAL_NUMBER='+serialNumber+'&LISTENER=getAcctByGrpSn',compid+'.OtherAcctPart',function(data){
			$.endPageLoading();
			var resultcode = data.get('X_RESULTCODE','0');
	   		if(resultcode!='0'){
	    	
	   			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
	   		}
		},
		function(error_code,error_info,derror){
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
	}
}

/**
 * 合户时 按合同号查询
*/
function  refeshAcctByContract(){
	if($('#acct_ACCT_NUMBER').val() == '')
	{
		alert('请输入合同号\uFF01');
		return false;
	}
	 
	$.beginPageLoading();
	var compid = $('#GRPPAYACCOUNTEDIT_COMPONENT_ID').val();
	$.ajax.submit(null,null,'&ACCT_CONTRACT_NO='+$('#acct_ACCT_NUMBER').val()+'&LISTENER=getAccountInfoByContract',compid+'.OtherAcctPart',function(data){
		$.endPageLoading();
		var resultcode = data.get('X_RESULTCODE','0');
   		if(resultcode!='0'){
    	
   			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
   		}
	},
	function(error_code,error_info,derror){
		$.endPageLoading();
		showDetailErrorInfo(error_code,error_info,derror);
    });
    
}

/**
 * 合户时 按集团编码
*/
function  refeshAcctByCstId(){
	if($('#POP_cond_GROUP_ID').val() == '')
	{
		alert('请输入集团客户编码\uFF01');
		return false;
	}
	
	$.beginPageLoading();
	var compid = $('#GRPPAYACCOUNTEDIT_COMPONENT_ID').val();
	$.ajax.submit(null,null,'&POP_cond_GROUP_ID='+$('#POP_cond_GROUP_ID').val()+'&LISTENER=getAcctByGrpId',compid+'.OtherAcctPart',function(data){
		$.endPageLoading();
		var resultcode = data.get('X_RESULTCODE','0');
   		if(resultcode!='0'){
    	
   			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
   		}
	},
	function(error_code,error_info,derror){
		$.endPageLoading();
		showDetailErrorInfo(error_code,error_info,derror);
    });
}



/**
 * 选择不合户时，不同的查询条件
*/
function changeQueryType() {
   var choose=$("#QueryType").val();
   if (choose=="1") { //按集团编码
      $("#QueryTypeOne").css("display","");
      $("#QueryTypeTwo").css("display","none");
      $("#QueryTypeThree").css("display","none");
      $('#POP_cond_GROUP_ID').val("");
      $('#acct_GRP_SERIAL_NUMBER').val("");
      $('#acct_ACCT_NUMBER').val("");      
   }else if (choose=="2") { //按服务号码
      $("#QueryTypeOne").css("display","none");
      $("#QueryTypeTwo").css("display","");
      $("#QueryTypeThree").css("display","none");      
      $('#POP_cond_GROUP_ID').val("");
      $('#acct_GRP_SERIAL_NUMBER').val("");
      $('#acct_ACCT_NUMBER').val("");          
   }else if( choose=="3")//按合同号
   {
      $("#QueryTypeOne").css("display","none");
      $("#QueryTypeTwo").css("display","none");
      $("#QueryTypeThree").css("display","");  
      $('#POP_cond_GROUP_ID').val("");
      $('#acct_GRP_SERIAL_NUMBER').val("");
      $('#acct_ACCT_NUMBER').val("");          
   }   
}

function queryAcct()
{
	var choose=$("#QueryType").val();
	if (choose=="1") { //按集团编码
		refeshAcctByCstId();
	}
	else if (choose=="2") { //按服务号码
		refeshAcctBySn();
    }
    else if( choose=="3") {//按合同号
    	refeshAcctByContract();
    }
}
	
	
function refeshAcctDetail()
{
	var choose=$("#acct_ACCT_ID").val();
	var acctList = $.DatasetList($('#acc_ACCT_LIST').val());
	if(choose != '')	 
	{
	 	for(var i= 0;i< acctList.length ; i++)
	 	{
	 		var item = acctList.get(i);
	 		if(item.get("ACCT_ID")==choose)
	 		{
	 			if(item.get("PAY_NAME") != '' && item.get("PAY_NAME") != 'undefined' )
	 			{
					$("#acct_PAY_NAME").val(item.get("PAY_NAME"));
				}
				$("#acct_PAY_MODE_CODE").val(item.get("PAY_MODE_CODE"));
				$("#acct_RSRV_STR8").val(item.get("RSRV_STR8"));
				$("#acct_RSRV_STR9").val(item.get("RSRV_STR9"));
				if(item.get("PAY_MODE_CODE") != 0)
				{	 			
		 			$("#acct_SUPER_BANK_CODE").val(item.get("SUPER_BANK_CODE"));
		 			
		 			var   oOption   =   document.createElement("OPTION");
    				oOption.text= item.get("BANK_CODE"); 
    				oOption.value=item.get("BANK"); 
    				oOption.selected='selected';
    				$("#acct_BANK_CODE").options.add(oOption);			
					$("#acct_BANK_CODE").val(item.get("BANK_CODE"));
					$("#acct_CONTRACT_ID").val(item.get("CONTRACT_ID"));
					$("#acct_BANK_ACCT_NO").val(item.get("BANK_ACCT_NO"));
				}else
				{
		 			$("#acct_SUPER_BANK_CODE").val("");
					$("#acct_BANK_CODE").val("");
					$("#acct_CONTRACT_ID").val("");
					$("#acct_BANK_ACCT_NO").val("");
					
				}
	 		}
	 	}
	}
}	

//账户资料检查 1合户 0不合户
function checkAcctInfo()
{
	var sameAcct = $("#acct_SAME_ACCT");
	var payModeCode = $("#acct_PAY_MODE_CODE");
	var superbandCode = $("#acct_SUPER_BANK_CODE");
	var bankCode = $("#acct_BANK_CODE");
	var bandAcctNo = $("#acct_BANK_ACCT_NO");
	var bandContNo = $("#acct_CONTRACT_ID");
	var pay_name = $("#acct_PAY_NAME");
	var acct_RSRV_STR8 = $("#acct_RSRV_STR8");
	var acct_RSRV_STR9 = $("#acct_RSRV_STR9");			
	var planMode = $("#acct_PLAN_MODE_CODE");
	
	if(sameAcct.val() == "1") {			
		if(pay_name.val() == '')
		{
			alert('请选择查询方式进行查询账户列表,后选择具体的一个账户进行合户处理\uFF01');
			return false;
		}					
	}
	else
	{	
		if((planMode.val() == '') && ($("#acct_PLAN_MODE_CODE").attr("disabled")==false ))
		{
			alert(planMode.attr('desc')+'不能为空\uFF01');
			return false;
		}
		if(pay_name.val() == '')
		{
			alert(pay_name.attr('desc')+'不能为空\uFF01');
			return false;
		}
		if(payModeCode.val() == '')
		{
			alert(payModeCode.attr('desc')+'不能为空\uFF01');
			return false;
		}
		if(acct_RSRV_STR8.val() == '')
		{
			alert(acct_RSRV_STR8.attr('desc')+'不能为空\uFF01');
			return false;
		}
		if(acct_RSRV_STR9.val() == '')
		{
			alert(acct_RSRV_STR9.attr('desc')+'不能为空\uFF01');
			return false;
		}				
		if(payModeCode.val() != '0'  && superbandCode.val() == '')
		{
			alert(superbandCode.attr('desc')+'不能为空\uFF01');
			return false;
		}
		if(payModeCode.val() != '0'  && bankCode.val() == '')
		{
			alert(bankCode.attr('desc')+'不能为空\uFF01');
			return false;
		}		
		if(payModeCode.val() != '0'  && bandAcctNo.val() == '')
		{
			alert(bandAcctNo.attr('desc')+'不能为空\uFF01');
			return false;
		}	
	}
	return true;
}