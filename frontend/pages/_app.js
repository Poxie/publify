import '../styles/globals.css'
import { AuthProvider } from '../contexts/AuthProvider';
import { ModalProvider } from '../contexts/ModalProvider';
import { Provider } from 'react-redux';
import { store } from '../redux/store';
import { NotificationLayout } from '../layouts/NotificationLayout';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context'
import { createUploadLink } from "apollo-upload-client";

const httpLink = createUploadLink({
  uri: process.env.NEXT_PUBLIC_API_ENDPOINT,
})
const authLink = setContext((_, { headers }) => {
  const token = localStorage.accessToken;

  return {
    headers: {
      ...headers,
      authorization: `Bearer ${token}`
    }
  }
})

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink)
})


function MyApp({ Component, pageProps }) {
  return(
    <ApolloProvider client={client}>
      <AuthProvider>
        <Provider store={store}>
          <ModalProvider>
            <NotificationLayout>
              <Component {...pageProps} />
            </NotificationLayout>
          </ModalProvider>
        </Provider>
      </AuthProvider>
    </ApolloProvider>
  )
}

export default MyApp
