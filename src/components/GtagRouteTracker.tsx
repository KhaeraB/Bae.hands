import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

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
    if (!window.gtag) return;

    const pagePath = location.pathname + location.search + location.hash;
    // GA4: renvoyer une config avec page_path pour chaque vue
    window.gtag('config', measurementId, {
      page_path: pagePath
    });
  }, [location.pathname, location.search, location.hash, measurementId]);

  return null;
}


