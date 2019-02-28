/*
 * Copyright 2012 LinkedIn Corp.
 *
 * Licensed under the Apache License, Version 2.0 (the "License"); you may not
 * use this file except in compliance with the License. You may obtain a copy of
 * the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS, WITHOUT
 * WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. See the
 * License for the specific language governing permissions and limitations under
 * the License.
 */

package cn.lite.flow.executor.kernel.job;
import cn.lite.flow.executor.common.utils.Props;
import cn.lite.flow.executor.model.kernel.Job;
import org.slf4j.Logger;

/**
 * 抽象任务
 */
public abstract class AbstractJob implements Job {

  protected final Long executorJobId;

  protected final Logger logger;

  protected final Props jobProps;

  protected final Props sysProps;

  private volatile boolean isSuccess = false;

  protected AbstractJob(final long executorJobId, final Props sysProps,final Props jobProps, final Logger log) {
    this.executorJobId = executorJobId;
    this.logger = log;
    this.jobProps = jobProps;
    this.sysProps = sysProps;
  }

  @Override
  public void cancel() throws Exception {
    throw new RuntimeException("ExecutorJob " + this.executorJobId + " does not support cancellation!");
  }

  @Override
  public abstract void run() throws Exception;

  @Override
  public boolean isCanceled() {
    return false;
  }

  @Override
  public boolean isSuccess() {
    return isSuccess;
  }
}
