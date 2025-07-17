// src/types/product.ts

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: ProductImage[];
  isActive: boolean;
  preparationTime: number; // em minutos
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  variations?: ProductVariation[];
  tags?: string[];
  order: number; // Para ordenação na exibição
  createdAt: Date;
  updatedAt: Date;
  
  // Estatísticas (calculadas)
  salesCount?: number;
  rating?: number;
  reviewsCount?: number;
}

export interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

export interface ProductVariation {
  id: string;
  name: string; // Ex: "Tamanho", "Borda"
  options: VariationOption[];
  isRequired: boolean;
  maxSelections: number; // 0 = ilimitado
}

export interface VariationOption {
  id: string;
  name: string; // Ex: "Grande", "Catupiry"
  priceModifier: number; // Valor adicional (pode ser negativo)
  isAvailable: boolean;
}

export interface NutritionalInfo {
  calories: number;
  protein: number; // em gramas
  carbs: number; // em gramas
  fat: number; // em gramas
  fiber?: number; // em gramas
  sodium?: number; // em mg
  sugar?: number; // em gramas
}

export interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images: File[] | ProductImage[];
  isActive: boolean;
  preparationTime: number;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  variations?: ProductVariation[];
  tags?: string[];
}

export interface CreateProductData {
  name: string;
  description: string;
  price: number;
  categoryId: string;
  images?: File[];
  isActive?: boolean;
  preparationTime: number;
  ingredients?: string[];
  allergens?: string[];
  nutritionalInfo?: NutritionalInfo;
  variations?: Omit<ProductVariation, 'id'>[];
  tags?: string[];
  order?: number;
}

export interface UpdateProductData extends Partial<CreateProductData> {
  id: string;
}

export interface ProductFilters {
  name?: string;
  categoryId?: string;
  isActive?: boolean;
  priceMin?: number;
  priceMax?: number;
  tags?: string[];
  orderBy?: 'name' | 'price' | 'createdAt' | 'salesCount' | 'rating';
  orderDirection?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

export interface ProductStats {
  total: number;
  active: number;
  inactive: number;
  averagePrice: number;
  totalSales: number;
  mostSold: Product | null;
  leastSold: Product | null;
  topRated: Product | null;
  recentlyAdded: Product[];
}

// Alergênicos comuns
export const commonAllergens = [
  'Glúten',
  'Lactose',
  'Ovos',
  'Soja',
  'Amendoim',
  'Frutos do mar',
  'Peixes',
  'Nozes',
  'Gergelim',
  'Mostarda',
] as const;

// Tags predefinidas
export const productTags = [
  'Novo',
  'Popular',
  'Promoção',
  'Vegetariano',
  'Vegano',
  'Sem glúten',
  'Sem lactose',
  'Picante',
  'Doce',
  'Salgado',
  'Especial',
  'Tradicional',
  'Gourmet',
  'Família',
  'Individual',
  'Light',
  'Fitness',
  'Artesanal',
  'Orgânico',
  'Premium',
] as const;

export type ProductAllergen = typeof commonAllergens[number];
export type ProductTag = typeof productTags[number];

// Interface para busca avançada
export interface ProductSearchParams {
  query?: string;
  categoryId?: string;
  tags?: string[];
  priceRange?: [number, number];
  preparationTimeMax?: number;
  isActive?: boolean;
  hasImages?: boolean;
  hasVariations?: boolean;
  sortBy?: 'relevance' | 'price' | 'name' | 'popularity' | 'newest';
  page?: number;
  limit?: number;
}