import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { Home } from '../components/home/Home';
import { HomeLayout } from '../layouts/HomeLayout';

export default function Index() {
  return(
    <Home />
  )
}

Index.getLayout = page => {
  return(
    <HomeLayout>
      {page}
    </HomeLayout>
  )
}

export const getStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale))
    }
  }
}