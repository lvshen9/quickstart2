function PlayerVersion(t){this.major=null!=t[0]?parseInt(t[0]):0,this.minor=null!=t[1]?parseInt(t[1]):0,this.rev=null!=t[2]?parseInt(t[2]):0}function getPlayerVersion(){var t=new PlayerVersion([0,0,0]);if(navigator.plugins&&navigator.mimeTypes.length){var e=navigator.plugins["Shockwave Flash"];e&&e.description&&(t=new PlayerVersion(e.description.replace(/([a-zA-Z]|\s)+/,"").replace(/(\s+r|\s+b[0-9]+)/,".").split(".")))}else if(navigator.userAgent&&navigator.userAgent.indexOf("Windows CE")>=0)for(var a=1,i=3;a;)try{i++,a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash."+i),t=new PlayerVersion([i,0,0])}catch(r){a=null}else{try{var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.7")}catch(r){try{var a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash.6");t=new PlayerVersion([6,0,21]),a.AllowScriptAccess="always"}catch(r){if(6==t.major)return t}try{a=new ActiveXObject("ShockwaveFlash.ShockwaveFlash")}catch(r){}}null!=a&&(t=new PlayerVersion(a.GetVariable("$version").split(" ")[1].split(",")))}return t}function cleanupSWFs(){for(var t=document.getElementsByTagName("OBJECT"),e=t.length-1;e>=0;e--){t[e].style.display="none";for(var a in t[e])"function"==typeof t[e][a]&&(t[e][a]=function(){})}}function getChartObject(t){var e=null;return e=navigator.appName.indexOf("Microsoft Internet")==-1?document.embeds&&document.embeds[t]?document.embeds[t]:window.document[t]:window[t],e||(e=document.getElementById(t)),e}function updateChartXML(t,e){var a=getChartObject(t);a.SetVariable("_root.dataURL",""),a.SetVariable("_root.isNewData","1"),a.SetVariable("_root.newData",e),a.TGotoLabel("/","JavaScriptHandler")}!function(t){"undefined"==typeof t.chart&&(t.chart=function(e,a,i,r,n,s,o,h,l,c,d){return new t.chart.fn.construct(e,a,i,r,n,s,o,h,l,c,d)},t.chart.fn={construct:function(t,e,a,i,r,n,s,o,h,l,c){this.initialDataSet=!1,this.params=new Object,this.variables=new Object,this.attributes=new Array,t&&this.setAttribute("swf",t),e&&this.setAttribute("id",e),a&&this.setAttribute("width",a),i&&this.setAttribute("height",i),s&&this.addParam("bgcolor",s),this.addParam("quality","high"),this.addParam("allowScriptAccess","always"),this.addVariable("chartWidth",a),this.addVariable("chartHeight",i),r=r?r:0,this.addVariable("debugMode",r),this.addVariable("DOMId",e),n=n?n:0,this.addVariable("registerWithJS",n),o=o?o:"noScale",this.addVariable("scaleMode",o),h=h?h:"EN",this.addVariable("lang",h),this.detectFlashVersion=l?l:1,this.autoInstallRedirect=c?c:1,this.installedVer=getPlayerVersion()},setAttribute:function(t,e){this.attributes[t]=e},getAttribute:function(t){return this.attributes[t]},addParam:function(t,e){this.params[t]=e},getParams:function(){return this.params},addVariable:function(t,e){this.variables[t]=e},getVariable:function(t){return this.variables[t]},getVariables:function(){return this.variables},getVariablePairs:function(){var t,e=new Array,a=this.getVariables();for(t in a)e.push(t+"="+a[t]);return e},getSWFHTML:function(){var t="";if(navigator.plugins&&navigator.mimeTypes&&navigator.mimeTypes.length){t='<embed type="application/x-shockwave-flash" src="'+this.getAttribute("swf")+'" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'"  ',t+=' id="'+this.getAttribute("id")+'" name="'+this.getAttribute("id")+'" ';var e=this.getParams();for(var a in e)t+=[a]+'="'+e[a]+'" ';var i=this.getVariablePairs().join("&");i.length>0&&(t+='flashvars="'+i+'"'),t+="/>"}else{t='<object id="'+this.getAttribute("id")+'" classid="clsid:D27CDB6E-AE6D-11cf-96B8-444553540000" width="'+this.getAttribute("width")+'" height="'+this.getAttribute("height")+'">',t+='<param name="movie" value="'+this.getAttribute("swf")+'" />',t+='<param name="wmode" value="opaque" />';var e=this.getParams();for(var a in e)t+='<param name="'+a+'" value="'+e[a]+'" />';var i=this.getVariablePairs().join("&");i.length>0&&(t+='<param name="flashvars" value="'+i+'" />'),t+="</object>"}return t},setDataURL:function(t){if(0==this.initialDataSet)this.addVariable("dataURL",t),this.initialDataSet=!0;else{var e=getChartObject(this.getAttribute("id"));e.setDataURL(t)}},setDataXML:function(t){if(0==this.initialDataSet)this.addVariable("dataXML",t),this.initialDataSet=!0;else{var e=getChartObject(this.getAttribute("id"));e.setDataXML(t)}},render:function(t){if(!(1==this.detectFlashVersion&&this.installedVer.major<6)){var e="string"==typeof t?document.getElementById(t):t;return e.innerHTML=this.getSWFHTML(),document.embeds[this.getAttribute("id")]||window[this.getAttribute("id")]||(window[this.getAttribute("id")]=document.getElementById(this.getAttribute("id"))),!0}if(1!=this.autoInstallRedirect)return!1;var a=window.confirm("You need Adobe Flash Player 6 (or above) to view the charts. It is a free and lightweight installation from Adobe.com. Please click on Ok to install the same.");return!!a&&void(window.location="http://www.adobe.com/shockwave/download/download.cgi?P1_Prod_Version=ShockwaveFlash")}},t.chart.fn.construct.prototype=t.chart.fn)}(Wade);