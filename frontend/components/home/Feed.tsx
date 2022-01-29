import React, { useEffect } from 'react';
import { useState } from 'react';
import { getMyFeed } from '../../utils';
import { PostType } from '../../utils/types';
import { LoadingPosts } from '../loading/LoadingPosts';
import { PartialPost } from '../PartialPost';
import { FeedPosts } from './FeedPosts';

export const Feed = () => {
    const [loading, setLoading] = useState(true);
    const [feed, setFeed] = useState<PostType[]>([]);

    useEffect(() => {
        getMyFeed().then(res => {
            setFeed(res);
            setLoading(false);
        })
    }, []);

    return(
        <>
            {!loading ? (
                <FeedPosts posts={feed} />
            ) : (
                <LoadingPosts />
            )}
        </>
    )
}