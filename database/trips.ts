import { cache } from 'react';
import { Trip } from '../migrations/00007-createTableTrips';
import { sql } from './connect';

type BlogTrip = {
  tripId: number;
  blogId: number;
  blogBlogname: string;
  userId: number;
  tripName: string;
  tripCategory: string;
  tripDescription: string;
  tripImageUrl: string;
};

export const getTrips = cache(async () => {
  const trips = await sql<Trip[]>`
    SELECT * FROM trips
 `;

  return trips;
});

export const getTripsWithLimitAndOffset = cache(
  async (limit: number, offset: number) => {
    const trips = await sql<Trip[]>`
      SELECT
        *
      FROM
        trips
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return trips;
  },
);

export const getTripsWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const trips = await sql<Trip[]>`
      SELECT
        trips.*
      FROM
        trips
      INNER JOIN
        sessions ON (
          sessions.token = ${token} AND
          sessions.expiry_timestamp > now()
        )
      LIMIT ${limit}
      OFFSET ${offset}
    `;

    return trips;
  },
);

// GETTING TRIPS
export const getTripsById = cache(async (id: number) => {
  const [trip] = await sql<Trip[]>`
    SELECT
      *
    FROM
      trips
    WHERE
      id = ${id}
  `;
  return trip;
});

export const getTripByBlogId = cache(async (blogId: number) => {
  const tripsInBlog = await sql<Trip[]>`
    SELECT
      *
    FROM
      trips
    WHERE
      trips.blog_id = ${blogId}
  `;

  return tripsInBlog;
});

// CREATING TRIPS /////////////////////
export const createTrip = cache(
  async (
    userId: number,
    blogId: number,
    name: string,
    category: string,
    description: string,
    image_url: string,
  ) => {
    const [tripToCreate] = await sql<Trip[]>`
      INSERT INTO trips
        (user_id, blog_id, name, category, description, image_url)
      VALUES
        (${userId}, ${blogId}, ${name}, ${category}, ${description}, ${image_url})
      RETURNING *
    `;

    return tripToCreate;
  },
);

// Get all info form trips
export const getTripsWithInfo = cache(async (blogId: number) => {
  const tripsInBlog = await sql<BlogTrip[]>`
  SELECT distinct
    trips.id AS trip_id,
    users.id AS user_id,
   blogs.id AS blog_id,
   blogs.name AS blog_blogName,
    trips.name AS trip_name,
    trips.category AS trip_category,
    trips.description AS trip_description,
    trips.image_url AS trip_image_url
  FROM
    trips
  INNER JOIN
    blogs ON trips.blog_id = blogs.id
  INNER JOIN
    users ON trips.user_id = users.id
  WHERE
    trips.blog_id = ${blogId}
  `;

  return tripsInBlog;
});
