import React from 'react';
import { PostType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfilePost } from './ProfilePost';

type Props = {
    posts: PostType[];
}
export const ProfilePosts: React.FC<Props> = ({ posts }) => {
    return(
        <div className={styles['posts']}>
            {posts.map(post => {
                return(
                    <ProfilePost 
                        {...post}
                        key={post.id}
                    />
                )
            })}
        </div>
    )
}