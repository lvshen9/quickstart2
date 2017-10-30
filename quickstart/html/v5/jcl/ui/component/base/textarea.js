/*!
 * textarea component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,t,i){"use strict";if(e&&"undefined"==typeof e.TextArea){var n=i.createElement("input"),l="oninput"in n;n=null;var a=/[\[\]\{\}"\/\\]+/,d=function(t,n){var l=this;l.el=t&&1==t.nodeType?t:i.getElementById(t),l.el&&l.el.nodeType&&(l.id=e.attr(l.el,"id"))&&(n&&e.isObject(n)&&e.extend(l,n),e.attr(l.el,"x-wade-uicomponent")||e.attr(l.el,"x-wade-uicomponent","textarea"),l._init(),l.constructor.call(l))};d.prototype=e.extend(new e.UIComponent,{getDisabled:function(){return this.disabled},setDisabled:function(t){var i=this;if(i.el&&i.el.nodeType){i.disabled=!!t;var n=i.el.className?i.el.className:"";i.disabled?((" "+n+" ").indexOf(" e_dis ")<0&&(i.el.className=e.trim(n+" e_dis")),i.el.disabled=!0):(n=e.trim((" "+n+" ").replace(/ e_dis /gi," ")),i.el.className=n,i.el.disabled=!1)}},destroy:function(){this.el=null},_init:function(){var t=this,i=function(){return""==this.value||!a.test(""+this.value)||(this.value=(""+this.value).replace(/[\[\]\{\}"\/\\]*/g,""),!1)};l?e(t.el).bind("input",i):e(t.el).bind("keyup",i)}}),t.TextArea=e.TextArea=d}}(window.Wade,window,document);