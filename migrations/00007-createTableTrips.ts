import { Sql } from 'postgres';

export type Trip = {
  id: number;
  userId: number | null;
  blogId: number | null;
  blogName: string | null;
  name: string;
  category: string;
  location: string;
  description: string;
  imageUrl: string;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      trips (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
        blog_id INTEGER REFERENCES blogs (id) ON DELETE CASCADE,
        blog_name VARCHAR(40),
        name VARCHAR(30) NOT NULL,
        category VARCHAR(30) NOT NULL,
        location VARCHAR(100) NOT NULL,
        description VARCHAR(500) NOT NULL,
        image_url VARCHAR(500) NOT NULL
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE trips `;
}
