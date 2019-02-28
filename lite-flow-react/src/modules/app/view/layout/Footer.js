import React from "react";
import config from "../../../../common/config/Config";
import styles from './main.less';

const Footer = () => <div className={styles.footer}>
    {config.footerText}
</div>;

export default Footer
