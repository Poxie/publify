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
    onAvatarClick?: () => void;
    avatarHoverText?: string;
    hasProfileOptions?: boolean;
}
export const ProfileHeader: React.FC<Props> = ({ id, displayName, avatar, bio, onAvatarClick, avatarHoverText, hasProfileOptions }) => {
    return(
        <div className={styles['profile-header']}>
            <Avatar 
                avatar={avatar}
                name={displayName}
                size={110}
                className={styles['profile-avatar']}
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
                </Flex>
                {hasProfileOptions && (
                    <ProfileOptions 
                        userId={id}
                    />
                )}
            </Flex>
        </div>
    )
}