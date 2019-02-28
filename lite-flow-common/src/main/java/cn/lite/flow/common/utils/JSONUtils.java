package cn.lite.flow.common.utils;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;

/**
 * @description: json工具
 * @author: yueyunyue
 * @create: 2019-02-01
 **/
public class JSONUtils {

    /**
     * 去除循环检测
     * @param obj
     * @return
     */
    public static String toJSONStringWithoutCircleDetect(Object obj){
        return JSON.toJSONString(obj, SerializerFeature.DisableCircularReferenceDetect);
    }
}
