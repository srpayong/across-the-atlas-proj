import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createReview } from '../../../database/reviews';
import { getUserBySessionToken } from '../../../database/users';
import { Review } from '../../../migrations/00006-createTableReviews';

const reviewsSchema = z.object({
  content: z.string(),
  userId: z.number(),
  blogId: z.number(),
});

export type Error = {
  error: string;
};

export type ReviewsResponseBodyPost = { review: Review } | Error;

export async function POST(
  request: NextRequest,
): Promise<NextResponse<ReviewsResponseBodyPost>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      error: 'Invalid session token',
    });
  }

  const body = await request.json();
  const result = reviewsSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json({ error: 'Invalid' }, { status: 400 });
  }

  const newReview = await createReview(
    result.data.content,
    result.data.userId,
    result.data.blogId,
  );

  if (!newReview) {
    return NextResponse.json({ error: 'Review not created!' }, { status: 500 });
  }
  return NextResponse.json({ review: newReview });
}
