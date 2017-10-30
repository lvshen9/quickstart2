(function($){
	if($.info == undefined){
		$.info={
			queryBulletins:function(){
				$.beginPageLoading("正在查询公告");
				$.ajax.submit('QueryCond','queryBulletins','','QueryPart',function(){
					$.endPageLoading();
				},
				function(code,msg){
					$.showErrorMessage("查询公告错误","错误编码：" + code + "<br/>" + msg);
					$.endPageLoading();
				});
			},
			updateBulletin:function(){
				if($.validate.verifyAll("editPart")){
					var edt = CKEDITOR.instances["INFO_CONTENT"];
					if(!edt.getData()){
						alert("公告内容不能为空！");
						edt.focus();
						return false;
					}
					$.beginPageLoading("正在发布公告");
					$.ajax.submit("editPart","updateBulletin","",null,function(){
						$.endPageLoading();
						MessageBox.success("公告发布成功","公告发布成功！",function(btn){
							closeNav();
						});
						
					},function(code,info){
						$.endPageLoading();
						MessageBox.error("公告发布出错",info);
					});
				}
			},
			deleteBulletins:function(){
				var info_ids=getCheckedValues("info_id");
				if(!info_ids){
					alert("没有选择任何公告");
					return;
				}
				var status=$("#cond_INFO_STATUS").val();
				
				if(window.confirm("确定要" + ("1"==status?"彻底":"") + "删除选中的公告吗？")){
					$.beginPageLoading("正在删除公告");
					$.ajax.get(null,"deleteBulletins","INFO_IDS=" + info_ids + "&DELETE_DATA=" + ("1"==status),null,function(data){
						$.endPageLoading();
						$("#btn_query").trigger("click");
					},
					function(code,info){
						$.endPageLoading();
						MessageBox.error("公告删除出错",info);
					});
				}
			},
			queryMessages:function(){
				$.beginPageLoading("正在查询消息");
				$.ajax.submit('QueryCond','queryMessages','','QueryPart',function(){
					$.endPageLoading();
				},
				function(code,msg){
					$.showErrorMessage("查询消息错误","错误编码：" + code + "<br/>" + msg);
					$.endPageLoading();
				});
			},
			updateMessage:function(){
				if($.validate.verifyAll("editPart")){
					var edt = CKEDITOR.instances["INFO_CONTENT"];
					if(!edt.getData()){
						alert("消息内容不能为空！");
						edt.focus();
						return false;
					}
					$.beginPageLoading("正发送消息");
					$.ajax.submit("editPart","updateMessage","",null,function(){
						$.endPageLoading();
						MessageBox.success("消息发送成功","消息发送成功！",function(btn){
							closeNav();
						});
						
					},function(code,info){
						$.endPageLoading();
						MessageBox.error("消息发送出错",info);
					});
				}
			},
			deleteMessages:function(){
				var info_ids=getCheckedValues("info_id");
				if(!info_ids){
					alert("没有选择任何消息");
					return;
				}
				if(window.confirm("确定要删除选中的消息吗？")){
					$.beginPageLoading("正在删除消息");
					$.ajax.get(null,"deleteMessages","INFO_IDS=" + info_ids,null,function(data){
						$.endPageLoading();
						$("#btn_query").trigger("click");
					},
					function(code,info){
						$.endPageLoading();
						MessageBox.error("消息删除出错",info);
					});
				}
			}
		};
	}
})(Wade);