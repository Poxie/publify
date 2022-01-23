import React from 'react';
import styles from '../../styles/Loading.module.scss';

type Props = {
    height: number | string;
    width: number | string;
}
export const LoadingImage: React.FC<Props> = ({ width, height }) => {
    return(
        <div 
            className={styles['loading-image']} 
            style={{ width, height }}
        />
    )
}