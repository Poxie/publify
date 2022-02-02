import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { NotificationsPage } from '../../components/settings/notifications/NotificationsPage';
import { MainLayout } from '../../layouts/MainLayout';
import { SettingsLayout } from '../../layouts/SettingsLayout';

export default function Notifications() {
    return(
        <NotificationsPage />
    )
}

Notifications.getLayout = page => {
    return(
        <MainLayout>
            <SettingsLayout>
                {page}
            </SettingsLayout>
        </MainLayout>
    )
}

export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}