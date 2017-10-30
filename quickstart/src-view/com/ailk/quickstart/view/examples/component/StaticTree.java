package com.ailk.quickstart.view.examples.component;

import org.apache.tapestry.IRequestCycle;

import com.ailk.common.data.IData;
import com.ailk.common.data.impl.TreeItem;
import com.ailk.web.BasePage;
import com.ailk.web.view.component.tree.TreeFactory;
import com.ailk.web.view.component.tree.TreeParam;

public abstract class StaticTree extends BasePage {
	
	public void loadTreeData(IRequestCycle cycle) {

		/** 定义树 */
		TreeItem root1 = new TreeItem("root", null, "根目录", null ,true);
		/** 定义根节点 */
		TreeItem node1 = new TreeItem("node", root1, "班级视图", null ,true);
		/** 定义根节点下的子节点1 */
		TreeItem nod_desktop1 = new TreeItem("node_desktop", node1, "班级首页", null,null ,true);
		/** 定义子节点1下的子节点 */
		new TreeItem("nod_desktop_1", nod_desktop1, "精品课程", null,null ,true);
		new TreeItem("nod_desktop_2", nod_desktop1, "奖学金", null,null ,true);
		new TreeItem("nod_desktop_3", nod_desktop1, "电子竞技", null,null ,true);

		/** 定义根节点下的子节点1 */
		TreeItem node_about = new TreeItem("node_about", node1, "班级概况", null,null ,true);
		/** 定义子节点1下的子节点 */
		new TreeItem("node_about_1", node_about, "班级概况1", null,null ,true);
		new TreeItem("node_about_2", node_about, "班级概况2", null,null ,true);
		new TreeItem("node_about_3", node_about, "班级概况3", null,null,true);

		/** 定义根节点下的其他子节点 */
		new TreeItem("node_basic", node1, "基本信息", null,null ,true);
		new TreeItem("node_staff", node1, "班级学员", null,null ,true);
		new TreeItem("node_teacher", node1, "班级教师", null,null ,true);
		new TreeItem("node_curricula", node1, "班级课程",null,null ,true);
		new TreeItem("node_datum", node1, "班级资料",null,null ,true);
		new TreeItem("node_paper", node1, "班级试卷", null,null ,true);
		new TreeItem("node_exam", node1, "班级考卷",null,null,true);
		new TreeItem("node_result", node1, "成绩统计",null,null ,true);
		
		TreeParam param=TreeParam.getTreeParam(cycle);
	
		IData treeData=TreeFactory.buildTreeData(param, new TreeItem[]{root1});

		context.setAjax(treeData);
	}
	
}