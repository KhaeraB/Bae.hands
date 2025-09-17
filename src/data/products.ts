import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'br-aurora',
    name: 'Bracelet Aurora',
    description: "Bracelet fin en argent 925, perles nacrées.",
    priceEur: 39,
    stock: 12,
    category: 'bracelets',
    imageUrl: 'https://picsum.photos/seed/bracelet-aurora/600/400'
  },
  {
    id: 'br-solstice',
    name: 'Bracelet Solstice',
    description: "Cuir végan tressé, fermoir acier inoxydable.",
    priceEur: 45,
    stock: 8,
    category: 'bracelets',
    imageUrl: 'https://picsum.photos/seed/bracelet-solstice/600/400'
  },
  {
    id: 'bo-lune',
    name: 'Boucles Lune',
    description: "Créoles dorées à l'or fin, pendentifs lune.",
    priceEur: 29,
    stock: 20,
    category: 'boucles-oreilles',
    imageUrl: 'https://picsum.photos/seed/boucles-lune/600/400'
  },
  {
    id: 'bo-etoile',
    name: 'Boucles Étoile',
    description: "Puces délicates en argent, zircons.",
    priceEur: 25,
    stock: 25,
    category: 'boucles-oreilles',
    imageUrl: 'https://picsum.photos/seed/boucles-etoile/600/400'
  },
  {
    id: 'co-iris',
    name: 'Collier Iris',
    description: "Chaîne dorée, pendentif pierre naturelle.",
    priceEur: 59,
    stock: 6,
    category: 'colliers',
    imageUrl: 'https://picsum.photos/seed/collier-iris/600/400'
  },
  {
    id: 'co-eden',
    name: 'Collier Eden',
    description: "Argent 925, pendentif feuille ciselée.",
    priceEur: 69,
    stock: 4,
    category: 'colliers',
    imageUrl: 'https://picsum.photos/seed/collier-eden/600/400'
  }
];

export function getProductById(id: string) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string) {
  return products.filter(p => p.category === category);
}


