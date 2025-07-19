// src/App.tsx - COM SISTEMA DE TEMA
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext'; // NOVO
import ProtectedRoute from './components/common/ProtectedRoute';
import Header from './components/common/Header';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Reports from './pages/Reports';
import Settings from './pages/Settings';
import { useAuthContext } from './contexts/AuthContext';

// Importar estilos de tema
import './styles/themes.css'; // NOVO

// Layout wrapper para páginas autenticadas
const AuthenticatedLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, signOut } = useAuthContext();

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      <Header 
        userName={user?.name}
        userRole={user?.role}
        onLogout={signOut}
      />
      {children}
    </div>
  );
};

function AppContent() {
  const { isAuthenticated } = useAuthContext();

  return (
    <Router>
      <Routes>
        {/* Rota pública */}
        <Route path="/login" element={<Login />} />
        
        {/* Rotas protegidas */}
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Dashboard />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/products" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Products />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/orders" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <div style={{ padding: '20px' }}>
                <h2>📋 Pedidos</h2>
                <p>Página em desenvolvimento - Em breve!</p>
              </div>
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/reports" element={
          <ProtectedRoute>
            <AuthenticatedLayout>
              <Reports />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        <Route path="/settings" element={
          <ProtectedRoute requiredRole="admin">
            <AuthenticatedLayout>
              <Settings />
            </AuthenticatedLayout>
          </ProtectedRoute>
        } />
        
        {/* Rota padrão */}
        <Route path="/" element={
          isAuthenticated ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />
        } />
        
        {/* Página não encontrada */}
        <Route path="*" element={
          <div style={{ 
            padding: '20px', 
            textAlign: 'center',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            background: 'var(--bg-secondary)',
            color: 'var(--text-primary)'
          }}>
            <h2>404 - Página não encontrada</h2>
            <p>A página que você procura não existe.</p>
            <button 
              onClick={() => window.history.back()}
              style={{
                padding: '8px 16px',
                background: 'var(--color-primary)',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: 'pointer',
                marginTop: '16px'
              }}
            >
              Voltar
            </button>
          </div>
        } />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <ThemeProvider> {/* NOVO PROVIDER */}
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;