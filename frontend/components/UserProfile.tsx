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
    onBannerClick?: () => void;
    bannerHoverText?: string;
}
export const UserProfile: React.FC<Props> = ({ bannerStyle, bannerType='large', color, displayName, avatar, banner, bio, onAvatarClick, onBannerClick, avatarHoverText, bannerHoverText }) => {
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
                avatar={avatar}
                displayName={displayName}
                bio={bio}
                avatarHoverText={avatarHoverText}
                onAvatarClick={onAvatarClick}
            />
        </div>
    )
}