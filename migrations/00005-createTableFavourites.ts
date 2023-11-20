import { Sql } from 'postgres';

export type Favourite = {
  id: number;
  userId: number | null;
  blogId: number | null;
};

export async function up(sql: Sql) {
  await sql`
    CREATE TABLE
      favourites (
        id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
        user_id INTEGER REFERENCES users (id) ON DELETE CASCADE,
        blog_id INTEGER REFERENCES blogs (id) ON DELETE CASCADE
      )
  `;
}

export async function down(sql: Sql) {
  await sql` DROP TABLE favourites `;
}
