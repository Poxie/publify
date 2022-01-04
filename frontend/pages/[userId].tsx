import React from 'react';
import { GetServerSideProps } from 'next';
import { getUserAvatar, getUserById } from '../utils';
import Head from 'next/head';
import { UserType } from '../utils/types';
import { UserPage } from '../components/user/UserPage';

type Props = {
    user: UserType;
}
export default function User(props: Props) {
    const { user } = props;

    return(
        <>
            <Head>
                <title>
                    {user.name} | {process.env.NEXT_PUBLIC_WEBSITE_NAME}
                </title>
                <meta property="og:title" content={`${user.name}`} />

                {/* Add this with bio later */}
                <meta property="og:description" />

                <meta property="og:image" content={getUserAvatar(user.avatar)} />
            </Head>

            <UserPage {...user} />
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const userId = context.params.userId;

    // If is array, just use first index as userId
    const user = await getUserById(Array.isArray(userId) ? userId[0] : userId);

    return {
        props: {
            user
        }
    }
}