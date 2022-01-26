import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { getMyNotifications } from '../../../utils';
import { Notification as NotificationType } from '../../../utils/types';
import { Notification } from './Notification';

export const NotificationContainer = () => {
    const [notifications, setNotifications] = useState<NotificationType[]>([]);

    useEffect(() => {
        getMyNotifications()
            .then(notifs => {
                setNotifications(notifs);
            })
    }, []);

    return(
        <div className={styles['notification-container']}>
            {notifications.map(notif => {
                return(
                    <Notification 
                        {...notif}
                        key={notif.id}
                    />
                )
            })}
        </div>
    )
}