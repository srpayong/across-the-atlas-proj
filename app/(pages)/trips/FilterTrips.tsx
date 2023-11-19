'use client';

import { Domine } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import { Trip } from '../../../migrations/00007-createTableTrips';
import styles from '../../styles/tripsPage.module.scss';
import LikeTrip from '../blogs/[blogId]/LikeTrips';

type Props = {
  trips: Trip[];
};

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export default function FilteredTripsPage({ trips }: Props) {
  const [category, setCategory] = useState('');

  const filterTripsByCategory = category
    ? trips.filter((trip) => trip.category === category)
    : trips;

  return (
    <main className={styles.tripsPageContainer}>
      <div className={styles.filterOptions}>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.currentTarget.value);
          }}
        >
          <option value="">Filter by category</option>
          <option value="">All Trips</option>
          <option value="Wildlife & Safari">Wildlife & Safari</option>
          <option value="Food and Drink">Food and Drink</option>
          <option value="Adventure">Adventure</option>
          <option value="Beach">Beach</option>
          <option value="History & Culture">History & Culture</option>
          <option value="Hiking & Trekking">Hiking & Trekking</option>
        </select>
      </div>
      <div className={styles.tripListContainer}>
        {filterTripsByCategory.map((trip) => {
          return (
            <div key={`blog-div-${trip.id}`} className={styles.tripCard}>
              <div className={styles.topCardSection}>
                <div className={styles.cardHeader}>
                  <p className={`${styles.tripName} ${domine.className}`}>
                    {trip.name}
                  </p>
                  <LikeTrip />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src={trip.imageUrl}
                    width={100}
                    height={100}
                    alt="Blog avatar"
                    className={styles.tripImage}
                  />
                </div>
              </div>
              <div className={styles.bottomSection}>
                <p>
                  {/* <MdOutlineCategory /> */}
                  {trip.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
