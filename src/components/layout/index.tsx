import * as React from 'react';

import SignIn from '../../pages/sign-in';
import ProfilePage from '@/pages/profile-page';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <main>
        <ProfilePage />
      </main>
      <SignIn />
    </>
  );
}
