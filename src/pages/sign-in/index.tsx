import { FC, useState, useEffect } from 'react';

import { useRouter } from 'next/router';

import Button from '../../components/layout/button';
import Input from '../../components/layout/input';
import LoadingSpinner from '@/components/layout/loading-spinner';
import { useUserContext } from '@/user-context';

import styles from './styles.module.scss';
const SignIn: FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const router = useRouter();
  const { user, signIn } = useUserContext();

  useEffect(() => {
    user && router.push('/profile-page');
  }, [user]);
  const handleSubmit = async () => {
    setError('');
    try {
      await signIn(email, password);
      router.push('/profile-page');
    } catch (err) {
      setError('Invalid input! Please enter valid information.');
    }
  };
  return user ? (
    <LoadingSpinner />
  ) : (
    <div className={styles.main_container}>
      <div className={styles.navbar}>
        <div className={styles.logo}>SaaS Kit</div>
        <div className={styles.signIn_button}>
          <Button variant="text" onClick={() => router.push('/sign-up')}>
            Sigin up
          </Button>
        </div>
      </div>
      <div className={styles.signin_card_container}>
        <div className={styles.signin_card}>
          <div className={styles.title}>
            Sign<span>in</span>
          </div>
          {error && <div className={styles.error}>{error}</div>}
          <Input
            variant="text"
            title="Email"
            inputValue={email}
            setInputValue={setEmail}
          />
          <div className={styles.input_wrapper}>
            <Input
              variant="password"
              title="Password"
              inputValue={password}
              setInputValue={setPassword}
            />
          </div>
          <div className={styles.button_container}>
            <Button variant="contained" onClick={handleSubmit}>
              Sigin in
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default SignIn;
