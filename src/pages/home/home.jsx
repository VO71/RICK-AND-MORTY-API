import { useState, useEffect } from 'react'
import { CharacterCard } from '../../components/character-card/character-card'
import styles from './home.module.css' 

export function Home() { 
  const [characters, setCharacters] = useState([])
  const [search, setSearch] = useState('')
  const [page, setPage] = useState(1)
  const [info, setInfo] = useState({})

  const [statusFilter, setStatusFilter] = useState('')
  const [genderFilter, setGenderFilter] = useState('')

  useEffect(() => {
    fetch(`https://rickandmortyapi.com/api/character/?name=${search}&page=${page}&status=${statusFilter}&gender=${genderFilter}`)
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
  }, [search, page, statusFilter, genderFilter]) 

  const handleSearch = (e) => {
    setSearch(e.target.value)
    setPage(1) 
  }

  const handleStatusChange = (e) => {
    setStatusFilter(e.target.value)
    setPage(1)
  }

  const handleGenderChange = (e) => {
    setGenderFilter(e.target.value)
    setPage(1)
  }

  return (
    <div className={styles.container}>

      <div className={styles.headerControls}>
        
        <div className={styles.filtersContainer}>
          <input 
            type="text" 
            placeholder="Buscar personaje" 
            value={search}
            onChange={handleSearch}
            className={styles.searchInput}
          />

          <select 
            value={statusFilter} 
            onChange={handleStatusChange} 
            className={styles.filterSelect}
          >
            <option value="">Estado (todos)</option>
            <option value="alive">Vivo</option>
            <option value="dead">Muerto</option>
            <option value="unknown">Desconocido</option>
          </select>

          <select 
            value={genderFilter} 
            onChange={handleGenderChange} 
            className={styles.filterSelect}
          >
            <option value="">Género (todos)</option>
            <option value="female">Femenino</option>
            <option value="male">Masculino</option>
            <option value="genderless">Sin género</option>
            <option value="unknown">Desconocido</option>
          </select>
        </div>

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