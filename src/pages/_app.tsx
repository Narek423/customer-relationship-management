import { AppProps } from 'next/app';

import '@/styles/global.scss';
import { UserContextProvider } from '@/user-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <Component {...pageProps} />
    </UserContextProvider>
  );
}

export default MyApp;
