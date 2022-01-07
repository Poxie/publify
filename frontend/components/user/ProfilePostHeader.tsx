import React, { useState } from 'react';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { PostOptionsContainer } from './PostOptionsContainer';
import { ProfilePostHeaderMain } from './ProfilePostHeaderMain';

interface Props {
    name: string;
    username: string;
    avatar: string;
    postId: string;
    authorId: string;
    createdAt: string;
}
export const ProfilePostHeader: React.FC<Props> = ({ name, username, avatar, postId, authorId, createdAt }) => {
    return(
        <Flex 
            className={styles['post-header']}
            justifyContent={'space-between'}
        >
            <ProfilePostHeaderMain 
                name={name}
                avatar={avatar}
                createdAt={createdAt}
                username={username}
            />
            <PostOptionsContainer 
                postId={postId}
                authorId={authorId}
            />
        </Flex>
    )
}