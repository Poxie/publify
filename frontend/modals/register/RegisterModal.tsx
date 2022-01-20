import { useTranslation } from 'next-i18next';
import React, { useState } from 'react';
import { useModal } from '../../contexts/ModalProvider';
import { ModalFooter } from '../ModalFooter';
import { ModalHeader } from '../ModalHeader';
import { RegisterModalContent } from './RegisterModalContent';
import { RegisterModalFooter } from './RegisterModalFooter';

export const RegisterModal = () => {
    const { t } = useTranslation();
    const { goBack } = useModal();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    // Updating properties
    const updateProperty = (property: 'username' | 'password', value: string) => {
        if(property === 'username') {
            setUsername(value);
        } else if(property === 'password') {
            setPassword(value);
        }
    }

    return(
        <div>
            <ModalHeader>
                {t('createAccountHeader')}
            </ModalHeader>
            <RegisterModalContent updateProperty={updateProperty} />
            <RegisterModalFooter 
                username={username}
                password={password}
            />
        </div>
    )
}