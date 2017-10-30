/* $Id  */

function clickcheck(){
	var checkflag = getElement("effectNow").checked;
	if(checkflag == true){
		setEffectNow("main");
	}
	else{
		setUnEffectNow("main");
	}
}

//控制产品树保持在可视区域内
function controlProductTree()
{
	var productList=System.get("productList");
	var xy=[0,0];
	if(productList){
		productList.position("absolute");
		productList.setWidth("200");
		xy=productList.getXY();
	}
	
	var e_wrapper=System.get("e_wrapper");
	e_wrapper.on("scroll",function(){
		var sz=this.getScroll();
		 if(sz.top>xy[1]){
		 	productList.setTop(sz.top +10);
		 }
		 if(sz.top<=10){
		 	productList.setTop(xy[1]);
		 }
		
	});
};


function initProductInfoEsop() {
	//控制产品树保持在可视区域内
	controlProductTree();
	
	var lefttabset = new TabSet("lefttabset", "top");

	lefttabset.addTab("产品信息", getElement("product"));	
	if (getElement("pramaPage").value!="X")
	{
	    lefttabset.addTab("产品参数", getElement("prama"));
	}    
	if (getElement("outPhoneParam").value!="X")
	{
		lefttabset.addTab("网外号码组信息", getElement("outPhone"));
	}
	lefttabset.addTab("资源信息", getElement("source"));
	lefttabset.addTab("账户信息",getElement("acctInfo"));
	lefttabset.addTab("邮寄等其他", getElement("postInfo"));	
	lefttabset.draw();
	
	lefttabset.switchTo("产品信息");
	lefttabset.onTabSelect(function(tabset){
		var tab=tabset.getActiveTab();
		if(tab.caption=="产品参数信息") {
		    try {
		        createUserParamTabset();
		    } catch (error) {
		    }
		}
	})
	//if(getElement("PRODUCT_ID").value=="6100"){
	 // getElement("SERIAL_NUMBER").style.display="none";
	 // document.getElementById("COLUM_NAME_DISPLAY").style.display="none";
	  //getElement('IS_RES_CODE').value=1;
	//}
	
	changeSameAcctTag();
}

function checkProductElements() 
{
   var checkflagset=getElement("PRODUCT_ELEMENTS_CHECK_FLAG").value;
	var flaglist = checkflagset.split(","); 
	for(i=0;i<flaglist.length;i++)
	{
	
		var flag=flaglist[i];
		if(flag=="checkPlatServers")
		{
		  if(!checkPlatServers())
		  {
		    return false;
		  }
		}
	}
 	return true;
}

function checkPlatServers() 
{
  var selectElements=getElement("SELECTED_ELEMENTS").value;
  var needcheckservices=getElement("NEED_CHECK_SERVICES").value;
  var needchecklist= needcheckservices.split(","); 
  var selectElementset = new Wade.DatasetList(selectElements);
  var svcDataset = new Wade.DatasetList(); // 用户本身服务信息
  var grpserverPackageset =  new Wade.DatasetList(); // 成员定制的服务信息

  for(i=0;i<selectElementset.getCount();i++)
  {
 
   	  var elementData=selectElementset.get(i);
   	 var productMode=elementData.get("PRODUCT_MODE");
   	 var elementsDataset = elementData.get("ELEMENTS"); // 取元素
   	 
   	 for(j=0;j<elementsDataset.getCount();j++)
   	 {
   	 	var packageData = elementsDataset.get(j); // 取每个元素
   	 	var elementType = packageData.get("ELEMENT_TYPE_CODE", "");
   	    if((productMode=="10"||productMode=="11")&&elementType=="S")//处理用户级的服务元素
   	 	{
   	 		svcDataset.add(packageData);
   	 	}
   	 	else if((productMode=="12"||productMode=="13")&&elementType=="S")//处理成员级的服务元素
   	 	{
   	 		grpserverPackageset.add(packageData);
   	 	}
   	 }
   	
  }

  for(i=0;i<grpserverPackageset.getCount();i++)
  {
  	var packageData=grpserverPackageset.get(i);
  	var packserverId=packageData.get("ELEMENT_ID");
  
  	for(k=0;k<needchecklist.length;k++)
  	{
  	   if(packserverId==needchecklist[k])//过滤为只有需要校验的服务 才执行校验
  	   {
  	   		var compareflag="";
  	   		for(j=0;j<svcDataset.getCount();j++)
  			{
  				var svcdata=svcDataset.get(j);
  				var svcServerId=svcdata.get("ELEMENT_ID");
  				if(packserverId==svcServerId)
  				{
  					compareflag="true";
  					break;
  				}	
  			}
  			
  			if(compareflag!="true")
  			{
  				var errormsg="定制成员产品的 ["+packageData.get("ELEMENT_NAME")+"] 服务 \n必选订购集团产品的 ["+packageData.get("ELEMENT_NAME")+"] 服务\uFF01";
  				alert(errormsg);
  				return false;
  		 	}
  		}
  		
  		
  	 }
   }

  return true;
}

function opertionResList(resType, resValue){
	var old = getElement("GRP_OLDRES_RECORD");
	var ne = getElement("GRP_NEWRES_LIST");
	var oldRecord = new Wade.DatasetList(old.value);
	var newList = new Wade.DatasetList(ne.value);
	var obj = new Wade.DataMap();
	obj.put("RES_TYPE_CODE", resType);
	obj.put("RES_CODE", resValue);
	obj.put("STATE","ADD");
	oldRecord.each(function(item,index,totalcount){
			if (item.get("RES_TYPE_CODE")==obj.get("RES_TYPE_CODE")){
				obj.put("STATE","MODI");
			}
		});
	newList.each(function(item,index,totalcount){
			if (item.get("RES_TYPE_CODE")==obj.get("RES_TYPE_CODE")){
				newList.removeAt(index);
			}
		});
	newList.add(obj);
	ne.value=newList.toString();
}

function checkRes(obj,isClick){

    var temValue = obj.value;
    var code = getElement('HIDDENRESULT');
    var resType=getElement('STR_RES_TYPE');

    if(code.value !=''){         
       var deleobj = new Wade.DataMap();
	     deleobj.put("RES_TYPE_CODE", resType.value);
	     deleobj.put("RES_CODE", code.value);
	     deleobj.put("CHECKED","true");
	     deleobj.put("DISABLED","true");
	     deleteRes(deleobj);
     }
     /*
    code.value = "";
    if (temValue == code.value || temValue.length<11){
	  alert("请输入正确的手机号码\uFF01");
	  return false;
	}
	*/
	
	/*
	for(var i=0;i<temValue.length;i++){
		var chr=temValue.substring(i,i+1);
		if(chr>'9'||chr<'0'){
			alert('输入必须全为[0-9]的数字');
			return false;
		}
	}
	*/
    ajaxSubmit(this, 'checkResourceInfo', '&res_RES_TYPE='+resType.value+'&res_RES_VALUE='+temValue, 'ResPart','',null,function(){
    	afterCheckRes(code,temValue,this.ajaxDataset,isClick);
    });
    return false;
}

function afterCheckRes(code,temValue,ajaxDataset,isClick){
  var flag = ajaxDataset.get(0,"X_RESULTCODE");
  var message = ajaxDataset.get(0,"X_RESULTINFO");
   if( flag != "-1"){
	 getElement('HIDDENRESULT').value=temValue;
  	 
  	 var obj = new Wade.DataMap();
	   obj.put("RES_TYPE_CODE", flag);
	   obj.put("RES_CODE", temValue);
	   obj.put("CHECKED","true");
	   obj.put("DISABLED","true");
	   insertRes(obj);
  	 alert('检验通过，录入的资源号码可以使用\uFF01');
  	 if(isClick)
  	 {
  	 	 getFrame(['flowtab',parent]).fireMouseEvent('bnext','click');
  	 }
  	 //return true;
  }else{
  	alert(message);
  	//return false;
  	//showMessageBox(message);
  }
}
  
//生成服务号码
function genGrpSn(obj){
   var code = getElement('IS_RES_CODE');
   var resType=getElement('STR_RES_TYPE');
   if(code.value==1){
       var temp=getElement('SERIAL_NUMBER');  
       var deleobj = new Wade.DataMap();
	     deleobj.put("RES_TYPE_CODE", resType.value);
	     deleobj.put("RES_CODE", temp.value);
	     deleobj.put("CHECKED","true");
	     deleobj.put("DISABLED","true");
	     deleteRes(deleobj);
   
    code.value = "";
    }
 
    ajaxSubmit(this, 'genGrpSn', '&departNo='+departNo, 'ResPart','',null,function(){
    	aftergenGrpSn(this.ajaxDataset,index);
    });
}

//插入到资源界面
function aftergenGrpSn(ajaxDataset,obj){
  
     var sn = ajaxDataset.get(0,"SERIAL_NUMBER");
     var code = getElement('HIDDENRESULT');
     var snum=getElement('SERIAL_NUMBER');
     var resType=getElement('STR_RES_TYPE');
    
     getElement('DEPARTMENT').options[obj].selected=true;
   //  var code = getElement('IS_RES_CODE');
      code.value=sn;
      snum.value=sn;
      getElement('IS_RES_CODE').value=1;
     
  	   var obj = new Wade.DataMap();
	   obj.put("RES_TYPE_CODE", resType.value);
	   obj.put("RES_CODE", sn);
	   obj.put("CHECKED","true");
	   obj.put("DISABLED","true");
	   insertRes(obj);
  	
}
  
  
function ChangeDevelop(){
	var DEVOLP_DEPART_ID2 = getElement('DEVOLP_DEPART_ID2').value;
	var DEVOLP_DEPART_NAME = getElement('DEVOLP_DEPART_NAME').value;
	if (DEVOLP_DEPART_ID2 != "")
	{
		//alert("DEVOLP_DEPART_ID2="+DEVOLP_DEPART_ID2+"DEVOLP_DEPART_NAME="+DEVOLP_DEPART_NAME);
		var   oOption   =   document.createElement("OPTION");
    oOption.text= DEVOLP_DEPART_NAME; 
    oOption.value=DEVOLP_DEPART_ID2; 
    getElement("DEVOLP_DEPART_ID").options.add(oOption);
   	getElement("DEVOLP_DEPART_ID").value =  DEVOLP_DEPART_ID2;
   	//alert(getElement("DEVOLP_DEPART_ID").value);
	}
}

function changeSameAcctTag() {
		var sameAcct = getElement("acct_SAME_ACCT");
		var divAcct = getElement("AcctInfoPart");
		var payModeCode = getElement("acct_PAY_MODE_CODE");
		var superbandCode = getElement("acct_SUPER_BANK_CODE");
		var bankCode = getElement("acct_BANK_CODE");
		var bandAcctNo = getElement("acct_BANK_ACCT_NO");
		var bandContNo = getElement("acct_CONTRACT_ID");
		var pay_name = getElement("acct_PAY_NAME");
		var acct_RSRV_STR8 = getElement("acct_RSRV_STR8");
		var acct_RSRV_STR9 = getElement("acct_RSRV_STR9");				
		var queryPart = getElement("queryPart");
		var OtherAcctPart = getElement("OtherAcctPart");		
		if(sameAcct.value == '1')
		{
			disabled(superbandCode, true);
			disabled(bankCode, true);
			disabled(bandAcctNo, true);
			disabled(bandContNo, true);
			disabled(acct_RSRV_STR8,true);
			disabled(acct_RSRV_STR9,true);			
			getElement("acct_SUPER_BANK_CODE").value="";
			getElement("acct_BANK_CODE").value="";
			getElement("acct_CONTRACT_ID").value="";
			getElement("acct_BANK_ACCT_NO").value="";
			superbandCode.setAttribute("nullable", "yes");
			bankCode.setAttribute("nullable", "yes");
			bandAcctNo.setAttribute("nullable", "yes");		
			hidden(queryPart,false);	
			hidden(OtherAcctPart,false);
			disabled(payModeCode, true);
			disabled(pay_name, true);
			pay_name.value = "";
		}
		else
		{
			hidden(queryPart,true);
			hidden(OtherAcctPart,true);
			payModeCode.setAttribute("nullable", "no");
			pay_name.setAttribute("nullable", "no");
			pay_name.value = pay_name.getAttribute('defalt_value');
			disabled(payModeCode, false);
			disabled(pay_name, false);
			disabled(acct_RSRV_STR8,false);
			disabled(acct_RSRV_STR9,false);			
		}
}


/**检查付费方式是不是集团，如果是则激活定制模板*/
function changePayFeeMode() {
	/*
	var payFeeModeCode = getElement("acct_PAY_FEE_MODE_CODE");
	var planModeCode = getElement("acct_PLAN_MODE_CODE");

	if(payFeeModeCode.value == "P") {		
		disabled(planModeCode, true);
		getElement("acct_PLAN_MODE_CODE").value="";
		planModeCode.setAttribute("nullable", "yes");
	}else if(payFeeModeCode.value == "C"){
		disabled(planModeCode, false);
		planModeCode.setAttribute("nullable", "no");
    }else if(payFeeModeCode.value == ""){
		disabled(planModeCode, true);
		planModeCode.setAttribute("nullable", "yes");
	}*/
}


function changePlanMode() {
	var planModeCode = getElement("acct_PLAN_MODE_CODE");
	//alert(planModeCode.value); 
	if(planModeCode.value == "0") {		

		getElement("COMPIX_ACCOUNT").value="0";

	}else if(planModeCode.value == "1"){

		//MessageBox.confirm('确认信息','请注意：您选择了完全统付，在该模式下，所有的成员加入该集团产品都会与集团账户合户，成员所有费用将由集团账户支付！',dealMsgBox3);
		//if ((confirm("请注意：您选择了完全统付，在该模式下，所有的成员加入该集团产品都会与集团账户合户，成员所有费用将由集团账户支付！")))
		if (!confirm("请注意：\n【完全统付】付费模式是集团单位为单位成员缴纳所有通信费用的付费模式。单位成员共用一个账户，账户内金额由所有成员共同使用。请业务受理人员在办理【完全统付】付费模式前与客户解释和确认关于账户金额的使用规则，避免业务风险。")){
			getElement("acct_PLAN_MODE_CODE").value = "";
        }else{
			getElement("COMPIX_ACCOUNT").value="0";
        }

	}else if(planModeCode.value == "2"){

		if (!confirm("请注意：\n【限定金额】是集团单位只为单位成员缴纳固定金额通信费用的付费模式。")){
			getElement("acct_PLAN_MODE_CODE").value = "";
        }else{
			getElement("COMPIX_ACCOUNT").value="1";
        }

	}else if(planModeCode.value == "3"){

		if (!confirm("请注意：\n【限定账目项】是集团单位只为单位成员缴纳指定账目项通信费用的付费模式。")){
			getElement("acct_PLAN_MODE_CODE").value = "";
        }else{
			getElement("COMPIX_ACCOUNT").value="1";
        }

	}else if(planModeCode.value == "4"){

		if (!confirm("请注意：\n【既限金额，又限账目项】是集团单位只为单位成员缴纳指定账目项中固定金额通信费用的付费模式。")){
			getElement("acct_PLAN_MODE_CODE").value = "";
        }else{
			getElement("COMPIX_ACCOUNT").value="1";
        }
	}
	
    //var tradeData=new Wade.DataMap(getElement("tradeData").value);
    //var str = getElement("defaultPayPlans").value;
	//popupPage('group.creategroupacct.CreateGrpdesignPay', 'initial', '&cond_GROUP_ID='+tradeData.get('USER_INFO','').get('GROUP_ID')+'&DEF_PAYPLAN='+str, '集团付费模板', '640', '480');
}
 
/**检查帐户类别是不是选择托收，如果是则激活上级银行、银行名称、银行帐号组件*/
function checkPaymode(mode) {
	var payModeCode = getElement("acct_PAY_MODE_CODE");
	var superbandCode = getElement("acct_SUPER_BANK_CODE");
	var bankCode = getElement("acct_BANK_CODE");
	var bandAcctNo = getElement("acct_BANK_ACCT_NO");
	var bandContNo = getElement("acct_CONTRACT_ID");
	if(payModeCode.value == "0") {		
		disabled(superbandCode, true);
		disabled(bankCode, true);
		disabled(bandAcctNo, true);
		disabled(bandContNo, true);
		getElement("acct_SUPER_BANK_CODE").value="";
		getElement("acct_BANK_CODE").value="";
		getElement("acct_CONTRACT_ID").value="";
		getElement("acct_BANK_ACCT_NO").value="";
		superbandCode.setAttribute("nullable", "yes");
		bankCode.setAttribute("nullable", "yes");
		bandAcctNo.setAttribute("nullable", "yes");
	}else if(payModeCode.value == ""){
		disabled(superbandCode, true);
		disabled(bankCode, true);
		disabled(bandAcctNo, true);
		disabled(bandContNo, true);
		
		superbandCode.setAttribute("nullable", "yes");
		bankCode.setAttribute("nullable", "yes");
		bandAcctNo.setAttribute("nullable", "yes");
	}else{
		disabled(superbandCode, false);
		disabled(bankCode, false);
		disabled(bandAcctNo, false);
		disabled(bandContNo, false);
		superbandCode.setAttribute("nullable", "no");
		bankCode.setAttribute("nullable", "no");
		bandAcctNo.setAttribute("nullable", "no");
     }
}


/** 根据上级银行获取银行名称列表*/
function ajaxGetBankCode() {
	var superBankCode = getElement('acct_SUPER_BANK_CODE');	
	if (superBankCode != null && superBankCode.value.trim() != "") {
		ajaxDirect4CS(this,'queryBank', '&SUPER_BANK_CODE='+superBankCode.value, 'bankFld', null, after);
	}
}
	
function after(){
	var bankCode = getElement('acct_BANK_CODE');
	bankCode.setAttribute('nullable', 'no');
	disabled(bankCode, false);
}

/**
 * 合户 按服务号码查询
*/
function  refeshAcctBySn(){
	var serialNumber = getElementValue('acct_GRP_SERIAL_NUMBER');
	if(serialNumber == '' || serialNumber == null){
		alert('服务号码不能为空\uFF01');
		return false;
	}
	if (/^[1][13458][0-9](\d{8})$/.test(serialNumber)) {
		//alert('请输入集团用户编码！');
		//return false;
		ajaxDirect4CS(this,'getAcctByPsnSn','&GRP_SERIAL_NUMBER='+serialNumber,'OtherAcctPart',null,null);
	}
	else
	{
    	ajaxDirect4CS(this,'getAcctByGrpSn','&GRP_SERIAL_NUMBER='+serialNumber,'OtherAcctPart',null,null);
	}
}

/**
 * 合户时 按合同号查询
*/
function  refeshAcctByContract(){
	if(getElementValue('acct_ACCT_NUMBER') == '')
	{
		alert('请输入合同号\uFF01');
		return false;
	}
    ajaxDirect4CS(this,'getAccountInfoByContract','&ACCT_CONTRACT_NO='+getElementValue('acct_ACCT_NUMBER'),'OtherAcctPart',null,null);
}

/**
 * 合户时 按集团编码
*/
function  refeshAcctByCstId(){
	if(getElementValue('POP_ACCT_GROUP_ID') == '')
	{
		alert('请输入集团客户编码\uFF01');
		return false;
	}
    ajaxDirect4CS(this,'getAcctByGrpId','&POP_ACCT_GROUP_ID='+getElementValue('POP_ACCT_GROUP_ID'),'OtherAcctPart',null,null);
}



/**
 * 选择不合户时，不同的查询条件
*/
function changeQueryType() {
   var choose=getElement("QueryType").value;
   if (choose=="1") { //按集团编码
      getElement("QueryTypeOne").style.display = "block";
      getElement("QueryTypeTwo").style.display = "none";
      getElement("QueryTypeThree").style.display = "none";
      getElement('POP_ACCT_GROUP_ID').value="";
      getElement('acct_GRP_SERIAL_NUMBER').value="";
      getElement('acct_ACCT_NUMBER').value="";      
   }else if (choose=="2") { //按服务号码
      getElement("QueryTypeOne").style.display = "none";
      getElement("QueryTypeTwo").style.display = "block";
      getElement("QueryTypeThree").style.display = "none";      
      getElement('POP_ACCT_GROUP_ID').value="";
      getElement('acct_GRP_SERIAL_NUMBER').value="";
      getElement('acct_ACCT_NUMBER').value="";          
   }else if( choose=="3")//按合同号
   {
      getElement("QueryTypeOne").style.display = "none";
      getElement("QueryTypeTwo").style.display = "none";
      getElement("QueryTypeThree").style.display = "block";  
      getElement('POP_ACCT_GROUP_ID').value="";
      getElement('acct_GRP_SERIAL_NUMBER').value="";
      getElement('acct_ACCT_NUMBER').value="";          
   }   
}

function queryAcct()
{
	var choose=getElement("QueryType").value;
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
	var choose=getElement("acct_ACCT_ID").value;
	var acctList = new Wade.DatasetList(getElementValue('acc_ACCT_LIST'));
	if(choose != '')	 
	{
	 	for(var i= 0;i< acctList.length ; i++)
	 	{
	 		var item = acctList.get(i);
	 		if(item.get("ACCT_ID")==choose)
	 		{
	 			if(item.get("PAY_NAME") != '' && item.get("PAY_NAME") != 'undefined' )
	 			{
					getElement("acct_PAY_NAME").value = item.get("PAY_NAME");
				}
				getElement("acct_PAY_MODE_CODE").value = item.get("PAY_MODE_CODE");
				getElement("acct_RSRV_STR8").value = item.get("RSRV_STR8");
				getElement("acct_RSRV_STR9").value = item.get("RSRV_STR9");
				if(item.get("PAY_MODE_CODE") != 0)
				{	 			
		 			getElement("acct_SUPER_BANK_CODE").value = item.get("SUPER_BANK_CODE");
		 			
		 			var   oOption   =   document.createElement("OPTION");
    				oOption.text= item.get("BANK_CODE"); 
    				oOption.value=item.get("BANK"); 
    				oOption.selected='selected';
    				getElement("acct_BANK_CODE").options.add(oOption);			
					getElement("acct_BANK_CODE").value = item.get("BANK_CODE");
					getElement("acct_CONTRACT_ID").value = item.get("CONTRACT_ID");
					getElement("acct_BANK_ACCT_NO").value = item.get("BANK_ACCT_NO");
				}else
				{
		 			getElement("acct_SUPER_BANK_CODE").value ="";
					getElement("acct_BANK_CODE").value ="";
					getElement("acct_CONTRACT_ID").value ="";
					getElement("acct_BANK_ACCT_NO").value ="";
					
				}
	 		}
	 	}
	}
}	

//账户资料检查 1合户 0不合户
function checkAcctInfo()
{
	var sameAcct = getElement("acct_SAME_ACCT");
	var payModeCode = getElement("acct_PAY_MODE_CODE");
	var superbandCode = getElement("acct_SUPER_BANK_CODE");
	var bankCode = getElement("acct_BANK_CODE");
	var bandAcctNo = getElement("acct_BANK_ACCT_NO");
	var bandContNo = getElement("acct_CONTRACT_ID");
	var pay_name = getElement("acct_PAY_NAME");
	var acct_RSRV_STR8 = getElement("acct_RSRV_STR8");
	var acct_RSRV_STR9 = getElement("acct_RSRV_STR9");			
	var planMode = getElement("acct_PLAN_MODE_CODE");
	
	if(sameAcct.value == "1") {			
		if(pay_name.value == '')
		{
			alert('请选择查询方式进行查询账户列表,后选择具体的一个账户进行合户处理\uFF01');
			return false;
		}					
	}
	else
	{	
		if((planMode.value == '') && (getElement("acct_PLAN_MODE_CODE").disabled == false) )
		{
			alert(planMode.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}
		if(pay_name.value == '')
		{
			alert(pay_name.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}
		if(payModeCode.value == '')
		{
			alert(payModeCode.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}
		if(acct_RSRV_STR8.value == '')
		{
			alert(acct_RSRV_STR8.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}
		if(acct_RSRV_STR9.value == '')
		{
			alert(acct_RSRV_STR9.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}				
		if(payModeCode.value != '0'  && superbandCode.value == '')
		{
			alert(superbandCode.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}
		if(payModeCode.value != '0'  && bankCode.value == '')
		{
			alert(bankCode.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}		
		if(payModeCode.value != '0'  && bandAcctNo.value == '')
		{
			alert(bandAcctNo.getAttribute('desc')+'不能为空\uFF01');
			return false;
		}	
	}
	return true;
}

/**提示*/
function dealMsgBox3(btn)
{
	if(btn=='yes')
	{
		//return confirm('确认选择吗？');
		//getElement('newSnInfo_LIMIT').value='0';
		//submitValid();
	}
	else if(btn=='no')
	{
		getElement('acct_PLAN_MODE_CODE').value="";
		//Wade.page.endPageLoading();
		return false;
	}
	return true;
}    