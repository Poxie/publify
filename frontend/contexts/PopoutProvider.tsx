import React, { Dispatch, useEffect, useRef, useState } from 'react';
import { RefObject } from 'react';
import { useReducer } from 'react';
import styles from '../styles/Popouts.module.scss';

type Context = {
    setPopout: (popout: any, popoutOriginRef: RefObject<HTMLElement>) => void;
    close: () => void;
    hasPopout: boolean;
}

const PopoutContext = React.createContext({} as Context);

export const usePopouts = () => React.useContext(PopoutContext);

type Props = {
    children: any;
}
type InitialStateType = {
    popout: null | React.Component;
    position: { x: number, y: number };
    isMounted: boolean;
    popoutOriginRef: RefObject<HTMLDivElement>
}
const initialState = {
    popout: null,
    position: { x: 0, y: 0},
    isMounted: false,
    popoutOriginRef: null
} as InitialStateType;
type Action = {
    type: keyof typeof initialState | 'reset';
    payload?: any;
}
const reducer = (state=initialState, action: Action) => {
    switch(action.type) {
        case 'popout': {
            const { popout, position, popoutOriginRef } = action.payload;
            return {
                ...state,
                popout,
                position,
                popoutOriginRef
            }
        }
        case 'position': {
            const { x, y } = action.payload;
            return {
                ...state,
                position: { x, y }
            }
        }
        case 'isMounted': {
            const { isMounted } = action.payload;
            return {
                ...state,
                isMounted
            }
        }
        case 'reset':
            return initialState
        default:
            return state
    }
}
export const PopoutProvider: React.FC<Props> = ({ children }) => {
    const [state, dispatch]: [InitialStateType, Dispatch<Action>] = useReducer(reducer, initialState);
    const popoutRef = useRef<HTMLDivElement>(null);
    const hoverPopout = useRef(false);
    const hoverPopoutOrigin = useRef(false);

    // Setting popout
    const setPopoutFunction = (popout: any, popoutOriginRef: RefObject<HTMLElement>) => {
        // Getting initial popout position
        const { left, top } = popoutOriginRef.current.getBoundingClientRect();

        // Setting popout
        dispatch({
            type: 'popout',
            payload: {
                popout,
                position: { x: left, y: top },
                popoutOriginRef
            }
        })

        // Updating hover state
        hoverPopoutOrigin.current = true;
    }

    // Updating position on mount
    useEffect(() => {
        if(!popoutRef.current || !state.popout) return dispatch({
            type: 'isMounted',
            payload: { isMounted: false }
        });

        window.addEventListener('mousemove', shouldClose);

        // Determining position
        const { top: currentTop, left: currentLeft, width, height } = popoutRef.current.getBoundingClientRect();
        let newX = currentLeft - width;

        // If left position exceeds window width
        if(newX < 15) {
            const { left, width } = state.popoutOriginRef.current?.getBoundingClientRect();
            newX = left + width + 15;
        }
        
        // Determining top position
        let newY = currentTop;

        // If top position exceeds window height
        if(newY + height > window.innerHeight) {
            newY = window.innerHeight - height - 10;
        }
        
        // Dispatching new position
        dispatch({
            type: 'position',
            payload: { x: newX - 30, y: newY },
        })
        dispatch({
            type: 'isMounted',
            payload: { isMounted: true }
        })

        return () => window.removeEventListener('mousemove', shouldClose);
    }, [state.popout]);

    // Closing popout
    const close = () => {
        dispatch({
            type: 'reset'
        })
    }

    // Checking if popout should close
    const shouldClose = () => {
        if(!hoverPopoutOrigin.current && !hoverPopout.current) {
            close();
        }
    }

    // On leave
    useEffect(() => {
        if(!state.popoutOriginRef?.current) return;
        const popoutOrigin = state.popoutOriginRef.current;
        
        const handleEnter = () => {
            hoverPopoutOrigin.current = true;
        }
        const handleLeave = () => {
            hoverPopoutOrigin.current = false;
        }

        popoutOrigin.addEventListener('mouseleave', handleLeave);
        popoutOrigin.addEventListener('mouseenter', handleEnter);
        
        return () => {
            popoutOrigin.removeEventListener('mouseleave', handleLeave);
            popoutOrigin.removeEventListener('mouseenter', handleEnter);
        }
    }, [state.popoutOriginRef?.current]);

    // Mouse events on popout
    useEffect(() => {
        if(!popoutRef.current) return;
        const popout = popoutRef.current;
        
        const handleEnter = () => {
            hoverPopout.current = true;
        }
        const handleLeave = () => {
            hoverPopout.current = false;
        }

        popout.addEventListener('mouseleave', handleLeave);
        popout.addEventListener('mouseenter', handleEnter);
        
        return () => {
            popout.removeEventListener('mouseleave', handleLeave);
            popout.removeEventListener('mouseenter', handleEnter);
        }
    }, [popoutRef.current]);

    const value = {
        setPopout: setPopoutFunction,
        hasPopout: state.popout !== null,
        close
    }

    const popoutStyles = [styles['popout'], state.isMounted ? styles['mounted'] : ''].join(' ');
    return(
        <PopoutContext.Provider value={value}>
            {children}
            <div className={styles['popouts']}>
                {state.popout && (
                    <div 
                        className={popoutStyles}
                        style={{ 
                            left: state.position.x, 
                            top: state.position.y 
                        }}
                        ref={popoutRef}
                    >
                        {state.popout}
                    </div>
                )}
            </div>
        </PopoutContext.Provider>
    )
}