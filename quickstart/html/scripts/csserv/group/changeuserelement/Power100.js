function getDatasetByCheckBoxValue()
{
	var compixproduct = new Wade.DatasetList($("#grpCompixProduct").val());
	var ds = new Wade.DatasetList();
	//获得指定区域的checkbox
	//var chks = getChildsByRecursion('powerDiv', 'input', 'type', 'checkbox');
		var chks = $("input[name='itemcodes']:checked");
		
	var tmp;
	if (chks.length>0) {
	    for(var i=0; i<chks.length; i++) {
		    var chk = chks[i];
		    var valueStrs = chk.value.split(",");
		    if(chk.checked == true)
		    {
			    var d = new Wade.DataMap();
			    d.put("PRODUCT_ID_B",valueStrs[0]);
			    d.put("PRODUCT_NAME",valueStrs[1]);
			    if(valueStrs[2]!=null&&valueStrs[2]!="null")
			    {
			    	d.put("USER_ID",valueStrs[2]);
			    }
			    d.put("DISCNT_CODE",valueStrs[3]);
			    ds.add(d);
		    }
	    }
	    tmp = "" + ds;
	    
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
	$("#selectedCheckBox").val(tmp);
}

function initPower100()
{
	power100TableEdit =  $.table.get("power100Table");
}

function validateNext()
{
	getDatasetByCheckBoxValue();
	return true;
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


function checkBoxChange(partId, checked)
{    
   $("#" + partId + " input[name=itemcodes]").each(function(){
   		if(!this.disabled){
   			this.checked = checked;
   		}
   });
}