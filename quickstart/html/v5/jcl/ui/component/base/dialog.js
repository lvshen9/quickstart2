/*!
 * dialog component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,t,i){"use strict";if(e&&"undefined"==typeof e.Dialog){var n=(Array.prototype.push,Array.prototype.splice,function(t,n){var o=this;o.el=t&&1==t.nodeType?t:i.getElementById(t),o.el&&o.el.nodeType&&(o.id=e.attr(o.el,"id"))&&(n&&e.isObject(n)&&e.extend(o,n),e.attr(o.el,"x-wade-uicomponent")||e.attr(o.el,"x-wade-uicomponent","dialog"),o._init(),o.constructor.call(o))});n.prototype=e.extend(new e.UIComponent,{show:function(t){var i=this;i.el.style.zIndex=e.zIndexer.get(i.id),i.el.style.display="",i.visible=!0,o(i.content,i.id),r(i.content),l(i.content)},hide:function(){var t=this;!1!==t.visible&&!1!==e.event.trigger("hideAction",null,t.el)&&(e.zIndexer.remove(t.id),t.el.style.display="none",t.visible=!1)},getFrame:function(e){return t[e]},setPopupReturnValue:function(i,n,o){var r=this;if(i){e.isPlainObject(i)&&(o=n);var l=r.srcWindow?r.srcWindow:t;a(l,i,n),!1!==o&&r.hide(),e.event.trigger({type:"afterAction",context:l},null,r.el)}},back:function(e,t,i,n){this.hide()},destroy:function(){var t=this;e.zIndexer.remove(t.id),t.srcWindow=null,t.wrapper=null,t.titleText=null,t.titleFnClose=null,t.content=null,t.el=null},_init:function(){var t=this;t.wrapper=e(t.el).children("div.wrapper:first")[0],t.titleText=e(t.el).find("div.text:first")[0],t.titleFnClose=e(t.el).find("div.close:first")[0],t.content=e(t.wrapper).children("div.content:first")[0],t.width&&(t.wrapper.style.width=t.width),t.height&&(t.content.style.height=t.height),e(t.titleFnClose).tap(function(){t.hide()})}});var o=function(i,n){if(e.Frame&&e.isFunction(e.Frame)&&e.Frame.prototype._init){var o,r;e("iframe[x-wade-uicomponent=frame]",i).each(function(){o=e.attr(this,"id"),(r=t[o])&&r instanceof e.Frame&&(r.setAttribute("popupId",n),!0!==r.inited?setTimeout("window['"+o+"'].init()",1):setTimeout("window['"+o+"'].adjust();window['"+o+"'].focus();",1))})}},r=function(i){if(e.Scroller&&e.isFunction(e.Scroller)&&e.Scroller.prototype._init){var n,o;e("div[x-wade-uicomponent=scroller]",i).each(function(){n=e.attr(this,"id"),(o=t[n])&&o instanceof e.Scroller&&setTimeout("window['"+n+"'].refresh()",1)})}},l=function(i){if(e.Table&&e.isFunction(e.Table)&&e.Table.prototype._init){var n,o;e("div[x-wade-uicomponent=table]",i).each(function(){n=e.attr(this,"id"),(o=t[n])&&o instanceof e.Table&&setTimeout("window['"+n+"'].adjust()",1)})}},a=function(t,i,n){if(t&&t.Wade&&t.$)if(e.isString(i))t.$("#"+i).val(n);else if(e.isPlainObject(i))for(var o in i)t.$("#"+o).val(i[o])};t.Dialog=e.Dialog=n}}(window.Wade,window,document);