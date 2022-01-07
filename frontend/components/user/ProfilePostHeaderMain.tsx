import React from 'react';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import styles from '../../styles/User.module.scss';

type Props = {
    avatar: string;
    name: string;
}
export const ProfilePostHeaderMain: React.FC<Props> = ({ avatar, name }) => {
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
            <span>
                {name}
            </span>
        </Flex>
    )
}