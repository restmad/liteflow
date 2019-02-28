package cn.lite.flow.executor.kernel.service.impl;

import cn.lite.flow.executor.common.utils.ContainerMetadata;
import cn.lite.flow.executor.kernel.conf.ExecutorMetadata;
import cn.lite.flow.executor.kernel.container.ContainerFactory;
import cn.lite.flow.executor.kernel.service.CompentsateJobService;
import cn.lite.flow.executor.model.basic.ExecutorJob;
import cn.lite.flow.executor.model.consts.ExecutorJobStatus;
import cn.lite.flow.executor.model.kernel.Container;
import cn.lite.flow.executor.model.query.ExecutorJobQM;
import cn.lite.flow.executor.service.ExecutorJobService;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;

/**
 * @description:
 * @author: yueyunyue
 * @create: 2019-01-22
 **/
@Service("compentsateJobServiceImpl")
public class CompentsateJobServiceImpl implements CompentsateJobService {

    private final static Logger LOG = LoggerFactory.getLogger(CompentsateJobServiceImpl.class);

    private final static int PAGE_SIZE = 100;

    @Autowired
    private ExecutorJobService executorJobService;

    @Override
    public void compentsateJobByStatus(int status) {
        ExecutorJobQM qm = new ExecutorJobQM();
        qm.setStatus(status);
        int pageNo = 1;
        qm.setExecutorServerId(ExecutorMetadata.getServerId());
        qm.addOrderAsc(ExecutorJobQM.COL_ID);
        List<ExecutorJob> jobs = null;
        do{
            qm.setPage(pageNo, PAGE_SIZE);
            jobs = executorJobService.list(qm);
            if(CollectionUtils.isNotEmpty(jobs)){
                jobs.stream().forEach(job -> {
                    this.compentsateJob(job);
                });
            }
            pageNo ++;
        }while (CollectionUtils.isNotEmpty(jobs));
    }

    @Override
    public void compentsateJob(ExecutorJob job) {
        try {
            LOG.info("job has no container, jobId:{} status{}", job.getId(), job.getStatus());
            if(!ContainerMetadata.containerExist(job.getId())){
                Container container = ContainerFactory.newInstance(job);
                /**
                 * 新建任务直接扔进metadata中
                 */
                if(job.getStatus() == ExecutorJobStatus.NEW.getValue()){
                    ContainerMetadata.putContainer(job.getId(), container);
                    LOG.info("job create new container and push to metadata, jobId:{} status{}", job.getId(), job.getStatus());

                    /**
                     * 运行中的任务
                     * 1.异步任务需要再次加入到metadata
                     * 2.同步任务会由于executor服务重启而失败
                     *
                     */
                }else if(job.getStatus() == ExecutorJobStatus.RUNNING.getValue()){

                    boolean isSync = ContainerFactory.isSyncConstainer(container);
                    if(isSync){
                        /**
                         * 空任务需要重新
                         */
                        if(ContainerFactory.isNoopConstainer(container)){
                            ContainerMetadata.putContainer(job.getId(), container);
                            LOG.info("job create new noop container and push to metadata, jobId:{} status{}", job.getId(), job.getStatus());
                        }else{
                            executorJobService.fail(job.getId(), "failed");
                            LOG.info("sync job set fail, jobId:{} status{}", job.getId(), job.getStatus());
                        }
                    }else{
                        ContainerMetadata.putContainer(job.getId(), container);
                        LOG.info("job create new container and push to metadata, jobId:{} status{}", job.getId(), job.getStatus());

                    }

                }

            }
        }catch (Throwable e){
            LOG.error("callback job error,id:" + job.getId(), e);
        }
    }
}
