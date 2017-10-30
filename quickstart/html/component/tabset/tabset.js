(function($){if(typeof($.tabset)=="undefined"){$.tabset=function(id){return new $.tabset.fn.construct(id);};$.tabset.fn={construct:function(id){this.id=id;this.init();},init:function(){var ul=$("#"+this.id+"_tab ul:first");var inited=ul.data("inited");if(!inited){var f_ac=-1,items=$("#"+this.id+"_content").children("[x-tabset-it]");
items.each(function(idx){$.attr(this,"idx",idx);var title=$.attr(this,"tab_title");var active=("true"==$.attr(this,"active"));$.insertHtml("beforeend",ul[0],'<li idx="'+idx+'" '+(active?' class="on" ':"")+'><a x-tabset-it="title" href="javascript:void(0)">'+title+"</a></li>");if($.nodeName(this,"iframe")){if($.browser.msie){$(this).bind("readystatechange",$.tabset.fn.events.onIframeReadyStateChange_IE);
}else{$(this).bind("load",$.tabset.fn.events.onIframeLoad);}var ld_id="x-tabset-ld_"+($.guid++);$.insertHtml("afterend",this,'<div id="'+ld_id+'" class="c_tabLoading" style="height:'+$(this).height()+'px;display:none;"><span><i class="e_ico-loading"></i>'+$.lang["view.web.jcl.tapestry.page.loading"]+"</span></div>");
$.data(this,"ld_id",ld_id);}if(active){f_ac=idx;}});ul.find("a[x-tabset-it=title]").bind("click",$.tabset.fn.events.onTabTitleClick);ul.data("inited",true);if(f_ac<0&&items.length>0){f_ac=0;}if(f_ac>=0){this.switchToByIdx(f_ac);ul.data("active_idx",f_ac);}}},getCurrentTitle:function(){var ul=$("#"+this.id+"_tab ul:first");
var idx=ul.data("active_idx");if(/^\d+$/.test(idx)){return $("#"+this.id+"_content [idx="+idx+"]:first").attr("tab_title");}},getCurrentContentWindow:function(){var ul=$("#"+this.id+"_tab ul:first");var idx=ul.data("active_idx");if(/^\d+$/.test(idx)){var el=$("#"+this.id+"_content [idx="+idx+"]:first");
if(el.length&&$.nodeName(el[0],"iframe")){return el[0].contentWindow;}}},switchTo:function(title){if(!title||!$.isString(title)){return;}var el=$("#"+this.id+"_content [tab_title='"+title+"']:first");var idx=el.attr("idx");if(/^\d+$/.test(idx)){this.switchToByIdx(idx);}},switchToByIdx:function(idx){var ul=$("#"+this.id+"_tab ul:first");
var f_ac=ul.data("active_idx");if(f_ac==idx){return;}ul.find("[idx="+f_ac+"]:first").removeClass("on");var p_el=$("#"+this.id+"_content [idx="+f_ac+"]:first");p_el.css("display","none");if(p_el.length&&$.nodeName(p_el[0],"iframe")){var ld_id=p_el.data("ld_id");var loaded=p_el.data("loaded");if(!loaded){$("#"+ld_id).css("display","none");
}}ul.find("[idx="+idx+"]:first").addClass("on");var item=$("#"+this.id+"_content [idx="+idx+"]:first");if($.nodeName(item[0],"iframe")){var inited=item.data("inited");var fresh=item.attr("fresh");if(!inited||fresh=="true"){var page=item.attr("page");var listener=item.attr("listener");var params=item.attr("params");
var subsys=item.attr("subsys");var url;var p="";if(params!=null&&params!=""){if(params.search(/[\"|\']\+\s*[\$]\(/)!=-1||params.search(/[\"|\']\+\s*(document.getElement)/)!=-1){params=eval(params);}$.each(params.split("&"),function(idx,item){var index=item.indexOf("=");if(index!=-1){p+="&"+item.substring(0,index)+"="+encodeURIComponent(item.substring(index+1));
}else{p+="&"+item+"=";}});}else{p=null;}if(subsys){url=$.redirect.buildUrl(subsys,page,listener,p);}else{url=$.redirect.buildUrl(page,listener,p);}item.attr("src",url);item.data("inited",true);item.data("loaded",false);p=null;}var loaded=item.data("loaded");if(!loaded){var ld_id=item.data("ld_id");$("#"+ld_id).css("display","");
}else{item.css("display","");var userDefinedWade_hasEdgeBetweenPage=window["Wade_hasEdgeBetweenPage"];var userDefinedWade_isStopResizeHeight=window["Wade_isStopResizeHeight"];window["Wade_hasEdgeBetweenPage"]=false;window["Wade_isStopResizeHeight"]=false;if(item[0].contentWindow.$&&item[0].contentWindow.$.isReady){if(item[0].contentWindow["resizeHeight"]){item[0].contentWindow.resizeHeight();
}window["Wade_hasEdgeBetweenPage"]=userDefinedWade_hasEdgeBetweenPage;window["Wade_isStopResizeHeight"]=userDefinedWade_isStopResizeHeight;}else{var ld_id=item.data("ld_id");$("#"+ld_id).css("display","");$(item[0].contentWindow).bind("load",function(){if(item[0].contentWindow["resizeHeight"]){item[0].contentWindow.resizeHeight();
}$("#"+ld_id).css("display","none");window["Wade_hasEdgeBetweenPage"]=userDefinedWade_hasEdgeBetweenPage;window["Wade_isStopResizeHeight"]=userDefinedWade_isStopResizeHeight;});}}}else{item.css("display","");if($.resizeHeight){$.resizeHeight();}}ul.data("active_idx",idx);},getContentWindow:function(title){if(!title||!$.isString(title)){return;
}var el=$("#"+this.id+"_content [tab_title='"+title+"']:first");if(el.length&&$.nodeName(el[0],"iframe")){return el[0].contentWindow;}},showIframeContent:function(ifrEl){var id=$(ifrEl).parents("div[x-tabset-ct=content]").attr("id");id=id.split("_")[0];var ul=$("#"+id+"_tab ul:first");var ac_idx=ul.data("active_idx");
var idx=$.attr(ifrEl,"idx");var ld_id=$.data(ifrEl,"ld_id");$("#"+ld_id).css("display","none");$.data(ifrEl,"loaded",true);if(/^\d+$/.test(ac_idx)&&ac_idx!=idx){return;}$(ifrEl).css("display","");var userDefinedWade_hasEdgeBetweenPage=window["Wade_hasEdgeBetweenPage"];var userDefinedWade_isStopResizeHeight=window["Wade_isStopResizeHeight"];
window["Wade_hasEdgeBetweenPage"]=false;window["Wade_isStopResizeHeight"]=false;if(ifrEl.contentWindow["resizeHeight"]){ifrEl.contentWindow.resizeHeight();}window["Wade_hasEdgeBetweenPage"]=userDefinedWade_hasEdgeBetweenPage;window["Wade_isStopResizeHeight"]=userDefinedWade_isStopResizeHeight;},getAllTabTitle:function(){var title=[];
$("#"+this.id+"_tab a[x-tabset-it=title]").each(function(idx,item){title[idx]=$(item).html();});return title;},events:{onTabTitleClick:function(e){var idx=$(this).parent("").attr("idx");var id=$(this).parents("div[x-tabset-ct=tab]").attr("id");id=id.split("_")[0];var ul=$("#"+id+"_tab ul:first");var pidx=ul.data("active_idx");
if(pidx==idx){return;}var p_el=$("#"+id+"_content [idx="+pidx+"]:first");var ptitle=p_el.attr("tab_title");var el=$("#"+id+"_content [idx="+idx+"]:first");var title=el.attr("tab_title");if(window[id].switchAction&&$.isFunction(window[id].switchAction)){if(!window[id].switchAction(ptitle,title)){return;
}}window[id].switchToByIdx(idx);},onIframeLoad:function(e){$.tabset.fn.showIframeContent(this);},onIframeReadyStateChange_IE:function(e){if(this.readyState=="complete"){$.tabset.fn.showIframeContent(this);}}}};$.tabset.fn.construct.prototype=$.tabset.fn;}})(Wade);