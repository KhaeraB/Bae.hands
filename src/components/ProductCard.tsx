import { Link } from 'react-router-dom';
import type { Product } from '@/types';
import { useCart } from '@/context/CartContext';
import { useI18n } from '@/context/LanguageContext';

type ProductCardProps = Readonly<{ product: Product }>;

export default function ProductCard({ product }: ProductCardProps) {
  const { addItem } = useCart();
  const { t, locale } = useI18n();
  const priceLocale = locale === 'fr' ? 'fr-FR' : 'en-IE';
  const formattedPrice = new Intl.NumberFormat(priceLocale, { 
    style: 'currency', 
    currency: 'EUR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(product.priceEur);
 
  return (
    <div className="product-card">
      <Link to={`/produit/${product.id}`} className="product-thumb">
        <img src={product.imageUrl} alt={`${t('product_view')} - ${product.name}`} loading="lazy" />
      </Link>
      <div className="product-info">
        <h3>{product.name}</h3>
        <p className="price">{formattedPrice}</p>
       
        <div className="actions">
          <Link to={`/produit/${product.id}`} className="btn btn-secondary">{t('product_view')}</Link>
          <button className="btn" disabled={product.stock === 0} onClick={() => addItem(product.id, 1)}>
            {product.stock === 0 ? t('product_oos') : t('product_add')}
          </button>
        </div>
      </div>
    </div>
  );
}


