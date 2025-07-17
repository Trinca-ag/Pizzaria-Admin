// src/components/Dashboard/StatCard/index.tsx
import React from 'react';
import { StatCardContainer, StatIcon, StatContent, StatTitle, StatValue, StatChange } from './styles';

export interface StatCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  change?: {
    value: number;
    type: 'increase' | 'decrease' | 'neutral';
  };
  isLoading?: boolean;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon,
  color,
  change,
  isLoading = false
}) => {
  const formatValue = (val: string | number): string => {
    if (typeof val === 'number') {
      // Se for valor monetário (contém ponto decimal)
      if (val % 1 !== 0 || val > 100) {
        return val.toLocaleString('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        });
      }
      // Se for número inteiro
      return val.toString();
    }
    return val;
  };

  const getChangeColor = (type: 'increase' | 'decrease' | 'neutral'): string => {
    switch (type) {
      case 'increase':
        return '#48BB78';
      case 'decrease':
        return '#F56565';
      default:
        return '#718096';
    }
  };

  const getChangeIcon = (type: 'increase' | 'decrease' | 'neutral'): string => {
    switch (type) {
      case 'increase':
        return '↗';
      case 'decrease':
        return '↘';
      default:
        return '→';
    }
  };

  if (isLoading) {
    return (
      <StatCardContainer color={color}>
        <StatIcon>{icon}</StatIcon>
        <StatContent>
          <StatTitle>{title}</StatTitle>
          <StatValue>Carregando...</StatValue>
        </StatContent>
      </StatCardContainer>
    );
  }

  return (
    <StatCardContainer color={color}>
      <StatIcon>{icon}</StatIcon>
      <StatContent>
        <StatTitle>{title}</StatTitle>
        <StatValue>{formatValue(value)}</StatValue>
        {change && (
          <StatChange color={getChangeColor(change.type)}>
            {getChangeIcon(change.type)} {Math.abs(change.value)}%
          </StatChange>
        )}
      </StatContent>
    </StatCardContainer>
  );
};

export default StatCard;