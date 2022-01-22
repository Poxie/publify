import React from 'react';
import Image from 'next/image';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import styles from '../../styles/User.module.scss';
import { getUserBanner } from '../../utils';
import { Flex } from '../Flex';
import { ProfileHeaderMain } from './ProfileHeaderMain';
import { ProfileOptions } from './ProfileOptions';
import { SettingsButton } from './SettingsButton';

export const ProfileHeader = () => {
    const { id, avatar, displayName, banner, color } = useAppSelector(state => selectProfileUser(state));

    return(
        <div className={styles['header']}>
            <div className={styles['banner']} style={{ backgroundColor: color }}>
                {banner && (
                    <Image 
                        alt={`${displayName}'s banner`}
                        layout={'fill'}
                        objectFit={'cover'}
                        src={getUserBanner(banner)}
                        priority
                    />
                )}
            </div>
            <Flex 
                className={styles['header-content']} 
                justifyContent={'space-between'}
            >
                <ProfileHeaderMain 
                    avatar={avatar}
                    name={displayName}
                />
                <ProfileOptions 
                    userId={id}
                />
            </Flex>
        </div>
    )
}