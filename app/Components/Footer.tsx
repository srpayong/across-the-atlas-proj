import { Domine } from 'next/font/google';
import Link from 'next/link';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook, BsPinterest } from 'react-icons/bs';
import styles from '../styles/Footer.module.scss';

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <Link href="/" className={domine.className}>
        Across the Atlas
      </Link>
      <div>
        <Link href="/about">About</Link>
        <Link href="/">FAQ</Link>
        <BsFacebook />
        <AiFillTwitterCircle />
        <AiFillInstagram />
        <BsPinterest />
      </div>
    </footer>
  );
}
