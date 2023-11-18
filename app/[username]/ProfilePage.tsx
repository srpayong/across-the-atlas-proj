'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import UpdateProfileForm from '../(pages)/updateProfile/UpdateProfileForm';
import { capitalizeName } from './capitalizedName';

// ... (imports remain unchanged)

type Props = {
  currentUser: {
    id: number;
    username: string;
    email: string;
    profileName: string;
    bio: string;
    imageUrl: string;
  };
  user: {
    id: number;
    username: string;
    email: string;
    profileName: string;
    bio: string;
    imageUrl: string;
  };
  handleSaveSuccess: () => void;
};

export default function ProfilePage(props: Props) {
  const router = useRouter();
  const [isEditing, setIsEditing] = React.useState(false);

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleSaveSuccess = () => {
    setIsEditing(false);

    router.replace(router.asPath, undefined, { scroll: false }).then(() => {
      window.location.reload();
    });
  };

  const handleCloseClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col items-center justify-center h-[400px] border-primary">
      <div className="avatar p-10 gap-20 bg-white rounded-lg shadow-md text-center">
        <div className="w-40 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2 overflow-hidden mx-auto">
          {props.user.imageUrl ? (
            <Image
              src={props.user.imageUrl}
              width={300}
              height={300}
              alt="Profile avatar"
            />
          ) : (
            <div>Default Image</div>
          )}
        </div>

        <div>
          <h1 className="text-4xl font-bold">
            {capitalizeName(props.user.profileName)}
          </h1>
          <p className="mt-2">@{props.user.username}</p>
          <p className="mt-2">{props.user.bio}</p>

          {isEditing ? (
            <UpdateProfileForm
              user={props.user}
              onSaveSuccess={handleSaveSuccess}
              onClose={handleCloseClick}
            />
          ) : (
            props.currentUser.username === props.user.username && (
              <button
                className="mt-3 w-[150px] h-[40px] bg-primary text-white rounded-md"
                onClick={handleEditClick}
              >
                Edit profile
              </button>
            )
          )}
        </div>
      </div>
    </div>
  );
}
