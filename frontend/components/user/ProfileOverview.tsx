import React, { useEffect, useState } from 'react';
import styles from '../../styles/User.module.scss';
import { useRouter } from 'next/router';
import { Flex } from '../Flex';
import { ProfilePosts } from './ProfilePosts';
import { LoadingPost } from '../loading/LoadingPost';
import { ProfileMediaPreview } from './ProfileMediaPreview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectPosts } from '../../redux/selectors';
import { Input } from '../Input';
import { CreatePost } from './CreatePost';

export const ProfileOverview = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const posts = useAppSelector(state => selectPosts(state));
    const loading = useAppSelector(state => state.posts.loading);

    useEffect(() => {
        let isMounted = true;
        let { userId } = router.query;

        // Makes sure userId is
        userId = Array.isArray(userId) ? userId[0] : userId;

        // Fetching user posts
        dispatch(fetchUserPosts(userId));
    }, [router.query]);

    const postsWithImages = posts.filter(post => post.media.length);
    return(
        <Flex className={styles['profile-overview']}>
            <div className={styles['profile-sidebar']}>
                <ProfileMediaPreview 
                    posts={posts}
                />
            </div>
            <div className={styles['profile-main']}>
                <CreatePost />
                {!loading && (
                    <ProfilePosts 
                        posts={posts}
                    />
                )}
                {/* Display posts skeleton if loading */}
                {loading && (
                    <div style={{width: '100%'}}>
                    <LoadingPost />
                    <LoadingPost />
                    <LoadingPost />
                    <LoadingPost />
                    </div>
                )}
            </div>
        </Flex>
    )
}