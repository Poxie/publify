import React from 'react';
import styles from '../../styles/Post.module.scss';
import { ArrowIcon } from '../../icons/ArrowIcon';
import { Flex } from '../Flex';
import { useRouter } from 'next/router';
import { useTranslation } from 'next-i18next';

export const BackHeader = () => {
    const { t } = useTranslation('post');
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
                {t('goBackButton')}
            </span>
        </Flex>
    )
}