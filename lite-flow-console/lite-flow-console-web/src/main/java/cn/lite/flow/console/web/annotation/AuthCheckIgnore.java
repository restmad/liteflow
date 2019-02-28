package cn.lite.flow.console.web.annotation;

import java.lang.annotation.*;

/**
 * 不校验url权限
 */
@Inherited
@Retention(RetentionPolicy.RUNTIME)
@Target({ElementType.METHOD, ElementType.TYPE})
public @interface AuthCheckIgnore {
}
