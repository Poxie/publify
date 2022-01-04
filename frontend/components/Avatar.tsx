import React from 'react';
import { Flex } from './Flex';
import styles from '../styles/User.module.scss';
import Image from 'next/image';
import { getUserAvatar } from '../utils';

type Props = {
    avatar: string;
    name: string;
    size?: number;
    className?: string;
}
export const Avatar: React.FC<Props> = ({ avatar, name, className, size=32 }) => {
    const newClassName = [styles['avatar'], className ? className : ''].join(' ');
    return(
        <Flex 
            className={newClassName}
            style={{width: size, height: size}}
        >
            {avatar && (
                <Image 
                    src={getUserAvatar(avatar)}
                    width={size}
                    height={size}
                    layout={'fixed'}
                    alt={`${name}'s avatar`}
                />
            )}
        </Flex>
    )
}