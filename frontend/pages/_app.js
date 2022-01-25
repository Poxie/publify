import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthProvider';
import { ModalProvider } from '../contexts/ModalProvider';
import { ChangeProvider } from '../contexts/ChangeProvider';
import { PopoutProvider } from '../contexts/PopoutProvider';
import { Navbar } from '../components/navbar/Navbar';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { NotificationLayout } from '../layouts/NotificationLayout';
import { appWithTranslation } from 'next-i18next';
import { useEffect, useRef } from 'react';
import { useRouter } from 'next/router';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const isMounted = useRef(false);
  const getLayout = Component.getLayout ?? (page => page);

  useEffect(() => {
    if(!window.localStorage.i18nextLng || router.locale === window.localStorage.i18nextLng) return;

    // Changes language to preferred locale from localStorage
    router.replace(router.asPath, undefined, { locale: window.localStorage.i18nextLng, shallow: isMounted.current });
    isMounted.current = true;
  }, [router]);

  return(
    <AuthProvider>
      <Provider store={store}>
        <ChangeProvider>
          <ModalProvider>
            <NotificationLayout>
              <PopoutProvider>
                <Navbar />
                {getLayout(<Component {...pageProps} />)}
              </PopoutProvider>
            </NotificationLayout>
          </ModalProvider>
        </ChangeProvider>
      </Provider>
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)
