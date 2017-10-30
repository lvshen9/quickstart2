function getDatasetByCheckBoxValue()
{
	var compixproduct = new Wade.DatasetList($("#grpCompixProduct").val());  //必选产品列表
   
	var ds = new Wade.DatasetList();
	
	//获得指定区域的checkbox
	//var chks = getChildsByRecursion('powerDiv', 'input', 'type', 'checkbox');
	//var chks =$("#powerDiv [type=checkbox]");
//
//	var tmp;
//	if (chks.length>0) {
//	    for(var i=0; i<chks.length; i++) {
//		    var chk = chks[i];
//		    var valueStrs = chk.value.split(",");
//		    if(chk.checked == true)
//		    {
//			    var d = new Wade.DataMap();
//			    d.put("PRODUCT_ID_B",valueStrs[0]);
//			    d.put("PRODUCT_NAME",valueStrs[1]);
//			    if(valueStrs[2]!=null&&valueStrs[2]!="null")
//			    {
//			    	d.put("USER_ID",valueStrs[2]);
//			    }
//			    d.put("POWER100_PACKAGE_ID",valueStrs[3]);
//			    ds.add(d);
//		  	}
//	    }
	var tmp;
	var check = $("input[name='itemcodes']:checked");
	if (check.length>0) {
	    for(var i=0; i<check.length; i++) {
		    var chk = check[i];
		   
		    var valueStrs = chk.value.split(",");
		    
		        var d = new Wade.DataMap();
			    d.put("PRODUCT_ID_B",valueStrs[0]);
			    d.put("PRODUCT_NAME",valueStrs[1]);
			    if(valueStrs[2]!=null&&valueStrs[2]!="null")
			    {
			    	d.put("USER_ID",valueStrs[2]);
			    }
			    d.put("POWER100_PACKAGE_ID",$('#POWER100_PACKAGE_ID').val());
			    ds.add(d);
		  	
	    }
	    tmp = "" + ds;
	    
	    if(ds.length == 0)
	    {
	    	alert("您还没有办理或勾选任何动力100下的产品!");
			return false;
	    }
	   	for (var j=0 ; j < compixproduct.length; j++ )
	   	{
	   		  var item = compixproduct.get(j);
	    		var tag = "false";
					ds.each(function(itemB,indexB,totalcountB){
						if (itemB.get("PRODUCT_ID_B") == item.get("PRODUCT_ID_B"))
						{
								tag = "true";
						}
					});

					if(tag == "false")
					{
						alert("办理组合产品[动力100]时，请先开通必选产品["+item.get("PRODUCT_ID_B")+"："+item.get("PRODUCT_NAME")+"]");
						return false;
					}
		}
	}
	else
	{
		alert("您还没有办理或勾选任何动力100下的产品!");
		return false;
	}

	//getElement("selectedCheckBox").val()=tmp;
	$("#selectedCheckBox").val(tmp);
	return true;
}

function initPower100()
{
	power100TableEdit =$.table.get("power100Table");
}

function validateNext()
{
	return getDatasetByCheckBoxValue();
//	if(getElementValue("POWER100_PACKAGE_ID"))
//	{
//		getDatasetByCheckBoxValue();
//		return true;
//	}
//	else
//	{
//		alert("\u8BF7\u9009\u62E9\u7EC4\u5408\u5305\uFF0C\u518D\u8FDB\u884C\u6B64\u64CD\u4F5C\uFF01");
//		return false;
//	}
//	return true;
}
		
function  refeshproductPart(){ 
	var product_id =$("#PRODUCT_ID").val();
	var cust_id=$("#CUST_ID").val(); 
	ajaxSubmit('productPart','queryUserProducts','PRODUCT_ID='+product_id+'&CUST_ID='+cust_id+'&REFESH=1','productPart','');
}

function  refeshcanSelectProductPart(){
	var product_id =$("#PRODUCT_ID").val();
	var cust_id=$("#CUST_ID").val(); 
	ajaxSubmit('canSelectProductPart','queryCanSelectProducts','PRODUCT_ID='+product_id+'&CUST_ID='+cust_id+'&REFESH=1','canSelectProductPart');																									
}

function checkBoxChange(partId, checked)
{    
   $("#" + partId + " input[name=itemcodes]").each(function(){
   		if(!this.disabled){
   			this.checked = checked;
   		}
   });
}