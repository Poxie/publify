import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { getUserAvatar, getUserBanner } from '../../utils';
import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Flex } from '../Flex';

interface Props {
    name: string;
    avatar?: string;
    banner: string;
}
export const ProfileHeader: React.FC<Props> = ({ name, avatar, banner }) => {
    return(
        <div className={styles['header']}>
            <div 
                className={styles['banner']} 
                style={{backgroundImage: `url(${getUserBanner(banner)})`}} 
            />
            <Flex 
                className={styles['header-content']} 
                justifyContent={'space-between'}
                alignItems={'center'}
            >
                <Flex alignItems={'flex-end'}>
                    <Avatar 
                        avatar={avatar}
                        name={name}
                        size={110}
                        className={styles['header-avatar']}
                    />
                    <Flex className="text">
                        <span className={styles['name']}>
                            {name}
                        </span>
                    </Flex>
                </Flex>
                <div className={styles['options']}>
                    <Button>
                        Follow
                    </Button>
                </div>
            </Flex>
        </div>
    )
}