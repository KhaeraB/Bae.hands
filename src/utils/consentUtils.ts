/**
 * Utilitaires pour la gestion du consentement des cookies
 */

export type ConsentState = 'accepted' | 'rejected' | 'unknown';

export interface ConsentParams {
  ad_storage: 'granted' | 'denied';
  analytics_storage: 'granted' | 'denied';
  ad_user_data: 'granted' | 'denied';
  ad_personalization: 'granted' | 'denied';
}

/**
 * Crée les paramètres de consentement basés sur l'état d'acceptation
 * @param isAccepted - Indique si le consentement est accepté
 * @returns Les paramètres de consentement
 */
export const createConsentParams = (isAccepted: boolean): ConsentParams => ({
  ad_storage: isAccepted ? 'granted' : 'denied',
  analytics_storage: isAccepted ? 'granted' : 'denied',
  ad_user_data: isAccepted ? 'granted' : 'denied',
  ad_personalization: isAccepted ? 'granted' : 'denied'
});

/**
 * Met à jour le consentement dans Google Analytics et DataLayer
 * @param isAccepted - Indique si le consentement est accepté
 */
export const updateConsent = (isAccepted: boolean): void => {
  const consentParams = createConsentParams(isAccepted);
  
  // Mise à jour via gtag si disponible
  if (window.gtag) {
    window.gtag('consent', 'update', consentParams);
  }
  
  // Mise à jour via dataLayer si disponible
  if (window.dataLayer) {
    window.dataLayer.push({
      consent: 'update',
      ...consentParams
    } as any);
  }
};

/**
 * Récupère l'état de consentement sauvegardé dans le localStorage
 * @param storageKey - Clé de stockage pour le consentement
 * @returns L'état de consentement ou null si non trouvé
 */
export const getSavedConsent = (storageKey: string): ConsentState | null => {
  const saved = window.localStorage.getItem(storageKey) as ConsentState | null;
  return saved === 'accepted' || saved === 'rejected' ? saved : null;
};

/**
 * Sauvegarde l'état de consentement dans le localStorage
 * @param storageKey - Clé de stockage pour le consentement
 * @param consent - État de consentement à sauvegarder
 */
export const saveConsent = (storageKey: string, consent: ConsentState): void => {
  window.localStorage.setItem(storageKey, consent);
};
