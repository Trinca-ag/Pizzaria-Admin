// src/types/category.ts

export interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
  order: number; // Para ordenação na exibição
  createdAt: Date;
  updatedAt: Date;
  productsCount?: number; // Quantidade de produtos nesta categoria
}

export interface CategoryFormData {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
  order?: number;
}

export interface CreateCategoryData {
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive?: boolean;
  order?: number;
}

export interface UpdateCategoryData extends Partial<CreateCategoryData> {
  id: string;
}

export interface CategoryFilters {
  name?: string;
  isActive?: boolean;
  orderBy?: 'name' | 'createdAt' | 'order' | 'productsCount';
  orderDirection?: 'asc' | 'desc';
}

export interface CategoryStats {
  total: number;
  active: number;
  inactive: number;
  mostUsed: Category | null;
  leastUsed: Category | null;
}

// Cores predefinidas para categorias
export const categoryColors = [
  '#FF6B35', // Laranja
  '#F56565', // Vermelho
  '#48BB78', // Verde
  '#4299E1', // Azul
  '#9F7AEA', // Roxo
  '#ED8936', // Amarelo
  '#38B2AC', // Teal
  '#EC4899', // Rosa
  '#10B981', // Esmeralda
  '#8B5CF6', // Violeta
  '#F59E0B', // Âmbar
  '#EF4444', // Vermelho brilhante
] as const;

// Ícones predefinidos para categorias
export const categoryIcons = [
  '🍕', // Pizza
  '🍔', // Hambúrguer
  '🥤', // Bebida
  '🍰', // Sobremesa
  '🥗', // Salada
  '🍝', // Massa
  '🍗', // Frango
  '🌮', // Taco
  '🍟', // Batata frita
  '🍻', // Cerveja
  '☕', // Café
  '🧊', // Gelado
  '🔥', // Quente
  '🌶️', // Picante
  '🧀', // Queijo
  '🥩', // Carne
  '🐟', // Peixe
  '🥬', // Vegetariano
  '🌿', // Vegano
  '⭐', // Especial
] as const;

export type CategoryColor = typeof categoryColors[number];
export type CategoryIcon = typeof categoryIcons[number];