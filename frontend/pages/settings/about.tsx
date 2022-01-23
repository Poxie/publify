import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import React from 'react';
import { ReactElement } from 'react';
import { AboutPage } from '../../components/settings/about/AboutPage';
import { MainLayout } from '../../layouts/MainLayout';
import { SettingsLayout } from '../../layouts/SettingsLayout';

export default function About() {
    return(
        <>
        <AboutPage />
        </>
    )
}

export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'settings']))
        }
    }
} 

About.getLayout = (page: ReactElement) => {
    return(
        <MainLayout>
            <SettingsLayout>
                {page}
            </SettingsLayout>
        </MainLayout>
    )
}