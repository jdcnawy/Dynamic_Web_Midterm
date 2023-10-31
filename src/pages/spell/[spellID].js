import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { createSpellNameToNumberMap } from '../../utils/api';

function SpellIDPage() {
  const router = useRouter();
  const { spellID } = router.query;
  const [spell, setSpell] = useState(null);
  const [animeData, setAnimeData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [spellNameToNumber, setSpellNameToNumber] = useState({});

  useEffect(() => {
    async function fetchSpellNameToNumberMap() {
      const map = await createSpellNameToNumberMap();
      setSpellNameToNumber(map);
    }

    fetchSpellNameToNumberMap();
  }, []);

  useEffect(() => {
    console.log('spellID:', spellID);
    console.log('spellNameToNumber:', spellNameToNumber);
    if (spellID) {
      if (spellNameToNumber.hasOwnProperty(spellID)) {
        const spellNumber = spellNameToNumber[spellID];
        const fetchAnimeData = async () => {
          console.log('fetchAnimeData is called');
          try {
            const response = await fetch(`https://api.jikan.moe/v4/anime/${spellNumber}`);
            console.log('Jikan API response:', response);
            const data = await response.json();
            console.log('Jikan API data:', data);
            setAnimeData(data);
          } catch (error) {
            console.error('Error fetching anime data:', error);
          } finally {
            setLoading(false);
          }
        };
        

        fetchAnimeData();
      }
    }
  }, [spellID, spellNameToNumber]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Spell Details</h1>
      {spell && (
        <div>
          <h2>{spell.name}</h2>
          <p>Desc: {spell.desc}</p>

        </div>
      )}

      {animeData && (
        <div>
          <h1>Anime Information</h1>
          <h2>{animeData.title}</h2>
          <img src={animeData.image_url} alt={animeData.title} />
          <p>Synopsis: {animeData.synopsis}</p>

        </div>
      )}
    </div>
  );
}

export default SpellIDPage;
 