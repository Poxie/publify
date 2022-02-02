import React from 'react';
import styles from '../../../styles/Settings.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../../contexts/AuthProvider';
import { useChange } from '../../../contexts/ChangeProvider';
import { createNotification } from '../../../redux/actions';
import { getMe, updateProfile } from '../../../utils';
import { isAuthError, isBadRequest } from '../../../utils/errors';
import { Input } from '../../Input';
import { SettingsMain } from '../SettingsMain';
import { AccountSection } from './AccountSection';
import { useTranslation } from 'next-i18next';

export const AccountPage = () => {
    const { t } = useTranslation('settings');
    const dispatch = useDispatch();
    const { setChanges, close } = useChange();
    const { user, updateUser } = useAuth();
    const { username: _username, email: _email } = user;

    const [username, setUsername] = useState(_username);
    const [email, setEmail] = useState(_email);
    const [currentPassword, setCurrentPassword] = useState('');
    const [password, setPassword] = useState('');

    // Handling changes
    const onChange = async () => {
        // Creatiang new object instance
        let newUser = {...user};
        console.log(email);
        newUser = {...user, ...{ username, email, password, currentPassword }};

        // Deleting avatar/banner (expects type upload, is of type string)
        delete newUser.avatar;
        delete newUser.banner;

        // Updating user
        await updateProfile(newUser).catch(error => {
            if(isAuthError(error)) {
                dispatch(createNotification(t('wrongPreviousPassword'), 'error'));
            }
            if(isBadRequest(error)) {
                dispatch(createNotification(t('fieldEmpty'), 'error'));
            }
        })
        const updatedUser = await getMe();
        if(!updatedUser) return;

        // Updating local value
        updateUser(updatedUser);
        setCurrentPassword('');
        setPassword('');

        // Sending notification
        dispatch(createNotification(t('accountUpdateSuccessful'), 'success'));
    }
    const onReset = () => {
        // Resetting values
        setUsername(_username);
        setEmail(_email);
        setPassword('');
    }
    
    if(username !== _username || password || email !== _email) {
        setChanges(onChange, onReset);
    } else {
        close();
    }

    return(
        <SettingsMain title={t('accountTab')}>
            <AccountSection header={'General'}>
                <Input 
                    defaultValue={username}
                    onChange={setUsername}
                    label={t('usernameLabel')}
                    placeholder={`${t('usernameLabel')}...`}
                />
                <Input 
                    defaultValue={email}
                    onChange={setEmail}
                    label={t('emailLabel')}
                    placeholder={`${t('emailLabel')}...`}
                />
                {!user.emailVerified && user.email && (
                    <span className={styles['note']}>
                        {t('waitingForConfirmation')}
                    </span>
                )}
            </AccountSection>
            <AccountSection header={t('passwordLabel')}>
                <Input 
                    defaultValue={currentPassword}
                    onChange={setCurrentPassword}
                    label={t('currentPasswordLabel')}
                    placeholder={`${t('currentPasswordLabel')}...`}
                />
                <Input 
                    defaultValue={password}
                    onChange={setPassword}
                    label={t('newPasswordLabel')}
                    placeholder={`${t('newPasswordLabel')}...`}
                />
                {password && password.length < 6 && (
                    <span className={styles['password-error']}>
                        {t('passwordLengthRequirement')}
                    </span>
                )}
            </AccountSection>
        </SettingsMain>
    )
}