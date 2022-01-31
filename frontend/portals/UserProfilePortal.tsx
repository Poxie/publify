import React from 'react';
import styles from '../styles/UserProfilePortal.module.scss';
import { UserProfile } from '../components/UserProfile';
import { CustomAbout, PostType, UserType } from '../utils/types';
import { useState } from 'react';
import { Flex } from '../components/Flex';
import { useEffect } from 'react';
import { getFirstLetterUppercase, getPostsByAuthorId } from '../utils';
import { LoadingPosts } from '../components/loading/LoadingPosts';
import { PartialPost } from '../components/PartialPost';
import { AboutItem } from '../components/about/AboutItem';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';

export const UserProfilePortal: React.FC<UserType> = (user) => {
    const [data, setData] = useState({posts: null});
    const [activeTab, setActiveTab] = useState('postsTab');

    useEffect(() => {
        getPostsByAuthorId(user.id).then(posts => {
            setData(previous => ({...previous, ...{posts}}));
        })
    }, [user.id]);

    let extraTab = null;
    switch(activeTab) {
        case 'postsTab':
            extraTab = <ProfilePosts posts={data.posts} username={user.username} />;
            break;
        case 'aboutTab':
            extraTab = (
                <ProfileAbout 
                    location={user.location}
                    education={user.education}
                    relationship={user.relationship}
                    customAbouts={user.customAbouts}
                />
            )
    }
    return(
        <div>
            <UserProfile 
                {...user}
                bannerStyle={styles['banner']}
                hasProfileStats={true}
            />
            <ProfileTabs active={activeTab} setActive={setActiveTab} />
            {extraTab}
        </div>
    )
}

const ProfileTabs: React.FC<{active: string, setActive: (tab: string) => void}> = ({ active, setActive }) => {
    return(
        <Flex className={styles['tabs']}>
            <Tab tab={'postsTab'} active={active} onClick={setActive} />
            <Tab tab={'aboutTab'} active={active} onClick={setActive} />
        </Flex>
    )
}
const Tab: React.FC<{tab: string, active: string, onClick: (tab: string) => void;}> = ({ tab, active, onClick }) => {
    const { t } = useTranslation();
    const className = [styles['tab'], active === tab && styles['active']].join(' ');
    return(
        <div className={className} onClick={() => onClick(tab)}>
            {t(tab)}
        </div>
    )
}

const ProfilePosts: React.FC<{posts: PostType[] | null, username: string}> = ({ posts, username }) => {
    const { t } = useTranslation();
    const router = useRouter();
    return(
        <>
        {posts ? (
            <>
            {posts.map(post => <PartialPost {...post} displayMedia={false} />)}
            <div className={styles['full-profile']} onClick={() => router.push(`/${username}`)}>
                {t('viewFullProfile')}
            </div>
            </>
        ) : (
            <LoadingPosts />
        )}
        </>
    )
}

type AboutItem = {
    type: string,
    value: string,
    label: string;
}
const ProfileAbout: React.FC<{location: string, education: string, relationship: string, customAbouts: CustomAbout[]}> = ({ relationship, education, location, customAbouts }) => {
    const { t } = useTranslation();

    const items: AboutItem[] = [
        {type: 'relationship', value: t(relationship), label: t('relationshipLabel')}, 
        {type: 'education', value: education, label: t('educationLabel')}, 
        {type: 'location', value: location, label: t('locationLabel')}, 
        ...customAbouts
    ];
    const itemsToMap = items.filter(item => {
        if(!item.value || item.type === 'relationship' && item.value === t('relationshipN/A')) {
            return null;
        }
        return item;
    })

    return(
        <>
            {itemsToMap.map(item => {
                return(
                    <AboutItem 
                        {...item}
                        key={item.type}
                    />
                )
            })}
            {!itemsToMap.length && (
                <Flex className={styles['empty']} justifyContent={'center'}>
                    <span>
                        {t('aboutMeEmpty')}
                    </span>
                </Flex>
            )}
        </>
    )
}