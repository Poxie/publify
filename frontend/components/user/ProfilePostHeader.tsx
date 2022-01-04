import Image from 'next/image';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { getUserAvatar } from '../../utils';
import { Flex } from '../Flex';

interface Props {
    name: string;
    avatar: string;
}
export const ProfilePostHeader: React.FC<Props> = ({ name, avatar }) => {
    return(
        <div className={styles['post-header']}>
            <Flex
                className={styles['header-main']}
                alignItems={'center'}
            >
                <Flex className={styles['post-avatar']}>
                    <Image 
                        src={getUserAvatar(avatar)}
                        width={32}
                        height={32}
                        layout={'fixed'}
                        alt={`${name}'s avatar`}
                    />
                </Flex>
                <span>
                    {name}
                </span>
            </Flex>
        </div>
    )
}