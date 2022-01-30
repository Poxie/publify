import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../components/Button';
import { Flex } from '../components/Flex';
import { ArrowIcon } from '../icons/ArrowIcon';
import styles from '../styles/404.module.scss';

export default function _404() {
    const router = useRouter();

    return(
        <Flex className={styles['container']} alignItems={'center'} justifyContent={'center'} flexDirection={'column'}>
            <h2 className={styles['header']}>
                Hmm.. there is nothing here!
            </h2>
            <span className={styles['description']}>
                Make sure to check the link you have entered, perhaps you made a typo. If not, it is possible the resource has been deleted.
            </span>
            <Flex className={styles['buttons']}>
                <Button type={'secondary'} onClick={() => router.back()}>
                    <Flex alignItems={'center'}>
                        <ArrowIcon />
                        <span>
                            Let's go back
                        </span>
                    </Flex>
                </Button>
                <Button onClick={() => router.push('/')}>
                    Go to My Feed
                </Button>
            </Flex>
        </Flex>
    )
}

export const getStaticProps = async ({ locale }) => {
    return{
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}