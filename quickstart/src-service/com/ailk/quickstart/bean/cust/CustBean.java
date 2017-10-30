package com.ailk.quickstart.bean.cust;

import java.sql.PreparedStatement;
import java.sql.ResultSet;

import com.ailk.biz.bean.BizBean;
import com.ailk.biz.service.BizRoute;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.Pagination;
import com.ailk.common.util.Utility;
import com.ailk.database.dbconn.DBConnection;
import com.ailk.database.util.DaoHelper;
import com.ailk.service.session.SessionManager;

public class CustBean extends BizBean {

	/**
	 * query cust by id
	 * 
	 * @param vip_id
	 * @param cust_id
	 * @return
	 * @throws Exception
	 */
	public IData queryCustById(String vip_id, String cust_id) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, getVisit().getLoginEparchyCode());
		return dao.queryCustById(vip_id, cust_id);
	}
	
	
	/**
	 * 通过Connection执行SQL并返回结果集
	 * @param vip_id
	 * @return
	 * @throws Exception
	 */
	public IDataset queryCustByVipId(String vip_id) throws Exception {
		//指定CRM1库的连接
		DBConnection conn = SessionManager.getInstance().getSessionConnection("crm1");
		
		String sql = "select * from tf_f_cust_vip where vip_id=?";
		
		PreparedStatement stmt = conn.prepareStatement(sql);
		stmt.setString(1, vip_id);
		ResultSet rs = stmt.executeQuery();
		IDataset ds = DaoHelper.rssetToDataset(rs, 100);
		
		//需要手动close
		rs.close();
		stmt.close();
		
		return ds;
	}

	/**
	 * query custs
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public IDataset queryCusts(IData param) throws Exception {
		CustDAO dao = createDAO(CustDAO.class);
		return dao.queryCusts(param);
	}

	/**
	 * update cust name
	 * 
	 * @param cust
	 * @return
	 * @throws Exception
	 */
	public boolean updateCustName(IData cust) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, getVisit().getLoginEparchyCode());
		return dao.update("tf_f_cust_vip", cust, new String[] { "ROWID" });
	}
	
	/**
	 * 批量将Dataset里的数据按ROWID修改到表里
	 * @param dataset
	 * @throws Exception
	 */
	public void updateStatics(IDataset dataset) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, "common");
		dao.update("td_s_static", dataset, new String[] { "ROWID" });
	}

	/**
	 * 根据ROWID的批量删除
	 * @param dataset
	 * @throws Exception
	 */
	public void deleteStatics(IDataset dataset) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, "common");
		dao.delete("td_s_static", dataset, new String[] { "ROWID" }, 3000);
	}

	/**
	 * 全量字段的批量Update
	 * @param dataset
	 * @throws Exception
	 */
	public void insertStatics(IDataset dataset) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, "common");
		dao.insert("td_s_static", dataset);
	}

	/**
	 * 指定更新字段的批量Update
	 * @param data
	 * @throws Exception
	 */
	public void updateStatics2(IData data) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, "common");
		dao.update("td_s_static", data, new String[] { "SUBSYS_CODE", "DATA_NAME", "PDATA_ID" }, new String[] {
				"TYPE_ID", "DATA_ID" }, new String[] { data.getString("TYPE_ID"), data.getString("DATA_ID") });
	}

	/**
	 * 指定更新字段及批量大小的批量Update
	 * @param dataset
	 * @throws Exception
	 */
	public void updateStatics3(IDataset dataset) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, "common");
		dao.update("td_s_static", dataset, new String[] { "SUBSYS_CODE", "DATA_NAME", "PDATA_ID" },
				new String[] { "ROWID" }, 2000);
	}
	

	/**
	 * save cust create time
	 * 
	 * @param cust
	 * @throws Exception
	 */
	public void saveCustCreatTime(IData cust) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, getVisit().getLoginEparchyCode());
		dao.save("tf_f_cust_vip", cust);
	}

	/**
	 * query custs by cust name
	 * 
	 * @param cust_name
	 * @param pagin
	 * @return
	 * @throws Exception
	 */
	public IDataset queryCustsByCustName(String cust_name, String cust_id, Pagination pagin) throws Exception {
		CustDAO dao = createDAO(CustDAO.class,  BizRoute.getRouteId());
		return dao.queryCustsByCustName(cust_name, cust_id, pagin);
	}

	/**
	 * update proc
	 * 
	 * @param params
	 * @throws Exception
	 */
	public void updateProc(IData params) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, getVisit().getLoginEparchyCode());
		dao.callProc("proc_cust_log", new String[] { "CUST_ID", "CUST_NAME" }, params);
	}

	/**
	 * query cust by params
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public IDataset queryCustByParams(IData param) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, getVisit().getLoginEparchyCode());
		Utility.error("testerror.code", new String[] { "10001", "queryCustByParams" });

		return dao.queryCusts(param);
	}

	/**
	 * export static data
	 * 
	 * @param param
	 * @param pagin
	 * @return
	 * @throws Exception
	 */
	public IDataset exportStaticData(IData param, Pagination pagin) throws Exception {
		CustDAO dao = createDAO(CustDAO.class, getVisit().getLoginEparchyCode());
		return dao.queryList("select * from td_s_static", new String[] {}, pagin);
	}

}
