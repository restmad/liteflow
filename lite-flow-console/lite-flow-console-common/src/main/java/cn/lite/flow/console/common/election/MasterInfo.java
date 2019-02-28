package cn.lite.flow.console.common.election;

/**
 * @description: 选主
 * @author: yueyunyue
 * @create: 2018-08-09
 **/
public class MasterInfo {

    private static volatile boolean IS_MASTER = false;

    public static boolean isMaster(){
        return IS_MASTER;
    }

    public static void setIsMaster(boolean isMaster) {
        IS_MASTER = isMaster;
    }
}
