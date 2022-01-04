import React from 'react';
import styles from '../../styles/Loading.module.scss';

type Props = {
    size?: number;
    hasMarginRight?: boolean;
}
export const LoadingAvatar: React.FC<Props> = ({ size=32, hasMarginRight }) => {
    return(
        <div 
            className={styles['loading-avatar']}
            style={{width: size, height: size, marginRight: hasMarginRight ? 10 : 0}}
        />
    )
}