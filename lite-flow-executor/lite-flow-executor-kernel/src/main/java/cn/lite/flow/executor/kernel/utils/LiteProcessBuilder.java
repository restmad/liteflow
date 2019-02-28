package cn.lite.flow.executor.kernel.utils;

import cn.lite.flow.executor.kernel.process.LiteProcess;
import com.google.common.base.Joiner;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import java.io.File;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

/**
 * lite process构造工具
 */
public class LiteProcessBuilder {

  private final List<String> cmd = new ArrayList<>();

  private Map<String, String> env = new HashMap<>();

  private String workingDir = System.getProperty("user.dir");

  private Logger logger;

  private boolean isExecuteAsUser = false;

  private String executeAsUserBinaryPath = null;

  private String effectiveUser = null;

  private int stdErrSnippetSize = 30;

  private int stdOutSnippetSize = 30;

  private long executorJobId;

  public LiteProcessBuilder(final String... command) {
    addArg(command);
  }

  public LiteProcessBuilder addArg(final String... command) {
    for (final String c : command) {
      this.cmd.add(c);
    }
    return this;
  }

  public LiteProcessBuilder setWorkingDir(final String dir) {
    this.workingDir = dir;
    return this;
  }

  public String getWorkingDir() {
    return this.workingDir;
  }

  public LiteProcessBuilder setWorkingDir(final File f) {
    return setWorkingDir(f.getAbsolutePath());
  }

  public LiteProcessBuilder addEnv(final String variable, final String value) {
    this.env.put(variable, value);
    return this;
  }

  public Map<String, String> getEnv() {
    return this.env;
  }

  public LiteProcessBuilder setEnv(final Map<String, String> m) {
    this.env = m;
    return this;
  }

  public int getStdErrorSnippetSize() {
    return this.stdErrSnippetSize;
  }

  public LiteProcessBuilder setStdErrorSnippetSize(final int size) {
    this.stdErrSnippetSize = size;
    return this;
  }

  public int getStdOutSnippetSize() {
    return this.stdOutSnippetSize;
  }

  public LiteProcessBuilder setStdOutSnippetSize(final int size) {
    this.stdOutSnippetSize = size;
    return this;
  }

  public LiteProcessBuilder setLogger(final Logger logger) {
    this.logger = logger;
    return this;
  }

  public LiteProcess build() {
    if (this.isExecuteAsUser) {
      return new LiteProcess(this.cmd, this.env, this.workingDir, this.logger,
          this.executeAsUserBinaryPath, this.effectiveUser);
    } else {
      return new LiteProcess(this.cmd, this.env, this.workingDir, this.logger);
    }
  }

  public List<String> getCommand() {
    return this.cmd;
  }

  public String getCommandString() {
    return Joiner.on(" ").join(getCommand());
  }

  @Override
  public String toString() {
    return "ProcessBuilder(cmd = " + Joiner.on(" ").join(this.cmd) + ", env = "
        + this.env + ", cwd = " + this.workingDir + ")";
  }

  public LiteProcessBuilder enableExecuteAsUser() {
    this.isExecuteAsUser = true;
    return this;
  }

  public LiteProcessBuilder setExecuteAsUserBinaryPath(final String executeAsUserBinaryPath) {
    this.executeAsUserBinaryPath = executeAsUserBinaryPath;
    return this;
  }

  public LiteProcessBuilder setEffectiveUser(final String effectiveUser) {
    this.effectiveUser = effectiveUser;
    return this;
  }
}
