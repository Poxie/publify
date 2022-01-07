import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthProvider';
import { ModalProvider } from '../contexts/ModalProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { NotificationLayout } from '../layouts/NotificationLayout';

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Provider store={store}>
        <ModalProvider>
          <NotificationLayout>
            <Component {...pageProps} />
          </NotificationLayout>
        </ModalProvider>
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
