import Image from 'next/image';
import React, { useState } from 'react';
import { OptionsIcon } from '../../icons/OptionsIcon';
import styles from '../../styles/User.module.scss';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import { PostOptions } from './PostOptions';

interface Props {
    name: string;
    avatar: string;
    postId: string;
    authorId: string;
}
export const ProfilePostHeader: React.FC<Props> = ({ name, avatar, postId, authorId }) => {
    const [options, setOptions] = useState(false);

    const toggle = () => {
        setOptions(previous => !previous);
    }

    return(
        <Flex 
            className={styles['post-header']}
            justifyContent={'space-between'}
        >
            <Flex
                className={styles['header-main']}
                alignItems={'center'}
            >
                <Avatar 
                    avatar={avatar}
                    name={name}
                    className={styles['post-avatar']}
                />
                <span>
                    {name}
                </span>
            </Flex>
            <div className={styles['post-options']}>
                <div 
                    className={options ? styles['active'] : ''}
                    onClick={toggle}
                >
                    <OptionsIcon />
                </div>
                {options && (
                    <PostOptions 
                        postId={postId}
                        authorId={authorId}
                        close={toggle}
                    />
                )}
            </div>
        </Flex>
    )
}