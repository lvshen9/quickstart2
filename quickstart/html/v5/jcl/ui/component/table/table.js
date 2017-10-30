/*!
 * table component
 * http://www.wadecn.com/
 * auth:xiedx@asiainfo.com
 * Copyright 2015, WADE
 */
!function(e,t,l){"use strict";if(e&&"undefined"==typeof e.Table){var a=Array.prototype.push,o=(Array.prototype.splice,e.os.phone||!0===e.ratioPhone),d=/^[0-9]+$/,i={add:"0",upd:"2",del:"1"},n="_nocol",r=[],s=function(t,a){var o=this;o.el=t&&1==t.nodeType?t:l.getElementById(t),o.el&&o.el.nodeType&&(o.id=e.attr(o.el,"id"))&&(a&&e.isObject(a)&&e.extend(o,a),e.attr(o.el,"x-wade-uicomponent")||e.attr(o.el,"x-wade-uicomponent","table"),o._init(),o.constructor.call(o))};s.prototype=e.extend(new e.UIComponent,{getData:function(t,l){var a=this;if(!a.head||!a.bodyTableBody)return null;t&&e.isString(t)&&(l=t,t=!1),l&&e.isString(l)&&(l=","+l+",");var o,d,i,r,s=new e.DatasetList;return e.each(a.bodyTableBody.rows,function(f,u){if(((r=e.attr(u,"status"))==undefined||null==r)&&(r="",!0!==t))return!0;var c=new e.DataMap;for(o in a.head)0!=o.indexOf(n)&&(i=a.head[o][0])!=undefined&&(!l||l.indexOf(","+o+",")>-1)&&(d=u.cells[i],c.put(o,p(d)));c.put("tag",r),s.add(c)}),o=d=i=null,s},getRowData:function(t,l){var a=this;if(!d.test(t))return null;if(!a.head||!a.bodyTableBody)return null;l&&e.isString(l)&&(l=","+l+",");var o=a.bodyTableBody.rows[t];if(!o||!o.nodeType)return null;var i,r,s,f=new e.DataMap,u=e.attr(o,"status");u!=undefined&&null!=u||(u="");for(i in a.head)0!=i.indexOf(n)&&(s=a.head[i][0])!=undefined&&(!l||l.indexOf(","+i+",")>-1)&&(r=o.cells[s],f.put(i,p(r)));return f.put("tag",u),i=r=s=null,o=null,f},getSelectedRowData:function(e){var t=this;return t.getRowData(t.selected,e)},getCheckedRowsData:function(t,l){var a=this;if(!t||!e.isString(t))return null;if(!a.head||!a.bodyTableBody)return null;l&&e.isString(l)&&(l=","+l+",");var o=e("input[name="+t+"]:checked",a.bodyTableBody);if(!o.length)return null;var d,i,r,s,f,c=new e.DatasetList;return o.each(function(){if(i=u(this)){var t=new e.DataMap;f=e.attr(i,"status"),f!=undefined&&null!=f||(f="");for(d in a.head)0!=d.indexOf(n)&&(s=a.head[d][0])!=undefined&&(!l||l.indexOf(","+d+",")>-1)&&(r=i.cells[s],t.put(d,p(r)));t.put("tag",f),c.add(t)}}),d=r=s=i=o=null,c},addRow:function(t,l){var a=this;if(e.isObject(t)&&!e.isEmptyObject(t)&&a.head&&a.bodyTableBody){var o,r=t._className?t._className:"new",s=[];s.push('<tr status="'+i.add+'" '),r&&e.isString(r)&&s.push(' class="'+r+'" '),s.push(" >");for(var f in a.head)r=a.head[f][1],o=a.head[f][2],s.push("<td"+(r?' class="'+r+'" ':"")+(!1===o?' style="display:none;" ':"")+">"),0!=(""+f).indexOf(n)&&s.push(t.hasOwnProperty(f)?t[f]:""),s.push("</td>");s.push("</tr>"),!0===l?(d.test(a.selected)&&a.selected++,e(a.bodyTableBody).prepend(s.join(""))):e(a.bodyTableBody).append(s.join("")),s=null,setTimeout("window['"+a.id+"'].adjust(true, false);",1)}},deleteRow:function(t,l){var a=this;if(t&&1==t.nodeType)return void a.deleteRow(e.inArray(u(t),a.bodyTableBody.rows));if(d.test(t)&&!(t<0)&&a.bodyTableHead&&a.bodyTableBody){var o=a.bodyTableBody.rows[t];if(!o||!o.nodeType)return;var n,r=e.attr(o,"status");r==undefined||i.upd==r?(e.attr(o,"status",i.del),n=o.className?o.className:"",(" "+n+" ").indexOf(" deleted ")<0&&(o.className=e.trim(n+" deleted")),!0!==l?o.style.display="none":e(o).remove()):i.add==r&&e(o).remove(),a.selected==t&&(a.selected=null),r=n=null,o=null,setTimeout("window['"+a.id+"'].adjust(true, false);",1)}},updateRow:function(t,l){var a=this;if(d.test(l)&&e.isObject(t)&&!e.isEmptyObject(t)&&a.head&&a.bodyTableBody){var o=a.bodyTableBody.rows[l];if(o&&o.nodeType){var r,s,f,u=e.attr(o,"status");for(r in a.head)0!=r.indexOf(n)&&(f=a.head[r][0],(s=o.cells[f])&&s.nodeType&&t.hasOwnProperty(r)&&(s.innerHTML=t[r]));i.add!=u&&e.attr(o,"status",i.upd),r=s=f=null,o=null}}},isPrimary:function(t,l,a){var o=this;if(!t||!e.isString(coles))return!1;if(!l||!e.isPlainObject(l))return!1;var i=t.split(","),n="";if(e.each(i,function(e,t){n+=l[t]}),!d.test(a)){if(!o.bodyTableBody)return!1;var r,s,f=!1;return e.each(o.bodyTableBody.rows,function(l,a){if(r=o.getRowData(l,t))return e.each(i,function(e,t){s+=r[t]}),s==n?(f=!0,!1):n==s}),f}var r=o.getRowData(a,t);if(r){var s="";return e.each(i,function(e,t){s+=r[t]}),n==s}return!1},adjust:function(e,t){var l=this;o&&!l.padMode||(l.fixedTop(void 0===e||e),(l.fixedLeftCols||l.fixedRightCols)&&l.fixedColumns(void 0===t||t)),l.scroller&&l.scroller.refresh()},fixedTop:function(t){var l=this;if(!1!==l.fixedMode&&(!o||l.padMode)&&l.bodyTableHead){!0!==t&&(l.topTableHead.style.display="none",e(l.topTableHead).html(l.bodyTableHead.innerHTML),l.topTableHead.style.display="");var a;e("tr",l.bodyTableHead).each(function(t){a=l.topTableHead.rows[t],e("th",this).each(function(e){a&&a.nodeType&&(a.cells[e].style.width=this.offsetWidth+"px")})}),a=null}},fixedColumns:function(t){var l=this;if(!1!==l.fixedMode&&(!o||l.padMode)){var a=0+(l.fixedLeftCols?l.fixedLeftCols:0)+(l.fixedRightCols?l.fixedRightCols:0);if(l.bodyTableBody&&l.bodyTableBody.rows){if(!(l.bodyTableBody.rows.length<=0)){var d=l.bodyTableBody.rows[0].cells.length;if(!(d<=0||d<a)){var i,n,r=document.createElement("div");r.style.display="none";var s,f=0,u=0,c=0,p=0;if(!0!==t){var b=[],h=[];for(f=0,c=l.bodyTableHead.rows.length;f<c;f++){if(i=l.bodyTableHead.rows[f],l.fixedLeftCols){for(b.push("<tr>"),u=0;u<l.fixedLeftCols;u++)(n=i.cells[u])&&(n=n.cloneNode(!0),r.appendChild(n),b.push(r.innerHTML),r.removeChild(n));b.push("</tr>")}if(l.fixedRightCols){for(h.push("</tr>"),u=0;u<l.fixedRightCols;u++)s=d-u-1,(n=i.cells[s])&&(n=n.cloneNode(!0),r.appendChild(n),h.splice(0,0,r.innerHTML),r.removeChild(n));h.splice(0,0,"<tr>")}}for(l.fixedLeftCols&&(e(l.leftTableHead).html(b.join("")),e(l.leftTopTableHead).html(b.join(""))),l.fixedRightCols&&(e(l.rightTableHead).html(h.join("")),e(l.rightTopTableHead).html(h.join(""))),b=[],h=[],f=0,c=l.bodyTableBody.rows.length;f<c;f++){if(i=l.bodyTableBody.rows[f],l.fixedLeftCols){for(b.push("<tr>"),u=0;u<l.fixedLeftCols;u++)(n=i.cells[u])&&(n=n.cloneNode(!0),r.appendChild(n),b.push(r.innerHTML),r.removeChild(n));b.push("</tr>")}if(l.fixedRightCols){for(h.push("</tr>"),u=0;u<l.fixedRightCols;u++)s=d-u-1,(n=i.cells[s])&&(n=n.cloneNode(!0),r.appendChild(n),h.splice(0,0,r.innerHTML),r.removeChild(n));h.splice(0,0,"<tr>")}}l.fixedLeftCols&&(e(l.leftTableBody).html(b.join("")),l.left.style.display="",l.leftTop.style.display=""),l.fixedRightCols&&(e(l.rightTableBody).html(h.join("")),l.right.style.display="",l.rightTop.style.display=""),b=h=null}var y,T;for(f=0,c=l.bodyTableHead.rows.length;f<c;f++){if(i=l.bodyTableHead.rows[f],l.fixedLeftCols)for(u=0;u<l.fixedLeftCols;u++)(n=i.cells[u])&&(p=n.offsetWidth+"px",(y=l.leftTableHead.rows[f])&&(T=y.cells[u])&&(T.style.width=p),(y=l.leftTopTableHead.rows[f])&&(T=y.cells[u])&&(T.style.width=p));if(l.fixedRightCols)for(u=0;u<l.fixedRightCols;u++)s=d-u-1,(n=i.cells[s])&&(s=l.fixedRightCols-u-1,p=n.offsetWidth+"px",(y=l.leftTableHead.rows[f])&&(T=y.cells[s])&&(T.style.width=p),(y=l.leftTopTableHead.rows[f])&&(T=y.cells[s])&&(T.style.width=p))}n=r=null}}}}},fillDataTitle:function(){var t=this;if(o&&!t.padMode){var l,a=t.bodyTableHead.rows[0];a&&a.nodeType&&(e("tr",t.bodyTableBody).each(function(t){e("td",this).each(function(t){(l=a.cells[t])&&l.nodeType&&(e.attr(this,"data-title",e.trim(e.text(l))),(" "+l.className+" ").indexOf(" key ")>-1&&(this.className=e.trim((this.className?this.className:"")+" key")))})}),l=a=null)}},destroy:function(){var e=this;if(e.tdClip&&(e.tdClip.destroy(),e.tdClip=null),e.rowClip&&(e.rowClip.destroy(),e.rowClip=null),e.cellClip&&(e.cellClip.destroy(),e.cellClip=null),e.head){for(var t in e.head)delete e.head[t];e.head=null}e.scroller&&e.scroller.destroy(),e.bodyTableHead=null,e.bodyTableBody=null,e.bodyTable=null,e.wrapper=null,e.body=null,e.topTableHead=null,e.topTable=null,e.top=null,e.leftTableHead=null,e.leftTableBody=null,e.leftTable=null,e.left=null,e.rightTableHead=null,e.rightTableBody=null,e.rightTable=null,e.right=null,e.leftTopTableHead=null,e.leftTopTable=null,e.leftTop=null,e.rightTopTableHead=null,e.rightTopTable=null,e.rightTop=null,e.el=null},_init:function(){var l=this;l.body=e(l.el).children("div.body:first")[0],l.wrapper=e(l.body).children("div.wrapper:first")[0],l.bodyTable=e(l.wrapper).children("table:first")[0],l.bodyTableHead=l.bodyTable.tHead,l.bodyTableBody=l.bodyTable.tBodies&&l.bodyTable.tBodies.length>0?l.bodyTable.tBodies[0]:null,l.top=e(l.el).children("div.top:first")[0],l.topTable=e(l.top).children("table:first")[0],l.topTableHead=l.topTable.tHead,l.left=e(l.el).children("div.left:first")[0],l.leftTable=e(l.left).children("table:first")[0],l.leftTableHead=l.leftTable.tHead,l.leftTableBody=l.leftTable.tBodies&&l.leftTable.tBodies.length>0?l.leftTable.tBodies[0]:null,l.right=e(l.el).children("div.right:first")[0],l.rightTable=e(l.right).children("table:first")[0],l.rightTableHead=l.rightTable.tHead,l.rightTableBody=l.rightTable.tBodies&&l.rightTable.tBodies.length>0?l.rightTable.tBodies[0]:null,l.leftTop=e(l.el).children("div.leftTop:first")[0],l.leftTopTable=e(l.leftTop).children("table:first")[0],l.leftTopTableHead=l.leftTopTable.tHead,l.rightTop=e(l.el).children("div.rightTop:first")[0],l.rightTopTable=e(l.rightTop).children("table:first")[0],l.rightTopTableHead=l.rightTopTable.tHead;var i=l.el.className;l.padMode=e.os.pad||o&&(" "+i+" ").indexOf(" c_table-hasGrid ")>-1,l.bodyTableHead&&(l.head=c(l.bodyTableHead,!0)),o||l.padMode?l.scroller||(l.scroller=new e.Scroll(l.body,{bounce:"undefined"!=typeof l.bounce&&l.bounce,momentum:"undefined"==typeof l.momentum||l.momentum,checkDOMChanges:"undefined"!=typeof l.checkDOMChanges&&l.checkDOMChanges,onPosition:function(e,t,a,o){this.options.useTransform?(l.top.style[a]="translate("+e+"px,0px) scale("+this.scale+")"+o,l.fixedLeftCols&&(l.left.style[a]="translate(0px,"+t+"px) scale("+this.scale+")"+o),l.fixedRightCols&&(l.right.style[a]="translate(0px,"+t+"px) scale("+this.scale+")"+o)):(e=m.round(e),l.top.style.left=e+"px")}})):e(l.body).bind("scroll",function(){var e=l.body.scrollLeft;void 0!==e&&(l.top.style.left=0-e+"px");var t=l.body.scrollTop;void 0!==t&&(l.fixedLeftCols&&(l.left.style.top=0-t+"px"),l.fixedRightCols&&(l.right.style.top=0-t+"px"))}),e.inArray(l.id,r)<0&&a.call(r,l.id),e(function(){l.adjust(!1,!1)}),l.bodyTableBody&&!1!==l.editMode&&e(l.el).tap(function(t){if(t.originalEvent&&(t=e.event.fix(t.originalEvent)),t.target){var a=f(t.target);if(a){var o,i=a.parentNode;if(d.test(l.selected)){var n=l.bodyTableBody.rows[l.selected];n&&n.nodeType&&(o=n.className?n.className:"",(" "+o+" ").indexOf(" on ")>-1&&(n.className=e.trim((" "+o+" ").replace(/ on /g," ")))),l.fixedLeftCols&&(n=l.leftTableBody.rows[l.selected])&&n.nodeType&&(o=n.className?n.className:"",(" "+o+" ").indexOf(" on ")>-1&&(n.className=e.trim((" "+o+" ").replace(/ on /g," ")))),l.fixedRightCols&&(n=l.rightTableBody.rows[l.selected])&&n.nodeType&&(o=n.className?n.className:"",(" "+o+" ").indexOf(" on ")>-1&&(n.className=e.trim((" "+o+" ").replace(/ on /g," ")))),n=null}i.parentNode==l.bodyTableBody?l.selected=e.inArray(i,l.bodyTableBody.rows):l.fixedLeftCols&&i.parentNode==l.leftTableBody?l.selected=e.inArray(i,l.leftTableBody.rows):l.fixedRightCols&&(l.selected=e.inArray(i,l.rightTableBody.rows)),d.test(l.selected)&&((i=l.bodyTableBody.rows[l.selected])&&(o=i.className?i.className:"",(" "+o+" ").indexOf(" on ")<0&&(i.className=e.trim(o+" on"))),l.fixedLeftCols&&(i=l.leftTableBody.rows[l.selected])&&(o=i.className?i.className:"",(" "+o+" ").indexOf(" on ")<0&&(i.className=e.trim(o+" on"))),l.fixedRightCols&&(i=l.rightTableBody.rows[l.selected])&&(o=i.className?i.className:"",(" "+o+" ").indexOf(" on ")<0&&(i.className=e.trim(o+" on")))),o=null,a=i=null}}}),(o||l.padMode)&&e(l.el).bind("selectstart",function(e){return e.stop(),!1}),e(t).bind("onorientationchange"in t?"orientationchange":"resize",l.id,function(l){var a=l?l.data:null;a&&e.isString(a)&&t[a]&&t[a].adjust()})}});var f=function(t){if(!t||!t.nodeType)return null;for(var l=0,a=t;l<5&&a&&a.nodeType;){if(1==a.nodeType&&e.nodeName(a,"td"))return a;a=a.parentNode,l++}},u=function(t){if(t&&t.nodeType)for(var l=0,a=t;l<5&&a&&a.nodeType;){if(1==a.nodeType&&e.nodeName(a,"tr"))return a;a=a.parentNode,l++}},c=function(t,l){if(!t||!t.nodeType||!e.nodeName(t,"thead"))return null;var a=t.getElementsByTagName("tr")[0];if(!a||!a.nodeType)return null;var o,d,i,n,r,s={},f=a.getElementsByTagName("th");if(f&&f.length>0)for(o=0;o<f.length;)d=f[o],i=e.attr(d,"col"),n=d.className?d.className:"",r="none"!=d.style.display,(i||!0===l&&(i="_nocol_"+o))&&(s[i]=[o,n,r]),o++;return d=a=f=n=null,s},p=function(t){return t&&t.nodeType?e.browser.msie?e.trim(t.innerText):e.trim((""+t.innerHTML).replace(/<\/?.+?>/g,"")):null},b=function(t){if(t&&e.isString(t)){var l=t.indexOf("&partids=");if(!(l<0)){var a=t.substring(l+"&partids=".length);if(a)return l=a.indexOf("&"),l>0&&(a=a.substring(0,l)),a}}};e.extend(s,{adjust:function(e,l){if(r.length>0)for(var a,o=0,d=r.length;o<d;o++)a=r[o],t[a]&&t[a].adjust(e,l)}}),e.extend({getTableData:function(l){var a=l&&e.isString(l)?t[l]:null;if(a)return a.getData()},getTableRowData:function(l,a){var o=l&&e.isString(l)?t[l]:null;if(o)return o.getRowData(a)},addTableRow:function(l,a){var o=l&&e.isString(l)?t[l]:null;if(o)return o.addRow(a)},deleteTableRow:function(l,a){var o=l&&e.isString(l)?t[l]:null;if(o)return o.deleteRow(a)},updateTableRow:function(l,a){var o=l&&e.isString(l)?t[l]:null;if(o)return o.updateRow(a)}}),e.each("getTableData,getTableRowData,addTableRow,deleteTableRow,updateTableRow".split(","),function(l,a){t[a]=e[a]}),e(l).ajaxSuccess(function(l,a,d){if(d&&d.url&&e.isString(d.url)){var i=b(d.url);if(i){for(var n,r,f,u,c=i.split(","),p=0;p<c.length;p++)(n=c[p])&&(u=e("#"+n+" div[x-wade-uicomponent=table]"),u.length&&u.each(function(){(f=e.attr(this,"id"))&&(r=t[f])&&r instanceof s&&(r.adjust(!1,!1),o&&!r.padMode&&r.fillDataTitle())}));f=u=null,i=c=n=null}}}),t.Table=e.Table=s}}(window.Wade,window,document);