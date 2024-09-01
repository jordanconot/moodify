import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import LoginSpotify from '../components/log/LoginSpotify';
import Home from '../pages/Home';
import SpotifyCallback from '../utils/SpotifyCallback';

export default function AppRouter() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginSpotify onLogin={(userData) => console.log(userData)} />} />
        <Route path='/callback' element={<SpotifyCallback />} />
      </Routes>
    </Router>
  )
}
