package cn.lite.flow.console.web.interceptor;

import cn.lite.flow.console.common.model.vo.SessionUser;
import cn.lite.flow.console.common.utils.SessionContext;
import cn.lite.flow.console.common.utils.ResponseUtils;
import cn.lite.flow.console.web.annotation.AuthCheckIgnore;
import org.apache.commons.collections4.CollectionUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;

/**
 * 权限拦截器
 */
public class AuthUrlInterceptor implements HandlerInterceptor {

    private static Logger LOG = LoggerFactory.getLogger(AuthUrlInterceptor.class);

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        SessionUser sessionUser = SessionContext.getUser();
        if (sessionUser == null) {
            return true;
        }
        /**
         * 超级管理员有所有的权限
         */
        if (sessionUser.getIsSuper()) {
            return true;
        }

        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;
            AuthCheckIgnore classAurhCheckIgnore = handlerMethod.getBeanType().getAnnotation(AuthCheckIgnore.class);
            AuthCheckIgnore authCheckIgnore = handlerMethod.getMethod().getAnnotation(AuthCheckIgnore.class);
            if (classAurhCheckIgnore != null || authCheckIgnore != null) {
                return true;
            }

            List<String> roleUrlList = sessionUser.getRoleUrls();
            if (CollectionUtils.isEmpty(roleUrlList)) {
                ResponseUtils.noAuth(request, response);
                return false;
            }

            /**
             * 校验权限
             */
            String requestURI = request.getRequestURI();
            for (String authUrl : roleUrlList) {
                if (requestURI.startsWith(authUrl)) {
                    LOG.info("auth url:{}", requestURI);
                    return true;
                }
            }

            ResponseUtils.noAuth(request, response);
            return false;

        }

        return true;
    }
}
