import React from 'react';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import styles from '../../styles/User.module.scss';
import { getReadableTimeFromUnix } from '../../utils';

type Props = {
    avatar: string;
    name: string;
    createdAt: string;
}
export const ProfilePostHeaderMain: React.FC<Props> = ({ avatar, name, createdAt }) => {
    return(
        <Flex
            className={styles['header-main']}
            alignItems={'center'}
        >
            <Avatar 
                avatar={avatar}
                name={name}
                className={styles['post-avatar']}
            />
            <Flex 
                flexDirection={'column'}
                className={styles['header-text']}
            >
                <span>
                    {name}
                </span>
                <span className={styles['created-at']}>
                    {getReadableTimeFromUnix(createdAt)}
                </span>
            </Flex>
        </Flex>
    )
}