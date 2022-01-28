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
                style={{marginTop: 'var(--spacing)'}}
                height={22}
            />
            <Flex style={{marginTop: 'var(--spacing)', borderTop: '1px solid var(--background-tertiary)'}}>
                <LoadingText 
                    maxWidth={50}
                    minWidth={40}
                    height={25}
                    style={{marginTop: 'var(--spacing)', marginRight: 'var(--spacing)'}}
                />
                <LoadingText 
                    maxWidth={50}
                    minWidth={50}
                    height={25}
                    style={{marginTop: 'var(--spacing)'}}
                />
            </Flex>
        </div>
    )
}