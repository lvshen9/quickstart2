Wade.nav.KeyEvent={
	reHelp:function(win){
		win["onhelp"]=function(){return false;}
	},
	onDocumentKeyDown:function(e){ //打开快捷菜单
		//退格键
		if(e.keyCode==8){
			var el=e.target;
			if(el && ($.nodeName(el,"input")
					 || $.nodeName(el,"textarea")) 
					 && !$.attr(el,"readonly")
					 && !$.attr(el,"disabled")){
				return true;
			}
			return false;
		}
		
		//热键菜单
		//if(e.keyCode>=112 && e.keyCode<=123){
			/*
			if(e.keyCode==112 && $.browser.msie){ //F1
				//e.originalEvent.keyCode=0;
			}
			*/
			//触发快捷菜单链接
		//	$("#HOTKEY_" + e.keyCode).trigger("click");
			/*
			if(Wade.nav.topIsSameDomain && !Wade.nav.topIsSamePage){
				top.$("#HOTKEY_" + e.keyCode).trigger("click");
			}else if(Wade.nav.topIsSameDomain){
				$("#HOTKEY_" + e.keyCode).trigger("click");
			}
			*/
		//	return false;
		//}
	},
	onDocumentContextMenu:function(){
		return false;
	}
};

//实现导航适配器方法
Wade.nav.createAdapter({
	init:function(win,doc){
		if(win && doc && win.Wade){
			if($.browser.msie){ //屏蔽帮助按钮
				Wade.nav.KeyEvent.reHelp(win);
			}
			win.Wade(doc).bind("keydown",Wade.nav.KeyEvent.onDocumentKeyDown);
			/*
			if("true"==$.ctx.attr("productmode")){
				win.Wade(doc).bind("contextmenu",Wade.nav.KeyEvent.onDocumentContextMenu);
			}*/
		}
	},
	open:function(title,page,listener,params,subsys,data){ //打开界面
		var url;
		if(subsys && $.isString(subsys)){
			url=$.redirect.buildUrl(subsys,page,listener,params);
		}else{
			url=$.redirect.buildUrl(page,listener,params);
		}

		$.navtabset.add(title,url,null,data);	
	},
	openLock:function(title,page,listener,params,subsys){ //打开锁定界面
		alert('未实现该方法');
	},
	openByUrl:function(title,url,subsys,data){ //从URL打开界面
		var url;
		if(subsys && $.isString(subsys)){
			url=$.redirect.buildSysUrl(subsys,url);
		}else{
			url=$.redirect.buildSysUrl(url);
		}

		$.navtabset.add(title,url,null,data);
	},
	redirect:function(title,page,listener,params,subsys,data){ //跳转当前界面
		var url;
		if(subsys && $.isString(subsys)){
			url=this.$.redirect.buildUrl(subsys,page,listener,params);
		}else{
			url=this.$.redirect.buildUrl(page,listener,params);
		}
		$.navtabset.redirect(title,url,null,data);
	},
	redirectByUrl:function(title,url,subsys,data){
		var url;
		if(subsys && $.isString(subsys)){
			url=$.redirect.buildSysUrl(subsys,url);
		}else{
			url=$.redirect.buildSysUrl(url);
		}
		
		url = buildFrameUrl(url);
		$.navtabset.redirect(title,url,null,data);
	},
	reload:function(url){ //重载当前界面
		$.navtabset.reloadCurrent(url);
	},
	getData:function(){ //获取当前界面的导航相关信息(比如菜单code,权限code等,由适配器扩展实现)
		alert('未实现该方法');
	},
	getDataByTitle:function(title){ //根据标题获取相关界面的导航相关信息(比如菜单code,权限code等,由适配器扩展实现)
		alert('未实现该方法');
	},
	getTitle:function(){
		var item = $.navtabset.getCurrentItem();
		if(item)return item.title;
	},
	getContentWindow:function(){ //获取当前界面内容窗口
		return $.navtabset.getCurrentContentWindow();
	},
	getContentWindowByTitle:function(title){  //根据标题获取界面内容窗口对象
		return $.navtabset.getContentWindowByTitle(title);
	},
	switchByTitle:function(title){ //根据标题切换到界面
		$.navtabset.switchToByTitle(title);
	},	
	close:function(){ //关闭当前活动界面  
		$.navtabset.closeCurrent();
	},
	closeByTitle:function(title){ //根据标题关闭界面
		$.navtabset.closeByTitle(title);
	}		
});
