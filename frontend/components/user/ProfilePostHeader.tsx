import React, { useState } from 'react';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { PostOptionsContainer } from './PostOptionsContainer';
import { ProfilePostHeaderMain } from './ProfilePostHeaderMain';

interface Props {
    postId: string;
    authorId: string;
    createdAt: string;
}
export const ProfilePostHeader: React.FC<Props> = ({ postId, authorId, createdAt }) => {
    return(
        <Flex 
            className={styles['post-header']}
            justifyContent={'space-between'}
        >
            <ProfilePostHeaderMain 
                createdAt={createdAt}
            />
            <PostOptionsContainer 
                postId={postId}
                authorId={authorId}
            />
        </Flex>
    )
}