import { BrowserRouter as Router, Routes, Route, Link, useNavigate, Outlet } from 'react-router-dom';
import { useState } from 'react'
import './App.css'
import MovieList from './MovieList'
import SideBar from './Sidebar';
import Favorites from './Favorites';
import Watched from './Watched';
import Footer from './Footer';

const App = () => {

  const [globalMovies, setGlobalMovies] = useState([])

  const handleSetGLobalMovies = (movies) => {
    setGlobalMovies(movies)
  
  }

  return (
    <Router>
      <header className="banner">
        <h1>🎬 Flixter</h1>
      </header>

      <nav className="sidebar"> 
        <ul className="sidebar-ul">
          <li><Link to="/nowPlaying">Home</Link></li>
          <li><Link to="/favorites">Favorites</Link></li>
          <li><Link to="/watched">Watched</Link></li>
        </ul>
      </nav>

      <Routes>
        <Route path="/" element={<MovieList global={(callbackItem) => handleSetGLobalMovies(callbackItem)} />} />
        <Route path="/nowPlaying" element={<MovieList global={(callbackItem) => handleSetGLobalMovies(callbackItem)}/>} />
        <Route path="/favorites" element={<Favorites movies={globalMovies} />} />
        <Route path="/watched" element={<Watched movies={globalMovies}/>} />
      </Routes>

      <Footer />
    </Router>
  )}

export default App
