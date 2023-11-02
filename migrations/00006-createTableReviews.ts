import { Sql } from 'postgres';

export type Review = {
  id: number;
  content: string;
  userId: number | null;
  blogId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE reviews (
      id integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
      content varchar(500) NOT NULL,
      user_id integer REFERENCES users (id) ON DELETE CASCADE,
      blog_id integer REFERENCES blogs (id)
    )
  `;
}

export async function down(sql: Sql) {
  await sql`
    DROP TABLE reviews
  `;
}
