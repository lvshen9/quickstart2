function payRelationInit() {
	window["payRelationTable"] = new TableEdit("payRelationTable",false,clickColumn);
}

function isNumber(obj){

	var reg= /^([1-9]|(0[.]))[0-9]{0,}(([.]*\d{1,2})|[0-9]{0,})$/; 

	if (!reg.test(obj) ){
		return false;
	}
	
	return true;
} 

function clickColumn(e){
	document.getElementById("bcreate").style.display="none";
	document.getElementById("bupdate").style.display="";
	document.getElementById("bdelete").style.display="";
	document.getElementById("bcancel").style.display="";

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

function addRow(){

    if (!inputCheckRule()) return false;
    if (!payRelationTable.checkRow('PAYITEM_CODE')) return false;
    
    document.getElementById("PAYITEM_MODE_STATE").value = "ADD";
    
    getElement('X_CHOOSE').value="<input type='checkbox' id='item' name='item' index='"+(payRelationTable.table.rows.length+1)+"'/>";
	payRelationTable.insertRow();
	//saveData();
}

function cancelit(){
	document.getElementById("PAYITEM_CODE").value = "";	
	document.getElementById("PAYITEM_CODE_DESC").value = "";	
	document.getElementById("LIMIT_TYPE").value = "";	
	document.getElementById("LIMIT_TYPE_DESC").value = "";	
	document.getElementById("LIMIT").value = "";	
	document.getElementById("COMPLEMENT_TAG").value = "";	
	document.getElementById("COMPLEMENT_TAG_DESC").value = "";	
	
	document.getElementById("bcreate").style.display="";
	document.getElementById("bupdate").style.display="none";
	document.getElementById("bdelete").style.display="none";
	document.getElementById("bcancel").style.display="none";
}

function saveRow(){
	if (!payRelationTable.checkRow('PAYITEM_CODE_DESC',true)) return false;	
	payRelationTable.updateRow();
	document.getElementById("bcreate").style.display="";
	document.getElementById("bupdate").style.display="none";
	document.getElementById("bdelete").style.display="none";
	document.getElementById("bcancel").style.display="none";

	//saveData();
}

function saveData(){
	var ds = new Wade.DatasetList();
	var tmp;
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
	    tmp = "" + ds.toString();
	}
	else {
		tmp = payRelationTable.getTableData("X_TAG,PAYITEM_MODE_STATE,PAYITEM_CODE,PAYITEM_CODE_DESC,LIMIT_TYPE,LIMIT_TYPE_DESC,LIMIT,COMPLEMENT_TAG,COMPLEMENT_TAG_DESC");
	    tmp = "" + tmp;
	}

	var grpPayAction = document.getElementById("grpPayAction").value; 
	if (grpPayAction == "ModUs" || grpPayAction == "ModMb"){
	    document.getElementById("grpPayRels").value=comparePayItem(tmp);
	}else{
	    document.getElementById("grpPayRels").value=tmp;
	}    
}

function delRow(obj){
	if (!payRelationTable.verifyTable()) return false;
	payRelationTable.deleteRow();
	document.getElementById("bcreate").style.display="";
	document.getElementById("bupdate").style.display="none";
	document.getElementById("bdelete").style.display="none";
	document.getElementById("bcancel").style.display="none";
	
	//saveData();
}

function changeFeetype(type){
	if(type=='0'){
	    document.getElementById('LIMIT_TYPE').value='';
	    document.getElementById('LIMIT_TYPE').disabled=true;
	    document.getElementById('COMPLEMENT_TAG').value='';
	    document.getElementById('COMPLEMENT_TAG').disabled=true
	} else { 
	    document.getElementById('LIMIT_TYPE').disabled=false;
	    document.getElementById('COMPLEMENT_TAG').disabled=false;
	}
}

function inputCheckRule(){
	if (document.getElementById("PAYITEM_CODE_DESC").value == "") { //
	    alert("\u8BF7\u9009\u62E9\u4ED8\u8D39\u5E10\u76EE");
	    return false;
	}
    
    if (document.getElementById("LIMIT_TYPE").value == "") {
        alert("\u8BF7\u9009\u62E9\u4ED8\u8D39\u65B9\u5F0F"); 
        return false;
    }
    else if (document.getElementById("LIMIT_TYPE").value != "0") { 
        if (document.getElementById("LIMIT").value == "") { //
            alert("\u5FC5\u987B\u8F93\u5165\u9650\u5B9A\u503C");
            return false;
        }
        if (document.getElementById("LIMIT_TYPE").value == "2" &&
            parseFloat(document.getElementById("LIMIT").value) > 100.00) {
            alert("\u6309\u6BD4\u4F8B\u4E0D\u5141\u8BB8\u5927\u4E8E\u0031\u0030\u0030\uFF01");
            return false;
        }
        else if (!isNumber(document.getElementById("LIMIT").value)) {
            alert("\u9650\u5B9A\u503C\u5FC5\u987B\u4E3A\u6570\u5B57\uFF01"); 
            return false;
        }
    }
    
    if (document.getElementById("COMPLEMENT_TAG").value == "") {
        alert("\u8BF7\u9009\u62E9\u8865\u8DB3\u65B9\u5F0F\uFF01");
        return false;
    }
	return true;
}

function comparePayItem(strNewValue,strOldValueStr){
    var strOldValue = document.getElementById("grpPayOldValue").value;
    if(strOldValueStr)
    {
    	strOldValue = strOldValueStr;
    }
    if (strOldValue == "")
        strOldValue="[]";
    var oldValueSet = new Wade.DatasetList(strOldValue);
    var newValueSet = new Wade.DatasetList(strNewValue);
    var resultSet = new Wade.DatasetList();
    var isfound = "false";
    
    for (var i=0;i<newValueSet.length;i++) {
        isfound = "false";
        var newValueColumn = newValueSet.get(i);
        for (var j=0;j<oldValueSet.length;j++) {
            var oldValueColumn = oldValueSet.get(j);
            
            if (oldValueColumn.get("PAYITEM_CODE") == newValueColumn.get("PAYITEM_CODE")) {
                if (oldValueColumn.get("LIMIT_TYPE") != newValueColumn.get("LIMIT_TYPE") ||
                    oldValueColumn.get("LIMIT") != newValueColumn.get("LIMIT") || 
                    oldValueColumn.get("COMPLEMENT_TAG") != newValueColumn.get("COMPLEMENT_TAG") ) {
                        newValueColumn.put("STATE","MODI");
                        newValueColumn.put("START_CYCLE_ID",oldValueColumn.get("START_CYCLE_ID"));
                        newValueColumn.put("END_CYCLE_ID",oldValueColumn.get("END_CYCLE_ID"));
                }
                else
                {
                    newValueColumn.put("STATE","EXIST");
                }
                isfound = "true";
                break;
            }
        }
        if (isfound == "false")
        {
            newValueColumn.put("STATE","ADD");
        }
        resultSet.add(newValueColumn);
    }

    for (var i=0;i<oldValueSet.length;i++) {
        isfound = "false";
        var oldValueColumn = oldValueSet.get(i);
        for (var j=0;j<newValueSet.length;j++) {
            var newValueColumn = newValueSet.get(j);
            //alert("old"+oldValueColumn.get("PAYITEM_CODE") +":"+ newValueColumn.get("PAYITEM_CODE"));
            if (oldValueColumn.get("PAYITEM_CODE") == newValueColumn.get("PAYITEM_CODE")) {
                isfound = "true";
                break;
            }
        }
        if (isfound == "false") {
            oldValueColumn.put("STATE","DEL");
            resultSet.add(oldValueColumn);
        }
    }
    return resultSet;
}

function validatePayitemCode(){
	//if(document.getElementById('payRelationTable').rows.length<=1){
	//	if(document.getElementById('PAYITEM_CODE').value == ''){
	//		alert('ff');
	//		return  false;
	//	}
	//}
	return true;
}

function chosePayItem(obj) {
	var value = new Wade.DatasetList();
	var text = "";
	var items = getElements('item');
	for(var i=0; i<items.length; i++) {
		if(items[i].checked) {
			var row = payRelationTable.table.rows[i+1];
			var data = payRelationTable.getRowData(row, "X_TAG,PAYITEM_MODE_STATE,PAYITEM_CODE,PAYITEM_CODE_DESC,LIMIT_TYPE,LIMIT_TYPE_DESC,LIMIT,COMPLEMENT_TAG,COMPLEMENT_TAG_DESC");
			if(data.get('X_TAG')!='1')
			{
				text += data.get('PAYITEM_CODE_DESC', '') + ',';
				//text += data.get('PAYITEM_CODE_DESC', '') + '('+data.get('LIMIT_TYPE_DESC','')+','+data.get('LIMIT','')+'),';
			}
			value.add(data);
		}
	}
	
	var ds = payRelationTable.getTableData("X_TAG,PAYITEM_MODE_STATE,PAYITEM_CODE,PAYITEM_CODE_DESC,LIMIT_TYPE,LIMIT_TYPE_DESC,LIMIT,COMPLEMENT_TAG,COMPLEMENT_TAG_DESC");
	setReturnValue(comparePayItem(value.toString(),getElement('oldPayItems').value), text);
	//setReturnValue(comparePayItem(ds.toString(),getElement('oldPayItems').value), text);
	//setReturnValue(value.toString(), text);
}