import React from 'react';
import { PostType } from '../../utils/types';
import styles from '../../styles/User.module.scss';
import { ProfilePost } from './ProfilePost';
import { useTranslation } from 'next-i18next';

type Props = {
    postIds: string[];
}
export const ProfilePosts: React.FC<Props> = ({ postIds }) => {
    const { t } = useTranslation('profile');

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
                    {t('noPostsFound')}
                </div>
            )}
        </div>
    )
}