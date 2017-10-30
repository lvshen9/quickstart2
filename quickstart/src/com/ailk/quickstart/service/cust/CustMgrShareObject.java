/*
 * Copyright: Copyright (c) 2014 Asiainfo-Linkage
 * http://www.wadecn.com/
 * WADE4.0
 */
package com.ailk.quickstart.service.cust;

import java.util.HashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import com.ailk.common.data.IData;
import com.ailk.service.session.app.ISessionShareObject;

/**
 * APP线程全局共享对象
 * 
 * @className: CustMgrShareObject.java
 * @author: liaosheng
 * @date: 2014-6-7
 */
public class CustMgrShareObject implements ISessionShareObject {
	
	private static final transient Logger log = Logger.getLogger(CustMgrShareObject.class);
	
	private Map<String, String> share = new HashMap<String, String>();
	
	/**
	 * 测试方法
	 */
	public void test(String key, IData data) {
		share.put(key, data.getString("CUST_CACHE_KEY", ""));
	}
	
	
	/**
	 * ShareObject对象必须定义的clean方法，不能有入参
	 */
	public void clean() {
		if (log.isDebugEnabled()) {
			log.debug("清空CustMgrShareObject对象");
		}
		share = null;
	}

}
