import React from 'react';
import styles from '../../../styles/Settings.module.scss';
import { UserType } from '../../../utils/types';
import { UserProfile } from '../../UserProfile';

type Props = UserType & {
    onBannerClick: () => void;
    onAvatarClick: () => void;
}
export const ProfilePreview: React.FC<Props> = (props) => {
    return(
        <UserProfile 
            {...props}
            bannerStyle={styles['preview-banner']}
            bannerHoverText={'Change Banner'}
            onBannerClick={props.onBannerClick}
            avatarHoverText={'Change Avatar'}
            onAvatarClick={props.onAvatarClick}
        />
    )
}