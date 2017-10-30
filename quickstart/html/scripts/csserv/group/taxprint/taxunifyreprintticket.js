
    function queryCustInfos() {
 
	var groupId=getElement('cond_GROUP_ID').value;
	if (groupId=='')
	{
		alert('请输入集团编码！');
		return false;
	}
	ajaxSubmit(this, 'queryCustInfos', '','refreshtable');
	
 } 
    
  function ticket_valueChange(){
    	
    	var ticket_no = document.getElementById("cond_TICKET_NO").value;
    	var tax_no = document.getElementById("cond_TAX_NO").value;
    	var para= "TICKET_NO="+ ticket_no+"&TAX_NO="+tax_no;
    	if(ticket_no==''){
    		alert("请先取得发票号！")
    		return;
    	}
    	ajaxSubmit(this,"checkTicketNo",para, "ticketNopart");
    }

    
    function getTicketNo(){
    	
    	var allCheckbox = document.getElementsByName("SELECTBOX");
    	ajaxSubmit(this, "getTicketNo", "", "ticketNopart");
    }
    
    function selectAll()
    {
        var m = document.getElementsByName("SELECTBOX");
        for (var i=0; i< m.length;i++ )
        {
            m[i].checked = true;
        }
    }
    
    function selectNothing()
    {
        var n = document.getElementsByName("SELECTBOX");
        for (var j=0; j< n.length;j++ )
        {
        	n[j].checked = false; 
        }
    }
    
    function printTicketInfo()
    {
    	
    
    	
        var allCheckbox = document.getElementsByName("SELECTBOX");
        var tradeIds="";
        for (var a=0; a< allCheckbox.length;a++ )
        {
        	if(allCheckbox[a].checked == true) 
        	{
        	   tradeIds= tradeIds+allCheckbox[a].value+",";
          	}
        }
        
        if(tradeIds==null||tradeIds=="")
        {
        	alert("请选择你要打印的数据记录");
        	return false;
        }
      
		getElement("cond_TRADEID_LIST").value=tradeIds;

    }
    
    
    
    function  qryTaxPrintInfos()
    {
         var groupId=getElement('cond_GROUP_ID').value;
         var noteNo=getElement('cond_NOTE_NO').value;
         var staffId=getElement('cond_TRADE_STAFF_ID').value;
		 if (groupId==''&&noteNo==''&&staffId=='')
		 {
			alert('请输入有效条件');
			return false;
		 }
		 ajaxSubmit(this, 'qryTaxPrintInfos', '', 'refreshtable,refreshprinttable');
   }
    
    function printGrpTaxTicket()
    {    
    	
    	
        var allCheckbox = document.getElementsByName("select_tag");
        var tradeId="";
        for (var a=0; a< allCheckbox.length;a++ ){
        	if(allCheckbox[a].checked == true) {
        	   tradeId= allCheckbox[a].value;
          	}
        }
        if(tradeId=="")
        {
           alert("请选择要打印的记录！");
           return false;
        }
        getElement("TRADE_ID_NEW").value=tradeId;
        
    	var ticket_no = document.getElementById("cond_TICKET_NO").value;
    	if(ticket_no==''){
    		alert("请先取得发票号！")
    		return false;
    	}
    	
    }
 