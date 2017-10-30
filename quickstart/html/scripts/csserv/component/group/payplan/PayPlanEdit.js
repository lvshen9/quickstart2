/* pay plan */
function initPayPlanEdit() {
	window["planTable"] = new TableEdit("PlanTable", false, onRowClick);
}

function initCreatePayPlanEdit() {
	window["planTable"] = new TableEdit("PlanTable", false, onRowClick);
	var ds = planTable.getTableData("X_TAG,PLAN_TYPE");
	if(ds.length>0)
	{
		for(var i=0;i<ds.length;i++)
		{
			planTable.rowIndex = 1;
			planTable.deleteRow();
		}
	}
	
	var defaultPayPlans = new Wade.DatasetList(getElementValue('defaultPayPlans'));
	for(var i=0;i<defaultPayPlans.length;i++)
	{
		
		getElement('PLAN_NAME').value = defaultPayPlans.get(i,'PLAN_NAME','');
		getElement('PLAN_TYPE').value = defaultPayPlans.get(i,'PLAN_TYPE','');
		getElement('PLAN_TYPE_DESC').value = defaultPayPlans.get(i,'PLAN_TYPE_DESC','');
		getElement('PLAN_DESC').value = defaultPayPlans.get(i,'PLAN_DESC','');
		getElement('PAY_ITEMS').value = defaultPayPlans.get(i,'PAY_ITEMS','');
		getElement('POP_PAY_ITEMS').value = defaultPayPlans.get(i,'PAY_ITEMS_DESC','');
		planTable.insertRow();
	}
	
	/*
	getElement('PLAN_NAME').value = "\u4E2A\u4EBA\u4ED8\u8D39";
	getElement('PLAN_TYPE').value = "P";
	getElement('PLAN_TYPE_DESC').value = "\u4E2A\u4EBA\u4ED8\u8D39";
	getElement('PLAN_DESC').value = "\u4E2A\u4EBA\u4ED8\u8D39";
	planTable.insertRow();
	
	getElement('PLAN_NAME').value = "\u96C6\u56E2\u7EDF\u4ED8";
	getElement('PLAN_TYPE').value = "G";
	getElement('PLAN_TYPE_DESC').value = "\u96C6\u56E2\u7EDF\u4ED8";
	getElement('PLAN_DESC').value = "\u96C6\u56E2\u7EDF\u4ED8";
	planTable.insertRow();
	*/
}

/* on row click */
function onRowClick(e){
	planTable.clickRow();
	changePlanType(getElement('PLAN_TYPE'));
}

/* \u9A8C\u8BC1\u4ED8\u8D39\u8BA1\u5212  */
function validatePlanInfo()
{
	var planName = getElement('PLAN_NAME');
	var planType = getElement('PLAN_TYPE');
	var planDesc = getElement('PLAN_DESC');
	var payItems = getElement('PAY_ITEMS');
	if(planType.value == 'C')
	{
		if(!planName.value)
		{
			alert(planName.desc+"\u4E0D\u80FD\u4E3A\u7A7A");
			planName.focus();
			return false;
		}
		if(!payItems.value)
		{
			alert(payItems.desc+"\u4E0D\u80FD\u4E3A\u7A7A");
			return false;
		}
	}
	else if(planType.value == "P")
	{
		planName.value = "\u4E2A\u4EBA\u4ED8\u8D39";
	}
	else if(planType.value == "G")
	{
		planName.value = "\u96C6\u56E2\u7EDF\u4ED8";
	}
	
	return true;
}

function insertValidate()
{
	if(!validatePlanInfo()) return;
	
	var planName = getElement('PLAN_NAME');
	var planType = getElement('PLAN_TYPE');
	var planDesc = getElement('PLAN_DESC');
	var payItems = getElement('PAY_ITEMS');
	
	var dataset = planTable.getTableData('X_TAG,PLAN_ID,PLAN_NAME,PLAN_TYPE');
	
	for(var i=0;i<dataset.length;i++)
	{
		var data = dataset.get(i);
		if(data.get("PLAN_NAME") == planName.value)
		{
			alert(planName.desc+"\u4E0D\u80FD\u91CD\u590D\uFF01");
			planName.focus();
			return false;
		}
		if(data.get("PLAN_TYPE") == planType.value && planType.value == "G")
		{
			alert("\u96C6\u56E2\u7EDF\u4ED8\u7C7B\u578B\u7684\u8BA1\u5212\u53EA\u80FD\u6709\u4E00\u6761\uFF01");
			return false;
		}
		if(data.get("PLAN_TYPE") == planType.value && planType.value == "P")
		{
			alert("\u4E2A\u4EBA\u4ED8\u8D39\u7C7B\u578B\u7684\u8BA1\u5212\u53EA\u80FD\u6709\u4E00\u6761\uFF01");
			return false;
		}
		
	}
	return true;
}

function updateValidate()
{
	if(!validatePlanInfo()) return;
	
	var planName = getElement('PLAN_NAME');
	var planType = getElement('PLAN_TYPE');
	var planDesc = getElement('PLAN_DESC');
	var payItems = getElement('PAY_ITEMS');
	
	var dataset = planTable.getTableData('X_TAG,PLAN_ID,PLAN_NAME,PLAN_TYPE');
	
	for(var i=0;i<dataset.length;i++)
	{
		var data = dataset.get(i);
		var idx = planTable.rowIndex-1;
		if(data.get("PLAN_NAME") == planName.value && idx!=i)
		{
			alert(planName.desc+"\u4E0D\u80FD\u91CD\u590D\uFF01");
			planName.focus();
			return false;
		}
		if(data.get("PLAN_TYPE") == planType.value && planType.value == "G" && idx!=i)
		{
			alert("\u96C6\u56E2\u7EDF\u4ED8\u7C7B\u578B\u7684\u8BA1\u5212\u53EA\u80FD\u6709\u4E00\u6761\uFF01");
			return false;
		}
		if(data.get("PLAN_TYPE") == planType.value && planType.value == "P" && idx!=i)
		{
			alert("\u4E2A\u4EBA\u4ED8\u8D39\u7C7B\u578B\u7684\u8BA1\u5212\u53EA\u80FD\u6709\u4E00\u6761\uFF01");
			return false;
		}
		
	}
	return true;
}

/* create pay plan */
function createPayPlan(obj) {
	
	if(!insertValidate()) return false;
	
	getElement('PLAN_ID').value="<input type='checkbox' index='"+(planTable.table.rows.length)+"' id='planid' name='planid' onclick='modifyPayPlan(this);'/>";
	getElement('PLAN_TYPE_DESC').value=getElement('PLAN_TYPE').options[getElement('PLAN_TYPE').selectedIndex].text;
	planTable.insertRow();
	
	if(obj.getAttribute('multiPlan') == 'false') {
		hidden(obj, true);
	}
}

/* update pay plan */
function updatePayPlan(obj) 
{
	if (!verifyAll('PlanField')) return false;
 	if (!planTable.verifyTable()) return false;
 	
 	var payPlans = planTable.getTableData('X_TAG,PLAN_ID,PLAN_NAME,PLAN_TYPE,PLAN_DESC');
 	var index = planTable.rowIndex;
 	var plan = payPlans.get(index-1);
 	var planType = getElement('PLAN_TYPE');
 	
 	if(plan.get("PLAN_TYPE") != planType.value)
 	{
 		alert("\u4ED8\u8D39\u8BA1\u5212\u7C7B\u578B\u4E0D\u5141\u8BB8\u4FEE\u6539\uFF01");
 		return false;
 	}
 	
 	if(!updateValidate()) return false;
 	
 	getElement('PLAN_TYPE_DESC').value=planType.options[planType.selectedIndex].text;
 	
	planTable.updateRow();
	/*
 	if (plan) {
 		payPlans.removeAt(index);
 		var temp = planTable.getRowData(planTable.table.rows[index], 'X_TAG,PLAN_ID,PLAN_NAME,PLAN_TYPE,PLAN_DESC');
		
 		var payItems = new Wade.DatasetList(planTable.getCell(planTable.table.rows[index],'PAY_ITEMS').firstChild.nodeValue);
		payPlans.add(plan);
 	}
 	getElement('payPlans').value = payPlans.toString();
 	*/
}

/*delete pay plan*/
function deletePayPlan(obj) {
	if (!planTable.verifyTable()) return false;
	planTable.deleteRow();
	
	if(obj.getAttribute('multiPlan') == 'false') {
		hidden(getElement('plan_bcreate'), false);
	}
}

/*popup pay relation */
function popupPayRelation(obj) {
	if (getElementValue() == '') {alert('\u8bf7\u9009\u62e9\u4ed8\u8d39\u7c7b\u578b'); return ;}
	
	var element = getElement(obj.getAttribute('fieldname'));
	var productId = element.getAttribute('productId');
	var userId = element.getAttribute('userId');
	var playDesignMode = element.getAttribute('playDesignMode');
	var userPayItemSet = element.value;
	var params = '&productId='+productId+'&userId='+userId+'&playDesignMode='+playDesignMode+'&userPayItemSet='+userPayItemSet;
	popupPage('common.components.common.payrelation.PopupPayRelation', 'initPayRelation', params+'&refresh=true', '\u9009\u62e9\u4ed8\u8d39\u8d26\u76ee', '480', '320');
}

/* modify pay plan*/
function modifyPayPlan(obj) {
	var payPlans = new Wade.DatasetList(getElementValue('payPlans'));
	var index = parseInt(obj.getAttribute('index'));
	var plan = planTable.getRowData(planTable.table.rows[index], 'X_TAG,PLAN_ID,PLAN_TYPE,PLAN_NAME,PLAN_DESC');
	if (obj.checked) {
		if(plan.get('PLAN_TYPE') == 'C') {
			var payItems = new Wade.DatasetList(planTable.getCell(planTable.table.rows[index],'PAY_ITEMS').firstChild.nodeValue);
			plan.put("PAY_ITEMS", payItems);
		}
		payPlans.add(plan);
	} else {
		payPlans.removeAt(index-1);
	}
	getElement('payPlans').value = payPlans.toString();
}

/* change plan type */
function changePlanType(obj) {
	var planType = obj.value;
	if(planType != 'C') {
		getElement('PAY_ITEMS').value = '';
		getElement('POP_PAY_ITEMS').value = '';
	}
	//getElement('PAY_ITEMS').setAttribute('nullable', planType != 'C' ? 'yes' : 'no');
	//getElement('POP_PAY_ITEMS').setAttribute('nullable', planType != 'C' ? 'yes' : 'no');
	hidden(getElement('PayItemsField'), planType != 'C');
}


function setAllPayPlans(obj)
{
	var payPlansObj = getElement('payPlans');
	payPlansObj.value = "[]";
	var size = planTable.table.rows.length;
	var payPlans = new Wade.DatasetList();
	for(var i=1;i<size;i++)
	{
		var plan = planTable.getRowData(planTable.table.rows[i], 'X_TAG,PLAN_ID,PLAN_TYPE,PLAN_NAME,PLAN_DESC,RSRV_STR2,POP_PAY_ITEMS');
		if(plan)
		{
			if(plan.get('PLAN_TYPE') == 'C') {
				var payItems = new Wade.DatasetList(planTable.getCell(planTable.table.rows[i],'PAY_ITEMS').firstChild.nodeValue);
				plan.put("PAY_ITEMS", payItems);
			}
			plan.put('X_CHOOSE','true');
			payPlans.add(plan);
		}
	}
	if(payPlans.length<1)
	{
		alert("\u8BF7\u5148\u6DFB\u52A0\u4ED8\u8D39\u8BA1\u5212\uFF01");
		return false;
	}
	payPlansObj.value = payPlans.toString();
	
	/* validate ds */
	var oldValue = getElementValue("old_payPlans");
	var tmp = compareDataset(payPlansObj.value,oldValue);
	payPlansObj.value = tmp;
	return true;
}

/**
 */
function compareDataset(strNewValue,strOldValue){

	if (strOldValue == "")
        strOldValue="[]";
    
    if (strNewValue == "")
        strNewValue == "[]";

    var oldValueSet = new Wade.DatasetList(strOldValue);
    var newValueSet = new Wade.DatasetList(strNewValue);
    var resultSet = new Wade.DatasetList();
    
    
    
    for (var i=0;i<newValueSet.length;i++)
    {
    	var isfound = "false";
    	var newValueColumn = newValueSet.get(i);
	    for (var j=0;j<oldValueSet.length;j++) {
	        var oldValueColumn = oldValueSet.get(j);
	        if(oldValueColumn.get('PLAN_TYPE')==newValueColumn.get('PLAN_TYPE'))
	        {
	        	if(oldValueColumn.get('PLAN_NAME')==newValueColumn.get('PLAN_NAME')&&oldValueColumn.get('PLAN_TYPE')==newValueColumn.get('PLAN_TYPE')&&oldValueColumn.get('PLAN_DESC')==newValueColumn.get('PLAN_DESC'))
	        	{
	        		newValueColumn.put("STATE","EXIST");
	        	}
	        	else
	        	{
	        		newValueColumn.put("STATE","MODI");
	        	}
	        	isfound = "true";
	        	break;
	        }
	    }
	    if (isfound == "false")
            newValueColumn.put("STATE","ADD");
        resultSet.add(newValueColumn);
	}
	
	
	for (var i=0;i<oldValueSet.length;i++) {
        var oldValueColumn = oldValueSet.get(i);
        isfound = "false";
        for (var j=0;j<newValueSet.length;j++) {
            var newValueColumn = newValueSet.get(j);
            if(oldValueColumn.get('PLAN_TYPE')==newValueColumn.get('PLAN_TYPE'))
            {
            	isfound = "true";
            	break;
            }
        }
        if (isfound == "false") {
            oldValueColumn.put("STATE","DEL");
            resultSet.add(oldValueColumn);
        }
   }
   
   
   	var newDataResult = new Wade.DatasetList();
   	for(var i=0;i<resultSet.length;i++)
   	{
   		var dataResult = resultSet.get(i);
   		if(dataResult.get("PLAN_TYPE")=="C")
   		{
   			var itemsStr = dataResult.get("PAY_ITEMS");
   			if(itemsStr == "")
   			{
   				itemsStr = "[]";
   			}
   			var itemsSet = new Wade.DatasetList(""+itemsStr);
   			var newItemsSet = new Wade.DatasetList();
   			for(var j=0;j<itemsSet.length;j++)
   			{
   				var item = itemsSet.get(j);
   				if(item.get('STATE','')=="")
   				{
   					item.put('STATE','EXIST');
   				}
   				newItemsSet.add(item);
   			}
   			dataResult.put("ITEM",newItemsSet);
   			dataResult.removeKey("PAY_ITEMS");
   		}

   		newDataResult.add(dataResult);
   	}
   	
    return newDataResult.toString();
}
