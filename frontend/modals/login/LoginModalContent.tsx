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

export const LoginModalContent = () => {
    const { close } = useModal();
    const { login } = useAuth();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async () => {
        if(!username || !password) return dispatch(createNotification('Fields may not be empty.', 'error'));

        // Validating username and password
        const user = await login(username, password).catch(error => {
            if(isIncorrectCredentials(error)) dispatch(createNotification('Incorrect credentials provided.', 'error'));
        })

        // If incorrect return
        if(!user) return;
        
        // Else closing modal
        dispatch(createNotification(`Welcome back, ${user.displayName.split(' ')[0]}.`, 'success'));
        close();
    }

    return(
        <ModalContent className={styles['login-content']}>
            <Input 
                placeholder={'Username...'}
                label={'Username'}
                type={'secondary'}
                onChange={setUsername}
            />
            <Input 
                placeholder={'Password...'}
                label={'Password'}
                type={'secondary'}
                onChange={setPassword}
                onSubmit={onSubmit}
            />
            <Button className={styles['login-button']} onClick={onSubmit}>
                Login
            </Button>
        </ModalContent>
    )
}