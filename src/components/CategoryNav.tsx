import { NavLink } from 'react-router-dom';

export default function CategoryNav() {
  return (
    <div className="category-nav">
      <NavLink to="/categorie/bracelets">Bracelets</NavLink>
      <NavLink to="/categorie/boucles-oreilles">Boucles d'oreilles</NavLink>
      <NavLink to="/categorie/colliers">Colliers</NavLink>
    </div>
  );
}


