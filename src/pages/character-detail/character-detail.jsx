// src/pages/character-detail/character-detail.jsx
import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import styles from './character-detail.module.css'

export function CharacterDetail() {
  const { id } = useParams()
  const navigate = useNavigate() // Herramienta para navegar entre páginas
  const [character, setCharacter] = useState(null) // Empieza en null porque aún no hay datos

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/${id}`)
      .then((response) => response.json())
      .then((data) => setCharacter(data))
      .catch((error) => console.error('Error al traer el personaje:', error))
  }, [id])

  if (!character) {
    return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Cargando personaje...</h2>
  }

  return (
    <div className={styles.container}>
      <button className={styles.backButton} onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className={styles.cardDetail}>
        <img src={character.image} alt={character.name} className={styles.image} />
        
        <div className={styles.info}>
          <h1 className={styles.name}>{character.name}</h1>
          <p><strong>Estado:</strong> {character.status}</p>
          <p><strong>Especie:</strong> {character.species}</p>
          <p><strong>Género:</strong> {character.gender}</p>
          
          <p><strong>Origen:</strong> {character.origin?.name}</p>
          <p><strong>Ubicación actual:</strong> {character.location?.name}</p>
        </div>
      </div>
    </div>
  )
}