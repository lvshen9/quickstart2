(function(){
	$.extend(SelectedElements.prototype,{
		isEffectNow:false,
		userProductId:null,
		nextProductId:null,
		nextProductStartDate:null,
		renderComponent: function(data,routeEparchyCode){
			$.beginPageLoading("已选区加载中。。。。。");
			data+="&IS_RENDER=true&EPARCHY_CODE="+routeEparchyCode+"&TRADE_TYPE_CODE="+$("#SELECTED_TRADE_TYPE_CODE").val();
			if(typeof(getOtherParam)=="function"){
				data += getOtherParam();
			}
			data+="&ACCT_DAY="+$("#ACCT_DAY").val()+"&FIRST_DATE="+$("#FIRST_DATE").val()+"&NEXT_ACCT_DAY="+$("#NEXT_ACCT_DAY").val()+"&NEXT_FIRST_DATE="+$("#NEXT_FIRST_DATE").val();
			$.ajax.submit(null,null,data,$("#SELECTEDELEMENTS_COMPONENT_ID").val(),selectedElements.initSelectedElements,selectedElements.errProcess);
		},
		
		clearCache:function(){
			this.isEffectNow = false;
			this.userProductId = null;
			this.nextProductId = null;
			this.nextProductStartDate = null;
		},
		
		setAcctDayInfo: function(acctDay,firstDate,nextAcctDay,nextFirstDate){
			$("#ACCT_DAY").val(acctDay);
			$("#FIRST_DATE").val(firstDate);
			$("#NEXT_ACCT_DAY").val(nextAcctDay);
			$("#NEXT_FIRST_DATE").val(nextFirstDate);
		},
		
		initSelectedElements: function(data){
			var dataset = null;
			if(typeof(data)=="string"){
				dataset = new $.DatasetList(data);
			}
			else if(typeof(data)=="object"){
				dataset = data;
			}
			else{
				alert("数据格式错误");
				$.endPageLoading();
				return;
			}
			if(dataset&&dataset.length>0){
			    var elements = dataset.get(0).get("SELECTED_ELEMENTS");
			    if(elements&&elements.length>0){
			    	selectedElements.selectedEls = elements;
			    	//费用处理
			    	var length = elements.length;
			    	for(var i=0;i<length;i++){
			    		var element = elements.get(i);
			    		if(element.get("MODIFY_TAG")=="0"){
			    			var feeData = element.get("FEE_DATA");
			    			if(feeData!=null&&typeof(feeData)!="undefined"&&feeData.length>0){
			    				var feeSize = feeData.length;
			    				for(var j=0;j<feeSize;j++){
			    					var fee = feeData.get(j);
			    					$.feeMgr.insertFee(fee);
			    				}
			    			}
			    		}
			    	}
			    }
			    else{
			    	selectedElements.selectedEls = new $.DatasetList();
			    }
				
				if($("#AFTER_RENDER_ACTION").val()!=""&&$("#AFTER_RENDER_ACTION").val()!="undefined"){
					eval($("#AFTER_RENDER_ACTION").val());
				}
			}
			else{
				selectedElements.selectedEls = new $.DatasetList();
			}
			$("#elementPanel").css("display","none");
			$.endPageLoading();
		},
		
		errProcess:function(errorCode,errorinfo){
			$("#elementPanel").css("display","none");
			alert(errorinfo);
			$.endPageLoading();
		},
		
		setEnvProductId:function(userProductId,nextProductId,nextProductStartDate){
			this.userProductId = userProductId;
			this.nextProductId = nextProductId;
			this.nextProductStartDate = nextProductStartDate;
		},
		
		//datas为pkgElement对象的集合
		addElements: function(elementIds){
			//添加到已选区
			$.beginPageLoading("已选区加载中。。。。。");
			var params = "&ELEMENTS="+elementIds.toString()+"&EPARCHY_CODE="+productEnv.eparchyCode;
			if($("#basicStartDateControlId").val()!=""){
				params+="&BASIC_START_DATE="+$("#"+$("#basicStartDateControlId").val()).val();
			}
			if($("#basicCancelDateControlId").val()!=""){
				params+="&BASIC_CANCEL_DATE="+$("#"+$("#basicCancelDateControlId").val()).val();
			}
			if(this.isEffectNow){
				params+="&EFFECT_NOW=true";
			}
			if(typeof(getOtherParam)=="function"){
				params += getOtherParam();
			}
			params+="&SELECTED_ELEMENTS="+this.selectedEls.toString()+"&USER_ID="+productEnv.userId+"&TRADE_TYPE_CODE="+$("#SELECTED_TRADE_TYPE_CODE").val();
			params+="&CALL_SVC="+$("#callAddElementSvc").val();
			if(this.userProductId!=null){
				params+="&USER_PRODUCT_ID="+this.userProductId;
			}
			if(this.nextProductId!=null){
				params+="&NEXT_PRODUCT_ID="+this.nextProductId;
			}
			if(this.nextProductStartDate!=null){
				params+="&NEXT_PRODUCT_START_DATE="+this.nextProductStartDate;
			}
			params+="&ACCT_DAY="+$("#ACCT_DAY").val()+"&FIRST_DATE="+$("#FIRST_DATE").val()+"&NEXT_ACCT_DAY="+$("#NEXT_ACCT_DAY").val()+"&NEXT_FIRST_DATE="+$("#NEXT_FIRST_DATE").val();
			hhSubmit(null,"com.ailk.csview.common.component.product.pkgelementlist.SelectedElementsHandler","dealElement", params, selectedElements.afterAddElements,selectedElements.errProcess);
		},
		
		afterAddElements:function(data){
			var length = data.length;
			if(length>0){
				var info = data.get(0);
				if(info.get("ERROR_INFO")){
					var result = window.confirm(info.get("ERROR_INFO").replace(/<br>/ig,"\n")+"\n点击“确定”按钮继续本次操作，但请按照提示处理不符合要求的元素\n点击“取消”按钮取消本次操作");
					if(!result){
						$.endPageLoading();
						return;
					}
				}
				for(var i=0;i<length;i++){
					var el = data.get(i);
					if(el.get("ELEMENT_TYPE_CODE")=="D"){
						selectedElements.drawDiscnt(el);
					}
					else if(el.get("ELEMENT_TYPE_CODE")=="S" || el.get("ELEMENT_TYPE_CODE")=="Z"){
						selectedElements.drawSvc(el);
					}
					selectedElements.selectedEls.add(el);
					if(el.get("MODIFY_TAG")=="0"){
		    			var feeData = el.get("FEE_DATA");
		    			if(feeData!=null&&typeof(feeData)!="undefined"&&feeData.length>0){
		    				var feeSize = feeData.length;
		    				for(var j=0;j<feeSize;j++){
		    					var fee = feeData.get(j);
		    					$.feeMgr.insertFee(fee);
		    				}
		    			}
		    			if(el.get("CHOICE_START_DATE")=="true"){
		    				var isConfirm = window.confirm(el.get("ELEMENT_NAME")+"可以选择立即生效，点击“确定”按钮选择立即生效\n点击“取消”按钮采用默认生效方式");
		    				if(isConfirm){
		    					$("#"+el.get("ITEM_INDEX")+"_START_DATE").val(el.get("EFFECT_NOW_START_DATE").substring(0,10));
		    					selectedElements.changeStartDate($("#"+el.get("ITEM_INDEX")+"_START_DATE"));
		    				}
		    			}
		    		}
				}
			}
			$.endPageLoading();
		},
		
		drawSvc: function(el){
			var drawArea = $("#SelectSvcUl");
			var html=[];
			
			var elementId = el.get("ELEMENT_ID");
			var packageId = el.get("PACKAGE_ID");
			var elConfig = pkgElementList.getElement(elementId);
			var pkgConfig = packageList.getPackage(packageId);
			
			var elForceTag = "";
			var elementName = "";
			var elementType = "";
			var reOrder = "";
			if(elConfig!=null&&typeof(elConfig)!="undefined"){
				elForceTag = elConfig.forceTag;
				elementName = elConfig.elementName;
				elementType = elConfig.elementType;
				reOrder = elConfig.reOrder;
			}
			else{
				elForceTag = el.get("FORCE_TAG");
				elementName = el.get("ELEMENT_NAME");
				elementType = el.get("ELEMENT_TYPE_CODE");
				reOrder = el.get("REORDER");
			}
			
			var pkgForceTag = pkgConfig.forceTag;
			var disabled = false;
			var state = el.get("MODIFY_TAG");
			var style = "";
			var itemIndex = selectedElements.selectedEls.length;
			el.put("ITEM_INDEX",itemIndex);
			el.put("ELEMENT_NAME",elementName);
			if(state=="0"){
				style="new";
			}
			
			if(pkgForceTag == true && elForceTag == true){
				disabled = true;
			} 
			html.push('<li class="'+style+'" title="'+elementName+'"><label class="text"><span>');
			html.push('<input type="checkbox" name="SELECTED_SVC_CHECKBOX" itemIndex="'+itemIndex+'" value="'+elementId+'" class="e_checkbox" checked="true"'+(disabled==true?'disabled=true':'')+' onclick="selectedElements.checkBoxAction(this)"/>');
			html.push(elementName);
			html.push('</span></label>');
			if(el.get("ATTR_PARAM")&&el.get("ATTR_PARAM").length>0){
				html.push('<a href="#nogo" id="'+itemIndex+'_ATTRPARAM" name="'+itemIndex+'_ATTRPARAM" elementId="'+elementId+'" itemIndex="'+itemIndex+'" elementType="'+elementType+'" onclick='+"selectedElements.showAttr(this,this.getAttribute('elementId'),this.getAttribute('elementType'))"+' class="select"></a>');
			}
			html.push('</li>');
			$.insertHtml('afterbegin',drawArea,html.join(""));
			if(reOrder!='R'){
				var el = $("#PE_"+elementType+"_"+elementId);
				el.attr("checked","");
				el.attr("disabled","true");
				$("#PELI_"+elementType+"_"+elementId).attr("className","e_dis");
				$("#LABEL_"+elementType+"_"+elementId).attr("onmouseover",null);
				$("#LABEL_"+elementType+"_"+elementId).attr("onmouseout",null);
			}
		},
		
		drawDiscnt: function(el){
			var drawArea = $("#SelectDiscntTable");
			var html=[];
			
			var elementId = el.get("ELEMENT_ID");
			var packageId = el.get("PACKAGE_ID");
			var elConfig = pkgElementList.getElement(elementId);
			var pkgConfig = packageList.getPackage(packageId);
			
			var elForceTag = "";
			var elementName = "";
			var elementType = "";
			var reOrder = "";
			if(elConfig!=null&&typeof(elConfig)!="undefined"){
				elForceTag = elConfig.forceTag;
				elementName = elConfig.elementName;
				elementType = elConfig.elementType;
				reOrder = elConfig.reOrder;
			}
			else{
				elForceTag = el.get("FORCE_TAG");
				elementName = el.get("ELEMENT_NAME");
				elementType = el.get("ELEMENT_TYPE_CODE");
				reOrder = el.get("REORDER");
			}
			
			var pkgForceTag = pkgConfig.forceTag;
			var disabled = false;
			var state = el.get("MODIFY_TAG");
			var style = "";
			var itemIndex = selectedElements.selectedEls.length;
			el.put("ITEM_INDEX",itemIndex);
			el.put("ELEMENT_NAME",elementName);
			if(state=="0"){
				style="new";
			}
			
			if(pkgForceTag == true && elForceTag == true){
				disabled = true;
			}
			html.push('<tr class="'+style+'" title="'+elementName+'">');
			html.push('<td class="e_center"><input type="checkbox" name="SELECTED_SVC_CHECKBOX" itemIndex="'+itemIndex+'" value="'+elementId+'" class="e_checkbox" checked="true"'+(disabled==true?'disabled=true':'')+' onclick="selectedElements.checkBoxAction(this)"/></td>');
			html.push('<td class="wrap" packageId="'+packageId+'" onclick="selectedElements.selectElementPackage(this)">');
			if(el.get("ATTR_PARAM")&&el.get("ATTR_PARAM").length>0){
				html.push('<a href="#nogo" id="'+itemIndex+'_ATTRPARAM" name="'+itemIndex+'_ATTRPARAM" elementId="'+elementId+'" itemIndex="'+itemIndex+'" elementType="D" onclick='+"selectedElements.showAttr(this,this.getAttribute('elementId'),this.getAttribute('elementType'))"+' class="select"></a>');
			}
			html.push(elementName+'</td>');
			html.push('<td class="e_center edit">');
			html.push('<span class="e_select"><span><span>');
			html.push('<select id="'+itemIndex+'_START_DATE" '+(el.get("CHOICE_START_DATE")=="true"?"":"disabled='false'")+' itemIndex="'+itemIndex+'" onchange="selectedElements.changeStartDate(this)" style="width:91px">');
			html.push('<option value="'+el.get("START_DATE").substring(0,10)+'">'+el.get("START_DATE").substring(0,10)+'</option>');
			if(el.get("CHOICE_START_DATE")=="true"){
				html.push('<option value="'+el.get("EFFECT_NOW_START_DATE").substring(0,10)+'">'+el.get("EFFECT_NOW_START_DATE").substring(0,10)+'</option>');
			}
			html.push("</select></span></span></span>");
			html.push('</td>');
			html.push('<td class="e_center edit">');
			if(el.get("SELF_END_DATE")=="true"){
				html.push('<span class="e_input"><span>');
				html.push('<input type="text" id="'+itemIndex+'_END_DATE" minName="'+itemIndex+'_START_DATE" itemIndex="'+itemIndex+'" desc="结束日期" time="false" datatype="date" format="yyyy-MM-dd" nullable="no" type="text" value="'+el.get("END_DATE").substring(0,10)+'" onblur="selectedElements.checkDate(this)" style="width:91px"/>');
				html.push('</span></span>');
			}
			else{
				html.push('<span class="e_select"><span><span>');
				html.push('<select id="'+itemIndex+'_END_DATE" disabled="'+(el.get("CHOICE_END_DATE")=="true"?"true":"false")+' itemIndex="'+itemIndex+'" onchange="selectedElements.changeEndDate(this)" style="width:91px">');
				html.push('<option value="'+el.get("END_DATE").substring(0,10)+'">'+el.get("END_DATE").substring(0,10)+'</option>');
				if(el.get("CHOICE_END_DATE")=="true"){
					html.push('<option value="'+el.get("EFFECT_NOW_END_DATE").substring(0,10)+'">'+el.get("EFFECT_NOW_END_DATE").substring(0,10)+'</option>');
				}
				html.push("</select></span></span></span>");
			}
			html.push('</td>');
			html.push('</tr>');
			$.insertHtml('afterbegin',drawArea,html.join(""));
			if(reOrder!='R'){
				var el = $("#PE_"+elementType+"_"+elementId);
				el.attr("checked","");
				el.attr("disabled","true");
				$("#PELI_"+elementType+"_"+elementId).attr("className","e_dis");
				$("#LABEL_"+elementType+"_"+elementId).attr("onmouseover",null);
				$("#LABEL_"+elementType+"_"+elementId).attr("onmouseout",null);
			}
		},
		
		checkDate:function(eventObj){
			var obj = $(eventObj);
			var val = obj.val();
			var itemIndex = obj.attr("itemIndex");
			var el = this.selectedEls.get(itemIndex);
			var isCheck = $.verifylib.checkDate(val, "yyyy-MM-dd");
			if(isCheck){
				var startDateObj = $("#"+itemIndex+"_START_DATE");
				if(startDateObj.val()>val){
					alert("结束时间不能小于开始时间");
					obj.val(el.get("END_DATE").substring(0,10));
					return;
				}
				else{
					var isDate = this.isDate(val);
					if(isDate){
						el.put("END_DATE",val+" 23:59:59");
					}
					else{
						alert("输入的日期不正确");
						obj.val(el.get("END_DATE").substring(0,10));
						return;
					}
				}
			}
			else{
				alert("输入有误，请重新输入");
				obj.val(el.get("END_DATE").substring(0,10));
			}
		},
		
		resetDate:function(element){
			$("#"+element.get("ITEM_INDEX")+"_START_DATE").empty();
			$("#"+element.get("ITEM_INDEX")+"_END_DATE").empty();
			var html=[];
			html.push('<option value="'+element.get("START_DATE").substring(0,10)+'">'+element.get("START_DATE").substring(0,10)+'</option>');
			if(element.get("CHOICE_START_DATE")=="true"){
				html.push('<option value="'+element.get("EFFECT_NOW_START_DATE").substring(0,10)+'">'+element.get("EFFECT_NOW_START_DATE").substring(0,10)+'</option>');
			}
			$.insertHtml('afterbegin',$("#"+element.get("ITEM_INDEX")+"_START_DATE"),html.join(""));
			if(element.get("SELF_END_DATE")!="true"){
				html = [];
				html.push('<option value="'+element.get("END_DATE").substring(0,10)+'">'+element.get("END_DATE").substring(0,10)+'</option>');
				if(element.get("CHOICE_END_DATE")=="true"){
					html.push('<option value="'+element.get("EFFECT_NOW_END_DATE").substring(0,10)+'">'+element.get("EFFECT_NOW_END_DATE").substring(0,10)+'</option>');
				}
				$.insertHtml('afterbegin',$("#"+element.get("ITEM_INDEX")+"_END_DATE"),html.join(""));
			}
			$("#"+element.get("ITEM_INDEX")+"_END_DATE").val(element.get("END_DATE").substring(0,10));
		},
		
		checkBoxAction:function(elCheckBox){
			var itemIndex = $(elCheckBox).attr("itemIndex");
			var el = this.selectedEls.get(itemIndex);
			if(elCheckBox.checked){
			    var obj = $("#"+itemIndex+"_ATTRPARAM")
				if(obj){
					obj.attr("disabled","");
				}
			    
			    //add by dingyang
				if(elCheckBox.value=="98" || elCheckBox.value=="99"){
			    var a=$("input[name=SELECTED_SVC_CHECKBOX]");
				for(var i=0;i<a.length;i++){
					if("98"==a[i].value || "99"==a[i].value){
						if(elCheckBox.value!=a[i].value && !a[i].checked){
							a[i].checked=true;
							selectedElements.checkBoxAction(a[i]);
					}
				}
				}
				}
				//add by dingyang
			    
				if(el.get("MODIFY_TAG")=="1"){
					if(el.get("ELEMENT_TYPE_CODE")=="D"){
						elCheckBox.parentNode.parentNode.className="";
					}
					else if(el.get("ELEMENT_TYPE_CODE")=="S"){
						elCheckBox.parentNode.parentNode.parentNode.className="";
					}
					if(el.get("MODIFY_ATTR")=="true"){
						el.put("MODIFY_TAG","2");
					}
					else{
						el.put("MODIFY_TAG","exist");
					}

					el.put("START_DATE",el.get("OLD_START_DATE"));
					el.put("END_DATE",el.get("OLD_END_DATE"));
					if(el.get("ELEMENT_TYPE_CODE")=="D"){
						this.resetDate(el);
					}
					return;
				}
				else if(el.get("MODIFY_TAG")=="0_1"){
					el.put("MODIFY_TAG","0");
					var feeData = el.get("FEE_DATA");
	    			if(feeData!=null&&typeof(feeData)!="undefined"&&feeData.length>0){
	    				var feeSize = feeData.length;
	    				for(var j=0;j<feeSize;j++){
	    					var fee = feeData.get(j);
	    					$.feeMgr.insertFee(fee);
	    				}
	    			}
					return;
				}
			}
			else{
				var obj = $("#"+itemIndex+"_ATTRPARAM")
				if(obj){
					obj.attr("disabled",true);
				}	
				//add by dingyang
				if(elCheckBox.value=="98" || elCheckBox.value=="99"){
				var a=$("[checked]");
				for(var i=0;i<a.length;i++){
					if("98"==a[i].value || "99"==a[i].value){
						
						if(elCheckBox.value!=a[i].value && a[i].checked){
						a[i].checked=false;
						selectedElements.checkBoxAction(a[i]);
						}
					}
				}
				}
				//add by dingyang
				if(el.get("MODIFY_TAG")=="exist"||el.get("MODIFY_TAG")=="2"){
					//表示是用户原有的元素
					if(el.get("ELEMENT_TYPE_CODE")=="D"){
						elCheckBox.parentNode.parentNode.className="e_del";
					}
					else if(el.get("ELEMENT_TYPE_CODE")=="S"){
						elCheckBox.parentNode.parentNode.parentNode.className="e_del";

						
					}
					el.put("MODIFY_TAG","1");//删除
					
					el.put("OLD_START_DATE",el.get("START_DATE"));
					el.put("OLD_END_DATE",el.get("END_DATE"));
				}
				else if(el.get("MODIFY_TAG")=="0"){
					el.put("MODIFY_TAG","0_1");

					var feeData = el.get("FEE_DATA");
	    			if(feeData!=null&&typeof(feeData)!="undefined"&&feeData.length>0){
	    				var feeSize = feeData.length;
	    				for(var j=0;j<feeSize;j++){
	    					var fee = feeData.get(j);
	    					$.feeMgr.deleteFee(fee);
	    				}
	    			}
					return;
				}
			}
			$("#elementPanel").css("display","none");
			if(el.get("MODIFY_TAG")=="1"){
				var tempEls = new $.DatasetList();
				tempEls.add(el);
				var params = "&IS_ELEMENT=true&ELEMENTS="+tempEls.toString()+"&EPARCHY_CODE="+productEnv.eparchyCode;
				if($("#basicStartDateControlId").val()!=""){
					params+="&BASIC_START_DATE="+$("#"+$("#basicStartDateControlId").val()).val();
				}
				if($("#basicCancelDateControlId").val()!=""){
					params+="&BASIC_CANCEL_DATE="+$("#"+$("#basicCancelDateControlId").val()).val();
				}
				if(this.isEffectNow){
					params+="&EFFECT_NOW=true";
				}
				if(typeof(getOtherParam)=="function"){
					params += getOtherParam();
				}
				if(this.userProductId!=null){
					params+="&USER_PRODUCT_ID="+this.userProductId;
				}
				if(this.nextProductId!=null){
					params+="&NEXT_PRODUCT_ID="+this.nextProductId;
				}
				params+="&SELECTED_ELEMENTS="+this.selectedEls.toString()+"&USER_ID="+productEnv.userId+"&CALL_SVC="+$("#callAddElementSvc").val()+"&TRADE_TYPE_CODE="+$("#SELECTED_TRADE_TYPE_CODE").val();
				params+="&ACCT_DAY="+$("#ACCT_DAY").val()+"&FIRST_DATE="+$("#FIRST_DATE").val()+"&NEXT_ACCT_DAY="+$("#NEXT_ACCT_DAY").val()+"&NEXT_FIRST_DATE="+$("#NEXT_FIRST_DATE").val();
				$.beginPageLoading("已选区加载中。。。。。");
				hhSubmit(null,"com.ailk.csview.common.component.product.pkgelementlist.SelectedElementsHandler","dealElement", params, function(data){selectedElements.afterCheckBoxAction(data,elCheckBox)},function(errorCode,errorInfo){selectedElements.errProcessReverse(errorCode,errorInfo,elCheckBox)});
			}
		},
		
		errProcessReverse:function(errorCode,errorInfo,elCheckBox){
			$("#elementPanel").css("display","none");
			alert(errorInfo);
			elCheckBox.click();
			$.endPageLoading();
		},
		
		afterCheckBoxAction: function(data,elCheckBox){
			var element = data.get(0);
			if(element.get("ERROR_INFO")){
				var result = window.confirm(element.get("ERROR_INFO").replace(/<br>/ig,"\n")+"\n点击“确定”按钮继续本次操作，但请按照提示处理不符合要求的元素\n点击“取消”按钮取消本次操作");
				if(!result){
					elCheckBox.click();
					$.endPageLoading();
					return;
				}
			}
			var temp = selectedElements.selectedEls.get(element.get("ITEM_INDEX"));
			temp.put("END_DATE",element.get("END_DATE"));
			temp.put("EFFECT_NOW_START_DATE",element.get("EFFECT_NOW_START_DATE"));
			temp.put("EFFECT_NOW_END_DATE",element.get("EFFECT_NOW_END_DATE"));
			temp.put("OLD_EFFECT_NOW_START_DATE",element.get("OLD_EFFECT_NOW_START_DATE"));
			temp.put("OLD_EFFECT_NOW_END_DATE",element.get("OLD_EFFECT_NOW_END_DATE"));
			if(element.get("ELEMENT_TYPE_CODE")=="D"){
				var html=[];
				html.push('<option value="'+temp.get("END_DATE").substring(0,10)+'">'+temp.get("END_DATE").substring(0,10)+'</option>');
				$.insertHtml('afterbegin',$("#"+element.get("ITEM_INDEX")+"_END_DATE"),html.join(""));
				$("#"+element.get("ITEM_INDEX")+"_END_DATE").val(temp.get("END_DATE").substring(0,10));
				//$("#"+element.get("ITEM_INDEX")+"_END_DATE").attr("disabled","");
			}
			$.endPageLoading();
		},
		
		getElement:function(elementId){
			var length = this.selectedEls.length;
			for(var i=0;i<length;i++){
				var temp = this.selectedEls.get(i);
				if(elementId == temp.get("ELEMENT_ID")){
					return temp;
				}
			}
		},
		
		checkIsExist: function(elementId,elementType){
			var length = this.selectedEls.length;
			for(var i=0;i<length;i++){
				var selectedEl = this.selectedEls.get(i);
				if(selectedEl.get("ELEMENT_ID")==elementId&&selectedEl.get("ELEMENT_TYPE_CODE")==elementType){
					return true;
				}
			}
			return false;
		},
		
		showAttr: function(eventObj,elementId,elementType){
			var params = "&ELEMENT_ID="+elementId+"&ELEMENT_TYPE_CODE="+elementType+"&ITEM_INDEX="+eventObj.getAttribute("itemIndex")+"&EPARCHY_CODE="+productEnv.eparchyCode;	
			if(typeof(getOtherParam)=="function"){
				params += getOtherParam();
			}
			$.ajax.submit(null,null,params,$("#ELEMENTATTR_COMPONENT_ID").val(),function(data){selectedElements.afterShowAttr(data,eventObj,elementId,elementType)});
		},
		
		afterShowAttr: function(data,eventObj,elementId,elementType){
			var itemIndex = eventObj.getAttribute("itemIndex");
			//设置回填值
			var tempElement = selectedElements.selectedEls.get(itemIndex);			 
			if(data&&data.length>0){
				//只有属性类型为9时才会执行弹出自定义窗口设置属性
				var productId = tempElement.get("PRODUCT_ID");
				for(var i=0;i<data.length;i++){
					var popupAttr = data.get(i);
					if(popupAttr.get("PRODUCT_ID")==productId){
						var param = "&ELEMENT_ID="+tempElement.get("ELEMENT_ID")+"&ELEMENT_TYPE_CODE="+tempElement.get("ELEMENT_TYPE_CODE")+"&PRODUCT_ID="+tempElement.get("PRODUCT_ID")+"&PACKAGE_ID="+tempElement.get("PACKAGE_ID")+"&ITEM_INDEX="+itemIndex;
						if(selectedElements.buildPopupAttrParam){
							param+=selectedElements.buildPopupAttrParam();
						}
						$.popupPage(popupAttr.get("ATTR_FIELD_CODE"),popupAttr.get("ATTR_FIELD_NAME"),param,popupAttr.get("TITLE"),popupAttr.get("WIDTH"),popupAttr.get("HEIGHT"));
						return;
					}
				}
			}
			var attrs = tempElement.get("ATTR_PARAM");
			var length = attrs.length;
			for(var i=0;i<length;i++){
				var attr = attrs.get(i);
				var attrCode = attr.get("ATTR_CODE");
				var attrValue = attr.get("ATTR_VALUE");
				if(attrValue){
					var attrObj = $("#"+attrCode);
					attrObj.val(attrValue);
					if(attrObj.attr("type")=="radio"||attrObj.attr("type")=="checkbox"){
						if(attrValue!=""&&attrObj.val()==attrValue){
							attrObj.attr("checked",true);
							attrObj.click();
						}
					}
				}
			}
			var obj = $(eventObj);
			var o = $(eventObj).offset();	
			var topAdd = 0;
			var scroll =  $("div[class=m_wrapper]:first");
			if(scroll.length>0){
				topAdd = scroll.attr("scrollTop");
			}
			$("#elementPanel").css("top", (o.top+obj.height()+topAdd) + "px");
			$("#elementPanel").css("left", (o.left+obj.width()-$("#elementPanel").width()) + "px");
			$("#elementPanel").css("display","");

		},
		
		updateAttr:function(itemIndex,attrParam){
			var tempElement = this.selectedEls.get(itemIndex);
			if(tempElement.get("MODIFY_TAG")!="0"){
				tempElement.put("MODIFY_TAG","2");
				tempElement.put("MODIFY_ATTR","true");
			}
			var newAttrParam = new $.DatasetList(attrParam);
			tempElement.put("ATTR_PARAM",newAttrParam);
		},
		
		getAttrs:function(itemIndex){
			var tempElement = this.selectedEls.get(itemIndex);
			return tempElement.get("ATTR_PARAM");
		},
		
		confirmAttr: function(itemIndex){
			if($.validate.verifyAll('elementPanel')){
				var tempElement = this.selectedEls.get(itemIndex);
				var attrs = tempElement.get("ATTR_PARAM");
				var length = attrs.length;
				var isUpdate = false;
				var checkFlag = false;
				for(var i=0;i<length;i++){
					var attr = attrs.get(i);
					var attrCode = attr.get("ATTR_CODE");
					var attrValue = attr.get("ATTR_VALUE");
					var newAttrValue = $("#"+attrCode).val();
					// 增加GPRS行业应用 APN 名称校验
					if(tempElement.get("ELEMENT_TYPE_CODE") == "S"  && (tempElement.get("ELEMENT_ID") == "78" || tempElement.get("ELEMENT_ID") == "451"|| tempElement.get("ELEMENT_ID") == "461" || tempElement.get("ELEMENT_ID") == "462"))
					{
						if(attrCode == "G78BOSS2" || attrCode == "G451BOSS2" ||  attrCode == "G461BOSS2" || attrCode == "G462BOSS2")
						{
							param = "&ATTR_CODE="+attrCode+"&ATTR_VALUE="+newAttrValue+"&IS_CHECK_ATTR=1";
						    ajaxSubmit(null, null, param, $("#ELEMENTATTR_COMPONENT_ID").val(), function(data) {
							var flag =  data.get("IS_FLAG")
							if(flag == "0")
						    {
								   alert("APN服务名不正确，请重新输入！");
								   $("#"+attrCode).val("");
								   checkFlag = true;
							}	
							    $.endPageLoading();
							},
							function(error_code,error_info,derror){
								$.endPageLoading();
								showDetailErrorInfo(error_code,error_info,derror);
						    },{async:false});	
						}		
					}
					
					if(attrValue!=newAttrValue){
						attr.put("ATTR_VALUE",newAttrValue);
						isUpdate = true;
					}
				}
				if(isUpdate){
					if(tempElement.get("MODIFY_TAG")!="0"){
						tempElement.put("MODIFY_TAG","2");
						tempElement.put("MODIFY_ATTR","true");
					}
				}
				if(checkFlag)
				{
					$("#elementPanel").css("display","");
				}else
				{	
				  $("#elementPanel").css("display","none");
				} 
			}
			//add by xuxf 20140227
			if(tempElement.get("MODIFY_TAG") == "0" &&
			   tempElement.get("ELEMENT_TYPE_CODE") == "D" &&
			   (tempElement.get("ELEMENT_ID") == "50800155" ||
				tempElement.get("ELEMENT_ID") == "50810155" ||
				tempElement.get("ELEMENT_ID") == "50830155" ||
				tempElement.get("ELEMENT_ID") == "50840155" ||
				tempElement.get("ELEMENT_ID") == "50800156" ||
				tempElement.get("ELEMENT_ID") == "50810156" ||
				tempElement.get("ELEMENT_ID") == "50830156" ||
				tempElement.get("ELEMENT_ID") == "50840156" ||
				tempElement.get("ELEMENT_ID") == "50800157" ||
				tempElement.get("ELEMENT_ID") == "50810157" ||
				tempElement.get("ELEMENT_ID") == "50830157" ||
				tempElement.get("ELEMENT_ID") == "50840157" ||
				tempElement.get("ELEMENT_ID") == "50800111" ||
				tempElement.get("ELEMENT_ID") == "50810124" ||
				tempElement.get("ELEMENT_ID") == "50830121" ||
				tempElement.get("ELEMENT_ID") == "50840144" )
			){
				alert("\u5f55\u5165\u91d1\u989d\u7684\u5355\u4f4d\u4e3a\u5143\uff0c\u8bf7\u786e\u8ba4\u662f\u5426\u6536\u8d39"
				  +tempElement.get("ATTR_PARAM").get(0, "ATTR_VALUE")+"\u5143");
			}
			//end by xuxf 20140227
		},
		
		disableAll: function(){
			var els = $("#" + $("#SELECTEDELEMENTS_COMPONENT_ID").val() + " input[name]");
			var length = els.length;
			for(var i=0;i<length;i++){
				els[i].disabled = true;
			}
		},
		
		checkForcePackage: function(){
			var packages = $("#packages").children();
			var size = packages.length;
			for(var i=0;i<size;i++){
				var thePackages = $(packages[i]).children();
				var thePackage = $(thePackages[0]);
				if(thePackage.attr("forceTag")=="1"){
					var length = this.selectedEls.length;
					var isHas = false;
					for(var j=0;j<length;j++){
						var temp = this.selectedEls.get(j);
						if((temp.get("MODIFY_TAG")=="0" || temp.get("MODIFY_TAG")=="exist" || temp.get("MODIFY_TAG") == "2")&& (temp.get("PACKAGE_ID") == thePackage.attr("packageId") || temp.get("NEW_PACKAGE_ID") == thePackage.attr("packageId"))){
							isHas = true;
							break;
						}
					}
					if(!isHas){
						alert("包"+thePackage.attr("packageName")+"是必选包，必须添加该包下的至少一个元素");
						return false;
					}
				}
			}
			return true;
		},
		
		effectNow:function(){
			this.isEffectNow = true;
			var length = this.selectedEls.length;
			for(var i=0;i<length;i++){
				var temp = this.selectedEls.get(i);
				if(temp.get("MODIFY_TAG")=="0" ||temp.get("MODIFY_TAG")=="1" || temp.get("MODIFY_TAG")=="0_1"){
					$("#"+temp.get("ITEM_INDEX")+"_START_DATE").attr("disabled",true);
					if((temp.get("START_DATE").substring(0,10)==temp.get("EFFECT_NOW_START_DATE").substring(0,10))&&temp.get("MODIFY_TAG")=="0"){
						continue; 
					}
					if((temp.get("END_DATE").substring(0,10)==temp.get("EFFECT_NOW_END_DATE").substring(0,10))&&temp.get("MODIFY_TAG")=="1"){
						continue; 
					}
					temp.put("OLD_EFFECT_NOW_START_DATE",temp.get("START_DATE"));
					temp.put("START_DATE",temp.get("EFFECT_NOW_START_DATE"));
					temp.put("OLD_EFFECT_NOW_END_DATE",temp.get("END_DATE"));
					temp.put("END_DATE",temp.get("EFFECT_NOW_END_DATE"));
					if(temp.get("ELEMENT_TYPE_CODE")=="D"){
						this.resetDate(temp);
					}
				}
			}
		},
		
		unEffectNow:function(){
			this.isEffectNow = false;
			var length = this.selectedEls.length;
			for(var i=0;i<length;i++){
				var temp = this.selectedEls.get(i);
				if(temp.get("CHOICE_START_DATE")=="true"){
					$("#"+temp.get("ITEM_INDEX")+"_START_DATE").attr("disabled",false);
				}
				if(temp.get("MODIFY_TAG")=="0" ||temp.get("MODIFY_TAG")=="1" || temp.get("MODIFY_TAG")=="0_1"){
					if((temp.get("OLD_EFFECT_NOW_START_DATE")==null||temp.get("START_DATE").substring(0,10)==temp.get("OLD_EFFECT_NOW_START_DATE").substring(0,10))&&temp.get("MODIFY_TAG")=="0"){
						continue; 
					}
					if((temp.get("OLD_EFFECT_NOW_END_DATE")==null||temp.get("END_DATE").substring(0,10)==temp.get("OLD_EFFECT_NOW_END_DATE").substring(0,10))&&temp.get("MODIFY_TAG")=="1"){
						continue; 
					}
					temp.put("START_DATE",temp.get("OLD_EFFECT_NOW_START_DATE"));
					temp.put("END_DATE",temp.get("OLD_EFFECT_NOW_END_DATE"));
					if(temp.get("ELEMENT_TYPE_CODE")=="D"){
						this.resetDate(temp);
					}
				}
			}
		},
		
		checkMinMax:function(){
			var packageMap = new $.DataMap();
			var length = this.selectedEls.length;
			var packageListTemp = "";
			for(var i=0;i<length;i++){
				var element = this.selectedEls.get(i);
				var elementType = element.get("ELEMENT_TYPE_CODE");
				var packageId = element.get("PACKAGE_ID");
				if(packageListTemp.indexOf(packageId)<0){
					packageListTemp+=packageId+",";
				}
				if(typeof(packageMap.get(packageId+"_"+elementType+"_BEFORE"))=="undefined"){
					packageMap.put(packageId+"_"+elementType+"_BEFORE","0");
				}
				if(typeof(packageMap.get(packageId+"_"+elementType+"_AFTER"))=="undefined"){
					packageMap.put(packageId+"_"+elementType+"_AFTER","0");
				}
				
				if(element.get("MODIFY_TAG")=="0"||element.get("MODIFY_TAG")=="exist"||element.get("MODIFY_TAG")=="2"){
					var startDateTemp = element.get("START_DATE");
					var startDate = new Date(startDateTemp.substring(0,4),(startDateTemp.substring(5,7))-1,startDateTemp.substring(8,10));
					var nowDate = new Date();
					var nextMonth = new Date(nowDate.getFullYear(),nowDate.getMonth()+1,1);
					var endDateTemp = element.get("END_DATE");
					var endDate = new Date(endDateTemp.substring(0,4),(endDateTemp.substring(5,7))-1,endDateTemp.substring(8,10));
					if(startDate<nowDate&&endDate<nextMonth){
						var size = packageMap.get(packageId+"_"+elementType+"_BEFORE");
						size++;
						packageMap.put(packageId+"_"+elementType+"_BEFORE",size+"");
					}
					else{
						var size = packageMap.get(packageId+"_"+elementType+"_AFTER");
						size++;
						packageMap.put(packageId+"_"+elementType+"_AFTER",size+"");
					}
				}
			}
			
			packageListTemp = packageListTemp.substring(0,packageListTemp.length-1);
			var packageListArray = packageListTemp.split(",");
			for(var i=0;i<packageListArray.length;i++){
				var packageConfig = packageList.getPackage(packageListArray[i]);
				var before;
				var after;
				if(packageConfig.limitType=="D"){
					before = packageMap.get(packageConfig.packageId+"_D_BEFORE");
					after = packageMap.get(packageConfig.packageId+"_D_AFTER");
				}
				else if(packageConfig.limitType=="S"){
					var before = packageMap.get(packageConfig.packageId+"_D_BEFORE");
					var after = packageMap.get(packageConfig.packageId+"_D_AFTER");
				}
				else{
					var beforeS =  packageMap.get(packageConfig.packageId+"_S_BEFORE");
					var beforeD =  packageMap.get(packageConfig.packageId+"_D_BEFORE");
					var afterS =  packageMap.get(packageConfig.packageId+"_S_AFTER");
					var afterD =  packageMap.get(packageConfig.packageId+"_D_AFTER");
					before = parseInt(beforeS)+parseInt(beforeD);
					after = parseInt(afterS)+parseInt(afterD);
				}
				if(packageConfig.minNumer!='-1'&&packageConfig.minNumber!=''&&packageConfig.minNumber!=null){
					if(before<packageConfig.minNumber||after<packageConfig.minNumber){
						alert(packageConfig.packageName+'包最少选择'+packageConfig.minNumber+'个元素，请重新选择');
						return false;
					}
				}
				if(packageConfig.maxNumber!='-1'&&packageConfig.maxNumber!=''&&packageConfig.maxNumber!=null){
					if(before>packageConfig.maxNumber||after>packageConfig.maxNumber){
						alert(packageConfig.packageName+'包最多选择'+packageConfig.maxNumber+'个元素，请重新选择');
						return false;
					}
				}
			}
			return true;
		},
		
		getSubmitData:function(){
			//if(!this.checkMinMax()){
				//return;
			//}
			var length = this.selectedEls.length;
			var submitData = $.DatasetList();
			for(var i=0;i<length;i++){
				var temp = this.selectedEls.get(i);
				if(temp.get("MODIFY_TAG")=="0" ||temp.get("MODIFY_TAG")=="1"||temp.get("MODIFY_TAG")=="2"){
					var data = new $.DataMap();
					data.put("ELEMENT_ID",temp.get("ELEMENT_ID"));
					data.put("ELEMENT_TYPE_CODE",temp.get("ELEMENT_TYPE_CODE"));
					data.put("PRODUCT_ID",temp.get("PRODUCT_ID"));
					data.put("PACKAGE_ID",temp.get("PACKAGE_ID"));
					data.put("ATTR_PARAM",temp.get("ATTR_PARAM"));
					data.put("MODIFY_TAG",temp.get("MODIFY_TAG"));
					data.put("START_DATE",temp.get("START_DATE"));
					data.put("END_DATE",temp.get("END_DATE"));
					data.put("INST_ID",temp.get("INST_ID"));
					//temp.removeKey("ELEMENT_NAME");
					//temp.removeKey("ELEMENT_FORCE_TAG");
					//temp.removeKey("PACKAGE_FORCE_TAG");
					//temp.removeKey("OLD_START_DATE");
					//temp.removeKey("OLD_END_DATE");
					//temp.removeKey("OLD_PRODUCT_ID");
					//temp.removeKey("OLD_PACKAGE_ID");
					//temp.removeKey("EFFECT_NOW_START_DATE");
					//temp.removeKey("EFFECT_NOW_END_DATE");
					//temp.removeKey("OLD_EFFECT_NOW_START_DATE");
					//temp.removeKey("OLD_EFFECT_NOW_END_DATE");
					//temp.removeKey("DISABLED");
					//temp.removeKey("ITEM_INDEX");
					submitData.add(data);
				}
			}
			return submitData;
		},
		
		changeStartDate: function(eventObj){
			var obj = $(eventObj);
			var itemIndex = obj.attr("itemIndex");
			var el = this.selectedEls.get(itemIndex);
			var elEnd = $("#"+itemIndex+"_END_DATE");
			var value = obj.val();
			if(value==(el.get("EFFECT_NOW_START_DATE").substring(0,10))){
				el.put("OLD_EFFECT_NOW_START_DATE",el.get("START_DATE"));
				el.put("OLD_EFFECT_NOW_END_DATE",el.get("END_DATE"));
				el.put("START_DATE",el.get("EFFECT_NOW_START_DATE"));
				el.put("END_DATE",el.get("EFFECT_NOW_END_DATE"));
			}
			else if(value==el.get("OLD_EFFECT_NOW_START_DATE").substring(0,10)){
				el.put("START_DATE",el.get("OLD_EFFECT_NOW_START_DATE"));
				el.put("END_DATE",el.get("OLD_EFFECT_NOW_END_DATE"));
			}
			if(el.get("SELF_END_DATE")!="true"){
				$("#"+itemIndex+"_END_DATE").empty();
				html = [];
				html.push('<option value="'+el.get("END_DATE").substring(0,10)+'">'+el.get("END_DATE").substring(0,10)+'</option>');
				$.insertHtml('afterbegin',$("#"+itemIndex+"_END_DATE"),html.join(""));
			}
			elEnd.val(el.get("END_DATE").substring(0,10));
		},
		
		changeEndDate:function(eventObj){
		
		},
		
		getSelectedElsData:function(){
			var length = this.selectedEls.length;
			var selectedElesData = $.DatasetList();
			for(var i=0;i<length;i++){
				var temp = this.selectedEls.get(i);
				if(temp.get("MODIFY_TAG") != "0_1"){
					var data = new $.DataMap();
					data.put("ELEMENT_ID",temp.get("ELEMENT_ID"));
					data.put("ELEMENT_TYPE_CODE",temp.get("ELEMENT_TYPE_CODE"));
					data.put("PRODUCT_ID",temp.get("PRODUCT_ID"));
					data.put("PACKAGE_ID",temp.get("PACKAGE_ID"));
					data.put("ATTR_PARAM",temp.get("ATTR_PARAM"));
					data.put("MODIFY_TAG",temp.get("MODIFY_TAG"));
					data.put("START_DATE",temp.get("START_DATE"));
					data.put("END_DATE",temp.get("END_DATE"));
					data.put("INST_ID",temp.get("INST_ID"));
					
					selectedElesData.add(data);
				}
			}
			return selectedElesData;
		},
		
		selectElementPackage:function(eventObj){
			var obj = $(eventObj);
			var packageId = obj.attr("packageId");
			try{
				packageList.selectedPackageAction(packageId);
			}
			catch(e){
			
			}
		},
		
		isDate:function(dateValue) { 
			var regex = new RegExp("^(?:(?:([0-9]{4}(-|\/)(?:(?:0?[1,3-9]|1[0-2])(-|\/)(?:29|30)|((?:0?[13578]|1[02])(-|\/)31)))|([0-9]{4}(-|\/)(?:0?[1-9]|1[0-2])(-|\/)(?:0?[1-9]|1\\d|2[0-8]))|(((?:(\\d\\d(?:0[48]|[2468][048]|[13579][26]))|(?:0[48]00|[2468][048]00|[13579][26]00))(-|\/)0?2(-|\/)29))))$"); 
			if (!regex.test(dateValue)) { 
				return false; 
			} 
			return true;
		}
	}); 
}
)();