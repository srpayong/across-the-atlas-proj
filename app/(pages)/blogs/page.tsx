import { Domine } from 'next/font/google';
import Image from 'next/image';
import Link from 'next/link';
import { getBlogs } from '../../../database/blogs';
import styles from '../../styles/allBlogsPage.module.scss';

export const dynamic = 'force-dynamic';
const domine = Domine({ subsets: ['latin'] });

export const metadata = {
  title: { default: 'Across the Atlas | Blogs' },
  description: 'Lorem Ipsum',
};

export default async function BlogsPage() {
  const blogs = await getBlogs();

  return (
    <main className={styles.blogsPageContainer}>
      <div className={styles.blogListContainer}>
        {blogs.map((blog) => {
          return (
            <div key={`blog-div-${blog.id}`} className={styles.blogContainer}>
              <Link href={`/blogs/${blog.id}`} className={styles.link}>
                <div className={styles.titleContainer}>
                  <p className={`${styles.blogName} ${domine.className}`}>
                    {blog.name}
                  </p>
                  <p className={styles.blogLocation}>
                    Based in {blog.location}
                  </p>
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src={blog.imageUrl}
                    width={100}
                    height={100}
                    alt="Blog avatar"
                    className={styles.blogImage}
                  />
                </div>

                <div className={styles.descriptionContainer}>
                  <p className={styles.blogDescription}>{blog.description}</p>
                </div>
              </Link>
            </div>
          );
        })}
      </div>
    </main>
  );
}
