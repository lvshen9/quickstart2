function displayGrpNo(){
   $('#pam_outno').css("display","block");
}
function checkboxnum(boxName){ 
    var checkflag=checkedBox(boxName);
    if (!checkflag===true){
        alert("最多选2个组");
    }
}
 
function showMessageBox(mess, mb){
	MessageBox.show({
	           title:'系统提示',
	           msg: mess,
	           buttons: MessageBox.OK,
	           fn: showResult,
	           animEl: mb
	       });
}
 
function checkedBox(boxName) {
	var boxList = $('#'+boxName);
	var checkedNum=0;
	var flag=true;
	 
	for (var i=0; i<boxList.length; i++) {
		if(boxList[i].checked){
		 checkedNum=checkedNum+1;
		 if (checkedNum>2){
		    if(boxList[i].checked){
		    boxList[i].checked=false;
		    }
		    flag=false;
		    break;
		   }else continue;
		 }
	} 
	return flag;
}

function checkedNum(temp) {
    var in_num=temp.value;
    if (/^(-|\+)?\d+$/.test(in_num)) {
        if(in_num>9){
           alert("所填组号不能大于9");
           focus(temp);
           return false;
        }
   }else{
        focus(temp);
        alert("组号必须为整数！");
   } 
	 
	  
}
function checkMaxNum(){
   var num= $('#out_no').val();
   if (checkInteger($('#out_no'),"组号")) {
        if(num>9){
           alert("所填组号不能大于9");
           return false;
        }
   }
}
function initRelaww(){ 
   	var relaww_str = $('#relawwstr').val(); 
    var idset_relaww=new Wade.DatasetList(relaww_str);
    if(idset_relaww!=""){
        idset_relaww.each(function(item,index,totalcount){
			 var SERIAL_NUMBER_B=item.get("SERIAL_NUMBER_B");
			 var OUT_NO=item.get("ROLE_CODE_B");
			 doRedisplaywwRla(SERIAL_NUMBER_B,OUT_NO); 
		});
    }
	 
}
function doRedisplaywwRla(out_grpno,out_no){
  var ogrpnum=$('#orgrpNum').val();
  var intOgrpnum=parseInt(ogrpnum);
  var OgrpSz= new Array();         
  for (var i=0;i<intOgrpnum;i++){
     var ogrplist= $('#list'+i).val(); 
     OgrpSz=ogrplist.split("_");
     if(OgrpSz[0]===out_grpno){
      $('#list'+i).checked=true;
      $('#input'+i).val(out_no);
     } 
  }
}