import Link from 'next/link';
import React from 'react';
import { HasPopout } from '../../popouts/HasPopout';
import { UserPopout } from '../../popouts/user-popout/UserPopout';
import styles from '../../styles/Post.module.scss';
import { UserType } from '../../utils/types';

export const CommentAuthor: React.FC<UserType> = (user) => {
    const { username, displayName } = user;
    return(
        <HasPopout
            popout={(
                <UserPopout 
                    {...user}
                />
            )}
        >
            <div className={styles['comment-author']}>
                <Link href={`/${username}`}>
                    {displayName}
                </Link>
            </div>
        </HasPopout>
    )
}