import { Product } from '@/types';

export const products: Product[] = [
  {
    id: 'br-aurora',
    name: 'Bracelet Aurora',
    description: "Bracelet fin en argent 925, perles nacrées.",
    priceEur: 39,
    stock: 12,
    category: 'bracelets',
    imageUrl: 'https://source.unsplash.com/600x400/?jewelry,bracelet,silver'
  },
  {
    id: 'br-solstice',
    name: 'Bracelet Solstice',
    description: "Cuir végan tressé, fermoir acier inoxydable.",
    priceEur: 45,
    stock: 8,
    category: 'bracelets',
    imageUrl: 'https://source.unsplash.com/600x400/?jewelry,bracelet,leather'
  },
  {
    id: 'bo-lune',
    name: 'Boucles Lune',
    description: "Créoles dorées à l'or fin, pendentifs lune.",
    priceEur: 29,
    stock: 20,
    category: 'boucles-oreilles',
    imageUrl: 'https://source.unsplash.com/600x400/?jewelry,earrings,gold'
  },
  {
    id: 'bo-etoile',
    name: 'Boucles Étoile',
    description: "Puces délicates en argent, zircons.",
    priceEur: 25,
    stock: 25,
    category: 'boucles-oreilles',
    imageUrl: 'https://source.unsplash.com/600x400/?jewelry,earrings,silver'
  },
  {
    id: 'co-iris',
    name: 'Collier Iris',
    description: "Chaîne dorée, pendentif pierre naturelle.",
    priceEur: 59,
    stock: 6,
    category: 'colliers',
    imageUrl: 'https://source.unsplash.com/600x400/?jewelry,necklace,pendant,gold'
  },
  {
    id: 'co-eden',
    name: 'Collier Eden',
    description: "Argent 925, pendentif feuille ciselée.",
    priceEur: 69,
    stock: 4,
    category: 'colliers',
    imageUrl: 'https://source.unsplash.com/600x400/?jewelry,necklace,pendant,silver'
  }
];

export function getProductById(id: string) {
  return products.find(p => p.id === id);
}

export function getProductsByCategory(category: string) {
  return products.filter(p => p.category === category);
}


