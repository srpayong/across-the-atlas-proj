import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createTour } from '../../../database/tours';
import { getUserBySessionToken } from '../../../database/users';
import { Tour } from '../../../migrations/00007-createTableTours';

type Error = {
  error: string;
};

export type ToursResponseBodyPost = { tour: Tour } | Error;

const tourSchema = z.object({
  userId: z.number(),
  blogId: z.number(),
  name: z.string().min(1),
  category: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
});

// CREATING TOURS //////////////////////////////////
export async function POST(
  request: NextRequest,
): Promise<NextResponse<ToursResponseBodyPost>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      error: 'Invalid session token',
    });
  }
  const body = await request.json();
  const result = tourSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'The data is incomplete' },
      { status: 400 },
    );
  }

  const newTour = await createTour(
    result.data.userId,
    result.data.blogId,
    result.data.name,
    result.data.category,
    result.data.description,
    result.data.imageUrl,
  );

  if (!newTour) {
    return NextResponse.json(
      { error: 'Error creating new tour' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    tour: newTour,
  });
}
