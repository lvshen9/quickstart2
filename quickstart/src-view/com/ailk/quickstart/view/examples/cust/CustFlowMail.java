/**
 * 
 */
package com.ailk.quickstart.view.examples.cust;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IData;

/**
 * @author yifur
 *
 */
public class CustFlowMail extends BizPage {

	public void init(IRequestCycle cycle) throws Exception {
		IData data = (IData) getSessionCache().getAttribute("CUSTFLOWBASE_DATA");
		System.out.println(">>>>" + data);
	}
}
