import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { buildTrackingContext } from '@/utils/tracking';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

type GtagRouteTrackerProps = Readonly<{ measurementId: string }>;

export default function GtagRouteTracker({ measurementId }: GtagRouteTrackerProps) {
  const location = useLocation();

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const context = buildTrackingContext();

    const pagePath = location.pathname + location.search + location.hash;
    if (window.gtag) {
      // GA4: renvoyer une config avec page_path pour chaque vue
      window.gtag('config', measurementId, {
        page_path: pagePath
      });
    }
    if (window.dataLayer) {
      window.dataLayer.push({ event: 'page_view', ...context } as any);
    }
  }, [location.pathname, location.search, location.hash, measurementId]);

  return null;
}


