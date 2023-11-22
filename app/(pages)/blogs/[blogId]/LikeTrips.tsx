'use client';

import { useState } from 'react';
import { FaRegHeart } from 'react-icons/fa';
import { IoIosHeart } from 'react-icons/io';
import styles from '../../../styles/blogPage.module.scss';

export default function LikeTrip() {
  const [like, setLike] = useState(false);
  const toggleFollowButton = () => {
    setLike(!like);
  };
  return (
    <div>
      <button
        onClick={async () => await toggleFollowButton()}
        className={styles.loveButton}
      >
        {like ? (
          <p className={`${styles.heartButton} ${styles.heartButtonRed}`}>
            <IoIosHeart />
          </p>
        ) : (
          <p className={styles.heartButton}>
            <FaRegHeart />
          </p>
        )}
      </button>
    </div>
  );
}
