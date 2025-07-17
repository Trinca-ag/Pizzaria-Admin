// src/components/common/Button/styles.ts
import styled, { css } from 'styled-components';
import { spin } from '../../../styles/animations';

interface StyledButtonProps {
  variant: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline';
  size: 'sm' | 'md' | 'lg';
  isFullWidth: boolean;
}

interface ButtonContentProps {
  isLoading: boolean;
}

const sizeStyles = {
  sm: css`
    height: ${({ theme }) => theme.components.button.height.sm};
    padding: ${({ theme }) => theme.components.button.padding.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
  `,
  md: css`
    height: ${({ theme }) => theme.components.button.height.md};
    padding: ${({ theme }) => theme.components.button.padding.md};
    font-size: ${({ theme }) => theme.fontSizes.md};
  `,
  lg: css`
    height: ${({ theme }) => theme.components.button.height.lg};
    padding: ${({ theme }) => theme.components.button.padding.lg};
    font-size: ${({ theme }) => theme.fontSizes.lg};
  `,
};

const variantStyles = {
  primary: css`
    background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary} 0%, #ff8a5b 100%);
    color: ${({ theme }) => theme.colors.text.white};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background: linear-gradient(135deg, #ff5722 0%, ${({ theme }) => theme.colors.primary} 100%);
      transform: translateY(-1px);
      box-shadow: ${({ theme }) => theme.shadows.lg};
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
      box-shadow: ${({ theme }) => theme.shadows.md};
    }
  `,
  
  secondary: css`
    background: ${({ theme }) => theme.colors.secondary};
    color: ${({ theme }) => theme.colors.text.white};
    border: 2px solid ${({ theme }) => theme.colors.secondary};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.gray[700]};
      border-color: ${({ theme }) => theme.colors.gray[700]};
      transform: translateY(-1px);
    }
  `,
  
  success: css`
    background: ${({ theme }) => theme.colors.success};
    color: ${({ theme }) => theme.colors.text.white};
    border: 2px solid ${({ theme }) => theme.colors.success};
    
    &:hover:not(:disabled) {
      background: #38a169;
      border-color: #38a169;
      transform: translateY(-1px);
    }
  `,
  
  warning: css`
    background: ${({ theme }) => theme.colors.warning};
    color: ${({ theme }) => theme.colors.text.white};
    border: 2px solid ${({ theme }) => theme.colors.warning};
    
    &:hover:not(:disabled) {
      background: #dd6b20;
      border-color: #dd6b20;
      transform: translateY(-1px);
    }
  `,
  
  error: css`
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.text.white};
    border: 2px solid ${({ theme }) => theme.colors.error};
    
    &:hover:not(:disabled) {
      background: #e53e3e;
      border-color: #e53e3e;
      transform: translateY(-1px);
    }
  `,
  
  ghost: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid transparent;
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.background.hover};
      color: ${({ theme }) => theme.colors.secondary};
    }
  `,
  
  outline: css`
    background: transparent;
    color: ${({ theme }) => theme.colors.primary};
    border: 2px solid ${({ theme }) => theme.colors.primary};
    
    &:hover:not(:disabled) {
      background: ${({ theme }) => theme.colors.primary};
      color: ${({ theme }) => theme.colors.text.white};
      transform: translateY(-1px);
    }
  `,
};

export const StyledButton = styled.button<StyledButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  font-family: ${({ theme }) => theme.fonts.primary};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  line-height: 1;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.normal};
  outline: none;
  overflow: hidden;
  white-space: nowrap;
  
  ${({ size }) => sizeStyles[size]}
  ${({ variant }) => variantStyles[variant]}
  
  ${({ isFullWidth }) =>
    isFullWidth &&
    css`
      width: 100%;
    `}
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none !important;
    
    &:hover {
      transform: none !important;
    }
  }
  
  /* Efeito ripple */
  &::before {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 0;
    height: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.3);
    transform: translate(-50%, -50%);
    transition: width 0.3s ease, height 0.3s ease;
  }
  
  &:active::before {
    width: 300px;
    height: 300px;
  }
`;

export const LoadingSpinner = styled.div`
  width: 16px;
  height: 16px;
  border: 2px solid transparent;
  border-top: 2px solid currentColor;
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
`;

export const ButtonContent = styled.span<ButtonContentProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  opacity: ${({ isLoading }) => (isLoading ? 0 : 1)};
  transition: opacity 0.2s ease;
  
  .button-icon {
    display: flex;
    align-items: center;
    justify-content: center;
    
    &.left {
      margin-right: ${({ theme }) => theme.spacing[1]};
    }
    
    &.right {
      margin-left: ${({ theme }) => theme.spacing[1]};
    }
  }
  
  .button-text {
    flex: 1;
    text-align: center;
  }
`;