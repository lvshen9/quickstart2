$(function(){
	$("#menu_list a[class]").children("span").bind("click",function(e){
		var href=$(this).parent();
		var display=href.hasClass("unfold");
		var div=href.next("[class=sub]");
		
		div.css("display",(display?"none":""));
	
		if(display){
			href.removeClass("unfold");
			href.addClass("fold");
		}else{
			href.removeClass("fold");
			href.addClass("unfold");
		}
	});
});