import Link from 'next/link';
import React from 'react';
import { HasPopout } from '../popouts/HasPopout';
import { UserPopout } from '../popouts/user-popout/UserPopout';
import { UserType } from '../utils/types';
import { Avatar } from './Avatar';

type Props = UserType & {
    size?: number;
    className?: string;
}
export const PopoutAvatar: React.FC<Props> = (props) => {
    const { displayName, username, avatar, size, className } = props;

    return(
        <HasPopout
            popout={(
                <UserPopout {...props} />
            )}
        >
            <Link href={`/${username}`}>
                <a>
                    <Avatar 
                        avatar={avatar}
                        name={displayName}
                        size={size}
                        className={className}
                    />
                </a>
            </Link>
        </HasPopout>
    )
}