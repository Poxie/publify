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
    console.log(href, asPath)
    const className = [styles['navigation-item'], href === asPath ? styles['active'] : ''].join(' ');
    return(
        <div className={className}>
            <Link href={`/${username}/${path}`}>
                {text}
            </Link>
        </div>
    )
}

export const ProfileNavigation = () => {
    const router = useRouter();
    const { username } = router.query;
    return(
        <Flex className={styles['navigation']}>
            <NavigationItem 
                text={'Overview'}
                path={''}
            />
            <NavigationItem 
                text={'Images'}
                path={'/images'}
            />
        </Flex>
    )
}