import React from 'react';
import { PostHeader } from './PostHeader';
import styles from '../../styles/Post.module.scss';
import { PostContent } from './PostContent';
import { PostFooter } from './PostFooter';

export const PostMain = () => {
    return(
        <div className={styles['post-main']}>
            <PostHeader />
            <PostContent />
            <PostFooter />
        </div>
    )
}