import React from 'react';
import { Input } from '../../components/Input';
import styles from '../../styles/RegisterModal.module.scss';
import { ModalContent } from '../ModalContent';

type Props = {
    updateProperty: (proprty: 'username' | 'password', value: string) => void; 
}
export const RegisterModalContent: React.FC<Props> = ({ updateProperty }) => {
    return(
        <ModalContent className={styles['modal-content']}>
            <Input 
                label={'Username'}
                placeholder={'Username...'}
                type={'secondary'}
                onChange={value => updateProperty('username', value)}
            />
            <Input 
                label={'Password'}
                placeholder={'Password...'}
                type={'secondary'}
                onChange={value => updateProperty('password', value)}
            />
        </ModalContent>
    )
}