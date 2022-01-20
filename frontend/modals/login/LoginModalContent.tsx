import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ModalContent } from '../ModalContent';
import styles from '../../styles/LoginModal.module.scss';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createNotification } from '../../redux/actions';
import { useAuth } from '../../contexts/AuthProvider';
import { isIncorrectCredentials } from '../../utils/errors';
import { useModal } from '../../contexts/ModalProvider';
import { useTranslation } from 'next-i18next';

export const LoginModalContent = () => {
    const { t } = useTranslation();
    const { close } = useModal();
    const { login } = useAuth();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        if(!username || !password) return dispatch(createNotification(t('fieldsEmpty'), 'error'));

        // Validating username and password
        const user = await login(username, password).catch(error => {
            if(isIncorrectCredentials(error)) dispatch(createNotification(t('incorrectCredentials'), 'error'));
        })

        // If incorrect return
        if(!user) return;
        
        // Else closing modal
        dispatch(createNotification(t('welcomeBackUser', {username: user.displayName.split(' ')[0]}), 'success'));
        close();
    }

    return(
        <ModalContent className={styles['login-content']}>
            <Input 
                placeholder={`${t('username')}...`}
                label={t('username')}
                type={'secondary'}
                onChange={setUsername}
            />
            <Input 
                placeholder={`${t('password')}...`}
                label={t('password')}
                type={'secondary'}
                onChange={setPassword}
                onSubmit={onSubmit}
            />
            <Button className={styles['login-button']} onClick={onSubmit}>
                {t('login')}
            </Button>
        </ModalContent>
    )
}