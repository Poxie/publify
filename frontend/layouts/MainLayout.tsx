import React from 'react';
import styles from '../styles/MainLayout.module.scss';

type Props = {
    children: any;
}
export const MainLayout: React.FC<Props> = ({ children }) => {
    return(
        <div className="layout">
            <div className={styles['main']}>
                {children}
            </div>
        </div>
    )
}