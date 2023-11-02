'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Blog } from '../../../../migrations/00002-createTableBlogs';
import styles from '../../../styles/AddToursForm.module.scss';

type Props = {
  user: { id: number };
  blog: Blog;
};

export default function AddToursForm(props: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
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

      const tourPic = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/tours', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: props.user.id,
          blogId: props.blog.id,
          name,
          category,
          description,
          imageUrl: tourPic.secure_url,
        }),
      });

      const data = await response.json();

      if ('error' in data) {
        setError(data.error);
        return;
      }

      setSuccess(true);
      router.refresh();
    }
  };

  return (
    <div className={styles.formComtainer}>
      {props.user.id === props.blog.userId && (
        <div className={styles.innerContainer}>
          <h4>Upload a tour</h4>
          <form onSubmit={handleOnSubmit} className={styles.uploadTourForm}>
            <div className={styles.leftSide}>
              <div>
                <label htmlFor="name">Name</label>
                <input
                  id="name"
                  value={name}
                  onChange={(event) => setName(event.currentTarget.value)}
                />
              </div>

              <div>
                <label htmlFor="category">Category</label>
                <select
                  id="category"
                  value={category}
                  onChange={(event) => setCategory(event.currentTarget.value)}
                >
                  <option>Select a category</option>
                  <option>Wildlife & Safari</option>
                  <option>Food and Drink</option>
                  <option>Adventure</option>
                  <option>Beach</option>
                  <option>History & Culture</option>
                  <option>Hiking & Trekking</option>
                </select>
              </div>

              <div>
                <label htmlFor="description">Description</label>
                <textarea
                  id="decription"
                  maxLength={500}
                  value={description}
                  onChange={(event) =>
                    setDescription(event.currentTarget.value)
                  }
                />
              </div>

              <div className={styles.tourPic}>
                <label htmlFor="tour">Tour picture</label>
                <input
                  id="tour"
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleOnChange}
                  className={styles.tourPicInput}
                />
              </div>
            </div>

            <div className={styles.rightSide}>
              <div className={styles.imageContainer}>
                {!!imageUrl && (
                  <Image
                    src={imageUrl}
                    height={100}
                    width={100}
                    alt="Tour avatar"
                    className={styles.tourImage}
                  />
                )}
              </div>

              <button>Create tour</button>
              <div style={{ color: 'red' }}>{error}</div>
              {success && (
                <figure className={styles.notification}>
                  <div className={styles.notificationBody}>Tour created!</div>
                  <div className={styles.notificationProgress} />
                </figure>
              )}
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
