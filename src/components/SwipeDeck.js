import React from 'react';
import styles from '../css/SwipeDeck.module.css'; // Optional for custom styling

const SwipeDeck = ({ onSwipe }) => {
  return (
    <div className={styles['swipe-deck']}>
      <button className={styles['swipe-button']} onClick={() => onSwipe('left')}>
        ❌ Pass
      </button>
      <button className={styles['swipe-button']} onClick={() => onSwipe('right')}>
        ❤️ Like
      </button>
    </div>
  );
};

export default SwipeDeck;

