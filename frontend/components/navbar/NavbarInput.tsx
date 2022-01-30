import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '../Input';
import { useTranslation } from 'next-i18next';
import { Flex } from '../Flex';
import { NavbarSearchResults } from './NavbarSearchResults';
import { useEffect } from 'react';

export const NavbarInput = () => {
    const { t } = useTranslation();
    const [query, setQuery] = useState('');
    const [showSuggestions, setShowSuggestions] = useState(false);
    const router = useRouter();

    // On search submit
    const onSubmit = () => {
        router.push(`/${query}`);
        setShowSuggestions(false);
    }

    // Showing suggestions on query change
    useEffect(() => {
        if(!showSuggestions && query) {
            setShowSuggestions(true);
        }
    }, [query]);

    return(
        <Flex className={styles['input-container']}>
            <Input 
                placeholder={t('navbarSearch')}
                type={'secondary'}
                onChange={setQuery}
                onSubmit={onSubmit}
                className={styles['input']}
                onFocus={() => setShowSuggestions(true)}
            />
            {showSuggestions && (
                <NavbarSearchResults query={query} close={() => setShowSuggestions(false)} />
            )}
        </Flex>
    )
}