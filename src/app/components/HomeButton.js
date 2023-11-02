import React from 'react';
import Link from 'next/link';
import styles from './HomeButton.module.css';

const HomeButton = () => (
  <div className={styles.container}>
    <div className={styles.buttonWrapper}>
      <Link href="/random-pokemon">
        <button className={styles.button}>
          Click to generate a Pokémon and its favorite anime!
        </button>
      </Link>
    </div>
  </div>
);

export default HomeButton;
