(function($){
if(!$.navtabset){
	var max_tab_num=11; //最大打开标签页数目，欢迎页占的页不算
	
	var activeNavTabIdx,contextMenuNavTabIdx;
	var special_cls = ['home','home on'];
	var special_idx = [];
	var tab_width;
	
	$(document).ready(function(){
		$.addContextMenu("关闭",function(e){$.navtabset.close(contextMenuNavTabIdx);$.hideContextMenu(e);return false;});
		$.addContextMenu("关闭其他",function(e){$.navtabset.closeOther(contextMenuNavTabIdx);$.hideContextMenu(e);return false;});
		$.addContextMenu("关闭全部",function(e){$.navtabset.closeAll();$.hideContextMenu(e);return false;});
	});
	
	$.navtabset={
		idx:[],
		items:{},
		extend_data:{},
		findItemByIdx:function(idx){
			if(idx && /^\d+$/.test(idx)){
				for(var title in $.navtabset.items){
					if($.navtabset.items[title].idx==idx){
						return $.navtabset.items[title];
					}
				}
			}
		},
		getCurrentItem:function(){
			if(activeNavTabIdx){
				return $.navtabset.findItemByIdx(activeNavTabIdx);
			}
		},
		add:function(title,url,cls, data){
			//判断限制
			if($.navtabset.idx.length >= max_tab_num){
				alert("打开界面数目已经达到上限" + (max_tab_num-1) + "个");
				return;
			}
			if((!title || !$.isString(title))){
				alert("标题不能为空！");
				return;
			}
			if(!$.isString(url)){
				alert("URL必须是String类型！");
				return;
			}
			
			
			//判断是否已经有已存在的界面
			var item=$.navtabset.items[title];
			if(item){
				var e_idx=item.idx;
				var e_url=item.url;
				if(e_idx){
					if($.navtabset.switchTo(e_idx,true)==false){
						return;
					}
					//$.navtabset.frameMgr.switchTo(e_idx);
					if(url!=e_url){
						$.navtabset.reload(e_idx,url);
						item.url=url;
					}
				}
				return;
			}

			var idx = ++$.guid;
			
			$("#tab_ct_tr").append(
			    '<td id="navtab_'+idx+'" idx="'+idx+'" '+ ((cls && $.isString(cls))?'class="'+cls+'"':'') +
			    	' title="' + title + '" >' +
					'<span class="text">'+title+'</span>' +
					'<a id="navtab_close_'+idx+'" href="#nogo" class="close" title="关闭"></a>' +
				'</td>');
			$("#navtab_" + idx).bind("contextmenu",idx,$.navtabset.onContextMenu);
			$("#navtab_" + idx).bind("click",idx,$.navtabset.onSwitchClick);
			$("#navtab_close_" + idx).bind("click",idx,$.navtabset.onCloseClick);
			
			if($.browser.msie && $.browser.version<=6){
				$("#navtab_" + idx).bind("mouseenter",idx,$.navtabset.onMouseEnter_IE6);
				$("#navtab_" + idx).bind("mouseleave",idx,$.navtabset.onMouseLeave_IE6);
			}
			
			$.navtabset.idx.push(idx);
			$.navtabset.items[title]={"idx":idx,"title":title,"url":url};
			if(data){ //扩展数据
				$.navtabset.extend_data[idx] = data;
			}
			
			var canSwitch=$.navtabset.switchTo(idx,false);	
			$.navtabset.frameMgr.add(idx,url,canSwitch);				
			
			if(!cls && !tab_width){
				tab_width = $("#navtab_" + idx).width();
			}
			
			//添加样式
			var table_w = $("#tab_ct_table").width();
			var task_w = $("#m_task").width();
			var task_fn_w = $("#m_task_fn").width();
			if(table_w>(task_w-task_fn_w)){
				$("#tab_ct_div").addClass("task-full");
			}
			
			if(cls && special_cls.contains(cls)){
				special_idx.push(idx);
			}	
		},
		redirect:function(title,url,cls,data){
			if((!title || !$.isString(title))){
				alert("标题不能为空！");
				return;
			}
			if(!$.isString(url)){
				alert("URL必须是String类型！");
				return;
			}
			if(!activeNavTabIdx){
				return;
			}
			var item=$.navtabset.items[title]; //已经存在同样标题的界面
			if(item){
				var e_idx=item.idx;
				var e_url=item.url;
				if(e_idx){
					if($.navtabset.switchTo(e_idx,true)==false){
						return;
					}
					if(url!=e_url){
						$.navtabset.reload(e_idx,url);
						item.url=url;
					}
				}
				return;
			}
			
			
			//跳转当前页面
			item = $.navtabset.getCurrentItem();
			if(item){
			    //更新标题
			    $("#navtab_" + activeNavTabIdx).attr("title",title);
				$("#navtab_" + activeNavTabIdx + " span[class=text]").text(title);

				//重新加载
				$.navtabset.reload(activeNavTabIdx,url);
				
				var p_title = item.title;item = null;
				delete $.navtabset.items[p_title];
				$.navtabset.items[title]={"idx":activeNavTabIdx,"title":title,"url":url};
			}
		},
		reload:function(idx,url){
			if(!url){
				var item = $.navtabset.findItemByIdx(idx);
				if(item)url = item.url;
			}
			if(url)$.navtabset.frameMgr.reload(idx,url);
		},
		reloadCurrent:function(url){
			if(activeNavTabIdx){
				$.navtabset.reload(activeNavTabIdx,url);
			}
		},
		switchTo:function(idx,switchFrame){
			if(activeNavTabIdx){
				//先进行onUnActive事件处理
				var ct=$.navtabset.getCurrentContentWindow();
				if($.isSameDomain(ct)){ //如果在同一个域
					var fn=ct[$.nav.events.unactive];
					if(fn && $.isFunction(fn)
						&& false===fn()){ //如果有onUnActive方法，且执行结果为false，则不切换
						return false;
					}
				}
				$("#navtab_" + activeNavTabIdx).removeClass("on");
			}
			$("#navtab_" + idx).addClass("on");
			if(switchFrame){
				$.navtabset.frameMgr.switchTo(idx);
			}
			activeNavTabIdx=idx;
			
			if(switchFrame){
				//进行onActive事件处理
				var ct=$.navtabset.getCurrentContentWindow();
				if($.isSameDomain(ct)){ //如果在同一个域
					var fn=ct[$.nav.events.active];
					if(fn && $.isFunction(fn)){
						fn();
					}
				}
			}
			return true;
		},
		switchToByTitle:function(title){
			if($.navtabset.items[title]){
				var idx=$.navtabset.items[title].idx;
				return $.navtabset.switchTo(idx,true);
			}	
		},
		close:function(idx){
			//先进行onClose事件处理
			var ct=$.navtabset.getCurrentContentWindow();
			if($.isSameDomain(ct)){ //如果在同一个域
				var fn=ct[$.nav.events.close];
				if(fn && $.isFunction(fn)
					&& false===fn()){ //如果有onClose方法，且执行结果为false，则不关闭
					return;
				}
			}
			
			if($.browser.msie && $.browser.version<=6){
				$("#navtab_" + idx).unbind("mouseenter",$.navtabset.onMouseEnter_IE6);
				$("#navtab_" + idx).unbind("mouseleave",$.navtabset.onMouseLeave_IE6);
			}
			$("#navtab_close_" + idx).unbind("click",$.navtabset.onCloseClick);
			$("#navtab_" + idx).unbind("click",$.navtabset.onSwitchClick);
			
			$("#navtab_" + idx).remove();
			$.navtabset.frameMgr.remove(idx);
			//删除数组数据
			for(var i=$.navtabset.idx.length-1;i>=0;i--){
				if($.navtabset.idx[i]==idx){
					$.navtabset.idx.splice(i,1);
				}
			}
			//删除标题数据
			for(var title in $.navtabset.items){
				if($.navtabset.items[title].idx==idx){
					delete $.navtabset.items[title];
				}
			}
			delete $.navtabset.extend_data[idx];
			
			//切换到最后一个标签页
			if($.navtabset.idx.length>0){
				var l_idx=$.navtabset.idx[$.navtabset.idx.length-1];	
			
				//alert($.navtabset.idx);
							
				$.navtabset.switchTo(l_idx,true);
				//$.navtabset.frameMgr.switchTo(l_idx);
			}else{
				activeNavTabIdx = null;
			}

			//移除样式
			if($("#tab_ct_div").hasClass("task-full") && tab_width){
				//计算宽度
				var mustWidth=0;
				var tds = $("#tab_ct_tr td");
				tds.each(function(){
					if(!this.className || "on" == this.className){
						mustWidth += tab_width;
					}else{
						mustWidth += $(this).width();
					}
				});
				//移除task-full
				var task_w = $("#m_task").width();
				var task_fn_w = $("#m_task_fn").width();
				if(mustWidth<(task_w-task_fn_w)){
					$("#tab_ct_div").removeClass("task-full");
				}
			}
		},
		closeByTitle:function(title){
			if($.navtabset.items[title]){
				var idx=$.navtabset.items[title].idx;
				$.navtabset.close(idx);
			}
		},
		closeCurrent:function(){
			if(activeNavTabIdx){
				$.navtabset.close(activeNavTabIdx);
			}
		},
		closeAll:function(){
			//全部删除
			for(var i=$.navtabset.idx.length-1;i>=0;i--){
				if(special_idx.contains($.navtabset.idx[i]))
					break;
				$.navtabset.close($.navtabset.idx[i]);
			}	
		},
		closeOther:function(uncloseidx){
			for(var i=$.navtabset.idx.length-1;i>=0;i--){
				if(uncloseidx==$.navtabset.idx[i] 
					|| special_idx.contains($.navtabset.idx[i]))
					continue;
				$.navtabset.close($.navtabset.idx[i]);
			}	
		},
		getCurrentData:function(){
			if(activeNavTabIdx){
				return $.navtabset.extend_data[activeNavTabIdx];
			}
		},
		getDataByTitle:function(title){
			if($.navtabset.items[title]){
				var idx=$.navtabset.items[title].idx;
				return $.navtabset.extend_data[idx];
			}
		},
		getCurrentContentWindow:function(){
			if(activeNavTabIdx){
				return $.navtabset.getContentWindow(activeNavTabIdx);
			}
		},
		getContentWindow:function(idx){
			var fm=$("#navframe_" +idx);
			if(fm.length){
				return fm[0].contentWindow;
			}
		},
		getContentWindowByTitle:function(title){
			if($.navtabset.items[title]){
				var idx=$.navtabset.items[title].idx;
				return $.navtabset.getContentWindow(idx);
			}
		},
		onSwitchClick:function(e){
			if(e.data){
				$.navtabset.switchTo(e.data,true);
				//$.navtabset.frameMgr.switchTo(e.data);
				return false;
			}
		},
		hasOpendTab:function(){
			for(var i=$.navtabset.idx.length-1;i>=0;i--){
				if(!special_idx.contains($.navtabset.idx[i]))
					return true;
			}
			return false;
		},
		onCloseClick:function(e){
			if(e.data){
				$.navtabset.close(e.data);
				return false;
			}
		},
		onContextMenu:function(e){
			var idx = e.data;
			if(!special_idx.contains(idx)){
				contextMenuNavTabIdx = idx;
				$.showContextMenu(e);
			}
			return false;
		},
		onMouseEnter_IE6:function(e){
			$("#navtab_" + e.data).addClass("hover");
		},
		onMouseLeave_IE6:function(e){
			$("#navtab_" + e.data).removeClass("hover");
		}
	}
	
	var activeNavFrameIdx;
	$.navtabset.frameMgr={
		add:function(idx,url,doSwitch){
		
			$.insertHtml("beforeend",$("#main_ct")[0],
				'<iframe id="navframe_'+idx+'" name="navframeName_'+idx+'"  idx="' +idx+ '" class="m_mainFrame" frameborder="0" src="" ' +
				' ></iframe>');
				
			$.insertHtml("beforeend",$("#main_ct")[0],
				'<div id="navframe_loading_'+idx+'" idx="'+idx+'" class="loading" style="display:none"><span></span></div>');
			
			
			if($.browser.msie && $.browser.version<=6){
				$.insertHtml("beforeend",$("#main_ct")[0],
					'<iframe id="navframe_cover_'+idx+'" name="navframe_coverName_'+idx+'"   idx="'+idx+'" class="m_mainCover" style="display:none" src=""></iframe>');
			}			
				
			//bind event
			if($.browser.msie){
				$("#navframe_" + idx).bind("readystatechange",idx,$.navtabset.frameMgr.onIframeReadyStateChange_IE);
			}else{
				$("#navframe_" + idx).bind("load",idx,$.navtabset.frameMgr.onIframeLoad);
			}
			
			if(doSwitch){
				$.navtabset.frameMgr.switchTo(idx);
				$.navtabset.frameMgr.showLoading(idx);
			}
			
			$("#navframe_" + idx).attr("src",url);
		},
		switchTo:function(idx){		
			if(activeNavFrameIdx){
				//隐藏前一个页面界面
				$("#navframe_" + activeNavFrameIdx).css("display","none");
				//如果前一个页面没有加载完,隐藏前一个界面的loading
				if(true!==$("#navframe_" + activeNavFrameIdx).data("loaded")){
					$("#navframe_loading_" + activeNavFrameIdx).css("display","none");
					if($.browser.msie && $.browser.version<=6){
						$("#navframe_cover_"+activeNavFrameIdx).css("display","none");
					}
				}
			}
			//显示当前页面界面
			$("#navframe_" + idx).css("display","");
			//如果当前界面没有加载完,显示当前界面的loading
			if(true!==$("#navframe_" + idx).data("loaded")){
				$("#navframe_loading_" + idx).css("display","");
				if($.browser.msie && $.browser.version<=6){
					$("#navframe_cover_"+idx).css("display","");
				}
			}
			activeNavFrameIdx=idx;
		},
		remove:function(idx){
			//unbind event
			if($.browser.msie){
				$("#navframe_" + idx).unbind("readystatechange",$.navtabset.frameMgr.onIframeReadyStateChange_IE);
			}else{
				$("#navframe_" + idx).unbind("load",$.navtabset.frameMgr.onIframeLoad);
			}
			//remove el
			$("#navframe_" + idx).remove();
			$("#navframe_loading_" + idx).remove();
			
			if($.browser.msie && $.browser.version<=6){
				$("#navframe_cover_"+idx).remove();
			}
			//如果是IE，由于iframe remove后内存不释放，进行强制垃圾回收。
			if($.browser.msie){
				CollectGarbage();
			}
		},
		reload:function(idx,url){
			$.navtabset.frameMgr.showLoading(idx);
			$("#navframe_" + idx).attr("src",url);
			$("#navframe_" + idx).data("loaded",false);
		},
		showLoading:function(idx){
			$("#navframe_loading_" + idx).css("display","");
			if($.browser.msie && $.browser.version<=6){
				$("#navframe_cover_"+idx).css("display","");
			}
		},
		showContent:function(idx){
			$("#navframe_loading_" + idx).css("display","none");
			if($.browser.msie && $.browser.version<=6){
				$("#navframe_cover_"+idx).css("display","none");
			}
		},
		onIframeLoad:function(e){
			var idx=e.data;
			if(idx){
				$.navtabset.frameMgr.showContent(idx);
				$("#navframe_" + idx).data("loaded",true);
			}
		},
		onIframeReadyStateChange_IE:function(e){
			if(this.readyState=="complete"){
				var idx=e.data;
				if(idx){
					$.navtabset.frameMgr.showContent(idx);
					$("#navframe_" + idx).data("loaded",true);
				}
			}
		}
	}
}

})(Wade);


$(function(){	
	$.navtabset.add('欢迎',$.redirect.parseUrl('?service=page/Welcome'),'home on');
});