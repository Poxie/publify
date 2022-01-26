import { useTranslation } from 'next-i18next';
import React from 'react';
import styles from '../styles/Components.module.scss';
import { Avatar } from './Avatar';
import { Flex } from './Flex';
import { ProfileBio } from './ProfileBio';
import { ProfileName } from './ProfileName';
import { ProfileOptions } from './ProfileOptions';

type Props = {
    id: string;
    avatar: string;
    displayName: string;
    bio: string;
    followersCount: number;
    isFollowing: boolean;
    postCount: number;
    hasProfileStats?: boolean;
    onAvatarClick?: () => void;
    avatarHoverText?: string;
    hasProfileOptions?: boolean;
    avatarStyle?: string;
}
export const ProfileHeader: React.FC<Props> = ({ id, displayName, avatar, avatarStyle, bio, hasProfileStats, followersCount, isFollowing, postCount, onAvatarClick, avatarHoverText, hasProfileOptions }) => {
    const { t } = useTranslation();
    const avatarClassName = [styles['profile-avatar'], avatarStyle || ''].join(' ');
    return(
        <div className={styles['profile-header']}>
            <Avatar 
                avatar={avatar}
                name={displayName}
                size={110}
                className={avatarClassName}
                onAvatarClick={onAvatarClick}
                avatarHoverText={avatarHoverText}
            />
            <Flex justifyContent={'space-between'} alignItems={'flex-start'}>
                <Flex flexDirection={'column'}>
                    <ProfileName 
                        displayName={displayName}
                    />
                    <ProfileBio 
                        bio={bio}
                    />
                    {hasProfileStats && (
                        <div className={styles['profile-stats']}>
                            <span>
                                {followersCount} {t('followers')}
                            </span>
                            <span>
                                {postCount} {t('posts')}
                            </span>
                        </div>
                    )}
                </Flex>
                {hasProfileOptions && (
                    <ProfileOptions 
                        userId={id}
                        isFollowing={isFollowing}
                    />
                )}
            </Flex>
        </div>
    )
}