import React from 'react';
import styles from '../../styles/LoginModal.module.scss';
import { Flex } from '../../components/Flex';
import { useModal } from '../../contexts/ModalProvider';
import { ModalFooter } from '../ModalFooter';
import { RegisterModal } from '../register/RegisterModal';
import { useTranslation } from 'next-i18next';

export const LoginModalFooter = () => {
    const { t } = useTranslation();
    const { setModal } = useModal();

    const onClick = () => {
        setModal(<RegisterModal />);
    }

    return(
        <ModalFooter>
            <Flex 
                justifyContent={'center'}
                onClick={onClick}
                className={styles['footer']}
            >
                <span>
                    {t('noAccountText')}
                </span>
            </Flex>
        </ModalFooter>
    )
}