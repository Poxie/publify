import React from 'react';
import styles from '../../styles/User.module.scss';
import { ProfileMediaPreview } from './ProfileMediaPreview';

export const ProfileSidebar = () => {
    return(
        <div className={styles['profile-sidebar']}>
            <ProfileMediaPreview />
        </div>
    )
}