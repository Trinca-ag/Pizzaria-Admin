// src/types/auth.ts

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin?: Date;
  isActive: boolean;
}

export type UserRole = 'admin' | 'manager' | 'employee';

export interface LoginCredentials {
  email: string;
  password: string;
  rememberMe?: boolean;
}

export interface RegisterData {
  email: string;
  password: string;
  confirmPassword: string;
  name: string;
  phone?: string;
  role?: UserRole;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

export interface AuthContextData {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  signIn: (credentials: LoginCredentials) => Promise<void>;
  signUp: (data: RegisterData) => Promise<void>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<User>) => Promise<void>;
  clearError: () => void;
}

export interface PasswordResetData {
  email: string;
}

export interface ChangePasswordData {
  currentPassword: string;
  newPassword: string;
  confirmNewPassword: string;
}

export interface UserPermissions {
  canManageProducts: boolean;
  canManageOrders: boolean;
  canViewReports: boolean;
  canManageSettings: boolean;
  canManageUsers: boolean;
  canDeleteOrders: boolean;
  canEditPrices: boolean;
}

// Mapa de permissões por role
export const rolePermissions: Record<UserRole, UserPermissions> = {
  admin: {
    canManageProducts: true,
    canManageOrders: true,
    canViewReports: true,
    canManageSettings: true,
    canManageUsers: true,
    canDeleteOrders: true,
    canEditPrices: true,
  },
  manager: {
    canManageProducts: true,
    canManageOrders: true,
    canViewReports: true,
    canManageSettings: false,
    canManageUsers: false,
    canDeleteOrders: true,
    canEditPrices: true,
  },
  employee: {
    canManageProducts: false,
    canManageOrders: true,
    canViewReports: false,
    canManageSettings: false,
    canManageUsers: false,
    canDeleteOrders: false,
    canEditPrices: false,
  },
};