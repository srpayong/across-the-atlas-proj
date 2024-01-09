import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { deleteBlogById, getBlogById } from '../../../../database/blogs';
import { getUserBySessionToken } from '../../../../database/users';
import { Blog } from '../../../../migrations/00002-createTableBlogs';
import { Error } from '../route';

type BlogsResponseBodyDelete = { blog: Blog } | Error;

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<BlogsResponseBodyDelete>> {
  try {
    const token = cookies().get('sessionToken');
    const user = token && (await getUserBySessionToken(token.value));

    if (!user) {
      return NextResponse.json({ error: 'Invalid Session Token' });
    }

    const blogId = Number(params.myblogId);

    const blog = await getBlogById(blogId);

    console.log('Blog:', blog);

    if (!blog) {
      console.log('Blog not found. BlogId:', blogId);
      return NextResponse.json(
        {
          error: 'Blog not found',
        },
        { status: 404 },
      );
    }

    // Check if the logged-in user is the creator of the blog
    if (blog.userId !== user.id) {
      console.log(
        'Unauthorized: You are not the creator of this blog. BlogId:',
        blogId,
      );
      return NextResponse.json(
        { error: 'Unauthorized: You are not the creator of this blog' },
        { status: 403 },
      );
    }

    // Delete the blog
    const deletedBlog = await deleteBlogById(blogId);

    console.log('Deleted Blog:', deletedBlog);

    if (!deletedBlog) {
      console.log('Error deleting blog. BlogId:', blogId);
      return NextResponse.json(
        { error: 'Error deleting blog' },
        { status: 500 },
      );
    }

    return NextResponse.json({ blog: deletedBlog });
  } catch (error) {
    console.error('An error occurred:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
