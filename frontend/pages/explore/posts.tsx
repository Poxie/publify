import React from 'react';
import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import styles from '../../styles/Explore.module.scss';
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { Flex } from "../../components/Flex"
import { PartialPost } from "../../components/PartialPost"
import { ExploreLayout } from "../../layouts/ExploreLayout"
import { MainLayout } from "../../layouts/MainLayout"
import { setPopularPosts } from "../../redux/actions"
import { useAppSelector } from "../../redux/hooks"
import { selectPopularPosts } from "../../redux/selectors"
import { getExplorePosts } from "../../utils"
import { LoadingPosts } from '../../components/loading/LoadingPosts';

export default function Posts() {
    const dispatch = useDispatch();
    const posts = useAppSelector(state => selectPopularPosts(state));

    useEffect(() => {
        if(!posts.length) {
            getExplorePosts().then(posts => dispatch(setPopularPosts(posts)));
        }
    }, [posts]);

    return(
        <>
        {posts.length ? (
            <Flex flexWrap={'wrap'} className={styles['item-container']}>
                {posts.map(post => {
                    if(!post) return null;
                    return(
                        <PartialPost
                            displayMedia={false}
                            className={styles['post']}
                            {...post}
                        />
                    )
                })}
            </Flex>
        ) : (
            <Flex flexWrap={'wrap'} className={styles['loading-posts']}>
                <LoadingPosts />
            </Flex>
        )}
        </>
    )
}

Posts.getLayout = page => {
    return(
        <MainLayout>
            <ExploreLayout>
                {page}
            </ExploreLayout>
        </MainLayout>
    )
}

export const getStaticProps = async ({ locale }) => {
    return{
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}