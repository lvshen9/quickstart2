package com.ailk.quickstart.bean.core;

import org.apache.log4j.Logger;

import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DataMap;
import com.ailk.common.data.impl.Pagination;


public class ResParaDao {

	public static final Logger log = Logger.getLogger(ResParaDao.class);

    public static IDataset getValueCardIdleByPK(IData param)throws Exception{
		IData tempData = new DataMap();
		tempData.put("EPARCHY_CODE", param.getString("EPARCHY_CODE"));
		tempData.put("PARA_ATTR", param.getString("PARA_ATTR"));
		tempData.put("PARA_CODE1", param.getString("PARA_CODE1"));
		tempData.put("PARA_CODE2", param.getString("PARA_CODE2"));
		
		IDataset qryList = ResDao.qryByCode("TD_M_RES_PARA", "SEL_BY_PK", tempData);
		return qryList;
	}
    
    /**
     * 根据关键字段查询
     * @param Keys
     * @param values
     * @return
     * @throws Exception
     */
    public static IData qryKindByKeys(String[] keys, String[] values) throws Exception{
    	return ResDao.qryByPK("TD_M_RES_PARA", keys, values);
    }
    
    /**
	 * 根据sqlRef查询
	 * @param param
	 * @param sqlRef
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryResCommParamByCode(IData param, String sqlRef) throws Exception{
		String parsertype = "false";
		parsertype = param.getString("PARSER_TYPE", "false");
		if ("true".equals(parsertype)) {
			return ResDao.qryByCodeParser("TD_M_RES_PARA", sqlRef, param);
		} else {
			return ResDao.qryByCode("TD_M_RES_PARA", sqlRef, param);
		}
	}
    
    public static IDataset getParaInfo(IData param)throws Exception{
		IData tempData = new DataMap();
		tempData.put("EPARCHY_CODE", param.getString("EPARCHY_CODE"));
		tempData.put("PARA_ATTR", param.getString("PARA_ATTR"));
		tempData.put("PARA_CODE1", param.getString("PARA_CODE1"));
		tempData.put("PARA_CODE2", param.getString("PARA_CODE2"));
		
		IDataset qryList = ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_BY_PK", tempData);
		return qryList;
	}
    
    public static IDataset getFeeRule1032(IData param)throws Exception{
		
		IDataset qryList = ResDao.qryByCode("TD_M_RES_PARA", "SEL_PARA_BY_1032", param);
		return qryList;
	}
    
  public static IDataset getFeeTypeCode(IData param)throws Exception{
		
		IDataset qryList = ResDao.qryByCode("TD_B_FEECODETYPE", "SEL_BY_EPARCHY_CODE", param);
		return qryList;
	}
    public static IDataset getFeeRule1032ByPara(IData param)throws Exception{
		
		IDataset qryList = ResDao.qryByCode("TD_M_RES_PARA", "SEL_PARA_BY_1032_RULE", param);
		return qryList;
	}
    
    
    /**
     * 查询大屏幕选号参数
     * @param param
     * @return
     * @throws Exception
     */
    public static IDataset getTempOccupyParam(IData param)throws Exception{
		
		IDataset qryList = ResDao.qryByCode("TD_M_RES_PARA", "SEL_INFOS_BY_OCCUPY", param);
		return qryList;
	}
    /**
	 * 根据资源类型来确定部门调拨路径
	 * 
	 * @param eparchyCode
	 * @param resTypeCode
	 * @return String
	 * @throws Exception
	 */
	public static String getAssignResTypeCode(String eparchyCode, String resTypeCode)
			throws Exception {
		IData param = new DataMap();
		param.put("EPARCHY_CODE", eparchyCode);
		param.put("PARA_CODE1", resTypeCode);
		IDataset dataset = ResDao.qryByCode("TD_M_RES_PARA", "SEL_PARA_BY_EPARCHYCODE", param);
		return dataset.size() > 0 ? ((IData) dataset.get(0)).getString("PARA_CODE2") : resTypeCode;
	}

	public static IDataset getOperType(IData param) throws Exception {
		return ResDao.qryByCode("TD_M_RES_PARA", "SEL_BY_OPERTYPE", param);
	}
	
	public static IDataset getResInfoByCode12(IData param) throws Exception {
		return ResDao.qryByCode("TD_M_RES_PARA", "SEL_INFOS_BY_CODE1_2", param);
	}
	
	/**
	 *  校验一卡多号的入库号码信息是否已经存在
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static boolean  checkOneCardManyNumExist(IData  param)throws Exception {

		IDataset  dataset = ResDao.qryByCode("TD_M_RES_PARA", "CHECK_ONECARDMANY_EXIST", param);
		if(dataset == null||dataset.size()<=0){
			return false ;
		}else{
			return true;
		}
	}
	
	/**
	 * @author yangqf
	* description：国漫一卡多号资源入库
	* @param table
	* @param dataset
	* @return
	* @throws Exception
	 */
	public static int instockOneCardManyNum(IDataset dataset) throws Exception
	{
		return ResDao.executeBatchByCodeCode("TD_M_RES_PARA", "INS_ONECARD_MANYNUM", dataset).length;
	}
	/**
	 * @author yangqf
	* description：国漫一卡多号资源查询
	* @param table
	* @param dataset
	* @return
	* @throws Exception
	 */
	public static IDataset queryOneCardManyNum(IData param,Pagination page) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_ONENUMBER_BY_NUM", param,page);
	}
	
	/**
	 * @author yangqf
	* description：获取号费配置
	* @param eparchyCode
	* @param serialNumber
	* @return
	* @throws Exception
	 */
	public static IData getFeeCodeRule(String eparchyCode,String serialNumber) throws Exception {
		
		IData param = new DataMap();
		param.put("EPARCHY_CODE", eparchyCode);
		param.put("MPHONE_CODE", serialNumber);

		IDataset resultList = getFeeRule1032ByPara(param);
		return resultList != null && resultList.size() > 0 ? resultList.getData(0) : null;
	}
	
	/**
	 * @author yangqf
	* description：国漫一卡多号资源查询
	* @param table
	* @param dataset
	* @return
	* @throws Exception
	 */
	public static IDataset getMaxQueryMphoneNum(IData param) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_BY_ATTRCODE1", param);
	}
	/**
	 * 品牌参数维护
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryBrandRuleMaintain(IData data,
			Pagination pagination) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_PARA_BY_1001", data,pagination);
	}
	
	/**
	 * 号尾规则维护
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static IDataset querySpecialEndFeeRule(IData data,
			Pagination pagination) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_RULE_BY_CODE", data,pagination);
	}
	
	
	/**
	 * 号尾规则是否存在
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static IDataset querySpecialEndFeeRuleExits(IData data
			) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_RULE_BY_CODE", data);
	}
	
	
	/**
	 * 号尾规则新增
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static boolean insertSpecialEndFeeRule(IData data
			) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.insert("TD_M_RES_PARA", data);
	}
	
	
	/**
	 * 号尾规则修改
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static int updSpecialEndFeeRule(IData data
			) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.executeUpdateByCodeCode("TD_M_RES_PARA","UPD_ENDRULE_BY_ATTR" ,data);
	}
	
	
	/**
	 * 号尾规则删除
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static int[] delSpecialEndFeeRule(IDataset datas
			) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.executeBatchByCodeCode("TD_M_RES_PARA", "DEL_AREA_BY_ATTR", datas) ;
	}
	
	/**
	 * 品牌参数维护新增
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static int insBrandRuleMaintain(IData data) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.executeUpdateByCodeCode("TD_M_RES_PARA", "INS_AREA_BY_ATTR", data);
	}
	
	
	/**
	 * 品牌参数维护新增
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static int insStoragePrecent(IData data) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.executeUpdateByCodeCode("TD_M_RES_PARA", "INS_BY_NOTEXISTS_1034", data);
	}
	
	
	public static boolean updStoragePrecent(IData data) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.update("TD_M_RES_PARA", data, new String[]{"PARA_VALUE1","PARA_VALUE10","REMARK","UPDATE_STAFF_ID","UPDATE_DEPART_ID"}, 
				new String[]{"EPARCHY_CODE","PARA_ATTR","PARA_CODE1","PARA_CODE2"}, 
				new String[]{data.getString("EPARCHY_CODE"),data.getString("PARA_ATTR"),data.getString("PARA_CODE1"),data.getString("PARA_CODE2")
				})
		 ;
	}
	
	public static int[] delStoragePrecent(IDataset params) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.delete("TD_M_RES_PARA", params, new String[]{"EPARCHY_CODE","PARA_ATTR","PARA_CODE1","PARA_CODE2"}, ResDao.resConnName);
		
	}
	
	/**
	 * 品牌参数修改
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static int updBrandRuleMaintain(IData data) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.executeUpdateByCodeCode("TD_M_RES_PARA", "UPD_AREA_BY_ATTR", data);
	}
	
	/**
	 * 品牌参数删除
	 * @param data
	 * @param pagination
	 * @return
	 * @throws Exception
	 */
	public static int[] delBrandRuleMaintain(IDataset datas) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.executeBatchByCodeCode("TD_M_RES_PARA", "DEL_AREA_BY_ATTR", datas);
	}

	/**
	 * 通用参数查询
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryResCommon(IData param, Pagination pagination) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_RES_PARA", param, pagination);
	}
	
	/**
	 * 更新待查询资源内容
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryResCommonInfo(IData param) throws Exception {
		IDataset dataset = ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_RES_PARA_BY_ROWID", param);
		return dataset;
	}
	
	
	/**
	 * 查询资源参数根据PARA_CODE1，2
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryResCommonByCode12(IData param) throws Exception {
		IDataset dataset = ResDao.qryByCode("TD_M_RES_PARA", "SEL_INFOS_BY_CODE1_2", param);
		return dataset;
	}
	/**
	 * 资源通用更新
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static int updateCommonParam(IDataset params) throws Exception {
		return ResDao.update("TD_M_RES_PARA", params, new String[]{"PARA_NAME", "VALID_TAG", "UPDATE_STAFF_ID", "UPDATE_DEPART_ID", "UPDATE_TIME", "REMARK"}, new String[]{"ROWID"}).length;
	}
	
	/**
	 * 删除业务类型参数
	 * @param dataset
	 * @return
	 * @throws Exception
	 */
	public static int deleteResCommonParam(IDataset params) throws Exception {
		return ResDao.update("TD_M_RES_PARA", params, new String[]{"VALID_TAG", "UPDATE_STAFF_ID", "UPDATE_DEPART_ID", "UPDATE_TIME"}, new String[]{"ROWID"}).length;
	}
	
	/**
	 * 校验是否存在
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset checkExists(IData param) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_RES_PARA_EXIST", param);
	}
	
	/**
	 * 资源通用新增
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static int addCommonParam(IData param) throws Exception {
		int resultSubmit = ResDao.executeUpdateByCodeCode("TD_M_RES_PARA", "INS_RES_PARA", param);
		return resultSubmit;
	}

	/**
	 * 获取 部门等级列表
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static IDataset getDepartLevel(IData params) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_DEPART_LEVEL", params);
	}
	
	public static IDataset getCardDiscardReason(IData params) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_DISCARD_REASON", params);
	}
	
	public static IDataset getLockType(IData params) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_VALUECARD_LOCKTYPE", params);
	}
	
	// 获取有价卡面值参数
	public static IDataset getDealReason(String value) throws Exception
	{
		IData data = new DataMap();
		data.put("DEAL_REASON", value);
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "GET_DEAL_REASON", data);
	}
	
	public static IDataset queryResParaByAttrCode1(String paraAttr,String paraCode1)throws Exception{
	    IData param = new DataMap();
	    param.put("PARA_ATTR", paraAttr);
	    param.put("PARA_CODE1", paraCode1);
	    param.put("EPARCHY_CODE", ResDao.getVisit().getStaffEparchyCode());
	    IDataset dsValuecard =  ResDao.qryByCode("TD_M_RES_PARA", "SEL_BY_ATTRCODE1", param);
	    return dsValuecard;
	}
	
	/**
	 * 获取市公司列表
	 * @param params
	 * @return
	 * @throws Exception 
	 */
	public static IDataset getCityCorp(IData params) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_CITY_CORP", params);
	}
	
	/**
	 * 获取省公司列表
	 * @param params
	 * @return
	 * @throws Exception 
	 */
	public static IDataset getProvCorp(IData params) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_PROV_CORP", params);
	}	
	
	/**@author uuyl
	 * 费号维泽维护产品信息查询
	 * @param params
	 * @return
	 * @throws Exception
	 */
	public static IDataset getProductInfos(IData param) throws Exception {
		return ResDao.qryByCode("NormalPara", "td_b_product", param);
	}
	/**
	 * @author yangqf
	* description：获取通用参数表相关信息(返回单条)
	* @param eparchyCode
	* @param iParaAtrr
	* @param paraCode1
	* @param paraCode2
	* @return
	* @throws Exception
	 */
	public static IData getCommAssignParaSingleInfo(String eparchyCode,int iParaAtrr,String paraCode1,String paraCode2) throws Exception {
		
		IData param = new DataMap();
		param.put("EPARCHY_CODE", eparchyCode);
		param.put("PARA_ATTR", iParaAtrr);
		param.put("PARA_CODE1", paraCode1);
		param.put("PARA_CODE2", paraCode2);
		param.put("PARA_VALUE1", "");
		IDataset resultList = ResDao.qryByCode("TD_M_RES_PARA", "SEL_BY_GET_COMMPARA", param);
		return resultList != null && resultList.size() > 0 ? resultList.getData(0) : null;
	}
	
	/**
	 *  获取选占配置时间
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static int  getOccupyTime(String eparchyCode)throws Exception {
		IData param = new DataMap();
		param.put("EPARCHY_CODE", eparchyCode);
		IDataset  dataset = ResDao.qryByCode("TD_M_RES_PARA", "SEL_TIME_BY_OCCUPY", param);
		if(dataset == null||dataset.size()<=0){
			return 30 ;
		}else{
			return dataset.getData(0).getInt("PARA_CODE2");
		}
		
	}
	
	
	
	public static IDataset queryCommparaByGet(IData data
			) throws Exception {
		// TODO Auto-generated method stub
		return ResDao.qryByCode("TD_M_RES_PARA", "SEL_BY_GET_COMMPARA", data);
	}
	
	/**
	 * 接口查询返回查询列表
	 * @param params
	 * @return
	 * @throws Exception 
	 */
	public static IDataset getParaValue(IData params) throws Exception {
		return ResDao.qryByCodeParser("TD_M_RES_PARA","SEL_RES_PARA_VALUE", params);
	}
	
	
	/**
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryPhoneStoragePrecentByArea(IData param,Pagination pagination) throws Exception {
		IDataset dataset = ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_INFOS_BY_1034", param,pagination);
		return dataset;
	}
	
	/**
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryPhoneStoragePrecentByAgent(IData param,Pagination pagination) throws Exception {
		IDataset dataset = ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_INFOS_BY_1035_AGENT", param,pagination);
		return dataset;
	}
	
	/**
	 * 
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset queryPhoneStoragePrecentByStock(IData param,Pagination pagination) throws Exception {
		IDataset dataset = ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_INFOS_BY_1035_STOCK", param,pagination);
		return dataset;
	}
	
	/**
	 * 获取VC平台配置信息
	 * @param paraCode2
	 * @return
	 * @throws Exception
	 */
	public static String getVcConfigParaInfo(String paraCode2)throws Exception{
		IData data = new DataMap();
		data.put("EPARCHY_CODE", "ZZZZ");
		data.put("PARA_ATTR", "444");
		data.put("VALID_TAG", "0");
		data.put("PARA_CODE2", paraCode2);
		Object paraInfo = ResDao.qryByCodeParser("TD_M_RES_PARA","SEL_VCCONFIG_INFO", data).get(0,"PARA_VALUE6");
		if(null != paraInfo)
			return paraInfo.toString();
		return "";	
	}
	
	/**
	 * 获取参数信息
	 * @param param
	 * @return
	 * @throws Exception
	 */
	public static IDataset getResPara (IData param) throws Exception {
		IDataset dataset = ResDao.qryByCodeParser("TD_M_RES_PARA", "SEL_BY_COND", param);
		return dataset;	
	}
	
	/**
	 * 获取延期配置参数
	 * @param data
	 * @return
	 * @throws Exception
	 */
	public static IDataset getConfigDelayTime(IData data)throws Exception{
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "GET_DELAYCONFIG_INFO", data);
	}
	
	public static IDataset calConfigDelayTime(IData data)throws Exception{
		return ResDao.qryByCodeParser("TD_M_RES_PARA", "CAL_DELAYCONFIG_INFO", data);
	}
	
		public static void updateOrderLimit(IData data)throws Exception{
		ResDao.update("TD_M_RES_PARA", data,new String[]{"PARA_VALUE1"}, new String[]{"EPARCHY_CODE","PARA_ATTR","PARA_CODE1","PARA_CODE2"},new String[]{data.getString("EPARCHY_CODE"),data.getString("PARA_ATTR"),data.getString("PARA_CODE1"),data.getString("PARA_CODE2")});
	}
	
}
