import { cache } from 'react';
import { Tour } from '../migrations/00007-createTableTours';
import { sql } from './connect';

type BlogTour = {
  tourId: number;
  blogId: number;
  blogBlogname: string;
  userId: number;
  tourName: string;
  tourCategory: string;
  tourDescription: string;
  tourImageUrl: string;
};

export const getTours = cache(async () => {
  const tours = await sql<Tour[]>`
    SELECT * FROM tours
 `;

  return tours;
});

export const getToursWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const tours = await sql<Tour[]>`
      SELECT
        *
      FROM
        tours
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return tours;
  },
);

export const getToursWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const tours = await sql<Tour[]>`
      SELECT
        tours.*
      FROM
        tours
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
        )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return tours;
  },
);

// GETTING TOURS
export const getToursById = cache(async (id: number) => {
  const [tour] = await sql<Tour[]>`
    SELECT
      *
    FROM
      tours
    WHERE
      id = ${id}
  `;
  return tour;
});

export const getTourByBlogId = cache(async (blogId: number) => {
  const toursInBlog = await sql<Tour[]>`
    SELECT
      *
    FROM
      tours
    WHERE
      tours.blog_id = ${blogId}
  `;

  return toursInBlog;
});

// CREATING TOURS /////////////////////
export const createTour = cache(
  async (
    userId: number,
    blogId: number,
    name: string,
    category: string,
    description: string,
    imageUrl: string,
  ) => {
    const [tourToCreate] = await sql<Tour[]>`
      INSERT INTO tours
        (user_id, blog_id, name, category, description, image_url)
      VALUES
        (${userId}, ${blogId}, ${name}, ${category}, ${description}, ${imageUrl})
      RETURNING *
    `;

    return tourToCreate;
  },
);

// Get all info form tours
export const getToursWithInfo = cache(async (blogId: number) => {
  const toursInBlog = await sql<BlogTour[]>`
  SELECT distinct
    tours.id AS tour_id,
    users.id AS user_id,
   blogs.id AS blog_id,
   blogs.name AS blog_blogName,
    tours.name AS tour_name,
    tours.category AS tour_category,
    tours.description AS tour_description,
    tours.image_url AS tour_image_url
  FROM
    tours
  INNER JOIN
    blogs ON tours.blog_id = blogs.id
  INNER JOIN
    users ON tours.user_id = users.id
  WHERE
    tours.blog_id = ${blogId}
  `;

  return toursInBlog;
});
