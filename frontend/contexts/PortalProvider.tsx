import React from 'react';
import styles from '../styles/Portal.module.scss';
import { useState } from 'react';
import { Flex } from '../components/Flex';
import { CloseIcon } from '../icons/CloseIcon';

const PortalContext = React.createContext({} as {
    setPortal: (portal: any, header?: any) => void;
    close: () => void;
})

export const usePortal = () => React.useContext(PortalContext);

export const PortalProvider: React.FC = ({ children }) => {
    const [portal, setPortal] = useState(null);
    const [header, setHeader] = useState(null);

    const setPortalFunction = (portal: any, header?: any) => {
        setPortal(portal);
        if(header) {
            setHeader(header);
        }
    }

    const close = () => {
        setPortal(null);
    }

    const value = {
        setPortal: setPortalFunction,
        close
    }

    const className = [styles['container'], portal && styles['has-portal']].join(' ');
    return(
        <PortalContext.Provider value={value}>
            <Flex>
                <div style={{flex: 1}}>
                    {children}
                </div>
                <div className={className}>
                    {portal && (
                        <>
                        <Flex className={styles['header']} justifyContent={'space-between'} alignItems={'center'}>
                            <div>
                                {header}
                            </div>
                            
                            <Flex onClick={close} alignItems={'center'}>
                                <CloseIcon />
                            </Flex>
                        </Flex>
                        {portal}
                        </>
                    )}
                </div>
            </Flex>
        </PortalContext.Provider>
    )
}