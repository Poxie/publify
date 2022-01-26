import React from 'react';
import styles from '../../../styles/Navbar.module.scss';
import { UserType } from '../../../utils/types';
import { Avatar } from '../../Avatar';
import { Flex } from '../../Flex';

type Props = {
    content: string;
    author: UserType;
}
export const NotificationContent: React.FC<Props> = ({ content, author }) => {
    return(
        <Flex 
            alignItems={'center'}
            className={styles['notification-content']}
        >
            <Avatar 
                avatar={author.avatar}
                name={author.displayName}
                size={43}
            />
            <Flex 
                className={styles['notification-content-main']}
                flexDirection={'column'}
            >
                <span>
                    {content}
                </span>
                <span className={styles['notification-author']}>
                    {author.displayName}
                </span>
            </Flex>
        </Flex>
    )
}