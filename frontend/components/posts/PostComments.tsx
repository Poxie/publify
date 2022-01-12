import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost, selectCommentIds } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { PostType } from '../../utils/types';
import { Comment } from './Comment';

export const PostComments = () => {
    const { id }: PostType = useAppSelector(state => selectActivePost(state));
    const commentIds = useAppSelector(state => selectCommentIds(state));
    const dispatch = useDispatch();

    // Fetching commentst
    useEffect(() => {
        dispatch(fetchComments(id));
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
        </div>
    )
}