import Link from 'next/link';
import styles from '../../styles/rootPages.module.scss';

export const metadata = {
  title: 'Not Found',
  description: "Sorry can't find the page you are looking for",
};

export default function RootNotFound() {
  return (
    <div className={styles.notFoundPage}>
      <p>Your blog is not yet registered </p>
      <br />
      <Link href="/blogs/create-blog">Click here to create one</Link>
    </div>
  );
}
