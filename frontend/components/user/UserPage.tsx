import React from 'react';
import { UserType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfileHeader } from './ProfileHeader';
import { ProfileOverview } from './ProfileOverview';

export const UserPage: React.FC<UserType> = ({ id, name, avatar, banner }) => {
    return(
        <div className={styles['user-page']}>
            <ProfileHeader 
                name={name}
                avatar={avatar}
                banner={banner}
            />
            <ProfileOverview />
        </div>
    )
}