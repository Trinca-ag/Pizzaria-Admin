// src/components/common/Modal/styles.ts
import styled, { css } from 'styled-components';
import { fadeIn, modalFadeIn, overlayFadeIn } from '../../../styles/animations';

interface ModalContainerProps {
  size: 'sm' | 'md' | 'lg' | 'xl' | 'full';
}

const sizeStyles = {
  sm: css`
    max-width: 400px;
    width: 90vw;
  `,
  md: css`
    max-width: 600px;
    width: 90vw;
  `,
  lg: css`
    max-width: 800px;
    width: 90vw;
  `,
  xl: css`
    max-width: 1200px;
    width: 95vw;
  `,
  full: css`
    width: 95vw;
    height: 95vh;
    max-width: none;
    max-height: none;
  `,
};

export const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: ${({ theme }) => theme.zIndex.modal};
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  animation: ${overlayFadeIn} 0.2s ease-out;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[2]};
    align-items: flex-end;
  }
`;

export const ModalContainer = styled.div<ModalContainerProps>`
  position: relative;
  max-height: 90vh;
  background: ${({ theme }) => theme.colors.background.primary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  box-shadow: ${({ theme }) => theme.shadows['2xl']};
  animation: ${modalFadeIn} 0.3s ease-out;
  outline: none;
  
  ${({ size }) => sizeStyles[size]}
  
  ${({ size }) =>
    size === 'full' &&
    css`
      display: flex;
      flex-direction: column;
    `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    width: 100%;
    max-height: 85vh;
    border-bottom-left-radius: 0;
    border-bottom-right-radius: 0;
    margin-top: auto;
    
    ${({ size }) =>
      size === 'full' &&
      css`
        height: 100vh;
        max-height: 100vh;
        border-radius: 0;
      `}
  }
`;

export const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow: hidden;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ theme }) => `${theme.spacing[6]} ${theme.spacing[6]} ${theme.spacing[4]}`};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[4]} ${theme.spacing[3]}`};
  }
`;

export const ModalTitle = styled.h2`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.secondary};
`;

export const ModalCloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  color: ${({ theme }) => theme.colors.text.muted};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    color: ${({ theme }) => theme.colors.text.secondary};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const ModalBody = styled.div`
  flex: 1;
  padding: ${({ theme }) => theme.spacing[6]};
  overflow-y: auto;
  overflow-x: hidden;
  
  /* Scrollbar customizada */
  &::-webkit-scrollbar {
    width: 6px;
  }
  
  &::-webkit-scrollbar-track {
    background: ${({ theme }) => theme.colors.gray[100]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
  }
  
  &::-webkit-scrollbar-thumb {
    background: ${({ theme }) => theme.colors.gray[300]};
    border-radius: ${({ theme }) => theme.borderRadius.full};
    
    &:hover {
      background: ${({ theme }) => theme.colors.gray[400]};
    }
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => theme.spacing[4]};
  }
`;

export const ModalFooter = styled.div`
  padding: ${({ theme }) => `${theme.spacing[4]} ${theme.spacing[6]} ${theme.spacing[6]}`};
  border-top: 1px solid ${({ theme }) => theme.colors.border.light};
  flex-shrink: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]} ${theme.spacing[4]}`};
  }
`;

// Componente helper para botões do footer
export const ModalButtonGroup = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[3]};
  justify-content: flex-end;
  align-items: center;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    flex-direction: column-reverse;
    gap: ${({ theme }) => theme.spacing[2]};
    
    button {
      width: 100%;
    }
  }
`;

// Componente helper para conteúdo centralizado
export const ModalCenteredContent = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: ${({ theme }) => theme.spacing[8]} ${({ theme }) => theme.spacing[4]};
  min-height: 200px;
  
  h3 {
    margin-bottom: ${({ theme }) => theme.spacing[4]};
    color: ${({ theme }) => theme.colors.text.primary};
  }
  
  p {
    margin-bottom: ${({ theme }) => theme.spacing[6]};
    color: ${({ theme }) => theme.colors.text.secondary};
    max-width: 400px;
  }
`;

// Componente helper para formulários no modal
export const ModalForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  
  .form-group {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[2]};
  }
  
  .form-row {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: ${({ theme }) => theme.spacing[4]};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      grid-template-columns: 1fr;
    }
  }
  
  .form-actions {
    display: flex;
    justify-content: flex-end;
    gap: ${({ theme }) => theme.spacing[3]};
    margin-top: ${({ theme }) => theme.spacing[4]};
    padding-top: ${({ theme }) => theme.spacing[4]};
    border-top: 1px solid ${({ theme }) => theme.colors.border.light};
    
    @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
      flex-direction: column-reverse;
      
      button {
        width: 100%;
      }
    }
  }
`;