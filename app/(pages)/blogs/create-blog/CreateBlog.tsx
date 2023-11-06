'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Blog } from '../../../../migrations/00002-createTableBlogs';
import { CreateBlogResponseBodyPost } from '../../../api/blogs/route';
import styles from '../../../styles/CreateBlogForm.module.scss';

type Props = {
  userId: number;
  blogs: Blog[];
};

export default function CreateBlog(props: Props) {
  const [blogs, setBlogs] = useState(props.blogs);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState<string | null>(null);

  const [error, setError] = useState<string>();
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  // change image
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setImageUrl(e.target?.result as string);
      };
      reader.readAsDataURL(event.target.files[0]);
    } else {
      setImageUrl(null);
    }
  };

  // upload image
  const handleOnSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const fileInput = Array.from(form.elements)
      .filter(
        (element) =>
          element instanceof HTMLInputElement && element.type === 'file',
      )
      .pop() as HTMLInputElement | undefined;
    if (fileInput) {
      const formData = new FormData();
      if (fileInput.files !== null) {
        for (const file of fileInput.files) {
          formData.append('file', file);
        }
      }
      formData.append('upload_preset', 'uploads');

      const blogPic = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/blogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          description: description,
          websiteUrl: websiteUrl,
          location: location,
          imageUrl: blogPic.secure_url,
          userId: props.userId,
        }),
      });

      const data: CreateBlogResponseBodyPost = await response.json();
      // console.log({ data });

      if ('error' in data) {
        setError(data.error);
        return;
      }

      setBlogs([...blogs, data.blog]);

      setSuccess(true);
      router.push(`/blogs/${data.blog.id}`);
      router.refresh();
    }
  };

  return (
    <form className={styles.createBlogForm} onSubmit={handleOnSubmit}>
      <label>
        <input
          placeholder="Blog Name"
          value={name}
          onChange={(event) => setName(event.currentTarget.value)}
        />
      </label>

      <label>
        <textarea
          placeholder="Blog Description"
          maxLength={500}
          value={description}
          onChange={(event) => setDescription(event.currentTarget.value)}
        />
      </label>

      <label>
        <input
          placeholder="Website url"
          value={websiteUrl}
          onChange={(event) => setWebsiteUrl(event.currentTarget.value)}
        />
      </label>

      <label>
        <input
          placeholder="City"
          value={location}
          onChange={(event) => setLocation(event.currentTarget.value)}
        />
      </label>

      <label className={styles.blogPicDiv}>
        <input
          type="file"
          name="file"
          ref={fileInputRef}
          onChange={handleOnChange}
          className={styles.blogPicInput}
        />
      </label>

      <div className={styles.imageContainer}>
        {!!imageUrl && (
          <Image src={imageUrl} height={100} width={100} alt="Blog avatar" />
        )}
      </div>

      <div>
        <button>Create blog</button>
      </div>
      <div style={{ color: 'red' }}>{error}</div>
      {success && (
        <figure className={styles.notification}>
          <div className={styles.notificationBody}>Blog created!</div>
          <div className={styles.notificationProgress} />
        </figure>
      )}
    </form>
  );
}
