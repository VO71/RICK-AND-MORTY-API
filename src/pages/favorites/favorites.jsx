import { useContext } from 'react'
import { FavoritesContext } from '../../context/FavoritesContext'
import { CharacterCard } from '../../components/character-card/character-card'

export function Favorites() {
  const { favorites } = useContext(FavoritesContext)

  return (
    <div style={{ padding: '40px 20px', maxWidth: '1200px', margin: '0 auto' }}>
      <h1 style={{ textAlign: 'center', marginBottom: '40px' }}>Mis Personajes Favoritos</h1>
      
      {favorites.length === 0 ? (
        <p style={{ textAlign: 'center', fontSize: '1.2rem', color: '#f2f2f2' }}>
          Aun no tienes personajes favoritos guardados.
        </p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'center' }}>
          {favorites.map((character) => (
            <CharacterCard key={character.id} character={character} />
          ))}
        </div>
      )}
    </div>
  )
}