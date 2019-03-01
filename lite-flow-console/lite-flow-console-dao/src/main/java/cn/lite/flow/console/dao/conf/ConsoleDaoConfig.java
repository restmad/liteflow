package cn.lite.flow.console.dao.conf;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.session.SqlSessionFactory;
import org.mybatis.spring.SqlSessionFactoryBean;
import org.mybatis.spring.annotation.MapperScan;
import org.mybatis.spring.boot.autoconfigure.SpringBootVFS;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.Primary;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.jdbc.datasource.DataSourceTransactionManager;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.annotation.EnableTransactionManagement;
import javax.sql.DataSource;

/**
 *
 */
@Configuration
@EnableTransactionManagement
@MapperScan(basePackages = "cn.lite.flow.console.dao.mapper", sqlSessionFactoryRef = "consoleSqlSessionFactory")
public class ConsoleDaoConfig {

    @Bean("consoleDataSource")
    @Primary
    @ConfigurationProperties(prefix = "console.jdbc")
    public DataSource dataSource() {
        return new DruidDataSource();
    }

    @Bean(name = "consoleTxManager")
    public PlatformTransactionManager txManager() {
        return new DataSourceTransactionManager(dataSource());
    }

    @Bean(name = "consoleSqlSessionFactory")
    public SqlSessionFactory sqlSessionFactoryBean() throws Exception {
        SqlSessionFactoryBean sqlSessionFactoryBean = new SqlSessionFactoryBean();
        sqlSessionFactoryBean.setDataSource(dataSource());
        /**DefaultVFS在获取jar上存在问题 不加此条，打成jar包后报找不到mybatis文件中的别名的错误*/
        sqlSessionFactoryBean.setVfs(SpringBootVFS.class);
        PathMatchingResourcePatternResolver resolver = new PathMatchingResourcePatternResolver();
        sqlSessionFactoryBean.setTypeAliasesPackage("cn.lite.flow.console.model.basic");
        sqlSessionFactoryBean.setMapperLocations(resolver.getResources("classpath:mapper/*.xml"));
        return sqlSessionFactoryBean.getObject();
    }
}
