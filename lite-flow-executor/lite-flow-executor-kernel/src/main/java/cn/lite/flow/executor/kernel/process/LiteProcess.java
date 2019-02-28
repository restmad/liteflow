package cn.lite.flow.executor.kernel.process;

import cn.lite.flow.executor.common.utils.LiteThreadPool;
import cn.lite.flow.executor.common.utils.LogGobbler;
import com.google.common.base.Joiner;
import org.apache.commons.io.IOUtils;
import org.slf4j.Logger;
import org.slf4j.event.Level;

import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.lang.reflect.Field;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CountDownLatch;
import java.util.concurrent.TimeUnit;

/**
 * @description: lite进程
 * @author: yueyunyue
 * @create: 2018-08-16
 **/
public class LiteProcess {

    private static String SOFT_KILL_COMMAND = "kill %d";

    private static String EXECUTE_SOFT_KILL_COMMAND = "%s %s kill %d";

    private static String HARD_KILL_COMMAND = "kill -9 %d";

    private static String EXECUTE_HARD_KILL_COMMAND = "%s %s kill -9 %d";

    private static int LOG_BUFFER_LINE = 30;           //日志缓存行数

    private static long WAIT_LOG_COLLECT_TIME = 5000;  //等待日志搜集完成

    private final String workingDir;                   //工作目录

    private final List<String> cmd;                    //命令

    private final Map<String, String> env;             //环境参数

    private final Logger logger;

    private final CountDownLatch startupLatch;          //开始标志

    private final CountDownLatch completeLatch;         //结束标志

    private volatile int processId;                     //进程id

    private volatile boolean isSuccess = false;         //是否运行成功

    private volatile Process process;                   //进程

    private boolean isExecuteAsUser = false;            //基于某个用户执行kill命令

    private String executeAsUserBinary = null;          //

    private String effectiveUser = null;                //用户


    public LiteProcess(final List<String> cmd,
                          final Map<String, String> env,
                          final String workingDir,
                          final Logger logger) {
        this.cmd = cmd;
        this.env = env;
        this.workingDir = workingDir;
        this.processId = -1;
        this.startupLatch = new CountDownLatch(1);
        this.completeLatch = new CountDownLatch(1);
        this.logger = logger;

    }

    public LiteProcess(final List<String> cmd,
                          final Map<String, String> env,
                          final String workingDir,
                          final Logger logger,
                          final String executeAsUserBinary,
                          final String effectiveUser) {
        this(cmd, env, workingDir, logger);
        this.isExecuteAsUser = true;
        this.executeAsUserBinary = executeAsUserBinary;
        this.effectiveUser = effectiveUser;
    }
    /**
     * 运行任务
     * @throws IOException
     */
    public void run() throws IOException {

        if (this.isStarted() || this.isComplete()) {
            throw new IllegalStateException("this process can only be used once");
        }

        try {
            final ProcessBuilder builder = new ProcessBuilder(this.cmd);
            builder.directory(new File(this.workingDir));
            builder.environment().putAll(this.env);
            builder.redirectErrorStream(true);
            this.process = builder.start();
            //获取进程id
            this.processId = processId(this.process);
            if (this.processId == 0) {
                this.logger.info("can not get processId");
            } else {
                this.logger.info("get processId:" + this.processId);
            }

            this.startupLatch.countDown();

            final LogGobbler outputGobbler =
                    new LogGobbler(
                            new InputStreamReader(this.process.getInputStream(), StandardCharsets.UTF_8),
                            this.logger, Level.INFO, LOG_BUFFER_LINE);
            final LogGobbler errorGobbler =
                    new LogGobbler(
                            new InputStreamReader(this.process.getErrorStream(), StandardCharsets.UTF_8),
                            this.logger, Level.ERROR, LOG_BUFFER_LINE);

            LiteThreadPool.getInstance().execute(outputGobbler);
            LiteThreadPool.getInstance().execute(errorGobbler);
            int exitCode = -1;
            try {
                exitCode = this.process.waitFor();
            } catch (final Throwable e) {
                this.logger.info("process error,exit code is " + exitCode, e);
            }


            //进程退出前，搜集日志
            outputGobbler.awaitCompletion(WAIT_LOG_COLLECT_TIME);
            errorGobbler.awaitCompletion(WAIT_LOG_COLLECT_TIME);

            this.completeLatch.countDown();
            /**
             * 任务运行失败后，通过抛异常来标示
             */
            if (exitCode != 0) {
                final String output = new StringBuilder()
                                .append("info:\n")
                                .append(outputGobbler.getRecentLog())
                                .append("\n\n")
                                .append("error:\n")
                                .append(errorGobbler.getRecentLog())
                                .append("\n").toString();

                throw new ProcessFailureException(exitCode, output);
            }
            this.isSuccess = true;
        } finally {
            IOUtils.closeQuietly(this.process.getInputStream());
            IOUtils.closeQuietly(this.process.getOutputStream());
            IOUtils.closeQuietly(this.process.getErrorStream());
            if(this.startupLatch.getCount() > 0){
                this.startupLatch.countDown();
            }
            if(this.completeLatch.getCount() > 0){
                this.completeLatch.countDown();
            }
        }
    }

    /**
     * 等待任务结束
     * @throws InterruptedException
     */
    public void awaitCompletion() throws InterruptedException {
        this.completeLatch.await();
    }

    /**
     * 等待任务开始
     * @throws InterruptedException
     */
    public void awaitStartup() throws InterruptedException {
        this.startupLatch.await();
    }

    /**
     * 获取进程id
     * @return
     */
    public int getProcessId() {
        checkStarted();
        return this.processId;
    }

    /**
     * 优雅退出进程
     * @param time
     * @param unit
     * @return
     * @throws InterruptedException
     */
    public boolean softKill(final long time, final TimeUnit unit)
            throws InterruptedException {
        checkStarted();
        if (this.processId != 0 && isStarted()) {
            try {
                kill(EXECUTE_SOFT_KILL_COMMAND, SOFT_KILL_COMMAND);
                return this.completeLatch.await(time, unit);
            } catch (final IOException e) {
                this.logger.error("soft kill failed，processId:" + this.processId, e);
            }
            return false;
        }
        return false;
    }

    /**
     * 强制退出进程
     */
    public void hardKill() {
        checkStarted();
        if (isRunning()) {
            if (this.processId != 0) {
                try {
                    kill(EXECUTE_HARD_KILL_COMMAND, HARD_KILL_COMMAND);
                } catch (final IOException e) {
                    this.logger.error("hard kill failed，processId:" + this.processId, e);
                }
            }
            this.process.destroy();
        }
    }

    /**
     * 杀死进程
     * @param executeHardKillCommand
     * @param hardKillCommand
     * @throws IOException
     */
    private void kill(String executeHardKillCommand, String hardKillCommand) throws IOException {
        if (this.isExecuteAsUser) {
            final String cmd =
                    String.format(executeHardKillCommand, this.executeAsUserBinary,
                            this.effectiveUser, this.processId);
            Runtime.getRuntime().exec(cmd);
        } else {
            final String cmd = String.format(hardKillCommand, this.processId);
            Runtime.getRuntime().exec(cmd);
        }
    }

    /**
     * 获取进程id
     * @param process
     * @return
     */
    private int processId(final java.lang.Process process) {
        int processId = 0;
        try {
            final Field f = process.getClass().getDeclaredField("pid");
            f.setAccessible(true);
            processId = f.getInt(process);
        } catch (final Throwable e) {
            e.printStackTrace();
        }
        return processId;
    }

    /**
     * 是否开始
     */
    public boolean isStarted() {
        return this.startupLatch.getCount() == 0L;
    }

    /**
     * 是否完成
     * @return
     */
    public boolean isComplete() {
        return this.completeLatch.getCount() == 0L;
    }

    /**
     * 是否成功
     * @return
     */
    public boolean isSuccess() {
        return this.isSuccess;
    }

    /**
     * 是否正在运行中
     * @return
     */
    public boolean isRunning() {
        return isStarted() && !isComplete();
    }

    public void checkStarted() {
        if (!isStarted()) {
            throw new IllegalStateException("Process has not yet started.");
        }
    }

    @Override
    public String toString() {
        return "Process(cmd = " + Joiner.on(" ").join(this.cmd) + ", env = " + this.env
                + ", cwd = " + this.workingDir + ")";
    }

}
