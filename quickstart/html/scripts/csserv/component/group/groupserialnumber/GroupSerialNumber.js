function initGroupSerialNumber() {
	var ifResCode = $("#IF_RES_CODE").val();
	
	if(ifResCode && ifResCode == "0") {
		var serialNumber = $("#SERIAL_NUMBER").val();
		var resTypeCode = $("#RES_TYPE_CODE").val();
		
		var resData = $.DataMap();
	    resData.put("RES_TYPE_CODE", resTypeCode);
	    resData.put("RES_CODE", serialNumber);
	    resData.put("CHECKED","true");
	    resData.put("DISABLED","true");
		insertRes(resData);
		$("#HIDDEN_SERIAL_NUMBER").val(serialNumber);
	}
}

function checkSerialNumber(serialNumberObj) {

    var serialNumber = $(serialNumberObj).val();
    $(serialNumberObj).attr('disabled',true);//解决连点回车事件问题
    var hiddenSerialNumber = $('#HIDDEN_SERIAL_NUMBER').val();
    var resTypeCode = $("#RES_TYPE_CODE").val();
    var grpUserEparchyCode =$('#GROUP_SERIALNUMBER_EPARCHY_CODE').val();
    
	$.beginPageLoading();
	var param = "&IS_CHECK=" + true + "&SERIAL_NUMBER=" + serialNumber +'&GRP_USER_EPARCHYCODE='+grpUserEparchyCode+ "&PRODUCT_ID=" + $("#PRODUCT_ID").val() + "&RES_TYPE_CODE=" + resTypeCode;
	$.ajax.submit(null, null, param, $("#GROUP_SERIALNUMBER_ID").val() + ".GroupSNPart", 
		function(data){
			$.endPageLoading();
			afterCheckSerialNumber(data, resTypeCode, serialNumber);
		},
		function(error_code,error_info,derr){
			$.endPageLoading();
			$(serialNumberObj).attr('disabled',false);
			showDetailErrorInfo(error_code,error_info,derr);
		}
	);
	
    return false;
}

function afterCheckSerialNumber(data, resTypeCode, serialNumber) {
	var resultCode = data.get("X_RESULTCODE", "-1")
	var resultInfo = data.get("X_RESULTINFO", "");
	
	if(resultCode == "0") {
		var hiddenSerialNumber = $('#HIDDEN_SERIAL_NUMBER').val();
		
		if(hiddenSerialNumber && hiddenSerialNumber != "") {
			if(hiddenSerialNumber == serialNumber) {
				return;
			}
			var deleObj = $.DataMap();
			deleObj.put("RES_TYPE_CODE", resTypeCode);
		    deleObj.put("RES_CODE", hiddenSerialNumber);
		    deleObj.put("CHECKED","true");
		    deleObj.put("DISABLED","true");
		    deleteRes(deleObj);
     	}
		
		var addObj = $.DataMap();
	 	addObj.put("RES_TYPE_CODE", resTypeCode);
		addObj.put("RES_CODE", serialNumber);
		addObj.put("CHECKED", "true");
		addObj.put("DISABLED", "true");
		insertRes(addObj);
		
		$("#HIDDEN_SERIAL_NUMBER").val(serialNumber);
		
		alert(resultInfo);
	} else {
  		alert(resultInfo);
  	}
}

function isCheckedSerialNumber() {
	var serialNumber = $('#SERIAL_NUMBER').val();
	var hiddenSerialNumber = $('#HIDDEN_SERIAL_NUMBER').val();
	
	if(hiddenSerialNumber == null || hiddenSerialNumber == "" || (serialNumber != hiddenSerialNumber)){
		alert("服务号码未校验,请先校验服务号码!");
		$('#SERIAL_NUMBER').focus();
		return false;
	}
	return true;
}