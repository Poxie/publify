import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { UserType } from '../../utils/types';
import { useDispatch } from 'react-redux';
import { pushUser, setProfile } from '../../redux/actions';
import { WEBSITE_NAME } from '../../utils/constants';
import { getUserAvatar, getUserByUsername } from '../../utils';
import { UserPage } from '../../components/user/UserPage';
import { MainLayout } from '../../layouts/MainLayout';
import { ReactElement } from 'react';
import { ProfileLayout } from '../../layouts/ProfileLayout';
import { useAppSelector } from '../../redux/hooks';
import { selectCachedUser, selectProfileUser } from '../../redux/selectors';
import { useEffect } from 'react';

type Props = {
    user: UserType;
}
export default function User(props: Props) {
    const { user } = props;
    const dispatch = useDispatch();
    const profile = useAppSelector(state => selectProfileUser(state));

    // Updating view with properties based on client authorization token
    useEffect(() => {
        if(profile) return;

        getUserByUsername(user.username)
            .then(user => {
                dispatch(setProfile(user));
            })
    }, [profile]);

    // Updating redux store with user data
    if(!profile || profile.id !== user.id) {
        dispatch(setProfile(user));
    }

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
            <ProfileLayout>
                {page}
            </ProfileLayout>
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