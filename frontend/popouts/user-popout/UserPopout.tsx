import React from 'react';
import styles from '../../styles/UserPopout.module.scss';
import { UserProfile } from '../../components/UserProfile';
import { UserType } from '../../utils/types';

export const UserPopout: React.FC<UserType> = (user) => {
    return(
        <UserProfile 
            {...user}
            bannerStyle={styles['banner']}
            avatarStyle={styles['avatar']}
        />
    )
}