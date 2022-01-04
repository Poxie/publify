import React from 'react';
import styles from '../../styles/Loading.module.scss';

type Props = {
    minWidth?: number;
    maxWidth?: number;
    height?: number;
    style?: any;
}
export const LoadingText: React.FC<Props> = ({ minWidth=80, maxWidth=250, height=20, style }) => {
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);

    return(
        <div 
            className={styles['loading-text']} 
            style={{...style, ...{ width, height }}} 
        />
    )
}