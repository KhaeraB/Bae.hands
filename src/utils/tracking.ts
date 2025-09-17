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


