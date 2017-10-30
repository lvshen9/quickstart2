/* $Id */

function getMenberGroupInfo(obj){
	/*
	parent.getElement("cond_GROUP_ID").value = obj.getAttribute('groupId');
	parent.getElement("cond_GROUP_USER_ID").value = obj.getAttribute('groupId');	
	parent.getElement("cond_GROUP_PRODUCT").value = "";	
	parent.getElement("cond_PRODUCT_NAME").value = "";	
	parent.getElement("SELECT_OPER_TYPE").value =  "";	
	parent.getElement("button").click();
	cancel(true);
	*/
	
	$("#cond_GROUP_ID",window.parent.document).val(obj.getAttribute('groupId'));
	$("#cond_GROUP_USER_ID",window.parent.document).val(obj.getAttribute('groupId'));	
	$("#cond_GROUP_PRODUCT",window.parent.document).val("") ;	
	$("#cond_PRODUCT_NAME",window.parent.document).val("");	
	$("#SELECT_OPER_TYPE",window.parent.document).val("");
	$("#button",window.parent.document).trigger("click");
	closePopupPage(true);
}

function getMenberGroupInfoByUserId(obj){
	parent.getElement("cond_GROUP_ID").value = obj.getAttribute('groupId');
	parent.getElement("cond_GROUP_USER_ID").value = obj.getAttribute('groupId')+'_'+obj.getAttribute('groupUserId');
	parent.getElement("cond_GROUP_PRODUCT").value = obj.getAttribute('productId');
	parent.getElement("cond_PRODUCT_NAME").value = obj.getAttribute('productName');	
	parent.getElement("SELECT_OPER_TYPE").value =  obj.getAttribute('operType');
			
	parent.getElement("button").click();
	cancel(true);	
}