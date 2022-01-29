import React from 'react';
import styles from '../../styles/Navbar.module.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '../Input';
import { useTranslation } from 'next-i18next';
import { Flex } from '../Flex';

export const NavbarInput = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const router = useRouter();

    const onSubmit = () => {
        router.push(`/${search}`);
    }

    return(
        <Flex>
            <Input 
                placeholder={t('navbarSearch')}
                type={'secondary'}
                onChange={setSearch}
                onSubmit={onSubmit}
                className={styles['input']}
            />
        </Flex>
    )
}