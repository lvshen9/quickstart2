function clickcheck(){
	var checkflag = getElement("effectNow").checked;
	if(checkflag == true){
		setEffectNow("main");
	}
	else{
		setUnEffectNow("main");
	}
}

function initProductInfoEsop() {
	var lefttabset = new TabSet("lefttabset", "top");
	lefttabset.addTab("产品信息", getElement("product"));
	if (getElement("pramaPage").value!="X")
	{
	    lefttabset.addTab("产品参数信息", getElement("prama"));
	}    
	lefttabset.addTab("资源信息", getElement("source"));
	if (getElement("outPhoneParam").value!="X"){	 
		lefttabset.addTab("网外号码组信息", getElement("outPhone"));
	}
	
	lefttabset.addTab("邮寄等其他", getElement("postInfo"));	
	lefttabset.draw();
	
	lefttabset.switchTo("产品信息");

	
	lefttabset.onTabSelect(function(tabset){
		var tab=tabset.getActiveTab();
		if(tab.caption=="产品参数信息") {
		    try {
		        initGoodsParamTable();
		        createUserParamTabset();
		        onGoodsClick();
		    } catch (error) {
		    }
		}
	})
}

function opertionResList(resType, resValue){
	var old = getElement("GRP_OLDRES_RECORD");
	var ne = getElement("GRP_NEWRES_LIST");
	var oldRecord = new Wade.DatasetList(old.value);
	var newList = new Wade.DatasetList(ne.value);
	var obj = new Wade.DataMap();
	obj.put("RES_TYPE_CODE", resType);
	obj.put("RES_CODE", resValue);
	obj.put("STATE","ADD");
	oldRecord.each(function(item,index,totalcount){
			if (item.get("RES_TYPE_CODE")==obj.get("RES_TYPE_CODE")){
				obj.put("STATE","MODI");
			}
		});
	newList.each(function(item,index,totalcount){
			if (item.get("RES_TYPE_CODE")==obj.get("RES_TYPE_CODE")){
				newList.removeAt(index);
			}
		});
	newList.add(obj);
	ne.value=newList.toString();
}

function checkProductElements() 
{
   var checkflagset=getElement("PRODUCT_ELEMENTS_CHECK_FLAG").value;
	var flaglist = checkflagset.split(","); 
	for(i=0;i<flaglist.length;i++)
	{
	
		var flag=flaglist[i];
		if(flag=="checkPlatServers")
		{
		  if(!checkPlatServers())
		  {
		    return false;
		  }
		}
	}
 	return true;
}

function checkPlatServers() 
{
  var selectElements=getElement("SELECTED_ELEMENTS").value;
  var needcheckservices=getElement("NEED_CHECK_SERVICES").value;
  var needchecklist= needcheckservices.split(","); 
  var selectElementset = new Wade.DatasetList(selectElements);
  var svcDataset = new Wade.DatasetList(); // 用户本身服务信息
  var grpserverPackageset =  new Wade.DatasetList(); // 成员定制的服务信息

  for(i=0;i<selectElementset.getCount();i++)
  {
 
   	  var elementData=selectElementset.get(i);
   	 var productMode=elementData.get("PRODUCT_MODE");
   	 var elementsDataset = elementData.get("ELEMENTS"); // 取元素
   	 
   	 for(j=0;j<elementsDataset.getCount();j++)
   	 {
   	 	var packageData = elementsDataset.get(j); // 取每个元素
   	 	var elementType = packageData.get("ELEMENT_TYPE_CODE", "");
   	 	var elementstate=packageData.get("STATE","");
   	    if((productMode=="10"||productMode=="11")&&elementType=="S"&&elementstate!="DEL")//处理用户级的服务元素
   	 	{
   	 		svcDataset.add(packageData);
   	 	}
   	 	else if((productMode=="12"||productMode=="13")&&elementType=="S"&&elementstate!="DEL")//处理成员级的服务元素
   	 	{
   	 		grpserverPackageset.add(packageData);
   	 	}
   	 }
   	
  }
  for(i=0;i<grpserverPackageset.getCount();i++)
  {
  	var packageData=grpserverPackageset.get(i);
  	var packserverId=packageData.get("ELEMENT_ID");
  	
  	for(k=0;k<needchecklist.length;k++)
  	{
  	   if(packserverId==needchecklist[k])//过滤为只有需要校验的服务 才执行校验
  	   {
  	   		var compareflag="";
  	   		for(j=0;j<svcDataset.getCount();j++)
  			{
  				var svcdata=svcDataset.get(j);
  				var svcServerId=svcdata.get("ELEMENT_ID");
  				if(packserverId==svcServerId)
  				{
  					compareflag="true";
  					break;
  				}	
  			}
  			if(compareflag!="true")
  			{
  				var errormsg="定制成员产品的 ["+packageData.get("ELEMENT_NAME")+"] 服务 \n必选订购集团产品的 ["+packageData.get("ELEMENT_NAME")+"] 服务";
  				alert(errormsg);
  				return false;
  	 		}
  		}

  	 }
  	 
  }

  return true;
}

/**
*作用:产品服务暂停恢复时，是否可以修改其它元素
*/
function checkIsCanProductElement(){
    var svcflag = false;
    var svcdis = false;
    alert("dddd");
 	var selectElements=getElement("SELECTED_ELEMENTS").value;
 	var selectElementset = new Wade.DatasetList(selectElements);
 	for(var i=0;i<selectElementset.getCount();i++)
  	{
  		var elementData=selectElementset.get(i);
  		var elementsDataset = elementData.get("ELEMENTS"); // 取元素
  		for(var j=0;j<elementsDataset.getCount();j++)
   	 	{
   	 		var packageData = elementsDataset.get(j); // 取每个元素
   	 		var elementType = packageData.get("ELEMENT_TYPE_CODE", "");
   	    	var elementstate=packageData.get("STATE");
   	    	if( elementType=="S")//处理用户级的服务元素
   	 		{    alert("luojh 3");
   	 			var servparamset=packageData.get("SERV_PARAM");
   	 			if (servparamset != null && servparamset.getCount() >= 2)
   	 			{
   	 			    var servparam=servparamset.get(1);
   	 			    var platsvc=servparam.get("PLATSVC");//platsvc表个性参数
   					var operstate=platsvc.get("pam_OPER_STATE","");
   					if(operstate=="04"||operstate=="05")
   					{
   					  alert("luojh 1");
   					  svcflag = true;
   					}
   	 			}
   	 		}else if(elementType == "D"){
   	 			alert("luojh 2");
   	 		 	var disstate = packageData.get("STATE","");
   	 		 	alert(disstate);
   	 		 	if (disstate == "ADD" || disstate == "DEL"){
   	 		 	  svcdis = true;
   	 		 	}
   	 		}
   	 	}
  	}
  	
  	if ( svcflag && svcdis){
  		alert('该集团产品有做业务暂停或恢复操作,不能变更其他产品元素! 请重新操作.');
  	 	return false;
  	 }else{
  	 	return true;
  	 }
}