package cn.lite.flow.console.common.time.calculator;

import cn.lite.flow.console.common.consts.Constants;
import org.joda.time.DateTime;

import java.util.Date;

/**
 * @description: 时间粒度为时的，时间计算
 * @author: yueyunyue
 * @create: 2018-07-15 08:58
 **/
public class HourTimeCalculator extends TimeCalculator {

    public HourTimeCalculator() {
    }

    public HourTimeCalculator(Date time) {
        this.time = time;
    }

    @Override
    public Date getStartTime() {
        DateTime dateTime = new DateTime(time);
        dateTime = dateTime.withMinuteOfHour(Constants.ZERO);
        dateTime = dateTime.withSecondOfMinute(Constants.ZERO);
        return dateTime.toDate();
    }

    @Override
    public Date getEndTime() {
        DateTime dateTime = new DateTime(time);
        dateTime = dateTime.withMinuteOfHour(Constants.FIFTY_NINE);
        dateTime = dateTime.withSecondOfMinute(Constants.FIFTY_NINE);
        return dateTime.toDate();
    }
}
