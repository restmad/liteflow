package cn.lite.flow.common.utils;

import java.io.PrintWriter;
import java.io.StringWriter;

/**
 * 异常相关工具
 */
public class ExceptionUtils {
    /**
     * 收集异常堆栈信息
     * */
    public static String collectStackMsg(Throwable e){
        StringWriter sw = new StringWriter();
        e.printStackTrace(new PrintWriter(sw, true));
        return sw.toString();
    }


}
