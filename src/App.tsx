import { Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import Home from './routes/Home';
import Category from './routes/Category';
import Product from './routes/Product';
import Cart from './routes/Cart';
import Checkout from './routes/Checkout';
import Univers from './routes/Univers';
import Contact from './routes/Contact';
import Legal from './routes/Legal';
import Privacy from './routes/Privacy';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';

function App() {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<CartProvider>
				<div className="app-container">
					<Header />
					<main className="main-content">
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
					</main>
					<Footer />
				</div>
				</CartProvider>
			</LanguageProvider>
		</ThemeProvider>
	);
}

export default App;

