import { useTranslation } from 'next-i18next';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { addCommentLike, removeCommentLike } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentById } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';

type Props = {
    toggleReplies: () => void;
    commentId: string;
    replyId?: string;
    type?: 'reply' | 'comment';
}
export const CommentOptions: React.FC<Props> = ({ toggleReplies, commentId, replyId, type }) => {
    const { t } = useTranslation('post');
    const { user } = useAuth();
    const userId = user?.id;
    const dispatch = useDispatch();
    const { likes } = useAppSelector(state => selectCommentById(state, commentId, replyId));
    const isLiked = likes.includes(userId);

    const toggleLike = () => {
        if(isLiked) {
            dispatch(removeCommentLike(userId, commentId, replyId));
        } else {
            dispatch(addCommentLike(userId, commentId, replyId));
        }
    }

    return(
        <div className={styles['comment-options']}>
            {type === 'comment' && (
                <span onClick={toggleReplies}>
                    {t('replyButton')}
                </span>
            )}
            <span onClick={toggleLike}>
                {isLiked ? t('unlikeButton') : t('likeButton')}
            </span>
        </div>
    )
}