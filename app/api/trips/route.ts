import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { createTrip } from '../../../database/trips';
import { getUserBySessionToken } from '../../../database/users';
import { Trip } from '../../../migrations/00007-createTableTrips';

type Error = {
  error: string;
};

export type TripsResponseBodyPost = { trip: Trip } | Error;

const tripSchema = z.object({
  userId: z.number(),
  blogId: z.number(),
  name: z.string().min(1),
  category: z.string().min(1),
  location: z.string().min(1),
  description: z.string().min(1),
  imageUrl: z.string().min(1),
});

// CREATING TRIPS //////////////////////////////////
export async function POST(
  request: NextRequest,
): Promise<NextResponse<TripsResponseBodyPost>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));

  if (!user) {
    return NextResponse.json({
      error: 'Invalid session token',
    });
  }
  const body = await request.json();
  const result = tripSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'The data is incomplete' },
      { status: 400 },
    );
  }

  const newTrip = await createTrip(
    result.data.userId,
    result.data.blogId,
    result.data.name,
    result.data.category,
    result.data.location,
    result.data.description,
    result.data.imageUrl,
  );

  if (!newTrip) {
    return NextResponse.json(
      { error: 'Error creating new trip' },
      { status: 500 },
    );
  }

  return NextResponse.json({
    trip: newTrip,
  });
}
