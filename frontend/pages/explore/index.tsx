import React from 'react';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { MainLayout } from '../../layouts/MainLayout';
import { ExploreLayout } from '../../layouts/ExploreLayout';

export default function Explore() {
    return(
        <div>
            explroey
        </div>
    )
}

Explore.getLayout = page => {
    return(
        <MainLayout>
            <ExploreLayout>
                {page}
            </ExploreLayout>
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