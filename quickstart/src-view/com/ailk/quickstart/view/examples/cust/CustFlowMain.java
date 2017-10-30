/**
 * 
 */
package com.ailk.quickstart.view.examples.cust;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IDataInput;

/**
 * @author yifur
 *
 */
public class CustFlowMain extends BizPage {

	
	/**
	 * submit
	 * @param cycle
	 * @throws Exception
	 */
	public void submit(IRequestCycle cycle) throws Exception {
		IDataInput data=createDataInput("base,mail,log");
		
		//也可以将数据分开获取，单独处理
		//IDataInput base=createDataInput("base");
		//IDataInput mail=createDataInput("mail");
		//IDataInput log=createDataInput("log");
		
		
		System.out.println(">>>>>>>>>>>>>>>>>>>" + data.getData());
	}
}
