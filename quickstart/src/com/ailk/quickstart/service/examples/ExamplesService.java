package com.ailk.quickstart.service.examples;

import com.ailk.biz.service.BizService;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.quickstart.bean.examples.ExamplesBean;
import com.ailk.service.bean.BeanManager;

public class ExamplesService extends BizService {
	
	private static final long serialVersionUID = 1L;

	public IDataset queryAreasByParent(IData data) throws Exception {
		ExamplesBean bean = (ExamplesBean) BeanManager.createBean(ExamplesBean.class);
		
		return bean.queryAreasByParent(data); 
	}
	
	public IDataset queryDepartsByParent(IData data) throws Exception {
		ExamplesBean bean = (ExamplesBean) BeanManager.createBean(ExamplesBean.class);
		
		return bean.queryDepartsByParent(data); 
	}
	
	public IDataset queryDepartKindsByEparchy(IData data) throws Exception {
		ExamplesBean bean = (ExamplesBean) BeanManager.createBean(ExamplesBean.class);
		
		return bean.queryDepartKindsByEparchy(data); 
	}
}