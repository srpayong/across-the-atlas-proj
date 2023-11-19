import { useRouter } from 'next/navigation';
import React, { ChangeEvent, FormEvent, useRef, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { User } from '../../../migrations/00000-createTableUsers';

type UpdateProfileFormPage = {
  onSaveSuccess: () => void;
  user: User;
  onClose: () => void;
};

const UpdateProfileForm: React.FC<UpdateProfileFormPage> = ({
  onSaveSuccess,
  user,
  onClose,
}) => {
  const router = useRouter();
  const [newProfileData, setNewProfileData] = useState({
    username: user.username,
    email: user.email,
    profileName: user.profileName,
    bio: user.bio,
    imageUrl: '',
  });

  const [error, setError] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleOnChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = event.target;
    setNewProfileData({ ...newProfileData, [name]: value });
  };

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setNewProfileData({
          ...newProfileData,
          imageUrl: e.target?.result as string,
        });
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  };

  const handleOnSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);

    try {
      let imageUrl = newProfileData.imageUrl; // Use the existing image URL by default

      // Check if a new image is selected
      if (fileInputRef.current?.files && fileInputRef.current?.files[0]) {
        const formData = new FormData();
        formData.append('file', fileInputRef.current.files[0]);
        formData.append('upload_preset', 'uploads');

        // Upload the new image to Cloudinary
        const response = await fetch(
          `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
          {
            method: 'POST',
            body: formData,
          },
        );

        const data = await response.json();
        imageUrl = data.secure_url;
      }

      // Update the user profile information including the Cloudinary image URL
      const updateResponse = await fetch(`/api/users/${user.id}`, {
        method: 'PUT',
        body: JSON.stringify({
          username: newProfileData.username,
          email: newProfileData.email,
          profileName: newProfileData.profileName,
          bio: newProfileData.bio,
          imageUrl, // Use the Cloudinary URL here
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });

      // Check if the update was successful
      if (updateResponse.ok) {
        // Notify the parent component about the success
        onSaveSuccess();

        // Reset the form
        setNewProfileData({
          username: user.username,
          email: user.email,
          profileName: user.profileName,
          bio: user.bio,
          imageUrl: '',
        });

        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }

        router.refresh();
      } else {
        // Handle error response
        const errorData = await updateResponse.json();
        setError(
          errorData.message || 'An error occurred while updating your profile.',
        );
      }
    } catch (error) {
      setError('An error occurred while updating your profile.');
      console.error('An error occurred while updating your profile:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleOnSubmit}
      className="relative flex flex-col items-center mx-auto p-4 space-y-2 border-solid border-2 border-primary rounded-md w-[700px] h-[600px] bg-white z-10"
    >
      {/* Close button */}
      <button
        type="button"
        onClick={onClose}
        className="absolute top-0 right-0 text-primary p-2"
      >
        <MdOutlineClose />
      </button>

      {/* Rest of the form content */}
      <label className="flex flex-col">
        <span className="text-primary text-sm">Username:</span>
        <input
          type="text"
          name="username"
          value={newProfileData.username}
          onChange={handleOnChange}
          className="border-2 border-solid border-primary rounded-md p-2 text-sm"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-primary text-sm">Email:</span>
        <input
          type="text"
          name="email"
          value={newProfileData.email}
          onChange={handleOnChange}
          className="border-2 border-solid border-primary rounded-md p-2 text-sm"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-primary text-sm">Profile Name:</span>
        <input
          type="text"
          name="profileName"
          value={newProfileData.profileName}
          onChange={handleOnChange}
          className="border-2 border-solid border-primary rounded-md p-2 text-sm"
        />
      </label>

      <label className="flex flex-col">
        <span className="text-primary text-sm">Bio:</span>
        <textarea
          name="bio"
          value={newProfileData.bio}
          onChange={handleOnChange}
          className="border-2 border-solid border-primary rounded-md p-2 text-sm"
        />
      </label>

      {/* Input for the profile image */}
      <label className="flex flex-col">
        <input
          type="file"
          name="imageFile"
          ref={fileInputRef}
          onChange={handleImageChange}
          accept="image/*"
          className="border-2 border-solid border-primary rounded-md p-2 text-sm"
        />
        {/* Display the image preview */}
        <div className="mt-2">
          {newProfileData.imageUrl ? (
            <img
              src={newProfileData.imageUrl}
              alt="Profile avatar"
              height={60}
              width={60}
              className="rounded-full"
            />
          ) : (
            <div className="rounded-full border-2 border-solid border-primary h-60 w-60 bg-default-image"></div>
          )}
        </div>
      </label>

      {/* Submit button */}
      <button
        type="submit"
        disabled={loading}
        className="bg-primary text-white rounded-md p-2"
      >
        {loading ? 'Updating...' : 'Save Changes'}
      </button>

      {/* Display an error if any */}
      {error && <div className="text-red-500 text-sm">{error}</div>}
    </form>
  );
};

export default UpdateProfileForm;
