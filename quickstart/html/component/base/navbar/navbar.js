(function(){var a={trunNavPage:function(b){var e=b.attr("paginId");var c=$("#"+e);if(b.attr("class").indexOf("e_dis")!=-1){return;}var d=$.getNavParams(b);if(d=="-1"){return;}d+="&"+e+"_needcount=false";$.beginPageLoading(c.attr("loadingtxt"));$.ajax.submit(c.attr("cond"),c.attr("listener"),d,c.attr("part"),function(f){$.endPageLoading();
},function(f,g){$.endPageLoading();alert("Erorr Code:"+f+"\r\n"+g);});},initNavPage:function(b,c,n){var g=$("#"+n);var d=$("#"+c);var e=$("#"+d.attr("part"));var i=d.attr("pagesize");var m=d.attr("current");var j=d.attr("pagecount");var l=d.attr("mode");if(d&&d.length){var k=new $.DataMap($.ajax.buildJsonData(n)).toString();
d.attr("condparams",k);}if(g&&g.length){var h="";h+="&pagin="+b;h+="&"+b+"_current=1";h+="&"+b+"_pagesize="+d.attr("pagesize");if(l!="simple"){d.attr("needcount","true");}h+="&"+b+"_needcount="+d.attr("needcount");g.attr("exparams",h);h=null;}g=null;if(l=="simple"){var f=$("#"+d.attr("part")+" table:first");
if(f&&f.length){var o=$("tbody tr",f[0]).length;if(o>=parseInt(i,10)||m>1){if(m=="1"){$("#"+c+" a[op=pre]").attr("className","pre e_dis");$("#"+c+" a[op=next]").attr("className","next");}else{if(m==j){$("#"+c+" a[op=pre]").attr("className","pre");$("#"+c+" a[op=next]").attr("className","next e_dis");
}else{$("#"+c+" a[op=pre]").attr("className","pre");$("#"+c+" a[op=next]").attr("className","next");}}$("#"+c+" a[op=stat]").attr("className","");if(o>=parseInt(i,10)){$("#"+c+" input[op=go]").attr("disabled",false);$("#"+c+" button[op=go]").attr("disabled",false);$("#"+c+" button[op=go]").attr("className","e_button e_button-right");
}else{$("#"+c+" a[op=next]").attr("className","next e_dis");$("#"+c+" input[op=go]").attr("disabled",false);$("#"+c+" button[op=go]").attr("disabled",false);$("#"+c+" button[op=go]").attr("className","e_button e_button-right");}}else{$("#"+c+" input[op=go]").attr("disabled",true);$("#"+c+" button[op=go]").attr("disabled",true);
$("#"+c+" button[op=go]").attr("className","e_button e_button-right e_dis");}e=null;i=null;m=null;}if(d.attr("count")!="0"){$("#"+c+" a[op=stat]").css("display","none");$("#"+c+" span[op=statinfo]").css("display","");$("#"+c+" span[op=statinfo]").text($.lang.get("view.web.comp.navbar.stat",d.attr("count"),d.attr("pagecount")));
}}d=null;},navGo:function(b){var g=b.attr("paginId");var c=$("#"+g);var e=$("#"+g+" input[op=go]").val();var d=parseInt(c.attr("pagecount"),10);e=$.trim(e);if(""!=e&&!/^\d+$/.test(e)){alert($.lang.get("view.web.comp.navbar.stat.go"));return;}if(e=="0"){alert($.lang.get("view.web.comp.navbar.stat.go"));
return;}if(d>0&&d<e){alert($.lang.get("view.web.comp.navbar.stat.go"));return;}var f=$.getNavParams(b,e);if(f=="-1"){return;}f+="&"+g+"_needcount=false";$.beginPageLoading(c.attr("loadingtxt"));$.ajax.submit(c.attr("cond"),c.attr("listener"),f,c.attr("part"),function(){$.endPageLoading();},function(h,i){$.endPageLoading();
alert("Erorr Code:"+h+"\r\n"+i);});},statNavPage:function(b){if(b&&b.attr("class")=="e_dis"){return;}var e=b.attr("paginId");var f=$("#"+e);var j=f.attr("compid");if(f.attr("count")!="0"){$("#"+e+" a[op=stat]").css("display","none");$("#"+e+" span[op=statinfo]").css("display","");e=null;f=null;j=null;
return;}var d=b.attr("pagin");var h=$.getNavParams(b);if(h=="-1"){return;}h+="&"+e+"_onlycount=true";h+="&"+e+"_needcount=false";$.beginPageLoading(f.attr("loadingtxt"));var i=$("#"+e+" a[op=stat]");var g=$("#"+e+" span[op=statinfo]");var c=$("#"+e+" div[statpart="+e+"]");$.ajax.submit(f.attr("cond"),f.attr("listener"),h,j,function(p){var m=p.get("count");
var l=p.get("size");var o=$("#"+e);o.attr("count",m);o.attr("pagecount",l);var q=$("#"+o.attr("cond"));var n=o.attr("mode");if(q&&q.length){var k="";k+="&pagin="+d;k+="&"+d+"_current=1";k+="&"+d+"_pagesize="+o.attr("pagesize");if(n!="simple"){o.attr("needcount","true");}k+="&"+d+"_needcount="+o.attr("needcount");
q.attr("exparams",k);k=null;}q=null;n=null;i.css("display","none");g.css("display","");g.text($.lang.get("view.web.comp.navbar.stat",m,l));e=null;f=null;d=null;h=null;i=null;g=null;o=null;c=null;$.endPageLoading();},function(k,l){e=null;f=null;d=null;h=null;c=null;$.endPageLoading();alert("Erorr Code:"+k+"\r\n"+l);
});},getNavParams:function(b,n){var k,l,f,h,g,c=b.attr("pagin");var e=b.attr("paginId");var j=b.attr("op");var d=$("#"+e);var m=$("#"+d.attr("cond"));k=d.attr("count");l=(n==null?d.attr("current"):n);f=d.attr("pagesize");g=d.attr("pagecount");var i=new $.DataMap($.ajax.buildJsonData(d.attr("cond"))).toString();
if(i!=d.attr("condparams")){alert($.lang["view.web.comp.navbar.query"]);return"-1";}if(n==null){if(j=="first"){l=1;}else{if(j=="pre"){l=parseInt(l,10)-1;}else{if(j=="next"){l=parseInt(l,10)+1;}else{if(j=="last"){l=parseInt(g,10);}}}}}m.attr("exparams","");return params="&pagin="+c+"&"+c+"_count="+k+"&"+c+"_current="+l+"&"+c+"_pagesize="+f;
}};Wade.extend(a);Wade.extend(window,a);})();