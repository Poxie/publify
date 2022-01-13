import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchComments, resetComments } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost, selectCommentIds } from '../../redux/selectors';
import styles from '../../styles/Post.module.scss';
import { PostType } from '../../utils/types';
import { Flex } from '../Flex';
import { LoadingComments } from '../loading/LoadingComments';
import { AddComment } from './AddComment';
import { Comment } from './Comment';

export const PostComments = () => {
    // Checking if isMounted. If so, display loading comment skeleton (preventing different styles on server and client)
    const [isMounted, setIsMounted] = useState(false);
    const { id }: PostType = useAppSelector(state => selectActivePost(state));
    const commentIds = useAppSelector(state => selectCommentIds(state));
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
            {commentIds && !commentIds.length && (
                <Flex 
                    justifyContent={'center'}
                    style={{padding: '10px 0 35px 0'}}
                >
                    There are no comments on this post yet.
                </Flex>
            )}
            {!commentIds && isMounted && (
                <LoadingComments />
            )}
        </div>
    )
}