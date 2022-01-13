import React from 'react';
import { Flex } from '../Flex';
import { LoadingAvatar } from './LoadingAvatar';
import { LoadingText } from './LoadingText';
import styles from '../../styles/Loading.module.scss';

export const LoadingComment = () => {
    return(
        <Flex className={styles['loading-comment']}>
            <LoadingAvatar 
                size={36}
            />
            <LoadingText 
                minWidth={280}
                maxWidth={400}
                minHeight={60}
                maxHeight={90}
            />
        </Flex>
    )
}