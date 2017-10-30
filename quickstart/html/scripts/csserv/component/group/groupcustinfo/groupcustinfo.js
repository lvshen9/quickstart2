//清空页面显示的集团客户信息内容
function clearGroupCustInfo(){
	
	$('#SPAN_GROUPCUSTINFO_CUST_ID').html('');
	$('#SPAN_GROUPCUSTINFO_GROUP_ID').html('');
	$('#SPAN_GROUPCUSTINFO_GROUP_TYPE_NAME').html('');
	$('#SPAN_GROUPCUSTINFO_CLASS_NAME').html('');
	$('#SPAN_GROUPCUSTINFO_ENTERPRISE_TYPE_NAME').html('');
	$('#SPAN_GROUPCUSTINFO_CALLING_TYPE_NAME').html('');
	$('#SPAN_GROUPCUSTINFO_SUB_CALLING_TYPE_NAME').html('');
	
	$('#A_GROUPCUSTINFO_CUST_NAME').html('');
	
	$('#CUST_ID').val('');
	$('#CUST_NAME').val('');
	$('#GROUP_ID').val('');
}

//生成页面上的集团客户信息内容
function insertGroupCustInfo(data){

	$('#SPAN_GROUPCUSTINFO_CUST_ID').html(data.get('CUST_ID'));
	$('#SPAN_GROUPCUSTINFO_GROUP_ID').html(data.get('GROUP_ID'));
	$('#SPAN_GROUPCUSTINFO_GROUP_TYPE_NAME').html(data.get('GROUP_TYPE_NAME'));
	$('#SPAN_GROUPCUSTINFO_CLASS_NAME').html(data.get('CLASS_NAME'));
	$('#SPAN_GROUPCUSTINFO_ENTERPRISE_TYPE_NAME').html(data.get('ENTERPRISE_TYPE_NAME'));
	$('#SPAN_GROUPCUSTINFO_CALLING_TYPE_NAME').html(data.get('CALLING_TYPE_NAME'));
	$('#SPAN_GROUPCUSTINFO_SUB_CALLING_TYPE_NAME').html(data.get('SUB_CALLING_TYPE_NAME'));
	$('#A_GROUPCUSTINFO_CUST_NAME').html(data.get('CUST_NAME'));
	$('#CUST_ID').val(data.get('CUST_ID'));
	$('#CUST_NAME').val(data.get('CUST_NAME'));
	$('#GROUP_ID').val(data.get('GROUP_ID'));
}
