// src/components/common/Input/styles.ts
import styled, { css } from 'styled-components';

interface InputContainerProps {
  isFullWidth: boolean;
}

interface InputWrapperProps {
  size: 'sm' | 'md' | 'lg';
  variant: 'default' | 'filled' | 'flushed';
  hasError: boolean;
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}

interface StyledInputProps {
  size: 'sm' | 'md' | 'lg';
  hasLeftIcon: boolean;
  hasRightIcon: boolean;
}

interface InputIconProps {
  position: 'left' | 'right';
}

const sizeStyles = {
  sm: css`
    height: ${({ theme }) => theme.components.input.height.sm};
    font-size: ${({ theme }) => theme.fontSizes.sm};
    padding: 0 ${({ theme }) => theme.spacing[3]};
  `,
  md: css`
    height: ${({ theme }) => theme.components.input.height.md};
    font-size: ${({ theme }) => theme.fontSizes.md};
    padding: 0 ${({ theme }) => theme.spacing[4]};
  `,
  lg: css`
    height: ${({ theme }) => theme.components.input.height.lg};
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: 0 ${({ theme }) => theme.spacing[5]};
  `,
};

const variantStyles = {
  default: css`
    background: ${({ theme }) => theme.colors.background.primary};
    border: 2px solid ${({ theme }) => theme.colors.border.light};
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    
    &:focus {
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  `,
  
  filled: css`
    background: ${({ theme }) => theme.colors.background.secondary};
    border: 2px solid transparent;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
    
    &:focus {
      background: ${({ theme }) => theme.colors.background.primary};
      border-color: ${({ theme }) => theme.colors.primary};
      box-shadow: 0 0 0 3px ${({ theme }) => theme.colors.primary}20;
    }
  `,
  
  flushed: css`
    background: transparent;
    border: none;
    border-bottom: 2px solid ${({ theme }) => theme.colors.border.light};
    border-radius: 0;
    padding-left: 0;
    padding-right: 0;
    
    &:focus {
      border-bottom-color: ${({ theme }) => theme.colors.primary};
      box-shadow: none;
    }
  `,
};

export const InputContainer = styled.div<InputContainerProps>`
  display: flex;
  flex-direction: column;
  width: ${({ isFullWidth }) => (isFullWidth ? '100%' : 'auto')};
  margin-bottom: ${({ theme }) => theme.spacing[1]};
`;

export const InputLabel = styled.label`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing[2]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
`;

export const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
`;

export const InputWrapper = styled.div<InputWrapperProps>`
  position: relative;
  display: flex;
  align-items: center;
  transition: ${({ theme }) => theme.transitions.fast};
  
  ${({ variant }) => variantStyles[variant]}
  
  ${({ hasError, theme }) =>
    hasError &&
    css`
      border-color: ${theme.colors.error} !important;
      
      &:focus-within {
        border-color: ${theme.colors.error} !important;
        box-shadow: 0 0 0 3px ${theme.colors.error}20 !important;
      }
    `}
  
  &:hover:not(:focus-within) {
    border-color: ${({ theme, hasError }) => 
      hasError ? theme.colors.error : theme.colors.border.medium};
  }
`;

export const StyledInput = styled.input<StyledInputProps>`
  width: 100%;
  border: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.primary};
  color: ${({ theme }) => theme.colors.text.primary};
  outline: none;
  transition: ${({ theme }) => theme.transitions.fast};
  
  ${({ size }) => sizeStyles[size]}
  
  ${({ hasLeftIcon, theme }) =>
    hasLeftIcon &&
    css`
      padding-left: ${theme.spacing[10]};
    `}
  
  ${({ hasRightIcon, theme }) =>
    hasRightIcon &&
    css`
      padding-right: ${theme.spacing[10]};
    `}
  
  &::placeholder {
    color: ${({ theme }) => theme.colors.text.muted};
    opacity: 1;
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    background: ${({ theme }) => theme.colors.gray[50]};
  }
  
  /* Remove autofill styles */
  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus {
    -webkit-box-shadow: 0 0 0 1000px ${({ theme }) => theme.colors.background.primary} inset;
    -webkit-text-fill-color: ${({ theme }) => theme.colors.text.primary};
    transition: background-color 5000s ease-in-out 0s;
  }
  
  /* Number input buttons */
  &[type="number"] {
    -moz-appearance: textfield;
    
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
      -webkit-appearance: none;
      margin: 0;
    }
  }
  
  /* Search input */
  &[type="search"] {
    &::-webkit-search-decoration,
    &::-webkit-search-cancel-button,
    &::-webkit-search-results-button,
    &::-webkit-search-results-decoration {
      -webkit-appearance: none;
    }
  }
`;

export const InputIcon = styled.div<InputIconProps>`
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.colors.text.muted};
  pointer-events: none;
  
  ${({ position, theme }) =>
    position === 'left'
      ? css`
          left: ${theme.spacing[3]};
        `
      : css`
          right: ${theme.spacing[3]};
        `}
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ErrorMessage = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.error};
  margin-top: ${({ theme }) => theme.spacing[1]};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  
  &::before {
    content: '⚠️';
    font-size: 12px;
  }
`;

export const HelpText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-top: ${({ theme }) => theme.spacing[1]};
`;