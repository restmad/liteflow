# 任务版本&时间计算器
## 一、介绍
任务版本就是任务每次运行是所产生的记录；例如某个任务是每天运行一次，就相当于每天会有一个版本；每小时运行一次就说明每天有24个版本;主要应用于任务的插件配置中.
### 1.版本号
每个任务版本都有对应的版本号，版本号就是运行时间的一个变形

#### 2.不同周期的任务版本（以2019-01-31 00:00:00举例）
任务周期| 版本表达式 | 对应记录的版本号
-----| ------------- | ------------
 分钟|yyyyMMddHHmm| 201901310000
 小时|yyyyMMddHH  | 2019013100
 每日|yyyyMMdd    | 20190131
 每周|yyyyMMdd    | 20190131
 每月|yyyyMMdd    | 20190131
 每年|yyyyMMdd    | 20190131

## 二、时间计算器
### 1.介绍
对于ETL相关任务来说，任务每次运行要么绑定一个特定的时间、要么就是一个时间区间，但是每次运行时使用时时间应该与当前任务版本（运行时间）有一定的关系;

例如: 任务A，每天跑spark sql来计算昨天一天的活跃用户
```
  select count(*) from daily_active_user where day=${yesterday}
```
当前任务执行时需要获取到昨天的时间，来替换sql中的变量（${yesterday}），以便查询；而且这个变量应该跟任务版本是有关系的，这个可以通过时间计算器来动态生成

```
  yesterday=${time:yyyyMMdd, -1d}
```
通过以上表达式，会根据每个任务版本来计算出昨天的时间

### 2.使用时间表达式的方式
表达式以"${time:格式化表达式,预设值,时间加减}"的方式处理，大致支持三种形式

1.一个参数

${time:yesterday}  

2.两个参数

${time:yesterday, -1d}
${time:yyyyMMdd, -1d}
${time:yyyyMMdd, yesterday}

3.三个参数

${time:yyyyMMdd, yesterday, -d}



```
code:
    String taskVersion = "20190131";
    System.out.println("1.传参为一个参数");
    String mode1 = "${time: yesterday}";
    String mode1Result = ParamExpressionUtils.handleTimeExpression(mode1, taskVersion);
    System.out.println(mode1 + ":" + mode1Result);
    
    System.out.println("2.传参为两个参数");
    String mode2 = "${time: yesterday, -1d}";
    String mode2Result = ParamExpressionUtils.handleTimeExpression(mode2, taskVersion);
    System.out.println(mode2 + ":" + mode2Result);
    
    String mode22 = "${time: yyyyMMddhhmmss, -1d}";
    String mode22Result = ParamExpressionUtils.handleTimeExpression(mode22, taskVersion);
    System.out.println(mode22 + ":" + mode22Result);
    
    String mode23 = "${time: yyyyMMddhhmmss, yesterday}";
    String mode23Result = ParamExpressionUtils.handleTimeExpression(mode23, taskVersion);
    System.out.println(mode23 + ":" + mode23Result);
    
    System.out.println("3.传参为三个参数");
    String mode3 = "${time: yyyyMMddhhmmss, yesterday, -1d}";
    String mode3Result = ParamExpressionUtils.handleTimeExpression(mode3, taskVersion);
    System.out.println(mode3 + ":" + mode3Result);

result: 
    1.传参为一个参数
    ${time: yesterday}:2019-01-31
    2.传参为两个参数
    ${time: yesterday, -1d}:2019-01-29
    ${time: yyyyMMddhhmmss, -1d}:20190130120000
    ${time: yyyyMMddhhmmss, yesterday}:20190130120000
    3.传参为三个参数
    ${time: yyyyMMddhhmmss, yesterday, -1d}:20190129120000
```
#### 1)时间加减
表达式为：数字+单位

支持的单位：

- m:分钟
- h:小时
- d:日
- w:周
- M:月
- y:年

#### 2)预设变量
变量名| 说明 
-----| ----
 today| 今天
 yesterday| 昨天
 tomorrow| 明天
 Monday| 本周周一
 Tuesday| 本周周二
 Wednesday| 本周周三
 Thursday| 本周周四
 Friday| 本周周五
 Saturday| 本周周六
 Sunday| 本周周日
 lastMonday| 上周周一
 lastTuesday| 上周周二
 lastWednesday| 上周周三
 lastThursday| 上周周四
 lastFriday| 上周周五
 lastSaturday| 上周周六
 lastSunday| 上周周日
 monthFirstDay| 本月第一个天
 monthLastDay| 本月最后一天
 lastMonthFirstDay| 上个月第一天
 lastMonthLastDay| 上个月最后一天
 
 #### 预设变量扩展
 
 1.继承TimeParamCalculator
 
 2.在TimeExpressionUtils 中注册

## 三、总结
时间表达式的计算是以任务版本为基准，所以可以保证每次运行参数的正确性；这种方式在任务修复时会优点尤为突出，只要找到对应的任务版本，一键修复即可；不需要临时修改脚本

