import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { MdOutlineCategory } from 'react-icons/md';
import { VscLocation } from 'react-icons/vsc';
import { getBlogById } from '../../../../database/blogs';
import { getFavourites } from '../../../../database/favourites';
import { getReviewsWithUserInfo } from '../../../../database/reviews';
import { getTripsWithInfo } from '../../../../database/trips';
import { getUserBySessionToken } from '../../../../database/users';
import { domine } from '../../../layout';
import styles from '../../../styles/blogPage.module.scss';
import AddFavourites from './AddFavourites';
import AddReviews from './AddReviews';
import AddTripsForm from './AddTrips';
import LikeTrip from './LikeTrips';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Across the Atlas | Bloggers' },
  description: 'Lorem ipsum',
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
              <p>
                <VscLocation /> {singleBlog.location}
              </p>
            </div>
          </div>
        </div>

        {/* ************* TRIPS SECTION ************* */}
        <div className={styles.tripsFeed}>
          <h2 className={domine.className}>Trips Feed</h2>
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

      <Image
        src="/home/coverphoto2.jpeg"
        alt="border color"
        height={100}
        width={1000}
        className={styles.borderImage}
      />

      {/* ************* REVIEWS SECTION ************* */}
      <div className={styles.reviewsSection}>
        <h2 className={domine.className}>What other users have been saying</h2>
        <div className={styles.reviewsContainer}>
          {userReviews.map((review) => {
            return (
              <div
                key={`review-div-${review.reviewId}`}
                className={styles.singleReviewCard}
              >
                <div className={styles.userImage}>
                  <img
                    src={review.userImageUrl}
                    height={60}
                    width={60}
                    style={{ borderRadius: '50%' }}
                    alt="user avatar"
                  />
                </div>
                <div className={styles.reviews}>
                  <Link href={`/${review.userName}`}>
                    <h4 className={domine.className}> {review.userName} </h4>
                  </Link>
                  <p className={styles.reviewContent}>{review.reviewContent}</p>
                </div>
              </div>
            );
          })}
        </div>

        <div className={styles.reviewInput}>
          <AddReviews blog={singleBlog} user={user} userReviews={userReviews} />
        </div>
      </div>

      {/* ************* TRIPS FORM SECTION (for blog owner only)************* */}
      <div>
        <AddTripsForm singleBlog={singleBlog} user={user} blog={singleBlog} />
      </div>
    </main>
  );
}
