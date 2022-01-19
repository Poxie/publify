import React from 'react';
import styles from '../../styles/RegisterModal.module.scss';
import { Flex } from '../../components/Flex';
import { useModal } from '../../contexts/ModalProvider';
import { ModalFooter } from '../ModalFooter';
import { Button } from '../../components/Button';
import { RegisterDetailModal } from './RegisterDetailModal';

type Props = {
    username: string;
    password: string;
}
export const RegisterModalFooter: React.FC<Props> = ({ username, password }) => {
    const { goBack, setModal } = useModal();

    // Showing more account settings settings
    const goNext = () => {
        setModal(
            <RegisterDetailModal 
                username={username}
                password={password}
            />
        )
    }

    return(
        <ModalFooter>
            <Flex 
                justifyContent={'space-between'}
                alignItems={'center'}
                className={styles['footer']}
            >
                <span onClick={goBack}>
                    Login instead
                </span>
                <Button onClick={goNext}>
                    Next
                </Button>
            </Flex>
        </ModalFooter>
    )
}