import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { addCommentLike, removeCommentLike } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentById, selectReplyById } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';

type Props = {
    toggleReplies: () => void;
    commentId: string;
    replyId?: string;
}
export const CommentOptions: React.FC<Props> = ({ toggleReplies, commentId, replyId }) => {
    const { user } = useAuth();
    const userId = user?.id;
    const dispatch = useDispatch();
    const { likes } = replyId ? useAppSelector(state => selectReplyById(state, commentId, replyId)) : useAppSelector(state => selectCommentById(state, commentId));
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
            <span onClick={toggleReplies}>
                Reply
            </span>
            <span onClick={toggleLike}>
                {isLiked ? 'Unlike' : 'Like'}
            </span>
        </div>
    )
}