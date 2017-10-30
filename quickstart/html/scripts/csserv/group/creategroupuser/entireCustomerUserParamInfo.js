/**
 * modify by weixb3 2013-4-25
 */
 function validateParamPage(methodName, isPre) {
  
	if(methodName=='CrtUs'||methodName=='ChgUs'||methodName=='DstUs'){
		if($("#dataList3")){
			var dataset = $.table.get("dataList3").getTableData();
			var tag1 = 0;
			var tag2 = 0
			for(var i=0;i<dataset.length;i++){
				var data = dataset.get(i);
				
				if(data.get("CONTACTOR_TYPE_CODE")==2){
					tag1 = 1;
				}
				if(data.get("CONTACTOR_TYPE_CODE")==5){
					tag2 = 1;
				}
			}
			if(dataset.length==0){
				//联系人信息表格需要新增记录
				alert("\u8054\u7cfb\u4eba\u4fe1\u606f\u8868\u683c\u9700\u8981\u65b0\u589e\u8bb0\u5f55");
				return false;
			}else if(tag1 == 0){
				//联系人信息表格，客户经理信息需要新增记录
				alert("\u8054\u7cfb\u4eba\u4fe1\u606f\u8868\u683c\uff0c\u5ba2\u6237\u7ecf\u7406\u4fe1\u606f\u9700\u8981\u65b0\u589e\u8bb0\u5f55");
				return false;
			}else if(tag2 == 0){
				//联系人信息表格，订单提交人员信息需要新增记录
				alert("\u8054\u7cfb\u4eba\u4fe1\u606f\u8868\u683c\uff0c\u8ba2\u5355\u63d0\u4ea4\u4eba\u5458\u4fe1\u606f\u9700\u8981\u65b0\u589e\u8bb0\u5f55");
				return false;
			}
			else{
				$("#CONTACTOR_INFOS").val($.table.get("dataList3").getTableData("X_TAG,CONTACTOR_TYPE_CODE,CONTACTOR_NAME,CONTACTOR_PHONE,STAFF_NUMBER"));
			}
		}
	}
	if(methodName=='CrtUs' && isPre == 'false')
	{
		if($("#dataList"))
		{
			if($.table.get("dataList").getTableData("ATT_TYPE_CODE")==null||$.table.get("dataList").getTableData("ATT_TYPE_CODE")=="[]")
			{
				//合同信息表格需要新增记录
				alert("\u5408\u540c\u4fe1\u606f\u8868\u683c\u9700\u8981\u65b0\u589e\u8bb0\u5f55");
				return false;
			}
			else
			{
				$("#ATT_INFOS").val($.table.get("dataList").getTableData("X_TAG,ATT_TYPE_CODE,ATT_CODE,CONT_NAME,ATT_NAME_filename"));
			}
		}
		
		$("#AUDITOR_INFOS").val($.table.get("dataList2").getTableData("X_TAG,AUDITOR,AUDITOR_TIME,AUDITOR_DESC"));
	}
	if(methodName=='ChgUs' || methodName=='BbossManageCrtUs'||methodName=='DstUs' )
	{
		if($("#ATT_INFO_TAG").val()=="true"){
			$("#ATT_INFOS").val($.table.get("dataList").getTableData());
		}
		if($("#AUDITOR_INFO_TAG").val()=="true"){
			$("#AUDITOR_INFOS").val($.table.get("dataList2").getTableData());
			
		}
		if($("#CONTACTOR_INFO_TAG").val()=="true"){
			$("#CONTACTOR_INFOS").val($.table.get("dataList3").getTableData());
		}
	}
	
	//特殊参数非空校验
	var result = $.validate.verifyAll('paraminfotabset');
	if(result){
		   //保存  联系人信息  审批信息 合同附件 商品信息 到商产品信息中
	saveMerchInfo();
	//拼装产品特殊参数
	saveMerchpParamInfo(methodName);
	return true;
	
	}else{
		return false;
   	}
	
}

/* 
  add by chenyi
  拼装产品特殊参数
 */
function saveMerchpParamInfo(methodName){

	if(methodName=='ChgUs'||methodName=='DstUs'){
			 
	 	var dataset = $.table.get("dataList4").getTableData(null,true);
	 	
	 	var BBossParamInfo=new Wade.DataMap();
	    var params=new Wade.DatasetList();
	 	for(var i=0; i<dataset.length; i++){
	 	     var data=dataset.get(i);
	 		 var productId=data.get("PRODUCT_ID");
	 		 
	 		 if(!BBossParamInfo.containsKey(productId)){
		 		 var  attrCode=data.get("PARAM_CODE");
		 		 var  attrName=data.get("PARAM_NAME");
		 		 var  attrValue=data.get("PARAM_VALUE");
		 		 if(attrValue == "" ){
		 			continue ;
		 		 }
		 		 var param=new Wade.DataMap();
		 		 param.put("ATTR_CODE",attrCode);
		 		 param.put("ATTR_NAME",attrName);
		 		 param.put("ATTR_VALUE",attrValue);
		 		 param.put("STATE","ADD");
		 		 params.add(param);
		 		 BBossParamInfo.put(productId,params);
		 	}else{
		 		 var  attrCode=data.get("PARAM_CODE");
		 		 var  attrName=data.get("PARAM_NAME");
		 		 var  attrValue=data.get("PARAM_VALUE");
		 		 if(attrValue == "" ){
		 			continue;
		 		 }
		 		 var param=new Wade.DataMap();
		 		 param.put("ATTR_CODE",attrCode);
		 		 param.put("ATTR_NAME",attrName);
		 		 param.put("ATTR_VALUE",attrValue);
		 		 param.put("STATE","ADD");
		 		 params.add(param);
		 		
		 		}
		 	}
	 	 
	 	$("#BBossParamInfo").val(BBossParamInfo);
	 }
}

/* 
  add by chenyi
  保存  联系人信息  审批信息 合同附件 商品信息 到商产品信息中
 */

function saveMerchInfo(){
	//BBOSS商产品对象
	var productGoodInfos = new Wade.DataMap($("#productGoodInfos").val());
	//附件信息
	var attEdit=new Wade.DatasetList($("#ATT_INFOS").val());
	for(var i=0;i<attEdit.length;i++){
	      attEdit.get(i).put("ATT_NAME",attEdit.get(i).get("ATT_NAME_filename"));
	}
	
	//审批信息
	var auditorEdit=new Wade.DatasetList($("#AUDITOR_INFOS").val());
	//联系人信息
	var contactorEdit=new Wade.DatasetList($("#CONTACTOR_INFOS").val());
	var goodInfo = productGoodInfos.get("GOOD_INFO");
	
	goodInfo.put("ATT_INFOS",attEdit);
	goodInfo.put("AUDITOR_INFOS",auditorEdit);
	goodInfo.put("CONTACTOR_INFOS",contactorEdit);
	
	productGoodInfos.put("GOOD_INFO",goodInfo);

	$("#productGoodInfos").val(productGoodInfos);
}

/**
 * modify by weixb3 2013-4-25
 */
 
function createAttInfo(obj) {	
	var dataset = $.table.get("dataList").getTableData("ATT_TYPE_CODE")
	for(var i=0;i<dataset.length;i++){
		var data = dataset.get(i);
		if(data.get("ATT_TYPE_CODE")==1 && $("#ATT_TYPE_CODE").val()==1){
			//只能上传一个合同附件
			alert("\u53ea\u80fd\u4e0a\u4f20\u4e00\u4e2a\u5408\u540c\u9644\u4ef6");
			return false;
		}
		if(data.get("ATT_TYPE_CODE")==2 && $("#ATT_TYPE_CODE").val()==2){
			//只能上传一个普通附件
			alert("\u53ea\u80fd\u4e0a\u4f20\u4e00\u4e2a\u666e\u901a\u9644\u4ef6");
			return false;
		}
	}
	var attEdit = $.ajax.buildJsonData("ATT");
	 
	if(attEdit.ATT_TYPE_CODE==null || attEdit.ATT_TYPE_CODE==""){
		//附件类型不能为空
		alert("\u9644\u4ef6\u7c7b\u578b\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}
	if(attEdit.ATT_NAME_filename==null || attEdit.ATT_NAME_filename==""){
		//商品级相关附件名称
		alert("\u5546\u54c1\u7ea7\u76f8\u5173\u9644\u4ef6\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}else{
		attEdit.ATT_NAME_filename=$('#ATT_NAME').val();
	}
	
	//附件类型是合同附件
	if(attEdit.ATT_TYPE_CODE=="1"){
		
		if(attEdit.ATT_TYPE==""){
			attEdit.ATT_TYPE = "合同附件";
		}	
		if(attEdit.ATT_CODE==null || attEdit.ATT_CODE==""){
			//合同编码不能为空
			alert("\u9644\u4ef6\u7c7b\u578b\u4e3a\u5408\u540c\u9644\u4ef6\u65f6\uff0c\u5408\u540c\u7f16\u7801\u4e0d\u80fd\u4e3a\u7a7a");
			return false;
		}
		if(attEdit.CONT_NAME==null || attEdit.CONT_NAME==""){
			//合同名称不能为空
			alert("\u9644\u4ef6\u7c7b\u578b\u4e3a\u5408\u540c\u9644\u4ef6\u65f6\uff0c\u5408\u540c\u540d\u79f0\u4e0d\u80fd\u4e3a\u7a7a");
			return false;
		}
	}
	//请先上传附件到BBOSS
	/* 新增表格行 */	
	
	$.table.get("dataList").addRow(attEdit);
	$("#ATT_INFO_TAG").val(true);
	//resetArea("ATT");
	resetArea("ATT",true); 
	
}
function deleteAttInfo(obj) {
	/* 删除表格行 */
	$.table.get("dataList").deleteRow();
}
function createAuditorInfo(obj) {
	var auditorEdit = $.ajax.buildJsonData("AUDITOR");
	if(auditorEdit.AUDITOR==null || auditorEdit.AUDITOR==""){
		//审批人姓名不能为空
		alert("\u5ba1\u6279\u4eba\u59d3\u540d\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}
	if(auditorEdit.AUDITOR_TIME==null || auditorEdit.AUDITOR_TIME==""){
		//审批时间不能为空
		alert("\u5ba1\u6279\u65f6\u95f4\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}
	if(auditorEdit.AUDITOR_DESC==null ||auditorEdit.AUDITOR_DESC==""){
		//审批意见不能为空
		alert("\u5ba1\u6279\u610f\u89c1\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}
	/* 新增表格行 */
	
	$.table.get("dataList2").addRow(auditorEdit);
	$("#AUDITOR_INFO_TAG").val("true");
	resetArea("AUDITOR",true); //重置 areaId 里的表单数据，clean:true|false
	
	
}
function deleteAuditorInfo(obj) {
	/* 删除表格行 */
	$.table.get("dataList2").deleteRow();
}
function createContactorInfo(obj) {	
	/* 新增表格行 */
	var contactorEdit = $.ajax.buildJsonData("CONTACTOR");
	if(contactorEdit.CONTACTOR_TYPE==null || contactorEdit.CONTACTOR_TYPE==""){
		//联系人类型不能为空
		alert("\u8054\u7cfb\u4eba\u7c7b\u578b\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}
	if(contactorEdit.CONTACTOR_NAME==null || contactorEdit.CONTACTOR_NAME==""){
		//联系人姓名不能为空
		alert("\u8054\u7cfb\u4eba\u59d3\u540d\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}
	if(contactorEdit.CONTACTOR_PHONE==null || contactorEdit.CONTACTOR_PHONE==""){
		//联系人电话不能为空
		alert("\u8054\u7cfb\u4eba\u7535\u8bdd\u4e0d\u80fd\u4e3a\u7a7a");
		return false;
	}
	
	if (contactorEdit.CONTACTOR_TYPE_CODE == "1"){
		contactorEdit["CONTACTOR_NAME"]=contactorEdit["CONTACTOR_NAME_INPUT"];
	}else{
		contactorEdit["CONTACTOR_NAME"]=contactorEdit["POP_CONTACTOR_NAME"];
	}
	
	$.table.get("dataList3").addRow(contactorEdit);
	$("#CONTACTOR_INFO_TAG").val("true");
	resetArea("CONTACTOR",true); //重置 areaId 里的表单数据，clean:true|false
		
}
function deleteContactorInfo(obj) {
	/* 删除表格行 */
	$.table.get("dataList3").deleteRow();
}

/**附件类型下拉菜单修改时更新页面*/
function attTypeChange(obj) {
	var attType = obj.value;
	if (attType==1) {
		$("#contArea").css("display","block");
		
	} else {
		$("#contArea").css("display","none");
		
	}
}

/**联系人类型下拉菜单修改时更新页面*/
function contactorTypeChange(obj) {
	var contactorType = obj.value;
	if (contactorType == 1) {
		$("#staffFieldInputArea")[0].style.display = "block";
		$("#staffFieldArea")[0].style.display = "none";
	} else {
		$("#staffFieldInputArea")[0].style.display = "none";
		$("#staffFieldArea")[0].style.display = "block";
	}
	
	var selectedIndex = $(obj)[0].selectedIndex;
	var contactorTypeName = $(obj)[0].options(selectedIndex).innerText;
	$('#CONTACTOR_TYPE').val(contactorTypeName);
}

/**员工组件选择后查询员工联系电话和总部用户名*/
function queryStaffNumber(obj) {
	if ($("#CONTACTOR_NAME").val() == "") {
		alert("\u8BF7\u6307\u5B9A\u5177\u4F53\u4EBA\u5458\uFF01");
		return;
	}
	var staffId = $("#CONTACTOR_NAME").val();
	$("#CONTACTOR_NAME").val($("#CONTACTOR_NAME"));
	ajaxSubmit("staffFieldArea","queryStaffNumber", "STAFF_ID=" + staffId, null,function(data) {
				if ($("#CONTACTOR_TYPE_CODE").val() == 5 && $("#STAFF_NUMBER")) {
					var staffNumber = data.get("STAFF_NUMBER");
					if (staffNumber == "") {
						alert("\u8BE5\u5458\u5DE5\u672A\u540C\u6B65\u603B\u90E8\u7528\u6237\u540D\uFF0C\u8BF7\u91CD\u65B0\u9009\u62E9\uFF01");
						return false;
					}
					$("#STAFF_NUMBER").val(staffNumber);
				}
				var serialNumber = data.get("STAFF_PHONE");
				$("#CONTACTOR_PHONE").val(serialNumber);
			});
}
