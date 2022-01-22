import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { addCommentLike, removeCommentLike } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentById } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { LikeButton } from './LikeButton';

type Props = {
    commentId: string;
    replyId?: string;
    type?: 'comment' | 'reply';
}
export const CommentMain: React.FC<Props> = ({ commentId, replyId, type='comment' }) => {
    const { user } = useAuth();
    const dispatch = useDispatch();

    // Toggling like
    const toggleLike = (state: boolean) => {
        const userId = user?.id;
        if(state) {
            dispatch(addCommentLike(userId, commentId, replyId));
        } else {
            dispatch(removeCommentLike(userId, commentId, replyId));
        }
    }

    // Determining comment - either comment or reply
    const comment = useAppSelector(state => selectCommentById(state, commentId, replyId));
    const { displayName, username } = comment.author;
    const { content, likeCount, likes } = comment;

    // Determining if user has liked comment
    const isLiked = likes.includes(user?.id);
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
            <div className={styles['comment-likes']}>
                <LikeButton 
                    isLiked={isLiked}
                    likeCount={likeCount}
                    toggle={toggleLike}
                    hasLabel={false}
                />
            </div>
        </div>
    )
}