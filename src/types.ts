export type CategorySlug = 'bracelets' | 'boucles-oreilles' | 'colliers';

export interface Product {
  id: string;
  name: string;
  description: string;
  priceEur: number;
  stock: number;
  category: CategorySlug;
  imageUrl: string;
}

export interface CartItem {
  productId: string;
  quantity: number;
}


