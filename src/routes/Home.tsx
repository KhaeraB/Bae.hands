import CategoryNav from '@/components/CategoryNav';
import ProductCard from '@/components/ProductCard';
import { products } from '@/data/products';
import { useI18n } from '@/context/LanguageContext';

export default function Home() {
  const { t } = useI18n();
  return (
    <div className="container">
      <section className="hero">
        <div className="hero-text">
          <h1>{t('home_hero_title')}</h1>
          <p>{t('home_hero_sub')}</p>
        </div>
        <img className="hero-img" src="https://picsum.photos/seed/hero-jewelry/1200/500" alt="Bijoux" />
      </section>

      <section>
        <h2>{t('home_univers')}</h2>
        <CategoryNav />
      </section>

      <section>
        <h2>{t('home_featured')}</h2>
        <div className="grid">
          {products.slice(0, 6).map(p => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      <section className="about">
        <h2>{t('home_about_title')}</h2>
        <p>{t('home_about_txt')}</p>
      </section>
    </div>
  );
}

