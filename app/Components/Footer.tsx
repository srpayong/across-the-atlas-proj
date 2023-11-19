import { Domine } from 'next/font/google';
import Link from 'next/link';
import { AiFillInstagram, AiFillTwitterCircle } from 'react-icons/ai';
import { BsFacebook, BsPinterest } from 'react-icons/bs';

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export default function Footer() {
  return (
    <footer className="footer footer-center pt-10 mt-50 text-base-content rounded bg-secondary text-custom2">
      <nav className="grid grid-flow-col gap-4 text-1xl">
        <Link href="/" className={domine.className}>
          Across the Atlas
        </Link>
        <Link href="/about">About</Link>
        <Link href="/">Contact Us</Link>
      </nav>
      <nav>
        <div className="grid grid-flow-col gap-4">
          <a
            href="your-facebook-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsFacebook />
          </a>
          <a href="your-twitter-link" target="_blank" rel="noopener noreferrer">
            <AiFillTwitterCircle />
          </a>
          <a
            href="your-instagram-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <AiFillInstagram />
          </a>
          <a
            href="your-pinterest-link"
            target="_blank"
            rel="noopener noreferrer"
          >
            <BsPinterest />
          </a>
        </div>
      </nav>
      <aside>
        <p>Copyright © 2023 - All right reserved by ACME Industries Ltd</p>
      </aside>
    </footer>
  );
}
