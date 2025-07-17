// src/components/common/Header/styles.ts
import styled, { css } from 'styled-components';
import { slideDown } from '../../../styles/animations';

interface NavItemProps {
  isActive: boolean;
}

interface NotificationButtonProps {
  hasNotifications: boolean;
}

interface UserMenuProps {
  isOpen: boolean;
}

interface MobileMenuProps {
  isOpen: boolean;
}

export const HeaderContainer = styled.header`
  background: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
  box-shadow: ${({ theme }) => theme.shadows.sm};
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.zIndex.sticky};
`;

export const HeaderContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 ${({ theme }) => theme.spacing[6]};
  height: 64px;
  max-width: 1400px;
  margin: 0 auto;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    padding: 0 ${({ theme }) => theme.spacing[4]};
  }
`;

export const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    opacity: 0.8;
  }
`;

export const LogoIcon = styled.div`
  font-size: 28px;
  line-height: 1;
`;

export const LogoText = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-family: ${({ theme }) => theme.fonts.secondary};
  color: ${({ theme }) => theme.colors.primary};
  margin: 0;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const Navigation = styled.nav`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: none;
  }
`;

export const NavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.text.secondary};
  font-weight: ${({ theme, isActive }) => 
    isActive ? theme.fontWeights.semibold : theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  position: relative;
  
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background: ${theme.colors.primary}10;
      
      &::after {
        content: '';
        position: absolute;
        bottom: -1px;
        left: 50%;
        transform: translateX(-50%);
        width: 20px;
        height: 2px;
        background: ${theme.colors.primary};
        border-radius: ${theme.borderRadius.full};
      }
    `}
  
  &:hover:not(:disabled) {
    background: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary + '15' : theme.colors.background.hover};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
`;

export const NavIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;

export const NavText = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
`;

export const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`;

export const NotificationButton = styled.button<NotificationButtonProps>`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  ${({ hasNotifications, theme }) =>
    hasNotifications &&
    css`
      color: ${theme.colors.primary};
      
      &::before {
        content: '';
        position: absolute;
        top: 8px;
        right: 8px;
        width: 8px;
        height: 8px;
        background: ${theme.colors.error};
        border-radius: 50%;
        border: 2px solid ${theme.colors.background.primary};
      }
    `}
`;

export const NotificationBadge = styled.span`
  position: absolute;
  top: 6px;
  right: 6px;
  min-width: 18px;
  height: 18px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 10px;
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  color: ${({ theme }) => theme.colors.text.white};
  background: ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.full};
  border: 2px solid ${({ theme }) => theme.colors.background.primary};
  line-height: 1;
  padding: 0 2px;
`;

export const UserMenu = styled.div<UserMenuProps>`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }
  
  ${({ isOpen, theme }) =>
    isOpen &&
    css`
      background: ${theme.colors.background.hover};
    `}
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    display: none;
  }
`;

export const UserAvatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.primary};
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  svg {
    width: 16px;
    height: 16px;
    color: ${({ theme }) => theme.colors.text.white};
  }
`;

export const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    display: none;
  }
`;

export const UserName = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.sm};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
  line-height: 1.2;
`;

export const UserRole = styled.span`
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  line-height: 1.2;
`;

export const MobileMenuButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  
  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.primary};
    outline-offset: 2px;
  }
  
  svg {
    width: 20px;
    height: 20px;
  }
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: flex;
  }
`;

export const MobileMenu = styled.div<MobileMenuProps>`
  display: none;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    display: block;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: ${({ theme }) => theme.colors.background.primary};
    border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    z-index: ${({ theme }) => theme.zIndex.dropdown};
    
    ${({ isOpen }) =>
      isOpen
        ? css`
            animation: ${slideDown} 0.2s ease-out;
            max-height: 400px;
            overflow: hidden;
          `
        : css`
            max-height: 0;
            overflow: hidden;
          `}
  }
`;

export const MobileNavigation = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${({ theme }) => theme.spacing[4]};
  gap: ${({ theme }) => theme.spacing[2]};
`;

export const MobileNavItem = styled.button<NavItemProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  border: none;
  background: transparent;
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  color: ${({ theme, isActive }) => 
    isActive ? theme.colors.primary : theme.colors.text.secondary};
  font-weight: ${({ theme, isActive }) => 
    isActive ? theme.fontWeights.semibold : theme.fontWeights.medium};
  cursor: pointer;
  transition: ${({ theme }) => theme.transitions.fast};
  text-align: left;
  font-size: ${({ theme }) => theme.fontSizes.md};
  
  ${({ isActive, theme }) =>
    isActive &&
    css`
      background: ${theme.colors.primary}10;
    `}
  
  &:hover:not(:disabled) {
    background: ${({ theme, isActive }) => 
      isActive ? theme.colors.primary + '15' : theme.colors.background.hover};
    color: ${({ theme }) => theme.colors.primary};
  }
  
  svg {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }
`;