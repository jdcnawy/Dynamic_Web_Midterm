import { useState, useEffect } from 'react';
import axios from 'axios';

const AnimePoster = ({ malId }) => {
  const [posterUrl, setPosterUrl] = useState(null);

  useEffect(() => {
    const fetchAnimePoster = async (malId) => {
        try {
          if (!malId) {
            console.log('malId is undefined');
            return null;
          }
      
          const response = await axios.get(`https://api.jikan.moe/v4/anime/${malId}`);
          const animeData = response.data;
      
          console.log('Anime Data:', animeData);
      
          if (animeData.images && animeData.images.jpg) {
            console.log('Poster URL:', animeData.images.jpg.image_url);
            setPosterUrl(animeData.images.jpg.image_url);
          } else {
            console.log('No poster available');
            setPosterUrl(null);
          }
        } catch (error) {
          console.error('Error fetching anime poster:', error);
          setPosterUrl(null);
        }
      };
    fetchAnimePoster();
  }, [malId]);

  if (!posterUrl) {
    return <div>No anime poster available.</div>;
  }

  return <img src={posterUrl} alt="Anime Poster" />;
};

export default AnimePoster;
