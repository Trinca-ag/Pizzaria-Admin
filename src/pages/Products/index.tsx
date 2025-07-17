// src/pages/Products/index.tsx
import React, { useState, useEffect } from 'react';
import { Toaster } from 'react-hot-toast';
import { useNotifications } from '../../hooks/useNotifications';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import Input from '../../components/common/Input';
import ProductCard from '../../components/Products/ProductCard';
import ProductForm from '../../components/Products/ProductForm';
import CategoryForm from '../../components/Products/CategoryForm';
import {
  ProductsContainer,
  ProductsHeader,
  ProductsTitle,
  ProductsActions,
  FilterContainer,
  FilterGroup,
  ProductsGrid,
  StatsContainer,
  StatCard,
  EmptyState,
  LoadingContainer
} from './styles';

// Interfaces
interface ProductImage {
  id: string;
  url: string;
  alt: string;
  isPrimary: boolean;
  order: number;
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName?: string;
  images: ProductImage[];
  isActive: boolean;
  preparationTime: number;
  salesCount?: number;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

interface Category {
  id: string;
  name: string;
  description?: string;
  icon?: string;
  color?: string;
  isActive: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  productsCount?: number;
}

// Mock data temporário (depois virá do Firebase)
const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Pizza Margherita',
    description: 'Molho de tomate, mussarela e manjericão fresco',
    price: 32.90,
    categoryId: 'pizzas',
    categoryName: 'Pizzas Tradicionais',
    images: [{ id: '1', url: '/placeholder-pizza.jpg', alt: 'Pizza Margherita', isPrimary: true, order: 1 }],
    isActive: true,
    preparationTime: 25,
    salesCount: 45,
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 1
  },
  {
    id: '2',
    name: 'Pizza Pepperoni',
    description: 'Molho de tomate, mussarela e pepperoni',
    price: 38.90,
    categoryId: 'pizzas',
    categoryName: 'Pizzas Tradicionais',
    images: [{ id: '2', url: '/placeholder-pizza.jpg', alt: 'Pizza Pepperoni', isPrimary: true, order: 1 }],
    isActive: true,
    preparationTime: 25,
    salesCount: 52,
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 2
  },
  {
    id: '3',
    name: 'Coca-Cola 350ml',
    description: 'Refrigerante gelado',
    price: 5.50,
    categoryId: 'bebidas',
    categoryName: 'Bebidas',
    images: [{ id: '3', url: '/placeholder-drink.jpg', alt: 'Coca-Cola', isPrimary: true, order: 1 }],
    isActive: true,
    preparationTime: 2,
    salesCount: 85,
    createdAt: new Date(),
    updatedAt: new Date(),
    order: 3
  }
];

const mockCategories: Category[] = [
  { id: 'pizzas', name: 'Pizzas Tradicionais', description: 'Sabores clássicos', icon: '🍕', color: '#FF6B35', isActive: true, order: 1, createdAt: new Date(), updatedAt: new Date(), productsCount: 8 },
  { id: 'bebidas', name: 'Bebidas', description: 'Refrigerantes e sucos', icon: '🥤', color: '#4299E1', isActive: true, order: 2, createdAt: new Date(), updatedAt: new Date(), productsCount: 12 },
  { id: 'sobremesas', name: 'Sobremesas', description: 'Doces e sobremesas', icon: '🍰', color: '#48BB78', isActive: true, order: 3, createdAt: new Date(), updatedAt: new Date(), productsCount: 5 }
];

export const Products: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(mockProducts);
  const [categories, setCategories] = useState<Category[]>(mockCategories);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const { notifications } = useNotifications();

  // Filtrar produtos
  useEffect(() => {
    let filtered = products;

    // Filtro por busca
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por categoria
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.categoryId === selectedCategory);
    }

    // Filtro por status
    if (statusFilter !== 'all') {
      filtered = filtered.filter(product => 
        statusFilter === 'active' ? product.isActive : !product.isActive
      );
    }

    setFilteredProducts(filtered);
  }, [products, searchTerm, selectedCategory, statusFilter]);

  // Estatísticas
  const stats = {
    total: products.length,
    active: products.filter(p => p.isActive).length,
    inactive: products.filter(p => !p.isActive).length,
    categories: categories.length
  };

  const handleCreateProduct = () => {
    setEditingProduct(null);
    setIsProductModalOpen(true);
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setIsProductModalOpen(true);
  };

  const handleDeleteProduct = async (productId: string) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      try {
        setProducts(prev => prev.filter(p => p.id !== productId));
        notifications.success('Produto excluído com sucesso!');
      } catch (error) {
        notifications.error('Erro ao excluir produto');
      }
    }
  };

  const handleToggleProductStatus = async (productId: string) => {
    try {
      setProducts(prev => prev.map(p => 
        p.id === productId ? { ...p, isActive: !p.isActive } : p
      ));
      notifications.success('Status do produto atualizado!');
    } catch (error) {
      notifications.error('Erro ao atualizar status');
    }
  };

  const handleSaveProduct = async (productData: Partial<Product>) => {
    try {
      if (editingProduct) {
        // Editar produto existente
        setProducts(prev => prev.map(p => 
          p.id === editingProduct.id 
            ? { ...p, ...productData, updatedAt: new Date() }
            : p
        ));
        notifications.success('Produto atualizado com sucesso!');
      } else {
        // Criar novo produto
        const newProduct: Product = {
          id: Date.now().toString(),
          name: productData.name || '',
          description: productData.description || '',
          price: productData.price || 0,
          categoryId: productData.categoryId || '',
          categoryName: productData.categoryName || '',
          images: productData.images || [],
          isActive: productData.isActive ?? true,
          preparationTime: productData.preparationTime || 30,
          salesCount: 0,
          createdAt: new Date(),
          updatedAt: new Date(),
          order: products.length + 1
        };
        setProducts(prev => [...prev, newProduct]);
        notifications.success('Produto criado com sucesso!');
      }
      setIsProductModalOpen(false);
    } catch (error) {
      notifications.error('Erro ao salvar produto');
    }
  };

  const handleCreateCategory = () => {
    setEditingCategory(null);
    setIsCategoryModalOpen(true);
  };

  const handleSaveCategory = async (categoryData: Partial<Category>) => {
    try {
      if (editingCategory) {
        setCategories(prev => prev.map(c => 
          c.id === editingCategory.id 
            ? { ...c, ...categoryData, updatedAt: new Date() }
            : c
        ));
        notifications.success('Categoria atualizada com sucesso!');
      } else {
        const newCategory: Category = {
          id: Date.now().toString(),
          name: categoryData.name || '',
          description: categoryData.description,
          icon: categoryData.icon,
          color: categoryData.color,
          isActive: categoryData.isActive ?? true,
          order: categories.length + 1,
          productsCount: 0,
          createdAt: new Date(),
          updatedAt: new Date()
        };
        setCategories(prev => [...prev, newCategory]);
        notifications.success('Categoria criada com sucesso!');
      }
      setIsCategoryModalOpen(false);
    } catch (error) {
      notifications.error('Erro ao salvar categoria');
    }
  };

  return (
    <>
      <ProductsContainer>
        <ProductsHeader>
          <div>
            <ProductsTitle>🛒 Gerenciamento de Produtos</ProductsTitle>
            <p style={{ color: '#718096', margin: 0 }}>
              Gerencie produtos, categorias e preços da sua pizzaria
            </p>
          </div>
          <ProductsActions>
            <Button 
              variant="outline" 
              onClick={handleCreateCategory}
            >
              + Categoria
            </Button>
            <Button 
              variant="primary" 
              onClick={handleCreateProduct}
            >
              + Produto
            </Button>
          </ProductsActions>
        </ProductsHeader>

        {/* Estatísticas */}
        <StatsContainer>
          <StatCard>
            <div className="icon">📦</div>
            <div className="content">
              <h3>Total de Produtos</h3>
              <span className="value">{stats.total}</span>
            </div>
          </StatCard>
          <StatCard>
            <div className="icon">✅</div>
            <div className="content">
              <h3>Produtos Ativos</h3>
              <span className="value">{stats.active}</span>
            </div>
          </StatCard>
          <StatCard>
            <div className="icon">❌</div>
            <div className="content">
              <h3>Produtos Inativos</h3>
              <span className="value">{stats.inactive}</span>
            </div>
          </StatCard>
          <StatCard>
            <div className="icon">📂</div>
            <div className="content">
              <h3>Categorias</h3>
              <span className="value">{stats.categories}</span>
            </div>
          </StatCard>
        </StatsContainer>

        {/* Filtros */}
        <FilterContainer>
          <FilterGroup>
            <Input
              placeholder="🔍 Buscar produtos..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              size="sm"
            />
          </FilterGroup>
          <FilterGroup>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                minWidth: '150px'
              }}
            >
              <option value="all">Todas as categorias</option>
              {categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.icon} {category.name}
                </option>
              ))}
            </select>
          </FilterGroup>
          <FilterGroup>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              style={{
                padding: '8px 12px',
                border: '1px solid #e2e8f0',
                borderRadius: '6px',
                background: 'white',
                minWidth: '120px'
              }}
            >
              <option value="all">Todos os status</option>
              <option value="active">Ativos</option>
              <option value="inactive">Inativos</option>
            </select>
          </FilterGroup>
        </FilterContainer>

        {/* Grid de Produtos */}
        {isLoading ? (
          <LoadingContainer>
            <div className="loading-spinner" />
            <p>Carregando produtos...</p>
          </LoadingContainer>
        ) : filteredProducts.length === 0 ? (
          <EmptyState>
            <div style={{ fontSize: '48px', marginBottom: '16px' }}>📦</div>
            <h3>Nenhum produto encontrado</h3>
            <p>
              {searchTerm || selectedCategory !== 'all' || statusFilter !== 'all'
                ? 'Tente ajustar os filtros para encontrar produtos'
                : 'Comece criando seu primeiro produto'
              }
            </p>
            {!searchTerm && selectedCategory === 'all' && statusFilter === 'all' && (
              <Button 
                variant="primary" 
                onClick={handleCreateProduct}
                style={{ marginTop: '16px' }}
              >
                + Criar Primeiro Produto
              </Button>
            )}
          </EmptyState>
        ) : (
          <ProductsGrid>
            {filteredProducts.map(product => (
              <ProductCard
                key={product.id}
                product={product}
                onEdit={() => handleEditProduct(product)}
                onDelete={() => handleDeleteProduct(product.id)}
                onToggleStatus={() => handleToggleProductStatus(product.id)}
              />
            ))}
          </ProductsGrid>
        )}
      </ProductsContainer>

      {/* Modal de Produto */}
      <Modal
        isOpen={isProductModalOpen}
        onClose={() => setIsProductModalOpen(false)}
        title={editingProduct ? 'Editar Produto' : 'Novo Produto'}
        size="lg"
      >
        <ProductForm
          product={editingProduct}
          categories={categories}
          onSave={handleSaveProduct}
          onCancel={() => setIsProductModalOpen(false)}
        />
      </Modal>

      {/* Modal de Categoria */}
      <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title={editingCategory ? 'Editar Categoria' : 'Nova Categoria'}
        size="md"
      >
        <CategoryForm
          category={editingCategory}
          onSave={handleSaveCategory}
          onCancel={() => setIsCategoryModalOpen(false)}
        />
      </Modal>

      <Toaster position="top-right" />
    </>
  );
};

export default Products;