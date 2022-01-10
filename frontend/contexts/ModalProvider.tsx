import { any } from 'prop-types';
import React, { useState } from 'react';
import styles from '../styles/Modals.module.scss';

type ModalContextType = {
    setModal: (modal: any, minWidth?: number) => void;
    close: () => void;
}

const ModalContext = React.createContext({} as ModalContextType);

export const useModal = () => React.useContext(ModalContext);

type Props = {
    children: any;
}
export const ModalProvider: React.FC<Props> = ({ children }) => {
    const [modal, setModal] = useState<any>(null);
    const [minWidth, setMinWidth] = useState(450);
    const [animatingOut, setAnimatingOut] = useState(false);

    // Setting modal
    const setModalFunction = (modal: any, minWidth?: number) => {
        setModal(modal);
        if(minWidth !== undefined) {
            setMinWidth(minWidth);
        }
    }

    // Closing modal
    const close = () => {
        setAnimatingOut(true);
        setTimeout(() => {
            setModal(null);
            setAnimatingOut(false);
            setMinWidth(450);
        }, 400);
    }

    const value = {
        setModal: setModalFunction,
        close
    }

    const containerStyles = [styles['modal-container'], animatingOut ? styles['animating-out'] : ''].join(' ');
    return(
        <ModalContext.Provider value={value}>
            {children}
            <div className={containerStyles}>
                {modal && (
                    <>
                    <div className={styles['backdrop']} onClick={close} />
                    <div 
                        className={styles['modal']}
                        style={{ minWidth }}
                    >
                        {modal}
                    </div>
                    </>
                )}
            </div>
        </ModalContext.Provider>
    )
}