import React from 'react';
import { Flex } from '../Flex';
import styles from '../../styles/User.module.scss';
import { getReadableTimeFromUnix } from '../../utils';
import { PopoutAvatar } from '../PopoutAvatar';
import { useAppSelector } from '../../redux/hooks';
import { selectProfileUser } from '../../redux/selectors';
import { PopoutUsername } from '../PopoutUsername';

type Props = {
    createdAt: string;
}
export const ProfilePostHeaderMain: React.FC<Props> = ({ createdAt }) => {
    const profile = useAppSelector(state => selectProfileUser(state));
    return(
        <Flex
            className={styles['header-main']}
            alignItems={'center'}
        >
            <PopoutAvatar 
                {...profile}
                className={styles['post-avatar']}
            />
            <Flex 
                flexDirection={'column'}
                className={styles['header-text']}
            >
                <PopoutUsername 
                    {...profile}
                />
                <span className={styles['created-at']}>
                    {getReadableTimeFromUnix(createdAt)}
                </span>
            </Flex>
        </Flex>
    )
}