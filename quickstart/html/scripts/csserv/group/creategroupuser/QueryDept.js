/* $Id  */

function changeQueryType() {
	   var choose=getElement("QueryType").value;
       if (choose=="0") //按渠道编码
       {
          getElement("bDeptCode").style.display = "block";
          getElement("bUserDeptCode").style.display = "none";
          getElement("bDeptName").style.display = "none";
       }
       else if (choose=="1") //按用户渠道编码
       {
          getElement("bDeptCode").style.display = "none";
          getElement("bUserDeptCode").style.display = "block";
          getElement("bDeptName").style.display = "none";
       }
       else if (choose=="2") //按渠道名称
       {
          getElement("bDeptCode").style.display = "none";
          getElement("bUserDeptCode").style.display = "none";
          getElement("bDeptName").style.display = "block";
       }    
   }

















