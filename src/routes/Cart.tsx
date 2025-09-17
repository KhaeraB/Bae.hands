import { Link } from 'react-router-dom';
import { useCart } from '@/context/CartContext';
import { getProductById } from '@/data/products';
import { useI18n } from '@/context/LanguageContext';

export default function Cart() {
  const { items, updateQuantity, removeItem, totals } = useCart();
  const { t } = useI18n();
  return (
    <div className="container">
      <h1>{t('cart_title')}</h1>
      {items.length === 0 ? (
        <p>{t('cart_empty')} <Link to="/">{t('cart_discover')}</Link></p>
      ) : (
        <>
          <div className="cart-list">
            {items.map(i => {
              const product = getProductById(i.productId)!;
              return (
                <div key={i.productId} className="cart-item">
                  <img src={product.imageUrl} alt={product.name} />
                  <div className="cart-item-info">
                    <h3>{product.name}</h3>
                    <p>{product.priceEur.toFixed(2)} €</p>
                    <div className="cart-controls">
                      <input type="number" min={1} max={5} value={i.quantity} onChange={e => updateQuantity(i.productId, Number(e.target.value))} />
                      <button className="link" onClick={() => removeItem(i.productId)}>Retirer</button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
          <aside className="cart-summary">
            <p>{t('cart_subtotal')}: {totals.subtotal.toFixed(2)} €</p>
            <p>{t('cart_shipping')}: {totals.shipping === 0 ? t('cart_shipping_free') : `${totals.shipping.toFixed(2)} €`}</p>
            <p>{t('cart_vat')}: {totals.vat.toFixed(2)} €</p>
            <p className="grand-total">{t('cart_total')}: {totals.total.toFixed(2)} €</p>
            <Link className="btn" to="/checkout">{t('cart_checkout')}</Link>
          </aside>
        </>
      )}
    </div>
  );
}

