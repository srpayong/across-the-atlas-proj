import { cache } from 'react';
import { Blog } from '../migrations/00002-createTableBlogs';
import { sql } from './connect';

export const getBlogs = cache(async () => {
  const blogs = await sql<Blog[]>`
    SELECT
      *
    FROM
      blogs
 `;
  return blogs;
});

export const createBlog = cache(
  async (
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    imageUrl: string,
    userId: number,
  ) => {
    const [blog] = await sql<Blog[]>`
    INSERT INTO blogs
      (name, description, website_url, location, image_url, user_id)
    VALUES
      (${name}, ${description}, ${websiteUrl}, ${location}, ${imageUrl}, ${userId})
    RETURNING
      *
 `;
    return blog;
  },
);

// GETTING BLOG ///////////////////////////////////////////////
export const getBlogById = cache(async (id: number) => {
  const blogs = await sql<Blog[]>`
    SELECT
      *
    FROM
      blogs
    WHERE
      id = ${id}
  `;

  return blogs[0];
});

export const getBlogByUserId = cache(async (userId: number) => {
  const blogs = await sql<Blog[]>`
    SELECT
      *
    FROM
      blogs
    WHERE
      blogs.user_id = ${userId}
    `;

  return blogs;
});

// UPDATE BLOG //////////////////////////////////////////////////////////
// updating blog page
export const updateBlogById = cache(
  async (
    id: number,
    name: string,
    description: string,
    websiteUrl: string,
    location: string,
    imageUrl: string,
    userId: number,
  ) => {
    const [blog] = await sql<Blog[]>`
      UPDATE blogs
      SET
        name = ${name},
        description = ${description},
        website_url = ${websiteUrl},
        location = ${location},
        image_url = ${imageUrl},
        user_id = ${userId}
      WHERE
        id = ${id}
        RETURNING *
    `;
    return blog;
  },
);

// DELETE BLOG /////////////////////////////////
export const deleteBlogById = cache(async (id: number) => {
  const [blog] = await sql<Blog[]>`
      DELETE FROM
        blogs
      WHERE
        id = ${id}
        RETURNING *
    `;
  return blog;
});
