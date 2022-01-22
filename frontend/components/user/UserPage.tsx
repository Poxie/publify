import React from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileNavigation } from './ProfileNavigattion';
import { ProfileOverview } from './ProfileOverview';

export const UserPage = () => {
    return(
        <div>
            <ProfileHeader />
            <ProfileNavigation />
            <ProfileOverview />
        </div>
    )
}