import React, { useEffect } from 'react';
import { useState } from 'react';
import { getMyFeed } from '../../utils';
import { PostType } from '../../utils/types';
import { PartialPost } from '../PartialPost';

export const Feed = () => {
    const [feed, setFeed] = useState<PostType[]>([]);

    useEffect(() => {
        getMyFeed().then(res => setFeed(res))
    }, []);

    return(
        <>
            {feed.map(post => {
                return(
                    <PartialPost 
                        {...post} 
                        key={post.id}
                    />
                )
            })}
        </>
    )
}