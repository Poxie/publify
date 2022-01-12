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

export const PostFooter = () => {
    const { id: postId, likes, likeCount, commentCount } = useAppSelector(state => selectActivePost(state));
    const dispatch = useDispatch();
    const { user } = useAuth();
    const userId = user?.id;

    // Toggling liked
    const toggleLiked = (state: boolean) => {
        if(state) {
            dispatch(addActivePostLike(postId, userId));
        } else {
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