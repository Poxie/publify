import React from 'react';
import { OptionsIcon } from '../icons/OptionsIcon';
import styles from '../styles/PartialPost.module.scss';
import { getReadableTimeFromUnix } from '../utils';
import { UserType } from '../utils/types';
import { Flex } from './Flex';
import { Options } from './Options';
import { PartialPostOptions } from './PartialPostOptions';
import { PopoutAvatar } from './PopoutAvatar';
import { PopoutUsername } from './PopoutUsername';

type Props = {
    author: UserType;
    createdAt: string;
    postId: string;
}
export const PartialPostHeader: React.FC<Props> = ({ author, createdAt, postId }) => {
    return(
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
            <PartialPostOptions postId={postId} authorId={author.id} />
        </Flex>
    )
}