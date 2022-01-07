import React from 'react';
import { Flex } from '../components/Flex';
import { useModal } from '../contexts/ModalProvider';
import { CloseIcon } from '../icons/CloseIcon';
import styles from '../styles/Modals.module.scss';

type Props = {
    children: any;
}
export const ModalHeader: React.FC<Props> = ({ children }) => {
    const { close } = useModal();

    return(
        <div className={styles['modal-header']}>
            {children}
            
            <Flex 
                className={styles['close-modal-button']}
                alignItems={'center'}
                justifyContent={'center'}
                onClick={close}
            >
                <CloseIcon />
            </Flex>
        </div>
    )
}