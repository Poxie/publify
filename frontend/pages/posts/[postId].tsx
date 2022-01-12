import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostPage } from '../../components/posts/PostPage';
import { setPost } from '../../redux/actions';
import { getPostById, getUserAvatar } from '../../utils';

export default function Post(props) {
    const dispatch = useDispatch();
    const { post } = props;
    const { content, author } = post;
    const router = useRouter();
    const pathname = router.asPath;
    
    // Store data in redux store
    dispatch(setPost(post));

    return(
        <>
        <Head>
            <title>
                {content} | {author.username}
            </title>
            <meta content={content} property="og:description" />
            <meta content={getUserAvatar(author.avatar)} property="og:image" />
            <meta content={`${process.env.NEXT_PUBLIC_WEBSITE_ORIGIN}${pathname}`} property="og:url" />
            <meta content={process.env.NEXT_PUBLIC_WEBSITE_NAME} property="og:site_name" />
        </Head>

        <PostPage {...post} />
        </>
    )
}

export const getServerSideProps = async (context) => {
    let postId = context.params.postId;
    postId = Array.isArray(postId) ? postId[0] : postId

    const post = await getPostById(postId);

    return {
        props: {
            post
        }
    }
}