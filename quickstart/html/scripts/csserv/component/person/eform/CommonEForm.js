function readCardInfo(){
	
	try{
		var ocx = new ActiveXObject("WadeMutiIdCard.MutiIdCard");		
		var cardInfo = eval(ocx.GetCardInfo());			
		if(!cardInfo){
			//alert("读取二代身份证返回信息错误!");
			return;
		}
	
		$("#cond_PSPT_ID").val(cardInfo.number);
	}catch(e){
		alert("证件识别异常："+e);
	}	
	
}