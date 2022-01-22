import Link from 'next/link';
import React from 'react';
import { HasPopout } from '../popouts/HasPopout';
import { UserPopout } from '../popouts/user-popout/UserPopout';
import { UserType } from '../utils/types';
import { Flex } from './Flex';

type Props = UserType & {
    className?: string;
}
export const PopoutUsername: React.FC<Props> = (props) => {
    const { username, displayName, className } = props;

    return(
        <Flex>
            <HasPopout
                popout={(
                    <UserPopout 
                        {...props}
                    />
                )}
            >
                <div className={className}>
                    <Link href={`/${username}`}>
                        {displayName}
                    </Link>
                </div>
            </HasPopout>
        </Flex>
    )
}