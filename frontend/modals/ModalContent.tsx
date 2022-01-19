import React from 'react';
import styles from '../styles/Modals.module.scss';

type Props = {
    children: any;
    className?: string;
}
export const ModalContent: React.FC<Props> = ({ children, className }) => {
    const newClassName = [styles['modal-content'], className ? className : ''].join(' ');
    return(
        <div className={newClassName}>
            {children}
        </div>
    )
}