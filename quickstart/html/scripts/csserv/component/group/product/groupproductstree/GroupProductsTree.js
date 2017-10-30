//js加载树
function initTreeByProductInfo(productname,productid){

	var myobj={"USER_NODE_TREE":{"text":productname,"showcheck":"true","id":"USER_NODE_TREE","haschild":"false","order":"0","complete":"false","value":productid,"expand":"false","groupid":null,"dataid":"USER_NODE_TREE","href":null,"checked":"true","disabled":"true"}};

	window["treeData_mytree"] = myobj;
	mytree.init();
	
}

function initTreeByProductInfoSet(productSet){
	var myobj={};
	productSet.each(function(item,index,totalcount){
		var productName = item.get('PRODUCT_NAME');
		var productId = item.get('PRODUCT_ID');
		var treeData = {"text":productName,"showcheck":"true","id":productName+'-'+productId,"haschild":"false","order":"0","complete":"false","value":productId,"expand":"false","groupid":null,"dataid":productName+'-'+productId,"href":null,"checked":"false","disabled":"false"};
		myobj[productName+'-'+productId]=treeData;
	});
	window["treeData_mytree"] = myobj;
	mytree.init();
	
}

//js生成集团产品开户树
function loadGroupProductTree(data) {
	mytree.empty(true);
	mytree.setParam('CUST_ID',$('#CUST_ID').val());
	mytree.init();
	
}

//js生成集团产品已订购的产品树
function loadGroupProductTreeOrdered(custid,userid) {
	mytree.empty(true);
	mytree.setParam('CUST_ID',custid);
	mytree.setParam('GRP_USER_ID',userid);  
	mytree.init();
	
}

//清空集团产品树
function cleanGroupProductTree(data) {
	mytree.empty(true);
}