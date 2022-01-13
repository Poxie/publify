import React from 'react';
import styles from '../../styles/Loading.module.scss';

type Props = {
    minWidth?: number;
    maxWidth?: number;
    minHeight?: number;
    maxHeight?: number;
    height?: number;
    style?: any;
}
export const LoadingText: React.FC<Props> = ({ minWidth=80, maxWidth=250, minHeight=20, maxHeight=20, height=20, style }) => {
    const width = Math.floor(Math.random() * (maxWidth - minWidth + 1) + minWidth);
    let newHeight;
    if(height !== 20) {
        newHeight = height;
    } else {
        newHeight = Math.floor(Math.random() * (maxHeight - minHeight + 1) + minHeight);
    }

    return(
        <div 
            className={styles['loading-text']} 
            style={{...style, ...{ width, height: newHeight }}} 
        />
    )
}