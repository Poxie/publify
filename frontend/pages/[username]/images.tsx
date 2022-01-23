import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import Head from 'next/head';
import React from 'react';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { ProfileImages } from '../../components/user/images/ProfileImages';
import { MainLayout } from '../../layouts/MainLayout';
import { ProfileLayout } from '../../layouts/ProfileLayout';
import { setProfile } from '../../redux/actions';
import { getUserByUsername } from '../../utils';
import { UserType } from '../../utils/types';

type Props = {
    user: UserType;
}
export default function Images({ user }: Props) {
    const dispatch = useDispatch();

    // Updating redux store with user data
    dispatch(setProfile(user));

    return(
        <>
        <Head>
            <title>
                {user.displayName} | Images
            </title>
            <meta name="title" content={`${user.displayName} | Images`} />
            <meta name="description" content={`View all of the images ${user.displayName} has posted.`} />
        </Head>
        
        <ProfileImages />
        </>
    )
}

Images.getLayout = (page: ReactElement) => {
    return(
        <MainLayout>
            <ProfileLayout>
                {page}
            </ProfileLayout>
        </MainLayout>
    )
}

export const getServerSideProps = async ({ params, locale }) => {
    let username = params.username;
    username = Array.isArray(username) ? username[0] : username

    // If is array, just use first index as username
    const user = await getUserByUsername(username);

    return {
        props: {
            user,
            ...(await serverSideTranslations(locale, ['profile', 'common']))
        }
    }
}