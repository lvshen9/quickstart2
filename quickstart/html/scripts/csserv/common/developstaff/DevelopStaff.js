(function($){
	$.extend({developStaff:{
		
		/**
		 * 初始化发展员工
		 */
		init:function(tradeTypeCode){
			var my = this;
			
			var params = "";
			if(tradeTypeCode){
				params += "&TRADE_TYPE_CODE=" + tradeTypeCode;
			}else{
				if($("#TRADE_TYPE_CODE") && $("#TRADE_TYPE_CODE").length){
					params += "&TRADE_TYPE_CODE=" + $("#TRADE_TYPE_CODE").val();
				}				
			}
			//加载发展员工配置数据，判断是否要显示发展员工
			$.ajax.submit(null, "getDevelopStaffConfig", params, null,
				function(data){
					if(!data || (data && !data.get("DEVELOP_VISIBLE"))){
						return ;
					}	
					my.renderDevelopStaff(data.get("DEVELOP_VISIBLE"));
				},function(code, info, detail){
					$.endPageLoading();
					MessageBox.error("错误提示","加载发展员工错误！",null, null, info, detail);
				},function(){
					$.endPageLoading();
					MessageBox.alert("告警提示","加载发展员工超时!");
			});	
		},
		
		//配置发展员工
		renderDevelopStaff:function(flag){
			//如果不需要加载发展员工，则直接返回
            if( flag != "1" ) {
            	return ;
            }	
			//显示发展员工
	        $("#DEVELOPED_STAFF_PART").css("display", "");
	        $.developStaff.setDevelopStaff();		//设置默认发展员工
		},
		
		//设置发展员工
		setDevelopStaff:function(){
        	if($.cssubmit){
	        	//设置发展员工数据
	        	$.cssubmit.setParam("DEVELOPED_STAFF_ID", $("#DEVELOPED_STAFF").val());
	        	$.cssubmit.setParam("DEVELOPED_STAFF_NAME", $("#POP_DEVELOPED_STAFF").val());
        	}
		}
		
	}});
	
})(Wade);
