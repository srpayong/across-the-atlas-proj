'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BiSolidChevronDown } from 'react-icons/bi';
import { CgClose } from 'react-icons/cg';
import { RxHamburgerMenu } from 'react-icons/rx';
import styles from '../styles/Navbar.module.scss';

export default function NavBar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <div className={`${styles.nav} ${menuOpen ? styles[`navOpen`] : {}}`}>
        <ul className={styles.navLinks}>
          <li className={styles.navList}>
            <Link href="/">Home</Link>
          </li>

          <li className={styles.discoverDropdown}>
            <div className={styles.discoverDropdownButton}>
              <p>Explore</p>
              <BiSolidChevronDown />
            </div>

            <div className={styles.discoverDropdownOptions}>
              <ul className={styles.discoverLink}>
                <li>
                  <Link href="/blogs" className={styles.discoverList}>
                    Bloggers
                  </Link>
                </li>
                <li>
                  <Link href="/trips" className={styles.discoverList}>
                    Trips
                  </Link>
                </li>
              </ul>
            </div>
          </li>

          <li className={styles.navList}>
            <Link href="/about">About Us</Link>
          </li>
          <li className={styles.navList}>
            <Link href="/contact">Contact Us</Link>
          </li>
        </ul>
      </div>

      <button onClick={toggleMenu} className={styles.hamburgerIcon}>
        {!menuOpen ? <RxHamburgerMenu /> : <CgClose />}
      </button>
    </>
  );
}
