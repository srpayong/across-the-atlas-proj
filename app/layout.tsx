import './globals.scss';
import { Domine, Questrial } from 'next/font/google';
import { cookies } from 'next/headers';
import Link from 'next/link';
import { AiFillShop } from 'react-icons/ai';
import { BsFillPersonFill, BsPersonPlus } from 'react-icons/bs';
import { CiLogin } from 'react-icons/ci';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { getUserBySessionToken } from '../database/users';
import { logout } from './(auth)/logout/actions';
import { capitalizeName } from './[username]/capitalizedName';
import { LogoutButton } from './Components/LogoutButton';
import NavBar from './Components/NavBar';
import styles from './styles/Navbar.module.scss';

export const questrial = Questrial({
  weight: '400',
  subsets: ['latin'],
  display: 'swap',
});

export const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata = {
  title: 'Hello',
  description: 'Lorem Ipsum',
};

type LayoutProps = {
  children: string;
};

export default async function RootLayout({ children }: LayoutProps) {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  return (
    <html lang="en">
      <head>
        <meta name="theme-color" content="#ffffff" />
      </head>
      <body className={questrial.className}>
        <nav className={styles.navigationBar}>
          <NavBar />
          <div className={`${styles.logo} ${domine.className}`}>
            <Link href="/">Hello</Link>
          </div>
          {/* desktop */}
          <div className={styles.desktopLoginButtons}>
            {user ? (
              <div className={styles.loggedIn}>
                <Link
                  href={`/${user.profileName.toLowerCase()}`}
                  className={styles.desktopLoggedInLink}
                >
                  {capitalizeName(user.profileName)}
                </Link>{' '}
                |
                <Link
                  href="/blogs/my-blog"
                  className={styles.desktopLoggedInLink}
                >
                  My blog
                </Link>
                <LogoutButton logout={logout} />
              </div>
            ) : (
              <div className={styles.desktopLoggedOut}>
                <Link href="/login">Login</Link>|
                <Link href="/register" className={styles.desktopRegisterButton}>
                  Register
                </Link>
              </div>
            )}
          </div>
          {/* mobile */}
          <div className={styles.loginButton}>
            {user ? (
              <Link
                href={`/${user.username}`}
                className={styles.dropdownButton}
              >
                <RiAccountPinCircleLine />
              </Link>
            ) : (
              <RiAccountPinCircleLine />
            )}
            <div className={styles.dropdownOptions}>
              <div className={styles.dropdownLink}>
                {user ? (
                  <>
                    <div className={styles.profile}>
                      <div className={styles.username}>
                        <BsFillPersonFill />
                        <Link href={`/${user.username}`}>{user.username}</Link>
                      </div>
                      <div className={styles.myblog}>
                        <AiFillShop />
                        <Link href="/blogs/my-blog">My blog</Link>
                      </div>
                    </div>

                    <LogoutButton logout={logout} />
                  </>
                ) : (
                  <div className={styles.loginButtons}>
                    <div className={styles.loginButton}>
                      <CiLogin />
                      <Link href="/login">Login</Link>
                    </div>
                    <div className={styles.registerButton}>
                      <BsPersonPlus />
                      <Link href="/register">Register</Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </nav>
        {children}
        Footer
      </body>
    </html>
  );
}
