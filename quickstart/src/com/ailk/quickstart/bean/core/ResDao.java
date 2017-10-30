package com.ailk.quickstart.bean.core;

import org.apache.log4j.Logger;

import com.ailk.biz.BizVisit;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DatasetList;
import com.ailk.common.data.impl.Pagination;
import com.ailk.database.dao.DAOManager;
import com.ailk.database.statement.Parameter;
import com.ailk.database.util.SQLParser;

public final class ResDao {
	public static final Logger log = Logger.getLogger(ResDao.class);

	//所连接的数据库
	public static final String resConnName = "res";
	public static final String cenConnName = "cen1";
	public static final String lvshenConnName = "crm_lvshen";

    public ResDao()
    {
    }
	
	public static ResBaseDAO getResBaseDAO(String ConnName) throws Exception{
		ResBaseDAO dao = null;
		if(null == ConnName || "" == ConnName)
			dao=(ResBaseDAO)DAOManager.createDAO(ResBaseDAO.class,resConnName);	
		else
			dao=(ResBaseDAO)DAOManager.createDAO(ResBaseDAO.class,ConnName);	
		return dao;
	}
	
    public static final void callProc(String name, String paramName[], IData paramValue)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            dao.callProc(name, paramName, paramValue);
        }

        public static final void callProc(String name, String paramName[], IData paramValue, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            dao.callProc(name, paramName, paramValue);
        }

        public static final boolean delete(String tabName, IData data)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.delete(tabName, data);
        }

        public static final boolean delete(String tabName, IData data, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.delete(tabName, data);
        }

        public static final boolean delete(String tabName, IData data, String keys[])
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.delete(tabName, data, keys);
        }

        public static final boolean delete(String tabName, IData data, String keys[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.delete(tabName, data, keys);
        }

        public static final int[] delete(String tabName, IDataset dataset, String keys[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.delete(tabName, dataset, keys);
        }

        public static final boolean deleteByRowId(String tabName, IData data)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.delete(tabName, data, new String[] {
                "ROWID"
            });
        }

        public static final boolean deleteByRowId(String tabName, IData data, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.delete(tabName, data, new String[] {
                "ROWID"
            });
        }

        public static final int[] deleteByRowId(String tabName, IDataset dataset)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.delete(tabName, dataset, new String[] {
                "ROWID"
            });
        }

        public static final int[] deleteByRowId(String tabName, IDataset dataset, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.delete(tabName, dataset, new String[] {
                "ROWID"
            });
        }

        public static final int[] executeBatch(StringBuilder sql, IDataset param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.executeBatch(sql.toString(), param);
        }

        public static final int[] executeBatch(StringBuilder sql, Parameter params[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.executeBatch(sql.toString(), params);
        }

        public static final int[] executeBatchByCodeCode(String tabname, String sqlref, IDataset params)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.executeBatchByCodeCode(tabname, sqlref, params);
        }

        public static final int executeUpdate(SQLParser parser)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.executeUpdate(parser);
        }

        public static final int executeUpdate(SQLParser parser, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.executeUpdate(parser);
        }

        public static final int executeUpdate(StringBuilder sql, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.executeUpdate(sql.toString(), param);
        }

        public static final int executeUpdate(StringBuilder sql, IData param, String rountId)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(rountId);
            return dao.executeUpdate(sql.toString(), param);
        }

        public static final int executeUpdateByCodeCode(String tabname, String sqlref, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
           
            return dao.executeUpdateByCodeCode(tabname, sqlref, param);
        }

        public static final int executeUpdateByCodeCode(String tabname, String sqlref, IData param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.executeUpdateByCodeCode(tabname, sqlref, param);
        }

        public static final int executeUpdates(SQLParser parser)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.executeUpdate(parser);
        }
        
        public static final int getCount(String sql, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.getCount(sql, param);
        }

        public static final String getSequence(Class clazz, String eparchyCode)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            String result = dao.getSequence(clazz, eparchyCode);
            return result;
        }

        public static final String getSequence(Class clazz, String eparchyCode, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            String result = dao.getSequence(clazz, eparchyCode);
            return result;
        }

        public static final boolean insert(String tabName, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            boolean result = dao.insert(tabName, param);
            return result;
        }

        public static final boolean insert(String tabName, IData param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.insert(tabName, param);
        }

        public static final int[] insert(String tabName, IDataset idsRecord)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.insert(tabName, idsRecord);
        }

        public static final int[] insert(String tabName, IDataset param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.insert(tabName, param);
        }

        public static final int[] inserts(String tabName, IDataset param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.insert(tabName, param);
        }

        public static final IDataset qryByCode(String tabName, String sqlref, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryListByCodeCode(tabName, sqlref, param);
            return ids;
        }

        public static final IDataset qryByCode(String tabName, String sqlref, IData param, Pagination page)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryListByCodeCode(tabName, sqlref, param, page);
            return ids;
        }

        public static final IDataset qryByCode(String tabName, String sqlref, IData param, Pagination page, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryListByCodeCode(tabName, sqlref, param, page);
            return ids;
        }

        public static final IDataset qryByCode(String tabName, String sqlref, IData param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryListByCodeCode(tabName, sqlref, param);
            return ids;
        }

        public static final IDataset qryByCodeAllCrm(String tabName, String sqlref, IData param, boolean allCrmDb)
            throws Exception
        {
            IDataset allData = new DatasetList();
            ResBaseDAO resDao = getResBaseDAO(resConnName);
            IDataset resData = resDao.queryListByCodeCode(tabName, sqlref, param);
            allData.addAll(resData);
            
            if(!allCrmDb)
                return allData;
            
            ResBaseDAO cenDao = getResBaseDAO(cenConnName);
            IDataset cenData = cenDao.queryListByCodeCode(tabName, sqlref, param);
            allData.addAll(cenData);
            return allData;
        }

        public static final int qryByCodeAllCrmCount(IData param, String tabName, String sqlref)
            throws Exception
        {
            IDataset listResult = new DatasetList();
            ResBaseDAO resDao = getResBaseDAO(resConnName);
            IDataset resData = resDao.queryListByCodeCode(tabName, sqlref, param);
            listResult.addAll(resData);
            
            ResBaseDAO cenDao = getResBaseDAO(cenConnName);
            IDataset cenData = cenDao.queryListByCodeCode(tabName, sqlref, param);
            if(!listResult.containsAll(cenData))
            listResult.addAll(cenData);

            return listResult.size();
        }

        public static final IDataset qryByCodeParser(String tabName, String sqlref, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryListByCodeCodeParser(tabName, sqlref, param);
            return ids;
        }

        public static final IDataset qryByCodeParser(String tabName, String sqlref, IData param, Pagination page)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryListByCodeCodeParser(tabName, sqlref, param, page);
            return ids;
        }

        public static final IDataset qryByCodeParser(String tabName, String sqlref, IData param, Pagination page, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryListByCodeCodeParser(tabName, sqlref, param, page);
            return ids;
        }

        public static final IDataset qryByCodeParser(String tabName, String sqlref, IData param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryListByCodeCodeParser(tabName, sqlref, param);
            return ids;
        }

        public static final IDataset qryByCodeParserAllCrm(String tabName, String sqlref, IData param, Pagination page, boolean allCrmDb)
            throws Exception
        {
            IDataset allData = new DatasetList();
            ResBaseDAO resDao = getResBaseDAO(resConnName);
            IDataset resData = resDao.queryListByCodeCodeParser(tabName, sqlref, param, page);
            if(null != resData)
            allData.addAll(resData);
            
            if(!allCrmDb)
                return allData;
            
            ResBaseDAO cenDao = getResBaseDAO(cenConnName);
            IDataset cenData = cenDao.queryListByCodeCodeParser(tabName, sqlref, param, page);
            if(null != cenData)
            allData.addAll(cenData);
            return allData;
        }

        public static final IDataset qryByParse(SQLParser parser)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryList(parser);
            return ids;
        }

        public static final IDataset qryByParse(SQLParser parser, Pagination page)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryList(parser, page);
            return ids;
        }

        public static final IDataset qryByParse(SQLParser parser, Pagination page, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryList(parser, page);
            return ids;
        }

        public static final IDataset qryByParse(SQLParser parser, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryList(parser);
            return ids;
        }

        public static final IDataset qryByParseAllCrm(SQLParser parser, boolean allDB)
            throws Exception
        {
            IDataset allData = new DatasetList();
            ResBaseDAO resDao = getResBaseDAO(resConnName);
            IDataset resData = resDao.queryList(parser);
            if(null != resData)
            allData.addAll(resData);
            
            if(!allDB)
                return allData;
            
            ResBaseDAO cenDao = getResBaseDAO(cenConnName);
            IDataset cenData = cenDao.queryList(parser);
            if(null != cenData)
            allData.addAll(cenData);
            return allData;
        }

        public static final IData qryByPK(String tabName, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IData idata = dao.queryByPK(tabName, param);
            return idata;
        }

        public static final IData qryByPK(String tabName, IData data, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IData idata = dao.queryByPK(tabName, data);
            return idata;
        }

        public static final IData qryByPK(String tabName, IData data, String p[])
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IData idata = dao.queryByPK(tabName, data, p);
            return idata;
        }

        public static final IData qryByPK(String tabName, IData data, String p[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IData idata = dao.queryByPK(tabName, data, p);
            return idata;
        }

        public static final IData qryByPK(String s1, String param[])
            throws Exception
        {
            return null;
        }

        public static final IData qryByPK(String tabName, String keys[], String values[])
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IData idata = dao.queryByPK(tabName, keys, values);
            return idata;
        }

        public static final IData qryByPK(String tabName, String keys[], String values[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IData idata = dao.queryByPK(tabName, keys, values);
            return idata;
        }

        public static final boolean qryByRecordCount(String tabName, String sqlref, IData param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset list = dao.queryListByCodeCodeParser(tabName, sqlref, param);
            boolean bResult = false;
            if("TD_S_CPARAM".equals(tabName))
                bResult = list.getData(0).getInt("RECORDCOUNT") > 0;
            else
                bResult = list.size() > 0;
            list = null;
            return bResult;
        }

        public static final IDataset qryBySql(StringBuilder sql, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryList(sql.toString(), param);
            return ids;
        }

        public static final IDataset qryBySql(StringBuilder sql, IData param, Pagination page)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            IDataset ids = dao.queryList(sql.toString(), param, page);
            return ids;
        }

        public static final IDataset qryBySql(StringBuilder sql, IData param, Pagination page, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = page != null ? dao.queryList(sql.toString(), param, page) : dao.queryList(sql.toString(), param);
            return ids;
        }

        public static final IDataset qryBySql(StringBuilder sql, IData param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryList(sql.toString(), param);
            return ids;
        }
        
        public static final IDataset qryBySql(StringBuilder sql, Object[] objList, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            IDataset ids = dao.queryList(sql.toString(), objList);
            return ids;
        }

        public static final boolean save(String tabName, IData param)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            boolean result = dao.save(tabName, param);
            return result;
        }

        public static final boolean save(String tabName, IData param, String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.save(tabName, param);
        }

        public static final boolean save(String tabName, IData param, String keys[])
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.save(tabName, param, keys);
        }

        public static final boolean save(String tabName, IData param, String keys[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            return dao.save(tabName, param, keys);
        }

        public static final boolean save(String tabName, IData param, String keys[], String values[])
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            return dao.save(tabName, param, keys, values);
        }

        public static final boolean update(String tabName, IData idata)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            boolean result = dao.update(tabName, idata);
            return result;
        }

        public static final boolean update(String tabName, IData idata, String keys[])
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            boolean result = dao.update(tabName, idata, keys);
            return result;
        }

        public static final boolean update(String tabName, IData idata, String keys[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            boolean result = dao.update(tabName, idata, keys);
            return result;
        }

        public static final boolean update(String tabName, IData idata, String keys[], String values[])
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(null);
            boolean result = dao.update(tabName, idata, keys, values);
            return result;
        }

        public static final boolean update(String tabName, IData idata, String keys[], String values[], String ConnName)
            throws Exception
        {
            ResBaseDAO dao = getResBaseDAO(ConnName);
            boolean result = dao.update(tabName, idata, keys, values);
            return result;
        }
        
        public static final BizVisit getVisit()
            throws Exception
        {
            return ResBaseDAO.getVisit();
        }
        
        public static final int[] update(String tabName, IDataset dataset, String columns[], String keys[]) throws Exception{
        	ResBaseDAO dao = getResBaseDAO(null);
        	return dao.update(tabName, dataset, columns, keys);
        }
        
        public static final boolean update(String tabName, IData data, String columns[], String keys[],String values[]) throws Exception{
        	ResBaseDAO dao = getResBaseDAO(null);
        	return dao.update(tabName, data, columns, keys,values);
        }
        
        public static final String getSqlByCodeCode(String tableName, String sqlRef) throws Exception{
        	ResBaseDAO dao = getResBaseDAO(null);
        	return dao.getSqlByCodeCode(tableName, sqlRef);
        }
        public static final IDataset queryListByParser(String sql, IData param,Pagination pagination) throws Exception{
        	ResBaseDAO dao = getResBaseDAO(null);
        	String[] sqlArr = sql.split("\n");
        	SQLParser parser = new SQLParser(param);
        	for(int i=0;i<sqlArr.length;i++){
        		parser.addSQL(sqlArr[i]);
        	}        	
        	return dao.queryList(parser, pagination);
        }
	
}
