/*!
 * switch component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,i,t){"use strict";if(e&&"undefined"==typeof e.Switch){var l=function(i,l){var n=this;n.el=i&&1==i.nodeType?i:t.getElementById(i),n.el&&n.el.nodeType&&(n.id=e.attr(n.el,"id"))&&(l&&e.isObject(l)&&e.extend(n,l),e.attr(n.el,"x-wade-uicomponent")||e.attr(n.el,"x-wade-uicomponent","switch"),n._init(),n.constructor.call(n))};l.prototype=e.extend(new e.UIComponent,{val:function(e){var i=this;if(undefined==e)return i.el.value;i.offValue&&i.offValue==e?(i.switchOn=!1,i.el.value=i.offValue,i._refreshStyle()):i.onValue&&i.onValue==e&&(i.switchOn=!0,i.el.value=i.onValue,i._refreshStyle())},getDisabled:function(){return this.disabled},setDisabled:function(i){var t=this;t.disabled=!!i;var l=t.div.className?t.div.className:"";t.disabled?(" "+l+" ").indexOf(" e_dis ")<0&&(t.div.className=e.trim(l+" e_dis")):(l=e.trim((" "+l+" ").replace(/ e_dis /gi," ")),t.div.className=l)},destroy:function(){var e=this;e.div=null,e.el=null},_init:function(){var i=this;i.div=e(i.el).parent("div.e_switch:first")[0];var t=e.attr(i.div,"id");t||(t=i.id+"_div",e.attr(i.div,"id",t)),e.attr(i.el,"x-visible-element",t),i._refreshStyle(),i.disabled&&i.setDisabled(!0),e(i.div).tap(function(t){i.disabled||(i.switchOn=!i.switchOn,i.el.value=i.switchOn?i.onValue:i.offValue,i._refreshStyle(),e.event.trigger({type:"change",originalEvent:t.originalEvent},null,i.el))})},_refreshStyle:function(){var i=this,t=i.div.className?i.div.className:"";i.disabled&&(" "+t+" ").indexOf(" e_dis ")<0&&(t=e.trim(t+" e_dis"),i.div.className=t),i.switchOn?((" "+t+" ").indexOf(" e_switch-off ")>-1&&(t=e.trim((" "+t+" ").replace(/ e_switch-off /gi," "))),i.offColor&&(t=e.trim((" "+t+" ").replace(new RegExp(" e_switch-"+i.offColor+" ","ig")," "))),i.div.className="",i.div.className=e.trim(t+(i.onColor?" e_switch-"+i.onColor:""))):((" "+t+" ").indexOf(" e_switch-off ")<0&&(t+=" e_switch-off"),i.onColor&&(t=e.trim((" "+t+" ").replace(new RegExp(" e_switch-"+i.onColor+" ","ig")," "))),i.div.className="",i.div.className=e.trim(t+(i.offColor?" e_switch-"+i.offColor:"")))}}),i.Switch=e.Switch=l}}(window.Wade,window,document);