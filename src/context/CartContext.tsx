import React, { createContext, useContext, useMemo, useReducer } from 'react';
import type { CartItem, Product } from '@/types';
import { getProductById } from '@/data/products';

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: 'ADD'; productId: string; quantity: number }
  | { type: 'REMOVE'; productId: string }
  | { type: 'UPDATE_QTY'; productId: string; quantity: number }
  | { type: 'CLEAR' };

const MAX_QTY_PER_ITEM = 5;
const SHIPPING_THRESHOLD_EUR = 100;
const SHIPPING_FEE_EUR = 5.9;
const VAT_RATE = 0.2; // 20%

function clampQuantity(product: Product | undefined, desired: number): number {
  if (!product) return 0;
  const byStock = Math.max(0, Math.min(desired, product.stock));
  return Math.min(byStock, MAX_QTY_PER_ITEM);
}

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD': {
      const product = getProductById(action.productId);
      const quantity = clampQuantity(product, action.quantity);
      if (!product || quantity === 0) return state;
      const existing = state.items.find(i => i.productId === action.productId);
      if (existing) {
        const newQty = clampQuantity(product, existing.quantity + quantity);
        return {
          items: state.items.map(i =>
            i.productId === action.productId ? { ...i, quantity: newQty } : i
          )
        };
      }
      return { items: [...state.items, { productId: action.productId, quantity }] };
    }
    case 'REMOVE':
      return { items: state.items.filter(i => i.productId !== action.productId) };
    case 'UPDATE_QTY': {
      const product = getProductById(action.productId);
      const quantity = clampQuantity(product, action.quantity);
      if (quantity === 0) {
        return { items: state.items.filter(i => i.productId !== action.productId) };
      }
      return {
        items: state.items.map(i =>
          i.productId === action.productId ? { ...i, quantity } : i
        )
      };
    }
    case 'CLEAR':
      return { items: [] };
    default:
      return state;
  }
}

interface CartContextValue extends CartState {
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totals: {
    subtotal: number;
    shipping: number;
    vat: number;
    total: number;
  };
}

const CartContext = createContext<CartContextValue | undefined>(undefined);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  const totals = useMemo(() => {
    const subtotal = state.items.reduce((sum, item) => {
      const product = getProductById(item.productId);
      if (!product) return sum;
      return sum + product.priceEur * item.quantity;
    }, 0);
    const shipping = subtotal >= SHIPPING_THRESHOLD_EUR || subtotal === 0 ? 0 : SHIPPING_FEE_EUR;
    const vat = (subtotal + shipping) * VAT_RATE;
    const total = subtotal + shipping + vat;
    return { subtotal, shipping, vat, total };
  }, [state.items]);

  const value: CartContextValue = {
    items: state.items,
    addItem: (productId, quantity = 1) => dispatch({ type: 'ADD', productId, quantity }),
    removeItem: productId => dispatch({ type: 'REMOVE', productId }),
    updateQuantity: (productId, quantity) => dispatch({ type: 'UPDATE_QTY', productId, quantity }),
    clearCart: () => dispatch({ type: 'CLEAR' }),
    totals
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}


