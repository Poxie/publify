import Image from 'next/image';
import React from 'react';
import { useAuth } from '../../contexts/AuthProvider';
import styles from '../../styles/User.module.scss';
import { getUserAvatar, getUserBanner } from '../../utils';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Flex } from '../Flex';
import { FollowButton } from './FollowButton';
import { ProfileHeaderMain } from './ProfileHeaderMain';
import { ProfileOptions } from './ProfileOptions';
import { SettingsButton } from './SettingsButton';

interface Props {
    name: string;
    avatar?: string;
    banner: string;
    id: string;
}
export const ProfileHeader: React.FC<Props> = ({ name, avatar, banner, id }) => {
    return(
        <div className={styles['header']}>
            <div 
                className={styles['banner']} 
                style={{backgroundImage: `url(${getUserBanner(banner)})`}} 
            />
            <Flex 
                className={styles['header-content']} 
                justifyContent={'space-between'}
            >
                <ProfileHeaderMain 
                    avatar={avatar}
                    name={name}
                />
                <ProfileOptions 
                    userId={id}
                />
            </Flex>
        </div>
    )
}