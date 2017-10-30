/**
 * 监听回车事件
 * @param str
 * @return
 */
function enterPress(str){
	if (event.keyCode == 13) { //js 监听对应的id   
		if(trim(str)==''){
			alert('请输入要查找的内容城市!')
			return false;
		}
	   return findInPage(str);
	}
}
var _win = window;
var _find = 0;
/**
 * 字符查询
 * @param str
 * @return
 */
function findInPage(str) {
	var txt, i, found;
	if (str == "")
		return false;
		txt = _win.document.body.createTextRange();
		for (i = 0; i <= _find && (found = txt.findText(str)) != false; i++) {
			txt.moveStart("character", 1);
			txt.moveEnd("textedit");
		}
		if (found) {
			txt.moveStart("character", -1);
			txt.findText(str);
			txt.select();
			txt.scrollIntoView();
			_find++;
		} else {
			if (_find > 0) {
				_find = 0;
				findInPage(str);
			} else
				alert("未找到指定内容.");
		}
	return false;
}
var rm = {
	success: function(ajax){		
		var msg = ajax.get("MSG");
		var msgType = ajax.get("MSG_TYPE");
		if(msgType == "W"){//警告提示
			$.showWarnMessage("警告提示", msg);
		}else if(msgType == "E"){//错误提示
			MessageBox.error("错误提示", "业务受理失败!", null, null, msg);	
		}else{//成功提示
			var printDesc = ajax.get("PRINT_DESC");
			var printPage = ajax.get("PRINT_PAGE");
			var printPart = ajax.get("PRINT_PART");
			var printListener = ajax.get("PRINT_LISTENER");
			var param = ajax.get("PARAM");
			if(!printDesc){
				printDesc="打印"
			}			
			if(printPage && printListener){
			/*	MessageBox.success("成功提示","业务受理成功!",function(btn){
													if(btn == "ok"){	
														window.location.reload();//清空页面数据															
													}else if(btn == "ext0"){																	
														openNav(printDesc,printPage,printListener,param)// 打开一个新的tab页
														return false;
													}
												},{ok:"确定",ext0:"打印,print"},msg);*/
							MessageBox.show({
										"title":"成功提示",
										"msg":"业务受理成功!",
										"success":true,
										"fn":function(btn){
												if(btn == "ok" || btn=="cancel"){	
													window.location.reload();//清空页面数据															
												}else if(btn == "ext0"){
													return false;
												}
											},
                                         "beforeHide":function(btn){
												if(btn == "ok"){	
													return true;													
												}else if(btn == "ext0"){																	
													openNav(printDesc,printPage,printListener,param)// 打开一个新的tab页
													return false;
												}
											},
										"buttons":$.extend({ok:"确定"},{ext0:"打印,print"}),
										"content":msg
						});												
				
			}else if(printPart && printListener){
			/*	MessageBox.success("成功提示","业务受理成功!",function(btn){
													if(btn == "ok"){	
														window.location.reload();//清空页面数据															
													}else if(btn == "ext0"){																	
														$.ajax.submit(null,printListener,param,printPart,function(){printArea(printPart);});
														return false;
													}
												},{ok:"确定",ext0:"打印,print"},);*/
												
						MessageBox.show({
										"title":"成功提示",
										"msg":"业务受理成功!",
										"success":true,
										"fn":function(btn){
												if(btn == "ok" || btn=="cancel"){	
													window.location.reload();//清空页面数据															
												}else if(btn == "ext0"){
													return false;
												}
											},
                                         "beforeHide":function(btn){
												if(btn == "ok"){	
													return true;													
												}else if(btn == "ext0"){																	
													$.ajax.submit(null,printListener,param,printPart,function(){printArea(printPart);});
													return false;
												}
											},
										"buttons":$.extend({ok:"确定"},{ext0:"打印,print"}),
										"content":msg
						});
			}else{			
				MessageBox.success("成功提示","业务受理成功!",function(btn){		
													if(btn == "ok" || btn=="cancel"){	
														window.location.reload();//清空页面数据
													}
												},{ok:"确定"}, msg);	
			}	
		}		
		$.endPageLoading();
		
	},
	error: function(code,msg){
		MessageBox.error("错误提示", "业务受理失败!", null, null, msg);	
		$.endPageLoading();
	},
	ajaxSubmitMsg: function(areaids,listener,params,partids,sc,er){
		$.beginPageLoading('数据正在提交中....');
		$.ajax.submit(areaids,listener,params,partids,function(ajax){
			if(sc){
				sc(ajax);
			}
			rm.success(ajax);
		},function(code,msg){
			if(er){
				er();
			}			
			rm.error(code,msg);	
		});
	},
	ajaxSubmitQry: function(areaids,listener,params,partids,sc,er){
		$.beginPageLoading('数据正在加载中....');
		$.ajax.submit(areaids,listener,params,partids,
			function(ajax){
				if(sc){
					sc(ajax);
				}
				$.endPageLoading();
			},
			function(code,msg){
				if(er){
					er();
				}
				rm.error(code,msg);
			});
	},
	ajaxSubmitPop: function(areaids,listener,params,partids, sc, er){
		$.beginPageLoading('数据正在提交中....');
		$.ajax.submit(areaids,listener,params,partids,
			function(ajax){
			if(sc){
				sc(ajax);
			}
			var msgType = ajax.get("MSG_TYPE");
			var msg = ajax.get("MSG");
			if(msgType == 'E' || msgType == 'W'){
				rm.success(ajax);
			} else {
				$.endPageLoading();
				MessageBox.success("成功提示","业务受理成功!",function(btn){
					window.parent.location.reload();
				},{ok:"返回"}, msg);	
			}
		},function(code,msg){
			if(er){
				er();
			}
			rm.error(code,msg);
		});
	},ablePopup:function(popupId,isClear){
		if(isClear){
			this.clearPopup(popupId);
		}	
		var popBtn = $("#POP_BTN_" + popupId);
		if(popBtn){			
			popBtn.attr("disabled",false);
			popBtn.removeClass("e_dis");
		}
		$("#POP_" + popupId).attr("disabled",false);
		$("#" + popupId).attr("disabled",false);
	},disablePopup:function(popupId,isClear){	
		if(isClear){
			this.clearPopup(popupId);
		}		
		var popBtn = $("#POP_BTN_" + popupId);
		if(popBtn){
			popBtn.attr("disabled",true);
			popBtn.addClass("e_dis");
		}		
		$("#POP_" + popupId).attr("disabled",true);
		$("#" + popupId).attr("disabled",true);
	},clearPopup:function(popupId){
		$("#" + popupId).val("");
		$("#POP_" + popupId).val("");
	},
	compareContain:function(begId, endId, nBeg, nEnd){
		var succ = false;
		if(!rm.compareTwoNumber(begId, endId, nBeg)){
			$.showErrorMessage("["+begId+"]-["+endId+"]中包含["+nBeg+"]!");
		}else if(!rm.compareTwoNumber(begId, endId, nEnd)){
			$.showErrorMessage("["+begId+"]-["+endId+"]中包含["+begId+"]!");
		}else if(!rm.compareTwoNumber(nBeg, nEnd, begId)){
			$.showErrorMessage("["+nBeg+"]-["+nEnd+"]中包含["+begId+"]!");
		}else if(!rm.compareTwoNumber(nBeg, nEnd, endId)){
			$.showErrorMessage("["+nBeg+"]-["+nEnd+"]中包含["+endId+"]!");
		}else{
			succ = true;
		}
		return succ;
	},
	compareTwoNumber:function(tempBegId, tempEndId, begId){
		var len = begId.length;
		var cNumber = rm.getTwoStrSameNumber(tempBegId, begId); //获取两串相同的位置
		if(cNumber == 0) return true;	//没有一位相同返回
		
		var temBSeg = tempBegId.substring(cNumber - 1, len);
		var temESeg = tempEndId.substring(cNumber - 1, len);
		var bSeg = begId.substring(cNumber - 1, len);
		
		if(!$.isNumeric(temBSeg) || !$.isNumeric(temESeg) || !$.isNumeric(bSeg)){ //后缀包括字符，说明不包含
			return false;
		}

		var subValue1 = ($.format.number(temESeg) - $.format.number(temBSeg)) + 1;
		var subValue2 = ($.format.number(bSeg) - $.format.number(temBSeg)) + 1;
		
		if(subValue2 > 0 && subValue2 <= subValue1)
			return false;
		
		return true;
	},
	getTwoStrSameNumber : function(begId, endId){//获取两串相同的位置
		var len = begId.length;
		var cNumber = 0;
		if(len != endId.length) return cNumber; //长段不相等
		
		for(var i = 0; i < len; i++){
			cNumber = i + 1;
			if(begId.substring(i, i + 1) != endId.substring(i, i + 1)){//找出不同的位置
				break;
			}
		}
		return cNumber;
	},checkResNoRange:function(startNo,endNo,endLen,maxCount){
		if(startNo == ""){
			alert("起始号不能为空！");	
			return false;	
		}
		if(endNo == ""){
			alert("终止号不能为空！");
			return false;	
		}
		if(startNo.length != endNo.length){
			alert("起始号和终止号长度不一致");
			return false;	
		}
		if(startNo.length <= endLen){
			return true;
		}
		var startPosi = startNo.length - endLen;
		if(startNo.substr(0,startPosi) != endNo.substr(0,startPosi)){
			alert("为避免数据量过大带来性能问题，起始号和终止号的前" + startPosi + "位必须相同");
			return false;	
		}
		var startCount = startNo.substr(startPosi,startNo.length);
		var endCount = endNo.substr(startPosi,endNo.length);
		var rangeCount = parseInt(endCount,10)-parseInt(startCount,10);
		if(rangeCount<0){
			alert("起始号不能小于终止号");
			return false;	
		}
		if(maxCount){
		  if(parseInt(maxCount,10)< rangeCount){
		   alert("为避免数据量过大带来性能问题，卡数量必须小于"+maxCount); 
		   return false;
		  }
		}
		return true;
	}
}
function trim(str){
	return str.replace(/(^\s*)|(\s*$)/g, "");
}
/*
*校验卡的正确性
*/
function check(obj){
	var str = obj.value;
	if("" != str){
 		var reg = /^\w*$/;
 		if(!reg.test(str)){		
 			alert("请输入数字或字母");	
 			obj.value = "";
 			return;  
 		}
     }
}

function autoCopyNum(obj_start_name,obj_end_name){	
	var obj_start=document.getElementById(obj_start_name);
	var obj_end=document.getElementById(obj_end_name);
	var targetObj=event.srcElement;
	var ieType=checkIEType();
	if(obj_end&&obj_start){
		if(trim(obj_end.value)==""&&trim(obj_start.value)!=""){
		    if(ieType=="MSIE 6.0"){
		    	if(targetObj&&targetObj===obj_end){
				    obj_end.value=obj_start.value;
				 }
		    }else{
		    	if(targetObj&&targetObj.id==obj_end.id){
				    obj_end.value=obj_start.value;
				 }
		    }
		}
		if(trim(obj_end.value)!=""&&trim(obj_start.value)==""){
			if(ieType=="MSIE 6.0"){	
				if(targetObj&&targetObj===obj_start){
		    		obj_start.value=obj_end.value;
				 }
		    }else{
		    	if(targetObj&&targetObj.id==obj_start.id){
		    		obj_start.value=obj_end.value;
				 }
		    }
		}
	}	
}
/**
 * 检查浏览器类型
 * 
 * @return
 */
function checkIEType(){
	  var OsObject = ""; 
	   if(navigator.userAgent.indexOf("MSIE 6.0")>0) { 
	        return "MSIE 6.0"; 
	   }else if(navigator.userAgent.indexOf("MSIE 8.0")>0) { 
		   return "MSIE 8.0"; 
	   }   
	   return "other";
}

/**
 * 获取当前页
 * 
 * @return
 */
function getSelectedValue()
{
	var title=mytab.getCurrentTitle();
	if('连号操作'==title || '选择操作'==title){
		$('#X_GETMODE').val('0');
	}else{
		$('#X_GETMODE').val('1');
	}
	return $('#X_GETMODE').val();
}

function changePartDis(obj,rangePartName,choosePartName,rangDisValue,chooseDisValue){
	  var rangePart=document.getElementById(rangePartName);
	  var choosePart=document.getElementById(choosePartName);
	 
	  if(!rangDisValue){
		  rangDisValue="0";
	  }
	  if(!chooseDisValue){
		  chooseDisValue="1";
	  }
	  
	  if(obj.value==rangDisValue){
		  if(rangePart){
		    rangePart.style.display="";
		  }
		  if(choosePart){
		    choosePart.style.display="none";
		  }
		  $("#lianhao").addClass("on");
		  $("#daoru").removeClass("on");
	  }else if(obj.value==chooseDisValue){
		  if(rangePart){
			  rangePart.style.display="none";
		  }
		  
		  if(choosePart){
			 choosePart.style.display="";
		  }
		  $("#lianhao").removeClass("on");
		  $("#daoru").addClass("on");
	  }
}

/**
*重置
*/
function cancelAllObj(obj){
    var objClearInput = "#"+obj+" input";
    var objClearSelect = "#"+obj+" Select";
    var objClearPopup = "#"+obj+" Popup";
    var objClearTextArea = "#"+obj+" TextArea";
    $(objClearInput).val('');
    $(objClearSelect).val('');
    $(objClearPopup).val('');
    $(objClearTextArea).val('');
}


/*
用于计算终止数量，数字位数不受限制。比如19位的SIM卡号，根据起始卡号和卡数量，计算出终止卡号。
@startNum 起始数字
@addition 相加数
@numLen 起始数字的限定长度，如果起始数字的长度符合限定长度，则进行计算，否则返回空字符串。如果此参数为空，则不校验限定长度。
*/
//added by tangkai
function calEndNum(startNum, addition, numLen)
{
	if(numLen && startNum.length != numLen)
	{
		return "";
	}
		
	if(startNum == "" || addition == "")
	{
		return "";
	}
	if(addition == "0")
	{
		return startNum;
	}

	var prefix = "";
	
	var r = startNum.search(/[0-9]*$/);
	if (r!=-1) {
		prefix = startNum.substr(0, r);
		startNum = startNum.substr(r);
	}
	
	var endNum;
	var additionLen = addition.length;
	var startNumLen = startNum.length;
	if (additionLen > 15) {
		alert("数量的长度不能超过15位！");
		return "";
	}
	
	if (startNumLen < additionLen) {
		alert("数量的长度不能超过起始数的长度！");
		return "";	
	} else {
		var part1 = startNum.substr(0, startNumLen-additionLen);
		var part2 = startNum.substr(startNumLen-additionLen, additionLen);
		endNum = parseInt(part2,10) + parseInt(addition,10) -1;
		endNum = lpad(endNum.toString(),additionLen,'0');
		var pos = -1;
		if (endNum.length>additionLen) {
			endNum = endNum.substr(1);
			var digit = new Array();
			for (var i=part1.length-1; i>=0; i--) {
				digit[i] = part1.substr(i,1);
				
				if (digit[i]=="9") {
					digit[i] = "0";
				} else {
					digit[i] = (parseInt(digit[i],10) + 1).toString();
					pos = i;
					break;
				}
			}
			if (pos==-1) {
				alert("终止数的长度大于起始数的长度！");
				return "";
			} else {
				var temp = "";
				for (var i=pos; i<part1.length; i++) {
					temp += digit[i];
				}
				endNum = part1.substring(0,pos) + temp + endNum;
				return prefix + endNum;
			}
		} else {
			return prefix + part1 + endNum; 
		}
	}
}

//为字符串填补字符（左填补）
//added by tangkai
function lpad(str, len, padChar)
{
	if(padChar.length != 1)
	{
		alert("padChar unavailable!");
		return;
	}

	while(str.length < len)
	{
		str = padChar + str; 
	}
	return str;
}