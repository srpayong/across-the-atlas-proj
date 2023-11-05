import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { getFavouriteByUserId } from '../../database/favourites';
import { getUserBySessionToken, getUserByUsername } from '../../database/users';
import { User } from '../../migrations/00000-createTableUsers';
import { Favourite } from '../../migrations/00005-createTableFavourites';
import { domine } from '../layout';
import styles from '../styles/EditProfile.module.scss';
import { capitalizeName } from './capitalizedName';
import DeleteFavourites from './DeleteFavourites';
import ProfilePage from './ProfilePage';

export const metadata = {
  title: { default: 'Home |' },
  description: 'Lorem Ipsum',
};

export type ProfilePageProps = {
  params: {
    username: string;
    currentUser: {
      username: string;
    };
    user: User;
    favourites: Favourite;
  };
};

export default async function UserProfilePage({ params }: ProfilePageProps) {
  const user = await getUserByUsername(params.username);

  if (!user) {
    notFound();
  }

  const sessionToken = cookies().get('sessionToken');
  const currentUser = !sessionToken?.value
    ? undefined
    : await getUserBySessionToken(sessionToken.value);

  if (!currentUser) {
    return redirect(`/login?returnTo=/${user.username}`);
  }

  const favourites = await getFavouriteByUserId(user.id);

  console.log({ favourites });

  return (
    <section className={styles.profileContainerBox}>
      <ProfilePage user={user} currentUser={currentUser} />
      <div className={styles.favouritesContainer}>
        <h1 className={domine.className}>
          {capitalizeName(user.profileName)}'s favourite blogs
        </h1>
        {favourites.length === 0 ? (
          <p>Favourite is empty</p>
        ) : (
          <div className={styles.allCards}>
            {favourites.map((favourite: any) => {
              return (
                <div
                  key={`favourite-div-${favourite.blogId}`}
                  className={styles.favouriteBlogCard}
                >
                  <Image
                    src={favourite.blogImageUrl}
                    width={100}
                    height={100}
                    alt="Blog image"
                    className={styles.blogImageUrl}
                  />
                  <div className={styles.infoSection}>
                    <h1>{favourite.blogName}</h1>
                    <Link
                      href={`/blogs/${favourite.blogId}`}
                      className={`${styles.blogLink} ${domine.className}`}
                    >
                      View blog
                    </Link>
                    <DeleteFavourites
                      favourites={favourite.favouriteId}
                      currentUser={currentUser}
                      user={user}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
