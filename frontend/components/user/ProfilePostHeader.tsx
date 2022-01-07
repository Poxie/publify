import React, { useState } from 'react';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { PostOptionsContainer } from './PostOptionsContainer';

interface Props {
    name: string;
    avatar: string;
    postId: string;
    authorId: string;
}
export const ProfilePostHeader: React.FC<Props> = ({ name, avatar, postId, authorId }) => {
    return(
        <Flex 
            className={styles['post-header']}
            justifyContent={'space-between'}
        >
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
            <PostOptionsContainer 
                postId={postId}
                authorId={authorId}
            />
        </Flex>
    )
}