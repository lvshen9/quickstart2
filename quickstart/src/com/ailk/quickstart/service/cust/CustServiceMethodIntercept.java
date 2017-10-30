package com.ailk.quickstart.service.cust;

import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.service.invoker.impl.ServiceMethodIntercept;

public class CustServiceMethodIntercept extends ServiceMethodIntercept {

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.ailk.service.invoker.impl.ServiceMethodIntercept#invokeBefore(com
	 * .ailk.common.data.IData)
	 */
	@Override
	public boolean before(String svcname, IData head, IData input) throws Exception {
		boolean result = false;

		// 如果验证失败,则设置ResultInfo,ResultCode
		/*if (!result) {
			setResultCode("check.code.1001");
			setResultInfo("check.info.1001");
		}*/
		
		return true;
	}

	/*
	 * (non-Javadoc)
	 * 
	 * @see
	 * com.ailk.service.invoker.impl.ServiceMethodIntercept#invokeAfter(com.
	 * ailk.common.data.IData, com.ailk.common.data.IDataset)
	 */
	@Override
	public boolean after(String svcname, IData head, IData input, IDataset output) throws Exception {
		boolean result = false;

		// 如果验证失败,则设置ResultInfo,ResultCode
		/*if (!result) {
			setResultCode("check.code.1002");
			setResultInfo("check.info.1002");
		}*/
		
		return true;
	}
}
