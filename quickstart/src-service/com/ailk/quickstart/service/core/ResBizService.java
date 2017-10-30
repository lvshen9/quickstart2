package com.ailk.quickstart.service.core;

import javax.xml.crypto.Data;

import org.apache.log4j.Logger;

import com.ailk.biz.BizVisit;
import com.ailk.biz.service.BizService;
import com.ailk.bizservice.base.ResBizIntercept;
import com.ailk.bizservice.exception.CSAppException;
import com.ailk.common.data.IData;
import com.ailk.org.apache.commons.lang3.StringUtils;
import com.ailk.quickstart.common.exception.ResException;
import com.ailk.quickstart.common.util.StringUtil;



public class ResBizService extends BizService {

	protected static Logger log = Logger.getLogger(ResBizService.class);

	@Override
	public final void initialize(IData input) throws Exception {
		super.initialize(input);

		// 设置拦截器
		setIntercept();
	}

	public void setIntercept() throws Exception {
		setMethodIntercept(ResBizIntercept.class.getName());
	}

	/**
	 * 参数是否传入
	 * 
	 * @param params
	 * @throws Exception
	 */
	public void checkInParamIsNotKey(IData params) throws Exception {

		BizVisit visit = this.getVisit();

		params.put("USER_EPARCHY_CODE", params.getString("USER_EPARCHY_CODE"));// 用户归属地州
		params.put("TRADE_EPARCHY_CODE", params.getString("TRADE_EPARCHY_CODE"));// 交易地州
		params.put("TRADE_CITY_CODE", visit.getCityCode());
		params.put("TRADE_DEPART_ID", visit.getDepartId());
		params.put("TRADE_STAFF_ID", visit.getStaffId());
		params.put("IN_MODE_CODE", visit.getInModeCode());
		String userEparchyCode = params.getString("USER_EPARCHY_CODE");
		if (StringUtil.isNull(userEparchyCode)) {// 外围还是传ROUTE_EPARCHY_CODE
			params.put(
					"USER_EPARCHY_CODE",
					params.getString(com.ailk.bizcommon.base.Route.ROUTE_EPARCHY_CODE));
		}
		/*** 校验还是保留，怕没取到 ***/
		userEparchyCode = getValueByParams(params, "USER_EPARCHY_CODE");
		String tradeEparchyCode = getValueByParams(params, "TRADE_EPARCHY_CODE");
		String tradeCityCode = getValueByParams(params, "TRADE_CITY_CODE");
		String tradeDepartId = getValueByParams(params, "TRADE_DEPART_ID");
		String tradeStaffId = getValueByParams(params, "TRADE_STAFF_ID");
		String inModeCode = getValueByParams(params, "IN_MODE_CODE");
	}
	
	/**
	 * 作用：判断资源必传参数是否传入(能力开放平台接入)
	 * @param params
	 * @param key
	 * @throws Exception
	 */
	public void checkInParamIsNotKeyINTF(IData params) throws Exception{
		getValueByParams(params, "TRADE_EPARCHY_CODE");
		getValueByParams(params, "TRADE_CITY_CODE");
		getValueByParams(params, "TRADE_DEPART_ID");
		getValueByParams(params, "TRADE_STAFF_ID");
		getValueByParams(params, "IN_MODE_CODE");
	}
	
	/**
	 * 作用：获取值，空返回错误
	 * @param params
	 * @param key
	 * @return
	 * @throws Exception
	 */
	public String getValueByParams(IData params, String key) throws Exception{
		String value = params.getString(key, "");
		
		if(StringUtils.isBlank(value)) 
			CSAppException.apperr(ResException.RES_COMMON_9000, key);  //参数不能为空
		
		return value;
	}

}
