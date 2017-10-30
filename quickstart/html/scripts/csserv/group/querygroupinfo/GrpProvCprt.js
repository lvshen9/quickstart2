/* $Id  */

   
   
/**
 * 弹出产品参数页面
 */
function popParamPage(e)
{

    $.beginPageLoading()

	var method = $(e).attr('method')
	var trade_id = $(e).attr('trade_id')
	var memch_order_id = $(e).attr('memch_order_id')
	var ec_serial_number = $(e).attr('ec_serial_number')
	var sync_sequence = $(e).attr('sync_sequence')
	var if_provcprt = $(e).attr('if_provcprt')
	var if_ans = $(e).attr('if_ans')
	var sync_state = $(e).attr('sync_state')
	var eos = $('#EOS').val();
	if(method=="DetailInfo")
	{
		popupPage('csserv.group.querygroupinfo.GroupProvCprtDetailQuery', 'queryProvCprt',
			'&IS_EXIST=true&TRADE_ID='+trade_id+'&MEMCH_ORDER_ID='+memch_order_id+'&MP_GROUP_CUST_CODE='+ec_serial_number+
			'&SYNC_SEQUENCE='+sync_sequence+'&IF_PROVCPRT='+if_provcprt+'&IF_ANS='+if_ans+'&SYNC_STATE='+sync_state+'&EOS='+eos,
			'工单详情','950','800');
	}
	
	//popupPage('group.param.bboss.bbossManageInfo.BbossManageOper', 'init', '&IS_EXIST=true&PRODUCT_ID='+productId+'&BBOSS_USER_ID='+userid+'&TRADE_ID='+tradeid+'&FLOWINFO='+flowInfo+"&MYFLAG="+myFlag,productName+'产品信息','750','650', 'product_pop');
	
	
}

/**
*
增加 产品对应的客户经理

*/

 function addProvCustMags(object)
 {
  var str="button".length+1;
  var tab = document.getElementById(object.id.substring(str)) ;
     //表格行数
  var rows = tab.rows.length ;
  var cells = tab.rows.item(0).cells.length ;//表个单元格
  var ttr=document.createElement("TR");
  
   for(var i=0;i<cells;i++)
   {
   	var cellhtml = tab.rows(0).cells[i].innerHTML;	
    var cell = document.createElement("TD");
    cell.innerHTML=cellhtml;
    ttr.appendChild(cell);    
   } 
  
   //或者添加这一行里面的元素，改变id,和name
   var inputList=ttr.getElementsByTagName("INPUT");
   //替换变量
   for(var i=0;i<inputList.length;i++)
   {
     
   inputList[i].name=inputList[i].name+"_"+(rows-1);

   
   inputList[i].id=inputList[i].id+"_"+(rows-1);
   inputList[i].value="";
   } 
   
   
    var selectList=ttr.getElementsByTagName("SELECT");
   
   for(var i=0;i<selectList.length;i++)
   {      
   selectList[i].name=selectList[i].name+"_"+(rows-1);
   selectList[i].id=selectList[i].id+"_"+(rows-1);
   selectList[i].value="";
   } 
   
   tab.tBodies[0].appendChild(ttr);   
 
 }
 
 
 
 function test(obj)
 {
 
 
  var tableedit = new TableEdit("dataList",false);
 
 	if (!tableedit.checkRow('EC_SERIAL_NUMBER')) alert('3333');
  tableedit.insertRow();
 }
 
 
 
 
 
  
/*
 * 集团BBOSS接口反馈
 * add by weixb3
 */
function makeSureAnsw(obj)
{

	var response_DataList = new Wade.DatasetList();
	var response_DataMap = new Wade.DataMap();

	//产品数据
	var productDataList = new Wade.DatasetList();
	//产品客户经理
	var provCustfkNbDataList = new Wade.DatasetList();
	//产品受理涉及的客户信息
	var custInfokNbDataList = new Wade.DatasetList();
	//反馈产品受理的落实情况
	var dealInfokNbDataList = new Wade.DatasetList();
	//产品信息修正 
	var prodInfoModifyNbDataList = new  Wade.DatasetList();
	
	//取产品
	var pfkProductOrderId = $('[id =PFK_PRODUCT_ORDER_ID]');
	var productCirCuitCode = $('[id =PFK_CIRCUIT_CODE]');
	var productResultCode = $('[id =PFK_RESULT_CODE]');
	var productResultInfo = $('[id =PFK_RESULT_INFO]');
	pfkProductOrderId.each(function(idx,item){
		
		var temp = new Wade.DataMap();
		
	    temp.put("PRODUCT_ID", $(pfkProductOrderId[idx]).val());
	    temp.put("CIRCUIT_CODE", $(productCirCuitCode[idx]).val());
	    temp.put("RESULT", $(productResultCode[idx]).val());
	    temp.put("REASON", $(productResultInfo[idx]).val());
	    
	    productDataList.add(temp);
	});
	
	//取产品对应的客户经理表格多少行
	var pkf_MagName = $('[id =PFK_MagName]');
	var pkf_MagPhone = $('[id =PFK_MagPhone]');
	var pkf_MagType = $('[id =PFK_MagType]');
	pkf_MagType.each(function(idx,item){
		
		var temp = new Wade.DataMap();
		
		temp.put("MAG_NAME", $(pkf_MagName[idx]).val());
	    temp.put("MAG_PHONE", $(pkf_MagPhone[idx]).val());
	    temp.put("MAG_TYPE", $(pkf_MagType[idx]).val());
	    
	    provCustfkNbDataList.add(temp);
	});
	
	//取产品受理涉及的客户信息
	var pfkCustType = $("[id =PFK_CustType]");
	var pfkCustCode = $("[id =PFK_CustCode]");
	var pfkCustName = $("[id =PFK_CustName]");
	pfkCustType.each(function(idx,item){
		
		var temp = new Wade.DataMap();
		
		temp.put("CUST_TYPE",$(pfkCustType[idx]).val());
		temp.put("CUST_CODE",$(pfkCustCode[idx]).val());
		temp.put("CUST_NAME",$(pfkCustName[idx]).val());

		custInfokNbDataList.add(temp);  
	});
	
	//取反馈产品受理的落实情况
	var pfkDealSide = $("[id =PFK_DealSide]");
	var pfkDealDetail = $("[id =PFK_DealDatail]");
	var pfkAttachment = $("[id =PFK_Attachment]");
	pfkDealSide.each(function(idx,item){
		
		var temp = new Wade.DataMap();
		
		temp.put("DEAL_SIDE",$(pfkDealSide[idx]).val());
		temp.put("DEAL_DETAIL",$(pfkDealDetail[idx]).val());
		temp.put("ATTACHMENT",$(pfkAttachment[idx]).val());
		
		dealInfokNbDataList.add(temp); 
	});
	
	//取产品信息修正
	var pfkModiType = $("[id =PFK_ModiType]");
	var pfkModValue = $("[id =PFK_ModiValue]");
	
	pfkModiType.each(function(idx,item){
		
		var temp = new Wade.DataMap();
		
		temp.put("MODI_TYPE",$(pfkModiType[idx]).val());
		temp.put("MODI_VALUE",$(pfkModValue[idx]).val());
		
		prodInfoModifyNbDataList.add(temp);
	});
	
	response_DataMap.put("PRODUCT_PROV_CUST",provCustfkNbDataList);
	response_DataMap.put("CUST_INFO",custInfokNbDataList);
	response_DataMap.put("DEAL_INFO",dealInfokNbDataList);
	response_DataMap.put("PROD_INFO_MODIFY",prodInfoModifyNbDataList);
	response_DataMap.put("PRODUCT_BASE",productDataList);
	var respPersionList = new Wade.DatasetList();
	var respMap = new Wade.DataMap();
	respMap.put("NAME",$("#Name_3").val());
	respMap.put("PHONE",$("#Phone_3").val());
	respMap.put("DEPARTMENT",$("#Department_3").val());
	respPersionList.add(respMap);
	response_DataMap.put("RESP_PERSION",respPersionList);
	response_DataMap.put("MERCH_ORDER_ID",$("#MERCH_ORDER_ID_3").val());
	response_DataMap.put("SYNC_SEQUENCE",$("#SYNC_SEQUENCE").val());
	response_DataMap.put("PFK_CUST_NAME", $("#PFK_CUST_NAME").val());
	response_DataMap.put("MP_EC_CODE",$("#MP_EC_CODE").val());
	response_DataMap.put("PFK_MERCH_SPEC_CODE",$("#PFK_MERCH_SPEC_CODE").val());
	response_DataMap.put("STATE_TYPE",$("#StateType").val());
	response_DataMap.put("TRADE_ID",$("#TRADE_ID").val());
	response_DataMap.put("EOS",$("#EOS").val());
	
	//$("URL_PARM").val(response_DataMap.toString());
	//将确定按钮隐藏掉，不让再点击，可以将按钮灰掉，但是组件，不知道，怎么灰
	//$("#sub_btn").css("display","none");
     
	//组url数据
	ajaxSubmit(this,"sendDataToCboss","&URL_PARM="+response_DataMap, null);
	return true;
}
 
 
  

//显示隐藏的方法
 function showClose(obj)
 {
  var str="href".length+1;
 

  var tab = document.getElementById(obj.id.substring(str)) ;



 if(tab.style.display=="none")
 {
 tab.style.display="";
 }else
tab.style.display="none"; 
 
  }



//判断选择不同的状态，必填节点是否填写
//3 超时电路反馈
//4 超时电路取消申请
//5 配合省分配客户经理信息
function valiteState(tabid)
{

	//获取对应的tab对像
	var productfk=$("#productfk_"+tabid);

	//获取选择的同步状态
	var stateType=$("#StateType").val();
	if(stateType=="4" )//超时电路取消申请
	{
		if(tabid==0)  //说明是第一个单元格
		{
			var circuitCode=$("#PFK_CIRCUIT_CODE").val();  //电路代号
			if(circuitCode=="")
	        {
				alert("电路代号不能为空,请填写!");
				return false;
	        }
			var resultInfo =$("#PFK_RESULT_INFO").val();
			if(resultInfo=="")
			{
				alert("所处状态原因描述不能为空,请填写!");
				return false;
			}       
		}
		else
		{
        	var productCirCuitCode=$("#PFK_CIRCUIT_CODE$"+(tabid-1)).val();//电路代号
			if(productCirCuitCode=="")
        	{
        		alert("第"+tabid+"个产品的电路代号不能为空,请填写!");
          		return false;
       		}
       		var productResultInfo=$("#PFK_RESULT_INFO$"+(tabid-1)).val();
         	if(productResultInfo=="")
       		{
       			alert("第"+tabid+"个产品的所处状态原因描述不能为空,请填写!");
       			return false;
      		}  
		}   
	}
	//if开始
	if(stateType=="5")//配合省分配客户经理信息
	{
	
		if(!eachValidate($("#PFK_MagName"), "产品对应的客户经理姓名不能为空!"))
		{
			return false;
		}
		if(!eachValidate($("#PFK_MagPhone"), "产品对应的客户经理电话不能为空!"))
		{
			return false;
		}
	}
	//if开始  以及业务开通对应的配合省客户信息（节点“18.1.4.9”，选填，分省支付时必须填写此字段）、产品落实情况（节点“18.4.10”）
	if(stateType=="6")  //配合省落实情况反馈
	{
		if(!eachValidate($("#PFK_DealDatail"), "配合省落实情况 当前状态处理情况不能为空!"))
		{
			return false;
		}
	}
   	
   	return true;
}

/**
 *@description 验证信息
 *@auhtor weixb3
 *@date 2013-09-24
 */
function eachValidate(name,str){
	var tag = true;
	$(name).each(function(idx,item){
		if ($(item).attr("value") == ""){
			alert(str);
			tag=false
		}
	});

	return tag;

}

//验证工单的查询条件

function checkGrpProvQuery()
{
 //获取 START_TIME
   var startDate=getElement("cond_START_DATE").value;
   var endDatae=getElement("cond_END_DATE").value;
   if(startDate==""&&endDatae=="")
   {return true;
    }
   if(startDate!=""&&endDatae!="")
   {return true;
   }
   alert("请开始时间和结束时间,需成对选择");

   return false; 
 
}


   
   
   
   