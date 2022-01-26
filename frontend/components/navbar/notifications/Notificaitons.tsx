import React from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { NotificationIcon } from '../../../icons/NotificationIcon';
import { useState } from 'react';
import { NotificationContainer } from './NotificationContainer';
import { useEffect } from 'react';
import { getMyNotificationCount } from '../../../utils';
import { useRef } from 'react';

export const Notifications = () => {
    const [open, setOpen] = useState(false);
    const [count, setCount] = useState(0);
    const ref = useRef<HTMLDivElement>(null);

    // Fetching notification count
    useEffect(() => {
        getMyNotificationCount()
            .then(count => {
                setCount(count);
            })
    }, []);

    const toggle = () => {
        setOpen(prev => !prev);
    }
    // Detecting click outside
    useEffect(() => {
        if(!open) return;
        const handleClickOutside = (e: MouseEvent) => {
            // @ts-ignore
            if(ref.current && !ref.current.contains(e.target)) {
                toggle();
            }
        }

        // Bind the event listener
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [toggle, open]);


    const className = [styles['button'], open && styles['active-button']].join(' ');
    return(
        <div className={className} onClick={toggle} ref={ref}>
            <NotificationIcon />
            {count !== 0 && (
                <span>
                    {count}
                </span>
            )}

            {open && (
                <NotificationContainer />
            )}
        </div>
    )
}