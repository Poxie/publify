import React from 'react';
import styles from '../../styles/Loading.module.scss';
import { LoadingAvatar } from "./LoadingAvatar"
import { LoadingBanner } from './LoadingBanner';
import { LoadingText } from "./LoadingText"

export const LoadingProfile = () => {
    return(
        <div className={styles['loading-profile']}>
            <LoadingBanner />
            <LoadingAvatar size={70} />
            <LoadingText minWidth={80} maxWidth={170} height={24} />
            <LoadingText minWidth={120} maxWidth={190} height={16} />
        </div>
    )
}