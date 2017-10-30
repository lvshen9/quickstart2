/*!
 * messagebox controler
 * auth: xiedx@asiainfo-linkage.com
 * date: 2013-08-08
 */
(function($,window){
	if($.message == undefined){
		var MSG_TYPE = {
			"001":{
				type:"消息",
				cls:"info",
				action : function(data){
					openNav('查看消息-' + data.TOPIC ,'biz.info.MessageView', 'queryMessage', 'INFO_ID=' + data.INFO_ID);
				}
			},
			"002":{
				type : "公告",
				cls : "notice",
				action : function(data){
					openNav('查看公告-' + data.TOPIC ,'biz.info.BulletinView', 'queryBulletin', 'INFO_ID=' + data.INFO_ID);
				}
			},
			"003":{
				type : "提醒",
				cls : "sys",
				action : function(data){
				}
			},
			"004":{
				type : "导入",
				cls : "import",
				action : function(data){
					
				}
			},
			"005":{
				type : "导出",
				cls : "export",
				action : function(data){
				}
			},
			"006":{
				type : "下载",
				cls : "download",
				action : function(data){
				}
			}
		};
		
		var MSG_IDX = 0;
		var MSG_NUM = 0;
		var MSG_COLLECTION = {};
		
		$.message = {};
		$.extend($.message,{	  		
			box :{
				init : function(){
					$("#msg_frame").attr("src","?service=page/biz.info.MessageHandler");
					$("#msg_list").bind("click",$.message.box.events.onClick);
					//$("#msg_list li").bind("mouseenter",$.message.events.onMouseEnter);
					//$("#msg_list li").bind("mouseleave",$.message.events.onMouseLeave);
					//$.message.box.add({"TYPE":"001","TOPIC":"这是一条消息"});
				},
				showBox:function(){
					$("#msg_box").css("display","");
					$("#msg_mini").css("display","none");
				},
				hideBox:function(){
					$("#msg_box").css("display","none");
					$("#msg_mini").css("display","");
				},
				handle:function(data){
					if(!data || !$.isObject(data) || !data.TYPE) return;
					//051 强制退出
					if("051" == data.TYPE){
						if(parent.$ && parent.$.forceLogout){
							parent.$.forceLogout.doit(data.CONTENT);
						}
					}else{
						this.add(data);
					}
				},
				add:function(data){
					var type = MSG_TYPE[data.TYPE];
					var idx = MSG_IDX ++;
					$("#msg_list").prepend("<li idx=\"" +idx+ "\" class=\"" + type.cls + "\">" +
											"<a href=\"#nogo\" class=\"title\">" +
												"<i></i>" +
												"<span class=\"text\">" + data.TOPIC + "</span>" +
											"</a>" +
											"<a href=\#nogo\" class=\"remove\" style=\"display:none;\"></a>" +
										"</li>");
					MSG_COLLECTION[idx] = data;
					MSG_NUM ++;
					
					$("#msg_mini").text(MSG_NUM);
					this.showBox();
				},
				remove:function(idx){
					$("#msg_list [idx=" + idx + "]").remove();
					delete MSG_COLLECTION[idx];
					MSG_NUM --;
					$("#msg_mini").text(MSG_NUM);
				},
				removeVisited:function(){
					for(var idx in MSG_COLLECTION){
						if(MSG_COLLECTION[idx].visited){
							$.message.box.remove(idx);
						}
					}
				},
				removeAll:function(){
					if(!$.isEmptyObject(MSG_COLLECTION) && window.confirm("确定要清除所有消息吗？")){
						$("#msg_list li").remove();
						for(var idx in MSG_COLLECTION){
							delete MSG_COLLECTION[idx];
						}
						MSG_NUM =0;
						$("#msg_mini").text(MSG_NUM);
						this.hideBox();
					}
				},
				events:{
					onClick:function(e){
						var li=$(e.target).parents("li");
						if(li.length){
							var idx = li.attr("idx");
							var data = MSG_COLLECTION[idx];
							if(!data.visited){
								data.visited = true;
								li.addClass("visited");
							}
							
							if(data.ACTION && $.isString(data.ACTION)){
								(new Function(data.ACTION))();
							}else{
								MSG_TYPE[data.TYPE].action.call(window, data);
							}
						}
					},
					onMouseEnter:function(e){
						$(this).children("a[class=remove]").css("display","");
					},
					onMouseLeave:function(e){
						$(this).children("a[class=remove]").css("display","none");
					}
				}
			}
		});
		
		$($.message.box.init);
	}
})(Wade,window);
