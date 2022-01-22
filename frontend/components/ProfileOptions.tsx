import React from 'react';
import { useAuth } from '../contexts/AuthProvider';
import styles from '../styles/User.module.scss';
import { FollowButton } from './FollowButton';
import { SettingsButton } from './SettingsButton';

type Props = {
    userId: string;
}
export const ProfileOptions: React.FC<Props> = ({ userId }) => {
    const { user } = useAuth();
    
    const isSelf = user?.id === userId;
    return(
        <div className={styles['options']}>
            {!isSelf && (
                <FollowButton 
                    userId={userId}
                />
            )}
            {isSelf && (
                <SettingsButton />
            )}
        </div>
    )
}