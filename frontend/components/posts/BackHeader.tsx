import React from 'react';
import styles from '../../styles/Post.module.scss';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { Flex } from '../Flex';
import { useRouter } from 'next/router';

export const BackHeader = () => {
    const router = useRouter();

    const goBack = () => {
        router.back();
    }

    return(
        <Flex
            alignItems={'center'}
            className={styles['go-back']}
            onClick={goBack}
        >
            <ArrowIcon />
            <span>
                Go back
            </span>
        </Flex>
    )
}