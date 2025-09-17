import { useEffect, useState } from 'react';
import { useI18n } from '@/context/LanguageContext';
import { 
  ConsentState, 
  getSavedConsent, 
  saveConsent, 
  updateConsent 
} from '../utils/consentUtils';

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

const STORAGE_KEY = 'cookie_consent_v1';

export default function CookieConsent() {
  const { t } = useI18n();
  const [consent, setConsent] = useState<ConsentState>('unknown');

  useEffect(() => {
    const saved = getSavedConsent(STORAGE_KEY);
    if (saved) {
      setConsent(saved);
      updateConsent(saved === 'accepted');
    }
  }, []);

  const accept = () => {
    saveConsent(STORAGE_KEY, 'accepted');
    setConsent('accepted');
    updateConsent(true);
  };

  const reject = () => {
    saveConsent(STORAGE_KEY, 'rejected');
    setConsent('rejected');
    updateConsent(false);
  };

  if (consent !== 'unknown') return null;

  return (
    <div style={{
      position: 'fixed', bottom: 16, left: 16, right: 16, zIndex: 50,
      background: 'var(--card)', border: '1px solid var(--border)', borderRadius: 12,
      padding: 16, display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap'
    }}>
      <span style={{ color: 'var(--text)' }}>
        {t('privacy')}: Nous utilisons des cookies pour mesurer l'audience et améliorer le site.
      </span>
      <div style={{ marginLeft: 'auto', display: 'flex', gap: 8 }}>
        <button className="btn" onClick={accept}>Accepter</button>
        <button className="btn btn-secondary" onClick={reject}>Refuser</button>
      </div>
    </div>
  );
}


