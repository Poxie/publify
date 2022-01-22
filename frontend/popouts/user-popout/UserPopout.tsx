import React from 'react';
import styles from '../../styles/UserPopout.module.scss';
import { UserProfile } from '../../components/UserProfile';
import { UserType } from '../../utils/types';
import { useRouter } from 'next/router';

export const UserPopout: React.FC<UserType> = (user) => {
    const router = useRouter();

    return(
        <UserProfile 
            {...user}
            bannerStyle={styles['banner']}
            avatarStyle={styles['avatar']}
            avatarHoverText={'View Profile'}
            onAvatarClick={() => router.push(`/${user.username}`)}
        />
    )
}