import { ProfileEditor } from "../../components/settings/profile/ProfileEditor";
import { SettingsMain } from "../../components/settings/SettingsMain"
import { MainLayout } from "../../layouts/MainLayout"
import { SettingsLayout } from "../../layouts/SettingsLayout"

export default function Profile() {
    return(
        <SettingsMain title={'Profile'}>
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