import React from 'react';
import { Flex } from '../Flex';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost } from '../../redux/selectors';
import { LikeButton } from './LikeButton';
import { useAuth } from '../../contexts/AuthProvider';
import { useDispatch } from 'react-redux';
import { addActivePostLike, removeActivePostLike } from '../../redux/actions';
import { CommentButton } from './CommentButton';
import { useModal } from '../../contexts/ModalProvider';
import { createLike, destroyLike } from '../../utils';
import { isAuthError } from '../../utils/errors';
import { LoginModal } from '../../modals/login/LoginModal';

export const PostFooter = () => {
    // It's find to fetch entire post, since it will only re-render on like/comment change, which it should
    const { id: postId, likes, likeCount, commentCount } = useAppSelector(state => selectActivePost(state));
    const dispatch = useDispatch();
    const { setModal } = useModal();
    const { user } = useAuth();
    const userId = user?.id;

    // Toggling liked
    const toggleLiked = async (state: boolean) => {
        if(state) {
            const response = await createLike(postId).catch(error => {
                if(isAuthError(error)) {
                    setModal(<LoginModal />);
                }
            })
            if(response) {
                dispatch(addActivePostLike(postId, userId));
            }
        } else {
            await destroyLike(postId);
            dispatch(removeActivePostLike(postId, userId));
        }
    }

    const isLiked = likes.includes(userId);
    return(
        <Flex className={styles['footer']}>
            <LikeButton
                isLiked={isLiked}
                likeCount={likeCount}
                toggle={toggleLiked} 
            />
            <CommentButton 
                commentCount={commentCount}
            />
        </Flex>
    )
}