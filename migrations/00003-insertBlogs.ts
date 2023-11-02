import { Sql } from 'postgres';

export const blogs = [
  {
    id: 1,
    name: 'Airvnv',
    description: 'World traveler on a shoestring budget.',
    websiteUrl: 'www.airvnv.com',
    location: 'United States',
    imageUrl: '/images/airvnv.jpeg',
    userId: 1,
    username: 'Hermione',
  },
  {
    id: 2,
    name: 'Pagoda',
    description: 'History buff wandering through time.',
    websiteUrl: 'www.pagoda.com',
    location: 'United Kingdom',
    imageUrl: '/images/pagoda.jpeg',
    userId: 2,
    username: 'Severus',
  },
  {
    id: 3,
    name: 'Kayakoto',
    description: 'On a quest to explore the animal kingdom. ',
    websiteUrl: 'www.kayakoto.com',
    location: 'Singapore',
    imageUrl: '/images/kayakoto.jpeg',
    userId: 3,
    username: 'Hagrid',
  },
  {
    id: 4,
    name: 'Orbitzzz',
    description: 'Scaling heights, conquering summits.',
    websiteUrl: 'www.orbitz.com',
    location: 'Finland',
    imageUrl: '/images/orbitzzz.jpeg',
    userId: 4,
    username: 'Dobby',
  },
];

export async function up(sql: Sql) {
  for (const blog of blogs) {
    await sql`
    INSERT INTO blogs
      (name, description, website_url, location, image_url, user_id, username)
    VALUES
      (${blog.name}, ${blog.description}, ${blog.websiteUrl}, ${blog.location}, ${blog.imageUrl}, ${blog.userId}, ${blog.username})
  `;
  }
}

export async function down(sql: Sql) {
  for (const blog of blogs) {
    await sql`
      DELETE FROM blogs WHERE id = ${blog.id}
  `;
  }
}
