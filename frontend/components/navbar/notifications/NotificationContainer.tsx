import { useTranslation } from 'next-i18next';
import React from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { getMyNotifications, readMyNotifications } from '../../../utils';
import { Notification as NotificationType } from '../../../utils/types';
import { Flex } from '../../Flex';
import { Notification } from './Notification';

export const NotificationContainer = () => {
    const { t } = useTranslation();
    const [notifications, setNotifications] = useState<NotificationType[]>([]);
    const ref = useRef<HTMLDivElement>(null);
    const isFetching = useRef(false);
    const length = useRef(notifications.length);

    // On notification lenth change, update current value
    useEffect(() => {
        length.current = notifications.length;
    }, [notifications.length])

    useEffect(() => {
        // Initial notification fetching
        getMyNotifications().then(notifs => {
            setNotifications(notifs);
            readMyNotifications();
        })

        // More notifications on scroll
        if(!ref.current) return;
        const onScroll = async () => {
            if(!ref.current) return;

            // Determining scroll postion
            const fullScroll = ref.current.scrollHeight - ref.current.offsetHeight;
            const scroll = ref.current.scrollTop;
            const diff = fullScroll - scroll;
            
            // If difference is within threshhold, load more notifications
            if(diff < 200 && !isFetching.current) {
                isFetching.current = true;
                const startIndex = length.current;
                const endIndex = startIndex + 8;
                const notifs = await getMyNotifications(startIndex, endIndex);
                setNotifications(previous => [...previous, ...notifs]);

                // If more notifications found
                if(notifs.length) {
                    isFetching.current = false;
                } else {
                    ref.current?.removeEventListener('scroll', onScroll);
                }
            }
        }

        ref.current.addEventListener('scroll', onScroll);
        return () => ref.current?.removeEventListener('scroll', onScroll);
    }, []);

    return(
        <div className={styles['notification-container']} ref={ref}>
            {notifications.map(notif => {
                return(
                    <Notification 
                        {...notif}
                        key={notif.id}
                    />
                )
            })}
            {!isFetching.current && length.current === 0 && (
                <Flex className={styles['empty']} alignItems={'center'} flexDirection={'column'}>
                    <span className={styles['empty-header']}>
                        {t('emptyNotificationsTitle')}
                    </span>
                    <span>
                        {t('emptyNotificationsSubtitle')}
                    </span>
                </Flex>
            )}
        </div>
    )
}