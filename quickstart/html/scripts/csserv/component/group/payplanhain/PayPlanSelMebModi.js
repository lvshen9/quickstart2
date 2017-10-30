function validateCrtMb() {
    var planType = getElement('PLAN_TYPE').value;
    if (planType == "") {
        alert('\u8BF7\u8F93\u9009\u62E9\u4ED8\u8D39\u7C7B\u578B\uFF01');
        getElement('PLAN_TYPE').focus();
        return false;
    }
    
    saveData();
    
    var selectPlanName = getElement('PLAN_TYPE');
    var ds = new Wade.DatasetList(document.getElementById("grpPayRels").value);
    var dsPlanType = new Wade.DatasetList(document.getElementById("oldPayPlanSet").value);
    var planId = "";
    for (var i=0;i<dsPlanType.length;i++) {
        var map=dsPlanType.get(i);
        var tPlanType=map.get("PLAN_TYPE_CODE");
        if (tPlanType == planType) {
            planId=map.get("PLAN_ID");
            break;
        }
    }
    
    var data = new Wade.DataMap();
    data.put("PLAN_TYPE",planType);
	data.put("PLAN_NAME",selectPlanName.options[selectPlanName.selectedIndex].innerText);	
    data.put("FEE_LIMIT", getElementValue("FEE_LIMIT", "0"));
    data.put("ITEM_SET",ds);
    data.put("PLAN_ID",planId);
    data.put("STATE","ADD");
    
    document.getElementById("grpPayRels").value = data;
    
    if (planType =="G" && ds.length==0) {
    	alert('\u6CA1\u6709\u9009\u62E9\u4ED8\u8D39\u8D26\u76EE\uFF0C\u8BF7\u9009\u62E9\u4ED8\u8D39\u8D26\u76EE\u540E\u518D\u8FDB\u884C\u4E0B\u4E00\u6B65\u64CD\u4F5C\u0021');
    	return false;
    }
    
    var feelimit = getElementValue("FEE_LIMIT", "0");
    var reg= /^([0-9]|(0[.]))[0-9]{0,}(([.]*\d{1,2})|[0-9]{0,})$/;

	if (planType =="G" && !reg.test(feelimit)){
		alert('\u4ED8\u8D39\u9650\u989D\u5FC5\u987B\u4E3A\u6570\u5B57\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165\uFF01');
		return false;
	}
	if(planType =="G" && parseInt(feelimit) > 999999999){
		
		alert("\u4ED8\u8D39\u9650\u5B9A\u989D\u5EA6\u4E0D\u80FD\u5927\u4E8E\u0039\u0039\u0039\u0039\u0039\u0039\u0039\u0039\u0039\uFF0C\u8BF7\u91CD\u65B0\u8F93\u5165\uFF01");
		return false;
	}
    if ( planType =="G" && feelimit == "0") {
	    var confirTag = confirm("\u4ED8\u8D39\u9650\u989D\u4E3A\u0030\uFF0C\u5219\u4E3A\u4E0D\u9650\u5236\u989D\u5EA6\uFF0C\u662F\u5426\u7EE7\u7EED\uFF01") ;
	   	if(confirTag == true){ 
	    	return true;  
	    }else{
	    	return false;
		}
    }    
    
    return true;
}

function payPlanSelInit() {
	window["payRelationTable"] = new TableEdit("payRelationTable",false,clickColumn);
}

function selectPayPlan() {
	var planType = getElement('PLAN_TYPE');
	var payPlan = planType.value;
	if (payPlan != "G") {
		hidden(getElement('items'), true);
		getElement('FEE_LIMIT').setAttribute('nullable', 'yes');
		getElement('FEE_LIMIT').value = '0';
		return ;
	} else {
		hidden(getElement('items'), false);
		getElement('FEE_LIMIT').setAttribute('nullable', 'no');
		getElement('FEE_LIMIT').value = '0';
	}
	payPlanSelInit();
}

function clickColumn(e){
	var td = null;
	if (e.target.tagName == 'INPUT') {
	    if (e.target.checked == true) {
		    td = e.target.parentNode;
	    } else {
	        getElement('detailItemInfo').style.display='none';
	    }
	} else {
		td = e.target;
	}
	
    var row=td.parentNode;
	var rowData=this.getRowData(row,"X_TAG,PAYITEM_CODE,PAYITEM_DETAIL_SET");
	getElement('detailItemInfo').style.display='block';
	var str = rowData.get('PAYITEM_DETAIL_SET');
	var result = "";
	if (str != null && str != "") {
	    if (str=="[]")
	        result="[]";
	    else {
	        var detailSet = new Wade.DatasetList(str);
	        for (var i=0;i<detailSet.length;i++) {
	            var map = detailSet.get(i);
	            result = result + map.get('DETAIL_ITEM_CODE');
	            if (i<detailSet.length-1)
	                result = result + "~";
	        }
	    }
	}
	ajaxDirect4CS(null, null, '&Integrate_Item_Code='+rowData.get('PAYITEM_CODE')+'&Detail_Item_Code='+result, 'detailItemInfo');
}

function saveDetailData(){
    var dataset = new Wade.DatasetList();
	var chks = getChildsByRecursion('payDetailTable', 'input', 'type', 'checkbox');
	if (chks.length>0) {
	    for(var i=0; i<chks.length; i++) {
	        var chk = chks[i];
            var valueStrs = chk.value.split(",");
		    if (chk.checked) {
		        var data = new Wade.DataMap();
		        data.put("DETAIL_ITEM_CODE",valueStrs[0]);
		        data.put("DETAIL_ITEM",valueStrs[1]);
		        data.put("STATE","ADD");
		        dataset.add(data);
		    }
	    }    
    }
    getElement('PAYITEM_DETAIL_SET').value=dataset;
    getElement('X_CHOOSE').value = '<input type="checkbox" onClick="saveData();" name="item" id="item" checked="true"/>';    
    payRelationTable.updateRow();
    getElement('detailItemInfo').style.display='none';
}

function saveData(){
    var planType=getElement('PLAN_TYPE').value;
    var ds = new Wade.DatasetList();
    
    if (planType == "G") {
	    var chks = getChildsByRecursion('payRelationTable', 'input', 'type', 'checkbox');
	    if (chks.length>0) {
	        for(var i=0; i<chks.length; i++) {
		        var chk = chks[i];
		        if (chk.checked) {
		            var chkdata = payRelationTable.getRowData(payRelationTable.table.rows[i+1],"X_TAG,PAYITEM_CODE,PAYITEM_DETAIL_SET");
			        chkdata.put("PAYITEM_DETAIL_SET",new Wade.DatasetList(chkdata.get('PAYITEM_DETAIL_SET','[]')));
			        chkdata.put("STATE","ADD");
			        ds.add(chkdata);
		        }
	        }
	    }
	}
	
	document.getElementById("grpPayRels").value=""+ds;
}

function checkAllDetailItems(checked) {
	var items = getElements('detailitem');
	for (var i=0; i<items.length; i++) {
		if (checked) {if (!items[i].checked){items[i].checked=true;}}
		else {if (items[i].checked){items[i].checked=false;}}
	}
}

function checkAllItems(checked) {
	var items = getElements('item');
	for (var i=0; i<items.length; i++) {
		if (checked) {if (!items[i].checked){items[i].checked=true;}}
		else {if (items[i].checked){items[i].checked=false;}}
	}
}

function cleanAll() {
	checkAllItems(false);
	getElement('FEE_LIMIT').value="0";
	document.getElementById("grpPayRels").value = "";
}

function popupPayRelation(obj) {
	popupPage('common.components.common.payrelation.PopupPayItem', 'initPayRelation', '&refresh=true', '\u9009\u62e9\u4ed8\u8d39\u8d26\u76ee', '600', '400');
}

function popupAfterAction(value) {
    var ds = new Wade.DatasetList(value);
    var payItemSet = payRelationTable.getTableData("X_TAG,PAYITEM_CODE");
    for (var i=0;i<ds.length;i++) {
        var tmpMap = ds.get(i);
        var found = false;
        for (var j=0;j<payItemSet.length;j++) {
            var itemMap = payItemSet.get(j);
            if (itemMap.get('PAYITEM_CODE') == tmpMap.get('PAY_ITEM_CODE')) {
                found = true;
                break;
            }
        }
        if (!found) {
            getElement('PAYITEM_CODE').value=tmpMap.get('PAY_ITEM_CODE');
            getElement('PAYITEM_CODE_DESC').value=tmpMap.get('PAY_ITEM_NAME');
            getElement('X_CHOOSE').value = '<input type="checkbox" onClick="saveData();" name="item" id="item"/>';
            payRelationTable.insertRow();            
        }
    }
}

function deletePayItem() {
	if (!payRelationTable.verifyTable()) return false;
    payRelationTable.deleteRow();
}