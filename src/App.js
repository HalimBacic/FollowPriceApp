import logo from './logo.svg';
import './App.css';
import Home from './pages/home/Home';
import ProductPage from './pages/product/ProductPage';
import SearchPage from './pages/searchpage/SearchPage';
import { Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/product/:barcode" element={<ProductPage />} />
          <Route path="/search/:query" element={<SearchPage />} />
        </Routes>
    </div>
  );
}

export default App;
