package com.ailk.quickstart.view.examples.cache;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.util.StaticUtil;
import com.ailk.biz.view.BizPage;

import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;

public abstract class LocalCacheTest extends BizPage {
	
	public abstract void setDataName(String String);
	public abstract void setDatas(IDataset datas);
	public abstract void setCondition(IData condition);
	
	public void loadFromDB(IRequestCycle cycle) throws Exception {
		// IDataInput input = createDataInput();
		// IDataOutput output = ServiceFactory.call("QCS_StaticData", input);
		// seDatas(output.getData());
		
		//ICache cache = CacheFactory.getCache(CacheDemo.class);
		//IDataset datas = (IDataset)cache.get("KEY1");
		//setDatas(datas);
	}
	
	public void qByTypeId(IRequestCycle cycle) throws Exception {
		String typeId = cycle.getRequestContext().getParameter("TYPE_ID");
		IDataset datas = StaticUtil.getStaticList(typeId);
		setDatas(datas);
	}
	
	public void qByTypeIdPdataId(IRequestCycle cycle) throws Exception {
		String typeId = cycle.getRequestContext().getParameter("TYPE_ID");
		String pDataId = cycle.getRequestContext().getParameter("PDATA_ID");
		IDataset datas = StaticUtil.getStaticListByParent(typeId, pDataId);
		setDatas(datas);
	}
	
	public void qByTypeIdDataId(IRequestCycle cycle) throws Exception {
		String typeId = cycle.getRequestContext().getParameter("TYPE_ID");
		String dataId = cycle.getRequestContext().getParameter("DATA_ID");
		String dataName = StaticUtil.getStaticValue(typeId, dataId);
		getContext().setAjax("DATA_NAME", dataName);
	}
	
	public void qByTypeIdDataIdList(IRequestCycle cycle) throws Exception {
		String typeId = cycle.getRequestContext().getParameter("TYPE_ID");
		String dataId = cycle.getRequestContext().getParameter("DATA_ID");
		IDataset datas = StaticUtil.getStaticList(typeId, dataId);
		setDatas(datas);
	}
	
}
