import Link from 'next/link';
import React from 'react';
import { getReadableTimeFromUnix } from '../../utils';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePost } from '../../redux/selectors';

export const HeaderMain = () => {
    const { author, createdAt } = useAppSelector(state => selectActivePost(state));
    const { avatar, username, displayName, id } = author;

    return(
        <Flex alignItems={'center'}>
            <Avatar 
                avatar={avatar}
                name={displayName}
                size={46}
                className={styles['author-avatar']}
            />
            <Flex 
                className="author-text"
                flexDirection={'column'}
            >
                <Flex alignItems={'center'}>
                    <span className={styles['author-name']}>
                        <Link href={`/${username}`}>
                            {displayName}
                        </Link>
                        <span className={styles['author-username']}>
                            <Link href={`/${username}`}>
                                {`@${username}`}
                            </Link>
                        </span>
                    </span>
                </Flex>
                <span className={styles['post-timestamp']}>
                    {getReadableTimeFromUnix(createdAt)}
                </span>
            </Flex>
        </Flex>
    )
}