'use client';

import { ReviewsFromUsersInBlogs } from '/Users/srpayong/projects/final-project_fall_2023_vienna_austria/database/reviews';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AiOutlineSend } from 'react-icons/ai';

type Props = {
  user: { id: number };
  blog: { id: number };
  userReviews: RowList<ReviewsFromUsersInBlogs[]>;
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
        <textarea
          maxLength={2000}
          value={review}
          onChange={(event) => setReview(event.currentTarget.value)}
          placeholder="Write something..."
          // className="rounded bg-secondary h-[100]"
          style={{
            color: '#2A2829',
            fontSize: '24px',
            backgroundColor: '#E2DDD9',
            width: '500px',
            height: '100px',
            marginTop: '20px',
            borderRadius: '10px',
            border: 'none',
          }}
        />

        <button
          onClick={() => {
            router.refresh();
          }}
          className=" font-bold font-10px mb-6 px-6 rounded"
        >
          <AiOutlineSend />
        </button>
      </form>

      <div>{error}</div>
    </>
  );
}
