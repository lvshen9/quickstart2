/*!
 * ipaddressfield component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,n,a){"use strict";if(e&&"undefined"==typeof e.IpAddressField){var i=a.createElement("input"),l="oninput"in i;i=null;var r=e.os.phone||!0===e.ratioPhone,d=/^[0-9]+\.[0-9]+\.[0-9]+\.[0-9]+$/,t=function(n,i){var l=this;l.el=n&&1==n.nodeType?n:a.getElementById(n),l.el&&l.el.nodeType&&(l.id=e.attr(l.el,"id"))&&(i&&e.isObject(i)&&e.extend(l,i),e.attr(l.el,"x-wade-uicomponent")||e.attr(l.el,"x-wade-uicomponent","ipaddressfield"),l._init(),l.constructor.call(l))};t.prototype=e.extend(new e.UIComponent,{val:function(e){var n=this;if(e==undefined)return n.el.value;if(""==e){for(var a=0;a<4;a++)n["range"+(a+1)].value="";return void(n.value=n.el.value="")}if(d.test(e)){for(var i,l=!0,r=[],t=(""+e).split("."),a=0;a<t.length;a++){if((i=parseInt(t[a]))<0||i>255){l=!1;break}r.push(i)}if(!0===l&&4==r.length){for(var a=0;a<4;a++)n["range"+(a+1)].value=r[a];n.value=n.el.value=r.join(".")}return r=i=t=null,void(l=null)}},getDisabled:function(){return this.disabled},setDisabled:function(n){var a=this;a.disabled=!!n;var i=a.span.className?a.span.className:"";a.disabled?((" "+i+" ").indexOf(" e_dis ")<0&&(a.span.className=e.trim(i+" e_dis")),a.range1.disabled=!0,a.range2.disabled=!0,a.range3.disabled=!0,a.range4.disabled=!0):(i=e.trim((" "+i+" ").replace(/ e_dis /gi," ")),a.span.className=i,a.range1.disabled=!1,a.range2.disabled=!1,a.range3.disabled=!1,a.range4.disabled=!1)},destroy:function(){for(var e=this,n=1;n<5;n++)e["range_"+n+"_value"]=null;e.span=null,e.range1=null,e.range2=null,e.range3=null,e.range4=null,e.el=null},_init:function(){var n=this;if(n.span=e(n.el).parent(".e_mix-ip")[0],n.span&&n.span.nodeType){var a=e(n.span).children("input[type=text]");a&&4==a.length&&(n.range1=a[0],n.range2=a[1],n.range3=a[2],n.range4=a[3]),a=null}var i=n.span.className?n.span.className:"";if(n.disabled&&(" "+i+" ").indexOf(" e_dis ")<0&&(n.span.className=e.trim(i+" e_dis")),n.value&&n.val(n.value),l){var d=function(a){if(n.disabled||n.readonly)return!1;var i=a.data;if(i){var l=e.trim((""+this.value).replace(/[^0-9]+/g,""));l=""==l?0:parseInt(l),l>255||l<0?l=n["range_"+i+"_value"]:n["range_"+i+"_value"]=l,this.value=l,n._fillValue()}};e(n.range1).bind("input",1,d),e(n.range2).bind("input",2,d),e(n.range3).bind("input",3,d),e(n.range4).bind("input",4,d)}else{var t=function(e){return!n.disabled&&!n.readonly&&(!(e.shiftKey||e.altKey||e.ctrlKey)&&(e.keyCode>47&&e.keyCode<58||e.keyCode>95&&e.keyCode<106||8==e.keyCode||46==e.keyCode))},s=function(a){if(n.disabled||n.readonly)return!1;var i=a.data;if(i){var l=e.trim((""+this.value).replace(/[^0-9]+/g,""));l=""==l?0:parseInt(l),l>255||l<0?l=n["range_"+i+"_value"]:n["range_"+i+"_value"]=l,this.value=l,n._fillValue()}};e(n.range1).bind("keydown",t),e(n.range2).bind("keydown",t),e(n.range3).bind("keydown",t),e(n.range4).bind("keydown",t),e(n.range1).bind("keyup",1,s),e(n.range2).bind("keyup",2,s),e(n.range3).bind("keyup",3,s),e(n.range4).bind("keyup",4,s)}if(!e.os.pad&&!r){var u=function(){if(n.disabled||n.readonly)return!1;e(this).select()};e(n.range1).bind("focus",u),e(n.range2).bind("focus",u),e(n.range3).bind("focus",u),e(n.range4).bind("focus",u)}},_fillValue:function(){for(var e,n=this,a=[],i=1;i<5;i++)e=n["range"+i].value,e=""==e?0:e,a.push(e);n.value=n.el.value=a.join(".")}}),n.IpAddressField=e.IpAddressField=t}}(window.Wade,window,document);