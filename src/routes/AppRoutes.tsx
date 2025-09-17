import { Routes, Route, Navigate } from 'react-router-dom';
import Home from './Home';
import Category from './Category';
import Product from './Product';
import Cart from './Cart';
import Checkout from './Checkout';
import Univers from './Univers';
import Contact from './Contact';
import Legal from './Legal';
import Privacy from './Privacy';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/categorie/:slug" element={<Category />} />
      <Route path="/univers" element={<Univers />} />
      <Route path="/produit/:id" element={<Product />} />
      <Route path="/panier" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/legal" element={<Legal />} />
      <Route path="/privacy" element={<Privacy />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}


