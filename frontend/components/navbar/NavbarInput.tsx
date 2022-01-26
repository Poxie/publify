import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '../Input';
import { useTranslation } from 'next-i18next';

export const NavbarInput = () => {
    const { t } = useTranslation();
    const [search, setSearch] = useState('');
    const router = useRouter();

    const onSubmit = () => {
        router.push(`/${search}`);
    }

    return(
        <Input 
            placeholder={t('navbarSearch')}
            type={'secondary'}
            onChange={setSearch}
            onSubmit={onSubmit}
        />
    )
}