import { Sql } from 'postgres';

export type Blog = {
  id: number;
  name: string;
  location: string;
  description: string;
  websiteUrl: string;
  imageUrl: string;
  userId: number | null;
  username: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE blogs (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      name varchar(30) NOT NULL,
      description text NOT NULL,
      website_url varchar(100) NOT NULL,
      location varchar(100) NOT NULL,
      image_url text NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      username varchar(80) REFERENCES users (username)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE blogs
  `;
}
