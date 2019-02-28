package cn.lite.flow.executor.common.utils;

import com.google.common.base.Joiner;
import org.slf4j.Logger;
import org.slf4j.event.Level;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.Reader;

/**
 * 日志采集
 */
public class LogGobbler extends Thread {

  private final BufferedReader inputReader;              //输入流

  private final Logger logger;                           //日志logger

  private final Level loggingLevel;                      //日志级别

  private final CircularBuffer<String> buffer;

  public LogGobbler(final Reader inputReader,
                    final Logger logger,
                    final Level level,
                    final int bufferLines) {
    this.inputReader = new BufferedReader(inputReader);
    this.logger = logger;
    this.loggingLevel = level;
    this.buffer = new CircularBuffer<>(bufferLines);
  }

  @Override
  public void run() {
    try {

      while (!Thread.currentThread().isInterrupted()) {
        final String line = this.inputReader.readLine();
        if (line == null) {
          return;
        }
        this.buffer.append(line);
        log(line);
      }
    } catch (final IOException e) {
      error("reading from logging stream error:", e);
    }
  }

  private void log(final String message) {

    if (this.logger != null) {
      if(loggingLevel == Level.ERROR) {
        this.logger.error(message);
      }else {
        this.logger.info(message);
      }
    }
  }

  private void error(final String message, final Exception e) {

    if (this.logger != null) {
      this.logger.error(message, e);
    }
  }

  private void info(final String message, final Exception e) {

    if (this.logger != null) {
      this.logger.info(message, e);
    }
  }

  public void awaitCompletion(final long waitMs) {

    try {
      join(waitMs);
    } catch (final InterruptedException e) {
      info("I/O thread interrupted.", e);
    }
  }

  public String getRecentLog() {
    return Joiner.on(System.getProperty("line.separator")).join(this.buffer);
  }

}
