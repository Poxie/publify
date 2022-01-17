import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import React from 'react';
import { Button } from '../Button';

export const SettingsButton = () => {
    const router = useRouter();
    const { t } = useTranslation('common');

    return(
        <Button type={'secondary'} onClick={() => router.push('/settings/profile')}>
            {t('settings')}
        </Button>
    )
}