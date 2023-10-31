import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchSpellData } from '../utils/api';
import SpellList from '@/app/components/SpellList';
import AlphabetButtons from '@/app/components/AlphabetButtons';
import { useRouter } from 'next/router';
import styles from '../pages/styles.module.css';

function IndexPage() {
  const router = useRouter();
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState(null);
  useEffect(() => {
    const fetchSpells = async () => {
      try {
        const response = await fetchSpellData();
        if (response && response.results) {
          setSpells(response.results);
        }
      } catch (error) {
        console.error('Error fetching spells:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  const handleFilter = (letter) => {
    setFilter(letter);
  }

  const filteredSpells = filter
    ? spells.filter((spell) => spell.name.startsWith(filter)) : spells;
  if (loading) {
    return <div className={styles['loading']}>Loading...</div>;
  }

  return (
    <div className={styles.pageContainer}>
      <AlphabetButtons onFilter={handleFilter} />
      <h2>Filter Spells Alphabetically!</h2>
      <h1 >DND 5e Spells</h1>

      <ul>
        {filteredSpells.map((spell, index) => (
          <li key={index}>
            <Link href={`/spell/${index}`} passHref>
              {spell.name}
            </Link>
            <p>Spell Number: {index + 1}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default IndexPage;
 