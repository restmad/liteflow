package cn.lite.flow.executor.model.kernel;

import cn.lite.flow.executor.model.basic.ExecutorJob;

/**
 * 同步容器
 */
public abstract class SyncContainer extends AbstractContainer {

  public SyncContainer(ExecutorJob executorJob) {
    super(executorJob);
  }
}
