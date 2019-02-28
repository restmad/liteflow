package cn.lite.flow.executor.common.test;

import cn.lite.flow.executor.common.utils.LinuxMemoryUtils;
import com.alibaba.fastjson.JSONObject;
import org.junit.Test;

import java.util.Properties;

/**
 * @description:
 * @author: yueyunyue
 * @create: 2018-08-17
 **/
public class MemoryTest {


    @Test
    public void test(){
        long osTotalFreeMemorySize = LinuxMemoryUtils.getOsTotalFreeMemorySize();
        System.out.println(osTotalFreeMemorySize);
    }

    @Test
    public void testProps(){
        Properties props = System.getProperties();
        System.out.println(JSONObject.toJSONString(props));

    }

}
