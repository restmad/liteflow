package cn.lite.flow.executor.common.utils;

import cn.lite.flow.executor.model.kernel.AsyncContainer;
import cn.lite.flow.executor.model.kernel.Container;
import cn.lite.flow.executor.model.kernel.SyncContainer;
import com.google.common.collect.Lists;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.util.Collection;
import java.util.List;
import java.util.concurrent.ConcurrentHashMap;

/**
 * @description: 任务元数据
 * @author: yueyunyue
 * @create: 2019-01-10
 **/
public class ContainerMetadata {

    private final static Logger LOG = LoggerFactory.getLogger(ContainerMetadata.class);

    /**
     * 异步容器
     */
    private final static ConcurrentHashMap<Long, AsyncContainer> ASYNC_METADATA = new ConcurrentHashMap<>();

    /**
     * 同步容器
     */
    private final static ConcurrentHashMap<Long, SyncContainer> SYNC_METADATA = new ConcurrentHashMap<>();

    /**
     * 添加容器
     * @param jobId
     * @param container
     */
    public static void putContainer(long jobId, Container container){

        if(container instanceof AsyncContainer){
            putAsync(jobId, (AsyncContainer)container);
        }else if(container instanceof SyncContainer){
            putSync(jobId, (SyncContainer)container);
        }

    }

    /**
     * 获取任务
     * @param jobId
     * @return
     */
    public static Container getContainer(long jobId){

        AsyncContainer asyncContainer = getAsync(jobId);
        if(asyncContainer != null){
            return asyncContainer;
        }

        SyncContainer syncContainer = getSync(jobId);
        if(syncContainer != null){
            return syncContainer;
        }
        return null;
    }

    /**
     * 移除任务
     * @param jobId
     */
    public static void removeContainer(long jobId){
        removeAsync(jobId);
        removeSync(jobId);
    }


    /**
     * 添加同步任务
     */
    public static void putSync(long jobId, SyncContainer container){
        SYNC_METADATA.putIfAbsent(jobId, container);
    }

    /**
     * 获取同步任务所在容器
     * @param jobId
     * @return
     */
    public static SyncContainer getSync(long jobId){
        SyncContainer container = SYNC_METADATA.get(jobId);
        return container;
    }

    /**
     * 移除同步任务
     * @param jobId
     */
    public static void removeSync(long jobId){
        SYNC_METADATA.remove(jobId);
    }

    /**
     * 获取所有同步任务
     * @return
     */
    public static List<SyncContainer> getSyncContainers(){
        Collection<SyncContainer> containers = SYNC_METADATA.values();
        List<SyncContainer> syncContainers = Lists.newArrayList(containers);
        return syncContainers;
    }



    /**
     * 添加异步任务
     */
    public static void putAsync(long jobId, AsyncContainer container){
        ASYNC_METADATA.putIfAbsent(jobId, container);
    }

    /**
     * 获取异步任务所在容器
     * @param jobId
     * @return
     */
    public static AsyncContainer getAsync(long jobId){
        AsyncContainer container = ASYNC_METADATA.get(jobId);
        return container;
    }

    /**
     * 移除异步任务
     * @param jobId
     */
    public static void removeAsync(long jobId){
        ASYNC_METADATA.remove(jobId);
    }

    /**
     * 获取所有异步任务
     * @return
     */
    public static List<AsyncContainer> getAsyncContainers(){
        Collection<AsyncContainer> containers = ASYNC_METADATA.values();
        List<AsyncContainer> syncContainers = Lists.newArrayList(containers);
        return syncContainers;
    }

    /**
     * 获取所有的容器
     * @return
     */
    public static List<Container> getAllContainers(){

        List<Container> allContainers = Lists.newArrayList();

        List<AsyncContainer> asyncContainers = getAsyncContainers();
        if(CollectionUtils.isNotEmpty(asyncContainers)){
            allContainers.addAll(asyncContainers);
        }
        List<SyncContainer> syncContainers = getSyncContainers();
        if(CollectionUtils.isNotEmpty(syncContainers)){
            allContainers.addAll(syncContainers);
        }
        return allContainers;
    }

    /**
     * 任务是否存在
     * @param jobId
     * @return
     */
    public static boolean containerExist(long jobId){
        if(ASYNC_METADATA.containsKey(jobId)){
            return true;
        }
        if(SYNC_METADATA.containsKey(jobId)){
            return true;
        }
        return false;
    }

}
