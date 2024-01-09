import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import {
  createBlog,
  deleteBlogById,
  updateBlogById,
} from '../../../database/blogs';
import { getUserBySessionToken } from '../../../database/users';
import { Blog } from '../../../migrations/00002-createTableBlogs';

export type Error = {
  error: string;
};

export type BlogResponseBodyDelete = { blog: Blog } | Error;
export type BlogResponseBodyPut = { blog: Blog } | Error;
export type CreateBlogResponseBodyPost = { blog: Blog } | Error;

const blogSchema = z.object({
  name: z.string(),
  description: z.string(),
  websiteUrl: z.string(),
  location: z.string(),
  imageUrl: z.string(),
  userId: z.number(),
});

export async function POST(
  request: NextRequest,
): Promise<NextResponse<CreateBlogResponseBodyPost>> {
  const cookieStore = cookies();
  const token = cookieStore.get('sessionToken');

  const user = token && (await getUserBySessionToken(token.value));
  if (!user) {
    return NextResponse.json({ error: 'User not found' });
  }

  const body = await request.json();

  // get credentials from the body
  const result = blogSchema.safeParse(body);

  // verify the user data and check that the name is not taken
  if (!result.success) {
    return NextResponse.json(
      {
        error: 'Some information are missing, please complete form',
      },
      { status: 400 },
    );
  }

  // blog credentials in the DB
  const newBlog = await createBlog(
    result.data.name,
    result.data.description,
    result.data.websiteUrl,
    result.data.location,
    result.data.imageUrl,
    result.data.userId,
  );

  if (!newBlog) {
    return NextResponse.json(
      {
        error: 'Error creating the new blog',
      },
      { status: 500 },
    );
  }

  return NextResponse.json({
    blog: newBlog,
  });
}

// delete

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<BlogResponseBodyDelete>> {
  const blogId = Number(params.blogId);

  if (!blogId) {
    return NextResponse.json(
      {
        error: 'Invalid Blog Id',
      },
      { status: 400 },
    );
  }
  // query the database to get all the blog
  const blog = await deleteBlogById(blogId);

  if (!blog) {
    return NextResponse.json(
      {
        error: 'Blog Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({ blog: blog });
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<BlogResponseBodyPut>> {
  const blogId = Number(params.blogId);
  const body = await request.json();

  if (!blogId) {
    return NextResponse.json(
      {
        error: 'Invalid Blog Id',
      },
      { status: 400 },
    );
  }

  // zod please verify the body matches my schema
  const result = blogSchema.safeParse(body);

  if (!result.success) {
    // zod sends details about the error
    return NextResponse.json(
      {
        error: 'The data is incomplete',
      },
      { status: 400 },
    );
  }
  // query the database to update the blog
  const blog = await updateBlogById(
    blogId,
    result.data.name,
    result.data.description,
    result.data.websiteUrl,
    result.data.location,
    result.data.imageUrl,
    result.data.userId,
  );

  if (!blog) {
    return NextResponse.json(
      {
        error: 'Blog Not Found',
      },
      { status: 404 },
    );
  }

  return NextResponse.json({
    blog: blog,
  });
}
