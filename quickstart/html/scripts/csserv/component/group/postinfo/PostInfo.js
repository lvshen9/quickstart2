function initPostInfo()
{
	changePostTag();
}

function changePostTag(){
	var tag1 = $('#IF_POST_INFO') ;
	if($('#post_POST_TAG').val() == '1')
	{
		tag1.css("display","");
		$("#POST_CONTENT_LABEL").attr("class","e_required");
		$("#POST_TYPESET_LABEL").attr("class","e_required");
		$("#POST_CYC_LABEL").attr("class","e_required");
		$("#POST_NAME_LABEL").attr("class","e_required");
	}
	else
	{
		tag1.css("display","none");
		$("#POST_CONTENT_LABEL").attr("class","");
		$("#POST_TYPESET_LABEL").attr("class","");
		$("#POST_CYC_LABEL").attr("class","");
		$("#POST_NAME_LABEL").attr("class","");
		
		
	}
}

function isPostInfo()
{
	if($('#post_POST_TAG').val() == '1')
	{
		getPostContent();
		if($('#post_POST_CONTENT').val() == '')
		{
			alert('请填写邮寄内容!')
			return false;
		}
		if(!getPostType())
			return false;
		if($('#post_POST_TYPESET').val() == '')
		{
			alert('请填写邮寄方式!')
			return false;
		}
		if($('#post_POST_CYC').val() == '')
		{
			alert('请填写邮寄周期!')
			return false;
		}
		if($('#post_POST_NAME').val() == '')
		{
			alert('请填写邮寄名称!')
			return false;
		}
	}
	return true;
}


function getPostContent()
{
		var POST_CONTENT = $('#post_POST_CONTENT');
		POST_CONTENT.val("");
		if($("#post_POST_CONTENT_0").attr("checked"))
		{
			POST_CONTENT.val(POST_CONTENT.val() + "0");
		}
		if($("#post_POST_CONTENT_1").attr("checked"))
		{
			POST_CONTENT.val(POST_CONTENT.val() + "1");
		}
		if($("#post_POST_CONTENT_2").attr("checked"))
		{
			POST_CONTENT.val(POST_CONTENT.val() + "2");
		}
		if($("#post_POST_CONTENT_3").attr("checked"))
		{
			POST_CONTENT.val(POST_CONTENT.val() + "3");
		}
}

function getPostType()
{
		var POST_TYPESET = $('#post_POST_TYPESET');
		POST_TYPESET.val("");
		if($("#post_POST_TYPESET_0").attr("checked"))
		{
			if($("#post_POST_ADDRESS").val()==''){
				alert('邮寄地址不能为空！');
				return false;
			}
			if($("#post_POST_CODE").val()==''){
				alert('邮寄邮编不能为空！');
				return false;
			}
			
			POST_TYPESET.val(POST_TYPESET.val() + "0");
		}
		if($("#post_POST_TYPESET_1").attr("checked"))
		{
			if($("#post_FAX_NBR").val()==''){
				alert('传真电话不能为空！');
				return false;
			}
			POST_TYPESET.val(POST_TYPESET.val() + "1");
		}
		if($("#post_POST_TYPESET_2").attr("checked"))
		{
			if($("#post_EMAIL").val()==''){
				alert('E-mail地址不能为空！');
				return false;
			}
			POST_TYPESET.val(POST_TYPESET.val() + "2");
		}
		
		return true;
}

function checkNum(obj){
	var num1 = $("#askPrint_RSRV_STR2").val();
	var num2 = $("#askPrint_RSRV_STR5").val();
	
	if(!$.verifylib.checkMbphone(obj.val())){
		alert(obj.attr("title") + "必须为手机号码!");
		obj.focus();
		return false;
	}
	
	if(num1 == num2) {
		alert("两个催缴号码不能相同，请重新输入催缴人手机号！");
		obj.val("");
		obj.focus();
		return false;
	}
	$.beginPageLoading();
	Wade.httphandler.submit('','com.ailk.csview.common.component.group.postinfo.PostInfoHttpHandler','queryMemberInfo','&cond_SERIAL_NUMBER='+obj.val(),		
		function(data){
    		$.endPageLoading();
    		var flag = data.get("flag");
			if(flag == "false"){
				alert("此号码不是正常用户，请重新输入催缴人手机号！");
				obj.val("");
				obj.focus();
			}
    		
		},
		function(error_code,error_info,derror){
		
			$.endPageLoading();
			showDetailErrorInfo(error_code,error_info,derror);
	    });
}


