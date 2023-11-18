import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { getUserBySessionToken, updateUserById } from '../../../database/users';
import { User } from '../../../migrations/00000-createTableUsers';

export type Error = {
  error: string;
};

type UserResponseBodyDelete = { user: User } | Error;
type UserResponseBodyPut = { user: User } | Error;

// Configure Cloudinary with your credentials
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const userSchema = z.object({
  username: z.string(),
  email: z.string(),
  profileName: z.string(),
  bio: z.string(),
  imageUrl: z.string(),
});

export async function DELETE(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyDelete>> {
  const token = cookies().get('sessionToken');
  const user = token && (await getUserBySessionToken(token.value));
}

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const userId = Number(params.userId);
  const body = await request.json();

  if (isNaN(userId) || userId <= 0) {
    return NextResponse.json({ error: 'Invalid User Id' }, { status: 400 });
  }

  const result = userSchema.safeParse(body);

  if (!result.success) {
    return NextResponse.json(
      { error: 'The data is incomplete' },
      { status: 400 },
    );
  }

  try {
    // Check if there is an image in the body
    if (result.data.imageUrl) {
      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(
        result.data.imageUrl,
        {
          folder: 'uploads', // specify your Cloudinary folder
          overwrite: true,
        },
      );

      // Update the user record with the Cloudinary image URL
      const updatedUser = await updateUserById({
        id: userId,
        username: result.data.username,
        email: result.data.email,
        profileName: result.data.profileName,
        bio: result.data.bio,
        imageUrl: cloudinaryResponse.secure_url,
      });

      if (!updatedUser) {
        return NextResponse.json(
          { error: 'Error updating user' },
          { status: 500 },
        );
      }

      return NextResponse.json({ user: updatedUser });
    }

    // Continue with the rest of your PUT logic (without image upload)
    const updatedUser = await updateUserById({
      id: userId,
      username: result.data.username,
      email: result.data.email,
      profileName: result.data.profileName,
      bio: result.data.bio,
      imageUrl: result.data.imageUrl,
    });

    if (!updatedUser) {
      return NextResponse.json(
        { error: 'Error updating user' },
        { status: 500 },
      );
    }

    return NextResponse.json({ user: updatedUser });
  } catch (error) {
    console.error('Error processing update:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    );
  }
}
