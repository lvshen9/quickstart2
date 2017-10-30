function initPreView() {
	var productId = getElement("PRODUCT_ID").value;
	var join_in = getElement("pam_JOIN_IN").value
	if(productId=="6200" || productId=="8000") {
		getElement('joinouttable').style.display='block';
		if((!hasPriv("GROUPMENBER_VPMN_PRV") && productId=="8000") || (hasPriv("GROUPMENBER_VPMN_PRV") && productId=="8000" && join_in =="0")) {
			getElement("pam_JOIN_IN").disabled = true;
		}
		else{
			getElement("pam_JOIN_IN").disabled = false;
		}
	}
	else {
		getElement('joinouttable').style.display='none';
	}
	
}