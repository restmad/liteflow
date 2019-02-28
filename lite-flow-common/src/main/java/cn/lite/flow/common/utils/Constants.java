package cn.lite.flow.common.utils;

/**
 * 常量
 */
public class Constants {

    /**
     * 编码相关
     */
    public final static String DEFAULT_CHARSET = "UTF-8";

    /**
     * 加密相关
     */
    public final static String PWD_SALT = "lite_flow_2xke";

    /**
     * cookie相关
     */
    public final static String LITE_FLOW_COOKIE_NAME = "liteFlowCookie";
    public final static int LITE_FLOW_COOKIE_EXPIRE_TIME = 60 * 60;                     //cookie过期时间
    public final static String LITE_FLOW_COOKIE_SALT = "bGl0ZV9mbG93XzlkTzRKZzA9MmxIb3hk";
    public final static String LITE_FLOW_COOKIE_DOMIAN = "flow.cn";

    /**
     * 登录相关
     */
    public final static String LITE_FLOW_USER_LOGIN_PREFIX = "lite_flow_userId_";       //用户登陆后信息保存前缀
    public final static int LITE_FLOW_USER_LOGIN_EXPIRE_TIME = 60 * 60;                 //用户登录redis缓存时间 单位秒
    public final static String LITE_FLOW_LOGIN_URL = "login";

    /**
     * 用户信息相关
     */
    public final static String LITE_FLOW_USER_INFO_PREFIX = "lite_flow_userInfo_";      //用户信息缓存key前缀
}
