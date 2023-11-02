import { cookies } from 'next/headers';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { MdOutlineCategory } from 'react-icons/md';
import { VscLocation } from 'react-icons/vsc';
import { getBlogById } from '../../../../database/blogs';
import { getFavourites } from '../../../../database/favourites';
import { getReviewsWithUserInfo } from '../../../../database/reviews';
import { getToursWithInfo } from '../../../../database/tours';
import { getUserBySessionToken } from '../../../../database/users';
import { domine } from '../../../layout';
import styles from '../../../styles/blogPage.module.scss';
import AddFavourites from './AddFavourites';
import AddReviews from './AddReviews';
import AddToursForm from './AddTours';
import LikeTour from './LikeTours';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: { default: 'Hello | Bloggers' },
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

  // display tours from this blog
  const blogTours = await getToursWithInfo(singleBlog.id);

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

        {/* ************* TOURS SECTION ************* */}
        <div className={styles.toursFeed}>
          <h2 className={domine.className}>Tours Feed</h2>
          <div className={styles.toursContainer}>
            {blogTours.map((tour) => {
              return (
                <div
                  key={`tour-div-${tour.tourId}`}
                  className={styles.tourCard}
                >
                  <div className={styles.titleSection}>
                    <p className={`${styles.tourTitle} ${domine.className}`}>
                      {tour.tourName}
                    </p>
                    <LikeTour />
                  </div>
                  <Image
                    src={tour.tourImageUrl}
                    width={100}
                    height={100}
                    alt="tour"
                    className={styles.tourImage}
                  />
                  <p className={styles.tourDescription}>
                    {tour.tourDescription}
                  </p>
                  <p className={styles.tourCategory}>
                    <MdOutlineCategory /> {tour.tourCategory}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <Image
        src="/images/blogpage-border.png"
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

      {/* ************* TOURS FORM SECTION (for blog owner only)************* */}
      <div>
        <AddToursForm singleBlog={singleBlog} user={user} blog={singleBlog} />
      </div>
    </main>
  );
}
