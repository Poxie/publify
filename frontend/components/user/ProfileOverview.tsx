import React, { useEffect, useState } from 'react';
import styles from '../../styles/User.module.scss';
import { useRouter } from 'next/router';
import { Flex } from '../Flex';
import { ProfilePosts } from './ProfilePosts';
import { ProfileMediaPreview } from './ProfileMediaPreview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectPostIds } from '../../redux/selectors';
import { CreatePost } from './CreatePost';
import { LoadingPosts } from '../loading/LoadingPosts';

export const ProfileOverview = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const postIds = useAppSelector(state => selectPostIds(state));
    const loading = useAppSelector(state => state.posts.loading);

    useEffect(() => {
        let isMounted = true;
        let { userId } = router.query;

        // Makes sure userId is
        userId = Array.isArray(userId) ? userId[0] : userId;

        // Fetching user posts
        dispatch(fetchUserPosts(userId));
    }, [router.query]);

    return(
        <Flex className={styles['profile-overview']}>
            <div className={styles['profile-sidebar']}>
                <ProfileMediaPreview />
            </div>
            <div className={styles['profile-main']}>
                <CreatePost />
                {!loading && (
                    <ProfilePosts 
                        postIds={postIds}
                    />
                )}
                {/* Display posts skeleton if loading */}
                {loading && (
                    <LoadingPosts />
                )}
            </div>
        </Flex>
    )
}