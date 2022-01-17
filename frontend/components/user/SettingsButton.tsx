import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../Button';

export const SettingsButton = () => {
    const router = useRouter();

    return(
        <Button type={'secondary'} onClick={() => router.push('/settings/profile')}>
            Settings
        </Button>
    )
}