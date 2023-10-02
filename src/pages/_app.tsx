import { AppProps } from 'next/app';

import '@/styles/global.scss';

import { ContactDataContextProvider } from '@/context/contact-context';
import { TasksDataContextProvider } from '@/context/tasks-context';
import { UserContextProvider } from '@/context/user-context';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserContextProvider>
      <TasksDataContextProvider>
        <ContactDataContextProvider>
          <Component {...pageProps} />
        </ContactDataContextProvider>
      </TasksDataContextProvider>
    </UserContextProvider>
  );
}

export default MyApp;
