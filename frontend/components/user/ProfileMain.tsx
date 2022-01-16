import React from 'react';
import styles from '../../styles/User.module.scss';
import { CreatePost } from './CreatePost';
import { ProfilePostContainer } from './ProfilePostContainer';

export const ProfileMain = () => {
    return(
        <div className={styles['profile-main']}>
            <CreatePost />
            <ProfilePostContainer />
        </div>
    )
}