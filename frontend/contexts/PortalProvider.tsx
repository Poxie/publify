import React from 'react';
import styles from '../styles/Portal.module.scss';
import { useState } from 'react';
import { Flex } from '../components/Flex';
import { CloseIcon } from '../icons/CloseIcon';
import { useRef } from 'react';
import { useDeviceType } from '../hooks/useDeviceType';

const PortalContext = React.createContext({} as {
    setPortal: (portal: any, header?: any) => void;
    close: () => void;
})

export const usePortal = () => React.useContext(PortalContext);

export const PortalProvider: React.FC = ({ children }) => {
    const deviceType = useDeviceType();
    const [portal, setPortal] = useState(null);
    const [header, setHeader] = useState(null);
    const prevSwipe = useRef({ y: typeof window !== 'undefined' ? window.innerHeight : 0 });
    const ref = useRef<HTMLDivElement>(null);
    const backdrop = useRef<HTMLDivElement>(null);

    const setPortalFunction = (portal: any, header?: any) => {
        setPortal(portal);
        if(header) {
            setHeader(header);
        }
    }

    const close = () => {
        if(deviceType === 'mobile') {
            return closeMobilePortal();
        }
        setPortal(null);
    }

    const value = {
        setPortal: setPortalFunction,
        close
    }

    // Mobile portal
    const handleSwipe = (e: React.TouchEvent<HTMLDivElement>) => {
        document.body.style.overflow = 'hidden';
        if(!ref.current) return;
        if(ref.current.scrollTop > 40) return;

        // @ts-ignore
        const pageY = e.targetTouches[0].pageY
        const fromTop = pageY - ref.current.getBoundingClientRect().top;
        console.log(e);
        let y = pageY - fromTop;
        if(prevSwipe.current.y - pageY > 0) {
            y -= 5;
        } else {
            y += 5;
        }

        const ratio = y / window.innerHeight;
        const percentage = ratio * 100;

        if(percentage < 17) return;

        ref.current.style.top = `${percentage}%`;
        ref.current.scrollTo({ top: 0 });
        prevSwipe.current = { y: pageY };
    }
    const onSwipeStop = () => {
        const ratio = ref.current.offsetTop / window.innerHeight;
        if(ratio * 100 > 55) {
            closeMobilePortal();
        }
    }
    const closeMobilePortal = () => {
        document.body.style.overflow = '';
        ref.current.style.transition = 'top .4s';

        setTimeout(() => {
            ref.current.style.top = '100%';
            backdrop.current.style.opacity = '0';

            setTimeout(() => {
                setPortal(null);
                ref.current.style.transition = '';
                ref.current.style.top = '';
            }, 400);
        }, 0);
    }

    const className = [styles['container'], portal && styles['has-portal']].join(' ');
    return(
        <PortalContext.Provider value={value}>
            <Flex className={portal && styles['portal-open']}>
                <div style={{flex: 1, width: '100%'}}>
                    {children}
                </div>
                {deviceType === 'mobile' && portal && (
                    <div ref={backdrop} className={styles['backdrop']} onClick={closeMobilePortal} />
                )}
                <div className={className} onTouchMove={handleSwipe} onTouchEnd={onSwipeStop} ref={ref}>
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