'use client';

import { Route } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RxEyeClosed, RxEyeOpen } from 'react-icons/rx';
import { getSafeReturnToPath } from '../../../util/validation';
import { LoginResponseBodyPost } from '../../api/(auth)/login/route';
import styles from '../../styles/loginPage.module.scss';

type Props = { returnTo?: string };

export default function LoginForm(props: Props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [passwordShown, setPasswordShown] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string>();
  const router = useRouter();

  async function login() {
    const response = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
      }),
    });

    const data: LoginResponseBodyPost = await response.json();

    if ('error' in data) {
      setError(data.error);
      // console.log(data.error);
      return;
    }
    setSuccess(true);
    router.push(
      getSafeReturnToPath(props.returnTo) ||
        (`/${data.user.username.toLowerCase()}` as Route),
    );
    router.refresh();
  }

  const togglePassword = () => {
    setPasswordShown(!passwordShown);
  };

  return (
    <div className={styles.loginContainer}>
      <div className={styles.form}>
        <div className={styles.greeting}>
          <h1>Welcome back! </h1>
          <p className={styles.loginMessage}>Login to your account</p>
        </div>

        <form
          onSubmit={(event) => event.preventDefault()}
          id="login"
          className={styles.loginForm}
        >
          <div>
            <label htmlFor="username">
              Username <span>*</span>
            </label>
            <input
              id="username"
              value={username}
              onChange={(event) => setUsername(event.currentTarget.value)}
            />
          </div>

          <div>
            <label htmlFor="password">
              Password <span>*</span>
            </label>

            <div>
              <input
                id="password"
                type={passwordShown ? 'text' : 'password'}
                value={password}
                onChange={(event) => setPassword(event.currentTarget.value)}
              />
              <button
                onClick={togglePassword}
                className={styles.showPasswordButton}
              >
                {passwordShown ? <RxEyeClosed /> : <RxEyeOpen />}
              </button>
            </div>
          </div>
          <button
            className={styles.loginSubmit}
            onClick={async () => await login()}
          >
            Log in
          </button>
          {error !== '' && <div className={styles.error}>{error}</div>}
          {success && (
            <figure className={styles.notification}>
              <div className={styles.notificationBody}>
                You are now logged in. Redirecting to login page.
              </div>
              <div className={styles.notificationProgress} />
            </figure>
          )}
          <div className={styles.signupContainer}>
            <p>
              Don't have an account yet?
              <Link href="/register" className={styles.registerLink}>
                Register
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
