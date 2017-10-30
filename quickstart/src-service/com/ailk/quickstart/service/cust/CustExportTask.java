package com.ailk.quickstart.service.cust;


import org.apache.log4j.Logger;

import com.ailk.biz.impexp.ExportTaskExecutor;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.Pagination;
import com.ailk.quickstart.bean.cust.CustBean;
import com.ailk.service.bean.BeanManager;

public class CustExportTask extends ExportTaskExecutor {

	private static transient final Logger log = Logger.getLogger(CustExportTask.class);
	
	@Override
	public void initialize(IData param) throws Exception {
		setRouteId("0731");
	}
	

	/**
	 * 执行数据导出
	 * @param param 导出的参数
	 * @param pagin 分页参数
	 */
	@Override
	public IDataset executeExport(IData param, Pagination pagin) throws Exception {
		CustBean bean = BeanManager.createBean(CustBean.class);
		return bean.exportStaticData(param, pagin);
	}
	
}
