if(typeof(ProductSelect)=="undefined"){
	window["ProductSelect"]=(function(){
		return{
		monitor:null,
		returnValue:"",
		productName:"",
		brandCode:"",
		brandName:"",
		/**
		 * 点击产品目录弹出框事件
		 * 
		 * @param productTypeCode
		 * @param eparchyCode
		 * @param userProductId
		 * @param assignProductIds
		 * @returns
		 */
		popupProductSelect : function(productTypeCode,eparchyCode,userProductId,assignProductIds){
			if($("#monitor").val()){
				if($("#"+$("#monitor").val()).val()){
					if(this.monitor!=$("#"+$("#monitor").val()).val()){
						productTree.empty(true);
						productTree.setParam("USER_PRODUCT_ID",userProductId);
						productTree.setParam("PRODUCT_TYPE_CODE",productTypeCode);
						productTree.setParam("EPARCHY_CODE",eparchyCode);
						productTree.setParam("IS_TREE","true");
						if(assignProductIds){
							productTree.setParam("ASSIGN_PRODUCTIDS",assignProductIds);
						}
						productTree.init();
						this.monitor = $("#"+$("#monitor").val()).val();
						this.returnValue="";
						this.productName="";
						this.brandCode="";
						this.brandName="";
					}
				}
			}
			else{
				productTree.empty(true);
				productTree.setParam("USER_PRODUCT_ID",userProductId);
				productTree.setParam("PRODUCT_TYPE_CODE",productTypeCode);
				productTree.setParam("EPARCHY_CODE",eparchyCode);
				productTree.setParam("IS_TREE","true");
				if(typeof(getOtherParam)=="function"){
					var otherParam = getOtherParam().split("&");
					for(var i=0;i<otherParam.length;i++){
						var temp = otherParam[i].split("=");
						productTree.setParam(temp[0],temp[1]);
					}
				}

				productTree.init();
			}
			$("#productTreePanel").css("display","");
		},
		
		changeProductType: function(productTypeCode){
			$("#PS_PRODUCT_TYPE_CODE").val(productTypeCode);
		},
		
		changeUserProductId: function(userId){
			$("#PS_USER_PRODUCT_ID").val(userId);
		},
		
		changeEparchyCode: function(eparchyCode){
			$("#PS_EPARCHY_CODE").val(eparchyCode);
		},
		
		/**
		 * 勾选主产品树节点触发动作
		 */
		prodTreeCheckBoxAction: function(nodedata){
			this.returnValue=nodedata.id;
			this.productName=nodedata.text;
			var parent = productTree.getParentNodeDataByDataId("productTree",nodedata.dataid);
			this.brandCode=parent.id;
			this.brandName=parent.text;
			return true;
		},
		
		confirmAction: function(){
			if(this.returnValue==""){
				alert("请选择产品");
				return false;
			}
			var productId = this.returnValue;
			var productName = this.productName;
			var brandCode=this.brandCode;
			var brandName=this.brandName;
			if($("#AFTER_ACTION").val()!=""&&$("#AFTER_ACTION").val()!="undefined"){
				eval($("#AFTER_ACTION").val());
			}
			$("#productTreePanel").css("display","none");
		}
	}})();
}