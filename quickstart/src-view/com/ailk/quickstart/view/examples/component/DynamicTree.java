package com.ailk.quickstart.view.examples.component;


import org.apache.tapestry.IRequestCycle;

import com.ailk.biz.view.BizPage;
import com.ailk.common.data.IData;
import com.ailk.common.data.IDataOutput;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DataMap;
import com.ailk.common.data.impl.DatasetList;
import com.ailk.service.client.ServiceFactory;
import com.ailk.web.BaseContext;
import com.ailk.web.view.component.tree.TreeFactory;
import com.ailk.web.view.component.tree.TreeParam;



public abstract class DynamicTree extends BizPage {
	
	/** 定义节点的参数配置对象 */
	//public abstract TreeParam getParam();
	//public abstract void setParam(TreeParam param);
	
	/**
	 * 简单动态树（按区域展开下级区域）
	 * 动态载入树节点方法，每点一次树节点，执行一次该方法
	 * @param cycle
	 * @throws Exception
	 */
	public void loadSimpleTree(IRequestCycle cycle) throws Exception {	
		BaseContext ctx=getContext();

		/** 定义节点参数 */
		TreeParam param=TreeParam.getTreeParam(cycle);
		
		IData input=new DataMap();
		/** 判断是否有节点，没次点击节点时，会将treeId的值赋给parent_id */
		
		String parent_id=param.getParentNodeId();
		
		/** 若没有上级节点，表示第一次载入，此时初始根节点 */
		if (parent_id == null) {			
			IData root = new DataMap();
			String root_id = "HNAN";
			
			root.put("AREA_CODE", root_id);
			root.put("AREA_TEXT", "全省");		
			
			input.put("AREA_CODE", root_id);
			
			IDataOutput output=ServiceFactory.call("QCS_QueryAreasByParent", createDataInput(input));
		
			/** 根据root_id获取子节点数量 */
			root.put("NODE_COUNT", String.valueOf(output.getData().size()));
			
			ctx.setAjax(TreeFactory.buildTreeData(param, new DatasetList(root),"AREA_CODE","AREA_TEXT","NODE_COUNT"));			
		} else {
			
			input.put("AREA_CODE",parent_id);

			IDataOutput output=ServiceFactory.call("QCS_QueryAreasByParent", createDataInput(input));
			
			IDataset ds=output.getData();

			
			/** 根据上级节点获取节点数据，节点需要包含子节点数量 */
			ctx.setAjax(TreeFactory.buildTreeData(param, ds, "AREA_CODE","AREA_TEXT","NODE_COUNT",true));		
		}	
	}
	
	/**
	 * 复杂动态树（部门类型-部门展开部门）
	 * 动态载入树节点方法，没点一次树节点，执行一次该方法
	 * @param cycle
	 * @throws Exception
	 */
	public void loadAdvancedTree(IRequestCycle cycle) throws Exception {		
		/** 定义节点参数，由于存在类型、部门两种类型的树，故param需要分开写 */
		/** 定义节点参数 */
		TreeParam param=TreeParam.getTreeParam(cycle);
		
		String parent_id = param.getParentNodeId();	
		
		IData input=new DataMap();
		
		/** 若没有上级节点，表示第一次载入，此时初始根节点 */
		if (parent_id == null) {
			IData root = new DataMap();			
			root.put("DEPART_KIND_CODE", "ALL_DEPT");
			root.put("DEPART_KIND", "所有类型");
			/** 部门类型数据肯定有，所以不用再去数据库查询是否有部门类型，而是直接将节点写1或更大的值表示有节点 */
			root.put("NODE_COUNT", "1");

			getContext().setAjax(TreeFactory.buildTreeData(param, new DatasetList(root),"DEPART_KIND_CODE","DEPART_KIND","DEPART_KIND_CODE","NODE_COUNT",null,"root", false));		
			
		} else {
			String group = param.getParentGroupId();
			
			/** 若获取的组为root表示是从根节点展开的，此时按获取所有的部门类型 */
			if ("root".equals(group)) {
				
				input.put("EPARCHY_CODE", "0731");
				
				IDataOutput output=ServiceFactory.call("QCS_QueryDepartKindsByEparchy", createDataInput(input));
				
				IDataset ds=output.getData();
				
				context.setAjax(TreeFactory.buildTreeData(param, ds,"DEPART_KIND_CODE","DEPART_KIND","DEPART_KIND_CODE","NODE_COUNT",null,"deptkind", false));		
				
				
			} else if("deptkind".equals(group)){
				/** 按传递过来的部门标识展开下级部门 */
				input.put("DEPART_ID", "00000");
				
				IDataOutput output=ServiceFactory.call("QCS_QueryDepartsByParent", createDataInput(input));
				
				IDataset ds=output.getData();
				
				context.setAjax(TreeFactory.buildTreeData(param, ds,"DEPART_ID","DEPART_TEXT","NODE_COUNT"));	
				
			}else{

				/** 按传递过来的部门标识展开下级部门 */
				
				input.put("DEPART_ID", parent_id);
				
				IDataOutput output=ServiceFactory.call("QCS_QueryDepartsByParent", createDataInput(input));
				
				IDataset ds=output.getData();
				
				context.setAjax(TreeFactory.buildTreeData(param, ds,"DEPART_ID","DEPART_TEXT","NODE_COUNT"));		
			}
		}
	}
}