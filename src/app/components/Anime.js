import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

function Anime() {
  const [anime, setAnime] = useState(null);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const { spellId } = router.query;

  useEffect(() => {
    const fetchAnimeData = async () => {
      try {
        if (spellId) {
          const response = await axios.get(`https://api.jikan.moe/v4/anime/${spellId}`);
          setAnime(response.data);
        }
      } catch (error) {
        console.error('Error fetching anime:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnimeData();
  }, [spellId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!anime) {
    return <div>No anime data found for this spell.</div>;
  }

  return (
    <div>
      <h1>Anime for Spell ID: {spellId}</h1>
      <div>
        <h2>{anime.title}</h2>
        <img src={anime.image_url} alt={anime.title} />
        <p>Synopsis: {anime.synopsis}</p>
      </div>
    </div>
  );
}

export default Anime; 
