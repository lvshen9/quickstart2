/*!
 * tree component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo-linkage.com
 * Copyright 2011, WADE
 */
!function(e){"undefined"==typeof e.tree&&(e.tree=function(t,i){return new e.tree.fn.construct(t,i)},e.tree.fn={construct:function(t,i){this.id=t,this.params={},this.queue=[],e.extend(this,i)},setParam:function(e,t){this.params[e]=t},setup:function(t){t&&e.isPlainObject(t)&&e.extend(this,t)},buildParams:function(){var t=[];if(t.push("Tree_ID="+encodeURIComponent(this.id)),t.push("Tree_IsShowCheckBox="+this.isShowCheckBox),t.push("Tree_IsSearch="+this.isSearch),t.push("Tree_IsFolder="+this.isFolder),t.push("Tree_IsAsync="+this.isAsync),this.checkBoxName&&t.push("Tree_CheckBoxName="+encodeURIComponent(this.checkBoxName)),this.checkBoxType&&t.push("Tree_CheckBoxType="+encodeURIComponent(this.checkBoxType)),this.iconDir&&t.push("Tree_IconDir="+encodeURIComponent(this.iconDir)),!e.isEmptyObject(this.params))for(var i in this.params)t.push(encodeURIComponent(i)+"="+encodeURIComponent(this.params[i]));return t.join("&")},getNodeDataByDataId:function(t,i){if(t&&e.isString(t)&&i&&e.isString(i)){var n=i.split("●"),a=window["treeData_"+t];if(a&&e.isObject(a)&&n&&n.length){for(var r,o,d=0;d<n.length&&(0==d?r=a[n[d]]:r&&(o=r.childNodes,o&&e.isObject(o)&&(r=o[n[d]])),r);d++);return r}}},getParentNodeDataByDataId:function(t,i){if(t&&e.isString(t)&&i&&e.isString(i)){var n=i.split("●");return n&&n.length>=2?(n.splice(n.length-1,1),e.tree.fn.getNodeDataByDataId(t,n.join("●"))):void 0}},getNodeDataByNodeId:function(t){if(t&&e.isString(t)){var i=t.lastIndexOf("○"),n=t.substring(0,i),a=t.substring(i+1,t.length);return e.tree.fn.getNodeDataByDataId(n,a)}},getTreeNodeIdByNodeId:function(t){if(t&&e.isString(t)){var i=this.getDataIdByNodeId(t),n=i.lastIndexOf("●");return i.substring(n+1,t.length)}},getDataIdByNodeId:function(t){if(t&&e.isString(t)){var i=t.lastIndexOf("○");return t.substring(i+1,t.length)}},getTreeIdByNodeId:function(t){if(t&&e.isString(t)){var i=t.lastIndexOf("○"),n=t.substring(0,i);return n}},getCheckedNodeIds:function(t,i){if(e.isBoolean(t)?(i=t,t=this.id):void 0==t&&(t=this.id),t){var n=window[t];if(n.isShowCheckBox){var a=[];if(e("#"+t+"_ct input[name="+n.checkBoxName+"]:checked").each(function(){a.push(e.attr(this.parentNode,"id"))}),a.length>1&&i){a.sort(function(e,t){return e.lastIndexOf("●")-t.lastIndexOf("●")});for(var r,o,d=a.length-1;d>-1;d--)(r=e.tree.fn.getDataIdByNodeId(a[d]))&&(o=e.tree.fn.getParentNodeDataByDataId(t,r),o&&e.inArray(t+"○"+o.dataid,a)>-1&&a.splice(d,1))}return a}}},buildNode:function(t,i){var n=window[t];if(n){var a=[];if(i&&e.isObject(i)){var r=i.dataid,o=t+"○"+r,d="true"==""+i.haschild,s=("true"==""+i.complete,i.href,d?"fold":"file");a.push('<li id="'+o+'" class="'+s+'">\n'),a.push('<a href="#nogo" class="ico"></a>\n'),"true"==i.showcheck&&a.push('<input name="'+n.checkBoxName+'" type="'+("radio"==n.checkBoxType?"radio":"checkbox")+'" class="e_checkbox" value="'+i.value+'" '+("true"==""+i.checked?"checked":"")+" "+("true"==""+i.disabled?"disabled":"")+" />\n");var c="text",l="true"==""+i.isnew;l&&(c+=" new"),a.push('<a href="#nogo" class="'+c+'" title="'+i.text+'">'+i.text+"</a>\n"),d&&a.push("<ul></ul>"),a.push("</li>\n")}return a.join("")}},bindNodeEvent:function(t){t&&t.length&&(t.children().each(function(){e.nodeName(this,"li")&&(e("a[class=ico]:first",this).bind("click",e.tree.fn.events.onIcoClick),e("input[type=checkbox]:first,input[type=radio]:first",this).bind("click",e.tree.fn.events.onCheckBoxClick),e("a[class^=text]:first",this).bind("click",e.tree.fn.events.onTextClick))}),type=null)},unBindNodeEvent:function(t){t&&t.length&&(t.children().each(function(){e.nodeName(this,"li")&&(e("a[class=ico]:first",this).unbind("click",e.tree.fn.events.onIcoClick),e("input[type=checkbox]:first,input[type=radio]:first",this).unbind("click",e.tree.fn.events.onCheckBoxClick),e("a[class^=text]:first",this).unbind("click",e.tree.fn.events.onTextClick))}),type=null)},init:function(){function t(t){var a=t.context;"0"!=a.x_resultcode?(e("#"+i+"_loading").remove(),alert(e.lang.get("view.web.comp.tree.failload",i)+a.x_resultinfo)):(n.data=window["treeData_"+i]=t.data,e.isObject(window["treeData_"+i])&&(e("#"+i+"_loading").remove(),window[i].draw(),r&&e.isString(r)&&window[i].expandByPath(r),n.triggerInitAfterAction()))}var i=this.id,n=this;n.data=window["treeData_"+i];var a=e("#"+i+"_ct");a.hasClass("c_tree")||(a.addClass("c_tree"),a.addClass("c_tree-noborder"));var r=this.expandPath;if(n.data)window[i].draw(),r&&e.isString(r)&&window[i].expandByPath(r),this.triggerInitAfterAction();else{if(!(this.clazz||this.method||this.listener||this.componentId))return void alert(e.lang.get("view.web.comp.tree.tip"));a.append('<a id="'+i+'_loading" class="text loading">'+e.lang.get("view.web.comp.tree.loading")+"</a>"),this.clazz&&this.method?e.httphandler.post(this.clazz,this.method,this.buildParams(),t,null,{dataType:"json",simple:!0}):e.ajax.post(this.page?this.page:null,this.listener,this.buildParams(),this.componentId?this.componentId:null,t,null,{dataType:"json",simple:!0})}},empty:function(t){t=t&&1==t;var i=this.id;if(i){var n=window["treeData_"+i];if(n){var a;a=e("#"+i+"_ct ul:first"),e.tree.fn.unBindNodeEvent(a);for(var r in n)t||(n[r].complete="false"),e.tree.fn.emptyNode(i,n[r].dataid,t);e("#"+i+"_ct").empty(),t&&(delete this.data,this.data=null,window["treeData_"+i]=null),e.browser.msie&&CollectGarbage()}}},emptyNode:function(t,i,n){if(t&&e.isString(t)){var a=t+"○"+i,r=e("#"+a+" ul:first");e.tree.fn.unBindNodeEvent(r),r.children().each(function(){e.nodeName(this,"li")&&(e("a[class=ico]:first",this).remove(),e("input[type=checkbox]:first,input[type=radio]:first",this).remove(),e("a[class^=text]:first",this).remove())});var o=e.tree.fn.getNodeDataByDataId(t,i);if(o){var d=o.childNodes;if(d&&!e.isEmptyObject(d))for(var s in d)n||(d[s].complete="false"),e.tree.fn.emptyNode(t,d[s].dataid,n)}}},draw:function(){var t=this.id;if(this.data){var i=[];i.push("<ul>\n");var n=[];for(var a in this.data)this.data[a]&&e.isObject(this.data[a])&&n.push([a,this.data[a].order]);n.sort(function(e,t){return parseInt(e[1])-parseInt(t[1])});for(var r=0;r<n.length;r++)i.push(e.tree.fn.buildNode(t,this.data[n[r][0]]));n=null,i.push("</ul>\n"),e("#"+this.id+"_ct").html(i.join("")),e.tree.fn.bindNodeEvent(e("#"+this.id+"_ct ul:first"))}},expand:function(t){function i(i){return function(n){var a=e.tree.fn.getTreeIdByNodeId(i),r=e.tree.fn.getNodeDataByNodeId(i);a&&(window[a].asyncLoading=!1);var o=n.context;if("0"!=o.x_resultcode)window[a].queue.length=0,e("#"+t+" a[class^=text]:first").removeClass("loading"),alert(e.lang.get("view.web.comp.tree.error",a,o.x_resultcode,o.x_resultinfo));else{if(n.data&&e.isObject(n)&&r)return r.childNodes=n.data,void e.tree.fn.expand(i);e("#"+t+" a[class^=text]:first").removeClass("loading")}e.browser.msie&&CollectGarbage()}}var n=e.tree.fn.getTreeIdByNodeId(t),a=e.tree.fn.getNodeDataByNodeId(t);if(n&&a){if("true"==""+a.haschild&&"false"==""+a.complete){var r=window[n];if(r.isAsync&&r.asyncLoading)return void alert(e.lang.get("view.web.comp.tree.loadnow"));e("#"+t+" a[class^=text]:first").addClass("loading");var o,d=[];if(r.isAsync&&!a.childNodes){var s=r.buildParams();return s+="&Tree_Parent_NodeID="+encodeURIComponent(a.id),s+="&Tree_Parent_DataID="+encodeURIComponent(a.dataid),s+="&Tree_Parent_GroupID="+(null!=a.groupid&&void 0!=a.groupid?encodeURIComponent(a.groupid):""),s+="&Tree_Parent_isChecked="+encodeURIComponent(a.checked),r.asyncLoading=!0,void(r.clazz&&r.method?e.httphandler.post(r.clazz,r.method,s,i(t),null,{dataType:"json",simple:!0}):e.ajax.post(r.page?r.page:null,r.listener,s,r.componentId?r.componentId:null,i(t),null,{dataType:"json",simple:!0}))}if(o=a.childNodes,o&&e.isObject(o)){var c=[];for(var l in o)o[l]&&e.isObject(o[l])&&c.push([l,o[l].order]);c.sort(function(e,t){return parseInt(e[1])-parseInt(t[1])});for(var h=0;h<c.length;h++)d.push(e.tree.fn.buildNode(n,o[c[h][0]]));c=null;var f=e("#"+t+" ul:first");f.html(d.join("")),e.tree.fn.bindNodeEvent(f),e("#"+t+" a[class^=text]:first").removeClass("loading"),a.complete="true"}else alert(e.lang.get("view.web.comp.tree.nochild")),e("#"+t+" a[class^=text]:first").removeClass("loading")}e("#"+t).removeClass("fold"),e("#"+t).addClass("unfold");var u=window[n].queue;if(u.length)for(var h=u.length-1;h>=0;h--)u[h]==t&&u.splice(h,1);var p,g;(p=window[n].lastExpandNodeId)&&t==p&&(g=window[n].expandByPathCallback)&&e.isFunction(g)&&(g(a),window[n].lastExpandNodeId=null),p=null,e.browser.msie&&CollectGarbage()}},reloadData:function(e){if(e)for(var t in e){var i="true"==""+e[t].complete;if(i){e[t].complete="false";var n="true"==""+e[t].haschild;n&&e[t].childNodes&&this.reloadData(e[t].childNodes)}}},bindData:function(t,i){var n=(e.tree.fn.getTreeIdByNodeId(t),e.tree.fn.getNodeDataByNodeId(t));if(n&&i){var a="true"==""+n.haschild;n.childNodes?(this.reloadData(n.childNodes),e.extend(n.childNodes,i)):n.childNodes=i,a||(e("#"+t).append("<ul></ul>"),e("#"+t).attr("class","fold"),n.haschild="true"),n.complete="false",e.tree.fn.expand(t)}},expandQueue:function(e){var t=window[e];t&&(t.queue.length?(t.asyncLoading||t.expand(t.queue[0]),t.timer=setTimeout("$.tree.fn.expandQueue('"+e+"');",500)):t.timer&&clearTimeout(t.timer))},expandByPath:function(t,i,n,a){if(1==arguments.length?(i=t,t=this.id):2==arguments.length&&(n=i,i=t,t=this.id,e.isFunction(n)&&(a=n,n=null)),!t||!e.isString(t))return void alert("expandByPath:"+e.lang.get("view.web.comp.tree.noobj"));if(!i||!e.isString(i))return void alert("expandByPath:"+e.lang.get("view.web.comp.tree.notnull"));n&&e.isString(n)||(n="-");var r=window[t];if(r){e.isFunction(a)&&(r.expandByPathCallback=a);for(var o,d=i.split(n),s=[],c=0;c<d.length;c++)s.push(d[c]),o=r.id+"○"+s.join("●"),c==d.length-1&&(r.lastExpandNodeId=o),r.isAsync?r.queue.push(o):e.tree.fn.expand(o);r.isAsync&&e.tree.fn.expandQueue(r.id)}else alert("expandByPath:"+e.lang.get("view.web.comp.tree.noobj"))},collapse:function(t){var i=e.tree.fn.getTreeIdByNodeId(t),n=e.tree.fn.getNodeDataByNodeId(t);i&&n&&(e("#"+t).removeClass("unfold"),e("#"+t).addClass("fold"))},triggerNode:function(t){if(t){var i=e("#"+t).hasClass("unfold");i?e.tree.fn.collapse(t):e.tree.fn.expand(t)}},clickNode:function(t){var i=e.tree.fn.getTreeIdByNodeId(t),n=e.tree.fn.getNodeDataByNodeId(t);if(n){var a=window[i];if(a.isShowCheckBox&&"true"!=""+n.haschild&&(a.lastClickNodeId&&e("#"+a.lastClickNodeId+" a[class^=text]").removeClass("on"),e("#"+t+" a[class^=text]").addClass("on"),a.lastClickNodeId=t,"true"==n.showcheck)){var r=e("#"+t+" input[type!=text]:first");r.length&&(r.data("text_trigger",!0),r.trigger("click"))}}},checkNode:function(t,i,n){var a=e.tree.fn.getTreeIdByNodeId(t),r=e.tree.fn.getNodeDataByNodeId(t);if(r&&window[a]&&window[a].isShowCheckBox){var o,d=window[a].checkBoxType,s=r.checked;if("radio"==d){r.checked="true";var c=window[a].lastCheckedNodeId;if(c&&c!=t){var l=e.tree.fn.getNodeDataByNodeId(c);l&&(l.checked="false")}}else if("checkbox"==d){if(o=n?n:"true"==s?"false":"true",r.checked=o,i||e("#"+t+" input[type=checkbox]:first").attr("checked","true"==o),"true"==r.haschild){var h=r.childNodes;if(h&&e.isObject(h)){var f,u;for(var p in h)u=h[p],e.isObject(u)&&(f=a+"○"+u.dataid,setTimeout("$.tree.fn.checkNode('"+f+"',false,'"+o+"')",0))}}var g,v,w,N;for(w=r.id,N=r.dataid;(g=e.tree.fn.getParentNodeDataByDataId(a,N))&&0!=g.showcheck;){if(v=a+"○"+g.dataid,"false"==o)g.checked="false",e("#"+v+" input[type!=text]:first").attr("checked",!1);else if("true"==o){var u,x=!0,h=g.childNodes;if(h&&e.isObject(h))for(var p in h)if(u=h[p],w!=u.id&&"true"!=u.checked){x=!1;break}if(0==x)break;if(!x)break;g.checked="true",e("#"+v+" input[type!=text]:first").attr("checked",!0)}w=g.id,N=g.dataid}}window[a].lastCheckedNodeId=t}},triggerCheckBoxAction:function(t){var i=e.tree.fn.getNodeDataByNodeId(t),n=e.tree.fn.getTreeIdByNodeId(t);return!this.checkBoxAction||!e.isString(this.checkBoxAction)||new Function("var nodedata=arguments[0];var treeid=arguments[1];return "+this.checkBoxAction)(i,n)},triggerTextAction:function(t){var i=e.tree.fn.getNodeDataByNodeId(t),n=e.tree.fn.getTreeIdByNodeId(t);return!this.textAction||!e.isString(this.textAction)||new Function("var nodedata=arguments[0];var treeid=arguments[1];return "+this.textAction)(i,n)},triggerInitAfterAction:function(){this.initAfterAction&&(e.isString(this.initAfterAction)?new Function(this.initAfterAction)():e.isFunction(this.initAfterAction)&&this.initAfterAction())},events:{onIcoClick:function(){var t=e(this).parent();if(t&&t.length){var i=t.attr("id"),n=e.tree.fn.getNodeDataByNodeId(i),a="true"==""+n.haschild;a&&e.tree.fn.triggerNode(i)}},onCheckBoxClick:function(){var t=e(this).parent();if(t&&t.length){var i=t.attr("id"),n=e.tree.fn.getTreeIdByNodeId(i),a=e.tree.fn.getNodeDataByNodeId(i),r="checkbox"==e.attr(this,"type"),o=e.data(this,"text_trigger"),d=e.attr(this,"checked");a.checked;return r&&(a.checked=""+(o?d:!d)),e.removeData(this,"text_trigger"),!!window[n].triggerCheckBoxAction(i)&&(e.tree.fn.checkNode(i,!0),!0)}},onTextClick:function(){var t=e(this).parent();if(t&&t.length){var i=t.attr("id"),n=e.tree.fn.getTreeIdByNodeId(i),a=e.tree.fn.getNodeDataByNodeId(i),r="true"==""+a.haschild;return r?void(window[n].triggerTextAction(i)&&window[n].triggerNode(i)):!!window[n].triggerTextAction(i)&&(e.tree.fn.clickNode(i),!0)}}}},e.tree.fn.construct.prototype=e.tree.fn)}(Wade);