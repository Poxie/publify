import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { LanguagePage } from "../../components/settings/languages/LanguagePage";
import { SettingsMain } from "../../components/settings/SettingsMain";
import { MainLayout } from "../../layouts/MainLayout";
import { SettingsLayout } from "../../layouts/SettingsLayout";

export default function Languages() {
    const { t } = useTranslation('settings');

    return(
        <SettingsMain title={t('languagesTab')}>
            <LanguagePage />
        </SettingsMain>
    )
}

Languages.getLayout = page => {
    return(
        <MainLayout>
            <SettingsLayout>
                {page}
            </SettingsLayout>
        </MainLayout>
    )
}

export const getStaticProps = async ({ locale }) => {
    return{
        props: {
            ...(await serverSideTranslations(locale, ['settings']))
        }
    }
}