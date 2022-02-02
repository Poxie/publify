import { useTranslation } from 'next-i18next';
import React from 'react';
import styles from '../../styles/Home.module.scss';
import { PostType } from '../../utils/types';
import { PartialPost } from '../PartialPost';

export const FeedPosts: React.FC<{posts: PostType[]}> = ({ posts }) => {
    const { t } = useTranslation();
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
                    {t('feedEndMessage')}
                </span>
            </div>
        </>
    )
}