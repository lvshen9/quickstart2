function getSelectValue(){                   
	//查询条件校验
	if(!$.validate.verifyAll("QueryCondPart")) {
		return false;
	}
	var eos = new Wade.DataMap($("#EOS").val());
    ajaxSubmit('QueryCondPart,infonav', 'queryFileInfo', '&EOS='+eos, 'QueryListPart,ctrlInfoPart', 
		new function(data){
			$("#ctrlInfoPart").attr("style","display:;");
	});
    return true;
}
   
function deleteFile()
{

	if(!queryBox(this, 'trades'))
	{
		return;
	}

	var eos = new Wade.DataMap($("#EOS").val());

	MessageBox.confirm("提示信息","确定要删除文件吗",function(btn){
		
		if ('ok' == btn){
		
			var check = $("input[name='trades']:checked");
			
			var param = "";
			
			for (var i = 0; i < check.length; i++)
			{
				param+= check[i].value + ',';
			}
		
			ajaxSubmit('QueryCondPart,infonav', 'deleteFile', '&param='+param+'&EOS='+eos, 'QueryListPart');
			
			}
		
	});
}
			
function sendUploadEnd(){
	MessageBox.confirm("提示信息","确定要发起ESOP流程受理吗",function(btn){
		
		if ('ok' == btn){
		
			var eos = new Wade.DataMap($("#EOS").val());
			$.beginPageLoading("正在发起ESOP流程受理流程...");
			ajaxSubmit(this, 'sendEsopMsg', '&EOS='+eos, null, function(data){
			
				var result = data.get("RESULT");
				
				if ("SUCCESS" == result){
					MessageBox.success("提示信息", "ESOP流程受理成功！");
				}
				$.endPageLoading();
			}
			,function(error_code,error_info,derr){
			
				$.endPageLoading();
				
				showDetailErrorInfo(error_code,error_info,derr);
				
			});
			
		}
		
	});
}