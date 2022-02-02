import React from 'react';
import { useState } from 'react';
import { useAuth } from '../../../contexts/AuthProvider';
import { useChange } from '../../../contexts/ChangeProvider';
import { getMe, updateProfile } from '../../../utils';
import { SettingsMain } from '../SettingsMain';
import { NotificationType } from './NotificationType';

export const NotificationsPage = () => {
    const { user, updateUser } = useAuth();
    const { emailNotifications } = user;
    const { setChanges, close } = useChange();
    const [email, setEmail] = useState(emailNotifications);

    // Handling change
    const handleChange = (type: 'email', active: boolean) => {
        const updates = {email: setEmail};

        updates[type](active);
    }

    // Detecting changes
    const onChange = async () => {
        // Creating new object instance
        const newUser = {...user, ...{emailNotifications: email}};

        // These are expected to be type upload, is type string here
        delete newUser.avatar
        delete newUser.banner

        // Updating profile
        await updateProfile(newUser);

        // Updating local changes
        const newProfile = await getMe();
        updateUser(newProfile);
    }
    const onReset = () => {
        setEmail(emailNotifications);
    }
    if(email !== emailNotifications) {
        setChanges(onChange, onReset);
    } else {
        close();
    }

    return(
        <SettingsMain title={'Notifications'}>
            <NotificationType 
                title={'Email'}
                subtitle={'I want to be notified by email when I receive notifications.'}
                type={'email'}
                value={email}
                onChange={handleChange}
            />
        </SettingsMain>
    )
}