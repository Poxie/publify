import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PostPage } from '../../components/posts/PostPage';
import { setPost } from '../../redux/actions';
import { getPostById, getUserAvatar } from '../../utils';
import { WEBSITE_NAME, WEBSITE_ORIGIN } from '../../utils/constants';

export default function Post(props) {
    const dispatch = useDispatch();
    const { post } = props;
    const { content, author } = post;
    const router = useRouter();
    const pathname = router.asPath;

    return(
        <>
        <Head>
            <title>
                {content} | {author.username}
            </title>
            <meta content={content} name="description" />
            <meta content={content} property="og:description" />
            <meta content={getUserAvatar(author.avatar)} property="og:image" />
            <meta content={`${WEBSITE_ORIGIN}${pathname}`} property="og:url" />
            <meta content={WEBSITE_NAME} property="og:site_name" />
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
            post,
            ...(await serverSideTranslations(context.locale, ['common', 'post']))
        }
    }
}