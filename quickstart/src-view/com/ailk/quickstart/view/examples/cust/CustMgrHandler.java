/**
 * 
 */
package com.ailk.quickstart.view.examples.cust;

import com.ailk.biz.view.BizHttpHandler;
import com.ailk.common.data.IDataOutput;
import com.ailk.service.client.ServiceFactory;

/**
 * 客户资料保存
 * 
 * @author yifur
 *
 */
public class CustMgrHandler extends BizHttpHandler {
	
	/**
	 * 客户资料保存
	 * @throws Exception
	 */
	public void editCust() throws Exception {
		System.out.println("客户资料保存:" + getData());
		
		IDataOutput custs = ServiceFactory.call("TCS_CustMgrEdit", createDataInput());
		setAjax(custs.getData());
	}

}
