import React, { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';
import { getMyFeed } from '../../utils';
import { PostType } from '../../utils/types';
import { LoadingPosts } from '../loading/LoadingPosts';
import { PartialPost } from '../PartialPost';
import { FeedPosts } from './FeedPosts';

export const Feed = () => {
    const [loading, setLoading] = useState(true);
    const [feed, setFeed] = useState<PostType[]>([]);
    const [isEnd, setIsEnd] = useState(false);
    const ref = useRef<HTMLDivElement>(null);
    const isFetching = useRef(false);
    const length = useRef(feed.length);

    useEffect(() => {
        length.current = feed.length;
    }, [feed.length]);

    useEffect(() => {
        getMyFeed().then(res => {
            setFeed(res);
            setLoading(false);
            isFetching.current = false;
        })

        const onScroll = async () => {
            if(!ref.current) return;
            
            const scroll = window.scrollY + window.innerHeight;
            const height = document.body.offsetHeight;
            const diff = height - scroll;
            if(diff < 400 && !isFetching.current) {
                isFetching.current = true;

                const startIndex = length.current;
                const endIndex = startIndex + 8;
                const moreFeed = await getMyFeed(startIndex, endIndex);
                setFeed(previous => [...previous, ...moreFeed]);

                if(moreFeed.length) {
                    isFetching.current = false;
                } else {
                    setIsEnd(true);
                }
            }
        }

        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    return(
        <div ref={ref}>
            {!loading ? (
                <FeedPosts posts={feed} isEnd={isEnd} />
            ) : (
                <LoadingPosts />
            )}
        </div>
    )
}