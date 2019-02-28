package cn.lite.flow.console.web.test;

import cn.lite.flow.common.utils.DateUtils;
import cn.lite.flow.console.common.consts.TimeUnit;
import cn.lite.flow.console.common.model.TimeRange;
import cn.lite.flow.console.common.time.TimeCalculatorFactory;
import cn.lite.flow.console.common.time.preset.TimeParamCalculator;
import cn.lite.flow.console.common.utils.*;
import org.joda.time.DateTime;
import org.junit.Test;

import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * @description: test
 * @author: yueyunyue
 * @create: 2018-07-15
 **/
public class CalucatorTest {

    @Test
    public void test(){

        Date now = new Date();

        System.out.println(TimeCalculatorFactory.getCalculator(TimeUnit.MINUTE, now).getRange());
        System.out.println(TimeCalculatorFactory.getCalculator(TimeUnit.HOUR, now).getRange());
        System.out.println(TimeCalculatorFactory.getCalculator(TimeUnit.DAY, now).getRange());
        System.out.println(TimeCalculatorFactory.getCalculator(TimeUnit.WEEK, now).getRange());
        System.out.println(TimeCalculatorFactory.getCalculator(TimeUnit.YEAR, now).getRange());

        System.out.println(TaskVersionUtils.getTaskVersion(now, TimeUnit.MINUTE));
        System.out.println(TaskVersionUtils.getTaskVersion(now, TimeUnit.HOUR));
        System.out.println(TaskVersionUtils.getTaskVersion(now, TimeUnit.DAY));
        System.out.println(TaskVersionUtils.getTaskVersion(now, TimeUnit.WEEK));
        System.out.println(TaskVersionUtils.getTaskVersion(now, TimeUnit.MONTH));
        System.out.println(TaskVersionUtils.getTaskVersion(now, TimeUnit.YEAR));

        for (Map.Entry<String, TimeParamCalculator> entry : TimeExpressionUtils.PRESET_PARMAS.entrySet()) {
            System.out.println(entry.getKey() + ": " + entry.getValue().format(entry.getValue().calculate(new DateTime(now))));
        }

    }

    @Test
    public void testCron(){

        Date now = new Date();

        TimeRange range = TimeCalculatorFactory.getCalculator(TimeUnit.DAY, now).getRange();

        List<Date> runtimes = QuartzUtils.getRunDateTimes("0 0/30 * * * ?", range.getStartTime(), range.getEndTime());

        runtimes.forEach(date -> {
            System.out.println(DateUtils.formatToDateTimeStr(date));
        });

    }

    @Test
    public void timeExpression(){

        String expression = "startDate=${time: yyyy-MM-dd0000, -1d},\n" +
                "today=${time: today},\n" +
                "todayFormat=${time: yyyyMMdd,today},\n" +
                "yesterday=${time: today, -1d},\n" +
                "theDayBeforeYesterday=${time: yyyyMMdd,today, 0d}";
        String result = ParamExpressionUtils.handleTimeExpression(expression, "20190101");
        System.out.println(result);

    }

    @Test
    public void testExpressioinDate(){

        String taskVersion = "20190101";
        Date date = ParamExpressionUtils.expression2Date("${time: today, -2d}", taskVersion);
        System.out.println(date);

    }



}
