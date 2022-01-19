import React from 'react';
import { Button } from '../../components/Button';
import { Input } from '../../components/Input';
import { ModalContent } from '../ModalContent';
import styles from '../../styles/LoginModal.module.scss';

export const LoginModalContent = () => {
    return(
        <ModalContent className={styles['login-content']}>
            <Input 
                placeholder={'Username...'}
                label={'Username'}
                type={'secondary'}
            />
            <Input 
                placeholder={'Password...'}
                label={'Password'}
                type={'secondary'}
            />
            <Button className={styles['login-button']}>
                Login
            </Button>
        </ModalContent>
    )
}