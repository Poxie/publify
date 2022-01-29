import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router"
import { useEffect } from "react";

export default function Settings() {
    const router = useRouter();
    
    useEffect(() => {
        // On mount, redirect to profile settings
        router.replace('/settings/profile')
    }, []);

    return(
        <></>
    )
}

export const getStaticProps = async ({ locale }) => {
    return {
        props: {
            ...(await serverSideTranslations(locale, ['common', 'settings']))
        }
    }
} 