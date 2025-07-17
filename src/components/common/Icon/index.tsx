// src/components/common/Icon/index.tsx
import React from 'react';

export interface IconProps {
  icon: any; // Simplificamos o tipo
  size?: number;
  color?: string;
  className?: string;
}

export const Icon: React.FC<IconProps> = ({ 
  icon: IconComponent, 
  size = 20, 
  color, 
  className 
}) => {
  if (!IconComponent) return null;
  
  return (
    <IconComponent 
      size={size} 
      color={color} 
      className={className} 
    />
  );
};

export default Icon;