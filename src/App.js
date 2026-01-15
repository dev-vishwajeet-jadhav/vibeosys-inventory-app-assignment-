import './App.css';
import { Routes, Route, Link } from 'react-router-dom';
import ProductListPage from './pages/ProductListPage';
import AddProductPage from './pages/AddProductPage';
import EditProductPage from './pages/EditProductPage';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <div className="app-header__brand">Inventory Manager</div>
        <nav className="app-nav">
          <Link className="app-nav__link" to="/">
            Products
          </Link>
          <Link className="app-nav__link app-nav__link--primary" to="/products/new">
            Add Product
          </Link>
        </nav>
      </header>
      <main className="app-main">
        <div className="app-container">
          <Routes>
            <Route path="/" element={<ProductListPage />} />
            <Route path="/products/new" element={<AddProductPage />} />
            <Route path="/products/:id/edit" element={<EditProductPage />} />
          </Routes>
        </div>
      </main>
    </div>
  );
}

export default App;
