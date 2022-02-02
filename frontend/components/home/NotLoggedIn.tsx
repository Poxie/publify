import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { useModal } from '../../contexts/ModalProvider';
import { LoginModal } from '../../modals/login/LoginModal';
import styles from '../../styles/Home.module.scss';
import { Button } from '../Button';
import { Flex } from '../Flex';

export const NotLoggedIn = () => {
    const { t } = useTranslation();
    const router = useRouter();

    return(
        <Flex className={styles['empty']} flexDirection={'column'}>
            <span className={styles['title']}>
                {t('notLoggedInTitle')}
            </span>
            <span>
                {t('notLoggedInSubtitle')}
            </span>
            <Flex justifyContent={'center'}>
                <Button className={styles['explore-button']} type={'secondary'} onClick={() => router.push('/explore/users')}>
                    {t('exploreUsersButton')}
                </Button>
                <LoginButton />
            </Flex>
        </Flex>
    )
}

const LoginButton = () => {
    const { t } = useTranslation();
    const { setModal } = useModal();

    return(
        <Button className={styles['explore-button']} onClick={() => setModal(<LoginModal />)}>
            {t('login')}
        </Button>
    )
}