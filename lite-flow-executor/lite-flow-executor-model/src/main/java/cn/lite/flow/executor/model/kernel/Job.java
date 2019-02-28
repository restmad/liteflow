package cn.lite.flow.executor.model.kernel;

/**
 * 任务接口
 */
public interface Job {

  /**
   * 运行函数
   * @throws Exception
   */
  void run() throws Exception;

  /**
   * 取消任务
   * @throws Exception
   */
  void cancel() throws Exception;

  /**
   * 任务是否已经取消
   * @return
   */
  boolean isCanceled();

  /**
   * 是否成功
   * @return
   */
  boolean isSuccess();
}
