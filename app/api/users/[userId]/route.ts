import { v2 as cloudinary } from 'cloudinary';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';
import {
  getUserBySessionToken,
  updateUserById,
} from '../../../../database/users';
import { User } from '../../../../migrations/00000-createTableUsers';
import { Error } from '../route';

// Configure Cloudinary with your credentials
// cloudinary.config({
//   cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
//   api_key: process.env.CLOUDINARY_API_KEY,
//   api_secret: process.env.CLOUDINARY_API_SECRET,
// });

type UserResponseBodyPut = { user: User } | Error;

export async function PUT(
  request: NextRequest,
  { params }: { params: Record<string, string | string[]> },
): Promise<NextResponse<UserResponseBodyPut>> {
  const token = cookies().get('sessionToken');
  const loggedInUser = token && (await getUserBySessionToken(token.value));

  if (!loggedInUser) {
    return NextResponse.json({ error: 'Invalid Session Token' });
  }

  const userId = Number(params.userId);
  const body = await request.json();
  console.log('body:', body);
  if (!userId || userId !== loggedInUser.id) {
    return NextResponse.json(
      {
        error: 'Invalid User Id',
      },
      { status: 400 },
    );
  }

  try {
    // Check if there is an image in the body
    if (body.image) {
      // Upload image to Cloudinary
      const cloudinaryResponse = await cloudinary.uploader.upload(body.image, {
        folder: 'uploads', // specify your Cloudinary folder
        overwrite: true,
      });

      // Update the user record with the Cloudinary image URL
      const updatedUser = await updateUserById({
        id: userId,
        username: body.username,
        email: body.email,
        profileName: body.profileName,
        bio: body.bio,
        imageUrl: cloudinaryResponse.secure_url,
      });

      if (!updatedUser) {
        return NextResponse.json(
          {
            error: 'Error updating user',
          },
          { status: 401 },
        );
      }

      return NextResponse.json({
        user: updatedUser,
      });
    }

    // Continue with the rest of your PUT logic (without image upload)
    const updatedUser = await updateUserById({
      id: userId,
      username: body.username,
      email: body.email,
      profileName: body.profileName,
      bio: body.bio,
      imageUrl: body.imageUrl,
    });

    if (!updatedUser) {
      return NextResponse.json(
        {
          error: 'Error updating user',
        },
        { status: 500 },
      );
    }

    return NextResponse.json({
      user: updatedUser,
    });
  } catch (error) {
    console.error('Error processing update:', error);
    return NextResponse.json(
      {
        error: 'Internal Server Error',
      },
      { status: 500 },
    );
  }
}
