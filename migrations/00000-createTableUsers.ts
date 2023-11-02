import { Sql } from 'postgres';

export type User = {
  id: number;
  username: string;
  email: string;
  fullName: string;
  bio: string;
  image_url: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE users (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      username varchar(80) NOT NULL UNIQUE,
      email varchar(80) NOT NULL,
      password_hash varchar(80) NOT NULL,
      full_name varchar(40) NOT NULL,
      bio text NOT NULL,
      image_url text NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE users
  `;
}
