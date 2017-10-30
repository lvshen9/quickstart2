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

function initElement(){
	$('#GRP_SN').val('');
	$('#GRP_USER_ID').val('');
	$('#PRODUCT_ID').val('');
	$('#GRP_PRODUCT_NAME').val('');
	$('#PRODUCT_CTRL_INFO').val('');
	var obj=$('#CompProductRefreshPart'); 
  	obj.css("display","none");  	
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
//成员号码资料查询成功后调用的方法
function selectMemberInfoAfterAction(data){
  
  if(data == null)
	return;
	
	//异地号码判断
  if(!afterCheckInfo(data)) 
  	return false;
  
  var memcustInfo = data.get("MEB_CUST_INFO");	
  var memuserInfo = data.get("MEB_USER_INFO");//填充成员用户信息
  var memuseracctdayInfo = data.get("MEB_ACCTDAY_INFO");
  insertMemberCustInfo(memcustInfo);
  insertMemberUserInfo(memuserInfo);
  insertUserAcctDayInfo(memuseracctdayInfo);
  setDiverTip($('#USER_ACCTDAY_DISTRIBUTION').val(),$('#GRP_USERPAY_TAG').val(),$('#PRODUCT_NATURETAG').val(),$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val());
}

//判断 异地号码的后续处理
function afterCheckInfo(data){
  var result = data.get("OUT_PHONE","false");;
  if(result == "true"){
  	if(!(confirm("请注意：该号码是异地号码，是否继续融合计费新增?"))){
  	    //选择取消则退出办理
	    $('#cond_SERIAL_NUMBER').val();
	    clearMemberCustInfo();
		clearMemberUserInfo();
		clearUserAcctDayInfo();
	    return false;
	}
  }
  return true;
}

//成员资料查询失败后调用的方法
function selectMemberInfoAfterErrorAction() {
	clearMemberUserInfo();
	clearUserAcctDayInfo();
}

function queryProduct(node)
{
	initElement();
		   
    //通过号码查询的节点不需要再重新刷新用户信息
    var nodeid = node.id;
    if(nodeid=='USER_NODE_TREE'){
    	 return true;
    }
    var ifcheck =true;//通过ajax同步方式判断是否可以勾选产品（可能会存在卡页面的现象，暂时这么写）
    $.beginPageLoading();
    $.ajax.submit('', 'queryProductInfo', '&PRODUCT_ID='+node.value+'&CUST_ID='+$('#CUST_ID').val(), 'CompProductInfoPart,GroupUserPart,ProductCtrlInfoPart', 
    	function(data){
			$.endPageLoading();
			var x_resultcode = data.get("x_resultcode","0");
			if(x_resultcode != '0'){
				ifcheck= false;
				alert(data.get("x_resultinfo"));
				return;
			}
			$('#PRODUCT_ID').val(node.value);
	 		var obj=$("#CompProductRefreshPart");
	    	obj.css("display",""); 
	    	setDiverTip($('#USER_ACCTDAY_DISTRIBUTION').val(),$('#GRP_USERPAY_TAG').val(),$('#PRODUCT_NATURETAG').val(),$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val()); 
		},
		function(error_code,error_info,derror){
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
	 
	return ifcheck;
}

function validate() {
	var returnFlag = true;
	var brandCodeB = $('#MEB_BRAND_CODE').val();
	var memProductId = $('#MEB_PRODUCT_ID').val();
    var custid=$("#CUST_ID").val();	   
	if (custid=="") {
	   alert('尚未查询客户资料，请输入集团编码按回车查询!');
	   returnFlag = false;
	}
	
	var meb_userid=$("#MEB_USER_ID").val(); 
	if (meb_userid == "") {
	   alert('请先输入成员服务号码查询资料后，再进行此操作！');
	   returnFlag = false;
	}
	
	 var productId=$("#PRODUCT_ID").val();
	if (productId=='') {
	   alert('请在集团产品树上选择需要办理的集团产品后，再进行此操作！');
	   returnFlag = false;
	}
	
	  var grpuserid=$("#GRP_USER_ID").val();
	if (grpuserid=='') {
	   alert('请选择需要办理业务的集团用户后，再进行此操作！');
	   returnFlag = false;
	}
	if(!judeAcctDays($('#USER_ACCTDAY_DISTRIBUTION').val(),$('#GRP_USERPAY_TAG').val(),$('#PRODUCT_NATURETAG').val(),$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val())){
		return false;
	}
 	$.beginPageLoading('业务正在受理中。。。。。。');
	if(returnFlag){    
		if(!unifiedBillRuleCheck()) {
			return false;
		}
	}
	$.endPageLoading();
    return returnFlag;
}

function chooseUserProducts(obj){
	var userid=obj.attr('userida');
	var sn=obj.attr('sn');
	var productid = obj.val();
	var imstype = $('#IMSTYPENAME').length;
	if($('#GRP_USER_ID').val() == userid)
		return;
	if(imstype>0){
		$.beginPageLoading();
		$.ajax.submit(this, 'refreshProductCtrlInfo','&USER_ID='+userid+'&PRODUCT_ID='+productid,'ProductCtrlInfoPart,GroupUserPart',
			function(data){
		       	$.endPageLoading();
		        },
			function(error_code,error_info,derror){
				$.endPageLoading();
				showDetailErrorInfo(error_code,error_info,derror);
		 });
	}   
	$('#GRP_USER_ID').val(userid);
	$('#GRP_SN').val(sn);
	$('#PRODUCT_ID').val(productid);
}

function unifiedBillRuleCheck () {

	var grpUserId = $('#GRP_USER_ID').val();
	var memUserId = $('#MEB_USER_ID').val();
	var memSerialNumber =$('#MEB_SERIAL_NUMBER').val();
	var brandCodeB = $('#MEB_BRAND_CODE').val();
	var memProductId = $('#MEB_PRODUCT_ID').val();
	var memEparchy = $('#MEB_EPARCHY_CODE').val();

	
	var checkParam = '&PRODUCT_ID='+$('#PRODUCT_ID').val()+'&CUST_ID='+$('#CUST_ID').val()+'&USER_ID='+grpUserId+'&USER_ID_B='
					 +memUserId+'&SERIAL_NUMBER='+memSerialNumber+'&BRAND_CODE_B='+brandCodeB+'&PRODUCT_ID_B='+memProductId+'&EPARCHY_CODE_B='+memEparchy;

	return pageFlowRuleCheck('com.ailk.csview.group.rule.CreateGroupUnifiedBillRule','checkBaseInfoRule',checkParam);
}
