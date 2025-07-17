// src/components/common/Input/index.tsx
import React, { InputHTMLAttributes, ReactNode, forwardRef } from 'react';
import { 
  InputContainer, 
  InputLabel, 
  InputWrapper, 
  StyledInput, 
  InputIcon, 
  ErrorMessage, 
  HelpText,
  RequiredIndicator
} from './styles';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
  label?: string;
  error?: string;
  helpText?: string;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  size?: 'sm' | 'md' | 'lg';
  variant?: 'default' | 'filled' | 'flushed';
  isRequired?: boolean;
  isInvalid?: boolean;
  isFullWidth?: boolean;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(({
  label,
  error,
  helpText,
  leftIcon,
  rightIcon,
  size = 'md',
  variant = 'default',
  isRequired = false,
  isInvalid = false,
  isFullWidth = true,
  className,
  id,
  ...rest
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;
  const hasError = Boolean(error) || isInvalid;

  return (
    <InputContainer className={className} isFullWidth={isFullWidth}>
      {label && (
        <InputLabel htmlFor={inputId}>
          {label}
          {isRequired && <RequiredIndicator>*</RequiredIndicator>}
        </InputLabel>
      )}
      
      <InputWrapper 
        size={size} 
        variant={variant} 
        hasError={hasError}
        hasLeftIcon={Boolean(leftIcon)}
        hasRightIcon={Boolean(rightIcon)}
      >
        {leftIcon && (
          <InputIcon position="left">
            {leftIcon}
          </InputIcon>
        )}
        
        <StyledInput
          ref={ref}
          id={inputId}
          size={size}
          hasLeftIcon={Boolean(leftIcon)}
          hasRightIcon={Boolean(rightIcon)}
          {...rest}
        />
        
        {rightIcon && (
          <InputIcon position="right">
            {rightIcon}
          </InputIcon>
        )}
      </InputWrapper>
      
      {error && <ErrorMessage>{error}</ErrorMessage>}
      {helpText && !error && <HelpText>{helpText}</HelpText>}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;