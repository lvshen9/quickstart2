/* $Id  */

function changeQueryType() {
	   var choose=getElement("QueryType").value;
       if (choose=="0") //按服务号码
       {
          getElement("bSerialNumber").style.display = "block";
          getElement("bContractNo").style.display = "none";
          getElement("bGrpId").style.display = "none";
       }
       else if (choose=="1") //按合同号
       {
          getElement("bSerialNumber").style.display = "none";
          getElement("bContractNo").style.display = "block";
          getElement("bGrpId").style.display = "none";
       }
       else if (choose=="2") //按集团客户编码
       {
          getElement("bSerialNumber").style.display = "none";
          getElement("bContractNo").style.display = "none";
          getElement("bGrpId").style.display = "block";
       }    
   }