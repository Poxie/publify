import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React, { useEffect } from 'react';
import { ReactElement } from 'react';
import { useDispatch } from 'react-redux';
import { AboutPage } from '../../components/about/AboutPage';
import { MainLayout } from '../../layouts/MainLayout';
import { ProfileLayout } from '../../layouts/ProfileLayout';
import { setProfile } from '../../redux/actions';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileIsSSR, selectProfileUser } from '../../redux/selectors';
import { getUserByUsername } from '../../utils';
import { UserType } from '../../utils/types';

type Props = {
    user: UserType;
}
export default function About({ user }: Props) {
    const dispatch = useDispatch();
    const profile = useAppSelector(state => selectProfileUser(state));
    const isSSR = useAppSelector(state => selectProfileIsSSR(state));

    // Updating view with properties based on client authorization token
    useEffect(() => {
        if(!isSSR) return;

        getUserByUsername(user.username)
            .then(user => {
                dispatch(setProfile({ user, ssr: false }));
            })
    }, [isSSR]);

    // Updating redux store with user data
    if(!profile || profile.id !== user.id) {
        dispatch(setProfile({ user, override: true }));
    }

    return(
        <div>
            <AboutPage />
        </div>
    );
}

About.getLayout = (page: ReactElement) => {
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