//清空页面显示的成员客户信息内容
function clearMemberCustInfo(){
	
	$('#MEMBERCUSTINFO_CUST_ID').html('');
	$('#MEMBERCUSTINFO_CUST_NAME').html('');
	$('#MEMBERCUSTINFO_EPARCHY_NAME').html('');
	$('#MEMBERCUSTINFO_PSPT_TYPE_NAME').html('');
	$('#MEMBERCUSTINFO_PSPT_ID').html('');
	
	$('#MEB_CUST_ID').val('');
	$('#MEB_CUST_NAME').val('');
}

//生成页面上的成员客户信息内容
function insertMemberCustInfo(data){

	$('#MEMBERCUSTINFO_CUST_ID').html(data.get('CUST_ID'));
	$('#MEMBERCUSTINFO_CUST_NAME').html(data.get('CUST_NAME'));
	$('#MEMBERCUSTINFO_EPARCHY_NAME').html(data.get('EPARCHY_NAME'));
	$('#MEMBERCUSTINFO_PSPT_TYPE_NAME').html(data.get('PSPT_TYPE_NAME'));
	$('#MEMBERCUSTINFO_PSPT_ID').html(data.get('PSPT_ID'));
	
	$('#MEB_CUST_ID').val(data.get('CUST_ID'));
	$('#MEB_CUST_NAME').val(data.get('CUST_NAME'));
}