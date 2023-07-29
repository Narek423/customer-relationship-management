import * as React from 'react';

import SignIn from '../../pages/sign-in';
import Footer from '@/components/layout/footer';
import Header from '@/components/layout/header';
import ProfilePage from '@/pages/profile-page';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <main>
        <ProfilePage />
      </main>

      <Footer />

      <SignIn />
    </>
  );
}
