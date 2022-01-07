import { any } from 'prop-types';
import React, { useState } from 'react';
import styles from '../styles/Modals.module.scss';

type ModalContextType = {
    setModal: (modal: any) => void;
    close: () => void;
}

const ModalContext = React.createContext({} as ModalContextType);

export const useModal = () => React.useContext(ModalContext);

type Props = {
    children: any;
}
export const ModalProvider: React.FC<Props> = ({ children }) => {
    const [modal, setModal] = useState<any>(null);

    // Setting modal
    const setModalFunction = (modal: any) => {
        setModal(modal);
    }

    // Closing modal
    const close = () => {
        setModal(null);
    }

    const value = {
        setModal: setModalFunction,
        close
    }

    return(
        <ModalContext.Provider value={value}>
            {children}
            <div className={styles['modal-container']}>
                {modal && (
                    <>
                    <div className={styles['backdrop']} />
                    <div className={styles['modal']}>
                        {modal}
                    </div>
                    </>
                )}
            </div>
        </ModalContext.Provider>
    )
}