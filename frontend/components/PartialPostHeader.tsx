import React from 'react';
import styles from '../styles/PartialPost.module.scss';
import { getReadableTimeFromUnix } from '../utils';
import { UserType } from '../utils/types';
import { Flex } from './Flex';
import { PopoutAvatar } from './PopoutAvatar';
import { PopoutUsername } from './PopoutUsername';

type Props = {
    author: UserType;
    createdAt: string;
}
export const PartialPostHeader: React.FC<Props> = ({ author, createdAt }) => {
    return(
        <Flex>
            <Flex alignItems={'center'}>
                <PopoutAvatar 
                    {...author} 
                    size={36}
                    className={styles['avatar']}
                />
                <div>
                    <PopoutUsername {...author} />
                    <span className={styles['timestamp']}>
                        {getReadableTimeFromUnix(createdAt)}
                    </span>
                </div>
            </Flex>
        </Flex>
    )
}