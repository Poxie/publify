import React from 'react';
import styles from '../../styles/User.module.scss';
import { HeartIcon } from '../../icons/HeartIcon';
import { Flex } from '../Flex';
import { CommentsIcon } from '../../icons/CommentsIcon';

export const ProfilePostFooter = () => {
    return(
        <Flex className={styles['post-footer']}>
            <Flex
                className={styles['footer-item']}
                alignItems={'center'}
            >
                <HeartIcon />
                <span className={styles['footer-item-text']}>
                    {Math.floor(Math.random() * 10)}
                </span>
            </Flex>
            <Flex
                className={styles['footer-item']}
                alignItems={'center'}
            >
                <CommentsIcon />
                <span className={styles['footer-item-text']}>
                    {Math.floor(Math.random() * 10)}
                </span>
            </Flex>
        </Flex>
    )
}