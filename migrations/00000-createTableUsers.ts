import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  profileName: string;
  bio: string;
  imageUrl: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      users (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        username VARCHAR(80) NOT NULL UNIQUE,
        email VARCHAR(80) NOT NULL,
        password_hash VARCHAR(80) NOT NULL,
        profile_name VARCHAR(40) NOT NULL,
        bio VARCHAR(500) NOT NULL,
        image_url VARCHAR(500) NOT NULL
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE users `;
}
