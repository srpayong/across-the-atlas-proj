import { Sql } from 'postgres';

export type Blog = {
  id: number;
  name: string;
  description: string;
  websiteUrl: string;
  location: string;
  imageUrl: string;
  userId: number | null;
  username: string | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      blogs (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        name VARCHAR(30) NOT NULL,
        description VARCHAR(500) NOT NULL,
        website_url VARCHAR(80) NOT NULL,
        location VARCHAR(40) NOT NULL,
        image_url VARCHAR(500) NOT NULL,
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
        username VARCHAR(80) REFERENCES users (
          username
        )
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE blogs `;
}
