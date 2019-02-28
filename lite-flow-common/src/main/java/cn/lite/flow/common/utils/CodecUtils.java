package cn.lite.flow.common.utils;

import org.apache.commons.codec.digest.DigestUtils;

/**
 * Created by yueyunyue on 2018/10/10.
 */
public class CodecUtils {
    /**
     * 用户加密后密码
     * @param psd
     * @return
     */
   public static String encodePassword(String psd){
       return DigestUtils.md5Hex(psd + Constants.PWD_SALT);

   }

}
