import { any } from 'prop-types';
import React, { useState } from 'react';
import styles from '../styles/Modals.module.scss';

type ModalContextType = {
    setModal: (modal: any, minWidth?: number, maxWidth?: number) => void;
    close: () => void;
}

const ModalContext = React.createContext({} as ModalContextType);

export const useModal = () => React.useContext(ModalContext);

type Props = {
    children: any;
}
export const ModalProvider: React.FC<Props> = ({ children }) => {
    const [modal, setModal] = useState<any>(null);
    const [dimensions, setDimensions] = useState({minWidth: 450, maxWidth: 450});
    const [animatingOut, setAnimatingOut] = useState(false);

    // Setting modal
    const setModalFunction = (modal: any, minWidth?: number, maxWidth?: number) => {
        setModal(modal);
        if(minWidth !== undefined) {
            setDimensions(previous => ({...previous, ...{ minWidth }}))
        }
        if(maxWidth !== undefined) {
            setDimensions(previous => ({...previous, ...{maxWidth}}));
        }
    }

    // Closing modal
    const close = () => {
        setAnimatingOut(true);
        setTimeout(() => {
            setModal(null);
            setAnimatingOut(false);
            setDimensions({minWidth: 450, maxWidth: 450});
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
                        style={{ minWidth: dimensions.minWidth, maxWidth: dimensions.maxWidth }}
                    >
                        {modal}
                    </div>
                    </>
                )}
            </div>
        </ModalContext.Provider>
    )
}