import './App.css';
import AuthSuccess from './components/authsuccess/AuthSuccess';
import Home from './pages/home/Home';
import ProductPage from './pages/product/ProductPage';
import SearchPage from './pages/searchpage/SearchPage';
import Favorites from './pages/favorites/Favorites';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth/success" element={<AuthSuccess />} />
          <Route path="/product/:barcode" element={<ProductPage />} />
          <Route path="/search/:query" element={<SearchPage />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
    </div>
  );
}

export default App;
