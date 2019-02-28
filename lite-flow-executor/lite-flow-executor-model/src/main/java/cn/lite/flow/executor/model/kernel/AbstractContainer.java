package cn.lite.flow.executor.model.kernel;

import cn.lite.flow.executor.model.basic.ExecutorJob;

/**
 * @description: 抽象container
 * @author: yueyunyue
 * @create: 2018-08-16
 **/
public abstract class AbstractContainer implements Container {

    protected final ExecutorJob executorJob;

    protected volatile boolean isRunning = false;

    public AbstractContainer(ExecutorJob executorJob) {
        this.executorJob = executorJob;
    }

    public abstract void runInternal() throws Exception;

    public void run() throws Exception {
        if(this.isRunning()){
            return;
        }
        this.isRunning = true;
        runInternal();
    }

    public boolean isRunning() {
        return isRunning;
    }

    public ExecutorJob getExecutorJob() {
        return executorJob;
    }
}
