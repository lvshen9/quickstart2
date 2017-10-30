
var choose = null;
/**
  * 阃夋嫨镆ヨ绫诲瀷(涓ょ)
  * add by wusf 2009.8.3
 */
function changeQueryType() {
	choose = getElement("QueryType").value;
	if (choose == "0") {//鎸夐泦锲㈢紪镰佹煡璇?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
	} else {
		if (choose == "1") { //鎸夊浐瀹氩佛镰佹煡璇?陇7
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
		}
	}
}
/**
  * 板嗗洟涓撶綉镆ヨ
  * add by wusf 2009-9-9
 */
function changeNetQueryType() {
	choose = getElement("QueryType").value;
	if (choose == "0") {//鎸変骇鍝佺被鍨嬫煡璇?
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("cond_GROUP_ID").value = "";
	} else {
		if (choose == "1") { //鎸夐泦锲㈢紪镰佹煡璇?
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("cond_PRODUCT_ID").value = "";
		}
	}
}
/**
  * IP鍚庝粯璐瑰浐瀹氱数璇濆佛镰佹煡璇?陇7
  * add by lixiuyu 2009-8-12
 */
function IPLaterPayQuery() {
	var choose = getElement("cond_QueryMode").value;
	if (choose == "0") {//鎸夐泦锲㈢紪镰佹煡璇?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("cond_SERIAL_NUMBER_A").nullable = "no";
		getElement("cond_SERIAL_NUMBER").nullable = "yes";
		getElement("cond_SERIAL_NUMBER").value = "";
	} else {
		if (choose == "1") { //鎸夊浐瀹氩佛镰佹煡璇?陇7
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("cond_SERIAL_NUMBER_A").nullable = "yes";
			getElement("cond_SERIAL_NUMBER").nullable = "no";
			getElement("cond_SERIAL_NUMBER_A").value = "";
		}
	}
}
/**
  * 板嗗洟LBS镆ヨ
  * add by lixiuyu 2009-8-13
 */
function GroupLBSQuery() {
	var snA = getElement("cond_SERIAL_NUMBER_B").value;
	var snB = getElement("cond_SERIAL_NUMBER").value;
	if (snA == "" && snB == "") {
		alert("\u4ea7\u54c1\u7f16\u7801\u548c\u624b\u673a\u53f7\u7801\u4e0d\u80fd\u540c\u65f6\u4e3a\u7a7a!");
		return false;
	}
}
/**
  * 板嗗洟褰╅搩镆ヨ
  * add by lixiuyu 2009-8-13
 */
function GroupPRBTQuery() {
	var snA = getElement("cond_SERIAL_NUMBER_B").value;
	var snB = getElement("cond_SERIAL_NUMBER").value;
	if (snA == "" && snB == "") {
		alert("\u4ea7\u54c1\u7f16\u7801\u548c\u624b\u673a\u53f7\u7801\u4e0d\u80fd\u540c\u65f6\u4e3a\u7a7a!");
		return false;
	}
}
/**
  * VPMN鐢ㄦ埛璧勬枡
  * add by lixiuyu 2009-8-12
 */
function changeQueryTypeVPMN() {
	var choose = getElement("cond_QueryModeVPMN").value;
	if (choose == "0") {     //鎸塚PMN缂栫爜镆ヨ
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("cond_VPN_NO").nullable = "no";
		getElement("cond_SERIAL_NUMBER").nullable = "yes";
		getElement("cond_SERIAL_NUMBER").value = "";
	} else {
		if (choose == "1") { //鎴愬憳链嶅姟鍙风爜
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("cond_VPN_NO").nullable = "yes";
			getElement("cond_SERIAL_NUMBER").nullable = "no";
			getElement("cond_VPN_NO").value = "";
		}
	}
}
function clickcheck() {
	var effectNow = getElement("effectNow").value;
	if (effectNow == "on") {
		getElement(flag).value = 1;
	}
}
/**
  * 阃夋嫨镆ヨ绫诲瀷(涓夌)
  * add by wusf 2009.8.3
 */
function changeThreeQueryType() {
	choose = getElement("QueryType").value;
	if (choose == "0") {//鎸夋煡璇㈢被鍨?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
	} else {
		if (choose == "1") { //鎸夋煡璇㈢被鍨?陇7
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
		} else {
			if (choose == "2") { //鎸夋煡璇㈢被鍨?陇7
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
			}
		}
	}
}
/**
  * 
  * add by jch 2009.8.3
 */
function GroupProductQueryO() {
	choose = getElement("cond_QueryMode").value;
    //alert(choose);
	if (choose == "0") {//鎸夋煡璇㈢被鍨?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
		getElement("cond_BIZ_CODE").nullable = "no";
		getElement("cond_BIZ_ATTR").nullable = "yes";
		getElement("cond_BIZ_ATTR").value = "";
		getElement("cond_SERIAL_NUMBER").nullable = "yes";
		getElement("cond_SERIAL_NUMBER").value = "";
	} else {
		if (choose == "1") {
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
			getElement("cond_BIZ_CODE").nullable = "yes";
			getElement("cond_BIZ_CODE").value = "";
			getElement("cond_BIZ_ATTR").nullable = "no";
			getElement("cond_SERIAL_NUMBER").nullable = "yes";
			getElement("cond_SERIAL_NUMBER").value = "";
		} else {
			if (choose == "2") { //鎸夋煡璇㈢被鍨?陇7
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
				getElement("cond_BIZ_CODE").nullable = "yes";
				getElement("cond_BIZ_CODE").value = "";
				getElement("cond_BIZ_ATTR").nullable = "yes";
				getElement("cond_BIZ_ATTR").value = "";
				getElement("cond_SERIAL_NUMBER").nullable = "no";
			}
		}
	}
}
/**
  * 
  * add by jch 2009.8.3
 */
function GroupBBossTradeQuery() {
	choose = getElement("cond_QueryMode").value;
    //alert(choose);
	if (choose == "0") {//鎸夋煡璇㈢被鍨?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
		getElement("cond_GROUP_ID").nullable = "no";
		getElement("cond_CUST_NAME").nullable = "yes";
		getElement("cond_CUST_NAME").value = "";
		getElement("cond_ORDER_ID").nullable = "yes";
		getElement("cond_ORDER_ID").value = "";
	} else {
		if (choose == "1") {
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
			getElement("cond_GROUP_ID").nullable = "yes";
			getElement("cond_GROUP_ID").value = "";
			getElement("cond_CUST_NAME").nullable = "no";
			getElement("cond_ORDER_ID").nullable = "yes";
			getElement("cond_ORDER_ID").value = "";
		} else {
			if (choose == "2") { //鎸夋煡璇㈢被鍨?陇7
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
				getElement("cond_GROUP_ID").nullable = "yes";
				getElement("cond_GROUP_ID").value = "";
				getElement("cond_CUST_NAME").nullable = "yes";
				getElement("cond_CUST_NAME").value = "";
				getElement("cond_ORDER_ID").nullable = "no";
			}
		}
	}
}
/**
 * 
 * add by jch 2009.8.3
 * modify by weixb3 2013/6/20
 */
function GroupBBossBizMebQuery() {
	choose = $("#cond_QueryMode").val();
	if (choose == "0") {//按手机号码查询
		$('#QueryCondPart').removeClass()
		$('#QueryCondPart').addClass('c_form c_form-label-5 c_form-col-3')
		$("#QueryTypeOne").css("display", "");
		$("#QueryTypeTwo").css("display", "none");
		$("#QueryTypeThree").css("display", "none");
		$("#QueryTypeFour").css("display", "none");
		$("#cond_SERIAL_NUMBER").attr("nullable", "no");
		$("#cond_GROUP_ID").attr("nullable", "yes");
		$("#cond_GROUP_ID").val('');
		$("#cond_EC_SERIAL_NUMBER").attr("nullable", "yes");
		$("#cond_EC_SERIAL_NUMBER").val('');
		$("#cond_PRODUCT_OFFER_ID").attr("nullable", "yes");
		$("#cond_PRODUCT_OFFER_ID").val('');
	} else {
		if (choose == "1") { //按集团客户编码查询
			$('#QueryCondPart').removeClass()
			$('#QueryCondPart').addClass('c_form c_form-label-7 c_form-col-3')
			$("#QueryTypeOne").css("display", "none");
			$("#QueryTypeTwo").css("display", "");
			$("#QueryTypeThree").css("display", "none");
			$("#QueryTypeFour").css("display", "none");
			$("#cond_SERIAL_NUMBER").attr("nullable", "yes");
			$("#cond_SERIAL_NUMBER").val('');
			$("#cond_GROUP_ID").attr("nullable", "no");
			$("#cond_EC_SERIAL_NUMBER").attr("nullable", "yes");
			$("#cond_EC_SERIAL_NUMBER").val('');
			$("#cond_PRODUCT_OFFER_ID").attr("nullable", "yes");
			$("#cond_PRODUCT_OFFER_ID").val('');
		} else {
			if (choose == "2") { //按集团产品编码查询
				$('#QueryCondPart').removeClass()
			$('#QueryCondPart').addClass('c_form c_form-label-7 c_form-col-3')
				$("#QueryTypeOne").css("display", "none");
				$("#QueryTypeTwo").css("display", "none");
				$("#QueryTypeThree").css("display", "");
				$("#QueryTypeFour").css("display", "none");
				$("#cond_SERIAL_NUMBER").attr("nullable", "yes");
				$("#cond_SERIAL_NUMBER").val('');
				$("#cond_GROUP_ID").attr("nullable", "yes");
				$("#cond_GROUP_ID").val('');
				$("#cond_EC_SERIAL_NUMBER").attr("nullable", "no");
				$("#cond_PRODUCT_OFFER_ID").attr("nullable", "yes");
				$("#cond_PRODUCT_OFFER_ID").val('');
			} else {
				$('#QueryCondPart').removeClass()
			$('#QueryCondPart').addClass('c_form c_form-label-7 c_form-col-3')
				if (choose == "3") { //按订购关系编码查询
					$("#QueryTypeOne").css("display", "none");
					$("#QueryTypeTwo").css("display", "none");
					$("#QueryTypeThree").css("display", "none");
					$("#QueryTypeFour").css("display", "");
					$("#cond_SERIAL_NUMBER").attr("nullable", "yes");
					$("#cond_SERIAL_NUMBER").val('');
					$("#cond_GROUP_ID").attr("nullable", "yes");
					$("#cond_GROUP_ID").val('');
					$("#cond_EC_SERIAL_NUMBER").attr("nullable", "yes");
					$("#cond_PRODUCT_OFFER_ID").val('');
					$("#cond_PRODUCT_OFFER_ID").attr("nullable", "no");
				}
			}
		}
	}
}
/**
 * 
 * add by jch 2009.8.3
 * modify by weixb3 2013.3.12
 */
function GroupBBossBizEcQuery() {
	choose = $("#cond_QueryMode").val();
	if (choose == "0") {//按查询类垄1¤7
		$("#QueryTypeOne").css("display", "");
		$("#QueryTypeTwo").css("display", "none");
		$("#QueryTypeThree").css("display", "none");
		$("#QueryTypeFour").css("display", "none");
		$("#cond_GROUP_ID").attr("nullable", "no");
		$("#cond_CUST_NAME").attr("nullable", "yes");
		$("#cond_CUST_NAME").val("");
		$("#cond_EC_SERIAL_NUMBER").attr("nullable", "yes");
		$("#cond_EC_SERIAL_NUMBER").val("");
		$("#cond_PRODUCT_OFFER_ID").attr("nullable", "yes");
		$("#cond_PRODUCT_OFFER_ID").val("");
	} else {
		if (choose == "1") { //按查询类垄1¤7
			$("#QueryTypeOne").css("display", "none");
			$("#QueryTypeTwo").css("display", "");
			$("#QueryTypeThree").css("display", "none");
			$("#QueryTypeFour").css("display", "none");
			$("#cond_GROUP_ID").attr("nullable", "yes");
			$("#cond_GROUP_ID").val("");
			$("#cond_CUST_NAME").attr("nullable", "no");
			$("#cond_EC_SERIAL_NUMBER").attr("nullable", "yes");
			$("#cond_EC_SERIAL_NUMBER").val("");
			$("#cond_PRODUCT_OFFER_ID").attr("nullable", "yes");
			$("#cond_PRODUCT_OFFER_ID").val("");
		} else {
			if (choose == "2") { //按查询类垄1¤7
				$("#QueryTypeOne").css("display", "none");
				$("#QueryTypeTwo").css("display", "none");
				$("#QueryTypeThree").css("display", "");
				$("#QueryTypeFour").css("display", "none");
				$("#cond_GROUP_ID").attr("nullable", "yes");
				$("#cond_CUST_NAME").val("");
				$("#cond_CUST_NAME").attr("nullable", "yes");
				$("#cond_CUST_NAME").val("");
				$("#cond_EC_SERIAL_NUMBER").attr("nullable", "no");
				$("#cond_PRODUCT_OFFER_ID").attr("nullable", "yes");
				$("#cond_PRODUCT_OFFER_ID").val("");
			} else {
				if (choose == "3") {
					$("#QueryTypeOne").css("display", "none");
					$("#QueryTypeTwo").css("display", "none");
					$("#QueryTypeThree").css("display", "none");
					$("#QueryTypeFour").css("display", "");
					$("#cond_GROUP_ID").attr("nullable", "yes");
					$("#cond_CUST_NAME").val("");
					$("#cond_CUST_NAME").attr("nullable", "yes");
					$("#cond_CUST_NAME").val("");
					$("#cond_EC_SERIAL_NUMBER").attr("nullable", "yes");
					$("#cond_EC_SERIAL_NUMBER").val("");
					$("#cond_PRODUCT_OFFER_ID").attr("nullable", "no");
				}
			}
		}
	}
}
/**
  * 
  * add by jch 2009.8.3
 */
function GroupBbossBizProdDgQuery() {
	choose = getElement("cond_QueryMode").value;
	if (choose == "0") {//鎸夋煡璇㈢被鍨?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
		getElement("QueryTypeFour").style.display = "none";
		getElement("cond_PRODUCT_OFFER_ID").nullable = "no";
		getElement("cond_GROUP_ID").nullable = "yes";
		getElement("cond_GROUP_ID").value = "";
		getElement("cond_CUST_NAME").nullable = "yes";
		getElement("cond_CUST_NAME").value = "";
		getElement("cond_SERIAL_NUMBER").nullable = "yes";
		getElement("cond_SERIAL_NUMBER").value = "";
	} else {
		if (choose == "1") { //鎸夋煡璇㈢被鍨?陇7
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
			getElement("QueryTypeFour").style.display = "none";
			getElement("cond_PRODUCT_OFFER_ID").nullable = "yes";
			getElement("cond_PRODUCT_OFFER_ID").value = "";
			getElement("cond_GROUP_ID").nullable = "no";
			getElement("cond_CUST_NAME").nullable = "yes";
			getElement("cond_CUST_NAME").value = "";
			getElement("cond_SERIAL_NUMBER").nullable = "yes";
			getElement("cond_SERIAL_NUMBER").value = "";
		} else {
			if (choose == "2") { //鎸夋煡璇㈢被鍨?陇7
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
				getElement("QueryTypeFour").style.display = "none";
				getElement("cond_PRODUCT_OFFER_ID").nullable = "yes";
				getElement("cond_PRODUCT_OFFER_ID").value = "";
				getElement("cond_GROUP_ID").nullable = "yes";
				getElement("cond_GROUP_ID").value = "";
				getElement("cond_CUST_NAME").nullable = "no";
				getElement("cond_SERIAL_NUMBER").nullable = "yes";
				getElement("cond_SERIAL_NUMBER").value = "";
			} else {
				if (choose == "3") {
					getElement("QueryTypeOne").style.display = "none";
					getElement("QueryTypeTwo").style.display = "none";
					getElement("QueryTypeThree").style.display = "none";
					getElement("QueryTypeFour").style.display = "";
					getElement("cond_PRODUCT_OFFER_ID").nullable = "yes";
					getElement("cond_PRODUCT_OFFER_ID").value = "";
					getElement("cond_GROUP_ID").nullable = "yes";
					getElement("cond_GROUP_ID").value = "";
					getElement("cond_CUST_NAME").nullable = "yes";
					getElement("cond_SERIAL_NUMBER").value = "";
					getElement("cond_SERIAL_NUMBER").nullable = "no";
				}
			}
		}
	}
}
/**
  * 
  * add by jch 2009.8.3
 */
function GroupBBossMebQuery() {
	choose = getElement("cond_QueryMode").value;
	if (choose == "0") {//鎸夋煡璇㈢被鍨?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
		getElement("QueryTypeFour").style.display = "none";
		getElement("QueryTypeFive").style.display = "none";
		getElement("cond_SERIAL_NUMBER").nullable = "no";
		getElement("cond_GROUP_ID").nullable = "yes";
		getElement("cond_GROUP_ID").value = "";
		getElement("cond_EC_SERIAL_NUMBER").nullable = "yes";
		getElement("cond_EC_SERIAL_NUMBER").value = "";
		getElement("cond_ORDER_ID").nullable = "yes";
		getElement("cond_ORDER_ID").value = "";
		getElement("cond_PRODUCT_OFFER_ID").nullable = "yes";
		getElement("cond_PRODUCT_OFFER_ID").value = "";
	} else {
		if (choose == "1") { //鎸夋煡璇㈢被鍨?陇7
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
			getElement("QueryTypeFour").style.display = "none";
			getElement("QueryTypeFive").style.display = "none";
			getElement("cond_SERIAL_NUMBER").nullable = "yes";
			getElement("cond_SERIAL_NUMBER").value = "";
			getElement("cond_GROUP_ID").nullable = "no";
			getElement("cond_EC_SERIAL_NUMBER").nullable = "yes";
			getElement("cond_EC_SERIAL_NUMBER").value = "";
			getElement("cond_ORDER_ID").nullable = "yes";
			getElement("cond_ORDER_ID").value = "";
			getElement("cond_PRODUCT_OFFER_ID").nullable = "yes";
			getElement("cond_PRODUCT_OFFER_ID").value = "";
		} else {
			if (choose == "2") { //鎸夋煡璇㈢被鍨?陇7
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
				getElement("QueryTypeFour").style.display = "none";
				getElement("QueryTypeFive").style.display = "none";
				getElement("cond_SERIAL_NUMBER").nullable = "yes";
				getElement("cond_SERIAL_NUMBER").value = "";
				getElement("cond_GROUP_ID").nullable = "yes";
				getElement("cond_GROUP_ID").value = "";
				getElement("cond_EC_SERIAL_NUMBER").nullable = "no";
				getElement("cond_ORDER_ID").nullable = "yes";
				getElement("cond_ORDER_ID").value = "";
				getElement("cond_PRODUCT_OFFER_ID").nullable = "yes";
				getElement("cond_PRODUCT_OFFER_ID").value = "";
			} else {
				if (choose == "3") {
					getElement("QueryTypeOne").style.display = "none";
					getElement("QueryTypeTwo").style.display = "none";
					getElement("QueryTypeThree").style.display = "none";
					getElement("QueryTypeFour").style.display = "";
					getElement("QueryTypeFive").style.display = "none";
					getElement("cond_SERIAL_NUMBER").nullable = "yes";
					getElement("cond_SERIAL_NUMBER").value = "";
					getElement("cond_GROUP_ID").nullable = "yes";
					getElement("cond_GROUP_ID").value = "";
					getElement("cond_EC_SERIAL_NUMBER").nullable = "yes";
					getElement("cond_EC_SERIAL_NUMBER").value = "";
					getElement("cond_ORDER_ID").nullable = "no";
					getElement("cond_PRODUCT_OFFER_ID").nullable = "yes";
					getElement("cond_PRODUCT_OFFER_ID").value = "";
				} else {
					if (choose == "4") {
						getElement("QueryTypeOne").style.display = "none";
						getElement("QueryTypeTwo").style.display = "none";
						getElement("QueryTypeThree").style.display = "none";
						getElement("QueryTypeFour").style.display = "none";
						getElement("QueryTypeFive").style.display = "";
						getElement("cond_SERIAL_NUMBER").nullable = "yes";
						getElement("cond_SERIAL_NUMBER").value = "";
						getElement("cond_GROUP_ID").nullable = "yes";
						getElement("cond_GROUP_ID").value = "";
						getElement("cond_EC_SERIAL_NUMBER").nullable = "yes";
						getElement("cond_EC_SERIAL_NUMBER").value = "";
						getElement("cond_ORDER_ID").nullable = "yes";
						getElement("cond_ORDER_ID").value = "";
						getElement("cond_PRODUCT_OFFER_ID").nullable = "no";
					}
				}
			}
		}
	}
}
/**
  * 阃夋嫨镆ヨ绫诲瀷(浜旗)
  * add by jch 2009.8.3
 */
function changeFiveQueryType() {
	choose = getElement("QueryType").value;
	if (choose == "0") {//鎸夋煡璇㈢被鍨?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
		getElement("QueryTypeFour").style.display = "none";
		getElement("QueryTypeFive").style.display = "none";
	} else {
		if (choose == "1") { //鎸夋煡璇㈢被鍨?陇7
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
			getElement("QueryTypeFour").style.display = "none";
			getElement("QueryTypeFive").style.display = "none";
		} else {
			if (choose == "2") { //鎸夋煡璇㈢被鍨?陇7
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
				getElement("QueryTypeFour").style.display = "none";
				getElement("QueryTypeFive").style.display = "none";
			} else {
				if (choose == "3") {
					getElement("QueryTypeOne").style.display = "none";
					getElement("QueryTypeTwo").style.display = "none";
					getElement("QueryTypeThree").style.display = "none";
					getElement("QueryTypeFour").style.display = "";
					getElement("QueryTypeFive").style.display = "none";
				} else {
					if (choose == "4") {
						getElement("QueryTypeOne").style.display = "none";
						getElement("QueryTypeTwo").style.display = "none";
						getElement("QueryTypeThree").style.display = "none";
						getElement("QueryTypeFour").style.display = "none";
						getElement("QueryTypeFive").style.display = "";
					}
				}
			}
		}
	}
}
/**
  * 阃夋嫨镆ヨ绫诲瀷(锲涚)
  * add by jch 2009.8.3
 */
function changeFourQueryType() {
	choose = getElement("QueryType").value;
	if (choose == "0") {//鎸夋煡璇㈢被鍨?陇7
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
		getElement("QueryTypeFour").style.display = "none";
	} else {
		if (choose == "1") { //鎸夋煡璇㈢被鍨?陇7
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
			getElement("QueryTypeFour").style.display = "none";
		} else {
			if (choose == "2") { //鎸夋煡璇㈢被鍨?陇7
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
				getElement("QueryTypeFour").style.display = "none";
			} else {
				if (choose == "3") {
					getElement("QueryTypeOne").style.display = "none";
					getElement("QueryTypeTwo").style.display = "none";
					getElement("QueryTypeThree").style.display = "none";
					getElement("QueryTypeFour").style.display = "";
				}
			}
		}
	}
}
/**
 *涓撶綉镆ヨ
 */
function getColsValue(obj) {
	var val = window.event.srcElement.parentElement;
	var USER_ID;
	if (val.tagName == "TR") {
		var enuma = val.childNodes;
		USER_ID = enuma[6].innerText;
	}
	ajaxDirect("group.querygroupinfo.GroupNetworkQuery", "queryByUserid", "&USER_ID=" + USER_ID, "GroupProductPart", false, setAttrProduct);
}
function setAttrProduct() {
	for (a = 0; ajaxDataset.getCount() > a; a++) {
		var elementData = this.ajaxDataset.get(a);
		var ATTR_VALUE = elementData.get("ATTR_VALUE");
		var ATTR_LABLE = elementData.get("ATTR_LABLE");
		if (null == ATTR_VALUE && "" == ATTR_VALUE && null == ATTR_VALUE && "" == ATTR_VALUE) {
			return true;
		} else {
			if (a == 0) {
				getElement("DBEdit1").innerHTML = ATTR_LABLE + ": ";
				getElement("cond_DBEdit1").value = ATTR_VALUE;
			} else {
				if (a == 1) {
					getElement("DBEdit2").innerHTML = ATTR_LABLE + ": ";
					getElement("cond_DBEdit2").value = ATTR_VALUE;
				} else {
					if (a == 2) {
						getElement("DBEdit3").innerHTML = ATTR_LABLE + ": ";
						getElement("cond_DBEdit3").value = ATTR_VALUE;
					} else {
						if (a == 3) {
							getElement("DBEdit4").innerHTML = ATTR_LABLE + ": ";
							getElement("cond_DBEdit4").value = ATTR_VALUE;
						} else {
							if (a == 4) {
								getElement("DBEdit5").innerHTML = ATTR_LABLE + ": ";
								getElement("cond_DBEdit5").value = ATTR_VALUE;
							} else {
								if (a == 5) {
									getElement("DBEdit6").innerHTML = ATTR_LABLE + ": ";
									getElement("cond_DBEdit6").value = ATTR_VALUE;
								} else {
									if (a == 6) {
										getElement("DBEdit7").innerHTML = ATTR_LABLE + ": ";
										getElement("cond_DBEdit7").value = ATTR_VALUE;
									} else {
										if (a == 7) {
											getElement("DBEdit8").innerHTML = ATTR_LABLE + ": ";
											getElement("cond_DBEdit8").value = ATTR_VALUE;
										}
									}
								}
							}
						}
					}
				}
			}
		}
	}
	return true;
}
/*镓揿嵃*/
function printtable() {
	Wade.print.printRaw("printTable");
}
/*ADC涓汉璁㈣喘镆ヨ*/
function changeQueryTypeADC() {
	choose = getElement("QueryType").value;
	if (choose == "0") {
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("QueryTypeThree").style.display = "none";
		getElement("cond_SERIAL_NUMBER").nullable = "no";
		getElement("cond_BIZ_CODE").nullable = "yes";
		getElement("cond_EC_SERIAL_NUMBER").nullable = "yes";
		getElement("cond_BIZ_CODE").value = "";
		getElement("cond_EC_SERIAL_NUMBER").value = "";
	} else {
		if (choose == "1") {
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("QueryTypeThree").style.display = "none";
			getElement("cond_SERIAL_NUMBER").nullable = "yes";
			getElement("cond_BIZ_CODE").nullable = "no";
			getElement("cond_EC_SERIAL_NUMBER").nullable = "yes";
			getElement("cond_SERIAL_NUMBER").value = "";
			getElement("cond_EC_SERIAL_NUMBER").value = "";
		} else {
			if (choose == "2") {
				getElement("QueryTypeOne").style.display = "none";
				getElement("QueryTypeTwo").style.display = "none";
				getElement("QueryTypeThree").style.display = "";
				getElement("cond_SERIAL_NUMBER").nullable = "yes";
				getElement("cond_BIZ_CODE").nullable = "yes";
				getElement("cond_EC_SERIAL_NUMBER").nullable = "no";
				getElement("cond_SERIAL_NUMBER").value = "";
				getElement("cond_BIZ_CODE").value = "";
			}
		}
	}
}
/**
  * changeVpmnTypeQuery
  * add by meig 2009.8.17
 */
function changeVpmnTypeQuery() {
	choose = getElement("QueryType").value;
	if (choose == "0") {
		getElement("QueryTypeOne").style.display = "";
		getElement("QueryTypeTwo").style.display = "none";
		getElement("cond_SERIAL_NUMBER").nullable = "no";
		getElement("cond_SERIAL_NUMBER_A").nullable = "yes";
		getElement("cond_SERIAL_NUMBER_A").value = "";
	} else {
		if (choose == "1") {
			getElement("QueryTypeOne").style.display = "none";
			getElement("QueryTypeTwo").style.display = "";
			getElement("cond_SERIAL_NUMBER_A").nullable = "no";
			getElement("cond_SERIAL_NUMBER").nullable = "yes";
			getElement("cond_SERIAL_NUMBER").value = "";
		}
	}
}
function initParentVpmnQuery() {
	getElement("discntPart").style.display = "none";
}
function queryDiscntInfo(obj) {
	getElement("discntPart").style.display = "";
	ajaxDirect(this, "queryDiscntInfos", "&USER_ID=" + obj, "discntPart", null, null);
}

//id:domid
function exportBeforeAction(domid) {
	//查询条件校验
	if(!$.validate.verifyAll("QueryCondPart")) {
		return false;
	}else{
	$.Export.get(domid).setParams("&a=a&b=b");
	return true;
	}
}
//oper: 取消：cancel；终止：terminate；状态修改中的 确定：loading；导出完成后的确定：ok；导出失败时的确定：fail；
function exportAction(oper, domid) {
	
	if (oper == "cancel") {
		alert("点击[取消]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "terminate") {
		alert("点击[终止]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "loading") {
		alert("点击[加载]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "ok") {
		alert("成功时点击[确定]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} else if (oper == "fail") {
		alert("失败时点击[确定]按钮时执行的JS方法exportAction,当前状态[" + oper + "]");
	} 
	return true;
}

function sendEndEsopFlow(){
	MessageBox.confirm("提示信息","确定要结束ESOP流程吗",function(btn){
		
		if ('ok' == btn){
		
			var eos = new Wade.DataMap($("#EOS").val());
			$.beginPageLoading("正在结束ESOP流程...");
			ajaxSubmit(this, 'queryProvCprtforEsop', '&EOS='+eos, null, function(data){
			
				var result = data.get("RESULT");
				
				if ("SUCCESS" == result){
					MessageBox.success("提示信息", "结束ESOP流程成功！");
				}
				$.endPageLoading();
			}
			,function(error_code,error_info,derr){
			
				$.endPageLoading();
				
				showDetailErrorInfo(error_code,error_info,derr);
				
			});
			
		}
		
	});
}