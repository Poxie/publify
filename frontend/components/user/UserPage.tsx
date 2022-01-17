import React from 'react';
import { ProfileHeader } from './ProfileHeader';
import { ProfileOverview } from './ProfileOverview';

export const UserPage = () => {
    return(
        <div>
            <ProfileHeader />
            <ProfileOverview />
        </div>
    )
}