package com.ailk.quickstart.view.examples.component;

import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DatasetList;

public abstract class FormElement extends BizPage {
	
	public void init(IRequestCycle cycle){
		
	}
	
	public void loadMenu(IRequestCycle cycle) throws Exception{
		IDataset menus = new DatasetList();
		setAjax(menus);
	}
}