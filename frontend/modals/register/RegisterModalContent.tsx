import { useTranslation } from 'next-i18next';
import React from 'react';
import { Input } from '../../components/Input';
import styles from '../../styles/RegisterModal.module.scss';
import { ModalContent } from '../ModalContent';

type Props = {
    updateProperty: (proprty: 'username' | 'password', value: string) => void; 
}
export const RegisterModalContent: React.FC<Props> = ({ updateProperty }) => {
    const { t } = useTranslation();
    return(
        <ModalContent className={styles['modal-content']}>
            <Input 
                label={t('username')}
                placeholder={`${t('username')}...`}
                type={'secondary'}
                onChange={value => updateProperty('username', value)}
            />
            <Input 
                label={t('password')}
                placeholder={`${t('password')}...`}
                type={'secondary'}
                onChange={value => updateProperty('password', value)}
            />
        </ModalContent>
    )
}