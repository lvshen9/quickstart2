$.nav.checkTopWindow();
var needback = !$.nav.topIsSameDomain || $.nav.topIsSamePage;
$(document).ready(function() {
	if (!needback) {
		$("#back i:first")[0].className = "e_ico-cancel";
		$("#back span:first").text($.lang["html.web.excep.close"]);
	}
	$("#back").focus();
});
function descClick() {
	var a = $("#desc");
	$("#exec").css("display", a.attr("tag") == "1" ? "none" : "");
	a.attr("tag", a.attr("tag") == "1" ? "2" : "1");
	$("span:first", a[0]).html(
			a.attr("tag") == "1" ? $.lang["html.web.excep.closedetail"]
					: $.lang["html.web.excep.viewdetail"]);
	$("i:first", a[0])[0].className = (a.attr("tag") == "1" ? "e_ico-fold"
			: "e_ico-unfold");
}
function closePopup(e) {
	var g = e.frameElement;
	if (g && $.isSameDomain(e) && $.isSameDomain(e.parent)) {
		var c = $(e.frameElement);
		var b = c.attr("name");
		var f = c.attr("srcframename");
		if (b && f && b.indexOf("wade_popup_frame") != -1) {
			var d = c.attr("frameName");
			var a = c.attr("eventId");
			var i = c.attr("guidValue");
			var h = c.attr("name");
			$.closePopupPage(false, d, a, i, h, true);
			return true;
		} else {
			if (e.parent && e.parent != top && $.getSameWadeDomainTop
					&& e.parent != $.getSameWadeDomainTop()) {
				return closePopup(e.parent);
			} else {
				return false;
			}
		}
	}
	return false;
}
function backClick() {
	if (closePopup(window)) {
		return;
	}
	if (!needback) {
		$.nav.close();
	} else {
		var a = $("#backPage");
		if (a.length && a.val()) {
			$.redirect.toUrl(a.val());
		} else {
			history.back(-1);
		}
	}
}