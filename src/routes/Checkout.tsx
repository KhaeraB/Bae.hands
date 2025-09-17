import { FormEvent, useMemo, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useI18n } from '@/context/LanguageContext';
import PromoInput, { Promo } from '@/components/PromoInput';

function luhnValid(cardNumber: string): boolean {
  const digits = cardNumber.replace(/\s+/g, '');
  if (!/^\d{13,19}$/.test(digits)) return false;
  let sum = 0;
  let dbl = false;
  for (let i = digits.length - 1; i >= 0; i--) {
    let d = Number(digits[i]);
    if (dbl) {
      d *= 2;
      if (d > 9) d -= 9;
    }
    sum += d;
    dbl = !dbl;
  }
  return sum % 10 === 0;
}

function expiryValid(mmYY: string): boolean {
  const m = mmYY.match(/^(0[1-9]|1[0-2])\/(\d{2})$/);
  if (!m) return false;
  const month = Number(m[1]);
  const year = 2000 + Number(m[2]);
  const lastDay = new Date(year, month, 0);
  const now = new Date();
  return lastDay >= new Date(now.getFullYear(), now.getMonth(), 1);
}

export default function Checkout() {
  const { items, totals, clearCart } = useCart();
  const { t } = useI18n();
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const maskedTotal = useMemo(() => totals.total.toFixed(2), [totals.total]);
  const [promo, setPromo] = useState<Promo | null>(null);
  const discount = promo ? (totals.subtotal * promo.percent) / 100 : 0;
  const totalAfterDiscount = (totals.subtotal - discount) + totals.shipping + totals.vat;
  const maskedTotalAfterDiscount = totalAfterDiscount.toFixed(2);

  function validate(form: HTMLFormElement): string[] {
    const errs: string[] = [];
    const fullName = (form.elements.namedItem('fullName') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const address = (form.elements.namedItem('address') as HTMLInputElement).value.trim();
    const city = (form.elements.namedItem('city') as HTMLInputElement).value.trim();
    const zip = (form.elements.namedItem('zip') as HTMLInputElement).value.trim();
    if (fullName.length < 2) errs.push('Nom complet invalide');
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.push('Email invalide');
    if (address.length < 5) errs.push('Adresse invalide');
    if (city.length < 2) errs.push('Ville invalide');
    if (!/^\d{4,6}$/.test(zip)) errs.push('Code postal invalide');
    if (items.length === 0) errs.push('Panier vide');
    const card = (form.elements.namedItem('card') as HTMLInputElement).value.replace(/\s+/g, '');
    const exp = (form.elements.namedItem('expiry') as HTMLInputElement).value.trim();
    const cvc = (form.elements.namedItem('cvc') as HTMLInputElement).value.trim();
    if (!luhnValid(card)) errs.push('Carte invalide');
    if (!expiryValid(exp)) errs.push("Date d'expiration invalide");
    if (!/^\d{3,4}$/.test(cvc)) errs.push('CVC invalide');
    return errs;
  }

  function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const v = validate(form);
    setErrors(v);
    if (v.length === 0) {
      // Paiement simulé
      setTimeout(() => {
        setSubmitted(true);
        clearCart();
      }, 800);
    }
  }

  if (submitted) {
    return (
      <div className="container">
        <h1>{t('confirmation_title')}</h1>
        <p>{t('confirmation_msg')}</p>
      </div>
    );
  }

  return (
    <div className="container checkout">
      <h1>{t('checkout_title')}</h1>
      <div className="checkout-grid">
        <form onSubmit={onSubmit} className="checkout-form">
          <label>{t('checkout_name')}<input name="fullName" required /></label>
          <label>{t('checkout_email')}<input type="email" name="email" required /></label>
          <label>{t('checkout_address')}<input name="address" required /></label>
          <div className="row">
            <label>{t('checkout_city')}<input name="city" required /></label>
            <label>{t('checkout_zip')}<input name="zip" required /></label>
          </div>
          <h3>Paiement</h3>
          <label>Numéro de carte<input name="card" placeholder="4242 4242 4242 4242" inputMode="numeric" /></label>
          <div className="row">
            <label>Expiration (MM/AA)<input name="expiry" placeholder="12/28" /></label>
            <label>CVC<input name="cvc" placeholder="123" inputMode="numeric" /></label>
          </div>
          {errors.length > 0 && (
            <ul className="errors">
              {errors.map((e, idx) => <li key={idx}>{e}</li>)}
            </ul>
          )}
          <PromoInput active={promo} onApply={(p) => setPromo(p)} onRemove={() => setPromo(null)} />
          <button className="btn" type="submit">{t('checkout_pay')} {maskedTotalAfterDiscount} €</button>
        </form>
        <aside className="checkout-summary">
          <p>{t('cart_subtotal')}: {totals.subtotal.toFixed(2)} €</p>
          {promo && <p>{t('promo_discount')}: -{discount.toFixed(2)} €</p>}
          <p>{t('cart_shipping')}: {totals.shipping === 0 ? t('cart_shipping_free') : `${totals.shipping.toFixed(2)} €`}</p>
          <p>{t('cart_vat')}: {totals.vat.toFixed(2)} €</p>
          <p className="grand-total">{t('cart_total')}: {maskedTotalAfterDiscount} €</p>
        </aside>
      </div>
    </div>
  );
}

