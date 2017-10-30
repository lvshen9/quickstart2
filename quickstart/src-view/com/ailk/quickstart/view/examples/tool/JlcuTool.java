package com.ailk.quickstart.view.examples.tool;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IDataOutput;
import com.ailk.service.client.ServiceFactory;

public abstract class JlcuTool extends BizPage{
	public abstract void setResult(String result);
	
	public void runJlcu(IRequestCycle cycle) throws Exception {
		
		IDataOutput result = ServiceFactory.call("SYS_JLCU_Service", createDataInput());
		if(result!=null && result.getData()!=null){
			setResult(result.getData().toString());
		}else{
			setResult(null);
		}
	}
}
