import React from 'react';
import styles from '../styles/Components.module.scss';
import { Avatar } from './Avatar';
import { Flex } from './Flex';
import { ProfileBio } from './ProfileBio';
import { ProfileName } from './ProfileName';

type Props = {
    avatar: string;
    displayName: string;
    bio: string;
    onAvatarClick?: () => void;
    avatarHoverText?: string;
}
export const ProfileHeader: React.FC<Props> = ({ displayName, avatar, bio, onAvatarClick, avatarHoverText }) => {
    return(
        <Flex className={styles['profile-header']} flexDirection={'column'}>
            <Avatar 
                avatar={avatar}
                name={displayName}
                size={92}
                className={styles['profile-avatar']}
                onAvatarClick={onAvatarClick}
                avatarHoverText={avatarHoverText}
            />
            <ProfileName 
                displayName={displayName}
            />
            <ProfileBio 
                bio={bio}
            />
        </Flex>
    )
}