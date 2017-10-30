/*!
 * comet connection manager
 * auth: xiedx@asiainfo-linkage.com
 * date: 2013-08-08
 */
(function($,window){
	if($.message == undefined){
		var RESULT_CODE = {
			DATA : 2,
			OK : 1,
			CONTINUE : 0,
			ERROR : -1,
			RETRY : -2,
			STOP  : -3
		};
		
		$.message = {};
		$.extend($.message,{
			connection:{
				addr : null,
				sessionId : null,
				staffId : null,
				eparchyCode : null,
				init : function(){
					setTimeout(function(){
						$.ajax.get(null,'loadMessage',null,null,function(data){
							//alert(">>>message init:" + data);
							$.message.connection.addr = data.get("COMET_SERVER_ADDR");
							$.message.connection.sessionId = data.get("SESSION_ID");
							$.message.connection.staffId = data.get("STAFF_ID");
							$.message.connection.eparchyCode = data.get("STAFF_EPARCHY_CODE");
							
							var msgs = data.get("MSGS");
							if(msgs && msgs.length>0){
								for(var i=msgs.length-1;i>=0;i--){
									parent.$.message.box.add(msgs.get(i).map);
								}
							}
							msgs = null;
							$.message.connection.connect();
						},function(code,info){
							alert("消息连接初始化失败：\r\ncode:" + code +"\r\ninfo:" + info);
						});
					},1000);
				},
				connect : function(){
					if(!$.message.connection.addr || !$.message.connection.sessionId
						|| !$.message.connection.staffId){
						return;
					}
					$.ajaxRequest({
						url: $.message.connection.addr + "message?sessionId=" + $.message.connection.sessionId + "&staffId=" + $.message.connection.staffId + "&eparchyCode=" + $.message.connection.eparchyCode,
						dataType:"jsonp",
						success:function(data){
							var ctx=data[0];
							switch(ctx.X_RESULTCODE){
								case RESULT_CODE.DATA:
									if(data.length>1){
										parent.$.message.box.handle(data[1]);
									}
									$.message.connection.connect();
								break;
								case RESULT_CODE.CONTINUE:
									$.message.connection.connect();
								break;
								case RESULT_CODE.RETRY:
									//alert(ctx.X_RESULTINFO);	
									setTimeout($.message.connection.connect,5 * 1000);
								break;
								case RESULT_CODE.ERROR:
									alert(ctx.X_RESULTINFO);
								break;
								case RESULT_CODE.STOP:
								break;
							}
						}
					});			
				}
			}
		});	  		
		
		$($.message.connection.init);
	}
})(Wade,window);
