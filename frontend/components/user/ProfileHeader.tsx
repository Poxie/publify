import React from 'react';
import styles from '../../styles/User.module.scss';
import { useState } from 'react';
import { useEffect } from 'react';
import { RefObject } from 'react';
import { useRef } from 'react';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import { UserType } from '../../utils/types';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { UserProfile } from '../UserProfile';
import { ProfileOptions } from '../ProfileOptions';

export const ProfileHeader = () => {
    const user = useAppSelector(state => selectProfileUser(state));
    const ref = useRef<HTMLDivElement>(null);

    return(
        <div className={styles['profile-header']} ref={ref}>
            <UserProfile 
                {...user}
                hasProfileOptions={true}
                hasProfileStats={true}
            />
            <StickyHeader 
                {...user}
                containerRef={ref}
            />
        </div>
    )
}

// Sticky header - when user scrolls down
const StickyHeader: React.FC<UserType & {containerRef: RefObject<HTMLDivElement>}> = (user) => {
    const { id, displayName, avatar, containerRef } = user;
    const [shouldShow, setShouldShow] = useState(false);

    useEffect(() => {
        if(!containerRef.current) return;
        const checkShouldShow = () => {
            if(!containerRef.current) {
                window.removeEventListener('scroll', checkShouldShow);
                return;
            }
            const { top, height } = containerRef.current.getBoundingClientRect();
            const fromTop = top + height;
            
            if(fromTop < 30 && !shouldShow) {
                setShouldShow(true);
            } else if(fromTop >= 30 && shouldShow) {
                setShouldShow(false);
            }
        }
        checkShouldShow();

        window.addEventListener('scroll', checkShouldShow);

        return () => window.removeEventListener('scroll', checkShouldShow);
    }, [containerRef.current, setShouldShow, shouldShow]);

    const className = [styles['sticky-header'], shouldShow && styles['visible']].join(' ');
    return(
        <Flex className={className} justifyContent={'space-between'} alignItems={'center'}>
            <Flex alignItems={'center'}>
                <Avatar 
                    size={34}
                    avatar={avatar}
                    name={displayName}
                />
                <span className={styles['sticky-username']}>
                    {displayName}
                </span>
            </Flex>
            <div className={styles['sticky-options']}>
                <ProfileOptions 
                    userId={id}
                />
            </div>
        </Flex>
    )
}