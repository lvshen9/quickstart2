package com.ailk.quickstart.common.util;

/*******************************************************************************
 * $Header: /share/cvsroot/saleserv_hnan/resmanm_j2ee/src-common/com/ailk/resmanm/common/util/StringUtil.java,v 1.6 2013/05/17 09:25:44 zhangti Exp $
 * $Revision: 1.6 $
 * $Date: 2013/05/17 09:25:44 $
 *
 *==============================================================================
 *
 * Copyright (c) 2001-2006 Primeton Technologies, Ltd.
 * All rights reserved.
 * 
 * Created on 2013-3-12
 *******************************************************************************/





import java.io.UnsupportedEncodingException;
import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;

import com.ailk.org.apache.commons.lang3.StringUtils;

import com.ailk.common.data.IData;
import com.ailk.common.data.IDataset;
import com.ailk.common.data.impl.DataMap;
import com.ailk.common.data.impl.DatasetList;
import com.ailk.common.util.Utility;



/**
 * 各种字符操作工具函数和方法
 * 
 * @author <a href="mailto:tangk@lianchuang.com">Tang Kai</a>
 *
 */
public class StringUtil {//attach?action=download&fileId=14899600&realName=导入失败文件[票据].txt
	public final static String TREE_DATA_ID_SEPARATOR = "●";
	
	/**
	 * 获取错误文件ID
	 * @param url
	 * @return
	 */
	public static String getErrorFileId(String url){
		String arr1[] = url.split("&");
		String arr2[] = null;
		for (int i = 0; i < arr1.length; i++) {
			if(arr1[i].matches("^\\w+\\=\\d+$")){
				arr2 = arr1[i].split("=");
			}
		}
		
		if(arr2 == null || arr2.length < 2){
			return null;
		}
		return arr2[1];
	}
	
	/**
	 * 修改dataset的Keyname
	 * @param dataset
	 * @param oldName
	 * @param newName
	 * @return
	 */
	public static IDataset changeDatasetKeyName(IDataset dataset, String oldName, String newName){
		IDataset newDataset = new DatasetList();
		if(dataset == null || dataset.size() < 1)
			return null;
		
		if(isNull(oldName) || isNull(newName))
			return null;
		
		for (int i = 0; i<dataset.size(); i++) {
			IData temp = dataset.getData(i);
			if(isNull(temp.getString(oldName))){
				return null;
			}
			temp.put(newName, temp.getString(oldName));
			newDataset.add(temp);
			temp.remove(oldName);
		}
		
		return newDataset;
	}
	
	
	/**
	 * 获取卡类型路径
	 * @param kindInfo
	 * @return
	 * @throws Exception
	 */
	public static String[] getResKindInfo(String kindInfo)throws Exception{
		if(isNull(kindInfo))
			return null;
		return kindInfo.split(TREE_DATA_ID_SEPARATOR);		
		
	}
	
	/**
	 * 获取字符串前缀
	 * @param starResNo
	 * @param endResNo
	 * @return
	 * @throws Exception
	 */
	public static String getPrefix(String starResNo, String endResNo) throws Exception {
		if(isNotNull(starResNo) && isNotNull(endResNo)){
			if(starResNo.length() != endResNo.length()){
				//CSAppException.apperr(ResException.RES_COMMON_9001);
				throw new Exception("起始和终止号段长度不一致，请确认！");//  update by gaoxian  编译不过？
			}
		}
		int index = StringUtils.indexOfDifference(starResNo, endResNo);
		if(index == 0){
			//CSAppException.apperr(ResException.RES_COMMON_9002);
			throw new Exception("起始和终止号段的前缀不同，请确认！");
		} else if(index == -1){
			return starResNo;
		}
		String starTailNo = starResNo.substring(index);
		String endTailNo = endResNo.substring(index);
		if(!StringUtils.isNumeric(starTailNo)||!StringUtils.isNumeric(endTailNo)){
			//CSAppException.apperr(ResException.RES_COMMON_9003);
			throw new Exception("起始和终止号段不在同一个号段，请确认！");
		}	
		return starResNo.substring(0, index);
	}
	
	/**
	 * 按位截取字符串
	 * @param str
	 * @return
	 */
	public static String toNeededStr(String str, int star, int end){
		if(isNull(str) || "".equals(str)) 
			return "";
		if(star < 0 || end > str.length()) 
			return "";
		return str.substring(star, end);
	}
	
	/**
	 * 判断一个字符串是否为null或者为空字符串
	 * 
	 * @param p_str
	 * @return p_str不为null或空字符串返回false
	 */
	public static boolean isNull(String p_str) {
		if (p_str != null && !p_str.trim().equals(""))
			return false;
		else
			return true;
	}

	/**
	 * 判断一个字符串是否为null或者为空字符串
	 * 
	 * @param p_str
	 * @return p_str不为null或空字符串返回true
	 */
	public static boolean isNotNull(String p_str) {
		if (p_str != null && !p_str.trim().equals(""))
			return true;
		else
			return false;
	}

	/**
	 * 将表示数字的字符串转换为实数
	 * 
	 * @param p_value
	 * @return
	 * @throws Exception
	 */
	public static double strToDouble(String p_value) throws Exception {
		if (p_value == null || p_value.length() == 0) {
			throw new Exception("The string is null");
		} else {
			return Double.valueOf(p_value).doubleValue();
		}
	}

	/**
	 * 将表示数值的字符串转换为整数
	 * 
	 * @param p_value
	 * @return
	 * @throws Exception
	 */
	public static int strToInt(String p_value) throws Exception {
		if (p_value == null || p_value.length() == 0) {
			throw new Exception("The string is null");
		} else {
			return Integer.valueOf(p_value).intValue();
		}
	}

	/**
	 * 将null转换为空字符串
	 * 
	 * @param p_value
	 * @return
	 */
	public static String convertNull(String p_value) {
		if (p_value == null)
			return "";
		return p_value;
	}
	
	public static String trim(String str){
		if(str == null){
			return "";
		}else{
			return str.trim();
		}
	}
	
	/**
	 * 将ISO-8859-1编码的字符串转换为GBK编码的字符串
	 * 
	 * @param p_value
	 * @return
	 */
	public static String isoToGb(String p_value) {
		if (p_value == null && p_value.trim().length() == 0)
			return p_value;

		String outStr;
		try {
			outStr = new String(p_value.getBytes("ISO-8859-1"), "GBK");
		} catch (UnsupportedEncodingException e) {
			outStr = null;
		}
		return outStr;
	}

	/**
	 * 将GBK编码的字符串转换为ISO-8859-1编码的字符串
	 * 
	 * @param p_value
	 * @return
	 */
	public static String gbToIso(String p_value) {
		if (p_value == null && p_value.trim().length() == 0)
			return p_value;

		String outStr;
		try {
			outStr = new String(p_value.getBytes("GBK"), "ISO-8859-1");
		} catch (UnsupportedEncodingException e) {
			outStr = null;
		}
		return outStr;
	}

	/**
	 * 获取字符串的字节长度
	 * 
	 * @param p_value
	 * @return
	 */
	public static int getBytesLength(String p_value) {
		if (p_value == null || p_value.equals(""))
			return 0;
		return p_value.getBytes().length;
	}

	/**
	 * <p>为调用获取通用参数的服务进行字符串编码</p>
	 * <p>一个字符串表的例子:</p>
	 * <p>"FeSt00302000110010标准全球通000120006神州行000130008动感地带OpFc00202000110004语音00011000120004短信00010"</p>
	 * <p>解析如下:</p>
	 * <p>第一张表:FeSt</p>
	 * <p>FeSt        表名</p>
	 * <p>003         记录数</p>
	 * <p>02          字段数</p>
	 * <p>0001        第一个字段实际长度</p>
	 * <p>1           第一个字段内容</p>
	 * <p>0010        第二个字段实际长度</p>
	 * <p>标准全球通  第二个字段内容</p>
	 * <p></p>
	 * <p>第二张表：OpFc</p>
	 * <p>OpFc        表名</p>
	 * <p>002         记录数</p>
	 * <p>02          字段数</p>
	 * <p>0001        第一个字段实际长度</p>
	 * <p>1           第一个字段内容</p>
	 * <p>0004        第二个字段实际长度</p>
	 * <p>语音        第二个字段内容</p>
	 * @param p_str
	 * @return
	 */
	public static String codeStrForGetNormalParam(String p_str[]) {
		String prefix = "Tabs";
		String codeStr = fillStr(p_str.length + "", "0", 3, true) + fillStr("1", "0", 2, true);
		
		for (int i = 0; i < p_str.length; i++) {
			codeStr = codeStr + fillStr("" + p_str[i].length(), "0", 4, true) + p_str[i];
		}
		codeStr = prefix + codeStr;
		return codeStr;
	}

	/**
	 * 为调用获取通用参数的服务进行字符串编码
	 * @param p_str
	 * @return
	 */
	public static String codeStrForGetNormalParam(String p_str) {
		return codeStrForGetNormalParam(new String[] { p_str });
	}

	/**
	 * 填充字符串 例：数据库生成了5位的数字sequence，但构成流水号需要8位，那么可通过此方法，在左边补零， 如fillStr("12345", "0", 8,
	 * true) == "00012345"
	 * 
	 * @param p_srcStr
	 *            原始字符串
	 * @param p_fillStr
	 *            要填充到原始字符串中的字符串
	 * @param p_totalLen
	 *            填充后的总长度
	 * @param p_leftFlag
	 *            左填充标志 为true在p_srcStr左边填充p_fillStr 为false在p_srcStr右边填充p_fillStr
	 * @return
	 */
	public static String fillStr(String p_srcStr, String p_fillStr, int p_totalLen,
			boolean p_leftFlag)
	{
		if (p_srcStr == null)
			return null;
		if (p_srcStr.length() > p_totalLen || p_fillStr == null
				|| p_fillStr.length() == 0)
			return p_srcStr;
		if (((p_totalLen - p_srcStr.length()) % p_fillStr.length()) != 0)
			return p_srcStr;
		String result = p_srcStr;
		int i = p_totalLen - p_srcStr.length();
		while (i > 0)
		{
			result = p_leftFlag ? (p_fillStr + result) : (result + p_fillStr);
			i = i - p_fillStr.length();
		}
		return result;
	}

	/**
	 * 转换字符串数组为IDataset类型
	 * 
	 * @param strArr
	 *            字符串数组
	 * @param mapKeyOfDataset
	 *            IDataset的节点由IData组成，mapKeyOfDataset将作为IData存放字符串的map关键字
	 * @return
	 */
	public static IDataset arrayToDataset(String[] strArr, String mapKeyOfDataset)
	{
		if (strArr == null)
			return null;
		IDataset dataset = new DatasetList();
		for (int i = 0; i < strArr.length; i++)
		{
			IData data = new DataMap();
			data.put(mapKeyOfDataset, trim(strArr[i]));
			dataset.add(data);
		}
		return dataset;
	}
	
	/**
	 * 将字符串根据分隔符切割成字符串数组后，转换为IDataset类型
	 * 
	 * @param str
	 *            字符串
	 * @param regex
	 *            字符串分隔符
	 * @param mapKeyOfDataset
	 *            IDataset的节点由IData组成，mapKeyOfDataset将作为IData存放字符串的map关键字
	 * @return
	 */
	public static IDataset strToDataset(String str, String regex, String mapKeyOfDataset)
	{
		if (isNull(str))
			return null;
		String[] strArr = str.split(regex);

		return arrayToDataset(strArr, mapKeyOfDataset);
	}
	
	/**
	 * 将IData里的信息放到IDataset里去，使每个IDataset的节点都有该IData里的信息 
	 * 
	 * @param param
	 * @param params
	 * @return
	 */
	public static IDataset addDataToDataset(IData param, IDataset params)
	{
		if(params == null || params.size() <= 0)
		{
			return null;
		}
		
		if(param == null || param.keySet().size() <= 0)
		{
			return params;
		}
		
		IData data = (IData)params.get(0);
		Iterator it = data.keySet().iterator();
		while(it.hasNext())
		{
			String key = (String)it.next();
			if(param.containsKey(key))
			{
				param.remove(key);
			}
		}
		
		for(int i = 0; i < params.size(); i ++)
		{
			IData map = (IData)params.get(i);			
			map.putAll(param);
		}
		
		return params;
	}
	
	/**
	 * 添加字符串到IDataset的每个节点中去
	 * 
	 * @param dataset 源IDataset
	 * @param str  要添加的字符串
	 * @param mapKeyOfDataset IDataset的节点由IData组成，mapKeyOfDataset将作为IData存放字符串的map关键字
	 * @return
	 */
	public static IDataset addStrToDataset(IDataset dataset, String str, String mapKeyOfDataset)
	{
		for (int i = 0; i < dataset.size(); i ++)
		{
			IData data = (IData)dataset.get(i);
			data.put(mapKeyOfDataset, str);
		}
		return dataset;
	}
	
	/**
	 * 按索引顺序依次添加字符串数组到IDataset中去
	 * 
	 * @param dataset 源IDataset
	 * @param strArr  要添加的字符串数组
	 * @param mapKeyOfDataset IDataset的节点由IData组成，mapKeyOfDataset将作为IData存放字符串的map关键字
	 * @return
	 */
	public static IDataset addArrayToDataset(IDataset dataset, String[] strArr, String mapKeyOfDataset)
	{
		if (strArr == null)
			return null;

		for (int i = 0; i < dataset.size() && i < strArr.length; i++)
		{
			IData data = (IData)dataset.get(i);
			data.put(mapKeyOfDataset, strArr[i]);
		}
		return dataset;
	}	
	
	/**
	 * 转换IDataset为字符串数组（遍历IDataset, 取出每个节点键值为mapKeyOfDataset的字符串，把取出的这些字符串组成一个数组）
	 * 
	 * @param dataset
	 * @param mapKeyOfDataset
	 * @return
	 */
	public static String[] datasetToArray(IDataset dataset, String mapKeyOfDataset)
	{
		if(dataset == null)	
			return null;
		String[] arr = new String[dataset.size()];
		for(int i = 0; i < dataset.size(); i ++)
		{
			arr[i] = (String)dataset.get(i, mapKeyOfDataset);
		}
		return arr;
	}
	
	/**
	 * 字符串数组转字符串（遍历字符串数组，取出每个节点的字符串，用分隔符regex连接成一个长字符串）
	 * 
	 * @param strArr
	 * @param regex
	 * @return
	 */
	public static String arrayToStr(String[] strArr, String regex)
	{
		if(strArr == null)
			return null;
		String str = "";
		for(int i = 0; i < strArr.length; i ++)
		{
			str += regex + strArr[i];
		}
		if(str.length() > 0)
		{
			str = str.substring(regex.length());
		}
		return str;
	}
	
	/**
	 * 遍历IDataset，将每个节点的mapKeyOfDataset关键字对应的值取出来，连接成一个长字符串，regex作为连接分隔符
	 * 
	 * @param dataset
	 * @param mapKeyOfDataset
	 * @param regex
	 * @return
	 */
	public static String datasetToStr(IDataset dataset, String mapKeyOfDataset, String regex) 
	{
		if(dataset == null || dataset.size() == 0)
		{
			return "";
		}
		StringBuffer str = new StringBuffer("");
		for(int i = 0; i < dataset.size(); i ++)
		{
			IData data = (IData)dataset.get(i);
			String tmp = data.getString(mapKeyOfDataset);
			if(isNotNull(tmp))
				str.append(regex).append(tmp);
		}
		if(str.length() > regex.length())
		{
			return str.substring(regex.length());
		}
		return "";
	}
	
	/**
	 * 遍历IDataset，连接成一个长字符串，regex作为连接分隔符
	 * 
	 * @param dataset
	 * @param mapKeyOfDataset
	 * @param regex
	 * @return
	 */
	public static String datasetToStr(IDataset dataset, String regex) 
	{
		if(dataset == null || dataset.size() == 0)
		{
			return "";
		}
		StringBuffer str = new StringBuffer("");
		for(int i = 0; i < dataset.size(); i ++)
		{
			String tmp = (String)dataset.get(i);
			if(isNotNull(tmp))
				str.append(regex).append(tmp);
		}
		if(str.length() > regex.length())
		{
			return str.substring(regex.length());
		}
		return "";
	}
	
	/**
	 * 由字符串组成的list转成字符串数组
	 * 
	 * @param list
	 * @return
	 */
	public static String[] listToStrArray(List list)
	{
		if(list == null)
		{
			return null;
		}
		
		String[] arr = new String[list.size()];
		for(int i = 0; i < list.size(); i ++)
		{
			arr[i] = (String)list.get(i);
		}
		return arr;		
	}
	
	/**
	 * 通过源数据集和目标数据集键值的比较，取得源数据集里在目标数据集里已经存在的数据
	 * 
	 * @param srcDataset
	 * @param srcCompareKey
	 * @param targetDataset
	 * @param targetCompareKey
	 * @return
	 */
	public static IDataset getExistentDataset(IDataset srcDataset, String srcCompareKey, 
			IDataset targetDataset, String targetCompareKey)
	{
		IDataset existDataset = new DatasetList();
		if(srcDataset == null || srcDataset.size() == 0 || targetDataset == null || targetDataset.size() == 0)
		{
			return existDataset;
		}
		for(int i = 0; i < srcDataset.size(); i ++)
		{
			IData srcData = (IData)srcDataset.get(i);
			for(int j = 0; j < targetDataset.size(); j ++)
			{
				IData targetData = (IData)targetDataset.get(j);
				if(srcData.getString(srcCompareKey).equals(targetData.getString(targetCompareKey)))
				{
					existDataset.add(srcData);
				}
			}
		}
		return existDataset;
	}
	
	/**
	 * 通过源数据集和目标数据集键值的比较，取得源数据集里在目标数据集里不存在的数据
	 * 
	 * @param srcDataset
	 * @param srcCompareKey
	 * @param targetDataset
	 * @param targetCompareKey
	 * @return
	 */
	public static IDataset getNonExistentDataset(IDataset srcDataset, String srcCompareKey, 
			IDataset targetDataset, String targetCompareKey)
	{
		IDataset nonExistDataset = new DatasetList();
		if(srcDataset == null || srcDataset.size() == 0)
		{
			return nonExistDataset;
		}
		if(targetDataset == null || targetDataset.size() == 0)
		{
			return srcDataset;
		}
		for(int i = 0; i < srcDataset.size(); i ++)
		{
			IData srcData = (IData)srcDataset.get(i);
			boolean isExistent = false;
			for(int j = 0; j < targetDataset.size(); j ++)
			{
				IData targetData = (IData)targetDataset.get(j);
				if(srcData.getString(srcCompareKey).equals(targetData.getString(targetCompareKey)))
				{
					isExistent = true;
					break;
				}
			}
			if(!isExistent)
			{
				nonExistDataset.add(srcData);
			}
		}
		return nonExistDataset;
	}
	
	/**
	 * 将字符串数组中每个节点元素put到IData对象中，每个节点元素对应的键值由mapKeys参数提供。
	 * 
	 * @param arry 字符串数组 
	 * @param mapKeys 字符串数组
	 * @return
	 * @throws Exception
	 */
	public static IData arryToIData(String[] arry, String[] mapKeys)
	{
		if(arry == null || mapKeys == null)
			return null;
		
		IData data = new DataMap();
		for(int i = 0; i < arry.length && i < mapKeys.length; i ++)
		{
			data.put(mapKeys[i], arry[i]);
		}
		return data;
	}

    /**
     * 字符串左补齐
     * @param str
     * @param length
     * @param pad
     */
    public static String lpad(String str, int length, char pad) {
        StringBuffer buf = new StringBuffer();
        int len = length - str.length();
        for (int i=0; i<len; i++) {
            buf.append(pad);
        }
        return buf.append(str).toString();
    }
    
    public static IDataset subList(IDataset srcList, int length){
    	if(length >= srcList.size())
    	{
    		return srcList;
    	}
    	else
    	{
    		IDataset resulet = new DatasetList();
    		for(int i =0; i<length; i++)
    		{
    			resulet.add(srcList.get(i));
    		}
    		return resulet;
    	}
    		
    }
    
    /**
	 * 将字符串根据分隔符切割成字符串数组后，转换为IDataset类型
	 * 
	 * @param str 字符串
	 * @param regex 字符串分隔符
	 * @param mapKeyOfDataset IDataset的节点由IData组成，mapKeyOfDataset将作为IData存放字符串的map关键字
	 * @return
	 */
	public static IDataset parseStrToDataset(String str, String regex, String mapKeyOfDataset)
	{
		if(isNull(str))
			return null;
		String[] strArr = str.split(regex);
		
		return parseStrArrayToDataset(strArr, mapKeyOfDataset);
	}
	
	/**
	 * 转换字符串数组为IDataset类型
	 * 
	 * @param strArr 字符串数组
	 * @param mapKeyOfDataset IDataset的节点由IData组成，mapKeyOfDataset将作为IData存放字符串的map关键字
	 * @return
	 */
	public static IDataset parseStrArrayToDataset(String[] strArr, String mapKeyOfDataset)
	{
		if(strArr == null)	
			return null;
		IDataset dataset = new DatasetList();
		for(int i = 0; i < strArr.length; i ++)
		{
			IData data = new DataMap();
			data.put(mapKeyOfDataset, strArr[i]);
			dataset.add(data);
		}
		return dataset;
	}	
	
	/**
	 * 将连续数字段转换成一个个单个的数字，并放到IDataset里去，支持字母，但字母不得在末6位。（注意：起始数字的长度必须相同，并且起始数字之间的间隔数量不能超过99999）
	 * 
	 * @param startNumber
	 * @param endNumber
	 * @param noKay
	 * @return
	 * @throws Exception
	 * 
	 * added by tangk
	 */
	public static IDataset numberSegmentToIDataset(String startNumber, String endNumber, String noKey) throws Exception
	{
		if(startNumber.length() != endNumber.length())
		{
			return null;
		}
		
		if(startNumber.trim().equals(endNumber.trim()))
		{
			IDataset noList = new DatasetList();
			IData data = new DataMap();
			data.put(noKey, startNumber);
			noList.add(data);
			return noList;
		}
		int countLen = startNumber.length() > 6 ? 6 : startNumber.length() - 1;

		String headStart = startNumber.substring(0, startNumber.length() - countLen);
		String headEnd = endNumber.substring(0, endNumber.length() - countLen);
		long startNo = Long.parseLong(startNumber.substring(startNumber.length() - countLen));
		long endNo = Long.parseLong(endNumber.substring(endNumber.length() - countLen));
		long addition = Long.parseLong("1" + fillStr("0", "0", countLen, true));
		if(endNo <= startNo)
		{
			endNo += addition;
		}
		
		IDataset noList = new DatasetList();
		while(startNo <= endNo)
		{
			IData data = new DataMap();
			int len = String.valueOf(startNo).length();
			if(len > countLen)
			{
				data.put(noKey, headEnd + fillStr(String.valueOf(startNo - addition), "0", countLen, true));
			}
			else
			{
				data.put(noKey, headStart + fillStr(String.valueOf(startNo), "0", countLen, true)); 
			}
			noList.add(data);
			startNo ++;
		}
		
		return noList;
	}
	
	/**
	 * List转换为string数组
	 * @param dataset
	 * @return
	 */
	public static String[] listToArray(LinkedList list)
	{
		if(list == null) return null;
		if(list.size() == 0) return null;
		
		String[] arr = new String[list.size()];
		
		for(int i = 0 ; i < list.size() ; i++)
		{
			arr[i] = (String)list.get(i);
		}
		return arr;
	}
	
	
   
	
	
	
	/**
	 * 将文件posFile和areaNo中的号码串拼接成一个字符串，同时过滤掉重复的号码串
	 * @param posFile
	 * @param areaNo
	 * @param separator
	 * @return
	 * @throws IOException
	 */
//	public static String textContentToString(IUploadFile posFile,String areaNo,String separator) throws Exception{
//	
//		StringBuffer simcardNos=new StringBuffer();
//		IData keyMap=new DataMap();
//		int rownum = 0;
//		//读取文件
//		if(posFile !=null && posFile.getSize() > 0){
//			String line = "";
//	    	InputStream stream = posFile.getStream();
//			BufferedReader in = new BufferedReader(new InputStreamReader(stream));
//			String simNo=null;
//			String temp[]=null;
//			
//			while ((line = in.readLine()) != null) {
//				if(StringUtil.isNull(line.trim()))
//				{
//					continue;
//				}			
//				rownum++;
//				if(rownum>10000 && isNotNull(simcardNos.toString())){
////					common.error("为了一个良好，稳定的系统，文件导入资源不宜超过1万！");
//					Utility.error("为了一个良好，稳定的系统，文件导入资源不宜超过1万！");
//				}
//				String[] nos = line.split(",");
//				for(int i=0 ; i<nos.length ; i++){
//					if(StringUtil.isNull(nos[i])){						
//						continue;
//					}
//										
//					temp=nos[i].split("=");
//					                         
//					if(temp.length>1){		
//						
//						simNo=temp[1].split(";")[0];						
//					}else{
//						simNo=temp[0];
//					}
//					                         					
//					if(StringUtil.isNotNull(simNo)&&keyMap.getString(simNo)==null){
//						simcardNos.append(separator + simNo.trim());
//						keyMap.put(simNo, simNo);
//					}
//					
//				}	
//
//			}
//		}//end if
//		
//		
//		
//		if(StringUtil.isNotNull(areaNo)){
//			String[] areaNos = areaNo.split(",");
//			for(int j=0 ; j< areaNos.length ; j++){
//				if(keyMap.getString(areaNos[j])==null){
//					simcardNos.append(separator + areaNos[j]);
//					keyMap.put(areaNos[j], areaNos[j]);
//				}				
//			}
//		}
//		
//		if(StringUtil.isNotNull(simcardNos.toString()))
//		{			
//			simcardNos=simcardNos.delete(0, separator.length());
//		}		
//		keyMap=null;
//		
//		if(isNull(simcardNos.toString())){
////			common.error("没有可操作的资源编码，请确认导入文件格式的正确性！")  ;
//			Utility.error("没有可操作的资源编码，请确认导入文件格式的正确性！");
//		}
//		return simcardNos.toString();
//	}

	/**
	 * 计算卡区间长度
	 * @param startNo
	 * @param endNo
	 * @return
	 * @throws Exception
	 */
	public static Long calculateCardsLength(String startNo,String endNo)throws Exception{
		
		if(startNo.equals(endNo)) return 1L;	
		if(startNo.length() != endNo.length()) return 0L;
		
		int flag = repeatRecord(startNo, endNo);		
		String begs = startNo.substring(flag-1, startNo.length());
		String ends = endNo.substring(flag-1, endNo.length());
		
		if((begs).matches("^[0-9]*$")&& (ends).matches("^[0-9]*$"))
		{
			return  Math.abs(Long.valueOf(ends) - Long.valueOf(begs)) +1 ;	
		}else{
			Utility.error("不在同一个号段");
			return 0L;
		}
	}

	/**
	 * 重复卡号的长度
	 * @param startNo
	 * @param endNo
	 * @return
	 */
	private static int repeatRecord(String startNo, String endNo) {
		int flag = startNo.length();		
		for(int i = 0 ; i < startNo.length(); i++){
			if( !startNo.substring(0, i).equals(endNo.substring(0, i))){
				flag =i;
				break;
			}
		}
		return flag;
	}
	/**
	 * 将形如{P,E,C,0,1,2,3}的str转为IData
	 * @param str
	 * @param mapKey
	 * @return
	 */
	public static IData strToIData(String str, String mapKey){
		IData data = new DataMap();
		String[] strs = null;
		if(isNull(str)){
			return null;
		}
		if(str.contains(",")){
			strs = str.substring(1, str.length()-1).split(",");
		} else {
			strs = str.split(",");
		}
		if(strs!=null&&strs.length>0){
			for(int i=0; i<strs.length; i++){
				data.put(mapKey+(i+1), strs[i]);
			}
		}
		return data;
	}

	/**
	 * 根据Id获取受理月份
	 * @param strId
	 * @return
	 */
	public static String getAcceptMonthById(String tradeId){
		String acceptMonth = "";
		if(!tradeId.equals("")){
			acceptMonth = tradeId.substring(6, 8);
		}
		return acceptMonth;
	}
	
	/**
	 * 拆分出RES_KIND_CODE和RES_TYPE_CODE
	 * @param param
	 * @throws Exception
	 */
	public static void getResKind(IData param) throws Exception
	{
		String resKindCode = param.getString("RES_KIND_CODE");
		String[] KIND_CODE = getResKindInfo(resKindCode);
		param.put("RES_KIND_CODE", KIND_CODE[KIND_CODE.length-1]);
		param.put("RES_TYPE_CODE", KIND_CODE[KIND_CODE.length-2]);
	}
	
	/**
	 * 通过imsi生成mofficeId
	 * @param imsi
	 * @return
	 */
	public static String getMofficeIdByImsi(String imsi)
    {
		String mofficeId="";
		if("00".equals(subStr(imsi,3, 2))){
			if("0".equals(subStr(imsi,8, 1))){
				mofficeId ="35" + subStr(imsi,9, 1)+subStr(imsi,5, 3);
			}
			else if("1".equals(subStr(imsi,8, 1))){
				mofficeId ="36" + subStr(imsi,9, 1)+subStr(imsi,5, 3);
			}
			else if("2".equals(subStr(imsi,8, 1))){
				mofficeId ="37" + subStr(imsi,9, 1)+subStr(imsi,5, 3);
			}
			else if("3".equals(subStr(imsi,8, 1))){
				mofficeId ="38" + subStr(imsi,9, 1)+subStr(imsi,5, 3);
			}
			else if("4".equals(subStr(imsi,8, 1))){
				mofficeId ="39" + subStr(imsi,9, 1)+subStr(imsi,5, 3);
			}
			else if("5".equals(subStr(imsi,8, 1))){  
				mofficeId ="350" + subStr(imsi,5, 3);
			}
			else if("6".equals(subStr(imsi,8, 1))){
				mofficeId ="360" + subStr(imsi,5, 3);
			}
			else if("7".equals(subStr(imsi,8, 1))){
				mofficeId ="370" + subStr(imsi,5, 3);
			}
			else if("8".equals(subStr(imsi,8, 1))){
				mofficeId ="380" + subStr(imsi,5, 3);
			}
			else if("9".equals(subStr(imsi,8, 1))){
				mofficeId ="390" + subStr(imsi,5, 3);
			}
		}
		else if("02".equals(subStr(imsi,3, 2))){
			if("0".equals(subStr(imsi,5, 1))){
				mofficeId ="34" + subStr(imsi,6, 4);
			}
			else if("9".equals(subStr(imsi,5, 1))){
				mofficeId ="59" + subStr(imsi,6, 4);
			}
			else if("8".equals(subStr(imsi,5, 1))){
				mofficeId ="58" + subStr(imsi,6, 4);
			}
			else if("3".equals(subStr(imsi,5, 1))){
				mofficeId ="50" + subStr(imsi,6, 4);
			}
			else if("1".equals(subStr(imsi,5, 1))){
				mofficeId ="51" + subStr(imsi,6, 4);
			}
			else if("2".equals(subStr(imsi,5, 1))){
				mofficeId ="52" + subStr(imsi,6, 4);
			}
			else if("7".equals(subStr(imsi,5, 1))){
				mofficeId ="87" + subStr(imsi,6, 4);
			}
			else if("6".equals(subStr(imsi,5, 1))){
				mofficeId ="82" + subStr(imsi,6, 4);
			}
			else if("5".equals(subStr(imsi,5, 1))){
				mofficeId ="83" + subStr(imsi,6, 4);
			}
			else if("4".equals(subStr(imsi,5, 1))){
				mofficeId ="84" + subStr(imsi,6, 4);
			}
		}
		else if("07".equals(subStr(imsi,3, 2))){
			if("8".equals(subStr(imsi,5, 1))){
				mofficeId ="88" + subStr(imsi,6, 4);
			}
			else if("7".equals(subStr(imsi,5, 1))){
				mofficeId ="57" + subStr(imsi,6, 4);
			}
			else if("9".equals(subStr(imsi,5, 1))){
				mofficeId ="47" + subStr(imsi,6, 4);
			}
			else if("5".equals(subStr(imsi,5, 1))){
				mofficeId ="78" + subStr(imsi,6, 4);
			}
		}
		return mofficeId;
    }
	
	private static String subStr(String str,int startIndex , int length){
		return str.substring(startIndex, startIndex+length);
	}
	
	/**
	 *  错误信息格式化
	 * @param errDataset
	 * @return
	 * @throws Exception
	 */
	public static String formatErrInfo(IDataset errDataset,String key) {
		int   maxNum = 30 ;
		String   errString  = "";
		int count = errDataset.size()>maxNum?maxNum:errDataset.size();
		IData  tmp = null ;
		for(int i =0 ; i<count;i++){
			
			tmp = errDataset.getData(i);
			if(i%3==0){
				errString = errString + "<br>";
			}
			errString = errString + tmp.getString(key)+ ",";
			
		}
		errString = errString.substring(0, errString.lastIndexOf(',')-1);
		return errString ;
	}
}

