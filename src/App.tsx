import { } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { ThemeProvider } from './context/ThemeContext';
import AppRoutes from './routes/AppRoutes';
import Header from './components/Header';
import Footer from './components/Footer';
import { LanguageProvider } from './context/LanguageContext';
import GtagRouteTracker from './components/GtagRouteTracker';
import CookieConsent from './components/CookieConsent';

function App() {
	return (
		<ThemeProvider>
			<LanguageProvider>
				<CartProvider>
				<div className="app-container">
					<GtagRouteTracker measurementId="G-3LL7VKTBM4" />
					<CookieConsent />
					<Header />
					<main className="main-content">
						<AppRoutes />
					</main>
					<Footer />
				</div>
				</CartProvider>
			</LanguageProvider>
		</ThemeProvider>
	);
}

export default App;

