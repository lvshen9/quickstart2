package com.ailk.quickstart.bean.depart;

import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.Pagination;
import com.ailk.quickstart.bean.core.ResBizBean;


public class DepartManagerBean extends ResBizBean {

	// 添加
	public int updateDepartInfo(IData inparam) throws Exception {
		return DepartManagerDao.updateDepartInfo(inparam);
	}

	// 查询
	public IDataset queryDepartInfo(IData param, Pagination page)
			throws Exception {
		return DepartManagerDao.queryDepartInfo(param, page);
	}
	
	//删除
	public int removeDepartInfo(IData param) throws Exception {
		System.out.println("param-------bean"+param);
		return DepartManagerDao.removeDepartInfo(param);
	}
}
