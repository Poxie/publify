import React from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { getReadableTimeFromUnix } from '../../../utils';
import { Flex } from '../../Flex';

type Props = {
    type: string;
    createdAt: string;
}
export const NotificationHeader: React.FC<Props> = ({ type, createdAt }) => {
    let title;
    switch(type) {
        case 'post':
            title = 'New post has been published'
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