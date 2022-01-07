import React from 'react';
import { useAppSelector } from '../redux/hooks';
import { selectNotification, selectNotificationState, selectNotificationStatus } from '../redux/selectors';
import styles from '../styles/Notifications.module.scss';

type Props = {
    children: any;
}
export const NotificationLayout: React.FC<Props> = ({ children }) => {
    const notification = useAppSelector(state => selectNotification(state));
    const notificationStatus = useAppSelector(state => selectNotificationStatus(state));
    const notificationState = useAppSelector(state => selectNotificationState(state));

    const notificationStyles = [styles['notification'], styles[notificationStatus], notificationState ? styles['animate-in'] : styles['animate-out']].join(' ');
    return(
        <>
            {children}
            {notification && (
                <div className={notificationStyles}>
                    {notification}
                </div>
            )}
        </>
    )
}