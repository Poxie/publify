import { serverSideTranslations } from "next-i18next/serverSideTranslations"
import { ExploreLayout } from "../../layouts/ExploreLayout"
import { MainLayout } from "../../layouts/MainLayout"

export default function Posts() {
    return(
        <div>
            posts
        </div>
    )
}

Posts.getLayout = page => {
    return(
        <MainLayout>
            <ExploreLayout>
                {page}
            </ExploreLayout>
        </MainLayout>
    )
}

export const getStaticProps = async ({ locale }) => {
    return{
        props: {
            ...(await serverSideTranslations(locale))
        }
    }
}