// src/components/common/Loading/styles.ts
import styled, { css, keyframes } from 'styled-components';

interface LoadingProps {
  size: 'sm' | 'md' | 'lg';
  color?: string;
}

interface LoadingContainerProps {
  fullScreen: boolean;
  overlay: boolean;
}

// Animações
const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const bounce = keyframes`
  0%, 80%, 100% { 
    transform: scale(0);
    opacity: 0.5;
  } 
  40% { 
    transform: scale(1);
    opacity: 1;
  }
`;

const stretch = keyframes`
  0%, 40%, 100% { 
    transform: scaleY(0.4);
  }  
  20% { 
    transform: scaleY(1.0);
  }
`;

const pulse = keyframes`
  0% {
    transform: scale(0);
    opacity: 1;
  }
  100% {
    transform: scale(1);
    opacity: 0;
  }
`;

// Tamanhos
const sizeConfig = {
  sm: { size: '20px', text: '12px' },
  md: { size: '32px', text: '14px' },
  lg: { size: '48px', text: '16px' },
};

const getSizeStyle = (size: 'sm' | 'md' | 'lg') => css`
  width: ${sizeConfig[size].size};
  height: ${sizeConfig[size].size};
`;

export const LoadingContainer = styled.div<LoadingContainerProps>`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  
  ${({ fullScreen }) =>
    fullScreen &&
    css`
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      z-index: ${({ theme }) => theme.zIndex.modal};
    `}
  
  ${({ overlay, theme }) =>
    overlay &&
    css`
      background: rgba(255, 255, 255, 0.9);
      backdrop-filter: blur(4px);
    `}
`;

export const LoadingOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.overlay};
  display: flex;
  align-items: center;
  justify-content: center;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
`;

export const LoadingSpinner = styled.div<LoadingProps>`
  ${({ size }) => getSizeStyle(size)}
  border: 3px solid ${({ theme, color }) => color || theme.colors.gray[200]};
  border-top: 3px solid ${({ theme, color }) => color || theme.colors.primary};
  border-radius: 50%;
  animation: ${spin} 1s linear infinite;
`;

export const LoadingDots = styled.div<LoadingProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  
  &::before,
  &::after,
  & {
    content: '';
    width: ${({ size }) => size === 'sm' ? '6px' : size === 'md' ? '8px' : '12px'};
    height: ${({ size }) => size === 'sm' ? '6px' : size === 'md' ? '8px' : '12px'};
    background: ${({ theme, color }) => color || theme.colors.primary};
    border-radius: 50%;
    animation: ${bounce} 1.4s ease-in-out infinite both;
  }
  
  &::before {
    animation-delay: -0.32s;
  }
  
  &::after {
    animation-delay: -0.16s;
  }
`;

export const LoadingBars = styled.div<LoadingProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[1]};
  align-items: end;
  height: ${({ size }) => sizeConfig[size].size};
  
  & > div {
    width: ${({ size }) => size === 'sm' ? '3px' : size === 'md' ? '4px' : '6px'};
    height: 100%;
    background: ${({ theme, color }) => color || theme.colors.primary};
    animation: ${stretch} 1.2s infinite ease-in-out;
  }
  
  & > div:nth-child(1) { animation-delay: -1.2s; }
  & > div:nth-child(2) { animation-delay: -1.1s; }
  & > div:nth-child(3) { animation-delay: -1.0s; }
  & > div:nth-child(4) { animation-delay: -0.9s; }
  & > div:nth-child(5) { animation-delay: -0.8s; }
`;

export const LoadingPulse = styled.div<LoadingProps>`
  ${({ size }) => getSizeStyle(size)}
  position: relative;
  
  &::before,
  &::after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: 50%;
    background: ${({ theme, color }) => color || theme.colors.primary};
    animation: ${pulse} 2s infinite ease-in-out;
  }
  
  &::after {
    animation-delay: -1s;
  }
`;

export const LoadingText = styled.div`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  margin-top: ${({ theme }) => theme.spacing[2]};
  animation: pulse 2s infinite ease-in-out;
`;