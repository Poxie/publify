import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Flex } from '../components/Flex';
import styles from '../styles/Explore.module.scss';

export const ExploreLayout: React.FC = ({ children }) => {
    const { asPath } = useRouter();

    const type = asPath.split('/')[2];
    return(
        <Flex className={styles['explore']} flexDirection={'column'}>
            <div className={styles['header']}>
                Explore popular {type}
            </div>
            <Flex className={styles['main']}>
                <ExploreSidebar />
                {children}
            </Flex>
        </Flex>
    )
}

const ExploreSidebar: React.FC = () => {
    return(
        <div className={styles['sidebar']}>
            <ExploreSidebarItem path={'users'}>
                Users
            </ExploreSidebarItem>
            <ExploreSidebarItem path={'posts'}>
                Posts
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