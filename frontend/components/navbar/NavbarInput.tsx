import React from 'react';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { Input } from '../Input';

export const NavbarInput = () => {
    const [search, setSearch] = useState('');
    const router = useRouter();

    const onSubmit = () => {
        router.push(`/${search}`);
    }

    return(
        <Input 
            placeholder={'Search for user...'}
            type={'secondary'}
            onChange={setSearch}
            onSubmit={onSubmit}
        />
    )
}