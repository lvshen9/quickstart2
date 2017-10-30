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
public class CustFlowBase extends BizPage {

	
	public void init(IRequestCycle cycle) throws Exception {
		IData data = getData();
		getSessionCache().setAttribute("CUSTFLOWBASE_DATA", data);
	}
	
}
