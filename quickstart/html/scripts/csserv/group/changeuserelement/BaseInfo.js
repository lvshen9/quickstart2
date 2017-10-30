/* $Id  */

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

function isSelectedProducts() {
	
	 var custName=$('#CUST_NAME').val();	   
	 if (custName=="") {
	   alert('请先查询集团客户资料!');
	   return false;
	 }
	 var selectProduct=$('#PRODUCT_ID').val();
	 if (selectProduct=='') {
	   alert('请先选择需要办理的集团产品！');
	   return false;
	 }
   	var userId=$('#GRP_USER_ID').val();
	 if (userId=='') {
	   alert('请选择需要办理业务的用户！');
	   return false;
	 }
	
	if(!$.validate.verifyAll('baseInfoPart')) return false;
	
	$.beginPageLoading('业务验证中....');
	var checkParam = '&CUST_ID='+$('#CUST_ID').val() +'&USER_ID='+userId +'&PRODUCT_ID='+selectProduct +'&EPARCHY_CODE='+$('#GRP_USER_EPARCHYCODE').val();
	pageFlowRuleCheck('com.ailk.csview.group.rule.ChangeUserElementRule','checkBaseInfoRule',checkParam);
	
	return false;
     
}

function queryProduct(node)
{
	//通过号码查询的节点不需要再重新刷新用户信息
    var nodeid = node.id;
    if(nodeid=='USER_NODE_TREE'){
    	 return true;
    }
	var obj=$('#CompProductRefreshPart').css("display",""); 
    $.beginPageLoading(); 
    var ifcheck =true;
    $.ajax.submit(this, 'queryProductInfo','&PRODUCT_ID='+node.value+'&CUST_ID='+$('#CUST_ID').val(),'CompProductInfoPart,GroupUserPart,ProductCtrlInfoPart',
		function(data){
			var x_resultcode = data.get("x_resultcode","0");
		    if(x_resultcode == '-1'){
	      	  	var obj=$('#CompProductRefreshPart').css("display","none");
		        $('#PRODUCT_ID').val('');
				$.endPageLoading();
				showErrorInfo(error_code,error_info);
				return;
		    }
		    $.endPageLoading();
	        
		 },
		function(error_code,error_info,derror){
			ifcheck= false;
			var obj=$('#CompProductRefreshPart').css("display","none");
	        $('#PRODUCT_ID').val('');
	        $.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
	
   return ifcheck;
}

function chooseUserProducts(obj){

	var useid = obj.attr('userida');
	var sn = obj.attr('sn');
	var productid  =obj.val();
	var eparchycode = obj.attr('eparchycode');
	var imstype = $('#IMSTYPENAME').length;
	if($('#GRP_USER_ID').val() == useid)
		return;
	
	if(imstype>0){
		$.beginPageLoading();
		$.ajax.submit(this, 'refreshProductCtrlInfo','&USER_ID='+useid+'&PRODUCT_ID='+productid,'ProductCtrlInfoPart',
			function(data){
				$('#GRP_USER_ID').val(useid); 
				$('#GRP_SN').val(sn); 
				$('#PRODUCT_ID').val(productid);
				$('#GRP_USER_EPARCHYCODE').val(eparchycode);
	        	$.endPageLoading();
	         },
			function(error_code,error_info,derror){
				$.endPageLoading();
				$('#GRP_USER_ID').val(); 
				$('#GRP_SN').val(); 
				showDetailErrorInfo(error_code,error_info,derror);
		 });
	}else{   
	
		$('#GRP_USER_ID').val(useid); 
		$('#GRP_SN').val(sn); 
		$('#PRODUCT_ID').val(productid);
		$('#GRP_USER_EPARCHYCODE').val(eparchycode);
	}
	
	
}


function afterGetGrpBySn(data)
{	  
	mytree.empty(true);
	var resultcode = data.get('X_RESULTCODE','0');
	
	if(resultcode=='0'){
		//初始树
		initTreeByProductInfo($('#GRP_PRODUCT_NAME').val(),$('#PRODUCT_ID').val());
		
		var comp=$('#CompProductRefreshPart');
		comp.css("display","");
		
	}else{
		var comp=$('#CompProductRefreshPart');
		comp.css("display","none");
		$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));	
	}
			
}

function initElement(){
	$('#GRP_SN').val('');
	$('#GRP_USER_ID').val('');
	$('#PRODUCT_ID').val('');
	$('#GRP_PRODUCT_NAME').val('');
	$('#PRODUCT_CTRL_INFO').val('');
	
	var obj=$('#CompProductRefreshPart'); 
  	obj.css("display","none");  	
	
}