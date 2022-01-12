import React from 'react';
import { PostType } from '../../utils/types';
import { Post } from './Post';

export const PostPage: React.FC<PostType> = ({ content }) => {
    return(
        <div>
            <Post />
        </div>
    )
}