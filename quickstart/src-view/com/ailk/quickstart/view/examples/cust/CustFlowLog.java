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
public class CustFlowLog extends BizPage {

	public void submit(IRequestCycle cycle) throws Exception {
		IDataInput cust=createDataInput("cust");
	}
}
