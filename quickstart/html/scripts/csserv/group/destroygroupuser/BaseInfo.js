/* $Id */

//集团资料查询成功后调用的方法
function selectGroupAfterAction(data) {
   //填充集团客户显示信息
   insertGroupCustInfo(data);
   //重置产品显示信息
   initElement();
   //加载集团产品树
   loadGroupProductTreeOrdered($('#CUST_ID').val(),$('#GRP_USER_ID').val());

}
//集团资料查询失败后调用的方法
function selectGroupErrorAfterAction() {
	//清空填充的集团客户信息内容
    clearGroupCustInfo();
    //重置产品显示信息
    initElement();
    //清空集团产品树信息
    cleanGroupProductTree();

}


function validate() {
	var grpcustid = $("#CUST_ID").val();
	var custName=$("#CUST_NAME").val();
	var userEparchyCode =$('#GRP_USER_EPARCHYCODE').val();
	
	if (custName=="") {
	   alert('请先查询集团客户资料!');
	   return false;
	}
    var selectProduct=$("#PRODUCT_ID").val();
	if (selectProduct=='') {
	   alert('请先选择需要办理的集团产品！');
	   return false;
	}
 	var userId=$('#GRP_USER_ID').val();
	if (userId=='') {
	   alert('请选择需要办理业务的用户！');
	   return false;
	 }
	$.beginPageLoading('业务验证中....');
    var checkParam = '&CUST_ID='+grpcustid +'&USER_ID='+userId +'&PRODUCT_ID='+selectProduct  +'&IF_BOOKING='+$("#IF_BOOKING").val()+'&EPARCHY_CODE='+userEparchyCode ;
	pageFlowRuleCheck('com.ailk.csview.group.rule.DestroyGroupUserRule','checkBaseInfoRule',checkParam);
	
	return false;
}

function clickcheck()
{
	    var effectNow=$("#effectNow");
	    if(effectNow.attr("checked") )
	    {
	    	alert("您预约了集团产品月底注销！请注意！");
	    	$("#IF_BOOKING").val('true');
	    }
	    else
	    {
	    	$("#IF_BOOKING").val('false');
	    }
}

function queryProduct(node)
{
   	var nodeid = node.id;
    //通过号码查询的节点不需要再重新刷新用户信息
    if(nodeid=='USER_NODE_TREE'){
    	 return true;
    }
    
    initElement();
    var ifcheck =true;//通过ajax同步方式判断是否可以勾选产品（可能会存在卡页面的现象，暂时这么写）
    $.beginPageLoading();
    $.ajax.submit('', 'queryProductInfo', '&PRODUCT_ID='+node.value+'&CUST_ID='+$('#CUST_ID').val(), 'CompProductInfoPart,GroupUserPart,ProductCtrlInfoPart', 
    function(data){
    	  $.endPageLoading();
          var x_resultcode = data.get("x_resultcode","0");
	      if(x_resultcode == '-1'){
	      	  ifcheck= false;
	      		alert(data.get("x_resultinfo"));
	      		return;
	      }else{
	      
			var obj=$("#CompProductRefreshPart").css("display","");
	      }
	     
		 },
		function(error_code,error_info,derror){
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
	return ifcheck;
}

function chooseUserProducts(obj){

	var userid=obj.attr('userida');
 	var sn=obj.attr('sn');
  	var productid = obj.val();
  	var eparchycode =obj.attr('eparchycode');
 	$('#GRP_USER_ID').val(userid);
	$('#GRP_SN').val(sn);
	$('#PRODUCT_ID').val(productid);
	$('#GRP_USER_EPARCHYCODE').val(eparchycode);
}

function afterGetGrpBySn(data)
{	  
	  mytree.empty(true);
		var resultcode = data.get('X_RESULTCODE','0');
		
		if(resultcode=='0'){
			
			var comp=$('#CompProductRefreshPart');
			comp.css("display","");
			//初始树
			initTreeByProductInfo($('#GRP_PRODUCT_NAME').val(),$('#PRODUCT_ID').val());
		}else{
			var comp=$('#CompProductRefreshPart');
			comp.css("display","none");
			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));	
		}
			
}

function initElement(){
	$('#GRP_SN').val('');
	$('#GRP_USER_ID').val('');
	$('#GRP_USER_EPARCHYCODE').val('');
	$('#PRODUCT_ID').val('');
	$('#GRP_PRODUCT_NAME').val('');
	var obj=$('#CompProductRefreshPart'); 
  	obj.css("display","none");  	
	
}