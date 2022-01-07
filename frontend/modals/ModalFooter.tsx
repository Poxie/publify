import React from 'react';
import styles from '../styles/Modals.module.scss';

type Props = {
    children: any;
}
export const ModalFooter: React.FC<Props> = ({ children }) => {
    return(
        <div className={styles['modal-footer']}>
            {children}
        </div>
    )
}