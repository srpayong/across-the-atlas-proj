import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import React from 'react';
import { BsArrowRight } from 'react-icons/bs';
import { getBlogByUserId } from '../../../../database/blogs';
import { getUserBySessionToken } from '../../../../database/users';
import { domine } from '../../../layout';
import styles from '../../../styles/allBlogsPage.module.scss';

export const metadata = {
  title: { default: 'Hello' },
  description: 'Lorem Ipsum',
};

export default async function MyBlogPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    return redirect(`/login?returnTo=/blogs/my-blog`);
  }

  const myBlog = await getBlogByUserId(user.id);

  return (
    <div className={styles.myBlogContainer}>
      {myBlog.length === 0 ? (
        <div className={styles.noBlogFoundMessage}>
          <p>You don't have a blog yet</p>
          <Link href="/blogs/create-blog" className={styles.createBlogLink}>
            <p>Click here to create one</p>
          </Link>
        </div>
      ) : (
        <div className={styles.blogContainer}>
          {myBlog.map((blog) => {
            return (
              <div key={`blog-div-${blog.id}`} className={styles.blogCard}>
                <p className={`${styles.blogName} ${domine.className}`}>
                  {blog.name}
                </p>
                <Image
                  src={blog.imageUrl}
                  alt="blog"
                  width={100}
                  height={100}
                  className={styles.blogImage}
                />
                <Link href={`/blogs/${blog.id}`} className={styles.blogLink}>
                  Go to blog <BsArrowRight />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
