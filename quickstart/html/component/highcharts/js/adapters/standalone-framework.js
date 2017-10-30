var HighchartsAdapter=(function(){var c,g=document,b=[],e=[],a,f;Math.easeInOutSine=function(i,h,k,j){return -k/2*(Math.cos(Math.PI*i/j)-1)+h;};function d(k){function j(n,m,l){n.removeEventListener(m,l,false);}function i(n,m,l){l=n.HCProxiedMethods[l.toString()];n.detachEvent("on"+m,l);}function h(r,q){var p=r.HCEvents,m,o,l,s;
if(r.removeEventListener){m=j;}else{if(r.attachEvent){m=i;}else{return;}}if(q){o={};o[q]=true;}else{o=p;}for(s in o){if(p[s]){l=p[s].length;while(l--){m(r,s,p[s][l]);}}}}if(!k.HCExtended){Highcharts.extend(k,{HCExtended:true,HCEvents:{},bind:function(l,p){var o=this,n=this.HCEvents,m;if(o.addEventListener){o.addEventListener(l,p,false);
}else{if(o.attachEvent){m=function(q){p.call(o,q);};if(!o.HCProxiedMethods){o.HCProxiedMethods={};}o.HCProxiedMethods[p.toString()]=m;o.attachEvent("on"+l,m);}}if(n[l]===c){n[l]=[];}n[l].push(p);},unbind:function(m,o){var n,l;if(m){n=this.HCEvents[m]||[];if(o){l=HighchartsAdapter.inArray(o,n);if(l>-1){n.splice(l,1);
this.HCEvents[m]=n;}if(this.removeEventListener){j(this,m,o);}else{if(this.attachEvent){i(this,m,o);}}}else{h(this,m);this.HCEvents[m]=[];}}else{h(this);this.HCEvents={};}},trigger:function(o,n){var p=this.HCEvents[o]||[],r=this,l=p.length,m,q;m=function(){n.defaultPrevented=true;};while(l--){q=p[l];
if(n.stopped){return;}n.preventDefault=m;n.target=r;if(q.call(this,n)===false){n.preventDefault();}}}});}return k;}return{init:function(h){if(!g.defaultView){this._getStyle=function(i,k){var j;if(i.style[k]){return i.style[k];}else{if(k==="opacity"){k="filter";}j=i.currentStyle[k.replace(/\-(\w)/g,function(m,l){return l.toUpperCase();
})];if(k==="filter"){j=j.replace(/alpha\(opacity=([0-9]+)\)/,function(m,l){return l/100;});}return j===""?1:j;}};this.adapterRun=function(j,k){var i={width:"clientWidth",height:"clientHeight"}[k];if(i){j.style.zoom=1;return j[i]-2*parseInt(HighchartsAdapter._getStyle(j,"padding"),10);}};}if(!Array.prototype.forEach){this.each=function(k,m){var l=0,j=k.length;
for(;l<j;l++){if(m.call(k[l],k[l],l,k)===false){return l;}}};}if(!Array.prototype.indexOf){this.inArray=function(m,k){var j,l=0;if(k){j=k.length;for(;l<j;l++){if(k[l]===m){return l;}}}return -1;};}if(!Array.prototype.filter){this.grep=function(m,n){var j=[],k=0,l=m.length;for(;k<l;k++){if(!!n(m[k],k)){j.push(m[k]);
}}return j;};}f=function(j,i,k){this.options=i;this.elem=j;this.prop=k;};f.prototype={update:function(){var k,l=this.paths,j=this.elem,i=j.element;if(l&&i){j.attr("d",h.step(l[0],l[1],this.now,this.toD));}else{if(j.attr){if(i){j.attr(this.prop,this.now);}}else{k={};k[j]=this.now+this.unit;Highcharts.css(j,k);
}}if(this.options.step){this.options.step.call(this.elem,this.now,this);}},custom:function(o,n,m){var j=this,l=function(i){return j.step(i);},k;this.startTime=+new Date();this.start=o;this.end=n;this.unit=m;this.now=this.start;this.pos=this.state=0;l.elem=this.elem;if(l()&&e.push(l)===1){a=setInterval(function(){for(k=0;
k<e.length;k++){if(!e[k]()){e.splice(k--,1);}}if(!e.length){clearInterval(a);}},13);}},step:function(p){var o=+new Date(),l,j,k=this.options,m;if(this.elem.stopAnimation){l=false;}else{if(p||o>=k.duration+this.startTime){this.now=this.end;this.pos=this.state=1;this.update();this.options.curAnim[this.prop]=true;
j=true;for(m in k.curAnim){if(k.curAnim[m]!==true){j=false;}}if(j){if(k.complete){k.complete.call(this.elem);}}l=false;}else{var q=o-this.startTime;this.state=q/k.duration;this.pos=k.easing(q,0,1,k.duration);this.now=this.start+((this.end-this.start)*this.pos);this.update();l=true;}}return l;}};this.animate=function(m,j,l){var k,q="",o,n,p,i;
m.stopAnimation=false;if(typeof l!=="object"||l===null){p=arguments;l={duration:p[2],easing:p[3],complete:p[4]};}if(typeof l.duration!=="number"){l.duration=400;}l.easing=Math[l.easing]||Math.easeInOutSine;l.curAnim=Highcharts.extend({},j);for(i in j){n=new f(m,l,i);o=null;if(i==="d"){n.paths=h.init(m,m.d,j.d);
n.toD=j.d;k=0;o=1;}else{if(m.attr){k=m.attr(i);}else{k=parseFloat(this._getStyle(m,i))||0;if(i!=="opacity"){q="px";}}}if(!o){o=parseFloat(j[i]);}n.custom(k,o,q);}};},_getStyle:function(h,i){return window.getComputedStyle(h).getPropertyValue(i);},getScript:function(j,k){var i=g.getElementsByTagName("head")[0],h=g.createElement("script");
h.type="text/javascript";h.src=j;h.onload=k;i.appendChild(h);},inArray:function(i,h){return h.indexOf?h.indexOf(i):b.indexOf.call(h,i);},adapterRun:function(h,i){return parseInt(HighchartsAdapter._getStyle(h,i),10);},grep:function(h,i){return b.filter.call(h,i);},map:function(j,m){var l=[],k=0,h=j.length;
for(;k<h;k++){l[k]=m.call(j[k],j[k],k,j);}return l;},offset:function(h){var j=0,i=0;while(h){j+=h.offsetLeft;i+=h.offsetTop;h=h.offsetParent;}return{left:j,top:i};},addEvent:function(j,i,h){d(j).bind(i,h);},removeEvent:function(j,i,h){d(j).unbind(i,h);},fireEvent:function(k,j,i,h){var l;if(g.createEvent&&(k.dispatchEvent||k.fireEvent)){l=g.createEvent("Events");
l.initEvent(j,true,true);l.target=k;Highcharts.extend(l,i);if(k.dispatchEvent){k.dispatchEvent(l);}else{k.fireEvent(j,l);}}else{if(k.HCExtended===true){i=i||{};k.trigger(j,i);}}if(i&&i.defaultPrevented){h=null;}if(h){h(i);}},washMouseEvent:function(h){return h;},stop:function(h){h.stopAnimation=true;
},each:function(h,i){return Array.prototype.forEach.call(h,i);}};}());