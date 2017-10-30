/* $Id  */

function validate() {
    
	
	var serialNumber=$("#MEB_SERIAL_NUMBER").val();
	if (serialNumber=="") {
	   alert('尚未查询成员资料，请输入成员手机号码按回车查询！');
	   return false;
	}
	
	var grpuseid=$("#GRP_USER_ID").val();
	if (grpuseid=="") {
	   alert('尚未选择需要变更的集团产品！请在成员订购的集团列表中选择需要变更的集团产品！');
	   return false;
	}
	if(!$.validate.verifyAll('baseInfoPart')){
		return false;
	};
	$.beginPageLoading('业务验证中....');
	var checkParam ='&USER_ID='+grpuseid +'&USER_ID_B='+$("#MEB_USER_ID").val()+'&SERIAL_NUMBER='+serialNumber ;
	pageFlowRuleCheck('com.ailk.csview.group.rule.ChangeMemElementRule','checkBaseInfoRule',checkParam);
	
  	return false;    
}


//成员号码订购集团信息查询成功后调用的方法
function selectMemberInfoAfterAction(data){
  
  if(data == null)
	return;
	
	
  	
  var memcustInfo = data.get("MEB_CUST_INFO");
  var memuserInfo = data.get("MEB_USER_INFO");
  var orderInfos = data.get("ORDERED_GROUPINFOS");
  insertMemberCustInfo(memcustInfo);
  insertMemberUserInfo(memuserInfo);
  
  renderGrpList(orderInfos);
  
}

//成员号码订购集团失败后调用的方法
function selectMemberInfoErrAfterAction(){
  
  clearMemberCustInfo();
  clearMemberUserInfo();
  clearGroupUserInfo();
  clearGroupCustInfo();
  
}