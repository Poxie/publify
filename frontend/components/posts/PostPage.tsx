import React from 'react';
import { useDispatch } from 'react-redux';
import { setPost } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePostId } from '../../redux/selectors';
import { PostType } from '../../utils/types';
import { Post } from './Post';

export const PostPage: React.FC<PostType> = React.memo((post) => {
    const dispatch = useDispatch();
    const activeId = useAppSelector(state => selectActivePostId(state));

    // Store data in redux store
    if(activeId !== post.id) {
        dispatch(setPost(post));
    }

    return(
        <Post />
    )
});

PostPage.displayName = 'PostPage';