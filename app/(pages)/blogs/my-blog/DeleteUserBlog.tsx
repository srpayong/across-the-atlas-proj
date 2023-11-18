'use client';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RiDeleteBin6Line } from 'react-icons/ri';
import styles from '../../../styles/EditProfile.module.scss';

type Props = {
  blogId: number;
  currentUser: { username: string };
  user: { username: string };
};

// type Props = {
//   blogs: {
//     userId: number;
//     id: number;
//   };
//   user: { username: string };
//   currentUser: { username: string };
// };

export default function DeleteUserBlog(props: Props) {
  const [error, setError] = useState('');
  const router = useRouter();

  return (
    <div className={styles.deleteButton}>
      {props.currentUser.username === props.user.username && (
        <button
          onClick={async () => {
            console.log('BlogId to be deleted:', props.blogId);
            const response = await fetch(`/api/blogs/${props.blogId}`, {
              method: 'DELETE',
            });

            const data = await response.json();

            if (data.error) {
              setError(data.error);
              console.log(error);
              router.refresh();
              return;
            }
            router.refresh();
          }}
        >
          <RiDeleteBin6Line />
        </button>
      )}
    </div>
  );
}
