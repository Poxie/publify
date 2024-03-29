import { useTranslation } from 'next-i18next';
import Link from 'next/link';
import React, { useRef } from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import styles from '../../styles/Navbar.module.scss';
import { getAutoCompletedUsers } from '../../utils';
import { UserType } from '../../utils/types';
import { Avatar } from '../Avatar';
import { Flex } from '../Flex';

export const NavbarSearchResults: React.FC<{query: string, close: () => void}> = ({ query, close }) => {
    const { t } = useTranslation();
    const [items, setItems] = useState<UserType[]>([]);
    const ref = useRef<HTMLDivElement>(null);

    // Fetching suggestions
    useEffect(() => {
        if(!query) return setItems([]);

        getAutoCompletedUsers(query).then(setItems);
    }, [query]);

    // Detecting click outside
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            // @ts-ignore
            if(ref.current && !ref.current.contains(e.target)) {
                close();
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return(
        <div className={styles['search-results']} ref={ref}>
            <div className={styles['search-header']}>
                {t('searchFor')} {' '}
                <span className={styles['search-query']}>
                    {query}
                </span>
            </div>
            {items.map(item => {
                return(
                    <SearchResult 
                        user={item}
                        close={close}
                        key={item.id} 
                    />
                )
            })}
            {!items.length && query && (
                <span className={styles['result-info']}>
                    {t('noUsersFound')}
                </span>
            )}
            {!query && (
                <span className={styles['result-info']}>
                    {t('emptyQuery')}
                </span>
            )}
        </div>
    )
}

const SearchResult: React.FC<{user: UserType, close: () => void}> = ({ user, close }) => {
    const { t } = useTranslation();
    const { avatar, displayName, username, followersCount } = user;

    return(
        <Link href={`/${username}`}>
            <Flex className={styles['search-result']} alignItems={'center'} onClick={close}>
                <Avatar 
                    avatar={avatar}
                    size={40}
                    name={displayName}
                    className={styles['search-avatar']}
                />
                <div className={styles['search-result-text']}>
                    {displayName}
                    <Flex className={styles['result-stats']}>
                        {followersCount} {t('followers')}
                    </Flex>
                </div>
            </Flex>
        </Link>
    )
}