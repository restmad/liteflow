package cn.lite.flow.common.utils;

import org.springframework.beans.BeansException;
import org.springframework.beans.factory.NoSuchBeanDefinitionException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;
import org.springframework.stereotype.Component;

/**
 * spring 帮助类
 */
public class SpringUtils implements ApplicationContextAware {

    private static ApplicationContext applicationContext = null;

    public synchronized void setApplicationContext(ApplicationContext applicationContext)
            throws BeansException {
        this.applicationContext = applicationContext;
    }

    public static Object getBean(String beanName)
            throws BeansException {
        return applicationContext.getBean(beanName);
    }

    public static <T> T getBean(Class<T> beanClass)
            throws BeansException {
        return applicationContext.getBean(beanClass);
    }

    public static <T> T getBean(String beanName, Class<T> requiredType)
            throws BeansException {
        return applicationContext.getBean(beanName, requiredType);
    }

    public static boolean containsBean(String beanName) {
        return applicationContext.containsBean(beanName);
    }

    public static boolean isSingleton(String beanName)
            throws NoSuchBeanDefinitionException {
        return applicationContext.isSingleton(beanName);
    }

    public static Class getType(String beanName)
            throws NoSuchBeanDefinitionException {
        return applicationContext.getType(beanName);
    }

    public static String[] getAliases(String beanName)
            throws NoSuchBeanDefinitionException {
        return applicationContext.getAliases(beanName);
    }

}
