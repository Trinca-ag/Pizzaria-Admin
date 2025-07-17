// src/components/Products/ProductCard/index.tsx
import React, { useState } from 'react';
import Button from '../../common/Button';
import {
  CardContainer,
  ProductImage,
  ProductInfo,
  ProductHeader,
  ProductName,
  ProductCategory,
  ProductDescription,
  ProductDetails,
  ProductPrice,
  ProductMeta,
  ProductActions,
  StatusBadge,
  ActionMenu,
  ActionMenuItem
} from './styles';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  categoryId: string;
  categoryName?: string;
  images: Array<{
    id: string;
    url: string;
    alt: string;
    isPrimary: boolean;
    order: number;
  }>;
  isActive: boolean;
  preparationTime: number;
  salesCount?: number;
  createdAt: Date;
  updatedAt: Date;
  order: number;
}

interface ProductCardProps {
  product: Product;
  onEdit: () => void;
  onDelete: () => void;
  onToggleStatus: () => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onEdit,
  onDelete,
  onToggleStatus
}) => {
  const [showActions, setShowActions] = useState(false);
  const [imageError, setImageError] = useState(false);

  const formatCurrency = (value: number) => {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    });
  };

  const formatTime = (minutes: number) => {
    return `${minutes} min`;
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const primaryImage = product.images?.find(img => img.isPrimary) || product.images?.[0];

  return (
    <CardContainer isActive={product.isActive}>
      <div style={{ position: 'relative' }}>
        <ProductImage>
          {!imageError && primaryImage ? (
            <img 
              src={primaryImage.url} 
              alt={primaryImage.alt}
              onError={handleImageError}
            />
          ) : (
            <div className="placeholder">
              {product.categoryId === 'bebidas' ? '🥤' : '🍕'}
            </div>
          )}
          
          <StatusBadge isActive={product.isActive}>
            {product.isActive ? 'Ativo' : 'Inativo'}
          </StatusBadge>

          <div className="action-button">
            <Button
              size="sm"
              variant="ghost"
              onClick={() => setShowActions(!showActions)}
              style={{ 
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(4px)',
                border: '1px solid rgba(255, 255, 255, 0.2)'
              }}
            >
              ⋮
            </Button>
            
            {showActions && (
              <ActionMenu>
                <ActionMenuItem onClick={onEdit}>
                  ✏️ Editar
                </ActionMenuItem>
                <ActionMenuItem onClick={onToggleStatus}>
                  {product.isActive ? '❌ Desativar' : '✅ Ativar'}
                </ActionMenuItem>
                <ActionMenuItem onClick={onDelete} className="danger">
                  🗑️ Excluir
                </ActionMenuItem>
              </ActionMenu>
            )}
          </div>
        </ProductImage>
      </div>

      <ProductInfo>
        <ProductHeader>
          <ProductName>{product.name}</ProductName>
          <ProductCategory>
            {product.categoryName || 'Sem categoria'}
          </ProductCategory>
        </ProductHeader>

        <ProductDescription>
          {product.description}
        </ProductDescription>

        <ProductDetails>
          <ProductPrice>
            {formatCurrency(product.price)}
          </ProductPrice>
          
          <ProductMeta>
            <div className="meta-item">
              <span className="icon">⏱️</span>
              <span>{formatTime(product.preparationTime)}</span>
            </div>
            <div className="meta-item">
              <span className="icon">📊</span>
              <span>{product.salesCount || 0} vendas</span>
            </div>
          </ProductMeta>
        </ProductDetails>

        <ProductActions>
          <Button 
            size="sm" 
            variant="outline" 
            onClick={onEdit}
            isFullWidth
          >
            Editar
          </Button>
        </ProductActions>
      </ProductInfo>
    </CardContainer>
  );
};

export default ProductCard;