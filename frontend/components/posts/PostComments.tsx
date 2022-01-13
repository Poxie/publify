import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments, resetComments } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost, selectCommentIds } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { PostType } from '../../utils/types';
import { LoadingComments } from '../loading/LoadingComments';
import { AddComment } from './AddComment';
import { Comment } from './Comment';

export const PostComments = () => {
    const { id }: PostType = useAppSelector(state => selectActivePost(state));
    const commentIds = useAppSelector(state => selectCommentIds(state));
    const dispatch = useDispatch();

    // Fetching comments
    useEffect(() => {
        dispatch(fetchComments(id));

        // Resetting comments on unmount
        return () => {
            dispatch(resetComments());
        };
    }, []);

    return(
        <div className={styles['comments']}>
            {commentIds && (
                commentIds.map(commentId => {
                    return(
                        <Comment 
                            id={commentId}
                            key={commentId}
                        />
                    )
                })
            )}
            {!commentIds && (
                <LoadingComments />
            )}
        </div>
    )
}