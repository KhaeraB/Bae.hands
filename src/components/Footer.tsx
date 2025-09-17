import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <p>© {new Date().getFullYear()} bae.bohemian chic — Artisanat, qualité, éthique.</p>
        <nav style={{ display: 'flex', gap: 12 }}>
          <Link to="/contact">Contact</Link>
          <Link to="/legal">Mentions légales</Link>
          <Link to="/privacy">RGPD</Link>
        </nav>
      </div>
    </footer>
  );
}

