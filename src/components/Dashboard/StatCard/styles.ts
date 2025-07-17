// src/components/Dashboard/StatCard/styles.ts
import styled from 'styled-components';

interface StatCardContainerProps {
  color: string;
}

interface StatChangeProps {
  color: string;
}

export const StatCardContainer = styled.div<StatCardContainerProps>`
  display: flex;
  align-items: center;
  gap: 16px;
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
  border-left: 4px solid ${({ color }) => color};
  transition: all 0.3s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
  }
`;

export const StatIcon = styled.div`
  font-size: 40px;
  line-height: 1;
  opacity: 0.8;
`;

export const StatContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
`;

export const StatTitle = styled.h3`
  font-size: 14px;
  font-weight: 500;
  color: #718096;
  margin: 0;
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const StatValue = styled.div`
  font-size: 28px;
  font-weight: 700;
  color: #1a202c;
  margin: 0;
  line-height: 1.2;
`;

export const StatChange = styled.div<StatChangeProps>`
  font-size: 12px;
  font-weight: 600;
  color: ${({ color }) => color};
  display: flex;
  align-items: center;
  gap: 4px;
`;