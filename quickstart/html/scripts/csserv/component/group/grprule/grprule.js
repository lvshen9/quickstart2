function ruleCheck(claszz,method,params) {
		
    	Wade.httphandler.submit('',claszz,method,params,
    	function(data){
    	
    		var ruleTipDataset = data.get('TIPS_TYPE_TIP');
    		if(ruleTipDataset && ruleTipDataset.length>0){
	    		ruleTipDataset.each(function(item,index,totalcount){
					var tipsInfo = item.get("TIPS_INFO");
					window.alert(tipsInfo);
				});
			}
			
	    	var ruleChoiceDataset = data.get('TIPS_TYPE_CHOICE');
	    	if(ruleChoiceDataset && ruleChoiceDataset.length>0){
	    		ruleChoiceDataset.each(function(item,index,totalcount){
					var tipsInfo = item.get("TIPS_INFO");
					if(!window.confirm(tipsInfo)){
						result = false;
						return false;
					}
				});
			}
			
		},
		function(error_code,error_info,derror){
		
			showDetailErrorInfo(error_code,error_info,derror);
			
			return false;
	    }, {async:false});

	    return true;

}

function pageFlowRuleCheck(claszz,method,params) {
		
    	Wade.httphandler.submit('',claszz,method,params,
    	function(data){
    	
    		var ruleTipDataset = data.get('TIPS_TYPE_TIP');
    		if(ruleTipDataset && ruleTipDataset.length>0){
	    		ruleTipDataset.each(function(item,index,totalcount){
					var tipsInfo = item.get("TIPS_INFO");
					window.alert(tipsInfo);
				});
			}
			
	    	var ruleChoiceDataset = data.get('TIPS_TYPE_CHOICE');
	    	if(ruleChoiceDataset && ruleChoiceDataset.length>0){
	    		ruleChoiceDataset.each(function(item,index,totalcount){
					var tipsInfo = item.get("TIPS_INFO");
					if(!window.confirm(tipsInfo)){
						$.endPageLoading();
						return false;
					}
				});
			}
			
			//增加规则验证成功后调用的方法
			var afterCheckResult =true;
			if(typeof(pageFlowCheckAfterAction)=="function"){
				afterCheckResult = pageFlowCheckAfterAction();
			}
			if(!afterCheckResult){
				$.endPageLoading();
				return false;
			}
			
			parent.getFlow().next(null,false,true);
			$.endPageLoading();
			
		},
		function(error_code,error_info,derror){
		
			showDetailErrorInfo(error_code,error_info,derror);
			$.endPageLoading();
			return false;
	    });
	    return true;

}
