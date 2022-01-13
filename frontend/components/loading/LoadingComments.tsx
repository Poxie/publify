import React from 'react';
import { LoadingAvatar } from './LoadingAvatar';
import { LoadingComment } from './LoadingComment';

export const LoadingComments = () => {
    return(
        <div>
            <LoadingComment />
            <LoadingComment />
            <LoadingComment />
            <LoadingComment />
            <LoadingComment />
            <LoadingComment />
        </div>
    )
}