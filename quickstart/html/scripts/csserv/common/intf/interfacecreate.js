//根据接口编码查询
function queryinterface()
{
   if(!verifyAll('QueryPart'))
   {
	   return false;
   }
  	$.beginPageLoading("数据查询中..");
     $.ajax.submit('QueryPart', 'queryInterfaceByCode', null, 'InfosCondPart,SceneCondPart,SceneTablePart',function(data){
     	//alert(data.get('AJAX_CODE'));
		if(data.get('AJAX_CODE')=='0') {
			//设置可编辑
			$("#cond_SUBSYS_CODE").attr("readonly",false);
			$("#cond_INTERFACE_NAME").attr("readonly",false);
			$("#cond_INTERFACE_ADDR").attr("readonly",false);
			$("#cond_UPDATE_STAFF_ID").attr("readonly",false);
		}
		
		$.endPageLoading();
	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
 }
 
 //提交
 function submitInterfaceCreate()
 {
 	if(!verifyAll('QueryPart'))
   {
	   return false;
   }
   
   if(!verifyAll('InfosCondPart'))
   {
	   return false;
   }

 	var data = $.table.get("sceneTable").getTableData();
 	//alert(data);
 	
 	//var scene_nm = data.get(0).get("SCENE_NM");
 	//var scene_vl = data.get(0).get("SCENE_VL");
 	//alert(scene_nm + '-' + scene_vl);
 	var param = "&SCENE_TABLE=" + data;
 	$.beginPageLoading("数据提交中..");
 	$.ajax.submit('InfosCondPart,SceneCondPart,SceneTablePart', 'onTradeSubmit', param, 'InfosCondPart,SceneCondPart,SceneTablePart', function(data){
		$.endPageLoading();
		alert(data.get("X_RESULTINFO"));
	},
	function(error_code,error_info){
		$.endPageLoading();
		alert(error_info);
    });
 }

 //增加参数行
 function addSceneInfo()
 {	
 	var result = checkAddSceneInfo();
 	//alert(result);
 	if(result) {
 		return true;
 	} else {	
 		//alert($("#cond_INTERFACE_SCENE").val() + '-' + $("#cond_PARAM_INFO").val());
 		var sceneInfo = new Array();
 		sceneInfo["cond_SCENE_ID"]='<input type="checkbox" id="sceneid" name="sceneid">';
 		sceneInfo["SCENE_NM"] = $("#cond_INTERFACE_SCENE").val();
 		sceneInfo["SCENE_VL"] = $("#cond_PARAM_INFO").val();
 		//sceneInfo["SCENE_ID"] = $("#cond_SCENEID").val();
 		//alert($("#cond_SCENEID").val());
 		$.table.get("sceneTable").addRow(sceneInfo);
 		
 		$("#cond_INTERFACE_SCENE").val("");
 		$("#cond_PARAM_INFO").val('');
 	}
 }
 
 function checkAddSceneInfo()
 {
 	var result = false;
 	
 	if($("#cond_INTERFACE_SCENE").val() == "" || $("#cond_INTERFACE_SCENE").val() == null) {
		alert('接口场景不能为空!');
		$("#cond_INTERFACE_SCENE").focus();
		//result = true;
		return true;
	}
	
	if($("#cond_PARAM_INFO").val() == "" || $("#cond_PARAM_INFO").val() == null) {
		alert('场景参数不能为空!');
		$("#cond_PARAM_INFO").focus();
		//result = true;
		return true;
	}
	
	//判断接口场景是否重复
	var allData = getAllTableData("sceneTable", null);
 	//alert(allData);
 	if(allData.length>0) {
 		for(var i=0;i<allData.length;i++) {
 			var data = allData.get(i);
 			var json = $.parseJSON(data.toString());
 			//alert(json);
 			$.each(json, function(name, value) {
 			var scene = $("#cond_INTERFACE_SCENE").val();
 			//alert(name + ':' + value + '--' + scene);
 			if(name == "SCENE_NM" && value == scene) {
 				alert('场景已存在,不要重复添加!');
				$("#cond_INTERFACE_SCENE").focus();
 				result = true;
 			}
 		});
 		}	
 	}
	
	return result;
 }
 
 function delSceneInfo()
 {
 	$("#SceneTableInfos input[name=sceneid]").each(function() {
	   if(this.checked){
	    	this.click();
	    	var table = $.table.get("sceneTable");
	    	var rowIndex = table.getTable().attr("selected");
	    	var data = table.getRowByIndex(rowIndex)
	    	//data.attr("raw_class","delete");
	    	//alert(rowIndex);
	    	table.deleteRow(data, false);
	       	//delTagSum();
	   }
	});
 }
 
 function delBack()
 {
 	$("#SceneTableInfos input[name=sceneid]").each(function() {
	   if(this.checked){
	    	this.click();
	    	var table = $.table.get("sceneTable");
	    	var rowIndex = table.getTable().attr("selected");
	    	var data = table.getRowByIndex(rowIndex)
	    	data.attr("raw_class","new");
	    	//alert(rowIndex);
	    	
	       	//delTagSum();
	   }
	});
 }
 
 
 //获取所有表格数据
 function getAllTableData(tbName,cols) {
	var dataset = new Wade.DatasetList();
	var table = $.table.get(tbName);
	//var d = $.table.get(tbName);
	var c = Wade("tbody", table.getTable()[0]);
	var e = table.tabHeadSize;
	if (c) {
		Wade("tr", c[0]).each (
			function(h, i) {
		    	var json = table.getRowData(cols, h + e);
	     		if (json) {
				   dataset.add(json);
				}
				json = null;
			});
	}
	c = null;
	table = null;
	return dataset;
}

//增行
function addSceneLine()
{
	var sceneInfo = new Array();
 		sceneInfo["cond_SCENE_ID"]='<input type="checkbox" id="sceneid" name="sceneid">';
 		sceneInfo["SCENE_NM"] = '<span class="e_input" style="width:300px"><span><input jwcid="@TextField" name="ognl:sceneinfo.SCENE_NM" value="ognl:sceneinfo.SCENE_NM" onkeyup="valueChange()"/></span></span>';
 		sceneInfo["SCENE_VL"] = '<span class="e_input" style="width:780px"><span><input type="text" id="scenevl" name="scenevl"/></span></span>';
 		
 		$.table.get("sceneTable").addRow(sceneInfo);
}

//Table行双击
function tableRowDBClick() {
	//alert('click');
	//获取选择行的数据
	var rowData = $.table.get("sceneTable").getRowData();
	var scene_nm = rowData.get("SCENE_NM");
	var scene_vl = rowData.get("SCENE_VL");
	//var scene_id = rowData.get("SCENE_ID");
	//alert(scene_nm + '--' + scene_vl + '--' + scene_id);
	
	$("#cond_INTERFACE_SCENE").val(scene_nm);
	$("#cond_PARAM_INFO").val(scene_vl);
	//$("#cond_SCENEID").val(scene_id);
}

function valueChange() {
	var rowData = $.table.get("sceneTable").getRowData();
	var value = rowData.get("SCENE_NM");
	$("#cond_INTERFACE_SCENE").val(value);
}
