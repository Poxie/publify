import React from 'react';
import styles from '../../styles/Loading.module.scss';
import { Flex } from '../Flex';
import { LoadingAvatar } from './LoadingAvatar';
import { LoadingText } from './LoadingText';

export const LoadingPost = () => {
    return(
        <div className={styles['loading-post']}>
            <Flex alignItems={'center'}>
                <LoadingAvatar 
                    size={32}
                    hasMarginRight={true}
                />
                <LoadingText 
                    maxWidth={150}
                    height={16}
                />
            </Flex>
            <LoadingText 
                maxWidth={350}
                style={{marginTop: 15}}
                height={22}
            />
        </div>
    )
}