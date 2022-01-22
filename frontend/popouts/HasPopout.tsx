import React from 'react';
import { useEffect } from 'react';
import { useRef } from 'react';
import { usePopouts } from '../contexts/PopoutProvider';

type Props = {
    popout: any;
    children: any;
}
export const HasPopout: React.FC<Props> = ({ popout, children }) => {
    const { setPopout, close, hasPopout } = usePopouts();
    const origin = useRef<HTMLDivElement>(null);
    const isHovering = useRef(false);

    // On element unmount, close popout
    useEffect(() => {
        return close;
    }, []);

    // Handle mouse enter
    const onMouseEnter = () => {
        isHovering.current = true;
        
        setTimeout(() => {
            if(hasPopout || !isHovering.current) return;
            setPopout(popout, origin);
        }, 250);
    }
    // Handle mouse leave
    const onMouseLeave = () => {
        isHovering.current = false;
    }

    return(
        <div 
            ref={origin}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
        >
            {children}
        </div>
    )
}