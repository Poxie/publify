import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import styles from '../../styles/User.module.scss';
import { Flex } from '../Flex';

type Props = {
    text: string;
    path: string;
}
const NavigationItem: React.FC<Props> = ({ text, path }) => {
    const { asPath, query } = useRouter();
    const { username } = query;

    const href = `/${username}${path}`;
    const className = [styles['navigation-item'], href === asPath ? styles['active'] : ''].join(' ');
    return(
        <div className={className}>
            <Link href={`/${username}${path}`}>
                {text}
            </Link>
        </div>
    )
}

export const ProfileNavigation = () => {
    const { t } = useTranslation('profile');

    return(
        <Flex className={styles['navigation']}>
            <NavigationItem 
                text={t('overviewTab')}
                path={''}
            />
            <NavigationItem 
                text={t('imagesTab')}
                path={'/images'}
            />
            <NavigationItem 
                text={t('aboutTab')}
                path={'/about'}
            />
        </Flex>
    )
}