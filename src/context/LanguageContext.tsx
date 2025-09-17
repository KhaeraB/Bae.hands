import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';

type Locale = 'fr' | 'en';

type Dict = Record<string, string>;

const fr: Dict = {
  brand: 'bae.bohemian chic',
  nav_univers: 'Univers',
  nav_bracelets: 'Bracelets',
  nav_boucles: "Boucles d'oreilles",
  nav_colliers: 'Colliers',
  nav_cart: 'Panier',
  toggle_theme_light: 'Light',
  toggle_theme_dark: 'Dark',
  home_hero_title: 'Bijoux Boutique',
  home_hero_sub: 'Créations artisanales, matériaux durables, élégance intemporelle.',
  home_univers: 'Nos univers',
  home_featured: 'Produits en vedette',
  home_about_title: 'Notre maison',
  home_about_txt: "Nous confectionnons des bijoux avec soin, en petites séries, en privilégiant l'approvisionnement responsable et le savoir-faire local.",
  category_title_bracelets: 'Bracelets',
  category_title_boucles: "Boucles d'oreilles",
  category_title_colliers: 'Colliers',
  filters_title: 'Filtres et tri',
  filters_min: 'Prix min',
  filters_max: 'Prix max',
  sort_label: 'Trier par',
  sort_pop: 'Pertinence',
  sort_price_asc: 'Prix croissant',
  sort_price_desc: 'Prix décroissant',
  sort_name: 'Nom',
  product_view: 'Voir',
  product_add: 'Ajouter',
  product_oos: 'Rupture',
  product_qty: 'Quantité',
  product_in_stock: 'En stock',
  cart_title: 'Panier',
  cart_empty: 'Votre panier est vide.',
  cart_discover: 'Découvrir nos bijoux',
  cart_subtotal: 'Sous-total',
  cart_shipping: 'Livraison',
  cart_shipping_free: 'Offerte',
  cart_vat: 'TVA (20%)',
  cart_total: 'Total',
  cart_checkout: 'Valider la commande',
  promo_label: 'Code promo',
  promo_apply: 'Appliquer',
  promo_remove: 'Retirer',
  promo_discount: 'Remise',
  checkout_title: 'Validation',
  checkout_name: 'Nom complet',
  checkout_email: 'Email',
  checkout_address: 'Adresse',
  checkout_city: 'Ville',
  checkout_zip: 'Code postal',
  checkout_pay: 'Payer',
  confirmation_title: 'Merci pour votre commande',
  confirmation_msg: 'Une confirmation vous a été envoyée par email.',
  contact: 'Contact',
  legal: 'Mentions légales',
  privacy: 'RGPD',
  lang: 'Langue'
};

const en: Dict = {
  brand: 'bae.bohemian chic',
  nav_univers: 'World',
  nav_bracelets: 'Bracelets',
  nav_boucles: 'Earrings',
  nav_colliers: 'Necklaces',
  nav_cart: 'Cart',
  toggle_theme_light: 'Light',
  toggle_theme_dark: 'Dark',
  home_hero_title: 'Jewelry Boutique',
  home_hero_sub: 'Artisanal creations, sustainable materials, timeless elegance.',
  home_univers: 'Our worlds',
  home_featured: 'Featured products',
  home_about_title: 'Our house',
  home_about_txt: 'We craft jewelry in small batches with responsible sourcing and local know-how.',
  category_title_bracelets: 'Bracelets',
  category_title_boucles: 'Earrings',
  category_title_colliers: 'Necklaces',
  filters_title: 'Filters & sorting',
  filters_min: 'Min price',
  filters_max: 'Max price',
  sort_label: 'Sort by',
  sort_pop: 'Relevance',
  sort_price_asc: 'Price ↑',
  sort_price_desc: 'Price ↓',
  sort_name: 'Name',
  product_view: 'View',
  product_add: 'Add',
  product_oos: 'Out of stock',
  product_qty: 'Quantity',
  product_in_stock: 'In stock',
  cart_title: 'Cart',
  cart_empty: 'Your cart is empty.',
  cart_discover: 'Discover our jewelry',
  cart_subtotal: 'Subtotal',
  cart_shipping: 'Shipping',
  cart_shipping_free: 'Free',
  cart_vat: 'VAT (20%)',
  cart_total: 'Total',
  cart_checkout: 'Checkout',
  promo_label: 'Promo code',
  promo_apply: 'Apply',
  promo_remove: 'Remove',
  promo_discount: 'Discount',
  checkout_title: 'Checkout',
  checkout_name: 'Full name',
  checkout_email: 'Email',
  checkout_address: 'Address',
  checkout_city: 'City',
  checkout_zip: 'ZIP',
  checkout_pay: 'Pay',
  confirmation_title: 'Thanks for your order',
  confirmation_msg: 'A confirmation email has been sent to you.',
  contact: 'Contact',
  legal: 'Legal notice',
  privacy: 'Privacy',
  lang: 'Language'
};

const LanguageContext = createContext<{ locale: Locale; setLocale: (l: Locale) => void; t: (k: string) => string } | undefined>(undefined);

export function LanguageProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [locale, setLocale] = useState<Locale>('fr');
  useEffect(() => {
    const saved = window.localStorage.getItem('locale');
    if (saved === 'fr' || saved === 'en') setLocale(saved);
  }, []);
  useEffect(() => { window.localStorage.setItem('locale', locale); }, [locale]);

  const t = useMemo(() => {
    const dict = locale === 'fr' ? fr : en;
    return (k: string) => dict[k] ?? k;
  }, [locale]);

  const value = useMemo(() => ({ locale, setLocale, t }), [locale, t]);
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useI18n() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error('useI18n must be used within LanguageProvider');
  return ctx;
}


