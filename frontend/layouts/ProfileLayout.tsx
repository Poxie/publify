import React from 'react';
import { ProfileHeader } from '../components/user/ProfileHeader';
import { ProfileNavigation } from '../components/user/ProfileNavigattion';

type Props = {
    children: any;
}
export const ProfileLayout = ({ children }) => {
    return(
        <>
        <ProfileHeader />
        <ProfileNavigation />
        {children}
        </>
    )
}