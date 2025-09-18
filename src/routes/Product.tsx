import { useParams } from 'react-router-dom';
import { getProductById } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { useEffect, useMemo, useState } from 'react';
import { trackAddToCart, trackViewItem } from '@/utils/tracking';

export default function Product() {
  const { id } = useParams<{ id: string }>();
  const product = useMemo(() => (id ? getProductById(id) : undefined), [id]);
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);

  useEffect(() => {
    if (!product) return;
    trackViewItem(product);
  }, [product]);

  if (!product) return <div className="container"><p>Produit introuvable.</p></div>;

  const canAdd = product.stock > 0 && qty > 0;

  return (
    <div className="container product-page">
      <div className="product-page-grid">
        <img className="product-page-img" src={product.imageUrl} alt={product.name} />
        <div>
          <h1>{product.name}</h1>
          <p className="price-lg">{product.priceEur.toFixed(2)} €</p>
          <p>{product.description}</p>
          <div className="qty-add">
            <label>
              Quantité
              <input type="number" min={1} max={5} value={qty} onChange={e => setQty(Number(e.target.value))} />
            </label>
            <button
              className="btn"
              disabled={!canAdd}
              onClick={() => {
                addItem(product.id, qty);
                trackAddToCart(product, qty);
              }}
            >Ajouter au panier</button>
          </div>
          <p className="stock">{product.stock > 0 ? `En stock (${product.stock})` : 'Rupture'}</p>
        </div>
      </div>
    </div>
  );
}


