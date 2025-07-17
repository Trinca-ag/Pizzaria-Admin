// src/components/common/Button/index.tsx
import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import { StyledButton, LoadingSpinner, ButtonContent } from './styles';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'ghost' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  isFullWidth?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  loadingText?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isLoading = false,
  isFullWidth = false,
  leftIcon,
  rightIcon,
  loadingText,
  disabled,
  ...rest
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      isFullWidth={isFullWidth}
      disabled={disabled || isLoading}
      {...rest}
    >
      {isLoading && <LoadingSpinner />}
      
      <ButtonContent isLoading={isLoading}>
        {leftIcon && <span className="button-icon left">{leftIcon}</span>}
        
        <span className="button-text">
          {isLoading && loadingText ? loadingText : children}
        </span>
        
        {rightIcon && <span className="button-icon right">{rightIcon}</span>}
      </ButtonContent>
    </StyledButton>
  );
};

export default Button;