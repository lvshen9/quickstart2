function validateCrtMb() {

    var planType = getElement('PLAN_TYPE').value;
    if (planType == "") {
        alert('\u8BF7\u8F93\u9009\u62E9\u4ED8\u8D39\u7C7B\u578B\uFF01');
        return false;
    }
    
//    if (planType == "C") {
//        var planName = getElement('PLAN_NAME').value;
//        if (planName == "") {
//            alert('\u8BF7\u9009\u62E9\u4ED8\u8D39\u65B9\u6848\u540D\u79F0\uFF01');
//            return false;
//        }
//    }
    return true;
}

function payPlanSelInit() {
	window["payRelationTable"] = new TableEdit("payRelationTable",false,clickColumn);
}

function changElement(value) {
    payPlanSelInit();
    
    if (value == "C") {
        getElement("items").style.display = "block";
        getElement("documentName").style.display = "block";
    }
    else {
        getElement("items").style.display = "none";
        getElement("documentName").style.display = "none";
    }

    var selectPlanName = getElement('PLAN_TYPE');
    if (selectPlanName.selectedIndex > 0)
        saveData();
}

function selectPayPlan(planId)
{
	var oldPlanSet = new Wade.DatasetList(document.getElementById("oldPayPlanSet").value);
    var oldPlan = new Wade.DataMap(document.getElementById("oldMemPay").value);
    var oldPlanType = "";
    
    if(oldPlan)
    {
    	oldPlanType = oldPlan.get("PLAN_TYPE_CODE");
    }
    var newPlanType = "";
    
    for(var i=0;i<oldPlanSet.length;i++){
    	var plan = oldPlanSet.get(i);
    	if(plan.get("PLAN_ID")==planId){
    		newPlanType = plan.get("PLAN_TYPE_CODE")
    	}
    }
    
    var payPlanList = new Wade.DatasetList();
    
	for(var i=0;i<oldPlanSet.length;i++)
	{
		var plan = oldPlanSet.get(i);
		var isFind = "false";
				
		if(oldPlanType == newPlanType && plan.get("PLAN_TYPE_CODE")==newPlanType)
		{
			if(newPlanType == "P"){
				plan.put("PLAN_TYPE",plan.get("PLAN_TYPE_CODE"));
				plan.put("STATE","EXIST");
				isFind = "true";
				payPlanList.add(plan);
			}else{
				plan.put("PLAN_TYPE",plan.get("PLAN_TYPE_CODE"));
				plan.put("STATE","ADD");			
				oldPlan.put("PLAN_TYPE",oldPlan.get("PLAN_TYPE_CODE"));
				oldPlan.put("STATE","DEL");
				payPlanList.add(plan);
				payPlanList.add(oldPlan);
			}
			
		}
		if(newPlanType!=oldPlanType && plan.get("PLAN_TYPE_CODE")==newPlanType)
		{
			plan.put("PLAN_TYPE",plan.get("PLAN_TYPE_CODE"));
			plan.put("STATE","ADD");
			
			oldPlan.put("PLAN_TYPE",oldPlan.get("PLAN_TYPE_CODE"));
			oldPlan.put("STATE","DEL");
			payPlanList.add(plan);
			payPlanList.add(oldPlan);
		}
		
		if(newPlanType=="P")
		  document.getElementById("select_acct_info").style.display="none";
		else
		  document.getElementById("select_acct_info").style.display="";
//		if(oldPlanType && plan.get("PLAN_TYPE_CODE")==oldPlanType)
//		{
//			plan.put("PLAN_TYPE",plan.get("PLAN_TYPE_CODE"));
//			plan.put("STATE","DEL");
//			isFind = "true";
//			payPlanList.add(plan);
//		}

	}
	document.getElementById("grpPayRels").value = payPlanList;
	     ajaxSubmit(this, 'filterNoteItems','&PLAN_IDA='+planId+'&PLAN_TYPE_CODE='+newPlanType,'RefreshTable',null,null,payitemchk);
	}


function payitemchk(){
	var chks=getChildsByRecursion('RefreshTable','input', 'type', 'checkbox');
	for(var i=0;i<chks.length;i++){
	 if(chks[i].getAttribute('chk')=="1")chks[i].checked=true;
	}
}

function clickColumn(e){
	var td = null;
	if (e.target.tagName == 'INPUT') {
		td = e.target.parentNode;
	} else {
		td = e.target;
	}
	var row=td.parentNode;
	var cell=this.getCell(row,"PAYITEM_CODE"); 
	var cellValue=cell.firstChild.nodeValue; 
	var rowData=this.getRowData(row,"X_TAG,PAYITEM_MODE_STATE,PAYITEM_CODE,PAYITEM_CODE_DESC,LIMIT_TYPE,LIMIT_TYPE_DESC,LIMIT,COMPLEMENT_TAG,COMPLEMENT_TAG_DESC");
}

function saveData(){
    var planType=getElement('PLAN_TYPE').value;
    var ds = new Wade.DatasetList();
    
    var planId="";
    if (planType == "C") {
	    var chks = getChildsByRecursion('payRelationTable', 'input', 'type', 'checkbox');
	    if (chks.length>0) {
	        for(var i=0; i<chks.length; i++) {
		        var chk = chks[i];
		        if (chk.checked) {
			        var chkdata = payRelationTable.getRowData(payRelationTable.table.rows[i+1],"X_TAG,PAYITEM_MODE_STATE,PAYITEM_CODE,PAYITEM_CODE_DESC,LIMIT_TYPE,LIMIT_TYPE_DESC,LIMIT,COMPLEMENT_TAG,COMPLEMENT_TAG_DESC");
			        chkdata.put("STATE","ADD");
			        ds.add(chkdata);
		        }
	        }
	    }
	    else {
		    ds = payRelationTable.getTableData("X_TAG,PAYITEM_MODE_STATE,PAYITEM_CODE,PAYITEM_CODE_DESC,LIMIT_TYPE,LIMIT_TYPE_DESC,LIMIT,COMPLEMENT_TAG,COMPLEMENT_TAG_DESC");
	    }
	    planId = getElement('PLAN_NAME').value;
	} else {
	    var tmp = new Wade.DatasetList(document.getElementById("oldPayPlanSet").value);
        for (var i=0;i<tmp.length;i++) {
	        var valueData = tmp.get(i); 
	        if (valueData.get("PLAN_TYPE_CODE") == planType) {
	            planId = valueData.get("PLAN_ID");
	            break;
	        }   
	    }
	}

    if (getElement('grpPayAction').value == "CrtMem") {	
	    var result = new Wade.DatasetList();
	    var map = new Wade.DataMap();
	    map.put("PLAN_TYPE",planType);
	    if (planType == "C")
	        map.put("ITEM",ds);
	    map.put("STATE","ADD");
	    map.put("PLAN_ID",planId);
        var selectPlanName;
        if (planType == "C")
            selectPlanName = getElement('PLAN_NAME');
        else
            selectPlanName = getElement('PLAN_TYPE');
        map.put("PLAN_NAME",selectPlanName.options[selectPlanName.selectedIndex].innerText);
	    result.add(map);

        document.getElementById("grpPayRels").value=""+result;
    }
    else
        document.getElementById("grpPayRels").value=""+comparePayItemSimple(""+ds);	
}

function comparePayItemSimple(strNewValue) {
    var oldPlanSet = new Wade.DatasetList(document.getElementById("oldPayPlanSet").value);
    var oldPlan = new Wade.DataMap(document.getElementById("oldMemPay").value);
    var newPlanType = getElement('PLAN_TYPE').value;
    var oldPlanType = oldPlan.get('PLAN_TYPE_CODE');
    
    var resultSet = new Wade.DatasetList();
    var resultMap = new Wade.DataMap();
    var newResultMap = new Wade.DataMap();
    var planId = "";
    
    if (oldPlanType != newPlanType) {
        if (oldPlan.length > 0) {
            resultMap.put("PLAN_TYPE",oldPlan.get("PLAN_TYPE_CODE"));
            resultMap.put("PLAN_ID",oldPlan.get("PLAN_ID"));
            resultMap.put("STATE","DEL"); 
        }
        
        newResultMap.put("PLAN_TYPE",newPlanType);
        for (var i=0;i<oldPlanSet.length;i++) {
            var plan = oldPlanSet.get(i);
            if (plan.get("PLAN_TYPE_CODE") == newPlanType) {
                planId = plan.get("PLAN_ID");
                break;
            }
        }
        newResultMap.put("PLAN_ID",planId);
        newResultMap.put("STATE","ADD");
    } else {
        resultMap.put("PLAN_TYPE",oldPlan.get("PLAN_TYPE_CODE"));
        resultMap.put("PLAN_ID",oldPlan.get("PLAN_ID"));
        resultMap.put("STATE","EXIST");         
    }
    
    if (resultMap.length>0)
        resultSet.add(resultMap); 
    if (newResultMap.length>0)
        resultSet.add(newResultMap);
    return resultSet; 
}

function comparePayItem(strNewValue){
    var strOldValue = document.getElementById("oldPayItemSet").value;
    var oldValueSet = new Wade.DatasetList(strOldValue);
    var newValueSet = new Wade.DatasetList(strNewValue);
    
    var strOldPlanValue = document.getElementById("oldPayPlanSet").value; 
    var oldPlanSet = new Wade.DatasetList(strOldPlanValue);
    var oldPlan;
    
    var resultSet = new Wade.DatasetList();
    var resultMap = new Wade.DataMap();
    var newResultMap = new Wade.DataMap();
    var isfound = "false";
    
    var newPlanType = getElement('PLAN_TYPE').value;
    var newPlanId = "";
    if (newPlanType == "C")
        newPlanId = getElement('PLAN_NAME').value;
    else {
	    var tmp = new Wade.DatasetList(document.getElementById("oldPayPlanSet").value);
        for (var i=0;i<tmp.length;i++) {
	        var valueData = tmp.get(i); 
	        if (valueData.get("PLAN_TYPE_CODE") == newPlanType) {
	            newPlanId = valueData.get("PLAN_ID");
	            break;
	        }   
	    }
    }
    var oldPlanId = ""; 
   
    if (oldPlanSet.length > 0) {
        oldPlan = oldPlanSet.get(0);
        oldPlanId = oldPlan.get("PLAN_ID");
        if (oldPlan.get("PLAN_TYPE_CODE") != newPlanType || 
            oldPlan.get("PLAN_ID") != newPlanId ) {
            resultMap.put("PLAN_TYPE",oldPlan.get("PLAN_TYPE_CODE"));
            resultMap.put("PLAN_ID",oldPlan.get("PLAN_ID"));
            resultMap.put("STATE","DEL"); 
        } else {
            resultMap.put("PLAN_TYPE",oldPlan.get("PLAN_TYPE_CODE"));
            resultMap.put("PLAN_ID",oldPlan.get("PLAN_ID"));
            resultMap.put("STATE","MODI");
        }
        if (newPlanType == "P" || newPlanType == "G" ||
            newPlanId != oldPlanId) {
            if (oldPlan.get("PLAN_TYPE_CODE") != newPlanType) {
                for (var i=0;i<oldValueSet.length;i++) {
                    var oldValueColumn = oldValueSet.get(i);
                    oldValueColumn.put("STATE","DEL");    
                }
                newResultMap.put("PLAN_TYPE",newPlanType);
                newResultMap.put("PLAN_ID",newPlanId);
                newResultMap.put("STATE","ADD"); 
            }
            if (oldValueSet.length>0)
                resultMap.put("ITEM",oldValueSet);
            var finaResult = new Wade.DatasetList();
            finaResult.add(resultMap); 
            if (oldPlan.get("PLAN_TYPE_CODE") != newPlanType)
                finaResult.add(newResultMap);
            return finaResult;                   
        }
    }

    if (newPlanId != oldPlanId) {
        for (var i=0;i<newValueSet.length;i++) {
            newValueColumn.put("STATE","EXIST");
        }
        newResultMap.put("ITEM",newValueSet);
        var finaResult = new Wade.DatasetList();
        finaResult.add(resultMap); 
        finaResult.add(newResultMap);
        return finaResult;           
    }
    
    for (var i=0;i<newValueSet.length;i++) {
        isfound = "false";
        var newValueColumn = newValueSet.get(i);
        for (var j=0;j<oldValueSet.length;j++) {
            var oldValueColumn = oldValueSet.get(j);
            if (oldValueColumn.get("PAYITEM_CODE") == newValueColumn.get("PAYITEM_CODE") 
                && oldValueColumn.get("STATE")== "EXIST") {
                newValueColumn.put("STATE","EXIST");
                isfound = "true";
                
                break;
            }
        }
        if (isfound == "false" && oldValueColumn.get("STATE")== "EXIST")
            newValueColumn.put("STATE","ADD");
        resultSet.add(newValueColumn);
    }

    for (var i=0;i<oldValueSet.length;i++) {
        isfound = "false";
        var oldValueColumn = oldValueSet.get(i);
        for (var j=0;j<newValueSet.length;j++) {
            var newValueColumn = newValueSet.get(j);
            if (oldValueColumn.get("PAYITEM_CODE") == newValueColumn.get("PAYITEM_CODE")
                && oldValueColumn.get("STATE") == "EXIST") {
                isfound = "true";
                break;
            }
        }
        if (isfound == "false" && oldValueColumn.get("STATE")== "EXIST") {
            oldValueColumn.put("STATE","DEL");
            resultSet.add(oldValueColumn);
        }
    }
    
    if (resultSet.length>0)
        resultMap.put("ITEM",resultSet);
    var finaResult = new Wade.DatasetList();
    finaResult.add(resultMap); 
    
    return finaResult;
}

function changePlanName(obj) {
	ajaxSubmit(null, null,'&PLAN_ID='+getElement('PLAN_NAME').value,'items',null,null,function(){
		payPlanSelInit();
	});
}
