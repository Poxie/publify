import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex } from '../components/Flex';
import styles from '../styles/Explore.module.scss';
import { useTranslation } from 'next-i18next';

export const ExploreLayout: React.FC = ({ children }) => {
    const { t } = useTranslation();
    const { asPath } = useRouter();

    const type = asPath.split('/')[2];
    return(
        <Flex className={styles['explore']} flexDirection={'column'}>
            <div className={styles['header']}>
                {t('explore:header', { type: t(`${type}Tab`) })}
            </div>
            <Flex className={styles['main']}>
                <ExploreSidebar />
                {children}
            </Flex>
        </Flex>
    )
}

const ExploreSidebar: React.FC = () => {
    const { t } = useTranslation();

    return(
        <div className={styles['sidebar']}>
            <ExploreSidebarItem path={'users'}>
                {t('usersTab')}
            </ExploreSidebarItem>
            <ExploreSidebarItem path={'posts'}>
                {t('postsTab')}
            </ExploreSidebarItem>
        </div>
    )
}

const ExploreSidebarItem: React.FC<{path: string}> = ({ path, children }) => {
    const { asPath } = useRouter();

    const href = `/explore/${path}`;
    const className = [styles['sidebar-item'], asPath === href && styles['active']].join(' ');
    return(
        <Link href={href}>
            <div className={className}>
                {children}
            </div>
        </Link>
    )
}