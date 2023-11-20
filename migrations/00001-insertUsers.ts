import { Sql } from 'postgres';

export const users = [
  {
    id: 1,
    username: 'Hermione',
    email: 'hermione@hello.com',
    passwordHash: 'hermionegranger',
    profileName: 'Hermione Granger',
    bio: 'I am an adventurer, photographer, writer and a digital nomad.',
    blogId: null,
    imageUrl: '/images/bloggers/Hermione.jpeg',
  },
  {
    id: 2,
    username: 'Severus',
    email: 'severus@yahoo.com',
    passwordHash: 'severussnape',
    profileName: 'Severus Snape',
    bio: 'The pretty easy going guy who likes to travel, make potions and take photos.',
    imageUrl: '/images/bloggers/Severus.jpeg',
  },
  {
    id: 3,
    username: 'Hagrid',
    email: 'hagrid@gmx.com',
    passwordHash: 'rubeushagrid',
    profileName: 'Rubeus Hagrid',
    bio: 'Come follow me as I plot out my own adventures. Better out than in. ',
    imageUrl: '/images/bloggers/Hagrid.jpeg',
  },
  {
    id: 4,
    username: 'Dobby',
    email: 'dobby@@hi.com',
    passwordHash: 'dobbytheelf',
    profileName: 'Dobby Theelf',
    bio: 'Hi, I am Dobby I like socks and I have been traveling the world for over 6 years now.',
    imageUrl: '/images/bloggers/Dobby.jpeg',
  },
];

export async function up(sql: Sql) {
  for (const user of users) {
    await sql`
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
          ${user.username},
          ${user.email},
          ${user.passwordHash},
          ${user.profileName},
          ${user.bio},
          ${user.imageUrl}
        )
    `;
  }
}

export async function down(sql: Sql) {
  for (const user of users) {
    await sql`
      DELETE FROM users
      WHERE
        id = ${user.id}
    `;
  }
}
