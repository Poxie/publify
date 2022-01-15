import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments, resetComments } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost, selectActivePostId, selectCommentIds, selectComments } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { PostType } from '../../utils/types';
import { Flex } from '../Flex';
import { LoadingComments } from '../loading/LoadingComments';
import { AddComment } from './AddComment';
import { Comment } from './Comment';

export const PostComments = () => {
    // Checking if isMounted. If so, display loading comment skeleton (preventing different styles on server and client)
    const [isMounted, setIsMounted] = useState(false);
    const id = useAppSelector(state => selectActivePostId(state));
    const comments = useAppSelector(state => selectComments(state));
    const dispatch = useDispatch();

    // Fetching comments
    useEffect(() => {
        setIsMounted(true);
        dispatch(fetchComments(id));

        // Resetting comments on unmount
        return () => {
            dispatch(resetComments());
        };
    }, []);

    return(
        <div className={styles['comments']}>
            {comments && (
                comments.map(comment => {
                    return(
                        <Comment 
                            {...comment}
                            key={comment.id}
                        />
                    )
                })
            )}
            {comments && !comments.length && (
                <Flex 
                    justifyContent={'center'}
                    style={{padding: '10px 0 35px 0'}}
                >
                    There are no comments on this post yet.
                </Flex>
            )}
            {!comments && isMounted && (
                <LoadingComments />
            )}
        </div>
    )
}