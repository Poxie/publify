import React from 'react';
import { useRef } from 'react';
import { Flex } from '../components/Flex';
import styles from '../styles/DetectedChanges.module.scss';

type ChangeContextType = {
    close: () => void;
    setChanges: (onChange: () => void, onReset: () => void) => void;
    hasChanges: boolean;
}
const ChangeContext = React.createContext({} as ChangeContextType);

export const useChange = () => React.useContext(ChangeContext);

interface Props {
    children: any;
}
export const ChangeProvider: React.FC<Props> = ({ children }) => {
    const [hasChanges, setHasChanges] = React.useState(false);
    const [animateOut, setAnimateOut] = React.useState(false);
    const onSave = useRef<null | (() => void)>(null);
    const onReset = useRef<null | (() => void)>(null);

    const setChanges = (onChange: () => void, onAbort: () => void) => {
        onSave.current = onChange;
        onReset.current = onAbort;
        setHasChanges(true);
    }
    const close = () => {
        if(!hasChanges) return;
        setAnimateOut(true);

        setTimeout(() => {
            setHasChanges(false);
            setAnimateOut(false)
        }, 500);
    }
    const handleSave = () => {
        if(hasChanges === false || !onSave.current) return;
        onSave.current();
        close();
    }
    const handleReset = () => {
        if(!onReset.current) return;
        onReset.current();
    }

    const value = {
        hasChanges,
        setChanges,
        close
    }
    return(
        <ChangeContext.Provider value={value}>
            {children}
            <div className={styles['changes-container']}>
                {hasChanges !== false && (
                    <Flex 
                        className={styles['detected-changes'] + (animateOut ? (' ' + styles['animate-out']) : '')}
                        justifyContent={'space-between'}
                    >
                        Be careful, changes detected!

                        <div>
                            <span 
                                onClick={handleReset}
                                className={styles['reset']}
                            >
                                Reset
                            </span>
                            <span 
                                onClick={handleSave}
                                className={styles['apply']}
                            >
                                Save
                            </span>
                        </div>
                    </Flex>
                )}
            </div>
        </ChangeContext.Provider>
    )
}