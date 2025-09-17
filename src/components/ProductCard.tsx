import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';

export default function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  return (
    <div className="product-card">
      <Link to={`/produit/${product.id}`} className="product-thumb">
        <img src={product.imageUrl} alt={product.name} />
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{product.priceEur.toFixed(2)} €</p>
        <div className="actions">
          <Link to={`/produit/${product.id}`} className="btn btn-secondary">Voir</Link>
          <button className="btn" disabled={product.stock === 0} onClick={() => addItem(product.id, 1)}>
            {product.stock === 0 ? 'Rupture' : 'Ajouter'}
          </button>
        </div>
      </div>
    </div>
  );
}


