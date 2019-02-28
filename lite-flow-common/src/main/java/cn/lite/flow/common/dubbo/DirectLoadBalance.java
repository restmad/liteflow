package cn.lite.flow.common.dubbo;

import com.alibaba.dubbo.common.URL;
import com.alibaba.dubbo.rpc.Invocation;
import com.alibaba.dubbo.rpc.Invoker;
import com.alibaba.dubbo.rpc.RpcException;
import com.alibaba.dubbo.rpc.cluster.LoadBalance;
import com.alibaba.dubbo.rpc.cluster.loadbalance.RandomLoadBalance;
import org.apache.commons.lang3.StringUtils;

import java.util.List;

/**
 * 指定服务提供者ip时，invoker的选取策略
 */
public class DirectLoadBalance implements LoadBalance {

    public static final String NAME = "direct";

    private final RandomLoadBalance randomLoadBalance = new RandomLoadBalance();

    @Override
    public  <T> Invoker<T> select(List<Invoker<T>> invokers, URL url, Invocation invocation) throws RpcException {
        String ip = DirectIpHolder.getIp();
        if(StringUtils.isNotBlank(ip)){
            for (Invoker<T> invoker : invokers) {
                URL invokerURL = invoker.getUrl();
                if (invokerURL.getIp().equals(ip)) {
                    return invoker;
                }
            }
           throw new RpcException("there is no invoker, ip:" + ip);
        }else {
            Invoker<T> selectedInvoker = randomLoadBalance.select(invokers, url, invocation);
            return selectedInvoker;
        }
    }
}
