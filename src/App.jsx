import { Routes, Route, Link } from 'react-router-dom'
import { Home } from './pages/home/home'
import { CharacterDetail } from './pages/character-detail/character-detail'
import { Favorites } from './pages/favorites/favorites'
import styles from './App.module.css' 

function App() {
  return (
    <>
      

      <nav className={styles.navbar}>
        <h1 className={styles.navTitle}>Rick and Morty API</h1>

        <div className={styles.navLinks}>
          <Link to="/" className={styles.navLink}>
            Inicio
          </Link>
          <Link to="/favorites" className={styles.navLinkFav}>
            Mis Favoritos ⭐
          </Link>
        </div>
      </nav>


      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/character/:id" element={<CharacterDetail />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </>
  )
}

export default App