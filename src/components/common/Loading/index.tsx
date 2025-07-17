// src/components/common/Loading/index.tsx
import React from 'react';
import {
  LoadingContainer,
  LoadingSpinner,
  LoadingDots,
  LoadingBars,
  LoadingPulse,
  LoadingText,
  LoadingOverlay
} from './styles';

export interface LoadingProps {
  type?: 'spinner' | 'dots' | 'bars' | 'pulse';
  size?: 'sm' | 'md' | 'lg';
  color?: string;
  text?: string;
  overlay?: boolean;
  fullScreen?: boolean;
  className?: string;
}

export const Loading: React.FC<LoadingProps> = ({
  type = 'spinner',
  size = 'md',
  color,
  text,
  overlay = false,
  fullScreen = false,
  className
}) => {
  const renderLoadingElement = () => {
    switch (type) {
      case 'dots':
        return <LoadingDots size={size} color={color} />;
      case 'bars':
        return <LoadingBars size={size} color={color} />;
      case 'pulse':
        return <LoadingPulse size={size} color={color} />;
      default:
        return <LoadingSpinner size={size} color={color} />;
    }
  };

  const content = (
    <LoadingContainer 
      className={className}
      fullScreen={fullScreen}
      overlay={overlay}
    >
      {renderLoadingElement()}
      {text && <LoadingText>{text}</LoadingText>}
    </LoadingContainer>
  );

  if (overlay) {
    return <LoadingOverlay>{content}</LoadingOverlay>;
  }

  return content;
};

// Componente especializado para loading de página inteira
export const PageLoading: React.FC<Omit<LoadingProps, 'overlay' | 'fullScreen'>> = (props) => (
  <Loading {...props} overlay fullScreen />
);

// Componente especializado para loading inline
export const InlineLoading: React.FC<Omit<LoadingProps, 'overlay' | 'fullScreen'>> = (props) => (
  <Loading {...props} size="sm" />
);

export default Loading;