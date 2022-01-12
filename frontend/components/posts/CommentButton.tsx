import React from 'react';
import { CommentsIcon } from '../../icons/CommentsIcon';
import styles from '../../styles/Post.module.scss';
import { Flex } from '../Flex';

type Props = {
    commentCount: number;
}
export const CommentButton: React.FC<Props> = ({ commentCount }) => {
    return(
        <Flex 
            className={styles['footer-item']}
            alignItems={'center'}
        >
            <CommentsIcon />
            <span>
                {commentCount} comments
            </span>
        </Flex>
    )
}