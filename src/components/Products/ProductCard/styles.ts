// src/components/Products/ProductCard/styles.ts
import styled from 'styled-components';

interface CardContainerProps {
  isActive: boolean;
}

interface StatusBadgeProps {
  isActive: boolean;
}

export const CardContainer = styled.div<CardContainerProps>`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  opacity: ${({ isActive }) => isActive ? 1 : 0.7};
  border: 2px solid ${({ isActive }) => isActive ? 'transparent' : '#f56565'};

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
  }
`;

export const ProductImage = styled.div`
  position: relative;
  width: 100%;
  height: 200px;
  overflow: hidden;
  background: #f7fafc;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.3s ease;
  }

  .placeholder {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 48px;
    background: linear-gradient(135deg, #ff6b35 0%, #f56565 100%);
    color: white;
  }

  .action-button {
    position: absolute;
    top: 12px;
    right: 12px;
    z-index: 2;
  }

  &:hover img {
    transform: scale(1.05);
  }
`;

export const StatusBadge = styled.div<StatusBadgeProps>`
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 600;
  text-transform: uppercase;
  background: ${({ isActive }) => isActive ? '#48bb78' : '#f56565'};
  color: white;
  z-index: 1;
`;

export const ProductInfo = styled.div`
  padding: 20px;
`;

export const ProductHeader = styled.div`
  margin-bottom: 12px;
`;

export const ProductName = styled.h3`
  font-size: 18px;
  font-weight: 600;
  color: #1a202c;
  margin: 0 0 4px;
  line-height: 1.3;
`;

export const ProductCategory = styled.span`
  font-size: 12px;
  color: #718096;
  background: #edf2f7;
  padding: 2px 8px;
  border-radius: 12px;
  font-weight: 500;
`;

export const ProductDescription = styled.p`
  font-size: 14px;
  color: #4a5568;
  line-height: 1.5;
  margin: 0 0 16px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

export const ProductDetails = styled.div`
  margin-bottom: 16px;
`;

export const ProductPrice = styled.div`
  font-size: 24px;
  font-weight: 700;
  color: #ff6b35;
  margin-bottom: 8px;
`;

export const ProductMeta = styled.div`
  display: flex;
  gap: 16px;

  .meta-item {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 12px;
    color: #718096;

    .icon {
      font-size: 14px;
    }
  }
`;

export const ProductActions = styled.div`
  display: flex;
  gap: 8px;
`;

export const ActionMenu = styled.div`
  position: absolute;
  top: 100%;
  right: 0;
  background: white;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 1000;
  min-width: 120px;
  overflow: hidden;
`;

export const ActionMenuItem = styled.button`
  width: 100%;
  padding: 8px 12px;
  border: none;
  background: white;
  text-align: left;
  font-size: 12px;
  color: #4a5568;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: #f7fafc;
  }

  &.danger {
    color: #f56565;

    &:hover {
      background: #fed7d7;
    }
  }

  &:not(:last-child) {
    border-bottom: 1px solid #edf2f7;
  }`;
