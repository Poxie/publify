import Link from 'next/link';
import React from 'react';
import { useDispatch } from 'react-redux';
import { useAuth } from '../../contexts/AuthProvider';
import { useModal } from '../../contexts/ModalProvider';
import { LoginModal } from '../../modals/login/LoginModal';
import { addCommentLike, removeCommentLike } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectCommentById } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { createLike, destroyLike } from '../../utils';
import { isAuthError } from '../../utils/errors';
import { PopoutUsername } from '../PopoutUsername';
import { LikeButton } from './LikeButton';

type Props = {
    commentId: string;
    replyId?: string;
    type?: 'comment' | 'reply';
}
export const CommentMain: React.FC<Props> = ({ commentId, replyId, type='comment' }) => {
    const { user } = useAuth();
    const { setModal } = useModal();
    const dispatch = useDispatch();

    // Toggling like
    const toggleLike = async (state: boolean) => {
        const userId = user?.id;
        if(state) {
            const response = await createLike(replyId ? replyId : commentId).catch(error => {
                if(isAuthError(error)) {
                    setModal(<LoginModal />);
                }
            })
            if(response) {
                dispatch(addCommentLike(userId, commentId, replyId));
            }
        } else {
            await destroyLike(replyId ? replyId : commentId);
            dispatch(removeCommentLike(userId, commentId, replyId));
        }
    }

    // Determining comment - either comment or reply
    const comment = useAppSelector(state => selectCommentById(state, commentId, replyId));
    const { content, likeCount, likes } = comment;

    // Determining if user has liked comment
    const isLiked = likes.includes(user?.id);
    return(
        <div className={styles['comment-main']}>
            <PopoutUsername 
                {...comment.author}
                className={styles['comment-author']}
            />
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