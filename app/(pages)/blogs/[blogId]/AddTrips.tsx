'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Blog } from '../../../../migrations/00002-createTableBlogs';
import styles from '../../../styles/AddTripsForm.module.scss';

type Props = {
  user: { id: number };
  blog: Blog;
};

export default function AddTripsForm(props: Props) {
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

      const tripPic = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: 'POST',
          body: formData,
        },
      ).then((r) => r.json());

      const response = await fetch('/api/trips', {
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
          imageUrl: tripPic.secure_url,
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
    <div className={styles.formContainer}>
      {props.user.id === props.blog.userId && (
        <div className={styles.innerContainer}>
          <h4>Upload a trip</h4>
          <form onSubmit={handleOnSubmit} className={styles.uploadTripForm}>
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

              <div className={styles.tripPic}>
                <label htmlFor="trip">Trip picture</label>
                <input
                  id="trip"
                  type="file"
                  name="file"
                  ref={fileInputRef}
                  onChange={handleOnChange}
                  className={styles.tripPicInput}
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
                    alt="Trip avatar"
                    className={styles.tripImage}
                  />
                )}
              </div>

              <button>Create trip</button>
              <div style={{ color: 'red' }}>{error}</div>
              {success && (
                <figure className={styles.notification}>
                  <div className={styles.notificationBody}>Trip created!</div>
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
