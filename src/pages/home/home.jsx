import { useState, useEffect } from 'react'
import { CharacterCard } from '../../components/character-card/character-card'
import styles from './home.module.css' 

export function Home() { 
  const [characters, setCharacters] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState({})

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${search}&page=${page}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.results) {
          setCharacters(data.results)
          setInfo(data.info)
        } else {
          setCharacters([])
          setInfo({})
        }
      })
      .catch((error) => console.error('Error al traer los datos:', error))
  }, [search, page])

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1) 
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Rick and Morty API</h1>

      <div className={styles.headerControls}>
        <input 
          type="text" 
          placeholder="Buscar personaje..." 
          value={search}
          onChange={handleSearch}
          className={styles.searchInput}
        />

        <div className={styles.pagination}>
          <button 
            disabled={!info.prev}
            onClick={() => setPage(page - 1)}
            className={`${styles.btn} ${info.prev ? styles.btnEnabled : styles.btnDisabled}`}
          >
            Anterior
          </button>
          
          <span className={styles.pageInfo}>
            Página {page} de {info.pages || 1}
          </span>
          
          <button 
            disabled={!info.next}
            onClick={() => setPage(page + 1)}
            className={`${styles.btn} ${info.next ? styles.btnEnabled : styles.btnDisabled}`}
          >
            Siguiente
          </button>
        </div>
      </div>

      <div className={styles.grid}>
        {characters.map((character) => (
          <CharacterCard key={character.id} character={character} />
        ))}
      </div>
    </div>
  )
}