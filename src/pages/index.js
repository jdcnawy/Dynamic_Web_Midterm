import HomeButton from '../app/components/HomeButton';
import styles from './index.module.css'; // Import the CSS module

const Home = () => (
  <div className={styles.container}>
    <h1 className={styles.header}>Welcome to the Pokémon Anime App</h1>
    <HomeButton />
  </div>
);

export default Home;

