'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { Blog } from '../../../../migrations/00002-createTableBlogs';
import styles from '../../../styles/AddTripsForm.module.scss';

type Props = {
  user: { id: number };
  blog: Blog;
  singleBlog: Blog;
  cloudName: string | undefined;
};

export default function AddTripsForm(props: Props) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [location, setLocation] = useState('');
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

      // const tripPic = await fetch(
      //   `https://api.cloudinary.com/v1_1/${props.cloudName}/image/upload`,
      //   {
      //     method: 'POST',
      //     body: formData,
      //   },
      // ).then((r) => {
      //   console.log('Cloudinary Response:', r);
      //   return r.json();
      // }

      //     );
      //     const cloudinaryResponse = await tripPic.json();
      //     console.log('Cloudinary Response:', cloudinaryResponse);

      //     const response = await fetch('/api/trips', {
      //       method: 'POST',
      //       headers: {
      //         'Content-Type': 'application/json',
      //       },
      //       body: JSON.stringify({
      //         userId: props.user.id,
      //         blogId: props.blog.id,
      //         name,
      //         category,
      //         location,
      //         description,
      //         imageUrl: tripPic.secure_url,
      //       }),
      //     });

      //     const data = await response.json();

      //     if ('error' in data) {
      //       setError(data.error);
      //       return;
      //     }

      //     setSuccess(true);
      //     router.refresh();
      //   }
      // };

      try {
        const tripPicResponse = await fetch(
          `https://api.cloudinary.com/v1_1/${props.cloudName}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );
        console.log('Cloudinary Response:', tripPicResponse);
        if (!tripPicResponse.ok) {
          // Handle the case where the Cloudinary upload fails
          setError('Error uploading image to Cloudinary');
          return;
        }

        const tripPicData = await tripPicResponse.json();
        const tripPic = tripPicData.secure_url;

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
            location,
            description,
            imageUrl: tripPic,
          }),
        });

        const data = await response.json();

        if ('error' in data) {
          setError(data.error);
          return;
        }

        setSuccess(true);

        // Clear the form
        setName('');
        setCategory('');
        setLocation('');
        setDescription('');
        setImageUrl(null);

        // Refresh the page
        //       router.refresh();
        //     } catch (error) {
        //       console.error('Error uploading image:', error);
        //       setError('Error uploading image');
        //     }
        //   }
        // };
        window.location.reload();
        window.scrollTo({
          top: 0,
          left: 0,
          behavior: 'smooth', // You can use 'auto' or 'smooth' for scrolling behavior
        });
      } catch (error) {
        console.error('Error uploading image:', error);
        setError('Error uploading image');
      }
    }
  };

  return (
    <div className="w-1/3 border-black border-5px p-4">
      <div className={styles.formContainer}>
        {props.user.id === props.blog.userId && (
          <div className={styles.innerContainer}>
            <h1 className="text-3xl pb-8">Write a Blog Entry</h1>
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
                  <label htmlFor="location">Location</label>
                  <input
                    id="location"
                    value={location}
                    onChange={(event) => setLocation(event.currentTarget.value)}
                  />
                </div>

                <div>
                  <label htmlFor="description">Description</label>
                  <textarea
                    id="decription"
                    maxLength={2000}
                    value={description}
                    onChange={(event) =>
                      setDescription(event.currentTarget.value)
                    }
                  />
                </div>

                <div className={styles.tripPic}>
                  <label htmlFor="trip">Blog photo</label>
                  <div className="flex items-center space-x-4">
                    <input
                      id="trip"
                      type="file"
                      name="file"
                      ref={fileInputRef}
                      onChange={handleOnChange}
                      className={styles.tripPicInput}
                    />
                    {!!imageUrl && (
                      <Image
                        src={imageUrl}
                        height={150}
                        width={150}
                        alt="Trip avatar"
                        className={styles.tripImage}
                      />
                    )}
                  </div>
                </div>
              </div>

              <div className={styles.rightSide}>
                <button>Start a travel blog</button>
                <div className="flex items-center space-x-2">
                  {!!imageUrl && <div style={{ color: 'red' }}>{error}</div>}
                  {success && (
                    <figure className={styles.notification}>
                      <div className={styles.notificationBody}>
                        Blog created!
                      </div>
                      <div className={styles.notificationProgress} />
                    </figure>
                  )}
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
