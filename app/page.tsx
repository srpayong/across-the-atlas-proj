import { Domine } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import coverphoto1 from '../public/home/coverphoto1.jpeg';
import coverphoto2 from '../public/home/coverphoto2.jpeg';
import coverphoto3 from '../public/home/coverphoto3.jpeg';
import coverphoto4 from '../public/home/coverphoto4.jpeg';
import coverphoto5 from '../public/home/coverphoto5.jpeg';
// import Portfolio from './Components/Portfolio/Portfolio';
// import Questions from './Components/Questions/Questions';
import styles from './styles/homepage.module.scss';

const domine = Domine({ subsets: ['latin'] });

export default function Home() {
  return (
    <main>
      <section className={styles.heroSection}>
        <h1 className={domine.className}>
          Discover the beauty of the world, one destination at a time.
        </h1>

        <Link href="/blogs">
          <p className={styles.heroLink}>Explore Now</p>
        </Link>
        <div className={styles.inBetween} />
      </section>

      <section className={styles.aboutSection}>
        <div className={styles.aboutInfo}>
          <div className={styles.topLeftContainer}>
            <h2 className={`${styles.aboutTitle} ${domine.className}`}>
              Lorem Ipsum
            </h2>
            <p className={styles.aboutDescription}>Where to next? </p>
          </div>

          <div className={styles.topBottomContainer}>
            <div className={styles.iconsSection}>
              <Image
                className={styles.icon}
                src={coverphoto1}
                alt="explore icon"
              />
              <p className={styles.iconInfo}>
                A website that lets you share your own travels and experiences
                wherever you are in the world.{' '}
              </p>
            </div>
            <div className={styles.iconsSection}>
              <Image
                className={styles.icon}
                src={coverphoto2}
                alt="discover icon"
              />

              <p className={styles.iconInfo}>Lorem Ipsum</p>
            </div>
            <div className={styles.iconsSection}>
              <Image
                className={styles.icon}
                src={coverphoto3}
                alt="connect icon"
              />
              <p className={styles.iconInfo}> Recent Travel</p>
            </div>
          </div>
        </div>
        {/* <Portfolio /> */}
        <div className={styles.imageSection}>
          <Image
            src={coverphoto4}
            alt="Lorem Ipsum"
            width={400}
            height={400}
            className={styles.aboutImage}
          />
        </div>
      </section>

      <section className={styles.discoverSection}>
        <div className={styles.imageSection}>
          <Image
            className={styles.bloggerImage}
            height={400}
            width={400}
            src={coverphoto5}
            alt="blogger"
          />
        </div>

        <div className={styles.infoSection}>
          <h2 className={`${domine.className} ${styles.discoverTitle}`}>
            Lorem Ipsum
          </h2>
          <p className={styles.discoverInfo}>Latest travel tips</p>

          <Link href="/blogs">
            <p className={styles.exploreLink}>View all bloggers</p>
          </Link>
          {/* <Questions /> */}
        </div>
      </section>
    </main>
  );
}
