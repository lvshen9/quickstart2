package com.ailk.quickstart.bean.examples;

import com.ailk.biz.bean.BizDAO;
import com.ailk.common.data.IDataset;

public class ExamplesDAO extends BizDAO {
	
	 /**
     * 按区域查询下级区域数据，同时统计下级节点数量
     * @param area_code
     * @return IDataset
     * @throws Exception
     */
    public IDataset queryAreasByParent(String area_code) throws Exception {
		StringBuffer sql = new StringBuffer();
		sql.append("select area.AREA_CODE, area.AREA_NAME, area.ORDER_NO, area.AREA_CODE || '|' || area.AREA_NAME AREA_TEXT, area.PARENT_AREA_CODE, area.AREA_FRAME, decode(childs.NODE_COUNT, null, 0, childs.NODE_COUNT) NODE_COUNT, decode(childs.NODE_COUNT, null, 0, 1) EXPAND_NODE, decode(childs.NODE_COUNT, null, 0, 1) CHECKED_FLAG, decode(childs.NODE_COUNT, null, 1, 0) DISABLED_FLAG from TD_M_AREA area");
		sql.append(", (select PARENT_AREA_CODE, count(AREA_CODE) node_count from TD_M_AREA group by PARENT_AREA_CODE) childs");
 		sql.append(" where area.AREA_CODE = childs.PARENT_AREA_CODE(+)");
 		sql.append(" and area.VALIDFLAG = '0'");
 		sql.append(" and area.PARENT_AREA_CODE = ?");
 		sql.append(" order by EXPAND_NODE desc, area.AREA_CODE");

		return queryList(sql.toString(), new Object[] { area_code });
	}
    
    /**
     * 按部门查询下级部门数据，同时统计下级节点数量
     * @param depart_id
     * @return IDataset
     * @throws Exception
     */
    public IDataset queryDepartsByParent(String depart_id) throws Exception {
		StringBuffer sql = new StringBuffer();
		sql.append("select dept.DEPART_ID, dept.DEPART_CODE, dept.DEPART_KIND_CODE, dept.DEPART_NAME, dept.ORDER_NO, dept.DEPART_ID || '|' || dept.DEPART_NAME DEPART_TEXT, dept.PARENT_DEPART_ID, dept.DEPART_FRAME, decode(childs.NODE_COUNT, null, 0, childs.NODE_COUNT) NODE_COUNT, decode(childs.NODE_COUNT, null, 0, 1) EXPAND_NODE from TD_M_DEPART dept");
		sql.append(", (select PARENT_DEPART_ID, count(DEPART_ID) node_count from TD_M_DEPART group by PARENT_DEPART_ID) childs");
 		sql.append(" where dept.DEPART_ID = childs.PARENT_DEPART_ID(+)");
 		sql.append(" and dept.VALIDFLAG = '0'");
 		sql.append(" and dept.PARENT_DEPART_ID = ?");
 		sql.append(" order by EXPAND_NODE desc, dept.DEPART_ID");

		return queryList(sql.toString(), new Object[] { depart_id });
	}
    
    /**
     * 按地州统计部门类型及所包含部门数量
     * @param eparchy_code
     * @return IDataset
     * @throws Exception
     */
    public IDataset queryDepartKindsByEparchy(String eparchy_code) throws Exception {
		StringBuffer sql = new StringBuffer();
		sql.append("select kind.*, decode(childs.NODE_COUNT, null, 0, childs.NODE_COUNT) NODE_COUNT, decode(childs.NODE_COUNT, null, 0, 1) EXPAND_NODE from td_m_departkind kind");
		sql.append(", (select DEPART_KIND_CODE, count(DEPART_ID) NODE_COUNT from td_m_depart where VALIDFLAG = '0' group by DEPART_KIND_CODE) childs");
		sql.append(" where kind.DEPART_KIND_CODE = childs.DEPART_KIND_CODE(+)");
		sql.append(" and kind.eparchy_code = ?");
 		sql.append(" order by EXPAND_NODE desc");
 		
		return queryList(sql.toString(), new Object[] { eparchy_code });
	}
    
}