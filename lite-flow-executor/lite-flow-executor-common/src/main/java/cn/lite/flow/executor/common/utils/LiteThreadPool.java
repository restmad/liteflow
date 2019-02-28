package cn.lite.flow.executor.common.utils;

import java.util.concurrent.ArrayBlockingQueue;
import java.util.concurrent.ThreadFactory;
import java.util.concurrent.ThreadPoolExecutor;
import java.util.concurrent.TimeUnit;
import java.util.concurrent.atomic.AtomicInteger;

/**
 * @description: lite相关的线程池
 * @author: yueyunyue
 * @create: 2018-08-27
 **/
public class LiteThreadPool {

    public static int CORE_SIZE = 20;

    public static int MAX_SIZE = 200;

    public static long ALIVE_TIME = 1000;

    public static int QUEUE_SIZE = 200;

    private static volatile ThreadPoolExecutor threadPoolExecutor;

    public static ThreadPoolExecutor getInstance(){

        if(threadPoolExecutor == null){

            synchronized (LiteThreadPool.class){

                if(threadPoolExecutor == null){
                    threadPoolExecutor = new ThreadPoolExecutor(
                            CORE_SIZE,
                            MAX_SIZE,
                            ALIVE_TIME,
                            TimeUnit.MILLISECONDS,
                            new ArrayBlockingQueue<>(QUEUE_SIZE),
                            new LiteThreadFactory());

                }

            }

        }
        return threadPoolExecutor;
    }

    /**
     * 线程创建工厂
     */
    static class LiteThreadFactory implements ThreadFactory {

        private final static AtomicInteger poolNumber = new AtomicInteger(1);

        private final ThreadGroup group;

        private final AtomicInteger threadNumber = new AtomicInteger(1);

        private final String namePrefix;

        LiteThreadFactory() {
            SecurityManager s = System.getSecurityManager();
            group = (s != null) ? s.getThreadGroup() :
                    Thread.currentThread().getThreadGroup();
            namePrefix = "lite-pool-" +
                    poolNumber.getAndIncrement() +
                    "-thread-";
        }

        public Thread newThread(Runnable r) {
            Thread t = new Thread(group, r,
                    namePrefix + threadNumber.getAndIncrement(),
                    0);
            if (t.isDaemon())
                t.setDaemon(false);
            if (t.getPriority() != Thread.NORM_PRIORITY)
                t.setPriority(Thread.NORM_PRIORITY);
            return t;
        }
    }


}

