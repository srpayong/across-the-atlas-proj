import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { getBlogs } from '../../../../database/blogs';
import { getValidSessionByToken } from '../../../../database/sessions';
import { getUserBySessionToken } from '../../../../database/users';
import { domine } from '../../../layout';
import styles from '../../../styles/CreateBlogForm.module.scss';
import CreateBlog from './CreateBlog';

export const metadata = {
  title: { default: 'Across the Atlas' },
  description: 'Adventure is worthwhile.',
};

export default async function CreateBlogPage() {
  // allowing access to only authorised user
  const sessionToken = cookies().get('sessionToken');
  const session =
    sessionToken && (await getValidSessionByToken(sessionToken.value));

  if (!session) redirect(`/login?returnTo=/blogs/create-blog`);

  const user = !sessionToken.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!user) {
    redirect('/login');
  }

  const userId = user.id;
  const blogs = await getBlogs();
  const blog = blogs.find((singleBlog) => singleBlog.userId === userId);

  return (
    <main className={styles.createBlogPage}>
      <div className={styles.pageTitle}>
        <h1 className={domine.className}>
          Hello <span>{user.profileName}</span>
        </h1>
        <h4>Create an account</h4>
      </div>
      <div className={styles.createBlogFormContainer}>
        <CreateBlog blogs={blogs} userId={userId} blog={blog} />
      </div>
    </main>
  );
}
