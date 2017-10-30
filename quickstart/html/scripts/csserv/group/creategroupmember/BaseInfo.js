

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

//成员号码资料查询成功后调用的方法
function selectMemberInfoAfterAction(data){
  
  if(data == null)
	return;
	
	//异地号码判断
  if(!afterCheckInfo(data)) 
  	return false;
  	
  var memcustInfo = data.get("MEB_CUST_INFO");
  var memuserInfo = data.get("MEB_USER_INFO");
  var memuseracctdayInfo = data.get("MEB_ACCTDAY_INFO");
  
  insertMemberCustInfo(memcustInfo);
  insertMemberUserInfo(memuserInfo);
  insertUserAcctDayInfo(memuseracctdayInfo);
  
  setDiverTip($('#USER_ACCTDAY_DISTRIBUTION').val(),$('#GRP_USERPAY_TAG').val(),$('#PRODUCT_NATURETAG').val(),$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val());

}
//成员资料查询失败后调用的方法
function selectMemberInfoAfterErrorAction() {

	clearMemberCustInfo();
	clearMemberUserInfo();
	clearUserAcctDayInfo();
	initDiverTip();
}

function validate() {
  	var if_centretype = $("#IF_CENTRETYPE").val();  //融合V网标识
	var custid=$("#CUST_ID").val();	   
	if (custid=="") {
	   alert('尚未查询客户资料，请输入集团编码按回车查询!');
	   return false;
	}
	
	var meb_userid=$("#MEB_USER_ID").val(); 
	if (meb_userid == "") {
	   alert('请先输入成员服务号码查询资料后，再进行此操作！');
	   return false;
	}
	
	var productId=$("#PRODUCT_ID").val();
	if (productId=='') {
	   alert('请在集团产品树上选择需要办理的集团产品后，再进行此操作！');
	   return false;
	}
	
	var grpuserid=$("#GRP_USER_ID").val();
	if (grpuserid=='') {
	   alert('请选择需要办理业务的集团用户后，再进行此操作！');
	   return false;
	}
	
	if(!judeAcctDays($('#USER_ACCTDAY_DISTRIBUTION').val(),$('#GRP_USERPAY_TAG').val(),$('#PRODUCT_NATURETAG').val(),$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val())){
		return false;
	}
	
	if("2222" == productId){
		if($("#cond_SERIAL_NUMBER").val() == null || $("#cond_SERIAL_NUMBER").val() == ""){
			alert("请输入成员服务号码!");
			return false;
		}
		$.beginPageLoading("IMS多媒体桌面电话新增-号码验证...");
		var param = "&SERIAL_NUMBER_MEB="+$("#cond_SERIAL_NUMBER").val();
		param +="&EPARCHY_CODE="+$("#MEB_EPARCHY_CODE").val();
		$.ajax.submit(null, 'validateDsekPhone', param, '', 
				function(data){
					$.endPageLoading();
					var resultCode = data.get("RESULT_CODE");
					var resultInfo = data.get("RESULT_INFO");
					if("1" == resultCode){
						alert(resultInfo);
						return false;
					}
					
				    var checkParam = '&IF_CENTRETYPE='+if_centretype+'&CUST_ID='+custid+'&PRODUCT_ID='+productId+'&USER_ID='+grpuserid +'&USER_ID_B='+meb_userid+'&SERIAL_NUMBER='+$("#MEB_SERIAL_NUMBER").val()+'&BRAND_CODE_B='+$("#MEB_BRAND_CODE").val() +'&EPARCHY_CODE_B='+$("#MEB_EPARCHY_CODE").val()  ;
					pageFlowRuleCheck('com.ailk.csview.group.rule.CreateGroupMemberRule','checkBaseInfoRule',checkParam);
					
				}, 
				function(errorcode, errorinfo){
					$.endPageLoading();				
					$.showErrorMessage('IMS多媒体桌面电话新增-号码验证失败',errorinfo);
					return false;
				});		
	}
	else{
		$.beginPageLoading('业务验证中....');
	    var checkParam = '&IF_CENTRETYPE='+if_centretype+'&CUST_ID='+custid+'&PRODUCT_ID='+productId+'&USER_ID='+grpuserid +'&USER_ID_B='+meb_userid+'&SERIAL_NUMBER='+$("#MEB_SERIAL_NUMBER").val()+'&BRAND_CODE_B='+$("#MEB_BRAND_CODE").val() +'&EPARCHY_CODE_B='+$("#MEB_EPARCHY_CODE").val()  ;
		pageFlowRuleCheck('com.ailk.csview.group.rule.CreateGroupMemberRule','checkBaseInfoRule',checkParam);
	}
	return false;
}

function queryProduct(node)
{
	//通过号码查询的节点不需要再重新刷新用户信息
    var nodeid = node.id;
    if(nodeid=='USER_NODE_TREE'){
    	 return true;
    }
	initElement();
	var ifcheck =true;
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

//判断 异地号码的后续处理
function afterCheckInfo(data){
  var result = data.get("OUT_PHONE","false");;
  if(result == "true"){
  	if(!(confirm("请注意：该号码是异地号码，是否继续成员新增?"))){
  	    //选择取消则退出办理
	    $('#cond_SERIAL_NUMBER').val();
	    selectMemberInfoAfterErrorAction();
	    return false;
	}
  }
  return true;
}

function chooseUserProducts(obj){
	var userid=obj.attr('userida');
	var sn=obj.attr('sn');
	var productid = obj.val();
	var imstype = $('#IMSTYPENAME').length;
	if($('#GRP_USER_ID').val() == userid)
		return;
		
	$('#GRP_USER_ID').val('');
	$('#GRP_SN').val('');
	$('#GRP_USERPAY_TAG').val('');
	$.beginPageLoading();
	var refreshPart = "";
	if(imstype>0)
		refreshPart = "ProductCtrlInfoPart";
	$.ajax.submit('', 'refreshGrpAdvPay','&USER_ID='+userid+'&PRODUCT_ID='+productid+'&IMS_TAG='+imstype,refreshPart,
		function(data){
	       	$.endPageLoading();
	       	$('#GRP_USER_ID').val(userid);
			$('#GRP_SN').val(sn);
			$('#PRODUCT_ID').val(productid);
			$('#GRP_USERPAY_TAG').val(data.get("GRP_USERPAY_TAG"));
			setDiverTip($('#USER_ACCTDAY_DISTRIBUTION').val(),$('#GRP_USERPAY_TAG').val(),$('#PRODUCT_NATURETAG').val(),$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val());
	        },
		function(error_code,error_info,derror){
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	 });
	  
//	$('#PRODUCT_NAME').val(productname);
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
			setDiverTip($('#USER_ACCTDAY_DISTRIBUTION').val(),$('#GRP_USERPAY_TAG').val(),$('#PRODUCT_NATURETAG').val(),$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val());
		}else{
			initElement();
			$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));	
		}
			
}

function initElement(){
	$('#GRP_SN').val('');
	$('#GRP_USER_ID').val('');
	$('#PRODUCT_ID').val('');
	$('#GRP_PRODUCT_NAME').val('');
	$('#PRODUCT_CTRL_INFO').val('');
	$('#GRP_USERPAY_TAG').val('');
	
	var obj=$('#CompProductRefreshPart'); 
  	obj.css("display","none");  
  	initDiverTip();
	
}
