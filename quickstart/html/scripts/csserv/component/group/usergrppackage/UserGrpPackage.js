
function packageTreeTextAction(data){
	var nodeid = data.id;
	if(nodeid.indexOf('node_')==0){
		var product_package=nodeid.replace("node_","").split('^');
	
		if(product_package.length != 2) return;
		var productid = product_package[0];
		var packageid = product_package[1];
		var grpUserEparchyCode = $('#USERGRPPACKAGE_EPARCHY_CODE').val();
		$('#USERGRPPACKAGE_PRODUCT_ID').val(productid);
		$('#USERGRPPACKAGE_PACKAGE_ID').val(packageid);
		var params = "&PACKAGE_ID="+packageid+"&PRODUCT_ID="+productid+'&TAG=0'+'&GRP_USER_EPARCHYCODE='+grpUserEparchyCode;
		hhSubmit(null,"com.ailk.csview.common.component.group.usergrppackage.UserGrpPackageHttpHandler","renderUserGrpPackageList", params, function(data){initElementList(data)},'');
		
	}
	
}

function initElementList(data){
	var elementList = data;
	$("#qryGrpPackageList").html('');
	var productId = $('#USERGRPPACKAGE_PRODUCT_ID').val();
	var packageId = $('#USERGRPPACKAGE_PACKAGE_ID').val();
	if(elementList==null||elementList==""||elementList=="undefined"){
		
	}
	else{
		elementList.each(function(item,index,totalCount){
			var elementId = item.get("ELEMENT_ID");
			var elementName = item.get("ELEMENT_NAME");
			var elementType = item.get("ELEMENT_TYPE_CODE");
			var elementIdDetail = productId+'^'+packageId+'^'+elementId+'^'+elementType;
			$("#qryGrpPackageList").prepend(makeLiQryGrpPackageHTML(elementId,elementName,elementType,elementIdDetail));
		});
	}
}
		

function addUserGrpElements(){
	var grpPackageList = $("#grpPackageCheckPart input:checked");
	grpPackageList.each(function(){
	
		var elementid = $(this).val();
		var elementname = $(this).attr('elementname');
		var elementtype = $(this).attr('elementtype');
		if(!ExistGrpElement(elementid)){
			$("#selectedGrpPackageList").prepend(makeSelectedGrpPackaeHTML(elementid,elementname,elementtype));
		}	
	});
	commparaGrpPackageElements();
}

function addUserGrpElement(elementId,elementTypeCode,elementName){
	if(!ExistGrpElement(elementId)){
		$("#selectedGrpPackageList").prepend(makeLiSelectedGrpPackaeHTML(elementId,elementName,elementTypeCode));
	}	
	
	commparaGrpPackageElements();
}

function ExistGrpElement(elementid){
	var grpPackageList = $("#selectedGrpPackageList input");
	var existelement = false;
	grpPackageList.each(function(){
		if($(this).val()==elementid){
			existelement=true;
			return false;
		}
	});
	return existelement;
}

function delUserGrpElements(){
	var grpPackageList = $("#selectedGrpPackageList input:checked");
	grpPackageList.each(function(){
		$(this).parent().parent().remove();
	});
	commparaGrpPackageElements();
}

function delUserGrpElement(delObj){
	$(delObj).parent().remove();
	commparaGrpPackageElements();
}

function makeSelectedGrpPackaeHTML(elementid, elementname, elementtype){
		var html="";
		html += '<tr>';
		html += '<td><input id="ELEMENT_" type="checkbox" value="'+elementid+'" /></td>';
		html += '<td class="wrap">' + elementname+ '</td>';
		html += '<td class="wrap" style="display:none">' + elementtype+ '</td>';
		html += '</tr>';
		
		return html;
}

function makeLiSelectedGrpPackaeHTML(elementid, elementname, elementtype){
		var elementIdStr = elementid.split('^')[2];
		var html="";
		html += '<li title=\''+elementname+'\'>';
		html += '<button type="button"  onclick="delUserGrpElement(this);"  style="display:none" onmouseover="this.style.display=\'\';" onmouseout="this.style.display = \'none\';"><i class="e_ico-pre"></i><span>删除</span></button>';
		html += '<label class="text" onmouseover="$(this).prev().css(\'display\',\'\');" onmouseout="$(this).prev().css(\'display\',\'none\');"><input style="display:none" id="usercheck" name="usercheck" type="checkbox" value=\''+elementid+'\'" /><span>['+elementIdStr+']'+elementname+'</span></label>';
		html += '</li>';
		return html;
}


function makeLiQryGrpPackageHTML(elementid, elementname, elementtype, elementIdDetail){
		
		var html="";
		html += '<li title=\''+elementname+'\'>';
		html += '<button type="button"  onclick="addUserGrpElement(\''+elementIdDetail+'\',\''+elementtype+'\',\''+elementname+'\');"  style="display:none" onmouseover="this.style.display=\'\';" onmouseout="this.style.display = \'none\';"><i class="e_ico-next"></i><span>添加</span></button>';
		html += '<label class="text" onmouseover="$(this).prev().css(\'display\',\'\');" onmouseout="$(this).prev().css(\'display\',\'none\');"><span>['+elementid+']'+elementname+'</span></label>';
		html += '</li>';
		return html;
}


function commparaGrpPackageElements(){
    var selectedGrpPackageElements =  $.DatasetList();
	var oldselectliststr = $("#OLD_GRPPACKAGE_LIST").val();
	
	if(oldselectliststr==''){
		oldselectliststr='[]';
	}
	var oldselectlist= $.DatasetList(oldselectliststr);
	var grpPackageList = $("#selectedGrpPackageList input");
	//判断新增的元素
	grpPackageList.each(function(){
		var checkvalue = $(this).val();
		var checkvaluelist = checkvalue.split('^');
		var productId = checkvaluelist[0];
		var packageId = checkvaluelist[1];
		var elementid = checkvaluelist[2];
		var elementtype = checkvaluelist[3];
		
		var existSelectEle = false;
		oldselectlist.each(function(item, index, totalcount){
			if(productId==item.get("PRODUCT_ID") && packageId==item.get("PACKAGE_ID") && elementid==item.get("ELEMENT_ID") && elementtype==item.get("ELEMENT_TYPE_CODE")){
				existSelectEle=true;
				return false;
			}
		});
		if(!existSelectEle){
			var elem = $.DataMap();
			elem.put("ELEMENT_ID",elementid);
			elem.put("PRODUCT_ID",productId);
			elem.put("PACKAGE_ID",packageId);
			elem.put("ELEMENT_TYPE_CODE",elementtype);
			elem.put("MODIFY_TAG","0");
			selectedGrpPackageElements.add(elem);
		}
		
	});
	
	
	//判断新增的元素
	oldselectlist.each(function(item, index, totalcount){
	
		var existSelectEle = false;
		grpPackageList.each(function(){
			var checkvalue = $(this).val();
			var checkvaluelist = checkvalue.split('^');
			var productId = checkvaluelist[0];
			var packageId = checkvaluelist[1];
			var elementid = checkvaluelist[2];
			var elementtype = checkvaluelist[3];
			if(productId==item.get("PRODUCT_ID") && packageId==item.get("PACKAGE_ID") && elementid==item.get("ELEMENT_ID") && elementtype==item.get("ELEMENT_TYPE_CODE")){
				existSelectEle=true;
				return false;
			}
		});
		if(!existSelectEle){
			var elem = $.DataMap();
			elem.put("ELEMENT_ID",item.get("ELEMENT_ID"));
			elem.put("PRODUCT_ID",item.get("PRODUCT_ID"));
			elem.put("PACKAGE_ID",item.get("PACKAGE_ID"));
			elem.put("ELEMENT_TYPE_CODE",item.get("ELEMENT_TYPE_CODE"));
			elem.put("MODIFY_TAG","1");
			selectedGrpPackageElements.add(elem);
		}
		
	});
	
	$("#SELECTED_GRPPACKAGE_LIST").val(selectedGrpPackageElements);
	
}