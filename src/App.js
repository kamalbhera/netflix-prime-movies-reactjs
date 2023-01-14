import { useState, useEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'

import Home from './pages/Home'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Moviedetail from './pages/Moviedetail'
import Movie from './pages/Movie'
import TvShows from './pages/TvShows'
import Search from './pages/Search'

function App() {

  const [visible, setVisible] = useState(true)
  const location = useLocation()

  const navVisible = () => {
    if (location.pathname !== '/search') {
      setVisible(true)
    }
  }

  useEffect(() => {
    navVisible()
  }, [location.pathname])

  return (
    <>
      <Navbar visible={visible} />
      <Routes>
        <Route path="/" element={<Home exact />} />
        <Route path="/movie" element={<Movie />} />
        <Route path="/tv" element={<TvShows />} />
        <Route path="/search" element={<Search setVisible={setVisible} />} />
        <Route path="/:category/:movieId" element={<Moviedetail />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
