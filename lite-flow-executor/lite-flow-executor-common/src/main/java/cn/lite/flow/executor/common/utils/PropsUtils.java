package cn.lite.flow.executor.common.utils;

import com.alibaba.fastjson.JSONObject;
import com.google.common.collect.MapDifference;
import com.google.common.collect.Maps;
import org.apache.commons.lang3.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.File;
import java.io.IOException;
import java.util.Arrays;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class PropsUtils {

  private static final Logger logger = LoggerFactory.getLogger(PropsUtils.class);

  private static final Pattern VARIABLE_REPLACEMENT_PATTERN = Pattern
      .compile("\\$\\{([a-zA-Z_.0-9]+)\\}");


  public static boolean endsWith(final File file, final String... suffixes) {
    for (final String suffix : suffixes) {
      if (file.getName().endsWith(suffix)) {
        return true;
      }
    }
    return false;
  }

  public static boolean isVariableReplacementPattern(final String str) {
    final Matcher matcher = VARIABLE_REPLACEMENT_PATTERN.matcher(str);
    return matcher.matches();
  }


  private static String resolveVariableReplacement(final String value, final Props props,
      final LinkedHashSet<String> visitedVariables) {
    final StringBuffer buffer = new StringBuffer();
    int startIndex = 0;

    final Matcher matcher = VARIABLE_REPLACEMENT_PATTERN.matcher(value);
    while (matcher.find(startIndex)) {
      if (startIndex < matcher.start()) {
        // Copy everything up front to the buffer
        buffer.append(value.substring(startIndex, matcher.start()));
      }

      final String subVariable = matcher.group(1);
      // Detected a cycle
      if (visitedVariables.contains(subVariable)) {
        throw new IllegalArgumentException(String.format(
            "Circular variable substitution found: [%s] -> [%s]",
            StringUtils.join(visitedVariables, "->"), subVariable));
      } else {
        // Add substitute variable and recurse.
        final String replacement = props.get(subVariable);
        visitedVariables.add(subVariable);

        if (replacement == null) {
          throw new UndefinedPropertyException(String.format(
              "Could not find variable substitution for variable(s) [%s]",
              StringUtils.join(visitedVariables, "->")));
        }

        buffer.append(resolveVariableReplacement(replacement, props,
            visitedVariables));
        visitedVariables.remove(subVariable);
      }

      startIndex = matcher.end();
    }

    if (startIndex < value.length()) {
      buffer.append(value.substring(startIndex));
    }

    return buffer.toString();
  }


  public static String toJSONString(final Props props, final boolean localOnly) {
    final Map<String, String> map = toStringMap(props, localOnly);
    return JSONObject.toJSONString(map);
  }

  public static Map<String, String> toStringMap(final Props props, final boolean localOnly) {
    final HashMap<String, String> map = new HashMap<>();
    final Set<String> keyset = localOnly ? props.localKeySet() : props.getKeySet();

    for (final String key : keyset) {
      final String value = props.get(key);
      map.put(key, value);
    }

    return map;
  }



  /**
   * @return the difference between oldProps and newProps.
   */
  public static String getPropertyDiff(Props oldProps, Props newProps) {

    final StringBuilder builder = new StringBuilder("");

    // oldProps can not be null during the below comparison process.
    if (oldProps == null) {
      oldProps = new Props();
    }

    if (newProps == null) {
      newProps = new Props();
    }

    final MapDifference<String, String> md =
        Maps.difference(toStringMap(oldProps, false), toStringMap(newProps, false));

    final Map<String, String> newlyCreatedProperty = md.entriesOnlyOnRight();
    if (newlyCreatedProperty != null && newlyCreatedProperty.size() > 0) {
      builder.append("Newly created Properties: ");
      newlyCreatedProperty.forEach((k, v) -> {
        builder.append("[ " + k + ", " + v + "], ");
      });
      builder.append("\n");
    }

    final Map<String, String> deletedProperty = md.entriesOnlyOnLeft();
    if (deletedProperty != null && deletedProperty.size() > 0) {
      builder.append("Deleted Properties: ");
      deletedProperty.forEach((k, v) -> {
        builder.append("[ " + k + ", " + v + "], ");
      });
      builder.append("\n");
    }

    final Map<String, MapDifference.ValueDifference<String>> diffProperties = md.entriesDiffering();
    if (diffProperties != null && diffProperties.size() > 0) {
      builder.append("Modified Properties: ");
      diffProperties.forEach((k, v) -> {
        builder.append("[ " + k + ", " + v.leftValue() + "-->" + v.rightValue() + "], ");
      });
    }
    return builder.toString();
  }
}
