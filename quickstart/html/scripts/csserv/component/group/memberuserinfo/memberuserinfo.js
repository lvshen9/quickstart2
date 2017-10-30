//清空页面显示的成员客户信息内容
function clearMemberUserInfo(){
	
	$('#MEMBERUSERINFO_USER_ID').html('');
	$('#MEMBERUSERINFO_SERIAL_NUMBER').html('');
	$('#MEMBERUSERINFO_EPARCHY_NAME').html('');
	$('#MEMBERUSERINFO_OPEN_DATE').html('');
	$('#MEMBERUSERINFO_BRAND_NAME').html('');
	$('#MEMBERUSERINFO_PRODUCT_NAME').html('');
	
	$('#MEB_USER_ID').val('');
	$('#MEB_SERIAL_NUMBER').val('');
	$('#MEB_EPARCHY_CODE').val('');
	$('#MEB_PRODUCT_ID').val('');
	$('#MEB_BRAND_CODE').val('');
	
}

//生成页面上的成员客户信息内容
function insertMemberUserInfo(data){

	$('#MEMBERUSERINFO_USER_ID').html(data.get('USER_ID'));
	$('#MEMBERUSERINFO_SERIAL_NUMBER').html(data.get('SERIAL_NUMBER'));
	$('#MEMBERUSERINFO_EPARCHY_NAME').html(data.get('EPARCHY_NAME'));
	$('#MEMBERUSERINFO_OPEN_DATE').html(data.get('OPEN_DATE'));
	$('#MEMBERUSERINFO_BRAND_NAME').html(data.get('BRAND_NAME'));
	$('#MEMBERUSERINFO_PRODUCT_NAME').html(data.get('PRODUCT_NAME'));
	
	$('#MEB_USER_ID').val(data.get('USER_ID'));
	$('#MEB_SERIAL_NUMBER').val(data.get('SERIAL_NUMBER'));
	$('#MEB_EPARCHY_CODE').val(data.get('EPARCHY_CODE'));
	$('#MEB_PRODUCT_ID').val(data.get('PRODUCT_ID'));
	$('#MEB_BRAND_CODE').val(data.get('BRAND_CODE'));
}