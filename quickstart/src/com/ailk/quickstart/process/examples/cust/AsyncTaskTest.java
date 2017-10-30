/**
 * 
 */
package com.ailk.quickstart.process.examples.cust;

import java.util.Map;

import com.ailk.mq.client.consume.AsyncTaskExecutor;

/**
 * @author yifur
 *
 */
public class AsyncTaskTest extends AsyncTaskExecutor {

	@Override
	public void doAsyncTask(String taskId, Map<String, Object> param) {
	
		System.out.println("receive a aysnc task:" + taskId);
		try {
			Thread.sleep(1000 * 10);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("param:" + param);
		
	}

}
