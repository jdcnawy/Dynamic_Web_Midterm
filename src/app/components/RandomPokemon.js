import { useQuery } from 'react-query';
import axios from 'axios';
import { TailSpin } from 'react-loader-spinner';
import Link from 'next/link';
import AnimePoster from './AnimePoster';
import styles from './RandomPokemon.module.css'; // Import your CSS module

const getRandomPokemon = async () => {
  try {
    const randomPokedexNumber = Math.floor(Math.random() * 151) + 1;

    const pokemonResponse = await axios.get(`https://pokeapi.co/api/v2/pokemon/${randomPokedexNumber}`);
    const pokemonData = pokemonResponse.data;

    const animeResponse = await axios.get(`https://api.jikan.moe/v4/anime/${randomPokedexNumber + 1000}`);
    const animeData = animeResponse.data;

    return { pokemon: pokemonData, anime: animeData };
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const RandomPokemon = () => {
  const { data, isLoading, isError } = useQuery('randomPokemon', getRandomPokemon);

  if (isLoading) {
    return (
      <div className={styles.container}> {/* Use the "container" class */}
        <TailSpin color="#0070f3" height={80} width={80} />
      </div>
    );
  }

  if (isError) {
    return <div className={styles.error}>Error fetching data.</div>; {/* Use the "error" class */}
  }

  const { pokemon, anime } = data;
  console.log('Anime Data:', anime.data);

  return (
    <div className={styles.container}> {/* Use the "container" class */}
      <h1 className={styles.header}>Random Pokémon and Its Favorite Anime</h1> {/* Use the "header" class */}
      <h2>{pokemon.name}</h2>
      <img src={pokemon.sprites.front_default} alt={pokemon.name} className={styles.pokemonImage} /> {/* Use the "pokemon-image" class */}
      <p>Height: {pokemon.height} decimetres</p>
      <p>Weight: {pokemon.weight} hectograms</p>
      <h2 className={styles.pokemonInfo}>Pokémon Abilities</h2>
      <ul>
        {pokemon.abilities.map((ability, index) => (
          <li key={index}>{ability.ability.name}</li>
        ))}
      </ul>
      <h2 className={styles.pokemonInfo}>Pokémon Type(s)</h2>
      <ul>
        {pokemon.types.map((type, index) => (
          <li key={index}>{type.type.name}</li>
        ))}
      </ul>
      <h2 className={styles.pokemonInfo}>Pokémon Stats</h2>
      <ul>
        {pokemon.stats.map((stat, index) => (
          <li key={index}>
            {stat.stat.name}: {stat.base_stat}
          </li>
        ))}
      </ul>
      <h2 className={styles.pokemonInfo}>Favorite Anime</h2>
      <div className={styles.animePoster}> {/* Use the "anime-poster" class */}
        {anime.data.mal_id ? (
          <AnimePoster malId={anime.data.mal_id} />
        ) : (
          <div>No anime poster available.</div>
        )}
      </div>
      <p className={styles.pokemonInfo}>Title: {anime.data.title}</p>
      <p className={styles.pokemonInfo}>Episodes: {anime.data.episodes}</p>
      <p className={styles.pokemonInfo}>Synopsis: {anime.data.synopsis}</p>
      <Link href="/" className={styles.button}>Try again!</Link> {/* Use the "button" class */}
    </div>
  );
};

export default RandomPokemon;
