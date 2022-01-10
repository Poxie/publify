import React from 'react';
import { PostType } from '../../utils/types';

export const PostPage: React.FC<PostType> = ({ content }) => {
    return(
        <div>
            {content}
        </div>
    )
}