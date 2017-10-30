package com.ailk.quickstart.view.core;

import org.apache.log4j.Logger;
import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.BizVisit;
import com.ailk.biz.view.BizPage;
import com.ailk.bizcommon.priv.StaffPrivUtil;
import com.ailk.bizview.base.CSViewCall;
import com.ailk.bizview.exception.CSViewException;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DataMap;
import com.ailk.privm.CheckPriv;
import com.ailk.quickstart.common.exception.ResException;
import com.ailk.quickstart.common.util.StringUtil;



/**
 * 权限相关的类
 * @author lvshen
 *
 */
public abstract class ResBizPage extends BizPage {

	private static Logger logger = Logger.getLogger(ResBizPage.class);

	public static final String msgKey = "MSG";
	public static final String msgTypeKey = "MSG_TYPE";
	public static final String msgSuc = "S";
	public static final String msgWarn = "W";
	public static final String msgError = "E";
	public static final char PROVINCE_LEVEL_OF_DATA_RIGHT = '5';
	public static final char EPARCHY_LEVEL_OF_DATA_RIGHT = '4';
	public static final char AREA_LEVEL_OF_DATA_RIGHT = '3';
	public static final char REGION_LEVEL_OF_DATA_RIGHT = 'R';
	public static final char DEPART_LEVEL_OF_DATA_RIGHT = '2';
	public static final char STAFF_LEVEL_OF_DATA_RIGHT = '1';
	public static final char OTHER_LEVEL_OF_DATA_RIGHT = '@';

	public abstract void setRight(IData right);

	public abstract IData getRight();

	protected void setAjaxMsg(String msgType, String msgContent) {

		DataMap ajax = new DataMap();
		ajax.put(msgKey, msgContent);
		ajax.put(msgTypeKey, msgType);

		setAjax(ajax);

	}

	protected void setAjaxMsg(String msgContent) {
		IData ajax = new DataMap();
		ajax.put(msgKey, msgContent);
		ajax.put(msgTypeKey, msgSuc);
		setAjax(ajax);
	}

	protected void setAjaxMsgHasPrint(String msgContent, String printPage,
			String printPart, String printListener, String params) {
		IData ajax = new DataMap();
		ajax.put(msgKey, msgContent);
		ajax.put(msgTypeKey, msgSuc);
		ajax.put("PRINT_PAGE", printPage);
		ajax.put("PRINT_PART", printPart);
		ajax.put("PRINT_LISTENER", printListener);
		ajax.put("PARAM", params);
		setAjax(ajax);

	}

	/**
	 * 权限查询
	 * 
	 * @param resTypeCode
	 * @param dataRoleCode
	 * @return
	 * @throws Exception 
	 */
	public IData getRight(String resTypeCode, String dataRoleCode) throws Exception {
		initRight(resTypeCode, dataRoleCode);
		return getRight();
	}

	protected void initRight(String resTypeCode, String dataRoleCode) throws Exception {
		BizVisit visit = getVisit();// 相当于一个session

		if (visit == null) {
			return;
		}

		char dataRightLevel = getDataRightLevel(dataRoleCode);
		IDataset output = null;
		IData stockInfo = null;
		String rightEparchyCode = null;
		String rightStockId = null;
		String rightStockName = null;
		String rightParentStockId = null;
		String rightParentStockName = null;
		String departId = visit.getDepartId(); // 获取员工id
		String tradeEparchyCode = getVisit().getStaffEparchyCode();

		IData param = new DataMap();
		param.put("DEPART_ID", departId);
		param.put("RES_TYPE_CODE", resTypeCode);
		param.put("EPARCHY_CODE", tradeEparchyCode);

		IData parentRet = CSViewCall.call(this,
				"RM.StockOrgUtilSvc.queryParentOfDepart", param).getData(0);
		if (parentRet == null) {
			CSViewException.apperr(ResException.RES_COMMON_9046, departId);
		}

		String bossOrgCode;
		String cityCode;
		switch (dataRightLevel) {
		case PROVINCE_LEVEL_OF_DATA_RIGHT:
			bossOrgCode = visit.getProvinceCode();
			rightEparchyCode = visit.getProvinceCode();
			rightStockId = "00001";

			param.clear();
			param.put("RES_TYPE_CODE", resTypeCode);
			param.put("STOCK_ID", rightStockId);

			output = CSViewCall.call(this, "RM.StockOrgUtilSvc.getStockInfo",
					param);
			stockInfo = output.getData(0) == null ? new DataMap() : output
					.getData(0);
			rightStockName = "[" + stockInfo.getString("STOCK_CODE") + "|"
					+ stockInfo.getString("STOCK_NAME") + "]";
			cityCode = visit.getProvinceCode();
			break;
		case EPARCHY_LEVEL_OF_DATA_RIGHT:
			bossOrgCode = tradeEparchyCode;
			rightEparchyCode = tradeEparchyCode;
			rightStockId = "Z" + bossOrgCode;

			param.clear();
			param.put("RES_TYPE_CODE", resTypeCode);
			param.put("STOCK_ID", rightStockId);

			output = CSViewCall.call(this, "RM.StockOrgUtilSvc.getStockInfo",
					param);
			stockInfo = output.getData(0) == null ? new DataMap() : output
					.getData(0);

			rightStockName = "[" + stockInfo.getString("STOCK_CODE") + "|"
					+ stockInfo.getString("STOCK_NAME") + "]";
			rightParentStockId = stockInfo.getString("PARENT_STOCK_ID");
			rightParentStockName = "[" + stockInfo.getString("STOCK_CODE")
					+ "|" + stockInfo.getString("STOCK_NAME") + "]";
			cityCode = tradeEparchyCode;
			break;
		case AREA_LEVEL_OF_DATA_RIGHT:
			bossOrgCode = visit.getCityCode();
			rightEparchyCode = tradeEparchyCode;
			rightStockId = "Z" + bossOrgCode;

			param.clear();
			param.put("RES_TYPE_CODE", resTypeCode);
			param.put("STOCK_ID", rightStockId);

			output = CSViewCall.call(this, "RM.StockOrgUtilSvc.getStockInfo",
					param);
			stockInfo = output.getData(0) == null ? new DataMap() : output
					.getData(0);

			rightStockName = "[" + stockInfo.getString("STOCK_CODE") + "|"
					+ stockInfo.getString("STOCK_NAME") + "]";
			rightParentStockId = stockInfo.getString("PARENT_STOCK_ID");
			rightParentStockName = "[" + stockInfo.getString("STOCK_CODE")
					+ "|" + stockInfo.getString("STOCK_NAME") + "]";
			cityCode = visit.getCityCode();
			break;
		case REGION_LEVEL_OF_DATA_RIGHT:
			param.clear();
			param.put("RES_TYPE_CODE", resTypeCode);
			param.put("STAR_STOCK_ID", "Z" + visit.getCityCode());
			param.put("STOCK_ID", visit.getDepartId());

			output = CSViewCall
					.call(this,
							"RM.StockOrgUtilSvc.queryStocksOfParentOnlyOneLevel",
							param);
			IData temp = null;
			bossOrgCode = "";
			cityCode = "";
			for (int i = 0; i < output.size(); i++) {
				temp = output.getData(i);
				if (("Z" + visit.getCityCode()).equals(temp
						.getString("PARENT_STOCK_ID"))) {
					bossOrgCode = temp.getString("STOCK_ID");
					cityCode = temp.getString("CITY_CODE");
					break;
				}
			}
			rightEparchyCode = tradeEparchyCode;
			break;

		case DEPART_LEVEL_OF_DATA_RIGHT:
			bossOrgCode = visit.getDepartId();
			rightEparchyCode = tradeEparchyCode;
			rightStockId = bossOrgCode;

			param.clear();
			param.put("RES_TYPE_CODE", resTypeCode);
			param.put("STOCK_ID", rightStockId);

			output = CSViewCall.call(this, "RM.StockOrgUtilSvc.getStockInfo",
					param);
			stockInfo = output.getData(0) == null ? new DataMap() : output
					.getData(0);

			rightStockName = "[" + stockInfo.getString("STOCK_CODE") + "|"
					+ stockInfo.getString("STOCK_NAME") + "]";
			rightParentStockId = stockInfo.getString("PARENT_STOCK_ID");
			rightParentStockName = "[" + stockInfo.getString("STOCK_CODE")
					+ "|" + stockInfo.getString("STOCK_NAME") + "]";
			cityCode = visit.getCityCode();
			break;
		case STAFF_LEVEL_OF_DATA_RIGHT:
			bossOrgCode = visit.getDepartId();
			rightEparchyCode = tradeEparchyCode;
			rightStockId = bossOrgCode;

			param.clear();
			param.put("RES_TYPE_CODE", resTypeCode);
			param.put("STOCK_ID", rightStockId);
			output = CSViewCall.call(this, "RM.StockOrgUtilSvc.getStockInfo",
					param);
			stockInfo = output.getData(0) == null ? new DataMap() : output
					.getData(0);

			rightStockName = "[" + stockInfo.getString("STOCK_CODE") + "|"
					+ stockInfo.getString("STOCK_NAME") + "]";
			cityCode = visit.getCityCode();
			break;
		default:
			CSViewException.apperr(ResException.RES_COMMON_9041, dataRoleCode);
			return;
		}

		// 日志输出
		if (log.isDebugEnabled()) {
			log.debug("----datarightlevel:----" + dataRightLevel);
			log.debug("------bossOrgCode-----" + bossOrgCode);
			log.debug("------rightEparchyCode---------------"
					+ rightEparchyCode);
			log.debug("------rightStockId-------------------" + rightStockId);
			log.debug("------cityCode-------------------" + cityCode);
		}

		param.clear();
		param.put("RES_TYPE_CODE", resTypeCode);
		param.put("EPARCHY_CODE", rightEparchyCode);
		param.put("PARENT_DEPART_ID", rightParentStockId);
		param.put("DATA_RIGHT_LEVEL", dataRightLevel);
		if (dataRightLevel == STAFF_LEVEL_OF_DATA_RIGHT
				|| dataRightLevel == DEPART_LEVEL_OF_DATA_RIGHT) {
			param.put("DEPART_ID", departId);
		} else {
			param.put("CITY_CODE", cityCode);
		}
		IData relevantStock = CSViewCall.call(this,
				"RM.StockOrgUtilSvc.getRelevantStockOfBossOrg", param).getData(
				0);
		;
		if (relevantStock == null) {
			CSViewException.apperr(ResException.RES_COMMON_9042);
		}

		relevantStock.put("STOCK_IDA", visit.getCityCode());
		relevantStock.put("STOCK_DESCA", "[" + visit.getDepartCode() + "|"
				+ visit.getDepartName() + "]");
		relevantStock.put("FATH_STOCK_IDA", parentRet.getString("DEPART_ID"));
		relevantStock.put(
				"FATH_STOCK_DESCA",
				"[" + parentRet.getString("DEPART_CODE") + "|"
						+ parentRet.getString("DEPART_NAME") + "]");
		relevantStock.put("DATA_RIGHT_LEVEL", String.valueOf(dataRightLevel)); // 数据权限级别
		relevantStock.put("BOSS_ORG_CODE", bossOrgCode); // 关联编码
		relevantStock.put("DATA_CODE", dataRoleCode); // 数据权限编码
		relevantStock.put("RIGHT_EPARCHY_CODE", rightEparchyCode); // 权限地州编码
		relevantStock.put("RIGHT_CITY_CODE", cityCode); // 权限业务区编码
		relevantStock.put("RIGHT_STOCK_ID", rightStockId);
		relevantStock.put("RIGHT_STOCK_NAME", rightStockName);
		relevantStock.put("RIGHT_PARENT_STOCK_ID", rightParentStockId);
		relevantStock.put("RIGHT_PARENT_STOCK_NAME", rightParentStockName);
		relevantStock.put("RES_TYPE_CODE", resTypeCode); // 资源类型编码
		setRight(relevantStock);
	}
	
	public char getDataRightLevel(String dataRoleCode) throws Exception {
		BizVisit visit = getVisit();
		if(StringUtil.isNull(dataRoleCode)){
			CSViewException.apperr(ResException.RES_COMMON_9040);
		}		
		
		String levelStr = StaffPrivUtil.getFieldPrivClass(getVisit().getStaffId(), dataRoleCode);
		if(StringUtil.isNull(levelStr)){
			if (visit.getStaffId().equalsIgnoreCase("SUPERUSR")) {
				levelStr = "5";
			} else {
				return OTHER_LEVEL_OF_DATA_RIGHT;
			}
		}
		return levelStr.charAt(0);
	}
	public void checkResPermission(IRequestCycle cycle)throws Exception{
		IData data = this.getData();
		String resTradeCode = data.getString("RES_TRADE_CODE");
		boolean hasPriv = checkPermissionByResTradeCode(resTradeCode);	
		data.put("HASPRIV", hasPriv);
		this.setAjax(data);
	}
	
	public boolean checkPermissionByResTradeCode(String resTradeCode)throws Exception{
		IData data = new DataMap();
		data.put("EPARCHY_CODE", "ZZZZ");
		data.put("PARA_ATTR", "1002");
		data.put("PARA_CODE1", resTradeCode);
		IDataset paraList = CSViewCall.call(this, "RM.ParaUtilSvc.getResParaByAttrCode1", data);//ResParaDao.getMaxQueryMphoneNum(data);
		if(paraList == null || paraList.size() == 0){
			CSViewException.apperr(ResException.RES_OTHERS_7003,resTradeCode);			
		}
		String privId = paraList.getData(0).getString("PARA_CODE2");
		if(privId == null || "".equals(privId.trim())){
			CSViewException.apperr(ResException.RES_OTHERS_7003,resTradeCode);	
		}
		boolean hasPriv = CheckPriv.checkFuncPermission(this.getVisit().getStaffId(), privId);
		return hasPriv;
	}
}
