import { cache } from 'react';
import { Favourite } from '../migrations/00005-createTableFavourites';
import { sql } from './connect';

type FavouritedBlog = {
  favouriteId: number;
  userId: number;
  blogId: number;
  blogName: string;
  blogDescription: string;
  blogWebsiteUrl: string;
  blogLocation: string;
  blogImageUrl: string;
};

// get favourites from user
export const getFavourites = cache(async (userId: number) => {
  const favourites = await sql<Favourite[]>`
    SELECT
      *
    FROM
      favourites
    WHERE
      favourites.user_id = ${userId}
  `;
  return favourites;
});

// Add favourite blog for the follow option
export const createFavourite = cache(async (userId: number, blogId: number) => {
  const [favourite] = await sql<Favourite[]>`
    INSERT INTO
      favourites (
        user_id,
        blog_id
      )
    VALUES
      (
        ${userId},
        ${blogId}
      ) RETURNING id,
      user_id,
      blog_id
  `;
  return favourite;
});

// display favourited blog on profile
export const getFavouriteByUserId = cache(async (userId: number) => {
  const favouritedBlog = await sql<FavouritedBlog[]>`
    SELECT DISTINCT
      favourites.id AS favourite_id,
      users.id AS user_id,
      blogs.id AS blog_id,
      -- blogs.username AS blog_username,
      blogs.name AS blog_name,
      blogs.description AS blog_description,
      blogs.website_url AS blog_website_url,
      blogs.location AS blog_location,
      blogs.image_url AS blog_image_url
    FROM
      favourites
      INNER JOIN blogs ON favourites.blog_id = blogs.id
      INNER JOIN users ON favourites.user_id = users.id
    WHERE
      favourites.user_id = ${userId}
  `;

  return favouritedBlog;
});

// Delete favourited blog from profile
export const deleteFavouriteById = cache(async (id: number) => {
  const [favourite] = await sql<Favourite[]>`
    DELETE FROM favourites
    WHERE
      id = ${id} RETURNING *
  `;
  return favourite;
});
