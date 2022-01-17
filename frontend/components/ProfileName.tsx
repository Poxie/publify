import React from 'react';
import styles from '../styles/Components.module.scss';

type Props = {
    displayName: string;
}
export const ProfileName: React.FC<Props> = ({ displayName }) => {
    return(
        <span className={styles['profile-name']}>
            {displayName}
        </span>
    )
}