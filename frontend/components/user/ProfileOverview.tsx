import React, { useEffect, useState } from 'react';
import { Flex } from '../Flex';
import styles from '../../styles/User.module.scss';
import { get } from '../../utils/methods';
import { useRouter } from 'next/router';
import { ProfilePosts } from './ProfilePosts';
import { LoadingPost } from '../loading/LoadingPost';

export const ProfileOverview = () => {
    const router = useRouter();
    const [posts, setPosts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        let isMounted = true;

        const { userId } = router.query;

        // Fetching user posts
        get(`
            getPostsByAuthorId(id: "${userId}") {
                content
                author {
                    name
                    avatar
                }
            }
        `).then(response => {
            // Checking if isMounted to prevent memory leaks
            if(isMounted) {
                setPosts(response);
                setIsLoading(false);
            }
        })

        return () => {
            isMounted = false;
        }
    }, [router.query]);

    return(
        <Flex className={styles['profile-overview']}>
            <div className={styles['profile-sidebar']}>

            </div>
            {!isLoading && (
                <ProfilePosts 
                    posts={posts}
                />
            )}
            {/* Display posts skeleton if isLoading */}
            {isLoading && (
                <div style={{width: '100%'}}>
                <LoadingPost />
                <LoadingPost />
                <LoadingPost />
                <LoadingPost />
                </div>
            )}
        </Flex>
    )
}