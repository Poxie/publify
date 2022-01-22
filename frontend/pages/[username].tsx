import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import { getUserAvatar, getUserByUsername } from '../utils';
import Head from 'next/head';
import { UserType } from '../utils/types';
import { UserPage } from '../components/user/UserPage';
import { ReactElement } from 'react';
import { MainLayout } from '../layouts/MainLayout';
import { WEBSITE_NAME } from '../utils/constants';
import { useDispatch } from 'react-redux';
import { setProfile } from '../redux/actions';

type Props = {
    user: UserType;
}
export default function User(props: Props) {
    const { user } = props;
    const dispatch = useDispatch();

    // Updating redux store with user data
    dispatch(setProfile(user));

    return(
        <>
            <Head>
                <title>
                    {user.displayName} | {WEBSITE_NAME}
                </title>
                <meta name="description" content={user.bio} />

                <meta property="og:title" content={`${user.displayName}`} />

                {/* Add this with bio later */}
                <meta property="og:description" content={user.bio} />

                <meta property="og:image" content={getUserAvatar(user.avatar)} />
            </Head>

            <UserPage />
        </>
    )
}

// Setting page layout
User.getLayout = (page: ReactElement) => {
    return(
        <MainLayout>
            {page}
        </MainLayout>
    )
}

// Fetching props
export const getServerSideProps: GetServerSideProps = async (context) => {
    let username = context.params.username;
    username = Array.isArray(username) ? username[0] : username

    // If is array, just use first index as username
    const user = await getUserByUsername(username);

    return {
        props: {
            user,
            ...(await serverSideTranslations(context.locale, ['profile', 'common']))
        }
    }
}