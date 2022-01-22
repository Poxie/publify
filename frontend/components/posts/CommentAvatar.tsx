import Link from 'next/link';
import React from 'react';
import { HasPopout } from '../../popouts/HasPopout';
import { UserPopout } from '../../popouts/user-popout/UserPopout';
import { UserType } from '../../utils/types';
import { Avatar } from '../Avatar';

export const CommentAvatar: React.FC<UserType> = (user) => {
    const { displayName, avatar, username } = user;

    return(
        <Link href={`/${username}`}>
            <a>
                <HasPopout
                    popout={(
                        <UserPopout 
                            {...user}
                        />
                    )}
                >
                    <Avatar 
                        avatar={avatar}
                        name={displayName}
                        size={34}
                    />
                </HasPopout>
            </a>
        </Link>
    )
}