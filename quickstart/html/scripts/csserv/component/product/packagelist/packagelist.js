(function(){
	$.extend(PackageList.prototype,{
		selectedPackageAction:function(packageId){
			var package = this.getPackage(packageId);
			if(package==null){
				return;
			}
			this.setPackageStyle(package);
			if($("#AFTER_SELECT_ACTION").val()!="undefined"&&$("#AFTER_SELECT_ACTION").val()!=""){
				eval($("#AFTER_SELECT_ACTION").val());
			}
			else{
				if(pkgElementList.renderComponent){
					pkgElementList.renderComponent(package,productEnv.eparchyCode);
				}
			}
		},
		
		getPackage:function(packageId){
			if(packageMap.get(packageId)==null){
				var package = new Package();
				var packageTemp = $("#"+packageId);
				if(packageTemp.length>0){
					package.productId = packageTemp.attr("productId");
					package.packageId = packageTemp.attr("packageId");
					package.packageName = packageTemp.attr("packageName");
					package.limitType = packageTemp.attr("limitType");
					package.minNumber = packageTemp.attr("minNumber");
					package.maxNumber = packageTemp.attr("maxNumber");
					package.forceTag = packageTemp.attr("forceTag");
					package.defaultTag = packageTemp.attr("defaultTag");
					package.rsrvStr1 = packageTemp.attr("rsrvStr1");
					packageMap.put(packageId,package);
				}
				else{
					return null;
				}
				return package;
			}
			else{
				return packageMap.get(packageId);
			}
		},
		
		setPackageStyle:function(package){
			if(this.currentPackage!=null){
				//清除样式
				$("#"+this.currentPackage.packageId).parent().attr("className","");
			}
			$("#"+package.packageId).parent().attr("className","on");
			this.currentPackage = package;
		},
		
		renderComponent: function(productId,routeEparchyCode,svcParam){
			if(productId!=null&&productId!="undefined"){
				if(svcParam==null||svcParam=="undefined"){
					svcParam="";
				}
				svcParam+="&PRODUCT_ID="+productId+"&EPARCHY_CODE="+routeEparchyCode;
				if(typeof(getOtherParam)=="function"){
					svcParam += getOtherParam();
				}
				packageMap = new $.DataMap();
				$.ajax.submit(null,null,svcParam,$("#PACKAGELIST_COMPONENT_ID").val());
			}
			
		}
	});
})();