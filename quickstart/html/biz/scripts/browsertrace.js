(function(){
	if(!window.$) return;
	
	//trace handler
	var clazz = "com.ailk.biz.view.handler.BrowserTraceHandler";	
	var isIE = $.browser.msie, ieVer = 0;
	if(true == isIE){
		ieVer = $.browser.version;
	}
	
	$(window).ajaxComplete(function(e, xhr, s){
		if(!xhr || !s || !s.url || !$.isString(s.url) || true === s.trace)
			return;
		if(s.url.indexOf("?clazz=" + clazz) > -1)
			return;
		
		var status = xhr.status;	
		var traceId = xhr.getResponseHeader("X-Trace-Id");
		var traceBrowserId = xhr.getResponseHeader("X-Trace-BrowserId");
		if(!traceId)
			return;
		
		/*
		setTimeout("$.httphandler.getJsonp('" + clazz + "', 'trace', '&traceId=" + traceId + 
												   "&traceBrowserId=" + traceBrowserId + 
												   "&startTime=" + s.timeStamp + 
												   "&endTime=" + $.now() + 
												   "&status=" + status +
												   "&isIE=" + isIE +
												   "&ieVersion=" + ieVer + "')"
		, 10);
		*/
		
		setTimeout("$.httphandler.get('" + clazz + "', 'trace', '&traceId=" + traceId + 
												   "&traceBrowserId=" + traceBrowserId + 
												   "&startTime=" + s.timeStamp + 
												   "&endTime=" + $.now() + 
												   "&status=" + status +
												   "&isIE=" + isIE +
												   "&ieVersion=" + ieVer + "', null, null, {dataType:'text', simple:true, trace:true})"
		, 10);									   
	});
	
	$(function(){
		var traceId = window.X_Trace_Id;
		var traceBrowserId = window.X_Trace_BrowserId;
		if(!traceId)
			return;
			
		$.httphandler.getJsonp(clazz, "trace", "&traceId=" + traceId + 
											   "&traceBrowserId=" + traceBrowserId + 
											   "&startTime=" + $.timeStamp + 
											   "&endTime=" + $.now() + 
											   "&status=200" + 
											   "&isIE=" + isIE +
											   "&ieVersion=" + ieVer);
	});
})();