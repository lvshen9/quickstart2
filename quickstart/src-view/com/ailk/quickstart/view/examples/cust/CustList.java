package com.ailk.quickstart.view.examples.cust;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataOutput;
import com.ailk.common.data.IDataset;
import com.ailk.service.client.ServiceFactory;

public abstract class CustList extends BizPage {
	
	public abstract void setCusts(IDataset custs);
	public abstract void setCondition(IData condition);
	public abstract void setEdit(IData edit);
	public abstract void setCustsCount(long custsCount);
	
	/**
	 * query custs
	 * @param cycle
	 * @throws Exception
	 */
	public void queryCusts(IRequestCycle cycle) throws Exception {
		IDataOutput custs = ServiceFactory.call("QCS_CustMgrByName", createDataInput("custnav"));
		setCusts(custs.getData());
		setCustsCount(custs.getDataCount());
	}
	
	
	/**
	 * query cust
	 * @param cycle
	 * @throws Exception
	 */
	public void queryCust(IRequestCycle cycle) throws Exception {
		IDataOutput custs = ServiceFactory.call("QCS_CustMgrById", createDataInput());
		setEdit(custs.getData().getData(0));
	}
	
	/**
	 * edit cust
	 * @param cycle
	 * @throws Exception
	 */
	public void editCust(IRequestCycle cycle) throws Exception {
		IDataOutput custs = ServiceFactory.call("TCS_CustMgrEdit", createDataInput());
		setAjax(custs.getData());
	}
	
}
