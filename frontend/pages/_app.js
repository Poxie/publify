import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { NotificationLayout } from '../layouts/NotificationLayout';

function MyApp({ Component, pageProps }) {
  return(
    <AuthProvider>
      <Provider store={store}>
        <NotificationLayout>
          <Component {...pageProps} />
        </NotificationLayout>
      </Provider>
    </AuthProvider>
  )
}

export default MyApp
