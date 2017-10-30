package com.ailk.quickstart.bean.core;

import java.util.Date;

import com.ailk.org.apache.commons.lang3.StringUtils;

import org.apache.log4j.Logger;

import com.ailk.biz.bean.BizBean;
import com.ailk.biz.util.TimeUtil;
import com.ailk.bizservice.exception.CSAppException;
import com.ailk.common.data.IData;
import com.ailk.org.apache.commons.lang3.time.DateFormatUtils;
import com.ailk.org.apache.commons.lang3.time.DateUtils;
import com.ailk.quickstart.common.exception.ResException;



public class ResBizBean extends BizBean {
	public static final Logger log = Logger.getLogger(ResBizBean.class);	
		
	/**
	 * 作用：根据配置查询选占失效时间
	 *  
	 * @param xGetMode
	 * @return
	 * @throws Exception
	 */
	public String getOccupyTimeByMode(String xGetMode) throws Exception{
		String occupyTime = TimeUtil.getSysTime();
		int config = 30; //分钟 
		
		Date date = DateUtils.parseDate(occupyTime, "yyyy-MM-dd HH:mm:ss");
		Date newDate = new Date(date.getTime() + config * 60 *  1000);  	//d.getTime() + 3 * 24 * 60 * 60 * 1000  3天后日期
		
		String oTime = DateFormatUtils.format(newDate,"yyyy-MM-dd HH:mm:ss");
        return oTime;
	}
	/**
	 * 作用：根据配置查询选占失效时间
	 *  
	 * @param xGetMode
	 * @return
	 * @throws Exception
	 */
	public String getOccupyTimeByMode(String xGetMode,String eparchyCode) throws Exception{
		String occupyTime = TimeUtil.getSysTime();
		int config = 30; //分钟 
		config = ResParaDao.getOccupyTime(eparchyCode);
		

		Date date = DateUtils.parseDate(occupyTime, "yyyy-MM-dd HH:mm:ss");
		Date newDate = new Date(date.getTime() + config * 60 *  1000);  	//d.getTime() + 3 * 24 * 60 * 60 * 1000  3天后日期
		
		String oTime = DateFormatUtils.format(newDate,"yyyy-MM-dd HH:mm:ss");
        return oTime;
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
