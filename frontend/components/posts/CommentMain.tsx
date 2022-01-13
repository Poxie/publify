import Link from 'next/link';
import React from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentById, selectReplyById } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';

type Props = {
    commentId: string;
    replyId?: string;
    type?: 'comment' | 'reply';
}
export const CommentMain: React.FC<Props> = ({ commentId, replyId, type='comment' }) => {
    let comment;
    if(type === 'comment') {
        comment = useAppSelector(state => selectCommentById(state, commentId));
    } else {
        comment = useAppSelector(state => selectReplyById(state, commentId, replyId));
    }
    const { displayName, username } = comment.author;
    const { content } = comment;

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