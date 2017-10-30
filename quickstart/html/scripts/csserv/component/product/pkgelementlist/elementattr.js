//包元素列表对象
if(typeof(ElementAttr)=="undefined"){
	window["ElementAttr"]=function(){
	};
	var elementAttr = new ElementAttr();
}
(function(){
	$.extend(ElementAttr.prototype,{
		radioClick:function(eventObj){
			var obj = $(eventObj);
			var name = obj.attr("name");
			var attrs = $("input[name="+name+"]");
			var length = attrs.length;
			obj.val(obj.attr("attrValue"));
			for(var i=0;i<length;i++){
				var attr = $(attrs[i]);
				if(obj.attr("id")==attr.attr("id")){
					continue;
				}
				else{
					attr.val("");
				}
			}
		}
	});
}
)();