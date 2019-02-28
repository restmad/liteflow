package cn.lite.flow.executor.common.utils;

import com.google.common.base.Joiner;
import com.google.common.collect.Iterators;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

/**
 * 可重复利用的缓存
 * @param <T>
 */
public class CircularBuffer<T> implements Iterable<T> {

  private final List<T> lines;

  private final int size;

  private int start;

  public CircularBuffer(final int size) {
    this.lines = new ArrayList<>();
    this.size = size;
    this.start = 0;
  }

  public void append(final T line) {
    if (this.lines.size() < this.size) {
      this.lines.add(line);
    } else {
      this.lines.set(this.start, line);
      this.start = (this.start + 1) % this.size;
    }
  }

  @Override
  public String toString() {
    return "[" + Joiner.on(", ").join(this.lines) + "]";
  }

  @Override
  public Iterator<T> iterator() {
    if (this.start == 0) {
      return this.lines.iterator();
    } else {
      return Iterators.concat(this.lines.subList(this.start, this.lines.size()).iterator(),
          this.lines.subList(0, this.start).iterator());
    }
  }

  public int getMaxSize() {
    return this.size;
  }

  public int getSize() {
    return this.lines.size();
  }

}
