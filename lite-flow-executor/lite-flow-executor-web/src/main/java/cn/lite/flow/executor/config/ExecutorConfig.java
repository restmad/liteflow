package cn.lite.flow.executor.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.ImportResource;

/**
 * @description: dubbo配置
 * @author: yueyunyue
 * @create: 2019-01-07
 **/
@Configuration
@ImportResource({"classpath:spring/application-dubbo.xml"})
public class ExecutorConfig {
}
