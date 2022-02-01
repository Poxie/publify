import React from 'react';
import styles from '../../../styles/Settings.module.scss';

export const AccountSection: React.FC<{header: string}> = ({ header, children }) => {
    return(
        <div className={styles['account-section']}>
            <div className={styles['account-section-header']}>
                <span>
                    {header}
                </span>
            </div>
            {children}
        </div>
    )
}