function initDiverTip(){
	 
  	$('#diverTip').css('display','none');
  	$('#acctDayBox').css('display','none');
	$('#bookingcheckbox').css('display','none');
	$('#diverTip').html('');	
	$('#bookingDate').val('');
	
}

function setDiverTip(userAcctDayDistribuion,grpPayTag,productNatureTag,fistDayNextAcct){
	
	 initDiverTip();
	 var diverTip = getDiverTip(userAcctDayDistribuion,grpPayTag,productNatureTag,fistDayNextAcct);
	 if(diverTip !=''){
	 	$('#acctDayBox').css('display','');
	 	$('#diverTip').css('display','');
	 	$('#diverTip').html('提示:'+diverTip);
	 }
}
function getDiverTip(userAcctDayDistribuion,grpPayTag,productNatureTag,fistDayNextAcct){
	 
	 //自然月出账的用户不需要做任何改动
	 var diverTip ="";
	 if(userAcctDayDistribuion=='' || userAcctDayDistribuion=='0'){
	 	return '';
	 }
	 if(grpPayTag != '1' &&  productNatureTag != 'true')
	 	return '';
	 	
	 if(productNatureTag=='true'){
	 	diverTip ='此产品不支持分散账期的用户';
	 }
	 
	 if(userAcctDayDistribuion=='1'){
	 	diverTip= diverTip+',成员用户下账期为[1]号账期,可办理预约业务!';
	 	$('#bookingcheckbox').css('display','');
	 	$('#acctDayBox').css('display','');
	 	$('#bookingDate').val(fistDayNextAcct);
	 }else if(userAcctDayDistribuion=='2' || userAcctDayDistribuion=='3' ){
		diverTip= diverTip+',成员用户存在未生效的账期变更业务,需在下次出账后将账期改为1号可办理业务!';
	 }else if(userAcctDayDistribuion=='4'){
	 	diverTip= diverTip+',成员用户为分散用户,必须将账期改为1号才可办理业务!';
	 }
	 
	 return diverTip;
	 
}

function judeAcctDays(userAcctDayDistribuion,grpPayTag,productNatureTag,fistDayNextAcct){
  var divTip = getDiverTip(userAcctDayDistribuion,grpPayTag,productNatureTag,fistDayNextAcct);
  if(divTip=='')
  	return true;
  if(userAcctDayDistribuion=='4'){
  	if(confirm(divTip+'是否确定变更?')){
  		$('#changeAcctDay').click();
  	}
  	return false;
  }else if(userAcctDayDistribuion=='1'){
      var bookingDate = $('#bookingDate').val();
      if(bookingDate==''){
	       alert(divTip);
		   return false;
      }else{
      	   alert("请注意：此业务为预约业务,生效时间是[" + bookingDate + "]!");;
		   return true;
      }
  }else{
  	  alert(divTip);
	  return false;
  }
}