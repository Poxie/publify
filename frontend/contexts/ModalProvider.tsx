import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { Flex } from '../components/Flex';
import styles from '../styles/Modals.module.scss';

type ModalContextType = {
    setModal: (modal: any, minWidth?: number, maxWidth?: number) => void;
    close: () => void;
    goBack: () => void;
}

const ModalContext = React.createContext({} as ModalContextType);

export const useModal = () => React.useContext(ModalContext);

type Props = {
    children: any;
}
export const ModalProvider: React.FC<Props> = ({ children }) => {
    const [modals, setModals] = useState([]);
    const [activeModal, setActiveModal] = useState(null);
    const [newModal, setNewModal] = useState(null);
    const [dimensions, setDimensions] = useState({minWidth: 450, maxWidth: 450});
    const [animatingOut, setAnimatingOut] = useState(false);
    const [animatingNewModal, setAnimatingNewModal] = useState<false | 'left' | 'right'>(false);
    const [maxHeight, setMaxHeight] = useState(2000);
    const modalCount = useRef(0);
    const newModalRef = useRef<HTMLDivElement>(null);
    const currentModalRef = useRef<HTMLDivElement>(null);

    // On current modal mount, set new maxHeight
    useEffect(() => {
        if(!currentModalRef.current) return;
        setMaxHeight(currentModalRef.current.offsetHeight)
    }, [currentModalRef.current]);

    // Setting modal
    const setModalFunction = (modal: any, minWidth?: number, maxWidth?: number) => {
        // Appending new modal
        setModals(previous => [...previous, ...[modal]]);

        // Updating current modal
        setActiveModal(previous => {
            if(!previous) {
                return modal
            } else {
                setNewModal(modal);
            }
            return previous;
        });

        if(minWidth !== undefined) {
            setDimensions(previous => ({...previous, ...{ minWidth }}))
        }
        if(maxWidth !== undefined) {
            setDimensions(previous => ({...previous, ...{maxWidth}}));
        }
    }

    useEffect(() => {
        const prevModalCount = modalCount.current;
        const newModalCount = modals.length
        if(!prevModalCount) modalCount.current = 1;
        if(!prevModalCount || prevModalCount === newModalCount) return;

        // Determining if modal is pushed or popped
        if(newModalCount < prevModalCount) {
            setAnimatingNewModal('left')
            modalCount.current--;
        } else {
            setAnimatingNewModal('right');
            modalCount.current++;
        }

        // Setting new max height (animating height)
        setMaxHeight(newModalRef.current?.offsetHeight);

        // Setting new modal as active modal after animation
        setTimeout(() => {
            setNewModal(previous => {
                setActiveModal(previous);
                return null;
            })
            setAnimatingNewModal(false);
        }, 500);
    }, [modals, newModal]);

    // Closing modal
    const close = () => {
        setAnimatingOut(true);
        setTimeout(() => {
            setModals([]);
            setActiveModal(null);
            modalCount.current = 0;
            setAnimatingOut(false);
        }, 400);
    }

    // Going back to previous modal
    const goBack = () => {
        if(animatingNewModal) return;
        setModals(previous => {
            // Removing last item of modals
            const newModals = [...previous];
            newModals.pop();
            const newModal = newModals[newModals.length - 1];

            // If there is nothing to go back to, close modal
            if(!newModal) {
                close();
                return previous;
            }

            // Else going back
            setNewModal(newModal);
            return newModals;
        });
    }

    const value = {
        setModal: setModalFunction,
        close,
        goBack
    }

    const containerStyles = [
        styles['modal-container'], 
        animatingOut ? styles['animating-out'] : '',
        animatingNewModal ? styles['animating-new-modal'] : '',
        animatingNewModal === 'left' ? styles['left'] : '',
        animatingNewModal === 'right' ? styles['right'] : ''
    ].join(' ');
    return(
        <ModalContext.Provider value={value}>
            {children}
            <div className={containerStyles}>
                {modals.length && (
                    <>
                    <div className={styles['backdrop']} onClick={goBack} />
                    <Flex 
                        className={styles['modal']}
                        style={{ 
                            minWidth: dimensions.minWidth,
                            maxWidth: dimensions.maxWidth,
                            maxHeight,
                        }}
                        alignItems={'center'}
                    >
                        <Flex className={styles["multiple-container"]} alignItems={'center'}>
                            <div 
                                ref={currentModalRef}
                            >
                                {activeModal}
                            </div>
                            <div ref={newModalRef}>
                                {newModal}
                            </div>
                        </Flex>
                    </Flex>
                    </>
                )}
            </div>
        </ModalContext.Provider>
    )
}