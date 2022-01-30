import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import styles from '../../styles/Explore.module.scss';
import { useEffect } from 'react';
import { Flex } from '../../components/Flex';
import { LoadingProfiles } from '../../components/loading/LoadingProfiles';
import { UserProfile } from '../../components/UserProfile';
import { ExploreLayout } from '../../layouts/ExploreLayout';
import { MainLayout } from '../../layouts/MainLayout';
import { getExploreUsers } from '../../utils';
import { useAppSelector } from '../../redux/hooks';
import { selectPopularUsers } from '../../redux/selectors';
import { useDispatch } from 'react-redux';
import { setPopularUsers } from '../../redux/actions';
import { usePortal } from '../../contexts/PortalProvider';
import { UserProfilePortal } from '../../portals/UserProfilePortal';
import { useTranslation } from 'next-i18next';

export default function Users() {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { setPortal } = usePortal();
    const users = useAppSelector(state => selectPopularUsers(state));

    useEffect(() => {
        if(!users.length) {
            getExploreUsers().then(users => dispatch(setPopularUsers(users)));
        }
    }, [users]);

    return(
        <>
            {!users.length ? (
                <LoadingProfiles />
            ) : (
                <Flex className={styles['item-container']} flexWrap={'wrap'}>
                    {users.map(user => {
                        return(
                            <div 
                                className={styles['profile']}
                                onClick={() => setPortal(<UserProfilePortal {...user} />, t('portalProfileHeader', { username: user.displayName }))}
                                key={user.id}
                            >
                                <UserProfile 
                                    {...user}
                                    bannerStyle={styles['profile-banner']}
                                    avatarStyle={styles['profile-avatar']}
                                    hasProfileStats={true}
                                />
                            </div>
                        )
                    })}
                </Flex>
            )}
        </>
    )
}

Users.getLayout = page => {
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
            ...(await serverSideTranslations(locale, ['common', 'explore']))
        }
    }
}