// src/components/common/Header/index.tsx
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { IconType } from 'react-icons';
import * as Icons from 'react-icons/fi';
import Icon from '../Icon';
import {
  HeaderContainer,
  HeaderContent,
  Logo,
  LogoIcon,
  LogoText,
  Navigation,
  NavItem,
  NavIcon,
  NavText,
  HeaderActions,
  NotificationButton,
  NotificationBadge,
  UserMenu,
  UserAvatar,
  UserInfo,
  UserName,
  UserRole,
  MobileMenuButton,
  MobileMenu,
  MobileNavigation,
  MobileNavItem
} from './styles';

interface HeaderProps {
  userName?: string;
  userRole?: string;
  userAvatar?: string;
  notificationCount?: number;
  onLogout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  userName = 'Admin',
  userRole = 'Administrador',
  userAvatar,
  notificationCount = 0,
  onLogout
}) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);

  const navigationItems = [
    { path: '/dashboard', icon: Icons.FiHome as IconType, label: 'Dashboard' },
    { path: '/products', icon: Icons.FiPackage as IconType, label: 'Produtos' },
    { path: '/orders', icon: Icons.FiShoppingCart as IconType, label: 'Pedidos' },
    { path: '/reports', icon: Icons.FiBarChart as IconType, label: 'Relatórios' },
    { path: '/settings', icon: Icons.FiSettings as IconType, label: 'Configurações' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsMobileMenuOpen(false);
  };

  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
    setIsUserMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  return (
    <HeaderContainer>
      <HeaderContent>
        {/* Logo */}
        <Logo onClick={() => navigate('/dashboard')}>
          <LogoIcon>🍕</LogoIcon>
          <LogoText>Pizzaria Admin</LogoText>
        </Logo>

        {/* Navegação Desktop */}
        <Navigation>
          {navigationItems.map((item) => (
            <NavItem
              key={item.path}
              isActive={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <NavIcon>
                <Icon icon={item.icon} />
              </NavIcon>
              <NavText>{item.label}</NavText>
            </NavItem>
          ))}
        </Navigation>

        {/* Ações do Header */}
        <HeaderActions>
          {/* Notificações */}
          <NotificationButton hasNotifications={notificationCount > 0}>
            <Icon icon={Icons.FiBell as IconType} />
            {notificationCount > 0 && (
              <NotificationBadge>
                {notificationCount > 99 ? '99+' : notificationCount}
              </NotificationBadge>
            )}
          </NotificationButton>

          {/* Menu do Usuário */}
          <UserMenu onClick={toggleUserMenu} isOpen={isUserMenuOpen}>
            <UserAvatar>
              {userAvatar ? (
                <img src={userAvatar} alt={userName} />
              ) : (
                <Icon icon={Icons.FiUser as IconType} />
              )}
            </UserAvatar>
            <UserInfo>
              <UserName>{userName}</UserName>
              <UserRole>{userRole}</UserRole>
            </UserInfo>

            {/* Dropdown do usuário */}
            {isUserMenuOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                right: 0,
                background: 'white',
                border: '1px solid #e2e8f0',
                borderRadius: '8px',
                padding: '8px',
                boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                zIndex: 1000,
                minWidth: '150px'
              }}>
                <button
                  onClick={handleLogout}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '8px 12px',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                    borderRadius: '4px'
                  }}
                >
                  <Icon icon={Icons.FiLogOut as IconType} size={16} />
                  Sair
                </button>
              </div>
            )}
          </UserMenu>

          {/* Botão Menu Mobile */}
          <MobileMenuButton onClick={toggleMobileMenu}>
            <Icon icon={isMobileMenuOpen ? Icons.FiX as IconType : Icons.FiMenu as IconType} />
          </MobileMenuButton>
        </HeaderActions>
      </HeaderContent>

      {/* Menu Mobile */}
      <MobileMenu isOpen={isMobileMenuOpen}>
        <MobileNavigation>
          {navigationItems.map((item) => (
            <MobileNavItem
              key={item.path}
              isActive={location.pathname === item.path}
              onClick={() => handleNavigation(item.path)}
            >
              <Icon icon={item.icon} />
              <span>{item.label}</span>
            </MobileNavItem>
          ))}
        </MobileNavigation>
      </MobileMenu>
    </HeaderContainer>
  );
};

export default Header;