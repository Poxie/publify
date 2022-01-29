import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { HomeIcon } from '../../icons/HomeIcon';
import { Flex } from '../Flex';
import Link from 'next/link';
import { ExploreIcon } from '../../icons/ExploreIcon';
import { useRouter } from 'next/router';

export const NavbarMainButtons = () => {
    return(
        <Flex className={styles['main']} justifyContent={'space-between'} alignItems={'center'}>
            <MainButton path={'/'}>
                <HomeIcon />
            </MainButton>
            <MainButton path={'/explore'}>
                <ExploreIcon />
            </MainButton>
        </Flex>
    )
}

const MainButton: React.FC<{path: string}> = ({ path, children }) => {
    const { asPath } = useRouter();

    const className = [styles['main-button'], asPath === path && styles['active']].join(' ');
    return(
        <Link href={path}>
            <a className={className}>
                {children}
            </a>
        </Link>
    )
}