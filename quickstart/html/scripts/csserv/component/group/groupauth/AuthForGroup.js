function authStart(){
    if (authCheckSerialNumber()){
		submitSerialNumber();
	}
}

function submitSerialNumber(userId){
	var authParam = document.getElementById("AUTH_PARAM").value;
	var param = "";
	param += "&SERIAL_NUMBER="+getElement('AUTH_SERIAL_NUMBER').value + "&TRADE_TYPE_CODE=" + getElement('TRADE_TYPE_CODE').value + "&NET_TYPE_CODE=00";
	
	if (userId){
		param += "&USER_ID=" + userId;
	}
	
	var inModeCode = document.getElementById("IN_MODE_CODE");
	if (inModeCode){
		param += "&IN_MODE_CODE=" + inModeCode.value;
	}
	
	if (authParam.length>0){
		param += "&" + authParam;
	}
	
	Wade.ajax.setAjaxLoading(false);
	Wade.page.beginPageLoading();
	ajaxDirect4CS("components.AuthForGroup", "getTradeInfo", param ,null,false,afterSubmitSerialNumber);
}

function afterSubmitSerialNumber(){
	Wade.page.endPageLoading();
	var data = this.ajaxDataset;
	
	var result = data.get(0);
	
	if (result.get("RESULT_CODE")=="1"){
		alert(result.get("RESULT_INFO"));
		document.getElementById("GROUP_AUTH_FLAG").value="false";
		return ;
	}
	authCheck();
}

function authCheck(){
	
	document.getElementById("authCheck").disabled=false;
	
	var tradeData = getTradeData();
	var identity = tradeData.get("AUTH_IDENTITY_CHECK_TAG");
	var tmp = identity.substr(0,5);
	tmp = tmp.replaceAll(" ","0");
	var disabledAuth = document.getElementById("DISABLED_AUTH").value;
	
	var ifAuth = ifAuthed(document.getElementById("AUTH_SERIAL_NUMBER").value);
	
	var sys009 = tradeData.get("SYS009");
	
	if (tmp=="00000" || disabledAuth=="true" || sys009=="TRUE" ){
		document.getElementById("GROUP_AUTH_FLAG").value="true";
		submitAuthCheck(true);
		Wade.page.beginPageLoading();	
		return;
	}
	else if (ifAuth!=null){
		//已校验过用户  跳过校验
		document.getElementById("GROUP_AUTH_FLAG").value="true";
		document.getElementById("DISABLED_AUTH").value="true";
		tradeData.put("CHECK_MODE",ifAuth);
		setTradeData(tradeData.toString());
		submitAuthCheck(true);
		Wade.page.beginPageLoading();	
		return;
	}
	
	Wade.event.fireMouseEvent('authCheck','click');
}

function submitAuthCheck(flag){
	var param="";

    var ivrpass = document.getElementById("IVR_PASS_SUCC").value;
	if (ivrpass=="true"){
		var afterAction = document.getElementById("AFTER_AUTH_ACTION").value;
		document.getElementById("GROUP_AUTH_FLAG").value="true";
   	 	eval(""+afterAction);
   	 	return;
	}
		
	param += "cond_CHECK_MODE=" + document.getElementById("cond_CHECK_MODE").value;
	param += "&cond_PSPT_TYPE_CODE=" + document.getElementById("cond_PSPT_TYPE_CODE").value;
	param += "&cond_PSPT_ID=" + document.getElementById("cond_PSPT_ID").value;
	param += "&cond_AUTH_SERIAL_NUMBER=" + document.getElementById("cond_AUTH_SERIAL_NUMBER").value;
	param += "&cond_USER_PASSWD=" + document.getElementById("cond_USER_PASSWD").value;
	var flagtmp = document.getElementById("GROUP_AUTH_FLAG").value;
	if (flag) flagtmp="true";
	param += "&GROUP_AUTH_FLAG=" + flagtmp;
	
	ajaxDirect4CS("components.AuthForGroup", "checkPassWord", param ,document.getElementById("PART_NAME").value,false,checkResult4Auth);
}

function checkResult4Auth(){
	Wade.page.endPageLoading();
	var data = this.ajaxDataset;
	
	var result = data.get(0);
	
	if (result.get("RESULT_CODE")=="1"){
		alert(result.get("RESULT_INFO"));
		document.getElementById("GROUP_AUTH_FLAG").value="false";
		return ;
	}
	//alert("\u6210\u5458\u53F7\u7801\u003A"+getElement('AUTH_SERIAL_NUMBER').value + "\u4FE1\u606F\u6821\u9A8C\u6210\u529F\u0021")
	var afterAction = document.getElementById("AFTER_AUTH_ACTION").value;
	document.getElementById("GROUP_AUTH_FLAG").value="true";
	clearCookie();
	var sn = document.getElementById("AUTH_SERIAL_NUMBER").value;
	
	var tradeData = document.getElementById("tradeData");
	
	if (tradeData){
		var tradeDataMap = new Wade.DataMap(tradeData.value);
		var checkMode=tradeDataMap.get("CHECK_MODE");
		addToCookie(sn,checkMode);
	}
	
    eval(""+afterAction);
}

function authCheckSerialNumber(){
	if (getElement('AUTH_SERIAL_NUMBER').value==""){
		alert('\u8BF7\u8F93\u5165\u624B\u673A\u53F7\u7801\u0021');
		return false;
	}
	return verifyField(getElement('AUTH_SERIAL_NUMBER'));
 }
 
function addToCookie(serialNumber,checkMode){
	var userList = getCookie();
	
	var list = new Wade.DataMap();
	
	if (!list.containsKey(serialNumber)){
		
		if (list.length>0){
			list.removeKey(list.first());
		}
		list.put(serialNumber,checkMode);
	
		var cookiemgr = getCookieManager();
		cookiemgr["AUTH_USER_LIST"] = list.toString();
		cookiemgr.store();
	}
	
}

function clearCookie(){
	var userList = getCookie();
	
	var list = new Wade.DataMap();
	
	if (list.length>0){
		list.removeKey(list.first());
	}

	var cookiemgr = getCookieManager();
	cookiemgr["AUTH_USER_LIST"] = list.toString();
	cookiemgr.store();
}

function getCookie(){
	var cookiemgr = getCookieManager();
	if (cookiemgr.load()) {
		return  cookiemgr["AUTH_USER_LIST"];
	}
	return null;
}

function getCookieManager(){
	if (ckmgr == null) {
		ckmgr = new System.CookieManager(document, "SALESERV_COOKIE_" + context.getPageVisit().staffId, null, "/");
	}
	return ckmgr;
};

function ifAuthed(serialNumber){
	var userList = getCookie();
	
	var list = new Wade.DataMap(userList);
	
	var tmp = list.get(serialNumber);
	
	if (list.containsKey(serialNumber)){
		return list.get(serialNumber);
	}
	
	return null;
}

var ckmgr = null;
var context = Wade.context;

if(typeof(System.CookieManager)=='undefined'){ Include('support/cookiemanager.js');} 