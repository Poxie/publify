import React from 'react';
import { LoadingPost } from './LoadingPost';

export const LoadingPosts = () => {
    return(
        <div style={{width: '100%'}}>
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
            <LoadingPost />
        </div>
    )
}