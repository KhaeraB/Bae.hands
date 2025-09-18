export type DeviceType = 'mobile' | 'tablet' | 'desktop';

export const getDeviceType = (): DeviceType => {
  const width = typeof window !== 'undefined' ? window.innerWidth : 1024;
  if (width < 640) return 'mobile';
  if (width < 1024) return 'tablet';
  return 'desktop';
};

export const getBrowserName = (): string => {
  const nav = typeof navigator !== 'undefined' ? navigator : ({} as Navigator);
  // Use UA-CH when available
  // @ts-expect-error userAgentData may not exist in TS lib
  const uaData = nav.userAgentData as { brands?: { brand: string; version: string }[] } | undefined;
  if (uaData?.brands && uaData.brands.length > 0) {
    const brand = uaData.brands.find(b => /Chrom|Firefox|Safari|Edge|Opera/i.test(b.brand)) || uaData.brands[0];
    return brand.brand;
  }
  const ua = (nav.userAgent || '').toLowerCase();
  if (ua.includes('edg/')) return 'Edge';
  if (ua.includes('opr/') || ua.includes('opera')) return 'Opera';
  if (ua.includes('chrome/')) return 'Chrome';
  if (ua.includes('safari/') && !ua.includes('chrome/')) return 'Safari';
  if (ua.includes('firefox/')) return 'Firefox';
  return 'Unknown';
};

export const getOS = (): string => {
  const ua = typeof navigator !== 'undefined' ? navigator.userAgent : '';
  if (/Windows/i.test(ua)) return 'Windows';
  if (/Mac OS X/i.test(ua)) return 'macOS';
  if (/Android/i.test(ua)) return 'Android';
  if (/iPhone|iPad|iPod/i.test(ua)) return 'iOS';
  if (/Linux/i.test(ua)) return 'Linux';
  return 'Unknown';
};

export const parseUtm = (url: string) => {
  try {
    const u = new URL(url);
    const p = (name: string) => u.searchParams.get(name) || undefined;
    return {
      utm_source: p('utm_source'),
      utm_medium: p('utm_medium'),
      utm_campaign: p('utm_campaign'),
      utm_content: p('utm_content'),
      utm_term: p('utm_term')
    } as Record<string, string | undefined>;
  } catch {
    return {} as Record<string, string | undefined>;
  }
};

export const buildTrackingContext = () => {
  const page_path = typeof window !== 'undefined' ? location.pathname + location.search + location.hash : undefined;
  const referrer = typeof document !== 'undefined' ? document.referrer || undefined : undefined;
  const lang = typeof navigator !== 'undefined' ? navigator.language : undefined;
  return {
    page_path,
    referrer,
    user_lang: lang,
    device_type: getDeviceType(),
    browser: getBrowserName(),
    os: getOS(),
    ...parseUtm(typeof window !== 'undefined' ? location.href : '')
  } as Record<string, string | undefined>;
};

// ---- E-commerce helpers respecting consent ----
import { getProductById } from '@/data/products';
import type { CartItem, Product } from '@/types';

const CONSENT_STORAGE_KEY = 'cookie_consent_v1';
const CURRENCY = 'EUR';

const hasAnalyticsConsent = (): boolean => {
  try {
    const saved = typeof window !== 'undefined' ? window.localStorage.getItem(CONSENT_STORAGE_KEY) : null;
    return saved === 'accepted';
  } catch {
    return false;
  }
};

export const sendEvent = (eventName: string, params?: Record<string, unknown>): void => {
  if (typeof window === 'undefined') return;
  if (!hasAnalyticsConsent()) return;
  if (window.gtag) {
    window.gtag('event', eventName as any, params as any);
  }
  if (window.dataLayer) {
    (window.dataLayer as any[]).push({ event: eventName, ...(params || {}) });
  }
};

const productToGaItem = (product: Product, quantity: number) => ({
  item_id: product.id,
  item_name: product.name,
  item_category: product.category,
  price: product.priceEur,
  quantity
});

const cartItemsToGaItems = (items: CartItem[]) => {
  return items
    .map(i => {
      const p = getProductById(i.productId);
      if (!p) return undefined;
      return productToGaItem(p, i.quantity);
    })
    .filter(Boolean) as Array<ReturnType<typeof productToGaItem>>;
};

export const trackViewItem = (product: Product): void => {
  sendEvent('view_item', {
    currency: CURRENCY,
    value: product.priceEur,
    items: [productToGaItem(product, 1)]
  });
};

export const trackAddToCart = (product: Product, quantity: number): void => {
  sendEvent('add_to_cart', {
    currency: CURRENCY,
    value: product.priceEur * quantity,
    items: [productToGaItem(product, quantity)]
  });
};

export const trackViewCart = (items: CartItem[], cartValue: number): void => {
  const gaItems = cartItemsToGaItems(items);
  sendEvent('view_cart', {
    currency: CURRENCY,
    value: cartValue,
    items: gaItems
  });
};

export const trackBeginCheckout = (items: CartItem[], cartValue: number): void => {
  const gaItems = cartItemsToGaItems(items);
  sendEvent('begin_checkout', {
    currency: CURRENCY,
    value: cartValue,
    items: gaItems
  });
};

export const trackPurchase = (
  items: CartItem[],
  totals: { subtotal: number; shipping: number; vat: number; total: number },
  transactionId: string
): void => {
  const gaItems = cartItemsToGaItems(items);
  sendEvent('purchase', {
    currency: CURRENCY,
    transaction_id: transactionId,
    value: totals.total,
    shipping: totals.shipping,
    tax: totals.vat,
    items: gaItems
  });
};


