import { useState } from 'react';
import { useI18n } from '@/context/LanguageContext';

export type Promo = { code: string; percent: number };

const promos: Promo[] = [
  { code: 'WELCOME10', percent: 10 },
  { code: 'BOHO15', percent: 15 }
];

type PromoInputProps = Readonly<{ onApply: (p: Promo) => void; onRemove: () => void; active?: Promo | null }>;

export default function PromoInput({ onApply, onRemove, active }: PromoInputProps) {
  const { t } = useI18n();
  const [code, setCode] = useState('');
  function handleApply() {
    const match = promos.find(p => p.code.toLowerCase() === code.trim().toLowerCase());
    if (match) onApply(match);
    setCode('');
  }
  return (
    <div className="promo">
      {active ? (
        <div>
          <span>{t('promo_discount')}: {active.code} (-{active.percent}%)</span>
          <button className="link" onClick={onRemove}>{t('promo_remove')}</button>
        </div>
      ) : (
        <div>
          <label>{t('promo_label')} <input value={code} onChange={e => setCode(e.target.value)} placeholder="WELCOME10" /></label>
          <button className="btn btn-small" onClick={handleApply}>{t('promo_apply')}</button>
        </div>
      )}
    </div>
  );
}


