import { useTranslation } from 'next-i18next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../components/Button';
import { Flex } from '../components/Flex';
import { ArrowIcon } from '../icons/ArrowIcon';
import styles from '../styles/404.module.scss';

export default function _404() {
    const router = useRouter();
    const { t } = useTranslation('404');

    return(
        <Flex className={styles['container']} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            <h2 className={styles['header']}>
                {t('header')}
            </h2>
            <span className={styles['description']}>
                {t('description')}
            </span>
            <Flex className={styles['buttons']}>
                <Button type={'secondary'} onClick={() => router.back()}>
                    <Flex alignItems={'center'}>
                        <ArrowIcon />
                        <span>
                            {t('goBackText')}
                        </span>
                    </Flex>
                </Button>
                <Button onClick={() => router.push('/')}>
                    {t('feedText')}
                </Button>
            </Flex>
        </Flex>
    )
}

export const getStaticProps = async ({ locale }) => {
    return{
        props: {
            ...(await serverSideTranslations(locale, ['common', '404']))
        }
    }
}