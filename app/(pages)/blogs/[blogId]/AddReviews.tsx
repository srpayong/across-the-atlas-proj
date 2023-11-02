'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  user: { id: number };
  blog: { id: number };
};

export default function AddReviewsToBlog(props: Props) {
  const [review, setReview] = useState('');
  const [error, setError] = useState();
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={async (event) => {
          event.preventDefault();
          const response = await fetch('/api/reviews', {
            method: 'POST',
            body: JSON.stringify({
              content: review,
              userId: props.user.id,
              blogId: props.blog.id,
            }),
          });
          const data = await response.json();

          if ('error' in data) {
            setError(data.error);
            return;
          }

          router.refresh();
        }}
      >
        <label>
          <input
            maxLength={1000}
            value={review}
            onChange={(event) => setReview(event.currentTarget.value)}
            placeholder="Write something..."
          />
        </label>

        <button
          onClick={() => {
            router.refresh();
          }}
        >
          <AiOutlineSend />
        </button>
      </form>
      <div>{error}</div>
    </>
  );
}
