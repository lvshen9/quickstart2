/*!
 * increasereduce component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,n,i){"use strict";function a(e){var i;d&&(i=n[d])&&(n.clearInterval(i.increaseReduceInterval),i.increaseReduceInterval=null),d=null}if(e&&"undefined"==typeof e.IncreaseReduce){var u=i.createElement("input"),t="oninput"in u;u=null;var d,l="undefined"!=typeof e.hasTouch?e.hasTouch:"ontouchstart"in n,r=l?"touchend":"mouseup",s=l?"touchcancel":"mouseup",c=function(n,a){var u=this;u.el=n&&1==n.nodeType?n:i.getElementById(n),u.el&&u.el.nodeType&&(u.id=e.attr(u.el,"id"))&&(a&&e.isObject(a)&&e.extend(u,a),e.attr(u.el,"x-wade-uicomponent")||e.attr(u.el,"x-wade-uicomponent","increasereduce"),u._init(),u.constructor.call(u))};c.prototype=e.extend(new e.UIComponent,{val:function(n){var i=this;if(!e.isNumeric(n))return typeof i.value!=undefined&&null!=i.value?""+i.value:"";n=parseInt(n),i.min!=undefined&&n<i.min||i.max!=undefined&&n>i.max||(i.value=n,i.el.value=n)},getDisabled:function(){return this.disabled},setDisabled:function(n){var i=this;i.disabled=!!n;var a=i.div.className?i.div.className:"";i.disabled?((" "+a+" ").indexOf(" e_dis ")<0&&(i.div.className=e.trim(a+" e_dis")),i.el.disabled=!0):(a=e.trim((" "+a+" ").replace(/ e_dis /gi," ")),i.div.className=a,i.el.disabled=!1)},destroy:function(){var e=this;e.div=null,e.btnReduce=null,e.btnIncrease=null,e.el=null},_init:function(){var i=this;i.div=e(i.el).parent("div.e_mix:first")[0],i.btnReduce=e(i.div).children("span.e_ico-reduce:first")[0],i.btnIncrease=e(i.div).children("span.e_ico-add:first")[0],/^[0-9]+/gi.test(i.el.value)?i.el.value=i.value=parseInt(i.el.value):i.el.value=i.value=0,i.disabled&&i.setDisabled(!0),e(i.btnReduce).tap(function(){if(i.disabled)return!1;i._reduce()}),e(i.btnIncrease).tap(function(){if(i.disabled)return!1;i._increase()}),e(i.btnReduce).longTap(function(){if(i.disabled)return!1;d||i.increaseReduceInterval||(i.increaseReduceInterval=n.setInterval(function(){i._reduce()},500),d=i.id)}),e(i.btnIncrease).longTap(function(){if(i.disabled)return!1;d||i.increaseReduceInterval||(i.increaseReduceInterval=n.setInterval(function(){i._increase()},500),d=i.id)}),t?e(i.el).bind("input",function(e){var n;if(this.value=(""+this.value).replace(/[^0-9]+/gi,""),""!=this.value){if(n=parseInt(this.value),i.min!=undefined&&n<i.min||i.max!=undefined&&n>i.max)return void(this.value=i.value);this.value=n}n!=undefined&&(i.value=n)}):(e(i.el).bind("keydown",function(e){return!i.disabled&&(!(e.shiftKey||e.altKey||e.ctrlKey)&&(e.keyCode>47&&e.keyCode<58||e.keyCode>95&&e.keyCode<106||8==e.keyCode||46==e.keyCode))}),e(i.el).bind("keyup",function(e){if(i.disabled)return!1;var n;if(""!=this.value){if(n=parseInt(this.value),i.min!=undefined&&n<i.min||i.max!=undefined&&n>i.max)return void(this.value=i.value);this.value=n}n!=undefined&&(i.value=n)}))},_increase:function(){var n,i=this;if(e.isNumber(i.value)&&i.value>-1){if(n=i.value+i.step,i.max!=undefined&&n>i.max)return;i.value=n}n!=undefined&&(i.el.value=n)},_reduce:function(){var n,i=this;if(e.isNumber(i.value)&&i.value>0){if(n=i.value-i.step,i.min!=undefined&&n<i.min)return;i.value=n}n!=undefined&&(i.el.value=n)}}),e(function(){e(i.body).bind(r,a),l&&e(i.body).bind(s,a)}),n.IncreaseReduce=e.IncreaseReduce=c}}(window.Wade,window,document);