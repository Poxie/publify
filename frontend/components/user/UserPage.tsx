import React from 'react';
import { UserType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfileHeader } from './ProfileHeader';
import { ProfileOverview } from './ProfileOverview';

export const UserPage: React.FC<UserType> = ({ id, displayName, avatar, banner }) => {
    return(
        <div>
            <ProfileHeader 
                name={displayName}
                avatar={avatar}
                banner={banner}
                id={id}
            />
            <ProfileOverview />
        </div>
    )
}