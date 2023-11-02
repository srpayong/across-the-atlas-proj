import { cache } from 'react';
import { Review } from '../migrations/00006-createTableReviews';
import { sql } from './connect';

type ReviewsFromUsersInBlogs = {
  reviewId: number;
  reviewContent: string;
  userId: number;
  userName: string;
  userImageUrl: string;
  blogId: number;
};

// create a review
export const createReview = cache(
  async (content: string, userId: number, blogId: number) => {
    const [review] = await sql<Review[]>`
  INSERT INTO reviews
    (content, user_id, blog_id)
  VALUES
    (${content}, ${userId}, ${blogId})
  RETURNING
    id,
    content,
    user_id,
    blog_id
  `;

    return review;
  },
);

// delete a review
export const deleteReviewById = cache(async (id: number) => {
  const [review] = await sql<Review[]>`
  DELETE FROM
    reviews
  WHERE
    id = ${id}
  RETURNING *
  `;

  return review;
});

// get reviews along with info of the user that made the reviews
export const getReviewsWithUserInfo = cache(async (blogId: number) => {
  const reviewsFromUser = await sql<ReviewsFromUsersInBlogs[]>`
  SELECT distinct
    reviews.id AS review_id,
    reviews.content AS review_content,
    users.id AS user_id,
    users.username AS user_name,
    users.image_url AS user_image_url,
    blogs.id AS blog_id
  FROM
    reviews
  INNER JOIN
    blogs ON reviews.blog_id  = blogs.id
  INNER JOIN
    users ON reviews.user_id = users.id
  WHERE
    reviews.blog_id = ${blogId}
  `;

  return reviewsFromUser;
});
