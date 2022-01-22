import Link from 'next/link';
import React from 'react';
import { getReadableTimeFromUnix } from '../../utils';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';
import styles from '../../styles/Post.module.scss';
import { useAppSelector } from '../../redux/hooks';
import { selectActivePostAuthor, selectActivePostDate } from '../../redux/selectors';
import { PopoutAvatar } from '../PopoutAvatar';
import { PopoutUsername } from '../PopoutUsername';

export const HeaderMain = () => {
    const createdAt = useAppSelector(state => selectActivePostDate(state));
    const author = useAppSelector(state => selectActivePostAuthor(state));

    return(
        <Flex alignItems={'center'}>
            <PopoutAvatar 
                {...author}
                className={styles['author-avatar']}
                size={42}
            />
            <Flex 
                className="author-text"
                flexDirection={'column'}
            >
                <PopoutUsername 
                    {...author}
                    className={styles['author-name']}
                />
                <span className={styles['post-timestamp']}>
                    {getReadableTimeFromUnix(createdAt)}
                </span>
            </Flex>
        </Flex>
    )
}