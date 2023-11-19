import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { MdOutlineCategory } from 'react-icons/md';
import { getBlogById } from '../../../../database/blogs';
import { getFavourites } from '../../../../database/favourites';
import { getReviewsWithUserInfo } from '../../../../database/reviews';
import { getTripsWithInfo } from '../../../../database/trips';
import { getUserBySessionToken } from '../../../../database/users';
import { domine } from '../../../layout';
import styles from '../../../styles/blogPage.module.scss';
import AddFavourites from './AddFavourites';
import AddReviews from './AddReviews';
import AddTrips from './AddTrips';
import LikeTrip from './LikeTrips';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Across the Atlas | Blog' },
  description: 'Adventure is worthwhile.',
};

export default async function SingleBlogPage(props) {
  const singleBlog = await getBlogById(Number(props.params.blogId));

  const cookieStore = cookies();
  const sessionToken = cookieStore.get('sessionToken');

  const user =
    sessionToken && (await getUserBySessionToken(sessionToken.value));

  if (!user) {
    return redirect(`/login?returnTo=/blogs/${props.params.blogId}`);
  }

  if (!singleBlog) {
    notFound();
  }

  // to allow users to favourite this blog
  const favourites = await getFavourites(user.id);

  // to get reviews from users
  const userReviews = await getReviewsWithUserInfo(singleBlog.id);

  // display trips from this blog
  const blogTrips = await getTripsWithInfo(singleBlog.id);

  return (
    <main className={styles.mainSection}>
      <div className={styles.blogPage}>
        <div className={styles.blogInfo}>
          <h1 className={`${styles.blogHeader} ${domine.className}`}>
            {singleBlog.name}
          </h1>
          <div className={styles.imageBox}>
            <Image
              src={singleBlog.imageUrl}
              width={300}
              height={300}
              alt="Blog"
              className={styles.singleBlogImage}
            />
          </div>
          <div className={styles.moreInfo}>
            <div className={styles.linkAndFollow}>
              <Link href="/">{singleBlog.websiteUrl}</Link>

              {user.id !== singleBlog.userId && (
                <AddFavourites
                  favourites={favourites}
                  singleBlog={singleBlog}
                  user={user}
                />
              )}
            </div>
            <p className={styles.blogBio}>{singleBlog.description}</p>
            <div className={styles.locationAndBlogger}>
              <p>{singleBlog.location}</p>
            </div>
          </div>
        </div>

        {/* ************* TRIPS SECTION ************* */}
        <div className={styles.tripsFeed}>
          <h2 className={styles.tripsFeedTitle}>Trips feed: </h2>
          <div className={styles.tripsContainer}>
            {blogTrips.map((trip) => {
              return (
                <div
                  key={`trip-div-${trip.tripId}`}
                  className={styles.tripCard}
                >
                  <div className={styles.titleSection}>
                    <p className={`${styles.tripTitle} ${domine.className}`}>
                      {trip.tripName}
                    </p>
                    <LikeTrip />
                  </div>
                  <Image
                    src={trip.tripImageUrl}
                    width={100}
                    height={100}
                    alt="trip"
                    className={styles.tripImage}
                  />
                  <p className={styles.tripDescription}>
                    {trip.tripDescription}
                  </p>
                  <p className={styles.tripCategory}>
                    <MdOutlineCategory /> {trip.tripCategory}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ************* REVIEWS SECTION ************* */}
      <div className="mx-auto w-11/12 max-w-screen-lg mt-30px">
        {/* Left side with reviews, h1, and input box */}
        <h2 className="text-3xl mb-8px text-center mt-10">
          What other members have been saying:
        </h2>
        <div className="w-full mt-30 p-2 border-2 border-accent rounded-lg">
          <div className="h-80 overflow-y-auto  p-8 ">
            {/* Scrollable box for comments */}
            <div className="space-y-4">
              {userReviews.map((review, index) => (
                <div
                  key={`review-div-${review.reviewId}`}
                  className={`flex items-center rounded-lg space-x-4 ${
                    index % 2 === 0 ? 'bg-white' : 'bg-accent'
                  }`}
                >
                  <div className="w-28 h-28 overflow-hidden rounded-full bg-accent">
                    <img
                      src={review.userImageUrl}
                      className="object-cover w-full h-full"
                      alt="user avatar"
                    />
                  </div>
                  <div className="flex-1">
                    <Link href={`/${review.userName}`}>
                      <h4 className="font-semibold">{review.userName}</h4>
                    </Link>
                    <p className="text-black-600">{review.reviewContent}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* Input box */}
          <div className="mx-auto flex items-center justify-center">
            <AddReviews
              blog={singleBlog}
              user={user}
              userReviews={userReviews}
            />
          </div>
        </div>

        {/* Empty space */}
        {/* <div className="flex-1"></div> */}
      </div>

      {/* ************* TRIPS FORM SECTION (for blog owner only)************* */}
      <div className="flex-grow p-4 mt-10 flex items-center justify-center">
        <AddTrips singleBlog={singleBlog} user={user} blog={singleBlog} />
      </div>
    </main>
  );
}
