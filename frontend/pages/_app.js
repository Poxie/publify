import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthProvider';
import { ModalProvider } from '../contexts/ModalProvider';
import { ChangeProvider } from '../contexts/ChangeProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { NotificationLayout } from '../layouts/NotificationLayout';
import { appWithTranslation } from 'next-i18next';

function MyApp({ Component, pageProps }) {
  const getLayout = Component.getLayout ?? (page => page);

  return(
    <AuthProvider>
      <Provider store={store}>
        <ChangeProvider>
          <ModalProvider>
            <NotificationLayout>
              {getLayout(<Component {...pageProps} />)}
            </NotificationLayout>
          </ModalProvider>
        </ChangeProvider>
      </Provider>
    </AuthProvider>
  )
}

export default appWithTranslation(MyApp)
