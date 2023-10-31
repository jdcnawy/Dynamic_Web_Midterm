import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { fetchAllSpells } from '../../utils/api';
import AlphabetButtons from '../../app/components/AlphabetButtons';
import styles from '../styles.module.css';

function AlphabetLetter() {
  const router = useRouter();
  const { letter } = router.query;
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpells = async () => {
      console.log('Selected Letter:', letter);
      if (letter) {
        console.log('Fetching spells for letter:', letter);
      }
      try {
        const allSpells = await fetchAllSpells();
        console.log('All Spells:', allSpells);
        const filteredSpells = allSpells.filter((spell) =>
          spell.name.startsWith(letter)
        );

        console.log('Filtered Spells:', filteredSpells);

        filteredSpells.sort((a, b) => a.name.localeCompare(b.name));

        console.log('Sorted Spells:', filteredSpells);

        setSpells(filteredSpells);
      } catch (error) {
        console.error('Error fetching spells:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, [letter]);

  return (
    <div>
      <h2>Filter Spells Alphabetically!</h2>
      <AlphabetButtons />
      <h1>DND 5e Spells</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div>
          {spells.map((spell) => (
            <div key={spell.slug}>
              <h2>{spell.name}</h2>
              {/* Render other spell details as needed */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default AlphabetLetter; 
