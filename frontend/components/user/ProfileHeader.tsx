import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import { UserProfile } from '../UserProfile';
import { ProfileNavigation } from './ProfileNavigattion';

export const ProfileHeader = () => {
    const user = useAppSelector(state => selectProfileUser(state));

    return(
        <UserProfile 
            {...user}
            hasProfileOptions={true}
        />
    )
}