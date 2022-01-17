import React from 'react';
import { Flex } from './Flex';
import styles from '../styles/User.module.scss';
import Image from 'next/image';
import { getUserAvatar } from '../utils';

type Props = {
    avatar: string;
    name: string;
    size?: number;
    rounded?: boolean;
    onAvatarClick?: () => void;
    avatarHoverText?: string;
    className?: string;
}
export const Avatar: React.FC<Props> = ({ avatar, name, className, avatarHoverText, onAvatarClick, rounded=true, size=32 }) => {
    const newClassName = [
        styles['avatar'], 
        className ? className : '',
        avatarHoverText ? styles['has-hover'] : ''
    ].join(' ');
    return(
        <div 
            className={newClassName}
            style={{
                width: size, 
                minWidth: size, 
                height: size, 
                borderRadius: rounded ? '50%' : 'var(--border-radius)'
            }}
            data-hover-text={avatarHoverText}
            onClick={onAvatarClick}
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
        </div>
    )
}