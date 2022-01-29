import React from 'react';
import styles from '../../styles/Loading.module.scss';
import { Flex } from '../Flex';
import { LoadingProfile } from './LoadingProfile';

export const LoadingProfiles = () => {
    return(
        <Flex className={styles['loading-profiles']} flexWrap={'wrap'}>
            <LoadingProfile />
            <LoadingProfile />
            <LoadingProfile />
            <LoadingProfile />
            <LoadingProfile />
            <LoadingProfile />
            <LoadingProfile />
            <LoadingProfile />
        </Flex>
    )
}