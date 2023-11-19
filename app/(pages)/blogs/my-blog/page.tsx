// MyBlogPage.tsx
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
import DeleteUserBlog from './DeleteUserBlog'; //

export const metadata = {
  title: { default: 'Across the Atlas | My Profile' },
  description: 'Adventure is worthwhile. ',
};

export default async function MyBlogPage() {
  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');
  const user = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    return redirect(`/login?returnTo=blogs/myblog`);
  }

  const myBlog = await getBlogByUserId(user.id);

  return (
    <div className={styles.myBlogContainer}>
      {myBlog.length === 0 ? (
        <div className={styles.noBlogFoundMessage}>
          <p>Blog section is empty</p>
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
                  {' '}
                  {blog.name}
                </p>
                <DeleteUserBlog
                  blogId={blog.id}
                  currentUser={user}
                  user={user}
                />

                <Image
                  src={blog.imageUrl}
                  alt="Blog"
                  width={100}
                  height={100}
                  className={styles.blogImage}
                />
                <Link
                  href={`/blogs/${blog.id}`}
                  className={`${styles.blogLink} ${domine.className}`}
                >
                  View blog <BsArrowRight />
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
