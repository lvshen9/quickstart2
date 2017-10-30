/* $Id  */


//集团资料查询成功后调用的方法
function selectGroupAfterAction(data) {
   //填充集团客户显示信息
   insertGroupCustInfo(data);
   //重置产品显示信息
   restartProductState();
   //加载集团产品树
   loadGroupProductTree(data);

}
//集团资料查询失败后调用的方法
function selectGroupErrorAfterAction() {
	//清空填充的集团客户信息内容
    clearGroupCustInfo();
    //重置产品显示信息
    restartProductState();
    //清空集团产品树信息
    cleanGroupProductTree();

}

function isSelectedProducts() {
	
    var custName=$("#CUST_NAME").val();
    var if_centretype = $("#param_IF_CENTRETYPE").val();  //融合V网标识
	var grpUserEparchyCode=$("#GRP_USER_EPARCHYCODE").val();
    var selectProduct=$("#PRODUCT_ID").val();
	if (selectProduct=='') {
	   alert('请先输入集团客户编码，查询并选择需要办理的集团产品后，再进行此操作！');
	   return false;
	}
	if (custName=="") {
	   alert('请先查询集团客户资料!');
	   return false;
	}
	var eos = new Wade.DataMap($("#EOS").val());
	var ibsysid="";
	if(eos && eos != "" && eos != "[]" && eos != "{}")
	{ 
	    var eosData = eos.get(0); 
		ibsysid = eosData.get("IBSYSID");
	}
	
   var result =  $.validate.verifyAll('baseInfoPart');
   if(!result){
   	   return false;
    }
    $.beginPageLoading('业务验证中....');
	var result = pageFlowRuleCheck('com.ailk.csview.group.rule.CreateGroupUserRule','checkBaseInfoRule','&IF_CENTRETYPE='+if_centretype+'&CUST_ID='+$("#CUST_ID").val()+'&PRODUCT_ID='+selectProduct+'&EPARCHY_CODE='+grpUserEparchyCode+'&IBSYSID='+ibsysid);
	
	return false;
}

function queryProduct(node)
{
    var nodeid = node.id;
    if(nodeid=='USER_NODE_TREE'){
    	 return true;
    }
    restartProductState();
    var ifcheck =true;
   	$.beginPageLoading();
   	
    $.ajax.submit('', 'queryProductInfo', '&PRODUCT_ID='+node.value+'&CUST_ID='+$('#CUST_ID').val(), 'CompProductInfoPart', 
	    function(data)
	    {
	    	$.endPageLoading();
	        var x_resultcode = data.get("x_resultcode","0");
		      if(x_resultcode == '-1'){
		      	  ifcheck= false;
		      	  alert(data.get("x_resultinfo"));
		      		return;
		      }
		      //勾选
		      var obj=$("#CompProductInfoPart");
	    		obj.css("display","");
		 		$('#PRODUCT_ID').val(node.id);
			 },
		function(error_code,error_info,derror)
		{
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    }
	 );
	    
	return ifcheck;
}



//重置产品信息状态
function restartProductState(){
	var obj=$("#CompProductInfoPart");
    obj.css("display","none");
    
    $('#PRODUCT_ID').val('');
 }