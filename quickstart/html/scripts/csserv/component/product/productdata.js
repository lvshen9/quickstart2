//包元素列表对象
if(typeof(PkgElementList)=="undefined"){
	window["PkgElementList"]=function(){
		this.elementList = new $.DatasetList();
		this.selectedList = new $.DatasetList();
		this.svcCount = 0;
		this.discntCount = 0;
	};
	var pkgElementList = new PkgElementList();
}

//元素对象
if(typeof(PkgElement)=="undefined"){
	window["PkgElement"]=function(){
		this.elementId = null;
		this.elementName = null;
		this.elementType = null;
		this.forceTag = null;
		this.defaultTag = null;
		this.reOrder = null;
		this.explain = null;
	};
}

if(typeof(Package)=="undefined"){
	window["Package"]=function(){
		this.productId = null;
		this.packageId = null;
		this.packageName = null;
		this.limitType = null;
		this.minNumber = null;
		this.maxNumber = null;
		this.forceTag = null;
		this.defaultTag = null;
		this.rsrvStr1 = null;
	};
}

//包元素列表对象
if(typeof(SelectedElements)=="undefined"){
	window["SelectedElements"]=function(){
		this.selectedEls = new $.DatasetList();
	};
	var selectedElements = new SelectedElements();
}

var packageMap = new $.DataMap();

if(typeof(PackageList)=="undefined"){
	window["PackageList"]=function(){
		this.currentPackage = null;
	};
	var packageList = new PackageList();
}

if(typeof(ProductEnv)=="undefined"){
	window["ProductEnv"]=function(){
		this.eparchyCode = null;
		this.userId = null;
		this.serialNumber = null;
	};
	var productEnv = new ProductEnv();
};

(function(){
	$.extend(ProductEnv.prototype,{
		setEnv: function(eparchyCode,userId,serialNumber){
			if(this.eparchyCode == null){
				if(eparchyCode != '' && typeof(eparchyCode)!='undefined'){
					this.eparchyCode = eparchyCode;
				}
			}
			if(this.userId == null){
				if(userId != '' && typeof(userId)!='undefined'){
					this.userId = userId;
				}
			}
			if(this.serialNumber == null){
				if(serialNumber != '' && typeof(serialNumber)!='undefined'){
					this.serialNumber = serialNumber;
				}
			}
		}
	});
}
)();
