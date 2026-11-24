import { ThemeProvider } from './provider/ThemeProvider';
import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import About from './pages/About/About';
import Home from './pages/Home/Home';
import Catalog from './pages/Catalog/Catalog';
import Cart from './pages/Cart/Cart';
import GameDetails from './pages/GameDetails/GameDetails';
import Profile from './pages/Profile/Profile';
import Settings from './pages/Settings/Settings';

import './app.scss';

function App() {
  return (
    <ThemeProvider>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<About />} />
          <Route path="/home" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/game/:id" element={<GameDetails />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;
