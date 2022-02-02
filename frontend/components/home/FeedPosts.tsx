import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/Home.module.scss';
import { PostType } from '../../utils/types';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { PartialPost } from '../PartialPost';

export const FeedPosts: React.FC<{posts: PostType[], isEnd: boolean}> = ({ posts, isEnd }) => {
    const { t } = useTranslation();
    const router = useRouter();

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
            
            {(posts.length === 0 || isEnd) && (
                <Flex className={styles['empty']} flexDirection={'column'} alignItems={'center'}>
                    <span>
                        {t('feedEndMessage')}
                    </span>
                    <Button className={styles['explore-button']} onClick={() => router.push('/explore/users')}>
                        {t('exploreUsersButton')}
                    </Button>
                </Flex>
            )}
        </>
    )
}