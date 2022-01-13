import React, { useEffect, useMemo, useRef, useState } from 'react';
import styles from '../../styles/User.module.scss';
import { useRouter } from 'next/router';
import { Flex } from '../Flex';
import { ProfilePosts } from './ProfilePosts';
import { ProfileMediaPreview } from './ProfileMediaPreview';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserPosts, loadMorePosts } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectPostIds } from '../../redux/selectors';
import { CreatePost } from './CreatePost';
import { LoadingPosts } from '../loading/LoadingPosts';

export const ProfileOverview = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const postIds = useAppSelector(state => selectPostIds(state));
    const loading = useAppSelector(state => state.posts.loading);
    const loadingMore = useRef(false);

    // Checking if isMounted. If so, display loading comment skeleton (preventing different styles on server and client)
    const [isMounted, setIsMounted] = useState(false);

    const getUserId = useMemo(() => () => {
        let { userId } = router.query;

        // Makes sure userId is
        userId = Array.isArray(userId) ? userId[0] : userId;

        return userId
    }, [router.query]);


    useEffect(() => {
        let isMounted = true;
        setIsMounted(true);
        const userId = getUserId();

        // Fetching user posts
        dispatch(fetchUserPosts(userId, 0, postIds.length || 3));
    }, [getUserId]);

    // If scroll exceeds threshold, load more posts
    useEffect(() => {
        const listenForScroll = (e: Event) => {
            const scrollPercentage = ((window.innerHeight + window.scrollY) / (document.body.offsetHeight)) * 100;
            if(scrollPercentage > 90 && !loadingMore.current) {
                const userId = getUserId();

                loadingMore.current = true;
                dispatch(loadMorePosts(userId, postIds.length, postIds.length + 4));
                document.removeEventListener('scroll', listenForScroll);
            }
        }

        document.addEventListener('scroll', listenForScroll);

        return () => document.removeEventListener('scroll', listenForScroll);
    }, [getUserId, postIds]);

    // When more posts are loaded, set loading status to false
    useEffect(() => {
        loadingMore.current = false;
    }, [postIds.length]);

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
                {loading && isMounted && (
                    <LoadingPosts />
                )}
            </div>
        </Flex>
    )
}