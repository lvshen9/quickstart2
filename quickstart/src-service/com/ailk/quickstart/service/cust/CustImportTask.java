package com.ailk.quickstart.service.cust;


import org.apache.log4j.Logger;

import com.ailk.biz.impexp.ImportTaskExecutor;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DatasetList;

public class CustImportTask extends ImportTaskExecutor {

	private static transient final Logger log = Logger.getLogger(CustImportTask.class);
	
	
	@Override
	public void initialize(IData param) throws Exception {
		setRouteId("0731");
	}
	

	/**
	 * 执行数据导入操作
	 * @param data 文件里解析出来的数据集
	 */
	@Override
	public IDataset executeImport(IData params, IDataset data) throws Exception {
		IDataset error = new DatasetList();
		
		//数据入库
		
		error.add(data.get(0));
		
		return error;
	}
	
}
