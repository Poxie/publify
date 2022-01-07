import React from 'react';
import { PostType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfilePost } from './ProfilePost';

type Props = {
    postIds: string[];
}
export const ProfilePosts: React.FC<Props> = ({ postIds }) => {
    return(
        <div className={styles['posts']}>
            {postIds.map(postId => {
                return(
                    <ProfilePost
                        postId={postId}
                        key={postId}
                    />
                )
            })}

            {/* If posts array is empty */}
            {!postIds.length && (
                <div className={styles['empty-posts']}>
                    This user doesn't have any posts yet.
                </div>
            )}
        </div>
    )
}