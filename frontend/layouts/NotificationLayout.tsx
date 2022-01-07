import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { destroyNotification, resetNotification } from '../redux/actions';
import { useAppSelector } from '../redux/hooks';
import { selectNotification, selectNotificationState, selectNotificationStatus } from '../redux/selectors';
import styles from '../styles/Notifications.module.scss';

type Props = {
    children: any;
}
export const NotificationLayout: React.FC<Props> = ({ children }) => {
    const dispatch = useDispatch();
    const notification = useAppSelector(state => selectNotification(state));
    const notificationStatus = useAppSelector(state => selectNotificationStatus(state));
    const notificationState = useAppSelector(state => selectNotificationState(state));

    useEffect(() => {
        if(!notificationState) return;

        setTimeout(() => {
            dispatch(destroyNotification());
    
            setTimeout(() => {
                dispatch(resetNotification());
            }, 400);
        }, 5000);
    }, [notificationState]);

    const notificationStyles = [styles['notification'], styles[notificationStatus], notificationState ? styles['animate-in'] : styles['animate-out']].join(' ');
    return(
        <>
            {children}
            {notification && (
                <div className={notificationStyles} key={Math.random()}>
                    {notification}
                </div>
            )}
        </>
    )
}