import React from 'react';
import styles from '../styles/Components.module.scss';
import { UserType } from '../utils/types';
import { Banner } from './Banner';
import { ProfileHeader } from './ProfileHeader';

type Props = UserType & {
    bannerType?: 'small' | 'large';
    bannerStyle?: string;
    onAvatarClick?: () => void;
    avatarHoverText?: string;
    avatarStyle?: string;
    onBannerClick?: () => void;
    bannerHoverText?: string;
    hasProfileOptions?: boolean;
    hasProfileStats?: boolean;
}
export const UserProfile: React.FC<Props> = ({ id, hasProfileStats=false, followersCount, postCount, bannerStyle, bannerType='large', color, displayName, avatar, avatarStyle, banner, bio, onAvatarClick, onBannerClick, avatarHoverText, bannerHoverText, hasProfileOptions=false }) => {
    return(
        <div className={styles['user-profile']}>
            <Banner 
                banner={banner}
                color={color}
                bannerHoverText={bannerHoverText}
                onBannerClick={onBannerClick}
                type={bannerType}
                className={bannerStyle}
            />
            <ProfileHeader 
                id={id}
                avatar={avatar}
                displayName={displayName}
                bio={bio}
                followersCount={followersCount}
                postCount={postCount}
                hasProfileStats={hasProfileStats}
                avatarHoverText={avatarHoverText}
                onAvatarClick={onAvatarClick}
                hasProfileOptions={hasProfileOptions}
                avatarStyle={avatarStyle}
            />
        </div>
    )
}