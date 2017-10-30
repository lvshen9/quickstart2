function getMenberGroupInfo(grpsn,userId){
	if (userId == ""){
		$.showWarnMessage('查询失败！','集团服务号码不能为空');
		return false;
	}else{
		$.beginPageLoading();
		var refreshpart = $('#GRPINFO_REFRESH_PART').val();
		$.ajax.submit('','grpUCAInfo','&cond_GROUP_SERIAL_NUMBER='+grpsn+'&GRP_USER_ID='+userId,refreshpart,
		function(data){
    		  
    		var resultcode = data.get('X_RESULTCODE','0');
    		if(resultcode!='0'){
	    		
	    		$.showWarnMessage(data.get('X_RESULTTITLE',''),data.get('X_RESULTINFO',''));
    		} 
    		var successJsMethod = $('#GRPINFO_SUCCESS_JSMETHOD').val();
			if(successJsMethod != ''){
				eval(successJsMethod);
			}
			$.endPageLoading();
    		 
		},
		function(error_code,error_info,derror){
			var errorJsMethod = $('#GRPINFO_ERROR_JSMETHOD').val();
			if(errorJsMethod != ''){
				eval(errorJsMethod);
			}
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
	}
		
}

function hiddenPopupGrpList(){
	$('#grpUserList').css('display','none');
}

function delPopupGrpList(){
	$('#grpUserList').html('');
		
}


function renderGrpUserList(grpList){
	$('#grpUserList').css('display','');
	$("#popupGrpUserListBody").html('');
	grpList.each(function(item,idx){
		
		$("#popupGrpUserListBody").prepend(makePopupGrpListHTML(item));
			
	});
		
}

function makePopupGrpListHTML(item){
	
	var userId = item.get('USER_ID');
	var sn = item.get('SERIAL_NUMBER');
	var productName = item.get('PRODUCT_NAME');
	var productId = item.get('PRODUCT_ID');
	var productType = item.get('PRODUCT_TYPE');
	var openDate = item.get('OPEN_DATE');
	var onclickstr ="hiddenPopupGrpList();getMenberGroupInfo($(this).attr('sn'),$(this).attr('groupUserId'))";
	var html="";
	html += '<tr>';
	html += '<td >' + userId+ '</td>';
	html += '<td > <a  title=' +sn+ ' sn='+sn+' groupUserId='+userId+ ' productId='+productId+' operType='+productType+' productName='+productName+
										' onclick="'+onclickstr+'" > <span>' + sn+ '</span></a></td>';
	html += '<td >' + productName+ '</td>';
	html += '<td >' + openDate+ '</td>';
	html += '</tr>';
	
	return html;
}