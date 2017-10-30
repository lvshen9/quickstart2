package com.ailk.quickstart.service.depart;

import org.apache.commons.collections.map.HashedMap;

import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DatasetList;
import com.ailk.quickstart.bean.depart.DepartManagerBean;
import com.ailk.quickstart.service.core.ResBizService;
import com.ailk.service.bean.BeanManager;

/**
 * DepartManager服务
 * 
 * @author lvshen
 * 
 */
public class DepartManagerSvc extends ResBizService {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	public int updateDepartInfo(IData inparam) throws Exception {
		
		DepartManagerBean bean = (DepartManagerBean) BeanManager
				.createBean(DepartManagerBean.class);
		int dataInt = bean.updateDepartInfo(inparam);
		
		return dataInt;
	}

	public IDataset queryDepartInfo(IData param) throws Exception {

		DepartManagerBean bean = (DepartManagerBean) BeanManager
				.createBean(DepartManagerBean.class);
		return bean.queryDepartInfo(param, getPagination());
	}

	public int removeDepartInfo(IData param) throws Exception {

		System.out.println("param-------svc"+param);
		DepartManagerBean bean = (DepartManagerBean) BeanManager
				.createBean(DepartManagerBean.class);
		
		return bean.removeDepartInfo(param);
	}

}
