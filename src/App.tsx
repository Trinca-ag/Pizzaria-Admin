// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/common/ProtectedRoute';
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div style={{ minHeight: '100vh', background: '#f7fafc' }}>
          <Routes>
            {/* Rota pública */}
            <Route path="/login" element={<Login />} />
            
            {/* Rotas protegidas */}
            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />
            
            <Route path="/products" element={
              <ProtectedRoute>
                <div style={{ padding: '20px' }}>
                  <h2>🛒 Produtos</h2>
                  <p>Página protegida - você está logado!</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/orders" element={
              <ProtectedRoute>
                <div style={{ padding: '20px' }}>
                  <h2>📋 Pedidos</h2>
                  <p>Página protegida - você está logado!</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/reports" element={
              <ProtectedRoute>
                <div style={{ padding: '20px' }}>
                  <h2>📊 Relatórios</h2>
                  <p>Página protegida - você está logado!</p>
                </div>
              </ProtectedRoute>
            } />
            
            <Route path="/settings" element={
              <ProtectedRoute requiredRole="admin">
                <div style={{ padding: '20px' }}>
                  <h2>⚙️ Configurações</h2>
                  <p>Página apenas para administradores!</p>
                </div>
              </ProtectedRoute>
            } />
            
            {/* Rota padrão */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            
            {/* Página não encontrada */}
            <Route path="*" element={
              <div style={{ padding: '20px', textAlign: 'center' }}>
                <h2>404 - Página não encontrada</h2>
                <p>A página que você procura não existe.</p>
              </div>
            } />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
