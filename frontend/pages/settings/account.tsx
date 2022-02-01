import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { AccountPage } from '../../components/settings/account/AccountPage';
import { MainLayout } from '../../layouts/MainLayout';
import { SettingsLayout } from '../../layouts/SettingsLayout';

export default function Account() {
    return(
        <AccountPage />
    )
}

Account.getLayout = page => {
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