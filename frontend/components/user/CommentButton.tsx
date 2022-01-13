import React from 'react';
import { Flex } from '../Flex';
import styles from '../../styles/User.module.scss';
import { CommentsIcon } from '../../icons/CommentsIcon';
import { useAppSelector } from '../../redux/hooks';
import { selectPostById } from '../../redux/selectors';
import { useRouter } from 'next/router';

type Props = {
    postId: string;
}
export const CommentButton: React.FC<Props> = ({ postId }) => {
    const router = useRouter();
    const post = useAppSelector(state => selectPostById(state, postId));
    const { commentCount } = post;

    return(
        <Flex
            className={styles['footer-item']}
            alignItems={'center'}
            onClick={() => router.push(`/posts/${postId}`)}
        >
            <CommentsIcon />
            <span className={styles['footer-item-text']}>
                {commentCount}
            </span>
        </Flex>
    )
}