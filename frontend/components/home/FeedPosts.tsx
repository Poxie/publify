import React from 'react';
import styles from '../../styles/Home.module.scss';
import { PostType } from '../../utils/types';
import { PartialPost } from '../PartialPost';

export const FeedPosts: React.FC<{posts: PostType[]}> = ({ posts }) => {
    return(
        <>
            {posts.map(post => {
                return(
                    <PartialPost 
                        {...post} 
                        key={post.id}
                    />
                )
            })}
            
            <div className={styles['empty']}>
                <span>
                    Seems like you have hit the end.
                </span>
            </div>
        </>
    )
}