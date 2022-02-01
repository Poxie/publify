import React from 'react';
import styles from '../../../styles/Settings.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../contexts/AuthProvider';
import { useChange } from '../../../contexts/ChangeProvider';
import { createNotification } from '../../../redux/actions';
import { updateProfile } from '../../../utils';
import { isAuthError, isBadRequest } from '../../../utils/errors';
import { Input } from '../../Input';
import { SettingsMain } from '../SettingsMain';
import { AccountSection } from './AccountSection';

export const AccountPage = () => {
    const dispatch = useDispatch();
    const { setChanges, close } = useChange();
    const { user, updateUser } = useAuth();
    const { username: _username } = user;

    const [username, setUsername] = useState(_username);
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');

    // Handling changes
    const onChange = async () => {
        // Creatiang new object instance
        let newUser = {...user};
        newUser = {...user, ...{ username, password, currentPassword }};

        // Deleting avatar/banner (expects type upload, is of type string)
        delete newUser.avatar;
        delete newUser.banner;

        // Updating user
        const updatedUser = await updateProfile(newUser).catch(error => {
            if(isAuthError(error)) {
                dispatch(createNotification('Wrong previous password inputted.', 'error'));
            }
            if(isBadRequest(error)) {
                dispatch(createNotification('Field may not be empty.', 'error'));
            }
        })
        if(!updatedUser) return;

        // Updating local value
        updateUser(updatedUser);
        setCurrentPassword('');
        setPassword('');

        // Sending notification
        dispatch(createNotification('Updated account successfully.', 'success'));
    }
    const onReset = () => {
        // Resetting values
        setUsername(_username);
        setPassword('');
    }
    
    if(username !== _username || password) {
        setChanges(onChange, onReset);
    } else {
        close();
    }

    return(
        <SettingsMain title={'Account'}>
            <Input 
                defaultValue={username}
                onChange={setUsername}
                label={'Username'}
                placeholder={'Username...'}
            />
            <AccountSection header={'Password'}>
                <Input 
                    defaultValue={currentPassword}
                    onChange={setCurrentPassword}
                    label={'Current password'}
                    placeholder={'Current password...'}
                />
                <Input 
                    defaultValue={password}
                    onChange={setPassword}
                    label={'New password'}
                    placeholder={'New password...'}
                />
                {password && password.length < 6 && (
                    <span className={styles['password-error']}>
                        Password must be at least 6 characters.
                    </span>
                )}
            </AccountSection>
        </SettingsMain>
    )
}