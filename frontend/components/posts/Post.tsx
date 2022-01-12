import React from 'react';
import styles from '../../styles/Post.module.scss';
import { Flex } from '../Flex';
import { PostMain } from './PostMain';
import { PostMedia } from './PostMedia';

export const Post = () => {
    return(
        <Flex className={styles['post']}>
            <PostMedia />
            <PostMain />
        </Flex>
    )
}