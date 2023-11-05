'use client';

import { useState } from 'react';
import { AiOutlineHeart, AiTwotoneHeart } from 'react-icons/ai';
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
            <AiTwotoneHeart />
          </p>
        ) : (
          <p className={styles.heartButton}>
            <AiOutlineHeart />
          </p>
        )}
      </button>
    </div>
  );
}
