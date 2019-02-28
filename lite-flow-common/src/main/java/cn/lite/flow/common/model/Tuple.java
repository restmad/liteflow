package cn.lite.flow.common.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.io.Serializable;

/**
 * 二维元数据
 * @param <A>
 * @param <B>
 */
@NoArgsConstructor
@AllArgsConstructor
@Data
@ToString
public class Tuple<A, B> implements Serializable {

    private A a;

    private B b;

}
