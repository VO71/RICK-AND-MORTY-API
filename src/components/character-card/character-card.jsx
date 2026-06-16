import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FavoritesContext } from '../../context/FavoritesContext'; 
import styles from './character-card.module.css';

export function CharacterCard({ character }) {
  const { favorites, toggleFavorite } = useContext(FavoritesContext);
  
  const isFavorite = favorites.some((fav) => fav.id === character.id);

  return (
    <article className={styles.card}>
      <Link 
        to={`/character/${character.id}`} 
        style={{ textDecoration: 'none', color: 'inherit' }}
      >
        <img src={character.image} alt={character.name} className={styles.image} />
        
        <div className={styles.content}>
          <h2 className={styles.name}>{character.name}</h2>
          <p className={styles.status}>
            {character.status} - {character.species}
          </p>
        </div>
      </Link>

      <button 
        onClick={() => toggleFavorite(character)} 
        className={`${styles.favButton} ${isFavorite ? styles.favActive : ''}`}
      >
        {isFavorite ? '⭐ Quitar Favorito' : '☆ Agregar a Favoritos'}
      </button>
    </article>
  );
}