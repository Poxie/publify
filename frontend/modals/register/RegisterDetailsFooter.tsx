import React from 'react';
import styles from '../../styles/RegisterModal.module.scss';
import { Flex } from '../../components/Flex';
import { useModal } from '../../contexts/ModalProvider';
import { ModalFooter } from '../ModalFooter';
import { Button } from '../../components/Button';

type Props = {
    onCreate: () => void;
}
export const RegisterDetailsFooter: React.FC<Props> = ({ onCreate }) => {
    const { goBack } = useModal();

    return(
        <ModalFooter>
            <Flex 
                justifyContent={'space-between'}
                alignItems={'center'}
                className={styles['footer']}
            >
                <span onClick={goBack}>
                    Go back
                </span>
                <Button onClick={onCreate}>
                    Create
                </Button>
            </Flex>
        </ModalFooter>
    )
}