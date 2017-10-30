/*!
 * range component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,t,n){"use strict";function a(e){return[r?e.touches[0].pageX:e.clientX,r?e.touches[0].pageY:e.clientY]}if(e&&"undefined"==typeof e.Range){var r="undefined"!=typeof e.hasTouch?e.hasTouch:"ontouchstart"in t,i=r?"touchstart":"mousedown",s=r?"touchmove":"mousemove",d=r?"touchend":"mouseup",l=r?"touchcancel":"mouseup",o=null,u=null,c=function(t,a){var r=this;r.el=t&&1==t.nodeType?t:n.getElementById(t),r.el&&r.el.nodeType&&(r.id=e.attr(r.el,"id"))&&(a&&e.isObject(a)&&e.extend(r,a),e.attr(r.el,"x-wade-uicomponent")||e.attr(r.el,"x-wade-uicomponent","range"),r._init(),r.constructor.call(r))};c.prototype=e.extend(new e.UIComponent,{getDisabled:function(){return this.disabled},setDisabled:function(t){var n=this;n.disabled=!!t;var a=n.span.className?n.span.className:"";n.disabled?(" "+a+" ").indexOf(" e_dis ")<0&&(n.span.className=e.trim(a+" e_dis")):(a=e.trim((" "+a+" ").replace(/ e_dis /gi," ")),n.span.className=a)},destroy:function(){var e=this;e.span=null,e.bar=null,e.prog=null,e.text=null,e.el=null},_init:function(){var t=this;t.span=e(t.el).parents("span.e_range:first")[0],t.bar=e(t.span).find("span.e_rangeBar:first")[0],t.prog=e(t.span).find("span.e_rangeProgress:first")[0],t.text=e(t.span).find("span.e_rangeValue:first")[0];var n=e.attr(t.span,"id");n||(n=t.id+"_span",e.attr(t.span,"id",n)),e.attr(t.el,"x-visible-element",n);var r=t.span.className?t.span.className:"";(" "+r+" ").indexOf("e_range-value-")<0&&(t.span.className=e.trim(r+" e_range-value-l"));var s=t.span.getBoundingClientRect();t.spanLeft=s.left,t.spanWidth=t.span.offsetWidth,t.textWidth=t.text.offsetWidth;var d=t.bar.getBoundingClientRect();t.barWidth=t.bar.offsetWidth,t.barLeft=d.left,e.attr(t.span,"x-range-id",t.id),t.startPercent=t.endPercent=0,t.disabled&&t.setDisabled(!0),e(t.span).bind(i,function(n){if(!t.disabled){if(n.originalEvent&&(n=n.originalEvent),n.preventDefault)n.preventDefault();else try{n.returnValue=!1}catch(i){}if(o=e.attr(this,"x-range-id")){var r=a(n);r&&r.length&&r[0]&&t._position(r[0])}}}),e(t.span).bind("selectstart",function(e){return e.stop(),!1})},_position:function(e){var t=this;if(!(e<t.barLeft||e>t.barLeft+t.barWidth)){var n=(e-t.barLeft)/t.barWidth;if(u||(u=!t.useStart||Math.abs(n-t.startPercent)>=Math.abs(n-t.endPercent)?"end":"start"),"end"==u){if(t.startPercent&&t.startPercent>n)return;t.prog.style.width=100*(t.startPercent?n-t.startPercent:n)+"%",t.endPercent=n}else if("start"==u){if(t.endPercent&&t.endPercent<n)return;t.prog.style.left=100*n+"%",t.prog.style.width=100*(t.endPercent-n)+"%",t.startPercent=n}t._update()}},_update:function(){var e=this,t=e.max-e.min;if(!(t<=0)){var n=e.step?e.step:10,a=parseInt(t*Math.round(e.startPercent*n)/n)+e.min,r=parseInt(t*Math.round(e.endPercent*n)/n)+e.min;e.text.innerHTML=a+"~"+r,e.el.value=a+","+r}}}),e(n).ready(function(){e(n).bind(s,function(e){e.originalEvent&&(e=e.originalEvent);var n=a(e);if(n&&n.length&&n[0]&&o){var r=t[o];if(!(r&&r instanceof c))return;r._position(n[0])}}),e(n).bind(d,function(e){o=u=null}),r&&e(n).bind(l,function(e){o=u=null})}),t.Range=e.Range=c}}(window.Wade,window,document);