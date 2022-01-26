import { useTranslation } from 'next-i18next';
import React from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { getReadableTimeFromUnix } from '../../../utils';
import { UserType } from '../../../utils/types';
import { Flex } from '../../Flex';

type Props = {
    type: string;
    createdAt: string;
    author: UserType;
}
export const NotificationHeader: React.FC<Props> = ({ author, type, createdAt }) => {
    const { t } = useTranslation();

    let title;
    switch(type) {
        case 'post':
            title = t('notificationHeader', { username: author.displayName })
    }
    return(
        <Flex 
            className={styles['notification-header']}
            justifyContent={'space-between'}
        >
            <span>
                {title}
            </span>
            <span className={styles['timestamp']}>
                {getReadableTimeFromUnix(createdAt)}
            </span>
        </Flex>
    )
}