//清空页面显示的账期信息内容
function clearUserAcctDayInfo(){
	
	
	$('#USERACCTDAYINFO_ACCT_DAY').html('');
	$('#USERACCTDAYINFO_NEXT_ACCT_DAY').html('');
	$('#USERACCTDAYINFO_FIRST_DAY_NEXTACCT').html('');
	$('#USER_ACCTDAY_DISTRIBUTION').val('');
	$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val('');
	$('#USER_ACCTDAY_ACCT_DAY').val('');
	$('#USER_ACCTDAY_FIRST_DATE').val('');
	$('#USER_ACCTDAY_NEXT_ACCT_DAY').val('');
	$('#USER_ACCTDAY_NEXT_FIRST_DATE').val('');
	
	
	
	
}

//生成页面上的账期信息内容
function insertUserAcctDayInfo(data){

	
	$('#USERACCTDAYINFO_ACCT_DAY').html(data.get('ACCT_DAY',''));
	$('#USERACCTDAYINFO_NEXT_ACCT_DAY').html(data.get('NEXT_ACCT_DAY',''));
	$('#USERACCTDAYINFO_FIRST_DAY_NEXTACCT').html(data.get('FIRST_DAY_NEXTACCT',''));
	$('#USER_ACCTDAY_DISTRIBUTION').val(data.get('USER_ACCTDAY_DISTRIBUTION',''));
	$('#USER_ACCTDAY_FIRST_DAY_NEXTACCT').val(data.get('FIRST_DAY_NEXTACCT',''));
	$('#USER_ACCTDAY_ACCT_DAY').val(data.get('ACCT_DAY',''));
	$('#USER_ACCTDAY_FIRST_DATE').val(data.get('FIRST_DATE',''));
	$('#USER_ACCTDAY_NEXT_ACCT_DAY').val(data.get('NEXT_ACCT_DAY',''));
	$('#USER_ACCTDAY_NEXT_FIRST_DATE').val(data.get('NEXT_FIRST_DATE',''));
	
}