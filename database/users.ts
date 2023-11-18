import { cache } from 'react';
import { User } from '../migrations/00000-createTableUsers';
import { sql } from './connect';

export type UserWithPasswordHash = User & {
  passwordHash: string;
  imageUrl: string;
};

export const getUsers = cache(async () => {
  const users = await sql<User[]>`
    SELECT
      id,
      username,
      email,
      profile_name,
      bio,
      image_url
    FROM
      users
  `;
  return users;
});

// creating a new user
export const createUser = cache(
  async (
    username: string,
    email: string,
    passwordHash: string,
    profileName: string,
    bio: string,
    imageUrl: string,
  ) => {
    const [user] = await sql<User[]>`
      INSERT INTO
        users (
          username,
          email,
          password_hash,
          profile_name,
          bio,
          image_url
        )
      VALUES
        (
          ${username.toLowerCase()},
          ${email},
          ${passwordHash},
          ${profileName},
          ${bio},
          ${imageUrl}
        ) RETURNING id,
        username,
        email,
        profile_name,
        bio,
        image_url
    `;
    return user;
  },
);

// USER LOGIN //////////////////////////////////////////////////////////
// verifying the user credentials when logging in
export const getUserWithPasswordHashByUsername = cache(
  async (username: string) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      SELECT
        id,
        username,
        email,
        profile_name,
        bio,
        image_url,
        password_hash AS "passwordHash" -- Ensure to include the password_hash
      FROM
        users
      WHERE
        users.username = ${username.toLowerCase()}
    `;

    return user;
  },
);

// GET USER ///////////////////////////////////////////////
export const getUserByUsername = cache(async (username: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      users.username = ${username}
  `;

  return user;
});

export const getUserById = cache(async (id: number) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      *
    FROM
      users
    WHERE
      id = ${id}
  `;
  return user;
});

// //////////////////////////////////////////////////////////
// get all the user only if a valid session token is passed
export const getUsersWithLimitAndOffsetBySessionToken = cache(
  async (limit: number, offset: number, token: string) => {
    const users = await sql<UserWithPasswordHash[]>`
      SELECT
        users.*
      FROM
        users
        INNER JOIN sessions ON (
          sessions.token = ${token}
          AND sessions.expiry_timestamp > now ()
        )
      LIMIT
        ${limit}
      OFFSET
        ${offset}
    `;

    return users;
  },
);

export const getUserBySessionToken = cache(async (token: string) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    SELECT
      users.id,
      users.username,
      users.email,
      users.password_hash,
      users.profile_name,
      users.bio,
      users.image_url
    FROM
      users
      INNER JOIN sessions ON (
        sessions.token = ${token}
        AND sessions.user_id = users.id
        AND sessions.expiry_timestamp > now ()
      )
  `;
  return user;
});

// UPDATE PROFILE //////////////////////////////////////////////////////

export const updateUserById = cache(
  async ({
    id,
    username,
    email,
    profileName,
    bio,
    imageUrl,
  }: {
    id: number;
    username: string;
    email: string;
    profileName: string;
    bio: string;
    imageUrl: string;
  }) => {
    const [user] = await sql<UserWithPasswordHash[]>`
      UPDATE users
      SET
        username = ${username.toLowerCase()},
        email = ${email},
        profile_name = ${profileName},
        bio = ${bio},
        image_url = ${imageUrl}
      WHERE
        id = ${id} RETURNING id,
        username,
        email,
        profile_name AS "profileName", -- Use "profileName" to match the expected type
        bio,
        image_url AS "imageUrl", -- Use "imageUrl" to match the expected type
        password_hash AS "passwordHash"
    `;
    return user;
  },
);

// DELETE USER /////////////////////////////////
export const deleteUserById = cache(async (id: number) => {
  const [user] = await sql<UserWithPasswordHash[]>`
    DELETE FROM users
    WHERE
      id = ${id} RETURNING *
  `;
  return user;
});
