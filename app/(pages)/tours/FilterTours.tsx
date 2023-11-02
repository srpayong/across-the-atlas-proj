'use client';

import { Domine } from 'next/font/google';
import Image from 'next/image';
import { useState } from 'react';
import { MdOutlineCategory } from 'react-icons/md';
import { Tour } from '../../../migrations/00007-createTableTours';
import styles from '../../styles/toursPage.module.scss';
import LikeTour from '../blogs/[blogId]/LikeTours';

type Props = {
  tours: Tour[];
};

const domine = Domine({
  subsets: ['latin'],
  display: 'swap',
});

export default function FilteredToursPage({ tours }: Props) {
  const [category, setCategory] = useState('');

  const filterToursByCategory = category
    ? tours.filter((tour) => tour.category === category)
    : tours;

  return (
    <main className={styles.toursPageContainer}>
      <div className={styles.filterOptions}>
        <select
          value={category}
          onChange={(event) => {
            setCategory(event.currentTarget.value);
          }}
        >
          <option value="">Filter by category</option>
          <option value="">All Tours</option>
          <option value="Wildlife & Safari">Wildlife & Safari</option>
          <option value="Food and Drink">Food and Drink</option>
          <option value="Adventure">Adventure</option>
          <option value="Beach">Beach</option>
          <option value="History & Culture">History & Culture</option>
          <option value="Hiking & Trekking">Hiking & Trekking</option>
        </select>
      </div>
      <div className={styles.tourListContainer}>
        {filterToursByCategory.map((tour) => {
          return (
            <div key={`blog-div-${tour.id}`} className={styles.tourCard}>
              <div className={styles.topCardSection}>
                <div className={styles.cardHeader}>
                  <p className={`${styles.tourName} ${domine.className}`}>
                    {tour.name}
                  </p>
                  <LikeTour />
                </div>
                <div className={styles.imageContainer}>
                  <Image
                    src={tour.imageUrl}
                    width={100}
                    height={100}
                    alt="Blog avatar"
                    className={styles.tourImage}
                  />
                </div>
              </div>
              <div className={styles.bottomSection}>
                <p>
                  <MdOutlineCategory /> {tour.category}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
