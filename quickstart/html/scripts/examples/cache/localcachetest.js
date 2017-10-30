function qByTypeId() {
    var typeId = document.getElementById('TYPE_ID');
    ajaxSubmit('QueryCond','qByTypeId','TYPE_ID='+typeId.value,'QueryPart',null);
}

function qByTypeIdPdataId() {
    var typeId = document.getElementById('TYPE_ID');
    var pDataId = document.getElementById('PDATA_ID');
    ajaxSubmit('QueryCond','qByTypeIdPdataId','TYPE_ID='+typeId.value+'PDATA_ID='+pDataId.value,'QueryPart',null);
}

function qByTypeIdDataId() {
    var typeId = document.getElementById('TYPE_ID');
    var dataId = document.getElementById('DATA_ID');
    ajaxSubmit('QueryCond','qByTypeIdDataId','TYPE_ID='+typeId.value+'DATA_ID='+dataId.value,null,function(data) {
        alert('data=' + data);
    });
}

function qByTypeIdDataIdList() {
    var typeId = document.getElementById('TYPE_ID');
    var dataId = document.getElementById('DATA_ID');
    ajaxSubmit('QueryCond','qByTypeIdDataIdList','TYPE_ID='+typeId.value+'DATA_ID='+dataId.value,'QueryPart',null);
}

function loadFromDB() {
    
    ajaxSubmit('QueryCond','loadFromDB',null,'QueryPart',null);
    /*
    ajaxSubmit('QueryCond','loadFromDB',null,'QueryPart',function(data){
        data.each(function(item,index,totalcount){
            alert('共' +totalcount +'列,这是第' + (index+1) + '列,输出为字符串是:' + item);
        });
    
    },function(e,i){
        $.showErrorMessage("操作失败", i);
    });
    */
}

function loadFromCache() {
    
    ajaxSubmit('QueryCond','loadFromCache',null,'QueryPart',null);
    
    /*
    ajaxSubmit('QueryCond', 'loadFromCache', 'xx=yy&aa=bb', 'QueryPart', succFunc(data){
        
    }, failFunc());
    */
}

function succFunc(data) {
    alert('succFunc');
}

function failFunc(data) {
    alert('failFunc');
}

function queryCusts() {
	$.beginPageLoading("开始查询");
	ajaxSubmit(null,'queryCusts','custName=b','QueryPart',function(d){
		$.endPageLoading();
	},function(e,i){
		$.showErrorMessage(e,i);
	});
}