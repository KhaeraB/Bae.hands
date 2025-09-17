import { Link, NavLink } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { useTheme } from '@/context/ThemeContext';
import { useI18n } from '@/context/LanguageContext';

export default function Header() {
  const { items } = useCart();
  const { mode, toggle } = useTheme();
  const { t, locale, setLocale } = useI18n();
  const count = items.reduce((n, i) => n + i.quantity, 0);
  return (
    <header className="header">
      <div className="container header-inner">
        <Link to="/" className="logo">{t('brand')}</Link>
        <nav className="nav">
          <NavLink to="/univers">{t('nav_univers')}</NavLink>
          <NavLink to="/categorie/bracelets">{t('nav_bracelets')}</NavLink>
          <NavLink to="/categorie/boucles-oreilles">{t('nav_boucles')}</NavLink>
          <NavLink to="/categorie/colliers">{t('nav_colliers')}</NavLink>
          <NavLink to="/panier" className="cart-link">{t('nav_cart')} ({count})</NavLink>
          <button className="btn btn-small" onClick={toggle} aria-label="Basculer le thème">{mode === 'light' ? t('toggle_theme_dark') : t('toggle_theme_light')}</button>
          <select value={locale} onChange={e => setLocale(e.target.value as any)} aria-label={t('lang')}>
            <option value="fr">FR</option>
            <option value="en">EN</option>
          </select>
        </nav>
      </div>
    </header>
  );
}

