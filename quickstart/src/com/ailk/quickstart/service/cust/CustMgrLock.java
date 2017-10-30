/*
 * Copyright: Copyright (c) 2014 Asiainfo-Linkage
 * http://www.wadecn.com/
 * WADE4.0
 */
package com.ailk.quickstart.service.cust;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

import org.apache.log4j.Logger;

import com.ailk.common.data.IData;

/**
 * 会话全局锁
 * 
 * @className: CustMgrLock.java
 * @author: liaosheng
 * @date: 2014-6-7
 */
public class CustMgrLock {
	private static final transient Logger log = Logger.getLogger(CustMgrLock.class);
	
	//存放锁对象，若需要控制锁的顺序，可以用LinkedHashMap
	private Map<String, String> lock = new HashMap<String, String>();
	
	/**
	 * Lock对象必须定义的lock方法，入参可自由定义
	 * @param lockName
	 * @param param
	 */
	public boolean lock(String lockName, IData param) {
		lock.put(lockName, param.getString(lockName, ""));
		return true;
	}
	
	/**
	 * Lock对象必须定义的unlock方法，入参可自由定义
	 * @param lockName
	 * @param param
	 */
	public void unlock(String lockName) {
		lock.remove(lockName);
	}
	
	/**
	 * Lock对象必须定义的clean方法，不能有入参
	 */
	public void clean() {
		if (log.isDebugEnabled()) {
			log.debug("清空CustMgrLock的锁对象");
		}
		
		Iterator<String> iter = lock.keySet().iterator();
		while (iter.hasNext()) {
			unlock(iter.next());
		}
	}
}
