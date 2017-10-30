/*!
 * tabset component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(t,e,i){"use strict";function n(t){return""===o?t:(t=t.charAt(0).toUpperCase()+t.substr(1),o+t)}if(t&&"undefined"==typeof t.Tabset){var a=Array.prototype.splice,r=Math,s=i.createElement("div").style,o=function(){for(var t="t,webkitT,MozT,msT,OT".split(","),e=0,i=t.length;e<i;e++)if(t[e]+"ransform"in s)return t[e].substr(0,t[e].length-1);return!1}(),l=o?"-"+o.toLowerCase()+"-":"",d=n("transform"),c=n("transitionProperty"),u=n("transitionDuration"),f=n("transformOrigin"),m=n("transitionTimingFunction"),v=(n("transitionDelay"),n("perspective")in s),b="undefined"!=typeof t.hasTouch?t.hasTouch:"ontouchstart"in e,p=!1!==o,h=n("transition")in s,_="onorientationchange"in e?"orientationchange":"resize",g=b?"touchstart":"mousedown",T=b?"touchmove":"mousemove",x=b?"touchend":"mouseup",y=b?"touchcancel":"mouseup",w=function(){return!1!==o&&{"":"transitionend",webkit:"webkitTransitionEnd",Moz:"transitionend",O:"otransitionend",ms:"MSTransitionEnd"}[o]}(),S=function(){return e.requestAnimationFrame||e.webkitRequestAnimationFrame||e.mozRequestAnimationFrame||e.oRequestAnimationFrame||e.msRequestAnimationFrame||function(t){return setTimeout(t,1)}}(),I=function(){return e.cancelRequestAnimationFrame||e.webkitCancelAnimationFrame||e.webkitCancelRequestAnimationFrame||e.mozCancelRequestAnimationFrame||e.oCancelRequestAnimationFrame||e.msCancelRequestAnimationFrame||clearTimeout}(),X=v?" translateZ(0)":"",N=t.os.phone||!0===t.ratioPhone,F=null,L=function(e,n){var a=this;a.el=e&&1==e.nodeType?e:i.getElementById(e),a.el&&a.el.nodeType&&t.nodeName(a.el,"div")&&(a.id=t.attr(a.el,"id"))&&(n&&t.isObject(n)&&t.extend(a,n),t.attr(a.el,"x-wade-uicomponent")||t.attr(a.el,"x-wade-uicomponent","tabset"),a._init(),a.constructor.call(a))};L.prototype=t.extend(new t.UIComponent,{handleEvent:function(t){var e=this;switch(t.type){case g:if(!b&&0!==t.button)return;e._start(t);break;case T:e._move(t);break;case x:case y:e._end(t);break;case _:e._resize();break;case w:e._transitionEnd(t)}},updateTitle:function(e){var i=this;e&&t.isString(e)&&t("#"+i.id+"_tab_title_text").text(e)},updateTitleTip:function(e){var i=this;e!=undefined&&null!=e&&t("#"+i.id+"_tab_title_tip_tag").text(e)},add:function(i,n){var a=this;if(!i||!t.isString(i))return-1;if(!n||!t.isPlainObject(n))return-1;if(a.contents.length>=20)return-1;i=t.xss(i);var r=t.extend({},n),s=r.html&&t.isString(r.html),o=r.page&&t.isString(r.page);if(!s&&!o)return-1;var l=a.contents.length,d=a.id+"_"+l;t(a.tabUl).append('<li id="'+a.id+"_tab_li_"+l+'" idx="'+l+'">'+i+"</li>");var c=[];c.push('\r\n<div title="'+i+'" class="content" idx="'+l+'" style="'+(a.width?"width:"+a.width+"px":"")+'">'),s?c.push(r.html):o&&(c.push('<iframe id="frame_'+d+'" style="width:100%;height:100%;display:none" frameborder="0"></iframe>'),c.push('<div class="c_msg c_msg-full c_msg-loading">'),c.push('<div class="wrapper">'),c.push('<div class="emote"></div>'),c.push('<div class="info"><div class="text"><div class="title">loading</div></div></div>'),c.push("</div>"),c.push("</div>")),c.push("\r\n</div>"),t(a.page).append(c.join("")),c=null;var u=t(a.page).children("div[idx="+l+"]");u&&u.length&&(a.titles[l]=i,a.contents.push(u[0]),a.frameSize++),u=null;var f=a.el.className?a.el.className:"";return f=t.trim((" "+f+" ").replace(/ c_tab-slide-\d+ /g," "))+" c_tab-slide-"+(l+1),a.el.className=f,o&&(t.Frame||e.includeScript(t.UI_FRAME_JS,!0,!0),e["frame_"+d]=new Wade.Frame("frame_"+d,{autoInit:!1,title:i,page:r.page,listener:r.listener,params:r.params,subsys:r.subsys})),l},remove:function(e){var i=this;if(!e||!t.isString(e))return-1;i._findIdxByTitle(e)},switchTo:function(e,n,a){var s=this;if(/^\d+$/.test(e)&&s.activeIdx!=e){e=parseInt(e);var o,l;if((o=s.contents[e])&&o.nodeType){if(!0!==a)if(!1===s.slidable||s.vertical){if(typeof s.activeIdx!=undefined){var d=s.contents[s.activeIdx];d&&d.nodeType&&(d.style.display="none")}o.style.display=""}else{var c=r.abs(e*s.width);s.useTouchSwitch?s.scrollTo(0-c,0,0):s.page.style.left=0-c+"px"}setTimeout(function(){A(o,s.id),D(o),z(o)},n||0)}if(l=i.getElementById(s.id+"_tab_li_"+s.activeIdx),l&&l.nodeType&&(l.className=""),(l=i.getElementById(s.id+"_tab_li_"+e))&&l.nodeType&&(l.className="on",s.tabScroller)){var u=0-l.offsetLeft;u=r.max(u,s.tabScroller.maxScrollX),s.tabScroller.scrollTo(u,0,200)}l=null,s.activeIdx=e,setTimeout(function(){t.event.trigger("afterSwitchAction",e,s.el)},n||0)}},switchToByTitle:function(t){var e=this;e.switchTo(e._findIdxByTitle(t))},privFrame:function(){var t=this,e=0,i=t.activeIdx-1;if(!(i<0||i>t.frameSize-1)){if(t.useTouchSwitch){var n=i*t.width,e=r.abs(r.round(t.width/2));t.scrollTo(0-r.abs(n),0,e)}return t.switchTo(i,e,!!e),!0}var a=E(t.el);if(a&&a.activeIdx>0)return a.privFrame()},nextFrame:function(){var t=this,e=t.activeIdx+1;if(!(e<0||e>t.frameSize-1)){if(t.useTouchSwitch){var i=e*t.width,n=r.abs(r.round(t.width/2));t.scrollTo(0-r.abs(i),0,n)}return t.switchTo(e,n,!!n),!0}var a=E(t.el);if(a&&a.activeIdx<a.frameSize-1)return a.nextFrame()},adjust:function(e){var i=this;if(!i.vertical){if(!1!==i.slidable){if(i.width=i.el.offsetWidth,i.contents&&i.contents.length)for(var n=0;n<i.contents.length;n++)i.contents[n].style.width=i.width+"px";if(1==e&&i.activeIdx>-1){var a=r.abs(i.activeIdx*i.width);i.useTouchSwitch?i.scrollTo(0-a,0,0):i.page.style.left=0-a+"px"}}var s=0;t(i.tab).children("div.fn").each(function(){s+=this.offsetWidth}),i.tabUlWidth=t(i.tabUl).width(),t("#"+i.id+"_move_fn").css("display",i.width-s<i.tabUlWidth?"":"none")}},destroy:function(){var t=this;e.clearInterval(t.tabLeftInterval),t.tabLeftInterval=null,e.clearInterval(t.tabRightInterval),t.tabRightInterval=null,F=null;for(var n in t.titles)delete t.titles[n];t.titles=null;for(var r=0;r<t.contents.length;r++)a.call(t.contents,r--,1);t.contents=null,t.tabScroller&&t.tabScroller.destroy(),t.page.style[d]="",t._unbind(_,e),t._unbind(g),t._unbind(T,i),t._unbind(x,i),t._unbind(y,i),t.tab=null,t.tabList=null,t.tabUl=null,t.page=null,t.el=null},_init:function(){var n=this;n.tab=t(n.el).children("div.tab:first")[0],n.tabList=t(n.tab).children("div.list:first")[0],n.tabUl=t(n.tabList).children("ul:first")[0],n.page=t(n.el).children("div.page:first")[0];var a=n.el.className?n.el.className:"";n.vertical=(" "+a+" ").indexOf(" c_tab-v ")>-1,n.scale=1,n.useTransform=p,n.useTransition=h,n.x=0,n.y=0,n.aniTime=null,n.frameSize=0,n.useTouchSwitch=!n.vertical&&!1!==n.slidable&&(b||N),n.titles={},n.contents=[],n.activeIdx=-1,n.useTouchSwitch&&(n.page.style[c]=n.useTransform?l+"transform":"top left",n.page.style[u]="0",n.page.style[f]="0 0",n.useTransition&&(n.page.style[m]="cubic-bezier(0.33,0.66,0.66,1)"),n.useTransform?n.page.style[d]="translate("+n.x+"px,"+n.y+"px)"+X:n.page.style.cssText+=";position:absolute;left:"+n.x+"px");var r,s,o,v,T,x,y;o=n.page.childNodes;var w=t(n.tabUl).children("li");if(o&&o.length>0)for(r=s=0;s<o.length;)T=o[s],T&&T.nodeType&&t.nodeName(T,"div")&&(" "+T.className+" ").indexOf(" content ")>-1&&(y!=undefined||"none"==T.style.display&&"true"!=t.attr(T,"default")||(y=r),!1===n.slidable||n.vertical?"none"!=T.style.display&&y!=r&&(T.style.display="none"):"none"==T.style.display&&(T.style.display=""),t.attr(T,"idx",r),n.contents.push(T),v=t.attr(T,"title"),v||(v=t.lang.get("ui.component.tabset.unamed.tab")+r),n.titles[r]=v,(x=w[r])?""==t.trim(x.innerHTML)&&(x.innerHTML=v):(x=document.createElement("li"),x.innerHTML=v,n.tabUl.appendChild(x)),t.attr(x,"id",n.id+"_tab_li_"+r),t.attr(x,"idx",r),r++),s++;if(w=null,n.frameSize=n.contents.length,!1!==n.slidable&&!n.vertical){var a=n.el.className?n.el.className:"";a=t.trim((" "+a+" ").replace(/ c_tab-slide-\d+ /g," "))+" c_tab-slide-"+r,n.el.className=a}if(y==undefined&&n.contents.length>0?(y=0,T=n.contents[0]):T=n.contents[y],t.isNumeric(y)&&(x=i.getElementById(n.id+"_tab_li_"+y))&&x.nodeType&&(x.className="on"),A(T),o=T=x=null,n.activeIdx=y,!b&&!N){var S=[];S.push('<div id="'+n.id+'_move_fn" class="fn ctrl">'),S.push('<button id="'+n.id+'_moveleft_btn" class="e_button-r e_button-blue"><span class="e_ico-back"></span></button>'),S.push('<button id="'+n.id+'_moveright_btn" class="e_button-r e_button-blue"><span class="e_ico-next"></span></button>'),S.push("</div>");var I=t(n.tab).children("div.fn:first");I&&I.length?I.before(S.join("")):t(n.tab).append(S.join("")),I=null,S=null}t(n.page).children("div.fn:first").appendTo(n.tab),n.adjust(),(b||N)&&(n.tabScroller=new t.Scroll(n.tabList,{bounce:!0,vScroll:n.vertical,hScrollbar:!1,vScrollbar:!1})),!1!==n.slidable&&!n.vertical&&t.isNumeric(y)&&(n.page.style.left=0-y*n.width+"px"),t(n.tabUl).tap(function(e){e.originalEvent&&(e=t.event.fix(e.originalEvent));var i=e.target;if(i&&i.nodeType){for(var a=0;a<5&&!t.nodeName(i,"li")&&(i=i.parentNode,!t.nodeName(i,"li"));)a++;var r;if(t.nodeName(i,"li")&&0==(""+t.attr(i,"id")).indexOf(n.id)&&(r=t.attr(i,"idx"))){if(!1===t.event.trigger("switchAction",r,n.el))return!1;n.switchTo(r)}}});var L=function(i){F||n.tabLeftInterval||(n.tabLeftInterval=e.setInterval(function(){var i=t(n.tabUl),a=i.css("left");a&&(a=parseInt(a)),!a||a>=1e5?(e.clearInterval(n.tabLeftInterval),n.tabLeftInterval=null,F=null):i.css("left",Math.min(a+5,1e5)+"px"),i=null},5),F=n.id)},E=function(){F||n.tabRightInterval||(n.tabRightInterval=e.setInterval(function(){var i=n.tabUl.offsetWidth,a=n.tabList.offsetWidth,r=i-a,s=t(n.tabUl),o=s.css("left");o&&(o=parseInt(o)),!o||o<=1e5-r?(e.clearInterval(n.tabRightInterval),n.tabRightInterval=null,F=null):s.css("left",Math.max(o-5,1e5-r)+"px"),s=null},5),F=n.id)};b||(t("#"+n.id+"_moveleft_btn").bind("mousedown",function(){n.tabUl.offsetWidth<n.tabList.offsetWidth||L()}),t("#"+n.id+"_moveright_btn").bind("mousedown",function(){n.tabUl.offsetWidth<n.tabList.offsetWidth||E()})),n._bind(_,e),n.useTouchSwitch&&n._bind(g)},_findIdxByTitle:function(e){var i=this;if(e&&t.isString(e))for(var n in i.titles)if(i.titles[n]==e)return n},_bind:function(t,e,n){var a=this;i.addEventListener&&(e||a.page).addEventListener(t,a,!!n)},_unbind:function(t,e,n){var a=this;i.removeEventListener&&(e||a.page).removeEventListener(t,a,!!n)},_pos:function(t,e){var i=this;i.useTransform?i.page.style[d]="translate("+t+"px,"+e+"px) scale("+i.scale+")"+X:(t=r.round(t),e=r.round(e),this.page.style.left=t+"px",this.page.style.top=e+"px"),i.x=t,i.y=e},_start:function(e){var n=this,a=b?e.touches[0]:e,r=e.target;if(r){r="tagName"in r?r:r.parentNode;var s=E(r);if(!s||s!=n)return;if(1==r.nodeType&&r.nodeName&&(t.nodeName(r,"input")||t.nodeName(r,"select")||t.nodeName(r,"textarea")))return}n.useTransition&&n._transitionTime(0),n.moved=!1,n.animating=!1,n.distX=0,n.distY=0,n.absDistX=0,n.absDistY=0,n.dirX=0,n.dirY=0,n.absStartX=n.x,n.absStartY=n.y,n.startX=n.x,n.startY=n.y,n.pointX=a.pageX,n.pointY=a.pageY,n.startTime=e.timeStamp||Date.now(),n._bind(T,i),n._bind(x,i),n._bind(y,i)},_move:function(e){var i=this,n=b?e.touches[0]:e,a=n.pageX-i.pointX,s=n.pageY-i.pointY,o=i.x+a,l=(i.y,e.timeStamp||Date.now());if(i.pointX=n.pageX,i.pointY=n.pageY,i.distX+=a,i.distY+=s,i.absDistX=r.abs(i.distX),i.absDistY=r.abs(i.distY),!(i.absDistX<6&&i.absDistY<6)){i.moved=!0,i.dirX=a>0?-1:a<0?1:0,l-i.startTime>300&&(i.startTime=l,i.startX=i.x);var d=r.abs((i.frameSize-1)*i.width);if(o>0||o<0-d)return void(o=i.x+a/2);if(i.absDistX<i.absDistY)return void(i.moved=!1);if(t.Scroll&&t.Scroll.parentWrapper){var c=t.Scroll.parentWrapper(e.target);if(c&&c.nodeType&&"true"==c.getAttribute("hScroll"))return void(i.moved=!1)}i._pos(o,0)}},_end:function(e){var n=this;if(!b||0===e.touches.length){var a,s=(b&&e.changedTouches[0],e.timeStamp||Date.now(),n.startTime,n.x);if(n._unbind(T,i),n._unbind(x,i),n._unbind(y,i),!(n.frameSize<=0)){if(!n.moved)return void n._resetPos(400);if(r.abs(n.distX)<t.format.rem2px(.8))return void n._resetPos(200,!0);if(a=s-n.absStartX,n.snapThreshold&&r.abs(a)<n.snapThreshold)return void n.scrollTo(n.absStartX,0,200);if(n.dirX<0){if(1==n.privFrame())return}else if(n.dirX>0&&1==n.nextFrame())return;n._resetPos(200)}}},_resize:function(){this.adjust(!0)},_transitionEnd:function(t){var e=this;t.target==e.page&&(e._unbind(w),e._startAni())},_transitionTime:function(t){var e=this;t+="ms",e.page.style[u]=t},_resetPos:function(t,e){var i=this,n=r.abs((i.frameSize-1)*i.width),a=i.x>=0?0:i.x<0-n?0-n:i.x;if(1==e&&i.activeIdx>-1&&(a=0-r.abs(i.activeIdx*i.width)),a==i.x)return void(i.moved&&(i.moved=!1));i.scrollTo(a,0,t||0)},scrollTo:function(t,e,i,n){var a,r,s=this,o=t;for(s.stop(),o.length||(o=[{x:t,y:e,time:i,relative:n}]),a=0,r=o.length;a<r;a++)o[a].relative&&(o[a].x=s.x-o[a].x,o[a].y=s.y-o[a].y),s.steps.push({x:o[a].x,y:o[a].y,time:o[a].time||0});s._startAni()},stop:function(){var t=this;t.useTransition?t._unbind(w):I(t.aniTime),t.steps=[],t.moved=!1,t.animating=!1},_startAni:function(){var t,e,i,n=this,a=n.x,s=n.y,o=Date.now();if(!n.animating){if(!n.steps.length)return void n._resetPos(400);if(t=n.steps.shift(),t.x==a&&t.y==s&&(t.time=0),n.animating=!0,n.moved=!0,n.useTransition)return n._transitionTime(t.time),n._pos(t.x,t.y),n.animating=!1,void(t.time?n._bind(w):n._resetPos(0));i=function(){var l,d,c=Date.now();if(c>=o+t.time)return n._pos(t.x,t.y),n.animating=!1,void n._startAni();c=(c-o)/t.time-1,e=r.sqrt(1-c*c),l=(t.x-a)*e+a,d=(t.y-s)*e+s,n._pos(l,d),n.animating&&(n.aniTime=S(i))},i()}}}),L.FramePage=function(){var e=this;if(t.isSameDomain(parent)&&!t.isSamePage(parent)&&parent.Wade&&parent.Wade.Tabset){var i=t.getParentIframe();i&&i.nodeType&&(e.tabset=parent.Wade.Tabset.findParentTabset(i),e.tabset&&e.tabset.useTouchSwitch&&(e.x=0,e.y=0,e._bind(g)))}},L.FramePage.prototype={handleEvent:function(t){var e=this;switch(t.type){case g:if(!b&&0!==t.button)return;e._start(t);break;case T:e._move(t);break;case x:case y:e._end(t)}},destroy:function(){var t=this;t._unbind(g),t._unbind(T,i),t._unbind(x,i),t._unbind(y,i)},_bind:function(t,n,a){var r=this;i.addEventListener&&(n||e).addEventListener(t,r,!!a)},_unbind:function(t,n,a){var r=this;i.removeEventListener&&(n||e).removeEventListener(t,r,!!a)},_start:function(e){var n=this,a=b?e.touches[0]:e,r=e.target;r&&(r="tagName"in r?r:r.parentNode,n.targetTaset=E(r),n.targetTasetStartIdx=n.targetTaset.activeIdx,1==r.nodeType&&r.nodeName&&(t.nodeName(r,"input")||t.nodeName(r,"select")||t.nodeName(r,"textarea")))||(n.moved=!1,n.distX=0,n.absDistX=0,n.dirX=0,n.absStartX=n.x,n.startX=n.x,n.pointX=a.pageX,n.startTime=e.timeStamp||Date.now(),n._bind(T,i),n._bind(x,i),n._bind(y,i))},_move:function(t){var e=this,i=b?t.touches[0]:t,n=i.pageX-e.pointX,a=t.timeStamp||Date.now();e.pointX=i.pageX;var s=e.tabset.x+e.distX;if(e.distX+=n,e.absDistX=r.abs(e.distX),!(e.absDistX<6)){var o=r.abs((e.tabset.frameSize-1)*e.tabset.width);(s>0||s<0-o)&&(s=e.tabset.x+e.distX/2),e.moved=!0,e.dirX=n>0?-1:n<0?1:0,a-e.startTime>300&&(e.startTime=a,e.startX=e.x)}},_end:function(e){var n=this;if(!(b&&0!==e.touches.length||(n._unbind(T,i),n._unbind(x,i),n._unbind(y,i),n.tabset.frameSize<=0))){if(!n.moved)return void n.tabset._resetPos(400);if(r.abs(n.distX)<t.format.rem2px(.8))return void n.tabset._resetPos(200,!0);if(n.dirX<0){if(n.targetTaset&&n.targetTasetStartIdx>0)return;if(1==n.tabset.privFrame())return}else if(n.dirX>0){if(n.targetTaset&&n.targetTasetStartIdx<n.targetTaset.frameSize-1)return;if(1==n.tabset.nextFrame())return}n.tabset._resetPos(200)}}};var E=function(n){if(n&&n.nodeType){for(var a,r,s=0,o=n.parentNode,l=!1;s<50&&o!=i.documentElement;){if(o&&o.nodeType&&t.nodeName(o,"div")&&"tabset"==t.attr(o,"x-wade-uicomponent")&&(a=t.attr(o,"id"))){l=!0;break}o=o.parentNode,s++}return l&&a&&(r=e[a])&&r instanceof L?r:void 0}},A=function(i,n){if(t.Frame&&t.isFunction(t.Frame)&&t.Frame.prototype._init){var a,r;t("iframe[x-wade-uicomponent=frame]",i).each(function(){a=t.attr(this,"id"),(r=e[a])&&r instanceof t.Frame&&(r.setAttribute("tabsetId",n),!0!==r.inited?setTimeout("window['"+a+"'].init()",1):setTimeout("window['"+a+"'].adjust()",1))})}},D=function(i){if(t.Scroller&&t.isFunction(t.Scroller)&&t.Scroller.prototype._init){var n,a;t("div[x-wade-uicomponent=scroller]",i).each(function(){n=t.attr(this,"id"),(a=e[n])&&a instanceof t.Scroller&&setTimeout("window['"+n+"'].refresh()",1)})}},z=function(i){if(t.Table&&t.isFunction(t.Table)&&t.Table.prototype._init){var n,a;t("div[x-wade-uicomponent=table]",i).each(function(){n=t.attr(this,"id"),(a=e[n])&&a instanceof t.Table&&setTimeout("window['"+n+"'].adjust()",1)})}};t.extend(L,{findParentTabset:function(t){return E(t)}}),b||t(function(){t(i.body).bind("mouseup",function(t){var i;F&&(i=e[F])&&(e.clearInterval(i.tabLeftInterval),i.tabLeftInterval=null,e.clearInterval(i.tabRightInterval),i.tabRightInterval=null),F=null})}),s=null,e.Tabset=t.Tabset=L}}(window.Wade,window,document);