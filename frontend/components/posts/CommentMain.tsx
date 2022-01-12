import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentById } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';

type Props = {
    commentId: string;
}
export const CommentMain: React.FC<Props> = ({ commentId }) => {
    const { content, author } = useAppSelector(state => selectCommentById(state, commentId));
    const { displayName, username } = author;

    return(
        <div className={styles['comment-main']}>
            <div className={styles['comment-author']}>
                <Link href={`/${username}`}>
                    {displayName}
                </Link>
            </div>
            <div className={styles['comment-content']}>
                {content}
            </div>
        </div>
    )
}