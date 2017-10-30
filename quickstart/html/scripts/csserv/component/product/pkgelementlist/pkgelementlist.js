//扩展包元素列表对象
(function(){
	$.extend(PkgElementList.prototype,{
		renderComponent: function(package,routeEparchyCode,selfParam){
			this.svcCount = 0;
			this.discntCount = 0;
			var params = "&PACKAGE_ID="+package.packageId+"&EPARCHY_CODE="+routeEparchyCode;
			if(selfParam){
				params+="&SELF_PARAM="+selfParam;
			}
			if(typeof(getOtherParam)=="function"){
				params += getOtherParam();
			}
			params+="&CALL_SVC="+$("#PKGELEMENTLIST_CALL_SVC").val();
			//$.ajax.submit(null,null,params,$("#PKGELEMENTLIST_COMPONENT_ID").val(),this.initElementList);
			hhSubmit(null,"com.ailk.csview.common.component.product.pkgelementlist.PkgElementListHandler","renderPkgElementList", params, this.initElementList);
		},
		
		initElementList: function(data){
			var elementList = data;
			pkgElementList.elementList = new $.DatasetList();
			if(elementList==null||elementList==""||elementList=="undefined"){
				
			}
			else{
				elementList.each(function(item,index,totalCount){
					var pkgElement = new PkgElement();
					pkgElement.elementId = item.get("ELEMENT_ID");
					pkgElement.elementName = item.get("ELEMENT_NAME");
					pkgElement.elementType = item.get("ELEMENT_TYPE_CODE");
					pkgElement.forceTag = item.get("FORCE_TAG");
					pkgElement.defaultTag = item.get("DEFAULT_TAG");
					pkgElement.reOrder = item.get("REORDER");
					pkgElement.explain = item.get("EXPLAIN");
					pkgElementList.elementList.add(pkgElement);
				});
			}
			pkgElementList.drawElements();
		},
		
		drawElements: function(){
			var drawSvcArea = $("#SvcTable");
			var drawDiscntArea = $("#DiscntTable");
			drawSvcArea.empty();
			drawDiscntArea.empty();
			this.elementList.each(function(item){
				item.draw(item);
			});
			if(pkgElementList.svcCount == 0 && pkgElementList.discntCount==0){
				$("#pkgSvcPart").css("height","165px");
				$("#pkgSvcArea").css("display","");
				$("#pkgDiscntArea").css("display","");
				return;
			}
			if(pkgElementList.svcCount>0&&pkgElementList.discntCount>0){
				$("#pkgSvcPart").css("height","auto");
				$("#pkgSvcPart").attr("className","c_list c_list-table c_list-col-1");
			}
			if(pkgElementList.svcCount<=0){
				$("#pkgSvcArea").css("display","none");
			}
			else{
				$("#pkgSvcArea").css("display","");
			}
			if(pkgElementList.discntCount<=0){
				$("#pkgDiscntArea").css("display","none");
				$("#pkgSvcPart").css("height","auto");
				$("#pkgSvcPart").attr("className","c_list c_list-table c_list-col-1 e_noborder");
			}
			else{
				$("#pkgDiscntArea").css("display","");
				$("#pkgSvcPart").attr("className","c_list c_list-table c_list-col-1");
			}
		},
		
		addElements: function(){
			
			var els = $("input[name=elementCheckBox]");
			this.selectedList = new $.DatasetList();
			var unSelectedName = "";
			var k=0;
			for(var i=0;i<els.length;i++){
				var el = els[i];
				if(el.checked){
					if("98"==el.value || "99"==el.value){
						var flag98=true,flag99=true;
						var selected = $("input[name=SELECTED_SVC_CHECKBOX]");
					    for (var j=0;j<selected.length;j++){
					    	if(selected[j].value=='98'){
					    		flag98=false;
					    	}
					    	if(selected[j].value=='99'){
					    		flag99=false;
					    	}
					    }
				   if(flag98 && flag99){
					    k=k+1;
					    if(k<2){
						this.selectedList.add(this.getElement("99"));
						this.selectedList.add(this.getElement("98"));
					    }
					}else if(flag98 && !flag99){
						this.selectedList.add(this.getElement("98"));
					}else if(!flag98 && flag99){
						this.selectedList.add(this.getElement("99"));
					}
						
					}else{
					var tempEl = this.getElement(el.value);
					if(tempEl.reOrder!="R"&&tempEl.reOrder!="C"&&selectedElements.checkIsExist(tempEl.elementId,tempEl.elementType)){
						unSelectedName+=tempEl.elementName+","; 
						el.checked = false;
						continue;
					}
					this.selectedList.add(this.getElement(el.value));
					}
				}
			}
		
			if(unSelectedName!=""){
				alert("您所选择的元素"+unSelectedName+"已经存在于已选区，不能重复添加");
			}
			if(this.selectedList.length<=0){
				alert('您没有选择任何元素');
				return;
			}
			if(this.checkSelf){
				if(!this.checkSelf(this.selectedList)){
					return;
				}
			}
			var elementIds = $.DatasetList();
			for(var i=0;i<this.selectedList.length;i++){
				var selected = $.DataMap();
				selected.put("PRODUCT_ID",packageList.currentPackage.productId);
				selected.put("PACKAGE_ID",packageList.currentPackage.packageId);
				selected.put("ELEMENT_ID",this.selectedList.get(i).elementId);
				selected.put("ELEMENT_TYPE_CODE",this.selectedList.get(i).elementType)
				selected.put("MODIFY_TAG","0");
				elementIds.add(selected);
			}
			if(selectedElements.addElements){
				selectedElements.addElements(elementIds);
			}
			
		},
		
		addElement: function(elementId,elementType){
			var elementIds = $.DatasetList();
			var selected = $.DataMap();
			selected.put("PRODUCT_ID",packageList.currentPackage.productId);
			selected.put("PACKAGE_ID",packageList.currentPackage.packageId);
			selected.put("ELEMENT_ID",elementId);
			selected.put("ELEMENT_TYPE_CODE",elementType)
			selected.put("MODIFY_TAG","0");
			elementIds.add(selected);
			if(elementId == "98"){
				var selected1 = $.DataMap();
				selected1.put("PRODUCT_ID",packageList.currentPackage.productId);
				selected1.put("PACKAGE_ID",packageList.currentPackage.packageId);
				selected1.put("ELEMENT_ID","99");
				selected1.put("ELEMENT_TYPE_CODE",elementType)
				selected1.put("MODIFY_TAG","0");
				elementIds.add(selected1);
				
			}else if (elementId == "99"){
				var selected2 = $.DataMap();
				selected2.put("PRODUCT_ID",packageList.currentPackage.productId);
				selected2.put("PACKAGE_ID",packageList.currentPackage.packageId);
				selected2.put("ELEMENT_ID","98");
				selected2.put("ELEMENT_TYPE_CODE",elementType)
				selected2.put("MODIFY_TAG","0");
				elementIds.add(selected2);
			}
			if(selectedElements.addElements){
				selectedElements.addElements(elementIds);
			}
		},
		
		getElement: function(elementId){
			var length = this.elementList.length;
			for(var i=0;i<length;i++){
				var el = this.elementList.get(i);
				if(elementId == el.elementId){
					return el;
				}
			}
		},
		
		checkPackageMinMax: function(){
			var length = selectedElements.selectedEls.length;
			var count = 0;
			for(var i=0;i<length;i++){
				var el = selectedElements.selectedEls.get(i);
				if(el.get("PACKAGE_ID")==packageList.currentPackage.packageId&&el.get("MODIFY_TAG")!='1'&&el.get("MODIFY_TAG")!='0_1'){
					count++;
				}
			}
			count = count+this.selectedList.length;
			if(packageList.currentPackage.minNumer!='-1'&&packageList.currentPackage.minNumber!=''&&packageList.currentPackage.minNumber!=null){
				if(count<packageList.currentPackage.minNumber){
					alert('当前包最少选择'+packageList.currentPackage.minNumber+'个元素，请重新选择');
					return false;
				}
			}
			
			if(packageList.currentPackage.maxNumber!='-1'&&packageList.currentPackage.maxNumber!=''&&packageList.currentPackage.maxNumber!=null){
				if(count>packageList.currentPackage.maxNumber){
					alert('当前包最多选择'+packageList.currentPackage.maxNumber+'个元素，请重新选择');
					return false;
				}
			}
			return true;
		}
	}); 
}
)();

(function(){
	$.extend(PkgElement.prototype,{
		draw: function(){
			var html=[];
			var drawArea = null;
			if(this.elementType=="S" || this.elementType == "Z"){
				drawArea = $("#SvcTable");
				pkgElementList.svcCount++;
			}
			else if(this.elementType=="D"){
				drawArea = $("#DiscntTable");
				pkgElementList.discntCount++;
			}
			var className=null;
			var checked = false;
			var disabled = false;
			if(this.forceTag=='1'){
				className="e_dis";
				checked=true;
				disabled= true;
			}
			else if(this.defaultTag=='1'){
				checked=true;
			}
			
			if(this.reOrder!="R"&&this.reOrder!="C"&&selectedElements.checkIsExist(this.elementId,this.elementType)){
				className="e_dis";
				checked=false;
				disabled=true;
			}
			var addButton = '';
			if(className != "e_dis"){
				var addButton = 'onmouseover="$(this).prev().css(\'display\',\'\');" onmouseout="$(this).prev().css(\'display\',\'none\');"';
			}
			var title = "";
			if(this.elementType=="S" || this.elementType == "Z"){
				title = this.elementName;
			}
			else{
				title = this.elementName+"&#13;&#13;"+this.explain;
			}
			html.push('<li title="'+title+'"'+(className!=null?(' class="'+className+'"'):'')+' id="PELI_'+this.elementType+"_"+this.elementId+'">');
			if(className!="e_dis"){
				html.push('<button type="button" style="display:none" onmouseover="this.style.display = \'\';" onmouseout="this.style.display = \'none\';" onclick="pkgElementList.addElement(\''+this.elementId+'\',\''+this.elementType+'\');"><i class="e_ico-next"></i><span></span></button>')
			}
			html.push('<label id="LABEL_'+this.elementType+"_"+this.elementId+'" class="text" '+ (className!="e_dis"?addButton:'')+'><span>');
			html.push('<input name="elementCheckBox" type="checkbox"'+(disabled==true?' disabled="true"':'')+(checked==true?' checked':'')+' id="PE_'+this.elementType+"_"+this.elementId+'" value='+this.elementId+' class="e_checkbox"/>');
			html.push('['+this.elementId+']'+this.elementName);
			html.push('</span></label></li>');
			$.insertHtml('beforeend',drawArea,html.join(""));
		}
	})
})();