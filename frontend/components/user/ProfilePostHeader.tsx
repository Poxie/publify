import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';

interface Props {
    name: string;
    avatar: string;
}
export const ProfilePostHeader: React.FC<Props> = ({ name, avatar }) => {
    return(
        <div className={styles['post-header']}>
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
        </div>
    )
}