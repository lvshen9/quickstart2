package com.ailk.quickstart.bean.examples;

import com.ailk.biz.bean.BizBean;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DataMap;

public class ExamplesBean extends BizBean {
	
   /**
     * 根据区域编码查询区域列表
     * @param area_code
     * @return IDataset
     * @throws Exception
     */
    public IDataset queryAreasByParent(IData param) throws Exception {
    	String area_code=param.getString("AREA_CODE");
    	/** 取subsys 默认库连接 */
    	ExamplesDAO dao = createDAO(ExamplesDAO.class);
    	return dao.queryAreasByParent(area_code);
    }
    
    /**
     * 根据部门编码查询部门列表
     * @param pd
     * @param depart_id
     * @return IDataset
     * @throws Exception
     */
    public IDataset queryDepartsByParent(IData param) throws Exception {
    	String depart_id=param.getString("DEPART_ID");
    	/** 取subsys 默认库连接 */
    	ExamplesDAO dao = createDAO(ExamplesDAO.class);
    	return dao.queryDepartsByParent(depart_id);
    }
    
    /**
     * 根据地州查询部门类型列表
     * @param pd
     * @param eparchy_code
     * @return IDataset
     * @throws Exception
     */
    public IDataset queryDepartKindsByEparchy(IData param) throws Exception {
    	String eparchy_code=param.getString("EPARCHY_CODE");
    	/** 取subsys 默认库连接 */
    	ExamplesDAO dao = createDAO(ExamplesDAO.class);
    	return dao.queryDepartKindsByEparchy(eparchy_code);
    }
    
    /**
     * 查看部门信息
     * @param depart_id
     * @return IData
     * @throws Exception
     */
    public IData queryDept(String depart_id) throws Exception {
    	/** 取subsys 默认库连接 */
    	ExamplesDAO dao = createDAO(ExamplesDAO.class);
    	
    	IData data = new DataMap();
    	data.put("DEPART_ID", depart_id);
    	return dao.queryByPK("TD_M_DEPART", data);
    }
}
    