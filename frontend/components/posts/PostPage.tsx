import React from 'react';
import { useDispatch } from 'react-redux';
import { setPost } from '../../redux/actions';
import { PostType } from '../../utils/types';
import { Post } from './Post';

export const PostPage: React.FC<PostType> = React.memo((post) => {
    const dispatch = useDispatch();

    // Store data in redux store
    dispatch(setPost(post));

    return(
        <Post />
    )
});