import React from 'react';
import styles from "./Dashboard.less";

const Dashboard = (props: any) => {
    return (
    <div className={styles.welcome}>
        <div className={styles.text} style={{marginBottom: 300,}}>
            <h1 className={styles.temperature}>LITE-FLOW</h1>
        </div>
    </div>
    )
};
export default Dashboard;
