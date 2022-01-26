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
    let title;
    switch(type) {
        case 'post':
            title = `${author.displayName} published a post`
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