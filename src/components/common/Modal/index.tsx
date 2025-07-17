// src/components/common/Modal/index.tsx
import React, { ReactNode, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { IconType } from 'react-icons';
import * as Icons from 'react-icons/fi';
import Icon from '../Icon';
import {
  ModalOverlay,
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from './styles';

export interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  footer?: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  closeOnOverlayClick?: boolean;
  closeOnEsc?: boolean;
  showCloseButton?: boolean;
  preventScroll?: boolean;
  className?: string;
}

export const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  size = 'md',
  closeOnOverlayClick = true,
  closeOnEsc = true,
  showCloseButton = true,
  preventScroll = true,
  className
}) => {
  const modalRef = useRef<HTMLDivElement>(null);
  const previousActiveElement = useRef<HTMLElement | null>(null);

  // Gerenciar foco e scroll
  useEffect(() => {
    if (isOpen) {
      // Salvar elemento focado anteriormente
      previousActiveElement.current = document.activeElement as HTMLElement;
      
      // Focar no modal
      if (modalRef.current) {
        modalRef.current.focus();
      }
      
      // Prevenir scroll do body
      if (preventScroll) {
        document.body.style.overflow = 'hidden';
      }
    } else {
      // Restaurar foco
      if (previousActiveElement.current) {
        previousActiveElement.current.focus();
      }
      
      // Restaurar scroll
      if (preventScroll) {
        document.body.style.overflow = '';
      }
    }

    return () => {
      if (preventScroll) {
        document.body.style.overflow = '';
      }
    };
  }, [isOpen, preventScroll]);

  // Fechar com ESC
  useEffect(() => {
    if (!isOpen || !closeOnEsc) return;

    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [isOpen, closeOnEsc, onClose]);

  // Gerenciar foco dentro do modal (trap focus)
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;

    const modal = modalRef.current;
    if (!modal) return;

    const focusableElements = modal.querySelectorAll(
      'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select'
    );
    
    const firstElement = focusableElements[0] as HTMLElement;
    const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;

    if (e.shiftKey) {
      if (document.activeElement === firstElement) {
        lastElement?.focus();
        e.preventDefault();
      }
    } else {
      if (document.activeElement === lastElement) {
        firstElement?.focus();
        e.preventDefault();
      }
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (closeOnOverlayClick && e.target === e.currentTarget) {
      onClose();
    }
  };

  if (!isOpen) return null;

  const modalContent = (
    <ModalOverlay onClick={handleOverlayClick}>
      <ModalContainer
        ref={modalRef}
        size={size}
        className={className}
        tabIndex={-1}
        onKeyDown={handleKeyDown}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? "modal-title" : undefined}
      >
        <ModalContent>
          {(title || showCloseButton) && (
            <ModalHeader>
              {title && (
                <ModalTitle id="modal-title">
                  {title}
                </ModalTitle>
              )}
              {showCloseButton && (
                <ModalCloseButton
                  onClick={onClose}
                  aria-label="Fechar modal"
                  type="button"
                >
                  <Icon icon={Icons.FiX as IconType} />
                </ModalCloseButton>
              )}
            </ModalHeader>
          )}
          
          <ModalBody>
            {children}
          </ModalBody>
          
          {footer && (
            <ModalFooter>
              {footer}
            </ModalFooter>
          )}
        </ModalContent>
      </ModalContainer>
    </ModalOverlay>
  );

  // Renderizar no portal
  return createPortal(modalContent, document.body);
};

// Componente especializado para confirmação
export interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'default' | 'danger';
  isLoading?: boolean;
}

export const ConfirmModal: React.FC<ConfirmModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  variant = 'default',
  isLoading = false
}) => {
  const handleConfirm = () => {
    onConfirm();
    if (!isLoading) {
      onClose();
    }
  };

  const footer = (
    <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
      <button
        type="button"
        onClick={onClose}
        disabled={isLoading}
        style={{
          padding: '8px 16px',
          border: '1px solid #e2e8f0',
          background: 'transparent',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        {cancelText}
      </button>
      <button
        type="button"
        onClick={handleConfirm}
        disabled={isLoading}
        style={{
          padding: '8px 16px',
          border: 'none',
          background: variant === 'danger' ? '#f56565' : '#ff6b35',
          color: 'white',
          borderRadius: '6px',
          cursor: 'pointer'
        }}
      >
        {isLoading ? 'Carregando...' : confirmText}
      </button>
    </div>
  );

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      size="sm"
    >
      <p style={{ margin: 0, color: '#4a5568' }}>
        {message}
      </p>
    </Modal>
  );
};

export default Modal;