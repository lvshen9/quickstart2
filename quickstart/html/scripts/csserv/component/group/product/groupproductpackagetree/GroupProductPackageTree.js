function groupProductPackageTreeInit(){
	checkBySelectedEles();
}

function checkBySelectedEles(){
	var selectedElements = document.getElementById("SELECTED_ELEMENTS");
	
	if (selectedElements && selectedElements.value.length>0){
		var eles = new Wade.DatasetList(selectedElements.value);
		eles.each(function(item,index,totalcount){
			checkPackage(item.get("PRODUCT_ID"),item.get("PACKAGE_ID"),true);
		});
	}
}

function checkPackage(productId,packageId,flag){
	var checkbox = document.getElementById("groupproductpackage_checkbox_" + productId + "_" + packageId);
	if (checkbox){
		checkbox.checked=flag;
	}
}