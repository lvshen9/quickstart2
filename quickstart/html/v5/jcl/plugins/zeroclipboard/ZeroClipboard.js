/*!
* ZeroClipboard
* The ZeroClipboard library provides an easy way to copy text to the clipboard using an invisible Adobe Flash movie and a JavaScript interface.
* Copyright (c) 2014 Jon Rohan, James M. Greene
* Licensed MIT
* http://zeroclipboard.org/
* v1.3.5
*/
!function(e){"use strict";function t(e){return e.replace(/,/g,".").replace(/[^0-9\.]/g,"")}function n(e){return parseFloat(t(e))>=10}var r,o={bridge:null,version:"0.0.0",disabled:null,outdated:null,ready:null},i={},a=0,s={},l=0,u={},d=null,c=null,f=function(){var e,t,n,r,o="ZeroClipboard.swf";if(document.currentScript&&(r=document.currentScript.src));else{var i=document.getElementsByTagName("script");if("readyState"in i[0])for(e=i.length;e--&&("interactive"!==i[e].readyState||!(r=i[e].src)););else if("loading"===document.readyState)r=i[i.length-1].src;else{for(e=i.length;e--;){if(!(n=i[e].src)){t=null;break}if(n=n.split("#")[0].split("?")[0],n=n.slice(0,n.lastIndexOf("/")+1),null==t)t=n;else if(t!==n){t=null;break}}null!==t&&(r=t)}}return r&&(r=r.split("#")[0].split("?")[0],o=r.slice(0,r.lastIndexOf("/")+1)+o),o}(),p=function(){var e=function(e,t){return t.toUpperCase()};return function(t){return t.replace(/\-([a-z])/g,e)}}(),h=function(t,n){var r,o;return e.getComputedStyle?r=e.getComputedStyle(t,null).getPropertyValue(n):(o=p(n),r=t.currentStyle?t.currentStyle[o]:t.style[o]),"cursor"!==n||r&&"auto"!==r||"a"!==t.tagName.toLowerCase()?r:"pointer"},g=function(t){t||(t=e.event);var n;this!==e?n=this:t.target?n=t.target:t.srcElement&&(n=t.srcElement),D.activate(n)},y=function(e,t,n){e&&1===e.nodeType&&(e.addEventListener?e.addEventListener(t,n,!1):e.attachEvent&&e.attachEvent("on"+t,n))},v=function(e,t,n){e&&1===e.nodeType&&(e.removeEventListener?e.removeEventListener(t,n,!1):e.detachEvent&&e.detachEvent("on"+t,n))},m=function(e,t){if(!e||1!==e.nodeType)return e;if(e.classList)return e.classList.contains(t)||e.classList.add(t),e;if(t&&"string"==typeof t){var n=(t||"").split(/\s+/);if(1===e.nodeType)if(e.className){for(var r=" "+e.className+" ",o=e.className,i=0,a=n.length;i<a;i++)r.indexOf(" "+n[i]+" ")<0&&(o+=" "+n[i]);e.className=o.replace(/^\s+|\s+$/g,"")}else e.className=t}return e},b=function(e,t){if(!e||1!==e.nodeType)return e;if(e.classList)return e.classList.contains(t)&&e.classList.remove(t),e;if(t&&"string"==typeof t||t===undefined){var n=(t||"").split(/\s+/);if(1===e.nodeType&&e.className)if(t){for(var r=(" "+e.className+" ").replace(/[\n\t]/g," "),o=0,i=n.length;o<i;o++)r=r.replace(" "+n[o]+" "," ");e.className=r.replace(/^\s+|\s+$/g,"")}else e.className=""}return e},C=function(){var e,t,n,r=1;return"function"==typeof document.body.getBoundingClientRect&&(e=document.body.getBoundingClientRect(),t=e.right-e.left,n=document.body.offsetWidth,r=Math.round(t/n*100)/100),r},w=function(t,n){var r={left:0,top:0,width:0,height:0,zIndex:T(n)-1};if(t.getBoundingClientRect){var o,i,a,s=t.getBoundingClientRect();"pageXOffset"in e&&"pageYOffset"in e?(o=e.pageXOffset,i=e.pageYOffset):(a=C(),o=Math.round(document.documentElement.scrollLeft/a),i=Math.round(document.documentElement.scrollTop/a));var l=document.documentElement.clientLeft||0,u=document.documentElement.clientTop||0;r.left=s.left+o-l,r.top=s.top+i-u,r.width="width"in s?s.width:s.right-s.left,r.height="height"in s?s.height:s.bottom-s.top}return r},x=function(e,t){return null==t||t&&!0===t.cacheBust&&!0===t.useNoCache?(-1===e.indexOf("?")?"?":"&")+"noCache="+(new Date).getTime():""},O=function(t){var n,r,o,i=[],a=[],s=[];if(t.trustedOrigins&&("string"==typeof t.trustedOrigins?a.push(t.trustedOrigins):"object"==typeof t.trustedOrigins&&"length"in t.trustedOrigins&&(a=a.concat(t.trustedOrigins))),t.trustedDomains&&("string"==typeof t.trustedDomains?a.push(t.trustedDomains):"object"==typeof t.trustedDomains&&"length"in t.trustedDomains&&(a=a.concat(t.trustedDomains))),a.length)for(n=0,r=a.length;n<r;n++)if(a.hasOwnProperty(n)&&a[n]&&"string"==typeof a[n]){if(!(o=N(a[n])))continue;if("*"===o){s=[o];break}s.push.apply(s,[o,"//"+o,e.location.protocol+"//"+o])}return s.length&&i.push("trustedOrigins="+encodeURIComponent(s.join(","))),"string"==typeof t.jsModuleId&&t.jsModuleId&&i.push("jsModuleId="+encodeURIComponent(t.jsModuleId)),i.join("&")},z=function(e,t,n){if("function"==typeof t.indexOf)return t.indexOf(e,n);var r,o=t.length;for(void 0===n?n=0:n<0&&(n=o+n),r=n;r<o;r++)if(t.hasOwnProperty(r)&&t[r]===e)return r;return-1},I=function(e){if("string"==typeof e)throw new TypeError("ZeroClipboard doesn't accept query strings.");return e.length?e:[e]},E=function(t,n,r,o){o?e.setTimeout(function(){t.apply(n,r)},0):t.apply(n,r)},T=function(e){var t,n;return e&&("number"==typeof e&&e>0?t=e:"string"==typeof e&&(n=parseInt(e,10))&&!isNaN(n)&&n>0&&(t=n)),t||("number"==typeof H.zIndex&&H.zIndex>0?t=H.zIndex:"string"==typeof H.zIndex&&(n=parseInt(H.zIndex,10))&&!isNaN(n)&&n>0&&(t=n)),t||0},L=function(e,t){if(e&&!1!==t&&"undefined"!=typeof console&&console&&(console.warn||console.log)){var n="`"+e+"` is deprecated. See docs for more info:\n    https://github.com/zeroclipboard/zeroclipboard/blob/master/docs/instructions.md#deprecations";console.warn?console.warn(n):console.log(n)}},j=function(){var e,t,n,r,o,i=arguments[0]||{};for(e=1,t=arguments.length;e<t;e++)if(null!=(n=arguments[e]))for(r in n)if(n.hasOwnProperty(r)){if(i[r],o=n[r],i===o)continue;o!==undefined&&(i[r]=o)}return i},N=function(e){if(null==e||""===e)return null;if(""===(e=e.replace(/^\s+|\s+$/g,"")))return null;var t=e.indexOf("//");e=-1===t?e:e.slice(t+2);var n=e.indexOf("/");return e=-1===n?e:-1===t||0===n?null:e.slice(0,n),e&&".swf"===e.slice(-4).toLowerCase()?null:e||null},S=function(){var e=function(e,t){var n,r,o;if(null!=e&&"*"!==t[0]&&("string"==typeof e&&(e=[e]),"object"==typeof e&&"length"in e))for(n=0,r=e.length;n<r;n++)if(e.hasOwnProperty(n)&&(o=N(e[n]))){if("*"===o){t.length=0,t.push("*");break}-1===z(o,t)&&t.push(o)}},t={always:"always",samedomain:"sameDomain",never:"never"};return function(n,r){var o,i=r.allowScriptAccess;if("string"==typeof i&&(o=i.toLowerCase())&&/^always|samedomain|never$/.test(o))return t[o];var a=N(r.moviePath);null===a&&(a=n);var s=[];e(r.trustedOrigins,s),e(r.trustedDomains,s);var l=s.length;if(l>0){if(1===l&&"*"===s[0])return"always";if(-1!==z(n,s))return 1===l&&n===a?"sameDomain":"always"}return"never"}}(),P=function(e){if(null==e)return[];if(Object.keys)return Object.keys(e);var t=[];for(var n in e)e.hasOwnProperty(n)&&t.push(n);return t},A=function(e){if(e)for(var t in e)e.hasOwnProperty(t)&&delete e[t];return e},k=function(){try{return document.activeElement}catch(e){}return null},Z=function(){var e=!1;if("boolean"==typeof o.disabled)e=!1===o.disabled;else{if("function"==typeof ActiveXObject)try{new ActiveXObject("ShockwaveFlash.ShockwaveFlash")&&(e=!0)}catch(t){}!e&&navigator.mimeTypes["application/x-shockwave-flash"]&&(e=!0)}return e},D=function(e,t){if(!(this instanceof D))return new D(e,t);this.id=""+a++,s[this.id]={instance:this,elements:[],handlers:{}},e&&this.clip(e),void 0!==t&&(L("new ZeroClipboard(elements, options)",H.debug),D.config(t)),this.options=D.config(),"boolean"!=typeof o.disabled&&(o.disabled=!Z()),!1===o.disabled&&!0!==o.outdated&&null===o.bridge&&(o.outdated=!1,o.ready=!1,F())};D.prototype.setText=function(e){return e&&""!==e&&(i["text/plain"]=e,!0===o.ready&&o.bridge&&"function"==typeof o.bridge.setText?o.bridge.setText(e):o.ready=!1),this},D.prototype.setSize=function(e,t){return!0===o.ready&&o.bridge&&"function"==typeof o.bridge.setSize?o.bridge.setSize(e,t):o.ready=!1,this};var B=function(e){!0===o.ready&&o.bridge&&"function"==typeof o.bridge.setHandCursor?o.bridge.setHandCursor(e):o.ready=!1};D.prototype.destroy=function(){this.unclip(),this.off(),delete s[this.id]};var M=function(){var e,t,n,r=[],o=P(s);for(e=0,t=o.length;e<t;e++)(n=s[o[e]].instance)&&n instanceof D&&r.push(n);return r};D.version="1.3.5";var H={swfPath:f,trustedDomains:e.location.host?[e.location.host]:[],cacheBust:!0,forceHandCursor:!1,zIndex:999999999,debug:!0,title:null,autoActivate:!0};D.config=function(e){"object"==typeof e&&null!==e&&j(H,e);{if("string"!=typeof e||!e){var t={};for(var n in H)H.hasOwnProperty(n)&&("object"==typeof H[n]&&null!==H[n]?"length"in H[n]?t[n]=H[n].slice(0):t[n]=j({},H[n]):t[n]=H[n]);return t}if(H.hasOwnProperty(e))return H[e]}},D.destroy=function(){D.deactivate();for(var e in s)if(s.hasOwnProperty(e)&&s[e]){var t=s[e].instance;t&&"function"==typeof t.destroy&&t.destroy()}var n=R(o.bridge);n&&n.parentNode&&(n.parentNode.removeChild(n),o.ready=null,o.bridge=null)},D.activate=function(e){r&&(b(r,H.hoverClass),b(r,H.activeClass)),r=e,m(e,H.hoverClass),V();var t=H.title||e.getAttribute("title");if(t){var n=R(o.bridge);n&&n.setAttribute("title",t)}var i=!0===H.forceHandCursor||"pointer"===h(e,"cursor");B(i)},D.deactivate=function(){var e=R(o.bridge);e&&(e.style.left="0px",e.style.top="-9999px",e.removeAttribute("title")),r&&(b(r,H.hoverClass),b(r,H.activeClass),r=null)};var F=function(){var t,n,r=document.getElementById("global-zeroclipboard-html-bridge");if(!r){var i=D.config();i.jsModuleId="string"==typeof d&&d||"string"==typeof c&&c||null;var a=S(e.location.host,H),s=O(i),l=H.moviePath+x(H.moviePath,H),u=['<object id="global-zeroclipboard-flash-bridge" type="application/x-shockwave-flash" width="100%" height="100%">','<param name="wmode" value="transparent" />','<param name="movie" value="',l,'" />','<param name="quality" value="best" />','<param name="allowScriptAccess" value="',a,'" />','<param name="scale" value="exactfit" />','<param name="loop" value="false" />','<param name="menu" value="false" />','<param name="flashvars" value="'+s+'" />',"</object>"].join("");r=document.createElement("div"),r.id="global-zeroclipboard-html-bridge",r.setAttribute("class","global-zeroclipboard-container"),r.style.position="absolute",r.style.left="0px",r.style.top="-9999px",r.style.width="15px",r.style.height="15px",r.style.zIndex=""+T(H.zIndex),document.body.appendChild(r),r.innerHTML=u}t=document["global-zeroclipboard-flash-bridge"],t&&(n=t.length)&&(t=t[n-1]),o.bridge=t||r.children[0].lastElementChild},R=function(e){for(var t=/^OBJECT|EMBED$/,n=e&&e.parentNode;n&&t.test(n.nodeName)&&n.parentNode;)n=n.parentNode;return n||null},V=function(){if(r){var e=w(r,H.zIndex),t=R(o.bridge);t&&(t.style.top=e.top+"px",t.style.left=e.left+"px",t.style.width=e.width+"px",t.style.height=e.height+"px",t.style.zIndex=e.zIndex+1),!0===o.ready&&o.bridge&&"function"==typeof o.bridge.setSize?o.bridge.setSize(e.width,e.height):o.ready=!1}return this};D.prototype.on=function(e,t){var n,r,i,a={},l=s[this.id]&&s[this.id].handlers;if("string"==typeof e&&e)i=e.toLowerCase().split(/\s+/);else if("object"==typeof e&&e&&void 0===t)for(n in e)e.hasOwnProperty(n)&&"string"==typeof n&&n&&"function"==typeof e[n]&&this.on(n,e[n]);if(i&&i.length){for(n=0,r=i.length;n<r;n++)e=i[n].replace(/^on/,""),a[e]=!0,l[e]||(l[e]=[]),l[e].push(t);a.noflash&&o.disabled&&X.call(this,"noflash",{}),a.wrongflash&&o.outdated&&X.call(this,"wrongflash",{flashVersion:o.version}),a.load&&o.ready&&X.call(this,"load",{flashVersion:o.version})}return this},D.prototype.off=function(e,t){var n,r,o,i,a,l=s[this.id]&&s[this.id].handlers;if(0===arguments.length)i=P(l);else if("string"==typeof e&&e)i=e.split(/\s+/);else if("object"==typeof e&&e&&void 0===t)for(n in e)e.hasOwnProperty(n)&&"string"==typeof n&&n&&"function"==typeof e[n]&&this.off(n,e[n]);if(i&&i.length)for(n=0,r=i.length;n<r;n++)if(e=i[n].toLowerCase().replace(/^on/,""),(a=l[e])&&a.length)if(t)for(o=z(t,a);-1!==o;)a.splice(o,1),o=z(t,a,o);else l[e].length=0;return this},D.prototype.handlers=function(e){var t,n=null,r=s[this.id]&&s[this.id].handlers;if(r){if("string"==typeof e&&e)return r[e]?r[e].slice(0):null;n={};for(t in r)r.hasOwnProperty(t)&&r[t]&&(n[t]=r[t].slice(0))}return n};var q=function(t,n,r,o){var i=s[this.id]&&s[this.id].handlers[t];if(i&&i.length){var a,l,u,d=n||this;for(a=0,l=i.length;a<l;a++)u=i[a],n=d,"string"==typeof u&&"function"==typeof e[u]&&(u=e[u]),"object"==typeof u&&u&&"function"==typeof u.handleEvent&&(n=u,u=u.handleEvent),"function"==typeof u&&E(u,n,r,o)}return this};D.prototype.clip=function(e){e=I(e);for(var t=0;t<e.length;t++)if(e.hasOwnProperty(t)&&e[t]&&1===e[t].nodeType){e[t].zcClippingId?-1===z(this.id,u[e[t].zcClippingId])&&u[e[t].zcClippingId].push(this.id):(e[t].zcClippingId="zcClippingId_"+l++,u[e[t].zcClippingId]=[this.id],!0===H.autoActivate&&y(e[t],"mouseover",g));var n=s[this.id].elements;-1===z(e[t],n)&&n.push(e[t])}return this},D.prototype.unclip=function(e){var t=s[this.id];if(t){var n,r=t.elements;e=void 0===e?r.slice(0):I(e);for(var o=e.length;o--;)if(e.hasOwnProperty(o)&&e[o]&&1===e[o].nodeType){for(n=0;-1!==(n=z(e[o],r,n));)r.splice(n,1);var i=u[e[o].zcClippingId];if(i){for(n=0;-1!==(n=z(this.id,i,n));)i.splice(n,1);0===i.length&&(!0===H.autoActivate&&v(e[o],"mouseover",g),delete e[o].zcClippingId)}}}return this},D.prototype.elements=function(){var e=s[this.id];return e&&e.elements?e.elements.slice(0):[]};var $=function(e){var t,n,r,o,i,a=[];if(e&&1===e.nodeType&&(t=e.zcClippingId)&&u.hasOwnProperty(t)&&(n=u[t])&&n.length)for(r=0,o=n.length;r<o;r++)(i=s[n[r]].instance)&&i instanceof D&&a.push(i);return a};H.hoverClass="zeroclipboard-is-hover",H.activeClass="zeroclipboard-is-active",H.trustedOrigins=null,H.allowScriptAccess=null,H.useNoCache=!0,H.moviePath="ZeroClipboard.swf",D.detectFlashSupport=function(){return L("ZeroClipboard.detectFlashSupport",H.debug),Z()},D.dispatch=function(e,t){if("string"==typeof e&&e){var n=e.toLowerCase().replace(/^on/,"");if(n)for(var o=r&&!0===H.autoActivate?$(r):M(),i=0,a=o.length;i<a;i++)X.call(o[i],n,t)}},D.prototype.setHandCursor=function(e){return L("ZeroClipboard.prototype.setHandCursor",H.debug),e="boolean"==typeof e?e:!!e,B(e),H.forceHandCursor=e,this},D.prototype.reposition=function(){return L("ZeroClipboard.prototype.reposition",H.debug),V()},D.prototype.receiveEvent=function(e,t){if(L("ZeroClipboard.prototype.receiveEvent",H.debug),"string"==typeof e&&e){var n=e.toLowerCase().replace(/^on/,"");n&&X.call(this,n,t)}},D.prototype.setCurrent=function(e){return L("ZeroClipboard.prototype.setCurrent",H.debug),D.activate(e),this},D.prototype.resetBridge=function(){return L("ZeroClipboard.prototype.resetBridge",H.debug),D.deactivate(),this},D.prototype.setTitle=function(e){if(L("ZeroClipboard.prototype.setTitle",H.debug),e=e||H.title||r&&r.getAttribute("title")){var t=R(o.bridge);t&&t.setAttribute("title",e)}return this},D.setDefaults=function(e){L("ZeroClipboard.setDefaults",H.debug),D.config(e)},D.prototype.addEventListener=function(e,t){return L("ZeroClipboard.prototype.addEventListener",H.debug),this.on(e,t)},D.prototype.removeEventListener=function(e,t){return L("ZeroClipboard.prototype.removeEventListener",H.debug),this.off(e,t)},D.prototype.ready=function(){return L("ZeroClipboard.prototype.ready",H.debug),!0===o.ready};var X=function(e,a){e=e.toLowerCase().replace(/^on/,"");var s=a&&a.flashVersion&&t(a.flashVersion)||null,l=r,u=!0;switch(e){case"load":if(s){if(!n(s))return void X.call(this,"onWrongFlash",{flashVersion:s});o.outdated=!1,o.ready=!0,o.version=s}break;case"wrongflash":s&&!n(s)&&(o.outdated=!0,o.ready=!1,o.version=s);break;case"mouseover":m(l,H.hoverClass);break;case"mouseout":!0===H.autoActivate&&D.deactivate();break;case"mousedown":m(l,H.activeClass);break;case"mouseup":b(l,H.activeClass);break;case"datarequested":if(l){var d=l.getAttribute("data-clipboard-target"),c=d?document.getElementById(d):null;if(c){var f=c.value||c.textContent||c.innerText;f&&this.setText(f)}else{var p=l.getAttribute("data-clipboard-text");p&&this.setText(p)}}u=!1;break;case"complete":A(i),l&&l!==k()&&l.focus&&l.focus()}return q.call(this,e,l,[this,a],u)};"function"==typeof define&&define.amd?define(["require","exports","module"],function(e,t,n){return d=n&&n.id||null,D}):"object"==typeof module&&module&&"object"==typeof module.exports&&module.exports&&"function"==typeof e.require?(c=module.id||null,module.exports=D):e.ZeroClipboard=D}(function(){return this}());