if(typeof(UserPlatSvcsList)=="undefined"){window["UserPlatSvcsList"]=function(){};var userPlatSvcsList = new UserPlatSvcsList();}
(function(){
	$.extend(UserPlatSvcsList.prototype,{
		selectedElements: new $.DatasetList(),
		allCancels: new $.DataMap(),
		allSwitch: new $.DataMap(),
		eparchyCode:null,
		operCode: "",
		userId:"",
		attrVisable:false,
		renderComponent: function(userId,eparchyCode){
			var data="&USER_ID="+userId+"&ROUTE_EPARCHY_CODE="+eparchyCode;
			this.eparchyCode = eparchyCode;
			this.userId = userId;
			$.ajax.submit(null,null,data,$("#USERPLATSVCSLIST_COMPONENT_ID").val(),userPlatSvcsList.afterRender);
		},
		
		afterRender: function(data){
			if(data&&data.length>0){
				userPlatSvcsList.selectedElements = data;
				for(var i=0;i<data.length;i++){
					$("#"+i+"_OPERCODE").attr("disabled",true);
					$("#"+i+"_ATTRPARAM").bind("click",function(){userPlatSvcsList.showAttr(this,this.getAttribute('elementId'),this.getAttribute('elementType'),true,"");});
				}
			}
			else{
				userPlatSvcsList.selectedElements = new $.DatasetList();
			}
		},
		
		//清理
		clearCache: function(data){
		   userPlatSvcsList.selectedElements.clear();
		   userPlatSvcsList.allCancels.clear();
		   userPlatSvcsList.allSwitch.clear();
		   userPlatSvcsList.eparchyCode = null;
		   userPlatSvcsList.operCode = "";
		   userPlatSvcsList.userId = "";
		   userPlatSvcsList.attrVisable = false;
		},
		
		findElement: function(serviceId){
			if(this.selectedElements!=null){
				var size = this.selectedElements.length;
				for(var i=0;i<size;i++){
					var data = this.selectedElements.get(i);
					if(data.get("SERVICE_ID")==serviceId){
						return data;
					}
				}
			}
			return null;
		},
		
		addElement: function(serviceId){
			var data = '&SERVICE_ID='+serviceId+'&IS_ELEMENT=true';
			$.ajax.submit(null,null,data,$("#USERPLATSVCSLIST_COMPONENT_ID").val(),userPlatSvcsList.afterAddElement);
		},
		
		afterAddElement: function(data){
			if(data){
				var drawTbody = $("#userPlatSvcTable");
				var html=[];
				var itemIndex = userPlatSvcsList.selectedElements.length;
				html.push('<tr class="new">');
				html.push('<td class="e_center"><input type="checkbox" class="e_checkbox" itemIndex="'+itemIndex+'" name="'+itemIndex+'_USERCHECKBOX" id="'+itemIndex+'_USERCHECKBOX" checked onclick="userPlatSvcsList.checkBoxAction(this)"/></td>');
				html.push('<td class="edit">');
				html.push('<span class="e_select"><span><span>');
				html.push('<select onchange="userPlatSvcsList.changeOrderGiftOper(this,'+itemIndex+')">');
				var supportOpers = data.get('SUPPORT_OPERS');
				for(var i=0;i<supportOpers.length;i++){
					var oper = supportOpers.get(i);
					html.push('<option value="'+oper.get("OPER_CODE")+'">'+oper.get("OPER_NAME")+'</option>');
				}
				html.push('</select>');
				html.push('</span></span></span>');
				html.push('</td>');
				html.push('<td>')
				if(data.get("ATTR_PARAM")&&data.get("ATTR_PARAM").length>0){
					html.push('<a href="#nogo" elementId="'+data.get("SERVICE_ID")+'" itemIndex="'+itemIndex+'" id="'+itemIndex+'_ATTRPARAM" name="'+itemIndex+'_ATTRPARAM" elementType="Z" class="select"></a>');
				}
				html.push(data.get("SERVICE_NAME")+'</td>');
				html.push('<td>'+data.get("BIZ_STATE")+'</td>');
				html.push('<td>'+data.get("START_DATE")+'</td>');
				html.push('<td>'+data.get("END_DATE")+'</td>');
				html.push('<td></td>');
				html.push('<td>'+data.get("BIZ_TYPE_NAME")+'</td>');
				html.push('<td>'+data.get("BIZ_CODE")+'</td>');
				html.push('<td>'+data.get("SP_CODE")+'</td>');
				html.push('<td>'+data.get("SP_NAME")+'</td>');
				html.push('<td>'+data.get("BILL_TYPE")+'</td>');
				html.push('<td>'+data.get("PRICE")+'</td>');
				drawTbody.prepend(html.join(""));
				
				//$.insertHtml('afterbegin',drawTbody,html.join(""));
				$("#"+itemIndex+"_ATTRPARAM").bind("click",function(){userPlatSvcsList.showAttr(this,this.getAttribute('elementId'),this.getAttribute('elementType'),false,'06');});
				var map = new $.DataMap();
				map.put("SERVICE_ID",data.get("SERVICE_ID"));
				map.put("BIZ_STATE_CODE","A");
				map.put("MODIFY_TAG","0");
				map.put("OPER_CODE","06");
				if(data.get("ATTR_PARAM")){
					map.put("ATTR_PARAM",data.get("ATTR_PARAM"));
				}
				userPlatSvcsList.selectedElements.add(map);
			}
		},
		
		checkBoxAction: function(eventObj){
			var element = this.selectedElements.get($(eventObj).attr("itemIndex"))
			if(eventObj.checked){
				if(element.get("MODIFY_TAG")=="0_1"){
					element.put("MODIFY_TAG","0");
				}
				else{
					var operObj = $("#"+$(eventObj).attr("itemIndex")+"_OPERCODE");
					operObj.attr("disabled",false);
					element.put("OPER_CODE",operObj.attr("initValue"));
					element.put("MODIFY_TAG","1");
				}
			}
			else{
				if(element.get("MODIFY_TAG")=="0"){
					//新增服务
					element.put("MODIFY_TAG","0_1");
				}
				else{
					element.put("MODIFY_TAG","exist");
					element.remove("OPER_CODE");
					var operObj = $("#"+$(eventObj).attr("itemIndex")+"_OPERCODE");
					operObj.attr("disabled",true);
					operObj.val(operObj.attr("initValue"));
				}
			}
		},
		
		changeOperCode: function(eventObj){
			var itemIndex = $(eventObj).attr("itemIndex");
			var element = this.selectedElements.get($(eventObj).attr("itemIndex"));
			if(eventObj.value!="02"&&eventObj.value!="07"){
				element.put("MODIFY_TAG","2");
			}
			else{
				element.put("MODIFY_TAG","1");
			}
			element.put("OPER_CODE",eventObj.value);
			
			if(eventObj.value=="03" || eventObj.value=="08" ||eventObj.value=="10"||eventObj.value=="11"||eventObj.value=="12"||eventObj.value=="17"||eventObj.value=="18"){
				$("#"+itemIndex+"_ATTRPARAM").unbind("click");
				$("#"+itemIndex+"_ATTRPARAM").bind("click",function(){userPlatSvcsList.showAttr(this,this.getAttribute('elementId'),this.getAttribute('elementType'),false,eventObj.value);});
				$("#"+itemIndex+"_ATTRPARAM").trigger("click");
			}
			else{
				$("#"+itemIndex+"_ATTRPARAM").unbind("click");
				$("#"+itemIndex+"_ATTRPARAM").bind("click",function(){userPlatSvcsList.showAttr(this,this.getAttribute('elementId'),this.getAttribute('elementType'),true,"");});
				$("#elementPanel").css("display","none");
			}
		},
		
		changeOrderGiftOper: function(eventObj,itemIndex){
			var oper = eventObj.value;
			var element = this.selectedElements.get(itemIndex);
			element.put("OPER_CODE",oper);
			if(oper=="GIFT"){
				var giftSerialNumber = element.get("GIFT_SERIAL_NUMBER");
				var giftStartDate = element.get("GIFT_START_DATE");
				var giftEndDate = element.get("GIFT_END_DATE");
				if(giftSerialNumber!="undefined"&&giftSerialNumber){
					$("#GIFT_SERIAL_NUMBER").val(giftSerialNumber);
				}
				else{
					$("#GIFT_SERIAL_NUMBER").val("");
				}
				$("#GIFT_START_DATE").val(giftStartDate);
				if(giftEndDate!="undefined"&&giftEndDate){
					$("#GIFT_END_DATE").val(giftEndDate);
				}
				else{
					$("#GIFT_END_DATE").val("");
				}
				
				$("#GIFT_ITEM_INDEX").val(itemIndex);
				var obj = $(eventObj);
				var o = $(eventObj).offset();	
				$("#giftPanel").css("top", (o.top+obj.height()) + "px");
				$("#giftPanel").css("left", (o.left+obj.width()-$("#giftPanel").width()+100) + "px");
				$("#giftPanel").css("display","");
			}
			else{
				$("#giftPanel").css("display","none");
			}
		},
		
		confirmGift:function(){
			if($.validate.verifyAll('giftPanel')){
				var giftSerialNumber = $("#GIFT_SERIAL_NUMBER").val();
				var giftStartDate = $("#GIFT_START_DATE").val();
				var giftEndDate = $("#GIFT_END_DATE").val();
				var giftItemIndex = $("#GIFT_ITEM_INDEX").val();
				if(giftEndDate<=giftStartDate){
					alert("赠送结束时间不能小于赠送开始时间");
					return false;
				}
				var itemIndex = $("#GIFT_ITEM_INDEX").val();
				var element = this.selectedElements.get(itemIndex);
				element.put("GIFT_SERIAL_NUMBER",giftSerialNumber);
				element.put("GIFT_START_DATE",giftStartDate);
				element.put("GIFT_END_DATE",giftEndDate);
				$("#giftPanel").css("display","none");
			}
		},
		
		showAttr: function(eventObj,elementId,elementType,isView,operCode){
		    userPlatSvcsList.attrVisable = true;
			userPlatSvcsList.operCode = operCode;
			var params = "&ELEMENT_ID="+elementId+"&ELEMENT_TYPE_CODE="+elementType+"&ITEM_INDEX="+eventObj.getAttribute("itemIndex")+"&EPARCHY_CODE="+this.eparchyCode+"&USER_ID="+this.userId;
			if(operCode!=null&&typeof(operCode)!="undefined"){
				params+="&DISPLAY_CONDITION="+operCode;
			}
			$.ajax.submit(null,null,params,$("#ELEMENTATTR_COMPONENT_ID").val(),function(data){userPlatSvcsList.afterShowAttr(data,eventObj,elementId,elementType,isView)});
		},
		
		afterShowAttr: function(data,eventObj,elementId,elementType,isView){
			var itemIndex = eventObj.getAttribute("itemIndex");
			//设置回填值
			var tempElement = userPlatSvcsList.selectedElements.get(itemIndex);
			var attrs = tempElement.get("ATTR_PARAM");
			var length = attrs.length;
			for(var i=0;i<length;i++){
				var attr = attrs.get(i);
				var attrCode = attr.get("ATTR_CODE");
				var attrValue = attr.get("ATTR_VALUE");
				if(attrValue){
					$("#"+attrCode).val(attrValue);
				}
				if(isView){
					$("#"+attrCode).attr("disabled",true);
				}
				if($("#"+attrCode).attr("onchange")){
					$("#"+attrCode).trigger("onchange");
				}
			}
			
			//手机支付特殊处理，默认填写证件号码
			if(elementId == '99081371')
			{
			   var psptType =  $("#CARDTYPE").val();
			   var psptNO = $("#CARDNUM").val();
			   if(psptType == '')
			   {
			     $("#CARDNUM").val($("#PSPT_ID").val());
			   }
			   if(psptNO == '')
			   {
			      $("#CARDTYPE").val('00');//默认取身份证
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
		
		confirmAttr: function(itemIndex){
		  var tempElement1 = this.selectedElements.get(itemIndex);
			var serviceId = tempElement1.get("SERVICE_ID");
			if("98000201"==serviceId)
			{
				$("#AIOBS_PASSWORD").removeAttr("equsize");
				$("#OLD_PASSWORD").removeAttr("equsize");
			}
			if($.validate.verifyAll('elementPanel')){
				var tempElement = this.selectedElements.get(itemIndex);
				var attrs = tempElement.get("ATTR_PARAM");
				var length = attrs.length;
				var isUpdate = false;
				for(var i=0;i<length;i++){
					var attr = attrs.get(i);
					var attrCode = attr.get("ATTR_CODE");
					var attrValue = attr.get("ATTR_VALUE");
					var newAttrValue = $("#"+attrCode).val();
					if(attrValue!=newAttrValue){
						attr.put("ATTR_VALUE",newAttrValue);
						isUpdate = true;
					}
				}
				if(isUpdate&&tempElement.get("MODIFY_TAG")!="0"&&tempElement.get("MODIFY_TAG")!="1"){
					tempElement.put("MODIFY_TAG","2");
				}
				
				userPlatSvcsList.attrVisable = false;
				$("#elementPanel").css("display","none");
				
			}
		},
		
		addAllCancel: function(eventObj){
			var obj = $(eventObj);
			if(eventObj.checked){
				if(obj.val()=="SP"){
					$("#ALL_CANCEL_SP").attr("disabled","");
					this.allCancels.put(obj.val(),$("#ALL_CANCEL_SP").val());
				}
				else{
					this.allCancels.put(obj.val(),obj.val());
				}
			}
			else{
				this.allCancels.removeKey(obj.val());
				if(obj.val()=="SP"){
					$("#ALL_CANCEL_SP").attr("disabled","true");
				}
			}
		},
		
		addAllSwitch: function(eventObj){
			var obj = $(eventObj);
			var temp = new $.DataMap();
			if(eventObj.checked){
				temp.put("SERVICE_ID",obj.val());
				if(obj.attr("isClose") == "false"){
					temp.put("OPER_CODE","91");
				}
				else{
					temp.put("OPER_CODE","90");
				}
				this.allSwitch.put(obj.val(),temp);
			}
			else{
				this.allSwitch.removeKey(obj.val());
			}
		},
		
		changeSpAllCancel: function(eventObj){
			var obj = $(eventObj);
			if(this.allCancels.get("SP")){
				this.allCancels.put("SP",obj.val());
			}
		},
		
		getAllCancelSpCode: function(){
			var result = new $.DataMap();
			var size = this.selectedElements.length;
			for(var i=0;i<size;i++){
				var element = this.selectedElements.get(i);
				if(element.get("SP_CODE")&&element.get("ORG_DOMAIN")=="DSMP"){
					result.put(element.get("SP_CODE"),element.get("SP_NAME"));
				}
			}
			return result;
		},
		
		isExist: function(temp,flag){
			var size = this.selectedElements.length;
			for(var i=0;i<size;i++){
				var element = this.selectedElements.get(i);
				if(flag=="1"&&element.get("BIZ_TYPE_CODE")==temp){
					return true;
				}
				else if(flag=="2"&&element.get("ORG_DOMAIN")==temp){
					return true;
				}
			}
			return false;
		},
		
		getOperElements: function(eventObj){
			var length = this.selectedElements.length;
			var submitElements = new $.DatasetList();
			for(var i=0;i<length;i++){
				var element = this.selectedElements.get(i);
				if(element.get("MODIFY_TAG")=="0"||element.get("MODIFY_TAG")=="1"||element.get("MODIFY_TAG")=="2"){
					if(element.get("OPER_CODE") == "06"){
						element.removeKey("GIFT_SERIAL_NUMBER");
						element.removeKey("GIFT_START_DATE");
						element.removeKey("GIFT_END_DATE");
					}
					element.removeKey("ORG_DOMAIN");
					element.removeKey("SP_CODE");
					element.removeKey("SP_NAME");
					//element.removeKey("BIZ_TYPE_CODE");
					submitElements.add(element);
				}
			}
			return submitElements;
		}
	});
})();

﻿if(typeof(SelectedElements)=="undefined"){window["SelectedElements"]=function(){};var selectedElements = new SelectedElements();}
(function(){
	$.extend(SelectedElements.prototype,{
		confirmAttr: function(itemIndex){
			userPlatSvcsList.confirmAttr(itemIndex);
		}
	});
})();

