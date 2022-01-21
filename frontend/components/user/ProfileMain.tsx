import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import styles from '../../styles/User.module.scss';
import { CreatePost } from './CreatePost';
import { ProfilePostContainer } from './ProfilePostContainer';

export const ProfileMain = () => {
    const { user } = useAuth();
    const profile = useAppSelector(state => selectProfileUser(state));

    const isSelfProfile = user?.id === profile.id;
    return(
        <div className={styles['profile-main']}>
            {isSelfProfile && (
                <CreatePost />
            )}
            <ProfilePostContainer />
        </div>
    )
}