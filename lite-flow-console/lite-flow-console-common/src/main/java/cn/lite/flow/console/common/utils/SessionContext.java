package cn.lite.flow.console.common.utils;

import cn.lite.flow.console.common.model.vo.SessionUser;
import org.springframework.stereotype.Component;

/**
 * 用户信息缓存类
 */
@Component
public class SessionContext {

    private static ThreadLocal<SessionUser> holder = new ThreadLocal<>();

    public static void setUser(SessionUser user) {
        holder.set(user);
    }

    public static SessionUser getUser() {
        return holder.get();
    }

    public static void remove() {
        holder.remove();
    }

}
