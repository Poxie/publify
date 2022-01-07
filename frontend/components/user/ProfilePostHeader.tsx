import React, { useState } from 'react';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { PostOptionsContainer } from './PostOptionsContainer';
import { ProfilePostHeaderMain } from './ProfilePostHeaderMain';

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
            <ProfilePostHeaderMain 
                name={name}
                avatar={avatar}
            />
            <PostOptionsContainer 
                postId={postId}
                authorId={authorId}
            />
        </Flex>
    )
}