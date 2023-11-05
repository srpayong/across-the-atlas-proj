import styles from './styles/rootPages.module.scss';

export const metadata = {
  title: 'Not Found',
  description: "sorry can't find the page you are looking for",
};

export default function RootNotFound() {
  return <div className={styles.notFoundPage}>Page not found!</div>;
}
