package cn.lite.flow.executor.common.utils;

import java.util.ArrayList;

/**
 * @description:  linux shell 命令工具类；参考azkaban
 * @author: yueyunyue
 * @create: 2018-08-22
 **/
public class CommandUtils {
    /**
     * Splits the command into a unix like command line structure. Quotes and single quotes are
     * treated as nested strings.
     */
    public static String[] partitionCommandLine(final String command) {
        final ArrayList<String> commands = new ArrayList<>();

        int index = 0;

        StringBuffer buffer = new StringBuffer(command.length());
        boolean isApos = false;
        boolean isQuote = false;
        while (index < command.length()) {
            final char c = command.charAt(index);

            switch (c) {
                case ' ':
                    if (!isQuote && !isApos) {
                        final String arg = buffer.toString();
                        buffer = new StringBuffer(command.length() - index);
                        if (arg.length() > 0) {
                            commands.add(arg);
                        }
                    } else {
                        buffer.append(c);
                    }
                    break;
                case '\'':
                    if (!isQuote) {
                        isApos = !isApos;
                    } else {
                        buffer.append(c);
                    }
                    break;
                case '"':
                    if (!isApos) {
                        isQuote = !isQuote;
                    } else {
                        buffer.append(c);
                    }
                    break;
                default:
                    buffer.append(c);
            }

            index++;
        }

        if (buffer.length() > 0) {
            final String arg = buffer.toString();
            commands.add(arg);
        }

        return commands.toArray(new String[commands.size()]);
    }
}
