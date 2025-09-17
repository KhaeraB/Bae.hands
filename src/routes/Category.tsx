import { useMemo, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getProductsByCategory } from '@/data/products';
import ProductCard from '@/components/ProductCard';
import { useI18n } from '@/context/LanguageContext';

export default function Category() {
  const { t } = useI18n();
  const { slug } = useParams<{ slug: string }>();
  const itemsAll = slug ? getProductsByCategory(slug) : [];
  const [min, setMin] = useState('');
  const [max, setMax] = useState('');
  const [sort, setSort] = useState('pop');
  const filtered = useMemo(() => {
    const minVal = min ? Number(min) : -Infinity;
    const maxVal = max ? Number(max) : Infinity;
    let arr = itemsAll.filter(p => p.priceEur >= minVal && p.priceEur <= maxVal);
    if (sort === 'price-asc') arr.sort((a, b) => a.priceEur - b.priceEur);
    if (sort === 'price-desc') arr.sort((a, b) => b.priceEur - a.priceEur);
    if (sort === 'name') arr.sort((a, b) => a.name.localeCompare(b.name));
    return arr;
  }, [itemsAll, min, max, sort]);

  const title = slug === 'bracelets' ? t('category_title_bracelets') : slug === 'boucles-oreilles' ? t('category_title_boucles') : t('category_title_colliers');
  return (
    <div className="container">
      <h1>{title}</h1>
      <div className="filters">
        <strong>{t('filters_title')}</strong>
        <label>{t('filters_min')} <input value={min} onChange={e => setMin(e.target.value)} inputMode="numeric" /></label>
        <label>{t('filters_max')} <input value={max} onChange={e => setMax(e.target.value)} inputMode="numeric" /></label>
        <label>{t('sort_label')} 
          <select value={sort} onChange={e => setSort(e.target.value)}>
            <option value="pop">{t('sort_pop')}</option>
            <option value="price-asc">{t('sort_price_asc')}</option>
            <option value="price-desc">{t('sort_price_desc')}</option>
            <option value="name">{t('sort_name')}</option>
          </select>
        </label>
      </div>
      <div className="grid">
        {filtered.map(p => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </div>
  );
}

