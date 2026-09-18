export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'serums' | 'creams' | 'cleansers' | 'sunscreen' | 'lip-care' | 'face-oil' | 'masks' | 'toners' | 'elixirs';
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  badge?: string;
  size: string;
  packaging?: string;
  isSpecialOffer?: boolean;
  offerDiscountText?: string;
  description: string;
  keyBotanicals: string[];
  ritual: string;
  skinType: string;
  inStock: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CustomerReview {
  id: string;
  author: string;
  location: string;
  rating: number;
  productName: string;
  headline: string;
  comment: string;
  skinType: string;
  verified: boolean;
  date: string;
}

export interface BotanicalIngredient {
  name: string;
  scientificName: string;
  benefit: string;
  origin: string;
  icon: string;
  description: string;
}
