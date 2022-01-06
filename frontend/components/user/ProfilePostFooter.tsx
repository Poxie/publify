import React from 'react';
import styles from '../../styles/User.module.scss';
import { HeartIcon } from '../../icons/HeartIcon';
import { Flex } from '../Flex';
import { CommentsIcon } from '../../icons/CommentsIcon';
import { LikeButton } from '../LikeButton';

type Props = {
    likeCount: number;
    likes: string[];
    postId: string;
}
export const ProfilePostFooter: React.FC<Props> = ({ postId, likeCount, likes }) => {
    return(
        <Flex className={styles['post-footer']}>
            <LikeButton
                postId={postId}
            />
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