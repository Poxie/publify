import React from 'react';
import { PostHeader } from './PostHeader';
import styles from '../../styles/Post.module.scss';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';
import { PostComments } from './PostComments';
import { AddComment } from './AddComment';
import { useAuth } from '../../contexts/AuthProvider';
import { Flex } from '../Flex';

export const PostMain = () => {
    const { user } = useAuth();

    return(
        <Flex className={styles['post-main']} flexDirection={'column'}>
            <PostHeader />
            <PostContent />
            <PostFooter />
            {user && (
                <AddComment />
            )}
            <PostComments />
        </Flex>
    )
}