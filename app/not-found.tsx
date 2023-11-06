import styles from './styles/rootPages.module.scss';

export const metadata = {
  title: 'Not Found',
  description: 'Page not found',
};

export default function RootNotFound() {
  return <div className={styles.notFoundPage}>Page not found!</div>;
}
