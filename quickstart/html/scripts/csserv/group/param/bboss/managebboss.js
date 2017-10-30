/**
 * 比较两个dataset
 * str为需要比较的字段，以逗号分隔
 * 返回一个比较后的dataset
 * key唯一区分这个数据的,key可以是由多个字段组成的，以逗号分隔
 * str除了key以外的其他值
 */
function compareParamDataset(newDs,oldDs,key,str)
{
	var resultDs = new Wade.DatasetList();
	var ss = str.split(",");
	var keyCols = key.split(",");
	
	//newDs和oldDs比较
	for(var i=0;i<newDs.length;i++)
	{
		var newData = newDs.get(i);
		newData.put("MODIFY_TAG","ADD");//默认是新增的
		
		for(var j=0;j<oldDs.length;j++)
		{
			var oldData = oldDs.get(j);
			var isKeyFind = "false";//是否在两个数据中找到了相同的key
			for(var k=0;k<keyCols.length;k++)
			{
				if(newData.get(keyCols[k]) == oldData.get(keyCols[k])&& newData.get("ATTR_GROUP") == oldData.get("ATTR_GROUP"))
				{
					isKeyFind = "true";
					break;//如果key中有一个字段不相等，就不用比较了
				}
				else
				{
					isKeyFind = "false";
				}
			}
			
			if(isKeyFind=="true")//如果两个参数的key相同
			{
				newData.put("MODIFY_TAG","EXIST");//置为存在状态
				var isModif = "false";//是否被修改了
				for(var k=0;k<ss.length;k++)
				{
					isModif = "false";//是否被修改了
					if(newData.get(ss[k])==oldData.get(ss[k]))
					{
						continue;//如果两个字段相等，继续比较下一个字段
					}
					else
					{
						isModif = "true";
						break;
					}
				}
				if(isModif=="true")//如果被修改了，就要保存成一条删除，一条新增
				{
					oldData.put("MODIFY_TAG","DEL");//将老的数据置为删除状态
					newData.put("MODIFY_TAG","ADD");//将新数据置为新增状态
					newData.put("PARAM_OLD_VALUE",oldData.get(ss[k]));

					resultDs.add(oldData);		//将删除的老数据也保存
				}
			}
		}
		resultDs.add(newData);
	}
	
	//老数据和新数据进行比较
	for(var i=0;i<oldDs.length;i++)
	{
		var isfound = "false";//是否找到了这个参数
		var oldData = oldDs.get(i);
		for(var j=0;j<newDs.length;j++)
		{
			var newData = newDs.get(j);
			if(oldData.get(key)==newData.get(key)&& oldData.get("ATTR_GROUP") == newData.get("ATTR_GROUP"))//比较老参数在新参数列表中是否有
			{
				isfound = "true";
				continue;
			}
		}
		if(isfound == "false")//如果新参数中没有，就要删除老的
		{
			oldData.put("MODIFY_TAG","DEL");
			resultDs.add(oldData);
		}
	}
	
	return resultDs;
}

var _id;

/**
 * 保存用户动态表格goodsParamTableEdit的数据
 */
function saveUserParamRow(){
	if(verifyField(getElement("input_"+_id)))
	{
		getElement("PARAM_VALUE").value=getElement("input_"+_id).value;
		if(getElement("input_"+_id).options != null)
		{
			var opt = getElement("input_"+_id).options;
			for(var i=0;i<opt.length;i++)
			{
				var   oOption = opt[i];
				if(oOption.value == getElement("input_"+_id).value)
				{
					getElement("PARAM_ATTR").value=oOption.text;
				}
			}
		}
		
		goodsParamTableEdit.updateRow();
		document.getElementById("bupdate").style.display="none";
		document.getElementById("bcancel").style.display="none";
	}
	controlProductTreehHide();
}


/**
* 保存成员动态表格memberParamsTableEdit的数据
*/
function saveMemberParamRow(obj) {
	if(verifyField(getElement("input_"+_id)))
	{
		getElement("PARAM_VALUE").value=getElement("input_"+_id).value;
		getElement("PARAM_VALUE_DESC").value=getElement("input_"+_id).value;
		if((getElement("input_"+_id).tagName) == "SELECT")
		{
			if(getElement("input_"+_id).value != '')
				getElement("PARAM_VALUE_DESC").value = getElement("input_"+_id).options[getElement("input_"+_id).selectedIndex].getAttribute('text');
		}
	
		memberParamsTableEdit.updateRow();
		document.getElementById("bupdate").style.display="none";
		document.getElementById("bcancel").style.display="none";
	}
}

/**
 * 取消动态表格的编辑
 */
/**
 * 取消成员动态表格的编辑
 */
function cancelMemberParamEdit(){
	if(document.getElementById("ATTRIBUTE_DESC"))
	{
		document.getElementById("ATTRIBUTE_DESC").value = "";
	}
	if(document.getElementById("ATTRIBUTE_VALUE"))
	{
		document.getElementById("ATTRIBUTE_VALUE").value = "";
	}
	
	document.getElementById("bupdate").style.display="none";
	document.getElementById("bcancel").style.display="none";
}

/**
 * 点击用户动态表格的时候触发
 */
function clickUserParamsRow(e)
{
	//controlProductTreeChg();
	document.getElementById("bupdate").style.display="";
	document.getElementById("bcancel").style.display="";
	
	var td=e.target;  
	var row=td.parentNode;  
	var paramCode=this.getCell(row,"PARAM_CODE");
	var paramCodeValue=paramCode.firstChild.nodeValue; 
	
	var paramName=this.getCell(row,"PARAM_NAME");
	var paramNameValue=paramName.firstChild.nodeValue; 
	
	
	if(_id&&_id != paramCodeValue)
	{
		hidden(getElement("div_"+_id),true);
	}
	_id = paramCodeValue;
	hidden(getElement("div_"+paramCodeValue),false);
}
 
 /**
  * 点击成员的动态表格
  */
 function clickMemberParamsRow(e)
 {
 	document.getElementById("bupdate").style.display="";
	document.getElementById("bcancel").style.display="";
	
	var td=e.target;  
	var row=td.parentNode;  
	var paramAttr=this.getCell(row,"PARAM_ATTR");
	var paramCode=this.getCell(row,"PARAM_CODE");
	var paramAttrValue=paramAttr.firstChild.nodeValue;  
	var paramCodeValue=paramCode.firstChild.nodeValue; 
	if(_id&&_id != paramAttrValue+paramCodeValue)
	{
		hidden(getElement("div_"+_id),true);
	}
	_id = paramAttrValue+paramCodeValue;
	hidden(getElement("div_"+paramAttrValue+paramCodeValue),false);
}

//从tradeData的X_COMP_DATA中获取PRODUCT_PARAM
function getPRODUCT_PARAM(X_COMP_DATA)
{
	var PRODUCT_PARAM = X_COMP_DATA.get("PRODUCT_PARAM");
    if(!PRODUCT_PARAM)
    {
    	PRODUCT_PARAM = new Wade.DataMap(); 
    }
    return PRODUCT_PARAM;
}

//从tradeData的X_COMP_DATA中获取GOODS_INFO
function getGOODS_INFO(X_COMP_DATA)
{
	var GOODS_INFO = X_COMP_DATA.get("GOODS_INFO");
    if(!GOODS_INFO)
    {
    	GOODS_INFO = new Wade.DataMap(); 
    }
    return GOODS_INFO;
}
//从tradeData的X_COMP_DATA中获取GOODS_INFO,再从中获取指定产品的productGoodsInfo
function getProductGoodsInfo(X_COMP_DATA,productId)
{
	var productGoodsInfo = getGOODS_INFO(X_COMP_DATA).get(productId);
	if(!productGoodsInfo)
	{
		productGoodsInfo = new Wade.DataMap();
	}
	return productGoodsInfo;
}

// 从tradeData的X_COMP_DATA中获取GOODS_INFO,再获取指定PRODUCT_ID下的GOODS_INFO
function getGoodsInfo(X_COMP_DATA,productId)
{
	var productGoodsInfo = getProductGoodsInfo(X_COMP_DATA,productId);
	var goodsInfo = productGoodsInfo.get("GOODS_INFO");
	if(!goodsInfo)
	{
		goodsInfo = new Wade.DataMap();
	}
	return goodsInfo;
}

// 从tradeData的X_COMP_DATA中获取GOODS_INFO,再获取指定PRODUCT_ID下的PRODUCT_INFO
function getProductInfo(X_COMP_DATA,productId)
{
	var productGoodsInfo = getProductGoodsInfo(X_COMP_DATA,productId);
	var productInfos = productGoodsInfo.get("PRODUCT_INFO");
	if(!productInfos)
	{
		productInfos = new Wade.DatasetList();
	}
	return productInfos;
}

//从tradeData的X_COMP_DATA中获取PRODUCTS_ELEMENT
function getPRODUCTS_ELEMENT(X_COMP_DATA)
{
	var data = X_COMP_DATA.get("PRODUCTS_ELEMENT");
    if(!data)
    {
    	data = new Wade.DataMap();
    }
    return data;
}



/**
验证是否选择结束

**/

function checkJs()
{

	
   //取省BBOSS反馈管理信息数据
	var bossManage = new Wade.DatasetList();
    var rowData = $.table.get("productParamTable2").getTableData(null, true);
     var bbossFlow="结束";
	 var jisflag="0";
	 var  vvv="0";
	for(var i=0;i<rowData.length;i++)
	{
   	   var tmpData = new Wade.DataMap();
		tmpData.put("PARAM_CODE", rowData.get(i).get("PARAM_CODE").substring(4));
		tmpData.put("PARAM_NAME", rowData.get(i).get("PARAM_NAME"));
		
		var bbossFlow = $("#"+"PARAM_FLAG_"+rowData.get(i).get("PARAM_CODE")).val();
		if(bbossFlow=="1") //说明是流程的选项
		{
			var vvv = rowData.get(i).get("PARAM_VALUE");
		}
	}
	
	
		// if(vvv.substring(6,vvv.lastIndexOf("_"))=="0")
		//if(vvv.substring())
		 if( vvv.substring(vvv.lastIndexOf("_")+1)=="主办省结束流程")
		{   	
		if(confirm("确定结束流程?"))
		return true;
		else   return false;		
	   
		}
		return true;
		
}
/* *
下发管理信息非空校验
chenyi
 */
function  verifyAll(){
        var result1 =$.validate.verifyAll('orderinfotabset')
		var result2 = $.validate.verifyAll('productManageInfos');
		
	if (result1==true&&result2==true){
		return true;
	}else{
		return false;
	}
}


//管理节点校验
function bbossManageconfirm(){
	//产品属性校验
	var result1 =productParamCommit();
	
	//管理节点属性校验
	var result2 =bbossManageCommit();
	if (result1==true&&result2==true ){
		return true;
	}
	else{
	 	return false;
	}
}
//管理节点属性校验
function bbossManageCommit(){
	//基本校验，例如非空校验
	var result = $.validate.verifyAll('productManageInfos');
	if (result==false){
		return false;
	}
	else
	 return true;
}

/*
 *集团BBOSS产品参数页面提交校验统一接口
 */
function productParamCommit(){
	//基本校验，例如非空校验
	var result = $.validate.verifyAll('orderinfotabset');
	if (result==false){
		return false;
	}
	
	//获取所有对象
	var attrParams=$('[id =PRODUCT_PARAM_CODE]');
	
	
	//返回值定义
	var verifyResult = true;
	attrParams.each(function(){
   	   //获取输入框对象
   	    var paramCode = $.attr(this,"value");
		var inputObj = $("#input_"+paramCode);
		
		//获取调用的js方法名
		var methodName =inputObj.attr('commitMethodName');
		//判断方法名是否存在，如果不存在则直接返回
		if(methodName!=null && methodName != "undefined"){
			//获取产品的既有值
			var oldValue =$('#OLDVALUE_'+paramCode).val();
			//获取当前属性的属性值
			var attrValue = inputObj.val();
			verifyResult = window[methodName](inputObj,paramCode,oldValue,attrValue);
			if(verifyResult==false){
				return false;
			}
		}	
			
    });
	return verifyResult;
}

//▼▼▼▼▼ MODIFY_CHENGJIAN_02 ▼▼▼▼▼
function checkProductParamValue(paramCode){
	
	var verifyResult = true;
	
	//互联网专线 专线所在省客户编码 需分省支付时必填
	

	//专线业务、跨省互联网专线、跨省集团wlan、呼叫中心直联、跨国专线开通验收报告验证
	if("1112054333"==paramCode ||"1112084333"==paramCode || "301014332"==paramCode || 
			"1113025021"==paramCode  || "1112064333"==paramCode || "1112074333"==paramCode)
	{
		
	}
	return verifyResult;
}
//▲▲▲▲▲ MODIFY_CHENGJIAN_02 ▲▲▲▲▲
function  verifyInterNetGroupInfo(tradeId,group_id,inputObj,paramCode){
	
	var result=false;
	ajaxSubmit('orderinfotabset', 'verifyInterNetGroupInfo','&MERCH_TRADE_ID='+tradeId+'&GROUP_ID='+group_id, '',function success(data){
					inputObj.val(data.get("MP_GROUP_CUST_CODE"));
					//获取调用的js方法名
					var methodName =inputObj.attr('commitMethodName');
					//判断方法名是否存在，如果不存在则直接返回
					if(methodName!=null && methodName != "undefined"){
						//获取产品的既有值
					var oldValue =$('#OLDVALUE_'+paramCode).val();
					//获取当前属性的属性值
					var attrValue = inputObj.val();
					var verifyResult = window[methodName](inputObj,paramCode,oldValue,attrValue);
					if(verifyResult==false){
						result=false;
						}
					}	;
				result=  true;
			},
	function(e,i){
			$.showErrorMessage("专线所在省客户编码对应集团公司EC编码不存在");
			result= false;
	    },
	    {async:false}
	);
			
		return result;	
		
}

/**
 * 弹出页面使用
 * 将BBOSS产品的资费信息和产品参数信息放到指定的控件中
 * modify by weixb3 2013-4-22
 */
function setProductParamsTrade()
{
	$.beginPageLoading("业务受理中...");
	var manageInfo=new Wade.DataMap($("#MANAGE_INFO_HIDDEN").val());
	//manageInfo.put("flag",true);//管理借点标识，拼参数时使用
	var bossManage = new Wade.DatasetList();
	//取出商品合同附件信息
	var bbossUploadId = $("#uploadtest").val();
	//取省BBOSS反馈管理信息数据
	var rowData = $.table.get("productParamTable2").getTableData(null, true);
	for (var i = 0; i < rowData.length; i++)
	{
		var tmpData = new Wade.DataMap();
		tmpData.put("PARAM_CODE", rowData.get(i).get("PARAM_CODE").substring(4));
		tmpData.put("PARAM_NAME", rowData.get(i).get("PARAM_NAME"));
		
		var bbossFlow = $("#"+"PARAM_FLAG_"+rowData.get(i).get("PARAM_CODE")).val();
		if(bbossFlow=="1") //说明是流程的选项
		{
			var vv = rowData.get(i).get("PARAM_VALUE");
			var s = rowData.get(i).get("PARAM_CODE").substring(4);
			manageInfo.put("BbossFlow", $('#PARAM_VALUE_'+rowData.get(i).get("PARAM_CODE")).val());
			tmpData.put("PARAM_VALUE",vv.substring(vv.lastIndexOf("_")+1));
		}
		else   
		{
			tmpData.put("PARAM_VALUE", rowData.get(i).get("PARAM_VALUE"));
		}
		bossManage.add(tmpData);
	}
	manageInfo.put("MANAGE_INFO",bossManage);
	manageInfo.put("UPLOAD_ID",bbossUploadId);
	setAllProductParamInfo(manageInfo);
	var submitData = selectedElements.getSubmitData();
	//var selecElemts=$("#selectedElements").val()
   // var productElements = new Wade.DatasetList(submitData);
	var PRODUCTS_ELEMENT =  new Wade.DataMap(); 
	PRODUCTS_ELEMENT.put($("#PRODUCT_ID").val(),submitData);
	manageInfo.put("PRODUCTS_ELEMENT",PRODUCTS_ELEMENT);
	
	
	$("#MANAGE_INFO_HIDDEN").val(manageInfo.toString());
	
    var trade_id = $("#TRADE_ID").val();
    var bboss_user_id = $("#BBOSS_USER_ID").val();
    var flowPoint = $("#FLOWPOINT").val();
    var product_number = $("#PRODUCT_ID").val();
	var merch_trade_id = $("#MERCH_TRADE_ID").val();
	var orderId = $("#ORDER_ID").val();
	var eparchy_code =$("#GRP_USER_EPARCHYCODE").val();
	var busNeedDegree = $("#BUS_NEED_DEGREE").val();
	//关闭popup
	//setPopupReturnValue(null, null, true)
	ajaxSubmit(this, 'serverBbossFlow', '&FLOWPOINT='+flowPoint+'&MANAGE_INFO_HIDDEN='+encodeURIComponent(manageInfo.toString())+'&PRODUCT_NUMBER='+product_number+'&BBOSS_USER_ID='+bboss_user_id+'&TRADE_ID='+trade_id+'&MERCH_TRADE_ID='+merch_trade_id+'&ORDER_ID='+orderId+'&GRP_USER_EPARCHYCODE='+eparchy_code+
		'&BUS_NEED_DEGREE='+busNeedDegree, '',function success(){
		alert("crm侧数据处理成功，已发送服务开通侧，选择【确定】跳转到当前页面");
		setPopupReturnValue('','');
		$.endPageLoading();
	},
	function(error_code,error_info,derror){
			showDetailErrorInfo(error_code,error_info,derror);
			$.endPageLoading();
	    });

	
}

/**
 * 弹出页面使用
 * 将BBOSS产品的资费信息和产品参数信息放到指定的控件中 ,用在发送受理报文
 * modify by weixb3 2013-4-25
 */
function setProductParamsTradeAll(method)
{
	
	var manageInfo=new Wade.DataMap($("#MANAGE_INFO_HIDDEN").val());
	
	//取省BBOSS反馈管理信息数据
	var bossManage = new Wade.DatasetList();
	
	setAllElementInfo(manageInfo);
	
	setAllProductParamInfo(manageInfo);
	
	var trade_id = $("#TRADE_ID").val();
    var bboss_user_id = $("#BBOSS_USER_ID").val();
    var product_id = $("#PRODUCT_ID").val();
    var mproduct_id = $("#MPRODUCT_ID").val();
    var bus_need_degree = $("#BUS_NEED_DEGREE").val();
    var product_offer_id = $("#PRODUCT_OFFER_ID").val();
    try{
	    //获取合同附件信息
	    var strAttInfos = getFrame("frameProductOrder").window.$.table.get("dataList").getTableData("X_TAG,ATT_TYPE_CODE,ATT_CODE,CONT_NAME,ATT_NAME_filename");
	    for(var i=0;i<strAttInfos.length;i++){
	    	strAttInfos.get(i).put("ATT_NAME",strAttInfos.get(i).get("ATT_NAME_filename"));
		}
	    getFrame("frameProductOrder").window.$("#ATT_INFOS").val(strAttInfos)
	    var attrInfoList = new Wade.DatasetList(getFrame("frameProductOrder").window.$("#ATT_INFOS").val());
	    //获取审批人信息
	    var strAuditorInfos = getFrame("frameProductOrder").window.$.table.get("dataList2").getTableData("X_TAG,AUDITOR,AUDITOR_TIME,AUDITOR_DESC");
	    getFrame("frameProductOrder").window.$("#AUDITOR_INFOS").val(strAuditorInfos);
	    var auditorInfoList = new Wade.DatasetList(getFrame("frameProductOrder").window.$("#AUDITOR_INFOS").val());
	    //获取联系人信息
	    var strContactorInfos = getFrame("frameProductOrder").window.$.table.get("dataList3").getTableData("X_TAG,CONTACTOR_TYPE_CODE,CONTACTOR_NAME,CONTACTOR_PHONE,STAFF_NUMBER");
	    getFrame("frameProductOrder").window.$("#CONTACTOR_INFOS").val(strContactorInfos);
	  	var contactorInfoList = new Wade.DatasetList(getFrame("frameProductOrder").window.$("#CONTACTOR_INFOS").val());
	  	
  	}catch(e){
  		attrInfoList = "";;
  		auditorInfoList ="";;
  		contactorInfoList ="";;
  	}
  	if ('undefined' == contactorInfoList || '' == contactorInfoList || 0 == contactorInfoList.length)
  	{
  		alert('请填写联系人信息');
  		return;
  	}
  	
    if ('undefined' == product_offer_id)
    {
    	product_offer_id='';
    }
    var product_order_id = $("#PRODUCT_ORDER_ID").val();
    if ('undefined' == product_order_id)
    {
    	product_order_id='';
    }
    var merch_spec_code = $("#MERCH_SPEC_CODE").val();
    if ('undefined' == merch_spec_code)
    {
    	merch_spec_code='';
    }
    var product_spec_code = $("#PRODUCT_SPEC_CODE").val();
    if ('undefined' == product_spec_code)
    {
    	product_spec_code='';
    }
    $.beginPageLoading("业务受理中...");
	
	//关闭popup，显示提示信息
	ajaxSubmit(this, 'serverBbossFlow', '&PRODUCT_SPEC_CODE='+product_spec_code+'&MERCH_SPEC_CODE='+merch_spec_code+'&PRODUCT_ORDER_ID='+product_order_id+'&PRODUCT_OFFER_ID='+product_offer_id+'&BUS_NEED_DEGREE='+bus_need_degree+'&MANAGE_INFO_HIDDEN='+manageInfo.toString()+'&PRODUCT_ID='+product_id+'&MPRODUCT_ID='+mproduct_id+'&BBOSS_USER_ID='+bboss_user_id+'&TRADE_ID='+trade_id+
		'&ATT_INFOS='+attrInfoList+"&AUDITOR_INFOS="+auditorInfoList+"&CONTACTOR_INFOS="+contactorInfoList, '',function success(){
		alert("受理数据保存成功!");
		setPopupReturnValue('','');
		$.endPageLoading();
	},
	function(error_code,error_info,derror){
			showDetailErrorInfo(error_code,error_info,derror);
			$.endPageLoading();
	    });
	
}

/**
 * 点下一步的时候，进行验证
 */
function validateParamForNext(method)
{
	 if(method=="CrtUs"||method=="ChgUs")
	 {
		 if(getElementValue("operType")=="")
		 {
			 alert("请选择商品操作类型！");
			 return false;
		 }
	 }
	 return setCheckedProducts(method);
}

/**
 * 将没有被勾选的产品，从tradeData中移除
 */
function setCheckedProducts(method)
{
	var compixproduct = new Wade.DatasetList(getElementValue('grpCompixProduct'));
	
	var tradeData = new Wade.DataMap(getElementValue("tradeData"));//tradeData的数据,这是在弹出页面的父页面上
	var X_COMP_DATA = tradeData.get("X_COMP_DATA");
    
    var CURRENT_PRODUCT = X_COMP_DATA.get("CURRENT_PRODUCT");//商品ID
    var GOODS_INFO = getGOODS_INFO(X_COMP_DATA);

    
    
    var productGoodsInfo = getProductGoodsInfo(X_COMP_DATA,CURRENT_PRODUCT);

    var productInfoList = getProductInfo(X_COMP_DATA,CURRENT_PRODUCT);
    //获得指定区域的checkbox
	var chks = getChildsByRecursion('powerDiv', 'input', 'type', 'checkbox');
    //被选中的产品
    var selectedProducts = new Wade.DatasetList();
    var checkedNumber = 0;//被勾选的checkbox数
	
    for(var j=0;j<chks.length;j++)
    {
    	if(chks[j].checked)
		{
    		var isInTrade = "false";//是否在tradeData中
			checkedNumber++;
			for(var i=0;i<productInfoList.length;i++)
		    {
				if(productInfoList.get(i,"PRODUCT_ID")==chks[j].value)
				{
					if(method=="CrtUs"||method=="ChgUs")//当用户订购产品，或者产品变更时
					{
						if(productInfoList.get(i,"PRODUCT_OPER_CODE"))//有产品操作类型的，才向下传递
						{
							if(productInfoList.get(i,"PRODUCT_OPER_CODE")!='EXIST')
							{
								if(!validateOpCrtUs(getElementValue("operType"),productInfoList.get(i,"PRODUCT_OPER_CODE"),productInfoList.get(i,"PRODUCT_ID"))
							    || !validateForce(getElementValue("operType"),productInfoList.get(i,"PRODUCT_OPER_CODE"),chks[j].force_tag,productInfoList.get(i,"PRODUCT_ID")))
								{
									return false;
								}
							}
							selectedProducts.add(productInfoList.get(i));							
						}
					}
					else if(method=="CrtMb"||method=="ChgMb")
					{
						if(productInfoList.get(i,"MEB_OPER_CODE"))//有产品操作类型的，才向下传递
						{
							selectedProducts.add(productInfoList.get(i));
						}
					}
					
					isInTrade = "true";
					continue;
				}
		    }
			
			if(isInTrade=="false")
			{
				alert("请先填写参数！");
				return false;
			}
		}
    }
    
    if(checkedNumber == 0)
    {
    	alert("请先选择产品！");
    	return false;
    }
    
    if(method=="CrtUs")
    {
	    if(selectedProducts.length==0)
	    {
	    	if(checkedNumber>0)
	    	{
	    		alert("请填写产品订购参数！");
	    	}
	    	else
	    	{
	    		alert("请先订购产品！");
	    	}
	    	return false;
	    }
    }
    
    productGoodsInfo.put("PRODUCT_INFO",selectedProducts);
        
    for (var j=0 ; j < compixproduct.length; j++ )
	{
	   	var item = compixproduct.get(j);
	    var tag = "false";
		for(var z=0;z<chks.length;z++)
    	{
    		if(chks[z].checked && chks[z].value == item.get("PRODUCT_ID_B") )
			{
				tag = "true";
			}
    	}

		if(tag == "false")
		{
			alert("办理商品的必选产品["+item.get("PRODUCT_ID_B")+"："+item.get("PRODUCT_NAME")+"]未勾选!");
			return false;
		}
	}
    
    var goodsInfo = getGoodsInfo(X_COMP_DATA,CURRENT_PRODUCT);//商品信息
    goodsInfo.put("MERCH_OPER_CODE",getElementValue('operType'));//商品操作类型
    goodsInfo.put("LOCATION","SEND");
    goodsInfo.put("BIZ_MODE",getElementValue("BIZ_MODE"));
    productGoodsInfo.put("GOODS_INFO",goodsInfo);

    GOODS_INFO.put(CURRENT_PRODUCT,productGoodsInfo);
    X_COMP_DATA.put("GOODS_INFO",GOODS_INFO);
    tradeData.put("X_COMP_DATA",X_COMP_DATA);
    getElement("tradeData").value = tradeData;
    return true;
}

/** chenyi
 * 弹出产品参数页面
 */
function popProductParamPage(e)
{
	//$.beginPageLoading();
	var method = $(e).attr('method');
	
	var productId = $(e).attr('productId');//产品id
	var userid = $(e).attr('userid');//子用户id
	var tradeid = $(e).attr('tradeid');//产品trade_id
	var flowInfo = $(e).attr('flowInfo');//BBOSS_4000
	var myFlag = $(e).attr('myFlag');//0
	var productName = $(e).attr('productName');
	var orderid = $(e).attr('orderid');
	var eparchy_code = $(e).attr('eparchy_code');
	var productOfferId = $(e).attr('productOfferId');
	var productOrderId = $(e).attr('productOrderId');
	var merchSpecCode = $(e).attr('merchSpecCode');
	var productSpecCode = $(e).attr('productSpecCode');

	var pospecnumber = $(e).attr('pospecnumber');
	
	if(method=="CtrOpe" || method=="Ctr")
	{  
		var ibsysid=$("#IBSYSID").val();
		var nodeid=$("#NODE_ID").val();
		var bpmtempleid=$("#BPM_TEMPLET_ID").val();
		var maintempleid=$("#MAIN_TEMPLET_ID").val();
		var workid=$("#WORK_ID").val();
		if(null==ibsysid){
			ibsysid="";
		}
	}
	
	//组件参数 BUSI_TYPE
	var busi_type;
	
	if(method=="CtrOpe")
	{  
		popupPage('csserv.group.param.bboss.bbossManageInfo.BbossManageOper', 'init', '&IS_EXIST=true&PRODUCT_ID='+productId+'&BBOSS_USER_ID='+userid+'&ORDER_ID='+orderid+'&GRP_USER_EPARCHYCODE='+eparchy_code+'&TRADE_ID='+tradeid+'&FLOWINFO='+flowInfo+"&MYFLAG="+myFlag+"&ibsysid="+ibsysid+"&workid="+workid+"&nodeid="+nodeid+"&bpmtempleid="+bpmtempleid+"&maintempleid="+maintempleid,productName+'产品信息','750','650', 'product_pop');
	}
	if(method=="SendData")
	{   //异步提交数据,到后台
  	//	ajaxDirect4CS("group.param.bboss.bbossManageInfo.BbossManageCreate","sendSpellData","&TRADE_ID="+tradeid+'&FLOWINFO='+flowInfo+'&PRODUCT_ID='+productId+'&BBOSS_USER_ID='+userid, null,true,afterSendData);
    }
	if(method=="HasSendOpe")  //调一样的，给用户显示看
	{
		popupPage('csserv.group.param.bboss.bbossManageInfo.BbossManageOper', 'init', '&IS_EXIST=true&PRODUCT_ID='+productId+'&BBOSS_USER_ID='+userid+'&ORDER_ID='+orderid+'&GRP_USER_EPARCHYCODE='+eparchy_code+'&TRADE_ID='+tradeid+'&FLOWINFO='+flowInfo+"&MYFLAG="+myFlag,productName+'产品信息','750','650', 'product_pop');
	}
	if(method=="Ctr") //查看预受理信息已归档的数据
	{
		if(e.ibsysid!=null&&e.ibsysid!="")
		{
			popupPage('csserv.group.param.bboss.bbossManageInfo.BbossManageCreate', 'init', '&refresh=true&IS_EXIST=true&PRODUCT_ID='+productId+'&BBOSS_USER_ID='+userid+'&ORDER_ID='+orderid+'&GRP_USER_EPARCHYCODE='+eparchy_code+'&TRADE_ID='+tradeid+'&FLOWINFO='+flowInfo+"&MYFLAG="+myFlag+"&PRODUCT_OFFER_ID="+productOfferId+"&PRODUCT_ORDER_ID="+productOrderId+"&MERCH_SPEC_CODE="+merchSpecCode+"&PRODUCT_SPEC_CODE="+productSpecCode+"&ibsysid="+ibsysid+"&workid="+workid+"&nodeid="+nodeid+"&bpmtempleid="+bpmtempleid+"&maintempleid="+maintempleid,productName+'产品信息', '750', '650', 'product_pop');
		}else{
			busi_type = 'CrtUs'
		popupPage('csserv.group.param.bboss.bbossManageInfo.BbossManageCreate', 'init', '&IS_EXIST=true&PRODUCT_ID='+pospecnumber+"&PRODUCT_ID2="+productId+"&BUSI_TYPE="+busi_type+'&BBOSS_USER_ID='+userid+'&ORDER_ID='+orderid+'&GRP_USER_EPARCHYCODE='+eparchy_code+'&TRADE_ID='+tradeid+'&FLOWINFO='+flowInfo+"&MYFLAG="+myFlag+"&PRODUCT_OFFER_ID="+productOfferId+"&PRODUCT_ORDER_ID="+productOrderId+"&MERCH_SPEC_CODE="+merchSpecCode+"&PRODUCT_SPEC_CODE="+productSpecCode,productName+'产品信息', '750', '650', 'product_pop');
		
		}
		
	}  
	if(method=="Cancal") //取消受理，删除台帐数据
	{
 	//	ajaxDirect4CS("group.param.bboss.bbossManageInfo.BbossManageCreate","cancalData","&TRADE_ID="+tradeid+'&FLOWINFO='+flowInfo+'&PRODUCT_ID='+productId+'&BBOSS_USER_ID='+userid, null,true,afterSendData);
	} 

}


function afterSendData()
{
	
	var result = this.ajaxDataset.get(0, "RESULT");
	if(result=="1")
	{
	alert("发送成功");
	}
	if(result=="2")
	{
    alert("取消受理成功");
	}

}

/*
 * 验证商品操作类型和产品操作类型是否匹配
 * merchOp商品操作类型
 * productOp产品操作类型
 * productIsExist该产品是否已经订购
 */
function validateProductOpAndMerchOp(merchOp,productOp,productIsExist)
{
	//1-新增商品订购	2-取消商品订购	3-商品暂停	4-商品恢复	5-修改商品资费	6-变更成员（保留）	7-修改订购商品组成关系	8-修改缴费关系(保留)	9-修改订购产品属性
	//说明：其中1、2、3、4不能与其它操作类型组合。
	
	if(merchOp=="")
	{
		alert("商品操作类型不能为空！");
		return false;
	}

	//1-新增产品订购	2-取消产品订购3-产品暂停4-产品恢复5-修改产品资费6-变更成员（保留）8-修改缴费关系（保留）9-修改订购产品属性说明：其中1、2、3、4不能与其它操作类型组合。
	if(productOp=="")
	{
		alert("产品操作类型不能为空！");
		return false;
	}

	if(merchOp=="2")
	{
		if(productOp!="2")
		{
			alert("因为商品操作类型选择了“取消商品订购”，所以产品操作类型只能选“取消产品订购”！");
			getElement("productOperType").value="2";
			getElement("leftgoodstabset").style.display = "none";
			return false;
		}
		getElement("leftgoodstabset").style.display = "none";
	}
	else if(merchOp=="3")
	{
		if(productOp!="3")
		{
			alert("因为商品操作类型选择了“商品暂停”，所以产品操作类型只能选“产品暂停”！");
			getElement("productOperType").value="3";
			getElement("leftgoodstabset").style.display = "none";
			return false;
		}
		
		getElement("leftgoodstabset").style.display = "none";
	}
	else if(merchOp=="4")
	{
		if(productOp!="4")
		{
			alert("因为商品操作类型选择了“商品恢复”，所以产品操作类型只能选“产品恢复”！");
			getElement("productOperType").value="4";
			getElement("leftgoodstabset").style.display = "none";
			return false;
		}
		getElement("leftgoodstabset").style.display = "none";
	}
//	else if(merchOp=="5")
//	{
//		if(productOp!="5")
//		{
//			alert("产品操作类型只能选“修改产品资费”！");
//			return false;
//		}
//		getElement("leftgoodstabset").style.display = "";
//	}
//	if(merchOp=="7")
//	{
//		//只能选1或2
//		if(productIsExist=="true")
//		{
//			if(productOp!="2")
//			{
//				alert("产品操作类型只能选“取消产品订购”！");
//				return false;
//			}
//		}
//		else
//		{
//			if(productOp!="1")
//			{
//				alert("产品操作类型只能选“新增产品订购”！");
//				return false;
//			}
//		}
//	}
//	if(merchOp=="9")
//	{
//		if(productOp!="9")
//		{
//			alert("产品操作类型只能选“修改订购产品属性”！");
//			return false;
//		}
//	}
	else if(merchOp=="10")
	{	
		var productstatus = getElement('productstatus').value;

		if((productIsExist=="true")||(productstatus=="暂停")||(productstatus=="正常"))
		{
			if((productOp!="99")&&(productOp!="2")&&(productOp!="3")&&(productOp!="4")&&(productOp!="5")&&(productOp!="9"))
			{
				alert("已订购了该产品，不能选择“新增产品订购”！");
				getElement("productOperType").value="";
				return false;
			}
			if((productstatus=="暂停")&&(productOp!="4")&&(productOp!="2")&&(productOp!="99"))
			{
				alert("该产品已经暂停，只能选择“产品恢复”、“取消产品订购”或“修改产品”！");
				getElement("productOperType").value="";
				return false;
			}
			if((productstatus=="正常")&&(productOp!="3")&&(productOp!="2")&&(productOp!="99"))
			{
				alert("该产品已经正常使用，只能选择“产品暂停”、“取消产品订购”或“修改产品”！");
				getElement("productOperType").value="";
				return false;
			}
		}
		else
		{
			if(productOp!="1")
			{
				alert("未订购过该产品，所以产品操作类型只能选“新增产品订购”！");
				getElement("productOperType").value="1";
				getElement("leftgoodstabset").style.display = "";
				return false;
			}
		}
		if ((productOp=="2")||(productOp=="3")||(productOp=="4"))
		{
			getElement("leftgoodstabset").style.display = "none";
		}
		else
		{
			getElement("leftgoodstabset").style.display = "";
		}
	}
	return true;
}	

 /**
  * 产品参数变化时，影响依赖他的其他参数
  * @param e
  * @return
  */
function productParamValueOnchange(e)
{
	//从数据库中取出每个控件的PARA_CODE6,和当前控件的PARA_CODE1,和当前控件的值进行比较,如果相等，就必须填
	
	var paraCode6 = e.paraCode + "=" +e.value;
	for(var i=1;i<productParamTable.rows.length;i++)
	{
		var tableRow = productParamTable.rows[i];
		//对PARA_CODE5=1和PARA_CODE6符合条件的表格进行操作
		if(tableRow.cells[2].innerHTML=="1"&&tableRow.cells[3].innerHTML.indexOf(e.paraCode+"=")!=-1)
		{
			var relationParaObj = getElement("input_"+tableRow.cells[1].innerHTML);//关联的输入控件
			if(tableRow.cells[3].innerHTML==paraCode6)
			{
				tableRow.style.display="block";
				relationParaObj.setAttribute('nullable', 'no');
			}
			else
			{
				tableRow.style.display="none";
				relationParaObj.setAttribute('nullable', '');
				tableRow.cells[7].innerHTML="";
			}
		}
	}
}

/**根据XML串创建DOCUMENT对象,支持IE*/
function createDocument(xmlStr){
	var doc = null;
	try{
		doc = new ActiveXObjcet("Microsoft.XMLDOM");	
	}catch(e){
		try{
			doc = new ActiveXObject("Msxml2.DOMDocument");
		}catch(e){}
	}
	try{
	  	doc.loadXML(getElementValue("400_BASEDISCNT"));  //IE
	}catch(e){
		alert("系统当前仅对IE支持,请使用IE再打开本页面!");
	}
	return doc;
}

/**
 * 验证动态表格
 */
function validateProductParamTable()
{
	var num400 = null;
	for(var i=1;i<productParamTable.rows.length;i++)
	{
		var tableRow = productParamTable.rows[i];
		if(tableRow.cells[4].innerHTML=="no")//如果不能为空
		{
			if(!tableRow.cells[7].innerHTML)
			{
				alert(tableRow.cells[6].innerHTML+"不能为空！");
				return false;
			}
		}
		var paramCode = tableRow.cells[1].innerHTML;
		if(!checkSameParamGroup(getElement("input_"+paramCode)))
			return false;
		
		if(paramCode == '4115017001')
			num400 = tableRow.cells[7].innerHTML;		
	}
	//被选中的产品元素
    var selectedElements = new Wade.DatasetList(getElementValue("SELECTED_ELEMENTS"));
    
    //zhangcm 20091112 400业务最低消费控制
    if(num400){
    	var doc = createDocument(getElementValue("400_BASEDISCNT"));
		var rowList = doc.selectNodes("//ROW");
		
		var matched = false; //是否为吉祥号码
		var discntList = new Array();
		
		for(var i=0; i<rowList.length; i++){
			var seq = rowList.item(i).selectSingleNode("SEQ").firstChild.nodeValue,
				ruleName = rowList.item(i).selectSingleNode("RULENAME").firstChild.nodeValue,
				regex = rowList.item(i).selectSingleNode("REGEX").firstChild.nodeValue.trim(),
				discntDesc = rowList.item(i).selectSingleNode("DISCNTDESC").firstChild.nodeValue,
				discntCd = rowList.item(i).selectSingleNode("DISCNTCODE").firstChild.nodeValue;
			discntList[discntList.length] = discntCd;	
			
			if(matched) continue;
			
			var r = new RegExp(regex);
			if(r.test(num400)){
				matched = true;
				var selected = false; //是否选择对应的资费
				for(var i_=0;i_<selectedElements.length;i_++){
					var elementList = selectedElements.get(i_,"ELEMENTS");
					for(var j=0;j<elementList.length;j++){
						var elementData = elementList.get(j);
						var elementTypeCode = elementData.get("ELEMENT_TYPE_CODE");
						var elementId = elementData.get("ELEMENT_ID");
						if(elementTypeCode == 'D' && elementId == discntCd){
							selected = true;
							break;
						}
					}
					if(selected) break;
				}
				if(!selected){
					alert(ruleName + "," + discntDesc + ",请选择对应的优惠编码[" + discntCd + "]!");
					return false;
				}			
			}
		}
		
		if(!matched){
			for(var i=0; i<discntList.length; i++){
				var selected = false; //是否选择对应的资费
				for(var i_=0;i_<selectedElements.length;i_++){
					var elementList = selectedElements.get(i_,"ELEMENTS");
					for(var j=0;j<elementList.length;j++){
						var elementData = elementList.get(j);
						var elementTypeCode = elementData.get("ELEMENT_TYPE_CODE");
						var elementId = elementData.get("ELEMENT_ID");
						if(elementTypeCode == 'D' && elementId == discntList[i]){
							selected = true;
							break;
						}
					}
					if(selected) break;
				}
				if(selected){
					alert("400号码为非吉祥号码,不需要选择保底资费编码[" + discntList[i] + "]!");
					return false;
				}			
			}	
		}
    }
    
    //如果是用户
	var PRODUCT_NUMBER = getElementValue('PRODUCT_NUMBER');
	if(PRODUCT_NUMBER == '22000337')
	{
		var choice = getElementValue('input_4115057026');
		var choicevalue = '';		
		switch (choice)
		{
			case '1':choicevalue = getElement('input_4115057017').value; break;
			case '2':choicevalue = getElement('input_4115057021').value; break;
			case '3':choicevalue = getElement('input_4115057024').value; break;
			case '' :alert('请选择路由方式');
		}	
		var num = choicevalue.split(";");
		var tag_choice = false;
		var tag_param = false; 				
		var elementList = new Wade.DatasetList();
		var elementData = new Wade.DataMap();
		var elementTypeCode;
		var error = '';
		var errornum = 1;
		for(var i=0;i<selectedElements.length;i++){
			elementList = selectedElements.get(i,"ELEMENTS");
			for(var j=0;j<elementList.length;j++){
				elementData = elementList.get(j);
				elementTypeCode = elementData.get("ELEMENT_TYPE_CODE");
				if("D"==elementTypeCode && ('ADD' ==elementData.get('STATE') ||  'EXIST' ==elementData.get('STATE')  ||  'MODI' ==elementData.get('STATE')) ){
					if('40000002' == elementData.get("ELEMENT_ID") )
					{
						if(choice != '3')
						{
							error = error + '\n'+ errornum +':您未选择按呼叫比例分配,请资费取消'+elementData.get("ELEMENT_NAME")+'!';
							errornum ++;
						}
						else
						{
							tag_choice = true;
						}							
					}
									
					if('40000005'== elementData.get("ELEMENT_ID"))
					{
						
						var discnt = elementData.get("DISCNT_PARAM");
						if(discnt == null || discnt.length == 0)
						{
							error = error + '\n'+ errornum +':请填写资费包:'+elementData.get("ELEMENT_NAME")+"的资费参数!";
							errornum ++;
						}
						else if(parseInt(discnt.get(0,"ATTR_VALUE")) != parseInt(num.length))
						{							
							error = error + '\n'+ errornum +':您填写资费包参数['+discnt.get(0,"ATTR_VALUE") +"]跟实际号码个数["+ num.length+"]不一致!";
							errornum ++;
						}
						else 
						{
							tag_param = true;
						}
					}
				}
			}
		}
		if(!tag_choice)
		{
			if(choice == '3')
			{
				error = error + '\n'+ errornum +':您选择按呼叫比例分配,请勾选资费-呼叫分配功能费!';
				errornum ++;
			}
			else
			{
				tag_choice = true;
			}
		}
		if(error != '')
			 alert('操作错误:\n'+error);
		return tag_choice && tag_param;
	}
	return true;
}

/*
 * 弹出参数组的页面
 */
function popParamGroup(e)
{
	popupDialog('group.param.bboss.createuser.ParamGroup', 'init', '&PRODUCT_ID='+e.productId+'&PARA_CODE='+e.paraCode+'&PARA_VALUE='+e.value+'&BBOSS_USER_ID='+e.userId+'&refresh=true','','750','650');
	
}

function init()
{ 
	var tradeData = new Wade.DataMap(parent.getElementValue("tradeData"));//tradeData的数据
    var X_COMP_DATA = tradeData.get("X_COMP_DATA");
    
    var CURRENT_PRODUCT = X_COMP_DATA.get("CURRENT_PRODUCT");//商品ID
    
	var productInfo = new Wade.DataMap();
	var productInfoList = getProductInfo(X_COMP_DATA,CURRENT_PRODUCT);//从tradeData中取
	
	
	var PRODUCTS_ELEMENT = X_COMP_DATA.get("PRODUCT_PARAM");
    if(!PRODUCTS_ELEMENT)
    {
    	PRODUCTS_ELEMENT = new Wade.DataMap();
    }

    //台帐中被选中元素 
    var tradeproductElements  =  PRODUCTS_ELEMENT.get(getElementValue("PRODUCT_NUMBER"));
    
    //页面选中的产品元素
    var productElements = new Wade.DatasetList(getElementValue("SELECTED_ELEMENTS"));
    	
	//如果是用户
	var rownum = goodsParamTableEdit.table.rows;

	if(tradeproductElements != null && tradeproductElements.length > 0)   
	{
		for(var i=1;i<rownum.length;i++)
		{
			for(var x=0; x<tradeproductElements.length; x++)
			{				
				
				var code = goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText;

				var tradetmpData = tradeproductElements.get(x);
				if(tradetmpData.get("PARAM_CODE") == code)
				{
					goodsParamTableEdit.getCell(rownum[i], "PARAM_VALUE").innerText = tradetmpData.get("PARAM_VALUE");
					goodsParamTableEdit.getCell(rownum[i], "CGROUP").innerText = tradetmpData.get("CGROUP");
					getElement("input_"+goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText).value = tradetmpData.get("PARAM_VALUE");
					break;
				}
			}
			
		}
	}	

}

//控制参数框保持在可视区域内
function controlProductTreeChg()
{
	showLayer("paramOpr");
	var paramOpr = System.get("paramOpr");
	paramOpr.position("absolute");
	paramOpr.setTop(window.event.y+50);
}


//控制参数框保持在可视区域内 影藏
function controlProductTreehHide()
{
	var paramOpr = document.getElementById("paramOpr");
	hideLayer('paramOpr');
}

//必选不可以取消
function mustChoiceCannotCancle(tag)
{
	if(tag != '2')
	{
		var force_tag = getElementValue('FORCE_TAG');
		var productOperType = getElementValue('productOperType');
		if(force_tag == '1' && (productOperType =='2'))
		{
			alert('商品下必选产品不能单独取消!');
			return false;
		}
	}
	return true;
}

function validateMerchOp(merchOp,status)
{
	if(merchOp=="10")
	{
		return true;
	}
	if((merchOp=="3")&&(status=="暂停"))
	{
		alert("商品已经是暂停状态了！只能选择“商品恢复”或“修改商品”或“商品取消”！");
		getElement("operType").value="";
		return false;
	}
	if((merchOp=="4")&&(status=="正常"))
	{
		alert("商品已经是正常使用状态了！只能选择“商品暂停”或“修改商品””或“商品取消”！");
		getElement("operType").value="";
		return false;
	}
}

function changeManageValue(tag)
{
	 if(verifyField(tag) && checkStartWith(tag))
	 {
		 var class_type = tag.type;
		 if('text' != class_type)
		 {
		 	tag.parentNode.parentNode.parentNode.parentNode.cells[3].innerText = tag.value;
		 }
		 else 
		 {
		 	tag.parentNode.parentNode.parentNode.cells[3].innerText = tag.value;
		 }
	 }
	 else 
	 {
	 	tag.value = "";
	 }
}


function changeMemberValue(tag)
{
	 if(verifyField(tag))
	 {
		 var class_type = tag.type;
		 if('text' != class_type)
		 {
		 	tag.parentNode.parentNode.parentNode.parentNode.cells[5].innerText = tag.value;
		 }
		 else 
		 {
		 tag.parentNode.parentNode.parentNode.cells[5].innerText = tag.value;
		 }
	 }
	 else 
	 {
	 	tag.value = "";
	 }
}

function validateProductMebOp()
{
	var memberOperType = getElementValue('memberOperType');
	var productstatus = getElementValue('productstatus');
	if(memberOperType =='')
	{
		alert('操作类型不能为空');
		return false;
	}	
	if(memberOperType == '3' && productstatus=='暂停')
	{
		alert('成员加入状态已经为暂停,不能再做暂停');
		return false;
	}
	else if (memberOperType == '4' && productstatus=='正常')
	{
		alert('成员加入状态已经为正常,不能再做恢复');
		return false;
	}
	return true;	
}

//工单开通--详细
function ShowDeatil(PRODUCTORDERNUMBER)
{
 	getElement('PRODUCTORDERNUMBER').value = PRODUCTORDERNUMBER ;
 	ajaxSubmit(this, 'ShowDetail', '','OrderDetailPart');
}

//工单开通--竣工
function OrderComplete()
{

 	var temp = getElements('ORDERROW');
 	
 	var SELECTEDROWS = "";
 	

 	for(var i=0;i<temp.length;i++){
 	 	if(temp[i].checked){
 	 	SELECTEDROWS = SELECTEDROWS+temp[i].value;
 	 	}

 	}
	if(SELECTEDROWS == ""){alert("请选择要处理的工单！~");return;}
 	
 	getElement('SELECTEDROWS').value = SELECTEDROWS;

 	ajaxSubmit(this, 'BbossComplete', '', '');
}


//工单开通--页面控制
function showError(obj)
{
	var temp = getElements('result_tag');
 	if(temp[1].checked){
	 	hidden('RSPDESC', false);
 	}else{
 		hidden('RSPDESC', true);
 	}

}



//工单开通--页面控制
function ShowMembNum(PRODUCTORDERNUMBER)
{
 	getElement('ORDER_NUM').value = PRODUCTORDERNUMBER ;
 	//alert(getElement('ORDER_NUM').value);
 	ajaxSubmit(this, 'queryMemberInfos', '','MemberDetailPart');
}


function checkStartWith (tag)
{
	var datatype = $(tag).attr('datatype');
	var format = $(tag).attr("format");
	var desc =  $(tag).attr("desc");
	var value = tag.value;
	if(datatype != null && datatype != 'date' && format != null && format != '')
	{
		var pos = parseInt(format.indexOf(';'));
		var head = format.substr(0,pos);
		var followlength = format.substr(pos+1,format.length);
		if( (value.length < head.length ) || (value.substr(0,pos) != head)  || value.substr(pos,value.length).length != followlength )
		{
			alert(desc+"跟格式"+head+"开头,后加"+followlength+"位的格式不匹配");
			focus(tag);
			return false;
		}
	}
	return true;
}


function checkSameParamGroup(tag)
{
	var class_type = $(tag).attr('type');
	if('text' == class_type)
	{
		var cgparamCode =  $(tag).attr('cgParam');
		var paramCodeName = $(tag).attr('fieldName');
		if( cgparamCode!= null && cgparamCode != '' &&  paramCodeName != ('input_'+cgparamCode))
		{
			var cgparamObj = $("#input_"+cgparamCode);
			if(cgparamObj != null)
			{
				var  cgparam = $(cgparamObj).val();
				if (cgparam != null && cgparam != '')
				{
					var cglength = cgparam.split(";");
					var thislength = tag.value.split(";");
					if(thislength.length != cglength.length)
					{
						alert("必须跟同目标号码的参数个数相同");
						focus(tag);
						tag.value = "";
						return false;
					}
				}
			}
		 }
	}	
	return true;
}



function validateOpCrtUs(merchOp,productOp,productName)
{
	//1-新增商品订购	2-取消商品订购	3-商品暂停	4-商品恢复	5-修改商品资费	6-变更成员（保留）	7-修改订购商品组成关系	8-修改缴费关系(保留)	9-修改订购产品属性
	//说明：其中1、2、3、4不能与其它操作类型组合。
	
	if(merchOp=="")
	{
		alert("商品操作类型不能为空！");
		return false;
	}

	//1-新增产品订购	2-取消产品订购3-产品暂停4-产品恢复5-修改产品资费6-变更成员（保留）8-修改缴费关系（保留）9-修改订购产品属性说明：其中1、2、3、4不能与其它操作类型组合。
	if(productOp=="")
	{
		alert("产品操作类型不能为空！");
		return false;
	}

	if(merchOp=="2")
	{
		if(productOp!="2")
		{
			alert("因为商品操作类型选择了“取消商品订购”，所以["+productName+"]的产品操作类型只能选“取消产品订购”！");
			return false;
		}
	}
	else if(merchOp=="3")
	{
		if(productOp!="3")
		{
			alert("因为商品操作类型选择了“商品暂停”，所以["+productName+"]的产品操作类型只能选“产品暂停”！");
			return false;
		}
	}
	else if(merchOp=="4")
	{
		if(productOp!="4")
		{
			alert("因为商品操作类型选择了“商品恢复”，所以["+productName+"]的产品操作类型只能选“产品恢复”！");
			return false;
		}
	}
	
	return true;
}

function validateForce(poOperType,productOperType,force_tag,product)
{
	if(poOperType != '2'  && force_tag == '1' && productOperType =='2')
	{
		alert('商品下必选产品['+product+']不能单独取消!');
		return false;
	}
	return true;
}

//发送受理报文或取消受理
function sendCreateOrCancel(oper)
{
	var chks = getElements('sel');
	var trade_id = "";
	var sel_count = 0;//选择的数量
	var user_ids = "";
	var productId = "";
	for(var i=0;i<chks.length;i++)
	{
		if(chks[i].checked)
		{
			sel_count++;
			var oo = new Wade.DataMap(chks[i].value);
			if(trade_id == "")		
			{
				trade_id = oo.get("TRADE_ID");
			}
			
			if(oo.get("TRADE_ID") != trade_id)
			{
				alert("您勾选的专线属于多条台账！请重新选择！");
				return false;
			}
			
			productId = oo.get("MPRODUCT_ID");
			user_ids += oo.get("USER_ID")+",";
		}
	}
	
	if(sel_count == 0)
	{
		alert("请选择一条专线！");
		return false;
	}
	
	user_ids = user_ids.substring(0,user_ids.length-1);
	
	getElement("TRADE_ID").value = trade_id;
	getElement("USER_IDS").value = user_ids;
	getElement("PRODUCT_ID").value = productId;
	return true;
}

function initManageCreate()
{
	var tradeData = new Wade.DataMap(parent.getElementValue("tradeData"));//tradeData的数据
	var esopTag = tradeData.get("ESOP_TAG");
	if(esopTag == "ESOP"){
	    var X_COMP_DATA = tradeData.get("X_COMP_DATA");
	    
	    var CURRENT_PRODUCT = X_COMP_DATA.get("CURRENT_PRODUCT");//商品ID
	    
		var productInfo = new Wade.DataMap();
		var productInfoList = getProductInfo(X_COMP_DATA,CURRENT_PRODUCT);//从tradeData中取
		
		//端对端传过来的产品参数，会拼到TD里去
		var PRODUCTS_PARAM = X_COMP_DATA.get("PRODUCT_PARAM");
	    if(!PRODUCTS_PARAM)
	    {
	    	PRODUCTS_PARAM = new Wade.DataMap();
	    }
	
	    //产品序列
	    var PRODUCT_INDEX = getElementValue("PRODUCT_INDEX");
	        	
	    //TD中当前产品的产品参数 
	    var tdParams  =  PRODUCTS_PARAM.get(getElementValue("PRODUCT_NUMBER")+'_'+PRODUCT_INDEX);
	    
	    
	    //端对端传过来的产品元素
	    var PRODUCTS_ELEMENT = X_COMP_DATA.get("PRODUCTS_ELEMENT");
	    if(!PRODUCTS_ELEMENT) 
	    {
	    	PRODUCTS_ELEMENT = new Wade.DataMap();
	    }
	    
	
	    var productElements = PRODUCTS_ELEMENT.get(getElementValue("PRODUCT_NUMBER")+'_'+PRODUCT_INDEX);
	    //var productElements = new Wade.DatasetList('[{"PRODUCT_ID":"22000511","PRODUCT_MODE":"10","ELEMENTS":[{"CANCEL_TAG":"","INST_ID":"3291011829857864","STATE":"EXIST","NEED_SERV_PARAM":"true","DEFAULT_TAG":"","PRODUCT_ID":"22000511","MAIN_TAG":"0","FORCE_TAG":"","PRODUCT_MODE":"10","END_DATE":"2011-03-31","ELEMENT_NAME":"专线业务免费优惠","GRP_CUSTOMIZE":"false","OLD_START_DATE":"","OLD_END_DATE":"","START_DATE":"2011-01-18","ELEMENT_INDEX":"","ELEMENT_TYPE_CODE":"D","PARAM_VERIFY_SUCC":"","NEED_DISCNT_PARAM":"","PACKAGE_ID":"2200511","ELEMENT_ID":"62300251","ENABLE_TAG":""},{"STATE":"ADD","DEFAULT_TAG":"0","END_DATE":"2050-12-31 00:00:00.0","REMARK":"","START_UNIT":"","ELEMENT_INDEX":"1","START_OFFSET":"","UPDATE_DEPART_ID":"IBOSS","PACKAGE_ID":"2200511","CANCEL_ABSOLUTE_DATE":"","START_ABSOLUTE_DATE":"","CANCEL_TAG":"0","END_ENABLE_TAG":"0","MAIN_TAG":"0","FORCE_TAG":"0","END_OFFSET":"3","UPDATE_TIME":"2009-12-30 10:13:00.0","END_ABSOLUTE_DATE":"2050-12-31 00:00:00.0","START_DATE":"2009-12-30 10:13:00.0","ELEMENT_TYPE_CODE":"D","ITEM_INDEX":"0","ELEMENT_ID":"62300252","ENABLE_TAG":"0","END_UNIT":"3","DISCNT_PARAM":[{"ATTR_VALUE":"11111","ATTR_NAME":"x","ATTR_CODE":"200902191642590011","INST_TYPE":"D"}],"CANCEL_OFFSET":"","UPDATE_STAFF_ID":"GAOK    ","CANCEL_UNIT":"0"}],"PACKAGE_ID":"2200511"},{"PRODUCT_ID":"22000511","PRODUCT_MODE":"10","ELEMENTS":[{"CANCEL_TAG":"","INST_ID":"3291011829857808","STATE":"EXIST","NEED_SERV_PARAM":"true","DEFAULT_TAG":"","PRODUCT_ID":"22000511","MAIN_TAG":"0","FORCE_TAG":"","PRODUCT_MODE":"10","END_DATE":"2050-12-31","ELEMENT_NAME":"BBOSS集团主体服务","GRP_CUSTOMIZE":"false","OLD_START_DATE":"","OLD_END_DATE":"","START_DATE":"2011-01-18","ELEMENT_INDEX":"","ELEMENT_TYPE_CODE":"S","PARAM_VERIFY_SUCC":"","NEED_DISCNT_PARAM":"","PACKAGE_ID":"22003045","ELEMENT_ID":"930","ENABLE_TAG":""}],"PACKAGE_ID":"22003045"}]');
	    
	    //getElement("SELECTED_ELEMENTS").value = productElements;
	    
	    commparaProductElement(new Wade.DatasetList(getElementValue("SELECTED_ELEMENTS")),productElements);
		//如果是用户
		var rownum = goodsParamTableEdit.table.rows;
	
		if(tdParams != null && tdParams.length > 0)   
		{
			for(var i=1;i<rownum.length;i++)
			{
				var code = goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText;
	
				//循环处理DEL的
				for(var x=0; x<tdParams.length; x++)
				{				
					var tradetmpData = tdParams.get(x);
					if(tradetmpData.get("PARAM_CODE") == code && (tradetmpData.get("STATE") == 'DEL'))
					{
						goodsParamTableEdit.getCell(rownum[i], "PARAM_VALUE").innerText = "";
						goodsParamTableEdit.getCell(rownum[i], "CGROUP").innerText = "";
						getElement("input_"+goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText).value = "";
						break;
					}
				}
				
				//循环处理ADD的
				for(var x=0; x<tdParams.length; x++)
				{				
					var tradetmpData = tdParams.get(x);
					if(tradetmpData.get("PARAM_CODE") == code && (tradetmpData.get("STATE") == 'ADD' || tradetmpData.get("STATE") == 'EXIST'))
					{
						goodsParamTableEdit.getCell(rownum[i], "PARAM_VALUE").innerText = tradetmpData.get("PARAM_VALUE");
						goodsParamTableEdit.getCell(rownum[i], "CGROUP").innerText = tradetmpData.get("CGROUP");
						getElement("input_"+goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText).value = tradetmpData.get("PARAM_VALUE");
						break;
					}
				}
			}
		}
		var objList = getChildsByRecursion("dynamic_html","INPUT");
		if(objList)
		{
			for(var i=0;i<objList.length;i++)
			{
				var o = objList[i];
				o.disabled=true;
			}
		}
		objList = getChildsByRecursion("dynamic_html","SELECT");
		if(objList)
		{
			for(var i=0;i<objList.length;i++)
			{
				var o = objList[i];
				o.disabled=true;
			}
		}
		getElement("bquery").disabled=false;
		var goodInfo = X_COMP_DATA.get("GOODS_INFO").get(CURRENT_PRODUCT).get("GOODS_INFO");
		if(goodInfo != null && goodInfo != undefined){
//			var poattachment = goodInfo.get("POATTACHMENT");
//			if(poattachment != ""){
//				getElement("POATTACHMENT").value = poattachment;
//			}
//			else{
//				getElement("POATTACHMENT").disabled = false;
//			}
			var busNeedDegree = goodInfo.get("BUS_NEED_DEGREE");
			if(busNeedDegree != ""){
				getElement("BUS_NEED_DEGREE").value = busNeedDegree;
			}
			else{
				getElement("BUS_NEED_DEGREE").disabled = false;
			}
		}
		
		getElement("ESOP_TAG").value = "ESOP";
	}
}

//比较产品元素,端对端只会传变化的资费过来
function commparaProductElement(selectedElements, tdElements)
{
	//getElement("aaa").value = tdElements;
	for(var i=0;i<selectedElements.length;i++)
	{
		var productId = selectedElements.get(i).get("PRODUCT_ID");
		var packageId = selectedElements.get(i).get("PACKAGE_ID");
		var elements = selectedElements.get(i).get("ELEMENTS");
		
		var isPackageExists = false;
		
		if(tdElements)//如果端对端传了资费
		{
			for(var j=0;j<tdElements.length;j++)//循环端对端传过来的资料
			{
				if(productId == tdElements.get(j).get("PRODUCT_ID"))
				{
					if(packageId == tdElements.get(j).get("PACKAGE_ID"))
					{
						isPackageExists = true;
						var tdeles = tdElements.get(j).get("ELEMENTS");
						if(tdeles)
						{
							for(var k=0;k<elements.length;k++)
							{
								var isElementExists = false;//TD里是否有这个ELEMENT
								var el = elements.get(k);
								for(var m=0;m<tdeles.length;m++)
								{
									var tdele = tdeles.get(m);
									//比较ELEMENT_ID，如果TD里有的，以TD的为准
									if((tdele.get("ELEMENT_ID") == el.get("ELEMENT_ID")))
									{
										if(tdele.get("STATE") == 'ADD' && el.get("STATE") != 'DEL')
										{
											tdele.put("STATE","MODI");
										}
										isElementExists = true;
										continue;
									}
									else if(el.get("STATE") == 'DEL')
									{
										isElementExists = true;
										continue;
									}
									
								}
								if(isElementExists == false)
								{
									tdeles.add(el);
								}
							}
						}
						else
						{
							//如果端对端没有传资费过来，把台账里查出的资费放到TD里
							tdElements.get(j).put("ELEMENTS",elements);
						}
					}
				}
			}
			
			//如果TD里没有这个包，就把包加进去
			if(isPackageExists == false)
			{
				tdElements.add(selectedElements.get(i));
			}
		}
		else
		{
			tdElements = selectedElements;
		}
	}
	getElement("SELECTED_ELEMENTS").value = tdElements;
	//getElement("bbb").value = tdElements;
	//var sss = new Wade.DatasetList('[{"PRODUCT_ID":"22000511","ELEMENTS":[{"STATE":"MODI","DEFAULT_TAG":"0","END_DATE":"2050-12-31 00:00:00.0","REMARK":"","START_UNIT":"","ELEMENT_INDEX":"1","START_OFFSET":"","UPDATE_DEPART_ID":"IBOSS","PACKAGE_ID":"2200511","CANCEL_ABSOLUTE_DATE":"","START_ABSOLUTE_DATE":"","CANCEL_TAG":"0","END_ENABLE_TAG":"0","MAIN_TAG":"0","HAS_DISCNT_PARAM":"true","FORCE_TAG":"0","END_OFFSET":"3","UPDATE_TIME":"2009-12-30 10:13:00.0","END_ABSOLUTE_DATE":"2050-12-31 00:00:00.0","START_DATE":"2011-02-21","ELEMENT_TYPE_CODE":"D","ITEM_INDEX":"0","ELEMENT_ID":"62300252","ENABLE_TAG":"0","END_UNIT":"3","DISCNT_PARAM":[{"ATTR_VALUE":"11111","ATTR_NAME":"x","ATTR_CODE":"200902191642590011","INST_TYPE":"D"}],"CANCEL_OFFSET":"","UPDATE_STAFF_ID":"GAOK    ","CANCEL_UNIT":"0"}],"PACKAGE_ID":"2200511"}]');
	//getElement("SELECTED_ELEMENTS").value = sss;
}

function initManageOper()
{

	alert($("#tradeData",parent).html())
	var tradeData = new Wade.DataMap($("#tradeData").val());//tradeData的数据
    var X_COMP_DATA = tradeData.get("X_COMP_DATA");
    
    var CURRENT_PRODUCT = X_COMP_DATA.get("CURRENT_PRODUCT");//商品ID
    
	var productInfo = new Wade.DataMap();
	var productInfoList = getProductInfo(X_COMP_DATA,CURRENT_PRODUCT);//从tradeData中取
	
	//端对端传过来的产品参数，会拼到TD里去
	var PRODUCTS_PARAM = X_COMP_DATA.get("PRODUCT_PARAM");
    if(!PRODUCTS_PARAM)
    {
    	PRODUCTS_PARAM = new Wade.DataMap();
    }

    //产品序列
    var PRODUCT_INDEX = $("#PRODUCT_INDEX").val();
    //TD中当前产品的产品参数 
    var tdParams  =  PRODUCTS_PARAM.get(getElementValue("PRODUCT_NUMBER")+'_'+PRODUCT_INDEX);
    
    //端对端传过来的产品元素
    var PRODUCTS_ELEMENT = X_COMP_DATA.get("PRODUCTS_ELEMENT");
    if(!PRODUCTS_ELEMENT) 
    {
    	PRODUCTS_ELEMENT = new Wade.DataMap();
    }
    
    var productElements = PRODUCTS_ELEMENT.get(getElementValue("PRODUCT_NUMBER")+'_'+PRODUCT_INDEX);

    commparaProductElement(new Wade.DatasetList(getElementValue("SELECTED_ELEMENTS")),productElements);
    
	//如果是用户
	var rownum = goodsParamTableEdit.table.rows;

	for(var i=1;i<rownum.length;i++)
	{
		var code = goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText;
		var paramObjId = "input_"+code;
		getElement(paramObjId).disabled = true;
		
		if(tdParams != null && tdParams.length > 0)   
		{
			//循环处理DEL的
			for(var x=0; x<tdParams.length; x++)
			{				
				var tradetmpData = tdParams.get(x);
				if(tradetmpData.get("PARAM_CODE") == code && (tradetmpData.get("STATE") == 'DEL'))
				{
					goodsParamTableEdit.getCell(rownum[i], "PARAM_VALUE").innerText = "";
					goodsParamTableEdit.getCell(rownum[i], "CGROUP").innerText = "";
					getElement("input_"+goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText).value = "";
					break;
				}
			}
			
			//循环处理ADD的
			for(var x=0; x<tdParams.length; x++)
			{				
				var tradetmpData = tdParams.get(x);
				if(tradetmpData.get("PARAM_CODE") == code && (tradetmpData.get("STATE") == 'ADD' || tradetmpData.get("STATE") == 'EXIST'))
				{
					goodsParamTableEdit.getCell(rownum[i], "PARAM_VALUE").innerText = tradetmpData.get("PARAM_VALUE");
					goodsParamTableEdit.getCell(rownum[i], "CGROUP").innerText = tradetmpData.get("CGROUP");
					getElement("input_"+goodsParamTableEdit.getCell(rownum[i], "PARAM_CODE").innerText).value = tradetmpData.get("PARAM_VALUE");
					break;
				}
			}
		}
	}
	
	var MANAGE_INFO = tradeData.get("MANAGE_INFO");
	var manageNum = goodsParamTableEdit2.table.rows;
	
	if(MANAGE_INFO)
	{
		var manageInfoList = MANAGE_INFO.get("MANAGE_LIST");
		for(var i=1;i<manageNum.length;i++)
		{
			var manageCode = goodsParamTableEdit2.getCell(manageNum[i], "PARAM_CODE").innerText;
			for(var j=0;j<manageInfoList.length;j++)
			{
				if(manageCode == manageInfoList.get(j,"MANAGE_CODE"))
				{
					var manageValue = manageInfoList.get(j,"MANAGE_VALUE");
					var manageValueObjId = "PARAM_VALUE_"+manageCode;
					var manageObj = getElement(manageValueObjId);
					manageObj.disabled = true;
					if(manageObj)
					{
						manageObj.value=manageValue;
						if("SELECT" == manageObj.tagName)
						{
							var options = manageObj.options;
							if(options)
							{
								for(var k=0;k<options.length;k++)
								{
									if(options[k].text == manageValue)
									{
										options[k].selected = true;
									}
								}
							}
						}
					}
				}
			}
		}
	}
}

function afterMessage()
{
	//MessageBox.success("提示","操作成功！","");
}

function changeValue(tag)
{	
	var class_type = tag.type;
	if('text' != class_type)
	{
		tag.parentNode.parentNode.parentNode.parentNode.parentNode.cells[3].innerText = tag.value;
	}
	else 
	{
		tag.parentNode.parentNode.parentNode.parentNode.cells[3].innerText = tag.value;
	}
}

/**
 *@description 拼装产品属性信息
 *@auhtor weixb3
 *@date 2013-09-14
 */
 function setAllProductParamInfo(manageInfo){
 	//1- 获取所有参数对象
	var attrParams=$('[id =PRODUCT_PARAM_CODE]');
	
	var flag=manageInfo.get("flag");
	//2- 定义新参数集
	var newParamObj=new Wade.DatasetList();
	
	//3- 循环参数对象
	attrParams.each(function(){
		//3-1 获取属性编号
		var paramCode = $.attr(this,"value");
		
		//3-2 循环新参数集，查看当前属性编号是否存在于新参数集中
		var isFind = false;
		for(var i=0;i<newParamObj.length;i++)
		{		
			var tmpData = newParamObj.get(i);
			if(tmpData.get("ATTR_CODE")==paramCode)//有重复的
			{
				isFind =true;
				break;			
			}					
		}
		
		//3-3 如果新参数集中没有，则需要将该属性编号对应的所有属性添加进产品参数集(注意属性组情况)
		if(isFind==false){
			var paramValueId = "input_"+paramCode;
			var groupAttrId = "GROUPATTR_FLAG_"+paramCode;
			var paramValues = $('[id='+paramValueId+']');	
			var attrGroupFlags = $('[id='+groupAttrId+']');
			paramValues.each(function(index,item,totalcount){
				if (!$.attr(paramValues.get(index),"disabled")){
					//新产品参数对象
					var newParamData = new Wade.DataMap();
					newParamData.put("ATTR_CODE",paramCode);
					newParamData.put("ATTR_NAME",$("#PARAM_NAME_"+paramCode).text());
					newParamData.put("ATTR_VALUE",$.attr(paramValues.get(index),"value"));
					newParamData.put("ATTR_GROUP",$.attr(attrGroupFlags.get(index),"value"));
					newParamObj.add(newParamData);
				}
			});			
		}
    });												
	
	
	//4- 获取所有的老参数对象
	var old=$("#OLD_PRODUCT_PARAMS").val().toString();
	var oldDataset = new Wade.DatasetList(old);
	//因为升级后集团受理与变更的参数页面合并了，而OLD_PRODUCT_PARAMS元素仅供变更使用，因此受理时赋空值
	if(null==$("#GRP_USER_ID").val() || ""==$("#GRP_USER_ID").val()){
		oldDataset =new Wade.DatasetList("");
	}
	if(null!=$("#BBOSS_USER_ID").val() || ""!=$("#BBOSS_USER_ID").val()){
		var oldDataset = new Wade.DatasetList(old);
	}
	
	//5- 定义老参数集
	var oldParamObj=new Wade.DatasetList();//老产品参数对象集合
	
	//6- 循环老参数对象，将老参数添加至老参数集	
	for(var i=0;i<oldDataset.length;i++)
	{
		var oldParamData = new Wade.DataMap();
		oldParamData.put("ATTR_CODE",oldDataset.get(i,"ATTR_CODE"));
		oldParamData.put("ATTR_NAME",oldDataset.get(i,"ATTR_NAME"));
		oldParamData.put("ATTR_VALUE",oldDataset.get(i,"ATTR_VALUE"));
		if(oldDataset.get(i,"ATTR_GROUP")!="0")
		{
			oldParamData.put("ATTR_GROUP",oldDataset.get(i,"ATTR_GROUP"));
		}
		oldParamObj.add(oldParamData);
	}
	
	
	
	//7- 比较新老参数集,确定参数状态
	var tmpDs = compareParamDataset(newParamObj,oldParamObj,"ATTR_CODE","ATTR_VALUE"); 
	
	//8- 将产品参数对象保存进商产品信息中(manageInfo)
	var PRODUCT_PARAM = new Wade.DataMap();
   	PRODUCT_PARAM.add($("#PRODUCT_ID").val(),tmpDs);
	if(manageInfo.get("PRODUCT_PARAM")!=null){
		PRODUCT_PARAM =manageInfo.get("PRODUCT_PARAM");
	}
	manageInfo.put("PRODUCT_PARAM",PRODUCT_PARAM);
 }
 
/*
 *@description 设置产品的资费与服务信息
 *@author weixb3
 *@date 2013-10-03
 */
function setAllElementInfo(manageInfo)
{
	//1- 将产品资费与服务的提交信息添加至商产品信息中
	var productElements = selectedElements.getSubmitData();
	var PRODUCTS_ELEMENT =  new Wade.DataMap(); 
	PRODUCTS_ELEMENT.put($("#PRODUCT_ID").val(),productElements);
	manageInfo.put("PRODUCTS_ELEMENT",PRODUCTS_ELEMENT);
}

function showTip(e)
{
	$.showToolTip($(e).attr('ID'),$(e).attr('DESC'),null,true,200);
}
function hideTip(e)
{
	$.hiddenToolTip($(e).attr('id'));
}

//chengjian 创建  此文件专门用于集团BBOSS产品特殊属性提交校验

/*****************************************跨省专线************************************************/

function LineBusiness_submit(e,paramCode,oldValue,newValue){

	if("1112054333"==paramCode)
	{
		var value = $("#input_"+paramCode).val();
		if(value==null||value=="")
		{
			return true;
		}
		var oldValue = $("#OLDVALUE_"+paramCode).val();
		
		var newValue = $("#PARAM_VALUE_"+paramCode).val();
		var oldFileArry =oldValue.split(".");
		//获取原始文件的文件名
		var oldFileName = oldFileArry[0];

		if(oldFileName != newValue && newValue !='')
		{
			var fileAllName =$("#SIMPLEUPLOAD_SPAN_input_"+paramCode).text();
			var fileArry =fileAllName.split(".");
			var fileName = fileArry[fileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}else{
			
			var fileName = oldFileArry[oldFileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}
	}
}



/*****************************************跨省互联网专线************************************************/
function specialInternet_submit(e,paramCode,oldValue,newValue){
	
	if("1112083405"==paramCode)
	{
	 var tradeId = $("#MERCH_TRADE_ID").val();
	 var inputObj = $("#input_"+paramCode);
	 var group_id=inputObj.val();
		verifyResult=verifyInterNetGroupInfo(tradeId,group_id,inputObj,paramCode);
		if(verifyResult==false){
			return false;
		}
	}

	if("1112084333"==paramCode)
	{
		var value = $("#input_"+paramCode).val();
		if(value==null||value=="")
		{
			return true;
		}
		var oldValue = $("#OLDVALUE_"+paramCode).val();
		
		var newValue = $("#PARAM_VALUE_"+paramCode).val();
		var oldFileArry =oldValue.split(".");
		//获取原始文件的文件名
		var oldFileName = oldFileArry[0];

		if(oldFileName != newValue && newValue !='')
		{
			var fileAllName =$("#SIMPLEUPLOAD_SPAN_input_"+paramCode).text();
			var fileArry =fileAllName.split(".");
			var fileName = fileArry[fileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}else{
			
			var fileName = oldFileArry[oldFileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}
	}
}

/******************************************跨省集团wlan************************************************/
function groupWlan_submit(e,paramCode,oldValue,newValue){

	if("301014332"==paramCode)
	{
		var value = $("#input_"+paramCode).val();
		if(value==null||value=="")
		{
			return true;
		}
		var oldValue = $("#OLDVALUE_"+paramCode).val();
		
		var newValue = $("#PARAM_VALUE_"+paramCode).val();
		var oldFileArry =oldValue.split(".");
		//获取原始文件的文件名
		var oldFileName = oldFileArry[0];

		if(oldFileName != newValue && newValue !='')
		{
			var fileAllName =$("#SIMPLEUPLOAD_SPAN_input_"+paramCode).text();
			var fileArry =fileAllName.split(".");
			var fileName = fileArry[fileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}else{
			
			var fileName = oldFileArry[oldFileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}
	}
}

/******************************************呼叫中心直联************************************************/

function callCenterJoint_onValueChange(e,paramCode,oldValue,newValue){
	
	if("1113025021"==paramCode)
	{
		var value = $("#input_"+paramCode).val();
		if(value==null||value=="")
		{
			return true;
		}
		var oldValue = $("#OLDVALUE_"+paramCode).val();
		
		var newValue = $("#PARAM_VALUE_"+paramCode).val();
		var oldFileArry =oldValue.split(".");
		//获取原始文件的文件名
		var oldFileName = oldFileArry[0];

		if(oldFileName != newValue && newValue !='')
		{
			var fileAllName =$("#SIMPLEUPLOAD_SPAN_input_"+paramCode).text();
			var fileArry =fileAllName.split(".");
			var fileName = fileArry[fileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}else{
			
			var fileName = oldFileArry[oldFileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}
	}
}

/******************************************跨国数据专线************************************************/

function gloabSpecialLine_onValueChange(e,paramCode,oldValue,newValue){

	if("1112064333"==paramCode || "1112074333"==paramCode)
	{
		var value = $("#input_"+paramCode).val();
		if(value==null||value=="")
		{
			return true;
		}
		var oldValue = $("#OLDVALUE_"+paramCode).val();
		
		var newValue = $("#PARAM_VALUE_"+paramCode).val();
		var oldFileArry =oldValue.split(".");
		//获取原始文件的文件名
		var oldFileName = oldFileArry[0];

		if(oldFileName != newValue && newValue !='')
		{
			var fileAllName =$("#SIMPLEUPLOAD_SPAN_input_"+paramCode).text();
			var fileArry =fileAllName.split(".");
			var fileName = fileArry[fileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}else{
			
			var fileName = oldFileArry[oldFileArry.length - 1];
			if(!(fileName.toUpperCase()== "JPG".toUpperCase() || fileName.toUpperCase() == "BMP".toUpperCase()
					|| fileName.toUpperCase()== "JPEG".toUpperCase() || fileName.toUpperCase() == "PNG".toUpperCase()
					|| fileName.toUpperCase()== "GIF".toUpperCase() || fileName.toUpperCase() == "PDF".toUpperCase()))
			{
				alert("开通验收附件上传文件类型错误（仅支持类型：JPG、BMP、JPEG、PNG、GIF、PDF）");
				verifyResult = false;
				return false;

			}
		}
	}
}
