import './globals.css';
import { Domine, Questrial } from 'next/font/google';
import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { AiFillShop } from 'react-icons/ai';
import { BsFillPersonFill, BsPersonPlus } from 'react-icons/bs';
import { CiLogin } from 'react-icons/ci';
import { RiAccountPinCircleLine } from 'react-icons/ri';
import { getUserBySessionToken } from '../database/users';
import { logout } from './(auth)/logout/actions';
import { capitalizeName } from './[username]/capitalizedName';
import Footer from './components/Footer';
import { LogoutButton } from './components/LogoutButton';
import NavBar from './components/NavBar';
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
  title: 'Across the Atlas | Home',
  description: 'Adventure is worthwhile.',
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
        <meta charSet="utf-8" />
        <link rel="icon" href="%PUBLIC_URL%/favicon.ico" type="image/png" />
      </head>
      <body className="bg-custom2 text-primary">
        <nav className={styles.navigationBar}>
          <NavBar />
          <div className={`${styles.logo} ${domine.className}`}>
            {/* Use the Image component directly inside the Link */}
            <Link href="/">
              <Image src="/logo1.png" alt="Logo" width={50} height={50} />
            </Link>
          </div>
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
                  My Blogs
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
        <Footer />
      </body>
    </html>
  );
}
