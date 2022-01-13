import React from 'react';
import styles from '../../styles/Post.module.scss';
import { CloseIcon } from '../../icons/CloseIcon';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { Flex } from '../Flex';
import { BackHeader } from './BackHeader';

export const MediaHeader = () => {
    return(
        <Flex 
            className={styles['media-header']} 
            alignItems={'center'}
        >
            <BackHeader />
        </Flex>
    )
}