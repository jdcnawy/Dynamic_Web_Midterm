import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { fetchAllSpells } from '../../utils/api'; // Replace with the actual API function

function SpellList({ spellsToDisplay }) {
  const [spells, setSpells] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpells = async () => {
      try {
        // Fetch all spells from your API
        const allSpells = await fetchAllSpells(); // Replace with the actual API function
        setSpells(allSpells);
      } catch (error) {
        console.error('Error fetching spells:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchSpells();
  }, []);

  return (
    <div>
      <h1>DND 5e Spells</h1>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <ul>
          {spellsToDisplay.map((spell) => (
            <li key={spell.slug}>
              <Link href={`/spell/${spell.slug}`} passHref>
                {spell.name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SpellList; 
