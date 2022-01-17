import React from 'react';
import styles from '../../styles/Settings.module.scss';

type Props = {
    children: any;
    title: string;
}
export const SettingsMain: React.FC<Props> = ({ title, children }) => {
    return(
        <div className={styles['settings-main']}>
            <div className={styles['settings-header']}>
                <span>
                    {title}
                </span>
            </div>
            <div className={styles['main']}>
                {children}
            </div>
        </div>
    )
}