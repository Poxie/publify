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
            <Flex flexWrap={'wrap'}>
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
                <LoadingText 
                    minWidth={50}
                    maxWidth={110}
                    minHeight={25}
                    maxHeight={25}
                />
            </Flex>
        </Flex>
    )
}