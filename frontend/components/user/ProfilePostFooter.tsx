import React from 'react';
import styles from '../../styles/User.module.scss';
import { HeartIcon } from '../../icons/HeartIcon';
import { Flex } from '../Flex';
import { CommentsIcon } from '../../icons/CommentsIcon';
import { LikeButton } from '../LikeButton';
import { CommentButton } from './CommentButton';

type Props = {
    postId: string;
}
export const ProfilePostFooter: React.FC<Props> = ({ postId }) => {
    return(
        <Flex className={styles['post-footer']}>
            <LikeButton
                postId={postId}
            />
            <CommentButton 
                postId={postId}
            />
        </Flex>
    )
}