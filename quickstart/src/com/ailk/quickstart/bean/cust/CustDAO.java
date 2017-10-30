package com.ailk.quickstart.bean.cust;

import com.ailk.org.apache.commons.lang3.StringUtils;

import com.ailk.biz.bean.BizDAO;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.Pagination;
import com.ailk.database.util.SQLParser;

public class CustDAO extends BizDAO {
	
	public IData queryCustById(String vip_id, String cust_id) throws Exception {
		return queryByPK("TF_F_CUST_VIP", new String[] {"VIP_ID", "CUST_ID"}, new String[] {vip_id, cust_id});
	}
	
	public IDataset queryCusts(IData param) throws Exception {
		SQLParser parser = new SQLParser(param);
		
		parser.addSQL("select t.* from tf_f_cust_vip t");
		parser.addSQL(" where 1 = 1");
		parser.addSQL(" and cust_id = :CUST_ID");
		parser.addSQL(" and cust_name like '%' || :CUST_NAME || '%'");
		parser.addSQL(" order by t.cust_id ");
		//
		return queryList(parser);
	}
	
	public IDataset queryCustsByCustName(String cust_name, String cust_id, Pagination pagin) throws Exception {
		StringBuilder sb = new StringBuilder();
		
		sb.append("select t.* from tf_f_cust_vip t");
		sb.append(" where 1 = 1");
		sb.append(" and cust_name like '%' || :CUST_NAME || '%'");
		
		if (!StringUtils.isBlank(cust_id)) {
			sb.append(" and cust_id = :CUST_ID");
			sb.append(" order by t.cust_id ");
			return queryList(sb.toString(), new String[] {cust_name, cust_id}, pagin);
		} else {
			sb.append(" order by t.cust_id ");
			return queryList(sb.toString(), new String[] {cust_name}, pagin);
		}
	}
	
	/**
	 * call proc
	 * @param param
	 * @throws Exception
	 */
	public void callProc(IData param) throws Exception {
		callProc("xxx", new String[]{}, param);
	}
	
}
