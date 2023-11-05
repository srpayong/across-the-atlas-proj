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
    CREATE TABLE trips (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      blog_id integer REFERENCES blogs (id) ON DELETE CASCADE,
      blog_name varchar(40),
      name varchar(30) NOT NULL,
      category varchar(30) NOT NULL,
      location varchar(100) NOT NULL,
      description varchar(500) NOT NULL,
      image_url varchar(500) NOT NULL
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE trips
  `;
}
