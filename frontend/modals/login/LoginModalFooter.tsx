import React from 'react';
import styles from '../../styles/LoginModal.module.scss';
import { Flex } from '../../components/Flex';
import { useModal } from '../../contexts/ModalProvider';
import { ModalFooter } from '../ModalFooter';
import { RegisterModal } from '../register/RegisterModal';

export const LoginModalFooter = () => {
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
                    I don't have an account yet.
                </span>
            </Flex>
        </ModalFooter>
    )
}