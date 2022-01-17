import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { ProfileEditor } from "../../components/settings/profile/ProfileEditor";
import { SettingsMain } from "../../components/settings/SettingsMain"
import { MainLayout } from "../../layouts/MainLayout"
import { SettingsLayout } from "../../layouts/SettingsLayout"

export default function Profile() {
    const { t } = useTranslation('settings');

    return(
        <SettingsMain title={t('profileTab')}>
            <ProfileEditor />
        </SettingsMain>
    )
}

Profile.getLayout = page => {
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
            ...(await serverSideTranslations(locale, ['settings']))
        }
    }
}