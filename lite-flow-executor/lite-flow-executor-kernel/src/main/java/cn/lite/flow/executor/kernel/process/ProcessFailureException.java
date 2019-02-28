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

package cn.lite.flow.executor.kernel.process;


import lombok.Getter;

/**
 * 进程运行失败异常
 */
@Getter
public class ProcessFailureException extends RuntimeException {

  private final int exitCode;

  private final String errorMsg;

  public ProcessFailureException(final int exitCode, final String errorMsg) {
    this.exitCode = exitCode;
    this.errorMsg = errorMsg;
  }


}
