import React from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { NotificationIcon } from '../../../icons/NotificationIcon';
import { useState } from 'react';
import { NotificationContainer } from './NotificationContainer';

export const Notifications = () => {
    const [open, setOpen] = useState(false);

    const toggle = () => {
        setOpen(prev => !prev);
    }

    return(
        <div className={styles['button']} onClick={toggle}>
            <NotificationIcon />
            {open && (
                <NotificationContainer />
            )}
        </div>
    )
}