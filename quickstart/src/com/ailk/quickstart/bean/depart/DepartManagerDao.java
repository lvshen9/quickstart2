package com.ailk.quickstart.bean.depart;

import com.ailk.biz.bean.BizDAO;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.Pagination;
import com.ailk.quickstart.bean.core.ResDao;

public class DepartManagerDao extends BizDAO {

	public static int updateDepartInfo(IData inparam) throws Exception {

		return ResDao.executeUpdateByCodeCode("TD_M_DEPART",
				"INSERT_INTO_TEST", inparam, ResDao.lvshenConnName);
	}

	public static IDataset queryDepartInfo(IData param, Pagination page)
			throws Exception {

		IDataset iDataset = ResDao.qryByCodeParser("TD_M_DEPART",
				"SEL_ALL_DEPART", param, page, ResDao.lvshenConnName);
		System.out.println("iDatasetDao------------" + iDataset);
		return iDataset;
	}

	public static int removeDepartInfo(IData param) throws Exception {

		return ResDao.executeUpdateByCodeCode("TD_M_DEPART", "DELE_DEPART_ID",
				param, ResDao.lvshenConnName);
	}

}
